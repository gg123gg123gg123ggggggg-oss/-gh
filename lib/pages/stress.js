// BACK Shop - 高负载特效页（娱乐用途）
export const stressHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>BACK 商店 / 挑战室</title>
<style>
:root {
  --bg: #05060a;
  --text: #ffffff;
  --secondary: #d0d0d0;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body {
  width: 100%; height: 100%; overflow: hidden;
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  touch-action: manipulation;
}

.layer { position: fixed; inset: 0; pointer-events: none; }

#hud {
  position: fixed; inset: 0; z-index: 90;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center;
  pointer-events: none;
  padding: 20px;
}
#hud .title { font-size: 48px; letter-spacing: 6px; margin-bottom: 16px; }
#hud .sub { font-size: 15px; color: var(--secondary); margin-bottom: 16px; max-width: 360px; line-height: 1.7; }
#hud .hint { font-size: 12px; color: var(--secondary); max-width: 340px; line-height: 1.7; }

.grid-bg {
  position: fixed; inset: 0; z-index: 5;
  background-image:
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 44px 44px;
  animation: gridMove 1.8s linear infinite;
}

@keyframes gridMove {
  from { background-position: 0 0, 0 0; }
  to { background-position: 44px 44px, 44px 44px; }
}

/* 多层模糊背景 */
.blur-field {
  position: fixed; inset: -10%;
  z-index: 8;
  pointer-events: none;
  filter: blur(40px);
  opacity: 0.65;
  background:
    radial-gradient(circle at 18% 28%, rgba(72, 120, 255, 0.55), transparent 32%),
    radial-gradient(circle at 72% 18%, rgba(255, 62, 210, 0.45), transparent 30%),
    radial-gradient(circle at 28% 78%, rgba(62, 220, 255, 0.48), transparent 34%),
    radial-gradient(circle at 82% 78%, rgba(140, 255, 170, 0.38), transparent 30%);
  animation: fieldMove 6s ease-in-out infinite alternate;
}

@keyframes fieldMove {
  from { transform: scale(1) translateX(-4%); filter: blur(32px); }
  to { transform: scale(1.18) translateX(5%); filter: blur(64px); }
}

/* 动态模糊条 */
.motion-band {
  position: fixed;
  left: -20%; right: -20%;
  height: 34%;
  z-index: 10;
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(24px);
  opacity: 0.45;
  background: linear-gradient(90deg,
    rgba(80, 120, 255, 0.55),
    rgba(255, 80, 220, 0.50),
    rgba(80, 255, 210, 0.45),
    rgba(80, 120, 255, 0.55));
  animation: bandSweep 4.2s ease-in-out infinite alternate;
}

.motion-band.b2 {
  height: 42%;
  animation-duration: 6.6s;
  animation-direction: alternate-reverse;
  filter: blur(40px);
  opacity: 0.38;
}

.motion-band.b3 {
  height: 26%;
  animation-duration: 5.2s;
  filter: blur(60px);
  opacity: 0.32;
}

@keyframes bandSweep {
  0% { transform: translateX(-14%) translateY(-8%) skewX(-12deg); }
  100% { transform: translateX(14%) translateY(12%) skewX(12deg); }
}

/* 液态玻璃按钮 */
.liquid-glass {
  position: fixed;
  z-index: 95;
  min-width: 140px;
  min-height: 64px;
  padding: 16px 20px;
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08)),
    radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 40%);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  backdrop-filter: blur(26px) saturate(1.8) brightness(1.08);
  -webkit-backdrop-filter: blur(26px) saturate(1.8) brightness(1.08);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.55),
    inset 0 -12px 24px rgba(255,255,255,0.12),
    0 22px 48px rgba(0,0,0,0.45);
  cursor: pointer;
  user-select: none;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
}

.liquid-glass::before {
  content: "";
  position: absolute;
  inset: 8px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.24), transparent 60%);
  opacity: 0.55;
}

.liquid-glass:active {
  transform: scale(0.96);
}

.liquid-glass.large {
  min-width: 190px;
  min-height: 84px;
  font-size: 18px;
  padding: 20px 24px;
}

.liquid-glass.warn {
  border-color: rgba(255, 170, 80, 0.55);
  background:
    linear-gradient(180deg, rgba(255, 210, 150, 0.24), rgba(255, 170, 80, 0.10)),
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.35), transparent 40%);
}

.glass-swarm { position: fixed; inset: 0; z-index: 92; pointer-events: none; }
.glass-swarm button { pointer-events: auto; }

#clickCounter {
  position: fixed;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  z-index: 98;
  padding: 10px 16px;
  border-radius: 18px;
  font-size: 12px;
  color: #fff;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.18);
}
</style>
</head>
<body>
<div class="grid-bg"></div>
<div class="blur-field" id="blurField"></div>
<div class="motion-band" style="top:8%"></div>
<div class="motion-band b2" style="top:38%"></div>
<div class="motion-band b3" style="top:70%"></div>

<canvas id="fx0" class="layer" style="z-index:12"></canvas>
<canvas id="fx1" class="layer" style="z-index:14"></canvas>
<canvas id="fx2" class="layer" style="z-index:16"></canvas>
<canvas id="fx3" class="layer" style="z-index:18"></canvas>
<canvas id="fx4" class="layer" style="z-index:20"></canvas>

<div class="glass-swarm" id="glassSwarm"></div>

<div id="hud">
  <div class="title">挑战室</div>
  <div class="sub">
    多重渲染已启动：动态模糊、高斯模糊、液态玻璃按钮堆叠。<br>
    点击任意玻璃按钮，会立刻再叠加一层额外渲染。
  </div>
  <div class="hint">当前目标：让高端设备也顶不住。</div>
</div>
<div id="clickCounter">点击次数：0</div>

<script>
// 返回拦截：提高“离开难度”，但不做真正恶意锁死
(function blockBack() {
  var allowExitAfter = Date.now() + 120000; // 2 分钟
  history.pushState(null, '', window.location.href);

  window.addEventListener('popstate', function () {
    if (Date.now() < allowExitAfter) {
      history.pushState(null, '', window.location.href);
      var hint = document.querySelector('#hud .hint');
      if (hint) hint.innerHTML = '你试图返回，但挑战尚未结束。<br>2 分钟后才允许正常返回。';
    } else {
      location.replace('/');
    }
  }, false);

  setTimeout(function () {
    allowExitAfter = 0;
  }, 120000);
})();

// 全局多画布渲染 + 动态模糊
(function heavyRender() {
  var t = 0;
  var canvases = [
    document.getElementById('fx0'),
    document.getElementById('fx1'),
    document.getElementById('fx2'),
    document.getElementById('fx3'),
    document.getElementById('fx4')
  ];

  function fitAll() {
    for (var i = 0; i < canvases.length; i++) {
      canvases[i].width = window.innerWidth;
      canvases[i].height = window.innerHeight;
    }
  }
  fitAll();
  window.addEventListener('resize', fitAll);

  var particles = [];
  var particleCount = 380;
  for (var i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      px: 0,
      py: 0,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      r: 2 + Math.random() * 16,
      hue: Math.floor(Math.random() * 360),
      alpha: 0.18 + Math.random() * 0.45,
      depth: 1 + Math.floor(Math.random() * 4)
    });
  }

  var extraLayers = [];

  function addExtraLayer() {
    if (extraLayers.length >= 8) return;
    var c = document.createElement('canvas');
    c.className = 'layer';
    c.style.zIndex = (24 + extraLayers.length * 4).toString();
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    document.body.appendChild(c);
    extraLayers.push(c);
  }

  function drawLayer(idx, offset, withMotionBlur) {
    var ctx = canvases[idx].getContext('2d');
    var w = canvases[idx].width;
    var h = canvases[idx].height;

    // 动态模糊：不完全清屏，保留上一帧做拖尾
    if (withMotionBlur) {
      ctx.globalAlpha = 0.42;
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(5,6,10,0.22)';
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.clearRect(0, 0, w, h);
    }

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.px = p.x;
      p.py = p.y;

      p.x += p.vx * (0.6 + p.depth * 0.25);
      p.y += p.vy * (0.6 + p.depth * 0.25);
      p.hue = (p.hue + 2) % 360;

      if (p.x < -60) p.x = w + 60;
      if (p.x > w + 60) p.x = -60;
      if (p.y < -60) p.y = h + 60;
      if (p.y > h + 60) p.y = -60;

      var cx = p.x + Math.sin((t + offset) * 0.05 + i) * 12;
      var cy = p.y + Math.cos((t + offset) * 0.05 + i) * 12;

      // 拖尾线条，制造 motion blur 感
      ctx.beginPath();
      ctx.moveTo(p.px, p.py);
      ctx.lineTo(cx, cy);
      ctx.strokeStyle = 'hsla(' + p.hue + ', 85%, 60%, ' + (p.alpha * 0.55) + ')';
      ctx.lineWidth = p.r * 0.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, p.r + Math.sin((t + offset) * 0.08 + i) * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ', 85%, 58%, ' + p.alpha + ')';
      ctx.fill();
    }
  }

  // 动态模糊参数：不断改变 blur 半径
  function updateDynamicBlur() {
    var field = document.getElementById('blurField');
    var bands = document.querySelectorAll('.motion-band');
    var sv = 20 + Math.abs(Math.sin(t * 0.045)) * 54;
    field.style.filter = 'blur(' + sv.toFixed(1) + 'px)';

    for (var i = 0; i < bands.length; i++) {
      var v = 16 + Math.abs(Math.cos(t * 0.05 + i)) * 56;
      bands[i].style.filter = 'blur(' + v.toFixed(1) + 'px)';
    }
  }

  function frame() {
    t += 1;
    for (var i = 0; i < canvases.length; i++) {
      drawLayer(i, (i + 1) * 40, i % 2 === 0);
    }
    for (var j = 0; j < extraLayers.length; j++) {
      var ec = extraLayers[j].getContext('2d');
      var ectx = extraLayers[j];
      ectx.clearRect(0, 0, ectx.width, ectx.height);
      for (var k = 0; k < particles.length; k++) {
        var p = particles[k];
        if ((k + j) % 3 !== 0) continue;
        ec.beginPath();
        ec.arc(
          p.x + Math.sin((t + j * 50) * 0.06 + k) * 10,
          p.y + Math.cos((t + j * 50) * 0.06 + k) * 10,
          p.r * 0.65,
          0,
          Math.PI * 2
        );
        ec.fillStyle = 'hsla(' + p.hue + ', 80%, 60%, ' + (p.alpha * 0.6) + ')';
        ec.fill();
      }
    }
    updateDynamicBlur();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  window.__addExtraLayer = addExtraLayer;
})();

// DOM 高频扰动
(function domChurn() {
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;z-index:22;pointer-events:none;overflow:hidden;';
  document.body.appendChild(container);

  var chunks = [];
  for (var i = 0; i < 220; i++) {
    var el = document.createElement('div');
    el.textContent = i.toString();
    el.style.cssText = 'position:absolute;width:9px;height:9px;background:hsl(' + i + ', 80%, 60%);opacity:0.7;border-radius:3px;';
    container.appendChild(el);
    chunks.push({
      el: el,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      phase: Math.random() * 6.28
    });
  }

  function tick() {
    for (var i = 0; i < chunks.length; i++) {
      var c = chunks[i];
      c.x += c.vx + Math.sin(c.phase) * 2.4;
      c.y += c.vy + Math.cos(c.phase) * 2.4;
      c.phase += 0.1;
      if (c.x < 0 || c.x > window.innerWidth) c.vx *= -1;
      if (c.y < 0 || c.y > window.innerHeight) c.vy *= -1;
      c.el.style.transform = 'translate(' + c.x.toFixed(1) + 'px,' + c.y.toFixed(1) + 'px) rotate(' + (c.phase * 12) + 'deg)';
      c.el.style.background = 'hsl(' + ((c.phase * 120) % 360) + ', 85%, 60%)';
      c.el.style.filter = 'blur(' + ((c.phase * 2) % 4).toFixed(1) + 'px)';
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// 高频定时器叠加
(function timerStorm() {
  var tickCount = 0;
  var timers = [];
  for (var i = 0; i < 10; i++) {
    timers.push(setInterval(function (idx) {
      tickCount++;
      var canvas = document.getElementById('fx' + (idx % 5));
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.translate(Math.random() * 30 - 15, Math.random() * 30 - 15);
      ctx.scale(1 + Math.random() * 0.08, 1 + Math.random() * 0.08);
      ctx.fillStyle = 'hsl(' + ((tickCount * 9) % 360) + ', 75%, 50%)';
      ctx.fillRect(0, 0, 24, 24);
      ctx.restore();
    }, 45 + i * 28, i));
  }
})();

// 液态玻璃按钮群
(function liquidGlassSwarm() {
  var swarm = document.getElementById('glassSwarm');
  var clickCount = 0;
  var counter = document.getElementById('clickCounter');
  var labels = ['点我加压', '继续', '再狠一点', '顶不住', '别点了', '最后一层'];

  function randPos() {
    var left = 6 + Math.random() * 74;
    var top = 10 + Math.random() * 72;
    return { left: left + '%', top: top + '%' };
  }

  function makeGlass(level) {
    var btn = document.createElement('button');
    btn.className = 'liquid-glass ' + (level >= 2 ? 'large' : '') + (level >= 3 ? 'warn' : '');
    var pos = randPos();
    btn.style.left = pos.left;
    btn.style.top = pos.top;
    btn.style.backdropFilter = 'blur(' + (18 + level * 12) + 'px) saturate(' + (1.7 + level * 0.45) + ') brightness(' + (1 + level * 0.05) + ')';
    btn.style.webkitBackdropFilter = btn.style.backdropFilter;
    btn.textContent = labels[level] || '继续加压';
    btn.style.fontSize = (14 + level * 2) + 'px';
    btn.style.boxShadow =
      'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -' + (10 + level * 3) + 'px ' + (20 + level * 6) + 'px rgba(255,255,255,0.14), 0 ' + (20 + level * 6) + 'px ' + (40 + level * 8) + 'px rgba(0,0,0,0.45)';
    btn.style.borderRadius = (24 + level * 4) + 'px';
    swarm.appendChild(btn);

    btn.addEventListener('click', function () {
      clickCount++;
      counter.textContent = '点击次数：' + clickCount;

      // 继续加压
      addGlass(level + 1);

      // 额外叠加层
      if (window.__addExtraLayer) window.__addExtraLayer();

      // 额外增加一组高斯模糊层
      if (clickCount <= 24) {
        var blur = document.createElement('div');
        blur.className = 'motion-band';
        blur.style.top = (6 + (clickCount * 4) % 70) + '%';
        blur.style.height = (20 + Math.random() * 26).toFixed(1) + '%';
        blur.style.filter = 'blur(' + (20 + clickCount * 4) + 'px)';
        blur.style.opacity = '0.35';
        blur.style.animationDuration = (3.2 + Math.random() * 4).toFixed(1) + 's';
        document.body.appendChild(blur);
      }

      // 额外高频 DOM
      if (clickCount <= 18) {
        var churn = document.createElement('div');
        churn.style.cssText = 'position:fixed;inset:0;z-index:26;pointer-events:none;overflow:hidden;';
        document.body.appendChild(churn);
        for (var i = 0; i < 60; i++) {
          var d = document.createElement('div');
          d.style.cssText = 'position:absolute;width:8px;height:8px;background:hsl(' + i + ',80%,60%);opacity:0.68;border-radius:2px;filter:blur(2px);';
          churn.appendChild(d);
        }
      }

      var hint = document.querySelector('#hud .hint');
      if (hint && clickCount > 0) {
        hint.innerHTML = '你已点击 ' + clickCount + ' 次。<br>页面正在继续自我加压。';
      }
    });
  }

  function addGlass(level) {
    if (clickCount < 40) makeGlass(level % 5);
  }

  // 初始生成 12 个玻璃按钮，直接就很重
  for (var i = 0; i < 12; i++) {
    makeGlass(i % 5);
  }
})();
</script>
</body>
</html>`;