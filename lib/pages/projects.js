// BACK Shop - 项目页
export const projectsHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BACK 商店 / 项目</title>
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
.content-card { max-width: 700px; }
.content-card h1 { font-size: 32px; font-weight: 300; letter-spacing: 2px; margin-bottom: 24px; }

.project-item { padding: 20px; border: 1px solid var(--border); margin-bottom: 16px; transition: all 0.2s; }
.project-item:hover { border-color: var(--text); transform: translateX(5px); }
.project-title { font-weight: 600; margin-bottom: 8px; }
.project-desc { color: var(--text-secondary); font-size: 14px; line-height: 1.6; }
.project-tags { margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap; }
.tag { padding: 4px 8px; background: var(--hover); border: 1px solid var(--border); font-size: 12px; }

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
    <a href="/projects" class="nav-item active">项目</a>
    <a href="/camera" class="nav-item">拍照</a>
    <a href="/stats" class="nav-item">统计</a>
    <a href="/monitor" class="nav-item">监控</a>
    <a href="/admin" class="nav-item">管理</a>
  </nav>
  <div class="sidebar-footer">BACK 商店 © 2026</div>
</aside>
<main class="main">
  <div class="content-card">
    <h1>项目</h1>
    <div class="project-item">
      <div class="project-title">个人主页系统</div>
      <div class="project-desc">基于 Node.js 的个人主页，包含监控面板、统计分析和拍照功能。</div>
      <div class="project-tags">
        <span class="tag">Node.js</span>
        <span class="tag">Express</span>
        <span class="tag">HTML/CSS</span>
      </div>
    </div>
    <div class="project-item">
      <div class="project-title">服务器监控</div>
      <div class="project-desc">实时监控服务状态，支持 Cloudflare Tunnel 管理。</div>
      <div class="project-tags">
        <span class="tag">Bash</span>
        <span class="tag">CLI</span>
        <span class="tag">Monitoring</span>
      </div>
    </div>
    <div class="project-item">
      <div class="project-title">移动服务托管</div>
      <div class="project-desc">在 Android Termux 环境中运行完整的 Web 服务。</div>
      <div class="project-tags">
        <span class="tag">Termux</span>
        <span class="tag">Android</span>
        <span class="tag">Cloudflare</span>
      </div>
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
</script>
</body>
</html>`;