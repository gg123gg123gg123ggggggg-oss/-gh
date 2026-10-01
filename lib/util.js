// BACK Shop - 工具函数
// 所有通用小工具都放这里，worker.js 负责“路由”，lib/ 负责“零件”。

export function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export function htmlPage(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}

export function parseIpList(text) {
  return String(text || '').split('\n').map(s => s.trim()).filter(Boolean);
}

export function isInternalIP(ip) {
  if (!ip || ip === '::1' || ip === '127.0.0.1') return true;
  const m = String(ip).match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 127) return true;
  }
  const lower = String(ip).toLowerCase();
  if (lower.startsWith('fc') || lower.startsWith('fd') || lower.startsWith('fe80:')) return true;
  return false;
}

export function clientIP(req) {
  const forwarded = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || '';
  return String(forwarded).split(',')[0].trim() || 'unknown';
}