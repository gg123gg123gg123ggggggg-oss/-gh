// BACK Shop - API 路由
// 每个接口独立函数，worker.js 里只负责“分发”。

import { json } from './util.js';
import { loadConfig, isAccessAllowed, appendVisitLog, getVisitLog, clearVisitLog, saveConfig } from './kv.js';

export async function apiStatus(request, env, ip) {
  return json(200, {
    server: 'running',
    deployment: 'cloudflare-workers',
    kv: Boolean(env.KV),
    time: new Date().toISOString()
  });
}

function maskIP(ip) {
  if (!ip) return 'hidden';
  const s = String(ip);
  if (s.includes(':')) {
    const parts = s.split(':');
    if (parts.length >= 2) return parts[0] + '::' + parts[1] + '...';
    return s.slice(0, 4) + '...';
  }
  const parts = s.split('.');
  if (parts.length === 4) return parts[0] + '.' + parts[1] + '.*.*';
  return s.slice(0, 6) + '...';
}

function sanitizeLogs(logs, withIP) {
  return logs.map(l => {
    const item = {
      timestamp: l.timestamp,
      method: l.method,
      path: l.path,
      status: l.status
    };
    if (withIP) {
      item.ip = l.ip;
    } else {
      item.ip = maskIP(l.ip);
    }
    return item;
  });
}

function isStatsAuthed(request) {
  const headers = {};
  try {
    const raw = request.headers.get('x-back-auth') || '';
    const val = decodeURIComponent(escape(atob(raw)));
    headers.password = val;
  } catch (e) {
    return false;
  }
  return Boolean(headers.password);
}

export async function apiStats(request, env) {
  const config = await loadConfig(env.KV);
  const authed = isStatsAuthed(request);
  const logs = await getVisitLog(env.KV);
  const today = new Date().toDateString();
  const uniqueIPCount = new Set(logs.map(l => l.ip)).size;
  const todayVisits = logs.filter(l => new Date(l.timestamp).toDateString() === today).length;

  return json(200, {
    totalVisits: logs.length,
    uniqueIPCount,
    todayVisits,
    lastVisit: logs.length ? logs[logs.length - 1].timestamp : '无',
    authed,
    logs: sanitizeLogs(logs.slice(-100), authed)
  });
}

export async function apiStatsJson(request, env) {
  const config = await loadConfig(env.KV);
  const authed = isStatsAuthed(request);
  const logs = await getVisitLog(env.KV);
  const today = new Date().toDateString();
  const uniqueIPCount = new Set(logs.map(l => l.ip)).size;
  const todayVisits = logs.filter(l => new Date(l.timestamp).toDateString() === today).length;

  return json(200, {
    totalVisits: logs.length,
    uniqueIPCount,
    todayVisits,
    lastVisit: logs.length ? logs[logs.length - 1].timestamp : '无',
    authed,
    logs: sanitizeLogs(logs.slice(-100), authed)
  });
}

export async function apiLogs(request, env) {
  const config = await loadConfig(env.KV);
  const authed = isStatsAuthed(request);

  if (request.method === 'GET') {
    const logs = await getVisitLog(env.KV);
    return json(200, {
      authed,
      logs: sanitizeLogs(logs.slice(-100), authed)
    });
  }

  if (request.method === 'DELETE') {
    await clearVisitLog(env.KV);
    return json(200, { success: true });
  }

  return json(405, { error: '方法不支持' });
}

export async function apiIps(request, env) {
  if (request.method === 'GET') {
    const config = await loadConfig(env.KV);
    return json(200, {
      blacklist: config.blacklist,
      whitelist: config.whitelist,
      mode: config.mode,
      internalIPs: config.internalIPs || []
    });
  }

  if (request.method === 'POST') {
    const config = await loadConfig(env.KV);
    const data = await request.json().catch(() => ({}));
    const action = data.action;
    const target = String(data.ip || data.mode || '').trim();
    if (!action || !target) return json(400, { error: '缺少参数' });

    if (action === 'add_black' && !config.blacklist.includes(target)) config.blacklist.push(target);
    if (action === 'remove_black') config.blacklist = config.blacklist.filter(x => x !== target);
    if (action === 'add_white' && !config.whitelist.includes(target)) config.whitelist.push(target);
    if (action === 'remove_white') config.whitelist = config.whitelist.filter(x => x !== target);
    if (action === 'set_mode') config.mode = target === 'white' ? 'white' : 'black';

    await saveConfig(env.KV, config);
    return json(200, { success: true });
  }

  return json(405, { error: '方法不支持' });
}

export async function apiPassword(request, env) {
  if (request.method === 'GET') {
    const config = await loadConfig(env.KV);
    return json(200, { hasPassword: Boolean(config.password) });
  }

  if (request.method === 'POST') {
    const config = await loadConfig(env.KV);
    const data = await request.json().catch(() => ({}));
    const action = data.action;
    const value = String(data.password || '').trim();

    if (action === 'set') {
      if (value.length < 4) return json(400, { error: '密码长度至少4位' });
      config.password = value;
      await saveConfig(env.KV, config);
      return json(200, { success: true });
    }

    if (action === 'check') {
      const ok = value === config.password;
      if (ok) {
        return json(200, {
          success: true,
          header: btoa(unescape(encodeURIComponent(value)))
        });
      }
      return json(401, { error: '密码错误' });
    }

    if (action === 'get') {
      return json(200, {
        hasPassword: Boolean(config.password),
        length: config.password ? config.password.length : 0
      });
    }

    return json(400, { error: '未知操作' });
  }

  return json(405, { error: '方法不支持' });
}

export function apiControl() {
  return json(200, {
    success: false,
    message: 'Workers 环境不支持本地服务启停控制'
  });
}

export function apiPhotos() {
  return json(400, {
    success: false,
    error: '当前部署使用 KV，不支持图片文件存储（需要 R2）'
  });
}

export { json, isAccessAllowed, appendVisitLog };