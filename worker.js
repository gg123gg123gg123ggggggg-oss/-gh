// BACK Shop - Cloudflare Workers 主驱动文件
// 职责：只做请求路由分发，页面和 API 实现都拆到独立模块里。

import { PAGE_MAP, NOT_FOUND_PAGE } from './lib/routes.js';
import { htmlPage, json, clientIP } from './lib/util.js';
import { loadConfig, isAccessAllowed, appendVisitLog } from './lib/kv.js';
import {
  apiStatus,
  apiStats,
  apiStatsJson,
  apiLogs,
  apiIps,
  apiPassword,
  apiControl,
  apiPhotos
} from './lib/api.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const ip = clientIP(request);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // ---- 先处理所有 API ----
    if (pathname === '/api/status') return apiStatus(request, env, ip);
    if (pathname === '/api/stats') return apiStats(request, env);
    if (pathname === '/stats.json') return apiStatsJson(request, env);
    if (pathname === '/api/logs') return apiLogs(request, env);
    if (pathname === '/api/ips') return apiIps(request, env);
    if (pathname === '/api/password') return apiPassword(request, env);
    if (pathname === '/api/control') return apiControl();
    if (pathname === '/api/photos' || pathname === '/api/upload-photo') return apiPhotos();

    // ---- 非 API 请求走访问控制 ----
    const config = await loadConfig(env.KV);
    if (!isAccessAllowed(config, ip)) {
      await appendVisitLog(env.KV, {
        timestamp: new Date().toISOString(),
        method: request.method,
        path: pathname,
        status: 403,
        ip
      });
      return json(403, { error: 'IP被禁止访问' });
    }

    // ---- 页面路由 ----
    if (pathname in PAGE_MAP) {
      await appendVisitLog(env.KV, {
        timestamp: new Date().toISOString(),
        method: request.method,
        path: pathname,
        status: 200,
        ip
      });
      return htmlPage(PAGE_MAP[pathname]);
    }

    // ---- 登录页重定向 ----
    if (pathname === '/login' || pathname === '/login.html') {
      return new Response('Redirecting...', {
        status: 302,
        headers: {
          Location: '/',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // ---- 404 ----
    await appendVisitLog(env.KV, {
      timestamp: new Date().toISOString(),
      method: request.method,
      path: pathname,
      status: 404,
      ip
    });
    return htmlPage(NOT_FOUND_PAGE, 404);
  }
};