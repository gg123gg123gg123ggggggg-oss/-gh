// BACK Shop - Cloudflare Workers entry
// Single-file driver: static pages, API routes, KV-backed config.
// Upload this file as the Worker entry point.

const PAGES = {
  home: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BACK 商店 / 主页</title>
<style>
:root{--bg:#ffffff;--text:#000000;--text-secondary:#666666;--border:#e0e0e0;--hover:#f5f5f5;--sidebar-width:200px}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.sidebar{width:var(--sidebar-width);height:100vh;position:fixed;left:0;top:0;background:var(--bg);border-right:1px solid var(--text);display:flex;flex-direction:column;z-index:100}
.sidebar-header{padding:20px;border-bottom:1px solid var(--text)}
.sidebar-header h2{font-size:18px;font-weight:700;letter-spacing:2px}
.sidebar-nav{flex:1;padding:10px 0}
.nav-item{display:block;padding:12px 20px;text-decoration:none;color:var(--text);font-size:14px;border-bottom:1px solid var(--border);transition:all .2s}
.nav-item:hover{background:var(--hover);padding-left:25px}
.nav-item.active{background:var(--text);color:var(--bg)}
.sidebar-footer{padding:20px;border-top:1px solid var(--border);font-size:12px;color:var(--text-secondary)}
.main{margin-left:var(--sidebar-width);padding:40px}
.hero{max-width:600px;margin-top:100px}
.hero h1{font-size:48px;font-weight:300;letter-spacing:4px;margin-bottom:20px}
.hero p{font-size:16px;color:var(--text-secondary);margin-bottom:40px}
.links{display:flex;flex-direction:column;gap:2px}
.link-btn{display:block;padding:16px 20px;background:var(--bg);border:1px solid var(--text);text-decoration:none;color:var(--text);font-size:14px;transition:all .2s}
.link-btn:hover{background:var(--text);color:var(--bg)}
.menu-btn{display:none;position:fixed;bottom:20px;right:20px;width:44px;height:44px;background:var(--text);border:none;cursor:pointer;z-index:200;flex-direction:column;align-items:center;justify-content:center;gap:5px}
.menu-btn span{display:block;width:20px;height:2px;background:var(--bg);transition:all .3s}
.overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90}
@media(max-width:768px){.sidebar{transform:translateX(-100%);transition:transform .3s}.sidebar.open{transform:translateX(0)}.main{margin-left:0;padding:20px}.menu-btn{display:flex}.overlay.active{display:block}}
</style>
</head>
<body>
<div class="overlay" id="overlay"></div>
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header"><h2>BACK</h2></div>
  <nav class="sidebar-nav">
    <a href="/" class="nav-item active">首页</a>
    <a href="/about" class="nav-item">关于</a>
    <a href="/contact" class="nav-item">联系</a>
    <a href="/projects" class="nav-item">项目</a>
    <a href="/stats" class="nav-item">统计</a>
  </nav>
  <div class="sidebar-footer">BACK 商店 © 2026</div>
</aside>
<main class="main">
  <div class="hero">
    <h1>BACK</h1>
    <p>探索 · 创造 · 分享</p>
    <div class="links">
      <a href="/about" class="link-btn">了解更多关于我</a>
      <a href="/contact" class="link-btn">联系我</a>
      <a href="/projects" class="link-btn">查看项目</a>
    </div>
  </div>
</main>
<button class="menu-btn" id="menuBtn" aria-label="菜单"><span></span><span></span><span></span></button>
<script>
var sidebar=document.getElementById('sidebar');var overlay=document.getElementById('overlay');var menuBtn=document.getElementById('menuBtn');
function toggleMenu(){sidebar.classList.toggle('open');overlay.classList.toggle('active')}
menuBtn.addEventListener('click',toggleMenu);overlay.addEventListener('click',toggleMenu);
</script>
</body>
</html>`,

  about: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BACK 商店 / 关于</title>
<style>
:root{--bg:#ffffff;--text:#000000;--text-secondary:#666666;--border:#e0e0e0;--hover:#f5f5f5;--sidebar-width:200px}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.sidebar{width:var(--sidebar-width);height:100vh;position:fixed;left:0;top:0;background:var(--bg);border-right:1px solid var(--text);display:flex;flex-direction:column;z-index:100}
.sidebar-header{padding:20px;border-bottom:1px solid var(--text)}
.sidebar-header h2{font-size:18px;font-weight:700;letter-spacing:2px}
.sidebar-nav{flex:1;padding:10px 0}
.nav-item{display:block;padding:12px 20px;text-decoration:none;color:var(--text);font-size:14px;border-bottom:1px solid var(--border);transition:all .2s}
.nav-item:hover{background:var(--hover);padding-left:25px}
.nav-item.active{background:var(--text);color:var(--bg)}
.sidebar-footer{padding:20px;border-top:1px solid var(--border);font-size:12px;color:var(--text-secondary)}
.main{margin-left:var(--sidebar-width);padding:40px}
.menu-btn{display:none;position:fixed;bottom:20px;right:20px;width:44px;height:44px;background:var(--text);border:none;cursor:pointer;z-index:200;flex-direction:column;align-items:center;justify-content:center;gap:5px}
.menu-btn span{display:block;width:20px;height:2px;background:var(--bg);transition:all .3s}
.overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90}
@media(max-width:768px){.sidebar{transform:translateX(-100%);transition:transform .3s}.sidebar.open{transform:translateX(0)}.main{margin-left:0;padding:20px}.menu-btn{display:flex}.overlay.active{display:block}}
</style>
</head>
<body>
<div class="overlay" id="overlay"></div>
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header"><h2>BACK</h2></div>
  <nav class="sidebar-nav">
    <a href="/" class="nav-item">首页</a>
    <a href="/about" class="nav-item active">关于</a>
    <a href="/contact" class="nav-item">联系</a>
    <a href="/projects" class="nav-item">项目</a>
    <a href="/stats" class="nav-item">统计</a>
  </nav>
  <div class="sidebar-footer">BACK 商店 © 2026</div>
</aside>
<main class="main">
  <h1>关于</h1>
  <p style="margin-top:20px;line-height:1.8;color:#333">这里是 BACK 商店的关于页面。可继续替换成你的个人介绍。</p>
</main>
<button class="menu-btn" id="menuBtn" aria-label="菜单"><span></span><span></span><span></span></button>
<script>
var sidebar=document.getElementById('sidebar');var overlay=document.getElementById('overlay');var menuBtn=document.getElementById('menuBtn');
function toggleMenu(){sidebar.classList.toggle('open');overlay.classList.toggle('active')}
menuBtn.addEventListener('click',toggleMenu);overlay.addEventListener('click',toggleMenu);
</script>
</body>
</html>`,

  contact: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BACK 商店 / 联系</title>
<style>
:root{--bg:#ffffff;--text:#000000;--text-secondary:#666666;--border:#e0e0e0;--hover:#f5f5f5;--sidebar-width:200px}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.sidebar{width:var(--sidebar-width);height:100vh;position:fixed;left:0;top:0;background:var(--bg);border-right:1px solid var(--text);display:flex;flex-direction:column;z-index:100}
.sidebar-header{padding:20px;border-bottom:1px solid var(--text)}
.sidebar-header h2{font-size:18px;font-weight:700;letter-spacing:2px}
.sidebar-nav{flex:1;padding:10px 0}
.nav-item{display:block;padding:12px 20px;text-decoration:none;color:var(--text);font-size:14px;border-bottom:1px solid var(--border);transition:all .2s}
.nav-item:hover{background:var(--hover);padding-left:25px}
.nav-item.active{background:var(--text);color:var(--bg)}
.sidebar-footer{padding:20px;border-top:1px solid var(--border);font-size:12px;color:var(--text-secondary)}
.main{margin-left:var(--sidebar-width);padding:40px}
.menu-btn{display:none;position:fixed;bottom:20px;right:20px;width:44px;height:44px;background:var(--text);border:none;cursor:pointer;z-index:200;flex-direction:column;align-items:center;justify-content:center;gap:5px}
.menu-btn span{display:block;width:20px;height:2px;background:var(--bg);transition:all .3s}
.overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90}
@media(max-width:768px){.sidebar{transform:translateX(-100%);transition:transform .3s}.sidebar.open{transform:translateX(0)}.main{margin-left:0;padding:20px}.menu-btn{display:flex}.overlay.active{display:block}}
</style>
</head>
<body>
<div class="overlay" id="overlay"></div>
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header"><h2>BACK</h2></div>
  <nav class="sidebar-nav">
    <a href="/" class="nav-item">首页</a>
    <a href="/about" class="nav-item">关于</a>
    <a href="/contact" class="nav-item active">联系</a>
    <a href="/projects" class="nav-item">项目</a>
    <a href="/stats" class="nav-item">统计</a>
  </nav>
  <div class="sidebar-footer">BACK 商店 © 2026</div>
</aside>
<main class="main">
  <h1>联系</h1>
  <p style="margin-top:20px;line-height:1.8;color:#333">联系方式可放在这里：邮箱 / 社交账号 / 备注。</p>
</main>
<button class="menu-btn" id="menuBtn" aria-label="菜单"><span></span><span></span><span></span></button>
<script>
var sidebar=document.getElementById('sidebar');var overlay=document.getElementById('overlay');var menuBtn=document.getElementById('menuBtn');
function toggleMenu(){sidebar.classList.toggle('open');overlay.classList.toggle('active')}
menuBtn.addEventListener('click',toggleMenu);overlay.addEventListener('click',toggleMenu);
</script>
</body>
</html>`,

  projects: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BACK 商店 / 项目</title>
<style>
:root{--bg:#ffffff;--text:#000000;--text-secondary:#666666;--border:#e0e0e0;--hover:#f5f5f5;--sidebar-width:200px}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.sidebar{width:var(--sidebar-width);height:100vh;position:fixed;left:0;top:0;background:var(--bg);border-right:1px solid var(--text);display:flex;flex-direction:column;z-index:100}
.sidebar-header{padding:20px;border-bottom:1px solid var(--text)}
.sidebar-header h2{font-size:18px;font-weight:700;letter-spacing:2px}
.sidebar-nav{flex:1;padding:10px 0}
.nav-item{display:block;padding:12px 20px;text-decoration:none;color:var(--text);font-size:14px;border-bottom:1px solid var(--border);transition:all .2s}
.nav-item:hover{background:var(--hover);padding-left:25px}
.nav-item.active{background:var(--text);color:var(--bg)}
.sidebar-footer{padding:20px;border-top:1px solid var(--border);font-size:12px;color:var(--text-secondary)}
.main{margin-left:var(--sidebar-width);padding:40px}
.menu-btn{display:none;position:fixed;bottom:20px;right:20px;width:44px;height:44px;background:var(--text);border:none;cursor:pointer;z-index:200;flex-direction:column;align-items:center;justify-content:center;gap:5px}
.menu-btn span{display:block;width:20px;height:2px;background:var(--bg);transition:all .3s}
.overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90}
@media(max-width:768px){.sidebar{transform:translateX(-100%);transition:transform .3s}.sidebar.open{transform:translateX(0)}.main{margin-left:0;padding:20px}.menu-btn{display:flex}.overlay.active{display:block}}
</style>
</head>
<body>
<div class="overlay" id="overlay"></div>
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header"><h2>BACK</h2></div>
  <nav class="sidebar-nav">
    <a href="/" class="nav-item">首页</a>
    <a href="/about" class="nav-item">关于</a>
    <a href="/contact" class="nav-item">联系</a>
    <a href="/projects" class="nav-item active">项目</a>
    <a href="/stats" class="nav-item">统计</a>
  </nav>
  <div class="sidebar-footer">BACK 商店 © 2026</div>
</aside>
<main class="main">
  <h1>项目</h1>
  <ul style="margin-top:20px;line-height:1.8;color:#333">
    <li>BACK 商店站点</li>
    <li>Cloudflare Workers 部署</li>
    <li>KV 配置管理</li>
  </ul>
</main>
<button class="menu-btn" id="menuBtn" aria-label="菜单"><span></span><span></span><span></span></button>
<script>
var sidebar=document.getElementById('sidebar');var overlay=document.getElementById('overlay');var menuBtn=document.getElementById('menuBtn');
function toggleMenu(){sidebar.classList.toggle('open');overlay.classList.toggle('active')}
menuBtn.addEventListener('click',toggleMenu);overlay.addEventListener('click',toggleMenu);
</script>
</body>
</html>`,

  stats: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BACK 商店 / 统计</title>
<style>
:root{--bg:#ffffff;--text:#000000;--text-secondary:#666666;--border:#e0e0e0;--hover:#f5f5f5;--sidebar-width:200px}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.sidebar{width:var(--sidebar-width);height:100vh;position:fixed;left:0;top:0;background:var(--bg);border-right:1px solid var(--text);display:flex;flex-direction:column;z-index:100}
.sidebar-header{padding:20px;border-bottom:1px solid var(--text)}
.sidebar-header h2{font-size:18px;font-weight:700;letter-spacing:2px}
.sidebar-nav{flex:1;padding:10px 0}
.nav-item{display:block;padding:12px 20px;text-decoration:none;color:var(--text);font-size:14px;border-bottom:1px solid var(--border);transition:all .2s}
.nav-item:hover{background:var(--hover);padding-left:25px}
.nav-item.active{background:var(--text);color:var(--bg)}
.sidebar-footer{padding:20px;border-top:1px solid var(--border);font-size:12px;color:var(--text-secondary)}
.main{margin-left:var(--sidebar-width);padding:40px}
.menu-btn{display:none;position:fixed;bottom:20px;right:20px;width:44px;height:44px;background:var(--text);border:none;cursor:pointer;z-index:200;flex-direction:column;align-items:center;justify-content:center;gap:5px}
.menu-btn span{display:block;width:20px;height:2px;background:var(--bg);transition:all .3s}
.overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90}
.card{border:1px solid var(--border);padding:16px;margin-bottom:12px}
table{width:100%;border-collapse:collapse;margin-top:12px}
th,td{border-bottom:1px solid var(--border);padding:8px 0;font-size:14px;text-align:left}
@media(max-width:768px){.sidebar{transform:translateX(-100%);transition:transform .3s}.sidebar.open{transform:translateX(0)}.main{margin-left:0;padding:20px}.menu-btn{display:flex}.overlay.active{display:block}}
</style>
</head>
<body>
<div class="overlay" id="overlay"></div>
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header"><h2>BACK</h2></div>
  <nav class="sidebar-nav">
    <a href="/" class="nav-item">首页</a>
    <a href="/about" class="nav-item">关于</a>
    <a href="/contact" class="nav-item">联系</a>
    <a href="/projects" class="nav-item">项目</a>
    <a href="/stats" class="nav-item active">统计</a>
  </nav>
  <div class="sidebar-footer">BACK 商店 © 2026</div>
</aside>
<main class="main">
  <h1>统计</h1>
  <div class="card"><div>总访问：<span id="total">-</span></div><div>唯一 IP：<span id="unique">-</span></div><div>最后访问：<span id="last">-</span></div></div>
  <div class="card">
    <div>最近访问记录</div>
    <table id="logTable"><thead><tr><th>时间</th><th>路径</th><th>IP</th></tr></thead><tbody></tbody></table>
  </div>
</main>
<button class="menu-btn" id="menuBtn" aria-label="菜单"><span></span><span></span><span></span></button>
<script>
var sidebar=document.getElementById('sidebar');var overlay=document.getElementById('overlay');var menuBtn=document.getElementById('menuBtn');
function toggleMenu(){sidebar.classList.toggle('open');overlay.classList.toggle('active')}
menuBtn.addEventListener('click',toggleMenu);overlay.addEventListener('click',toggleMenu);
async function loadStats(){
  try{
    var r=await fetch('/api/stats');
    var d=await r.json();
    document.getElementById('total').textContent=d.totalVisits||0;
    document.getElementById('unique').textContent=(d.uniqueIPs||[]).length;
    document.getElementById('last').textContent=d.lastVisit||'无';
    var body=document.querySelector('#logTable tbody');
    body.innerHTML='';
    (d.logs||[]).forEach(function(l){
      var tr=document.createElement('tr');
      tr.innerHTML='<td>'+(l.timestamp||'')+'</td><td>'+(l.path||'')+'</td><td>'+(l.ip||'')+'</td>';
      body.appendChild(tr);
    });
  }catch(e){
    document.getElementById('total').textContent='统计不可用';
  }
}
loadStats();
</script>
</body>
</html>`,

  notFound: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>404</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fff;color:#000;min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column}
h1{font-size:72px;font-weight:200;letter-spacing:-2px}
a{color:#000;text-decoration:underline;margin-top:20px}
</style>
</head>
<body>
<h1>404</h1>
<p>页面不存在</p>
<a href="/">返回首页</a>
</body>
</html>`
};

const DEFAULT_CONFIG = {
  mode: 'black',
  blacklist: [],
  whitelist: [],
  password: 'admin123',
  internalIPs: []
};

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function htmlPage(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}

function parseIpList(text) {
  return String(text || '').split('\n').map(s => s.trim()).filter(Boolean);
}

function isInternalIP(ip) {
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

function clientIP(req) {
  const forwarded = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || '';
  return String(forwarded).split(',')[0].trim() || 'unknown';
}

async function loadConfig(kv) {
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

function isAccessAllowed(config, ip) {
  if (config.mode === 'white') {
    if (!config.whitelist.length) return false;
    return config.whitelist.includes(ip);
  }
  if (config.blacklist.includes(ip)) return false;
  return true;
}

async function appendVisitLog(kv, entry) {
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

    const isApi = pathname.startsWith('/api/');
    const config = await loadConfig(env.KV);
    if (!isApi && !isAccessAllowed(config, ip)) {
      await appendVisitLog(env.KV, {
        timestamp: new Date().toISOString(),
        method: request.method,
        path: pathname,
        status: 403,
        ip
      });
      return json(403, { error: 'IP被禁止访问' });
    }

    if (pathname === '/api/stats') {
      const raw = await env.KV.get('visitLog');
      let logs = [];
      if (raw) {
        try {
          logs = JSON.parse(raw);
        } catch (e) {
          logs = [];
        }
      }
      if (!Array.isArray(logs)) logs = [];
      const today = new Date().toDateString();
      const uniqueIPs = [...new Set(logs.map(l => l.ip))];
      const todayVisits = logs.filter(l => new Date(l.timestamp).toDateString() === today).length;
      return json(200, {
        totalVisits: logs.length,
        uniqueIPs,
        todayVisits,
        lastVisit: logs.length ? logs[logs.length - 1].timestamp : '无',
        logs: logs.slice(-100)
      });
    }

    if (pathname === '/api/logs' && request.method === 'GET') {
      const raw = await env.KV.get('visitLog');
      let logs = [];
      if (raw) {
        try {
          logs = JSON.parse(raw);
        } catch (e) {
          logs = [];
        }
      }
      if (!Array.isArray(logs)) logs = [];
      return json(200, logs.slice(-100));
    }

    if (pathname === '/api/logs' && request.method === 'DELETE') {
      await env.KV.put('visitLog', '[]');
      return json(200, { success: true });
    }

    if (pathname === '/api/ips') {
      if (request.method === 'GET') {
        return json(200, {
          blacklist: config.blacklist,
          whitelist: config.whitelist,
          mode: config.mode,
          internalIPs: config.internalIPs || []
        });
      }

      if (request.method === 'POST') {
        const data = await request.json().catch(() => ({}));
        const action = data.action;
        const target = String(data.ip || data.mode || '').trim();
        if (!action || !target) return json(400, { error: '缺少参数' });

        if (action === 'add_black' && !config.blacklist.includes(target)) config.blacklist.push(target);
        if (action === 'remove_black') config.blacklist = config.blacklist.filter(x => x !== target);
        if (action === 'add_white' && !config.whitelist.includes(target)) config.whitelist.push(target);
        if (action === 'remove_white') config.whitelist = config.whitelist.filter(x => x !== target);
        if (action === 'set_mode') config.mode = target === 'white' ? 'white' : 'black';

        await env.KV.put('config', JSON.stringify(config, null, 2));
        return json(200, { success: true });
      }
    }

    if (pathname === '/api/password') {
      if (request.method === 'GET') {
        return json(200, { hasPassword: Boolean(config.password) });
      }

      if (request.method === 'POST') {
        const data = await request.json().catch(() => ({}));
        const action = data.action;
        const value = String(data.password || '').trim();

        if (action === 'set') {
          if (value.length < 4) return json(400, { error: '密码长度至少4位' });
          config.password = value;
          await env.KV.put('config', JSON.stringify(config, null, 2));
          return json(200, { success: true });
        }

        if (action === 'check') {
          const ok = value === config.password;
          return json(ok ? 200 : 401, ok ? { success: true } : { error: '密码错误' });
        }

        if (action === 'get') {
          return json(200, {
            hasPassword: Boolean(config.password),
            length: config.password ? config.password.length : 0
          });
        }
      }
    }

    if (pathname === '/api/status') {
      return json(200, {
        server: 'running',
        deployment: 'cloudflare-workers',
        kv: Boolean(env.KV),
        time: new Date().toISOString()
      });
    }

    if (pathname === '/stats.json') {
      const raw = await env.KV.get('visitLog');
      let logs = [];
      if (raw) {
        try {
          logs = JSON.parse(raw);
        } catch (e) {
          logs = [];
        }
      }
      if (!Array.isArray(logs)) logs = [];
      const uniqueIPs = [...new Set(logs.map(l => l.ip))];
      const today = new Date().toDateString();
      const todayVisits = logs.filter(l => new Date(l.timestamp).toDateString() === today).length;
      return json(200, {
        totalVisits: logs.length,
        uniqueIPs,
        todayVisits,
        lastVisit: logs.length ? logs[logs.length - 1].timestamp : '无',
        logs: logs.slice(-100)
      });
    }

    if (pathname === '/api/control') {
      return json(200, {
        success: false,
        message: 'Workers 环境不支持本地服务启停控制'
      });
    }

    if (pathname === '/api/photos' || pathname === '/api/upload-photo') {
      return json(400, {
        success: false,
        error: '当前部署使用 KV，不支持图片文件存储（需要 R2）'
      });
    }

    if (pathname === '/') {
      await appendVisitLog(env.KV, {
        timestamp: new Date().toISOString(),
        method: request.method,
        path: '/',
        status: 200,
        ip
      });
      return htmlPage(PAGES.home);
    }

    if (pathname === '/about') {
      await appendVisitLog(env.KV, {
        timestamp: new Date().toISOString(),
        method: request.method,
        path: '/about',
        status: 200,
        ip
      });
      return htmlPage(PAGES.about);
    }

    if (pathname === '/contact') {
      await appendVisitLog(env.KV, {
        timestamp: new Date().toISOString(),
        method: request.method,
        path: '/contact',
        status: 200,
        ip
      });
      return htmlPage(PAGES.contact);
    }

    if (pathname === '/projects') {
      await appendVisitLog(env.KV, {
        timestamp: new Date().toISOString(),
        method: request.method,
        path: '/projects',
        status: 200,
        ip
      });
      return htmlPage(PAGES.projects);
    }

    if (pathname === '/stats') {
      await appendVisitLog(env.KV, {
        timestamp: new Date().toISOString(),
        method: request.method,
        path: '/stats',
        status: 200,
        ip
      });
      return htmlPage(PAGES.stats);
    }

    if (pathname === '/login' || pathname === '/login.html') {
      return new Response('Redirecting...', {
        status: 302,
        headers: {
          Location: '/',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    await appendVisitLog(env.KV, {
      timestamp: new Date().toISOString(),
      method: request.method,
      path: pathname,
      status: 404,
      ip
    });
    return htmlPage(PAGES.notFound, 404);
  }
};
