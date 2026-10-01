// BACK Shop - 高负载特效页（娱乐用途）
export const stressHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>BACK 商店 / 挑战室</title>
<style>
:root {
  --bg: #000000;
  --text: #ffffff;
  --secondary: #f5f5f5;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; overflow: hidden; background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }

.layer { position: fixed; inset: 0; pointer-events: none; }

#canvas { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 10; }

#hud {
  position: fixed; inset: 0; z-index: 20; display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.25);
}
#hud .title { font-size: 42px; letter-spacing: 4px; margin-bottom: 16px; }
#hud .sub { font-size: 14px; color: var(--secondary); margin-bottom: 28px; }
#hud .hint { font-size: 12px; color: var(--secondary); max-width: 320px; text-align: center; line-height: 1.6; }

.grid-bg { position: fixed; inset: 0; z-index: 5; background-image:
  linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
  linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridMove 2.2s linear infinite;
}

@keyframes gridMove {
  from { background-position: 0 0, 0 0; }
  to { background-position: 40px 40px, 40px 40px; }
}
</style>
</head>
<body>
<div class="grid-bg"></div>
<canvas id="canvas"></canvas>
<div id="hud">
  <div class="title">挑战室</div>
  <div class="sub">多重特效已启动，准备开始渲染。</div>
  <div class="hint">
    当前页面会持续生成大量动画层，低端设备可能出现明显卡顿。<br>
    如需退出，请通过浏览器标签页关闭页面。
  </div>
</div>
<script>
// 返回拦截：尽量提高“离开难度”，但不做真正恶意锁死
(function blockBack() {
  var allowExitAfter = Date.now() + 60000; // 1 分钟后允许正常返回
  history.pushState(null, '', window.location.href);

  window.addEventListener('popstate', function (e) {
    if (Date.now() < allowExitAfter) {
      history.pushState(null, '', window.location.href);
      var hud = document.getElementById('hud');
      var hint = hud.querySelector('.hint');
      if (hint) hint.innerHTML = '你试图返回，但挑战尚未结束。<br>60 秒后才允许正常返回。';
    } else {
      location.replace('/');
    }
  }, false);

  setTimeout(function () {
    allowExitAfter = 0;
  }, 60000);
})();

// 多层 canvas 粒子特效
(function multiCanvasStress() {
  var canvasCount = 4;
  var canvases = [];
  var particles = [];
  var t = 0;

  for (var i = 0; i < canvasCount; i++) {
    var c = document.createElement('canvas');
    c.id = 'fx' + i;
    c.className = 'layer';
    c.style.zIndex = (15 + i * 5).toString();
    document.body.appendChild(c);
    canvases.push(c);
  }

  function fitAll() {
    for (var i = 0; i < canvases.length; i++) {
      canvases[i].width = window.innerWidth;
      canvases[i].height = window.innerHeight;
    }
  }
  fitAll();
  window.addEventListener('resize', fitAll);

  function makeParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      r: 4 + Math.random() * 20,
      hue: Math.floor(Math.random() * 360),
      alpha: 0.25 + Math.random() * 0.45
    };
  }

  for (var i = 0; i < 240; i++) particles.push(makeParticle());

  function drawLayer(idx) {
    var ctx = canvases[idx].getContext('2d');
    var off = idx * 40;
    ctx.clearRect(0, 0, canvases[idx].width, canvases[idx].height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.hue = (p.hue + 2) % 360;

      if (p.x < -60) p.x = window.innerWidth + 60;
      if (p.x > window.innerWidth + 60) p.x = -60;
      if (p.y < -60) p.y = window.innerHeight + 60;
      if (p.y > window.innerHeight + 60) p.y = -60;

      var cx = p.x + Math.sin((t + off) * 0.05 + i) * 8;
      var cy = p.y + Math.cos((t + off) * 0.05 + i) * 8;

      ctx.beginPath();
      ctx.arc(cx, cy, p.r + Math.sin((t + off) * 0.08 + i) * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ', 80%, 55%, ' + p.alpha + ')';
      ctx.fill();
    }
  }

  function frame() {
    t += 1;
    for (var i = 0; i < canvases.length; i++) drawLayer(i);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// DOM 高频扰动：持续创建/更新大量临时元素
(function domChurn() {
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;z-index:8;pointer-events:none;overflow:hidden;';
  document.body.appendChild(container);

  var chunks = [];
  for (var i = 0; i < 120; i++) {
    var el = document.createElement('div');
    el.textContent = i.toString();
    el.style.cssText = 'position:absolute;width:12px;height:12px;background:hsl(' + i + ', 80%, 60%);opacity:0.7;';
    container.appendChild(el);
    chunks.push({ el: el, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4, phase: Math.random() * 6.28 });
  }

  function tick() {
    for (var i = 0; i < chunks.length; i++) {
      var c = chunks[i];
      c.x += c.vx + Math.sin(c.phase) * 2;
      c.y += c.vy + Math.cos(c.phase) * 2;
      c.phase += 0.08;
      if (c.x < 0 || c.x > window.innerWidth) c.vx *= -1;
      if (c.y < 0 || c.y > window.innerHeight) c.vy *= -1;
      c.el.style.transform = 'translate(' + c.x.toFixed(1) + 'px,' + c.y.toFixed(1) + 'px) rotate(' + (c.phase * 10) + 'deg)';
      c.el.style.background = 'hsl(' + ((c.phase * 90) % 360) + ', 85%, 60%)';
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// 高频定时器叠加：让低端机更容易掉帧
(function timerStorm() {
  var tickCount = 0;
  var timers = [];
  for (var i = 0; i < 6; i++) {
    timers.push(setInterval(function (idx) {
      tickCount++;
      var canvas = document.getElementById('fx' + idx);
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.translate(Math.random() * 20 - 10, Math.random() * 20 - 10);
      ctx.scale(1 + Math.random() * 0.05, 1 + Math.random() * 0.05);
      ctx.fillStyle = 'hsl(' + ((tickCount * 7) % 360) + ', 70%, 50%)';
      ctx.fillRect(0, 0, 16, 16);
      ctx.restore();
    }, 80 + i * 40, i));
  }
})();
</script>
</body>
</html>`;