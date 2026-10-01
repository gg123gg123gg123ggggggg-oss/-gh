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

#baseCanvas { position: fixed; inset: 0; z-index: 10; }

#hud {
  position: fixed; inset: 0; z-index: 60; display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.12);
  pointer-events: none;
}
#hud .title { font-size: 42px; letter-spacing: 4px; margin-bottom: 16px; }
#hud .sub { font-size: 14px; color: var(--secondary); margin-bottom: 16px; text-align:center; max-width: 320px;}
#hud .hint { font-size: 12px; color: var(--secondary); max-width: 320px; text-align: center; line-height: 1.6; }

.grid-bg {
  position: fixed; inset: 0; z-index: 5;
  background-image:
    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridMove 2.2s linear infinite;
}

@keyframes gridMove {
  from { background-position: 0 0, 0 0; }
  to { background-position: 40px 40px, 40px 40px; }
}

.blur-sheet {
  position: fixed; inset: -12%;
  z-index: 20;
  pointer-events: none;
  filter: blur(6px);
  opacity: 0.45;
  background:
    radial-gradient(ellipse at 20% 30%, rgba(80, 120, 255, 0.25), transparent 45%),
    radial-gradient(ellipse at 70% 20%, rgba(255, 80, 200, 0.20), transparent 40%),
    radial-gradient(ellipse at 30% 80%, rgba(60, 220, 255, 0.22), transparent 45%),
    radial-gradient(ellipse at 80% 80%, rgba(120, 255, 180, 0.18), transparent 40%);
  mix-blend-mode: screen;
}

.blur-band {
  position: fixed; left: 0; right: 0;
  height: 38%;
  z-index: 25;
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(18px);
  opacity: 0.5;
  background: linear-gradient(90deg,
    rgba(80, 130, 255, 0.35),
    rgba(255, 90, 220, 0.32),
    rgba(90, 255, 210, 0.28),
    rgba(80, 130, 255, 0.35));
  animation: bandMove 3.4s ease-in-out infinite alternate;
}

.blur-band.b2 {
  height: 46%;
  filter: blur(28px);
  opacity: 0.38;
  animation-duration: 5.2s;
  animation-direction: alternate-reverse;
}

.blur-band.b3 {
  height: 30%;
  filter: blur(40px);
  opacity: 0.32;
  animation-duration: 6.8s;
}

@keyframes bandMove {
  0% { transform: translateX(-12%) translateY(-8%); }
  100% { transform: translateX(12%) translateY(14%); }
}

.liquid-glass {
  position: fixed;
  z-index: 70;
  min-width: 120px;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.32);
  background: linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.08));
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  backdrop-filter: blur(22px) saturate(1.6);
  -webkit-backdrop-filter: blur(22px) saturate(1.6);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.45),
    inset 0 -8px 18px rgba(255,255,255,0.12),
    0 18px 40px rgba(0,0,0,0.35);
  cursor: pointer;
  user-select: none;
  transition: transform 0.12s ease, background 0.12s ease;
}

.liquid-glass:active {
  transform: scale(0.96);
}

.liquid-glass.big {
  min-width: 160px;
  font-size: 16px;
  padding: 16px 20px;
}

.glass-swarm {
  position: fixed; inset: 0; z-index: 65; pointer-events: none;
}
</style>
</head>
<body>
<div class="grid-bg"></div>
<div class="blur-sheet" id="blurSheet"></div>
<div class="blur-band" style="top:10%"></div>
<div class="blur-band b2" style="top:45%"></div>
<div class="blur-band b3" style="top:75%"></div>

<canvas id="baseCanvas"></canvas>
<div class="glass-swarm" id="glassSwarm"></div>

<div id="hud">
  <div class="title">挑战室</div>
  <div class="sub">多重渲染已启动：动态模糊 + 高斯模糊 + 液态玻璃堆叠。</div>
  <div class="hint">
    当前页面会持续叠加多组高成本特效。<br>
    点击任意玻璃按钮会继续增加一层额外渲染。
  </div>
</div>

<script>
// 返回拦截：提高“离开难度”，但不做真正恶意锁死
(function blockBack() {
  var allowExitAfter = Date.now() + 90000; // 90 秒
  history.pushState(null, '', window.location.href);

  window.addEventListener('popstate', function () {
    if (Date.now() < allowExitAfter) {
      history.pushState(null, '', window.location.href);
      var hint = document.querySelector('#hud .hint');
      if (hint) hint.innerHTML = '你试图返回，但挑战尚未结束。<br>90 秒后才允许正常返回。';
    } else {
      location.replace('/');
    }
  }, false);

  setTimeout(function () {
    allowExitAfter = 0;
  }, 90000);
})();

// 全局渲染层
(function heavyRender() {
  var base = document.getElementById('baseCanvas');
  base.width = window.innerWidth;
  base.height = window.innerHeight;
  window.addEventListener('resize', function () {
    base.width = window.innerWidth;
    base.height = window.innerHeight;
  });

  var t = 0;
  var particles = [];
  for (var i = 0; i < 320; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      r: 3 + Math.random() * 18,
      hue: Math.floor(Math.random() * 360),
      alpha: 0.2 + Math.random() * 0.5
    });
  }

  // 多个叠加 canvas
  var extraCanvases = [];
  var extraCount = 5;
  for (var i = 0; i < extraCount; i++) {
    var c = document.createElement('canvas');
    c.className = 'layer';
    c.id = 'fx' + i;
    c.style.zIndex = (30 + i * 5).toString();
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    document.body.appendChild(c);
    extraCanvases.push(c);
  }

  function drawParticles(ctx, offset) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.hue = (p.hue + 2) % 360;

      if (p.x < -50) p.x = window.innerWidth + 50;
      if (p.x > window.innerWidth + 50) p.x = -50;
      if (p.y < -50) p.y = window.innerHeight + 50;
      if (p.y > window.innerHeight + 50) p.y = -50;

      var cx = p.x + Math.sin((t + offset) * 0.05 + i) * 10;
      var cy = p.y + Math.cos((t + offset) * 0.05 + i) * 10;

      ctx.beginPath();
      ctx.arc(cx, cy, p.r + Math.sin((t + offset) * 0.08 + i) * 4, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ', 85%, 58%, ' + p.alpha + ')';
      ctx.fill();
    }
  }

  // 动态模糊层：对 canvas 应用 filter blur
  function applyDynamicBlur() {
    var blurBands = document.querySelectorAll('.blur-band');
    for (var i = 0; i < blurBands.length; i++) {
      var b = blurBands[i];
      var v = 12 + Math.abs(Math.sin(t * 0.04 + i)) * 36;
      b.style.filter = 'blur(' + v.toFixed(1) + 'px)';
    }

    var sheet = document.getElementById('blurSheet');
    var sv = 6 + Math.abs(Math.cos(t * 0.05)) * 28;
    sheet.style.filter = 'blur(' + sv.toFixed(1) + 'px)';
  }

  function frame() {
    t += 1;
    drawParticles(base.getContext('2d'), 0);
    for (var i = 0; i < extraCanvases.length; i++) {
      drawParticles(extraCanvases[i].getContext('2d'), (i + 1) * 60);
    }
    applyDynamicBlur();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// DOM 高频扰动
(function domChurn() {
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;z-index:12;pointer-events:none;overflow:hidden;';
  document.body.appendChild(container);

  var chunks = [];
  for (var i = 0; i < 160; i++) {
    var el = document.createElement('div');
    el.textContent = i.toString();
    el.style.cssText = 'position:absolute;width:10px;height:10px;background:hsl(' + i + ', 80%, 60%);opacity:0.7;border-radius:2px;';
    container.appendChild(el);
    chunks.push({ el: el, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, phase: Math.random() * 6.28 });
  }

  function tick() {
    for (var i = 0; i < chunks.length; i++) {
      var c = chunks[i];
      c.x += c.vx + Math.sin(c.phase) * 2;
      c.y += c.vy + Math.cos(c.phase) * 2;
      c.phase += 0.09;
      if (c.x < 0 || c.x > window.innerWidth) c.vx *= -1;
      if (c.y < 0 || c.y > window.innerHeight) c.vy *= -1;
      c.el.style.transform = 'translate(' + c.x.toFixed(1) + 'px,' + c.y.toFixed(1) + 'px) rotate(' + (c.phase * 12) + 'deg)';
      c.el.style.background = 'hsl(' + ((c.phase * 110) % 360) + ', 85%, 60%)';
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// 高频定时器叠加
(function timerStorm() {
  var tickCount = 0;
  var timers = [];
  for (var i = 0; i < 8; i++) {
    timers.push(setInterval(function (idx) {
      tickCount++;
      var canvas = document.getElementById('fx' + (idx % 5));
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.translate(Math.random() * 24 - 12, Math.random() * 24 - 12);
      ctx.scale(1 + Math.random() * 0.06, 1 + Math.random() * 0.06);
      ctx.fillStyle = 'hsl(' + ((tickCount * 8) % 360) + ', 72%, 50%)';
      ctx.fillRect(0, 0, 20, 20);
      ctx.restore();
    }, 60 + i * 35, i));
  }
})();

// 液态玻璃按钮群
(function liquidGlassSwarm() {
  var swarm = document.getElementById('glassSwarm');
  var activeCount = 0;
  var maxLevels = 6; // 点击最多加 6 层，避免无限堆叠
  var baseLabels = ['点我加压', '继续', '再狠一点', '顶不住', '别点', '最后一层'];

  function randPos() {
    var left = 4 + Math.random() * 78;
    var top = 8 + Math.random() * 82;
    return { left: left + '%', top: top + '%' };
  }

  function makeGlass(btn, level) {
    var pos = randPos();
    var size = 110 + level * 18;
    btn.style.width = size + 'px';
    btn.style.minWidth = (size - 20) + 'px';
    btn.style.maxWidth = size + 'px';
    btn.style.left = pos.left;
    btn.style.top = pos.top;
    btn.style.backdropFilter = 'blur(' + (16 + level * 10) + 'px) saturate(' + (1.6 + level * 0.35) + ')';
    btn.style.webkitBackdropFilter = btn.style.backdropFilter;
    btn.style.borderRadius = (20 + level * 4) + 'px';
    btn.style.fontSize = (13 + level) + 'px';
    btn.textContent = baseLabels[level] || '加压';

    var extraLayers = [];
    for (var i = 0; i < level + 1; i++) {
      var overlay = document.createElement('div');
      overlay.className = 'blur-sheet';
      overlay.style.zIndex = (50 + i).toString();
      overlay.style.filter = 'blur(' + (5 + i * 4) + 'px)';
      overlay.style.opacity = String(0.15 + i * 0.06);
      overlay.style.transform = 'translate(' + (Math.random() * 40 - 20) + 'px, ' + (Math.random() * 40 - 20) + 'px)';
      document.body.appendChild(overlay);
      extraLayers.push(overlay);
    }

    btn.addEventListener('click', function () {
      activeCount++;
      var nextLevel = Math.min(maxLevels, level + 1);

      // 每点一次，新增一组额外玻璃按钮 + 额外模糊层
      var newBtn = document.createElement('button');
      newBtn.className = 'liquid-glass' + (nextLevel >= 3 ? ' big' : '');
      swarm.appendChild(newBtn);
      makeGlass(newBtn, nextLevel);

      // 当前按钮继续增加自身模糊与缩放抖动
      btn.style.backdropFilter = 'blur(' + (24 + nextLevel * 10) + 'px) saturate(' + (1.8 + nextLevel * 0.4) + ')';
      btn.style.webkitBackdropFilter = btn.style.backdropFilter;
      btn.style.transform = 'scale(' + (1 + nextLevel * 0.04) + ')';

      // 额外生成一组 canvas 层
      if (activeCount <= 12) {
        var c = document.createElement('canvas');
        c.className = 'layer';
        c.style.zIndex = (40 + activeCount * 3).toString();
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        document.body.appendChild(c);

        var extraParticles = [];
        for (var i = 0; i < 80; i++) {
          extraParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            r: 2 + Math.random() * 14,
            hue: Math.floor(Math.random() * 360),
            alpha: 0.18 + Math.random() * 0.35
          });
        }

        var localT = 0;
        (function loop() {
          localT += 1;
          var ctx = c.getContext('2d');
          ctx.clearRect(0, 0, c.width, c.height);
          for (var i = 0; i < extraParticles.length; i++) {
            var p = extraParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.hue = (p.hue + 3) % 360;
            if (p.x < -40) p.x = window.innerWidth + 40;
            if (p.x > window.innerWidth + 40) p.x = -40;
            if (p.y < -40) p.y = window.innerHeight + 40;
            if (p.y > window.innerHeight + 40) p.y = -40;

            ctx.beginPath();
            ctx.arc(
              p.x + Math.sin(localT * 0.05 + i) * 6,
              p.y + Math.cos(localT * 0.05 + i) * 6,
              p.r + Math.sin(localT * 0.08 + i) * 2,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = 'hsla(' + p.hue + ', 90%, 60%, ' + p.alpha + ')';
            ctx.fill();
          }
          requestAnimationFrame(loop);
        })();
      }

      // 额外加一组高频 DOM
      if (activeCount <= 10) {
        var churn = document.createElement('div');
        churn.style.cssText = 'position:fixed;inset:0;z-index:15;pointer-events:none;overflow:hidden;';
        document.body.appendChild(churn);

        for (var i = 0; i < 50; i++) {
          var d = document.createElement('div');
          d.style.cssText = 'position:absolute;width:8px;height:8px;background:hsl(' + i + ',80%,60%);opacity:0.65;';
          churn.appendChild(d);
        }
      }

      // 额外加一组高频模糊层
      if (activeCount <= 8) {
        var blur = document.createElement('div');
        blur.className = 'blur-band';
        blur.style.top = (8 + activeCount * 8) + '%';
        blur.style.filter = 'blur(' + (18 + activeCount * 6) + 'px)';
        blur.style.opacity = '0.32';
        blur.style.animationDuration = (3 + activeCount * 0.5).toFixed(1) + 's';
        document.body.appendChild(blur);
      }

      activeCount = Math.min(activeCount, maxLevels * 4);
      var hint = document.querySelector('#hud .hint');
      if (hint) {
        hint.innerHTML = '你已点击 ' + activeCount + ' 次。<br>每点一次，都会继续叠加一层渲染负担。';
      }
    });
  }

  // 初始生成一组按钮
  for (var i = 0; i < 8; i++) {
    var btn = document.createElement('button');
    btn.className = 'liquid-glass' + (i % 3 === 0 ? ' big' : '');
    swarm.appendChild(btn);
    makeGlass(btn, i % 3);
  }
})();
</script>
</body>
</html>`;