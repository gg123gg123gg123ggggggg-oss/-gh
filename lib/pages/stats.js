// BACK Shop - 统计页
export const statsHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BACK 商店 / 统计</title>
<style>
:root {
  --bg: #ffffff;
  --text: #000000;
  --text-secondary: #666666;
  --border: #e0e0e0;
  --hover: #f5f5f5;
  --sidebar-width: 200px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; display: flex; }

.sidebar { width: var(--sidebar-width); height: 100vh; position: fixed; left: 0; top: 0; background: var(--bg); border-right: 1px solid var(--text); display: flex; flex-direction: column; z-index: 100; }
.sidebar-header { padding: 20px; border-bottom: 1px solid var(--text); }
.sidebar-header h2 { font-size: 18px; font-weight: 700; letter-spacing: 2px; }
.sidebar-nav { flex: 1; padding: 10px 0; }
.nav-item { display: block; padding: 12px 20px; text-decoration: none; color: var(--text); font-size: 14px; border-bottom: 1px solid var(--border); transition: all 0.2s; }
.nav-item:hover { background: var(--hover); padding-left: 25px; }
.nav-item.active { background: var(--text); color: var(--bg); }
.sidebar-footer { padding: 20px; border-top: 1px solid var(--border); font-size: 12px; color: var(--text-secondary); }

.main { margin-left: var(--sidebar-width); padding: 40px; flex: 1; }
.content-card { max-width: 800px; }
.content-card h1 { font-size: 32px; font-weight: 300; letter-spacing: 2px; margin-bottom: 24px; }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 32px; }
.stat-item { border: 1px solid var(--text); padding: 20px; text-align: center; }
.stat-value { font-size: 32px; font-weight: 600; }
.stat-label { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }

.log-list { font-size: 13px; }
.log-item { padding: 10px 0; border-bottom: 1px solid var(--border); display: flex; gap: 16px; }
.log-item:last-child { border-bottom: none; }
.log-time { color: var(--text-secondary); min-width: 140px; }
.log-ip { font-family: monospace; }
.log-path { color: var(--text-secondary); flex: 1; }

.auth-box { margin-top: 24px; padding: 16px; border: 1px solid var(--border); }
.auth-box p { color: var(--text-secondary); font-size: 13px; margin-bottom: 10px; }
.auth-box input { width: 220px; padding: 8px; border: 1px solid var(--border); font-size: 13px; }
.auth-box button { margin-left: 8px; padding: 8px 14px; border: 1px solid var(--text); background: var(--bg); cursor: pointer; }

.btn { display: inline-block; padding: 12px 24px; background: var(--bg); border: 1px solid var(--text); text-decoration: none; color: var(--text); font-size: 14px; transition: all 0.2s; cursor: pointer; }
.btn:hover { background: var(--text); color: var(--bg); transform: translateY(-2px); }

.menu-btn { display: none; position: fixed; bottom: 20px; right: 20px; width: 44px; height: 44px; background: var(--text); border: none; cursor: pointer; z-index: 200; flex-direction: column; align-items: center; justify-content: center; gap: 5px; }
.menu-btn span { display: block; width: 20px; height: 2px; background: var(--bg); transition: all 0.3s; }

.overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 90; }

@media (max-width: 768px) {
  .sidebar { transform: translateX(-100%); transition: transform 0.3s; }
  .sidebar.open { transform: translateX(0); }
  .main { margin-left: 0; padding: 20px; }
  .menu-btn { display: flex; }
  .overlay.active { display: block; }
}
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
    <a href="/camera" class="nav-item">拍照</a>
    <a href="/stats" class="nav-item active">统计</a>
    <a href="/monitor" class="nav-item">监控</a>
    <a href="/admin" class="nav-item">管理</a>
  </nav>
  <div class="sidebar-footer">BACK 商店 © 2026</div>
</aside>
<main class="main">
  <div class="content-card">
    <h1>访问统计</h1>
    <div class="stats-grid">
      <div class="stat-item"><div class="stat-value" id="total">-</div><div class="stat-label">总访问</div></div>
      <div class="stat-item"><div class="stat-value" id="today">-</div><div class="stat-label">今日</div></div>
      <div class="stat-item"><div class="stat-value" id="unique">-</div><div class="stat-label">独立IP</div></div>
    </div>
    <h2 style="font-size:16px;margin-bottom:16px;font-weight:400;">最近访问</h2>
    <div class="log-list" id="logs">加载中...</div>

    <div class="auth-box" id="authBox">
      <p>查看完整访问记录需要密码。</p>
      <input id="authInput" type="password" placeholder="输入密码" autocomplete="off">
      <button id="authBtn">验证</button>
    </div>

    <br>
    <a href="/" class="btn">返回首页</a>
  </div>
</main>
<button class="menu-btn" id="menuBtn" aria-label="菜单">
  <span></span><span></span><span></span>
</button>
<script>
var sidebar = document.getElementById('sidebar');
var overlay = document.getElementById('overlay');
var menuBtn = document.getElementById('menuBtn');

function toggleMenu() {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

var authHeader = sessionStorage.getItem('backAuthHeader') || '';

function setAuthHeader(v) {
  if (v) sessionStorage.setItem('backAuthHeader', v);
  else sessionStorage.removeItem('backAuthHeader');
}

function headersWithAuth() {
  var h = {};
  if (authHeader) h['x-back-auth'] = authHeader;
  return h;
}

async function loadStats() {
  try {
    var r = await fetch('/stats.json', { headers: headersWithAuth() });
    var d = await r.json();
    document.getElementById('total').textContent = d.totalVisits || 0;
    document.getElementById('today').textContent = d.todayVisits || 0;
    document.getElementById('unique').textContent = d.uniqueIPCount || 0;

    var logs = document.getElementById('logs');
    if (d.authed) {
      document.getElementById('authBox').style.display = 'none';
      if (d.logs && d.logs.length) {
        logs.innerHTML = d.logs.slice(-20).reverse().map(function (l) {
          return '<div class="log-item">' +
            '<span class="log-time">' + new Date(l.timestamp).toLocaleString('zh-CN', { hour12: false }) + '</span>' +
            '<span class="log-ip">' + l.ip + '</span>' +
            '<span class="log-path">' + l.path + '</span>' +
            '</div>';
        }).join('');
      } else {
        logs.innerHTML = '<div style="color:var(--text-secondary);padding:20px 0;">暂无记录</div>';
      }
    } else {
      document.getElementById('authBox').style.display = 'block';
      if (d.logs && d.logs.length) {
        logs.innerHTML = d.logs.slice(-20).reverse().map(function (l) {
          return '<div class="log-item">' +
            '<span class="log-time">' + new Date(l.timestamp).toLocaleString('zh-CN', { hour12: false }) + '</span>' +
            '<span class="log-ip">' + l.ip + '</span>' +
            '<span class="log-path">' + l.path + '</span>' +
            '</div>';
        }).join('');
      } else {
        logs.innerHTML = '<div style="color:var(--text-secondary);padding:20px 0;">暂无记录</div>';
      }
    }
  } catch (e) {
    document.getElementById('logs').innerHTML = '<div style="color:#dc2626;padding:20px 0;">加载失败</div>';
  }
}

async function verifyAuth() {
  var password = document.getElementById('authInput').value;
  if (!password) return;
  var resp = await fetch('/api/password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'check', password: password })
  });
  var data = await resp.json();
  if (resp.ok && data.success) {
    setAuthHeader(data.header || btoa(password));
    await loadStats();
  } else {
    setAuthHeader('');
    alert(data.error || '密码错误');
    await loadStats();
  }
}

document.getElementById('authBtn').addEventListener('click', verifyAuth);
document.getElementById('authInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') verifyAuth();
});

loadStats();
setInterval(loadStats, 30000);
</script>
</body>
</html>`;