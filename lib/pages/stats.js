// BACK Shop - 统计页
export const statsHtml = `<!DOCTYPE html>
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
</html>`;