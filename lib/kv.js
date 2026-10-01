// BACK Shop - KV 数据访问层
// 所有和 KV 打交道的逻辑集中在这里，worker.js 不直接拼 KV 细节。

import { DEFAULT_CONFIG } from './defaults.js';

export async function loadConfig(kv) {
  const raw = await kv.get('config');
  if (!raw) {
    await kv.put('config', JSON.stringify(DEFAULT_CONFIG));
    return { ...DEFAULT_CONFIG };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      mode: parsed.mode === 'white' ? 'white' : 'black',
      blacklist: Array.isArray(parsed.blacklist) ? parsed.blacklist : [],
      whitelist: Array.isArray(parsed.whitelist) ? parsed.whitelist : [],
      password: typeof parsed.password === 'string' ? parsed.password : 'admin123',
      internalIPs: Array.isArray(parsed.internalIPs) ? parsed.internalIPs : []
    };
  } catch (e) {
    return { ...DEFAULT_CONFIG };
  }
}

export function isAccessAllowed(config, ip) {
  if (config.mode === 'white') {
    if (!config.whitelist.length) return false;
    return config.whitelist.includes(ip);
  }
  if (config.blacklist.includes(ip)) return false;
  return true;
}

export async function appendVisitLog(kv, entry) {
  const raw = await kv.get('visitLog');
  let logs = [];
  if (raw) {
    try {
      logs = JSON.parse(raw);
    } catch (e) {
      logs = [];
    }
  }
  if (!Array.isArray(logs)) logs = [];
  logs.push({
    timestamp: entry.timestamp,
    method: entry.method,
    path: entry.path,
    status: entry.status,
    ip: entry.ip
  });
  if (logs.length > 500) logs = logs.slice(-500);
  await kv.put('visitLog', JSON.stringify(logs));
}

export async function getVisitLog(kv) {
  const raw = await kv.get('visitLog');
  let logs = [];
  if (raw) {
    try {
      logs = JSON.parse(raw);
    } catch (e) {
      logs = [];
    }
  }
  if (!Array.isArray(logs)) logs = [];
  return logs;
}

export async function clearVisitLog(kv) {
  await kv.put('visitLog', '[]');
}

export async function saveConfig(kv, config) {
  await kv.put('config', JSON.stringify(config, null, 2));
}