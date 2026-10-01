// BACK Shop - 主页内容
export const homeHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BACK 商店 / 主页</title>
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
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

.sidebar { width: var(--sidebar-width); height: 100vh; position: fixed; left: 0; top: 0; background: var(--bg); border-right: 1px solid var(--text); display: flex; flex-direction: column; z-index: 100; }
.sidebar-header { padding: 20px; border-bottom: 1px solid var(--text); }
.sidebar-header h2 { font-size: 18px; font-weight: 700; letter-spacing: 2px; }
.sidebar-nav { flex: 1; padding: 10px 0; }
.nav-item { display: block; padding: 12px 20px; text-decoration: none; color: var(--text); font-size: 14px; border-bottom: 1px solid var(--border); transition: all 0.2s; }
.nav-item:hover { background: var(--hover); padding-left: 25px; }
.nav-item.active { background: var(--text); color: var(--bg); }
.sidebar-footer { padding: 20px; border-top: 1px solid var(--border); font-size: 12px; color: var(--text-secondary); }

.main { margin-left: var(--sidebar-width); padding: 40px; }
.hero { max-width: 600px; margin-top: 100px; }
.hero h1 { font-size: 48px; font-weight: 300; letter-spacing: 4px; margin-bottom: 20px; }
.hero p { font-size: 16px; color: var(--text-secondary); margin-bottom: 40px; }
.links { display: flex; flex-direction: column; gap: 2px; }
.link-btn { display: block; padding: 16px 20px; background: var(--bg); border: 1px solid var(--text); text-decoration: none; color: var(--text); font-size: 14px; transition: all 0.2s; }
.link-btn:hover { background: var(--text); color: var(--bg); }
.stress-btn { margin-top: 24px; padding: 12px 20px; background: var(--bg); color: var(--text); border: 1px dashed var(--text-secondary); cursor: pointer; font-size: 13px; }
.stress-btn:active { background: var(--hover); }

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
    <a href="/" class="nav-item active">首页</a>
    <a href="/about" class="nav-item">关于</a>
    <a href="/contact" class="nav-item">联系</a>
    <a href="/projects" class="nav-item">项目</a>
    <a href="/camera" class="nav-item">拍照</a>
    <a href="/stats" class="nav-item">统计</a>
    <a href="/monitor" class="nav-item">监控</a>
    <a href="/admin" class="nav-item">管理</a>
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
    <button id="stressBtn" class="stress-btn">双击进入挑战室</button>
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

(function bindStressBtn() {
  var btn = document.getElementById('stressBtn');
  var lastClick = 0;
  btn.addEventListener('click', function () {
    var now = Date.now();
    if (now - lastClick < 350) {
      window.location.href = '/stress';
    }
    lastClick = now;
  });
})();
</script>
</body>
</html>`;