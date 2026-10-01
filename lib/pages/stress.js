// BACK Shop - 高负载特效页 v5（进页面即卡 + 一键自爆）
export const stressHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>BACK 商店 / 挑战室</title>
<style>
:root{--bg:#03040a;--text:#fff;--secondary:#d6d6d6}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;touch-action:manipulation}
.layer{position:fixed;inset:0;pointer-events:none}

#hud{position:fixed;inset:0;z-index:90;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none;padding:20px}
#hud .title{font-size:52px;letter-spacing:8px;margin-bottom:18px}
#hud .sub{font-size:15px;color:var(--secondary);margin-bottom:16px;max-width:400px;line-height:1.8}
#hud .hint{font-size:12px;color:var(--secondary);max-width:360px;line-height:1.8}

.grid-bg{position:fixed;inset:0;z-index:4;background-image:linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(0deg,rgba(255,255,255,0.06) 1px,transparent 1px);background-size:42px 42px;animation:gridMove 1.4s linear infinite}
@keyframes gridMove{from{background-position:0 0,0 0}to{background-position:42px 42px,42px 42px}}

.gauss-field{position:fixed;inset:-14%;z-index:6;pointer-events:none;opacity:0.78;mix-blend-mode:screen;filter:blur(84px);background:
 radial-gradient(circle at 16% 26%,rgba(70,110,255,0.64),transparent 30%),
 radial-gradient(circle at 76% 18%,rgba(255,60,205,0.56),transparent 28%),
 radial-gradient(circle at 26% 78%,rgba(60,215,255,0.58),transparent 32%),
 radial-gradient(circle at 84% 82%,rgba(150,255,170,0.46),transparent 28%);
 animation:gaussPulse 4.2s ease-in-out infinite alternate}
@keyframes gaussPulse{
 from{filter:blur(58px);transform:scale(1) translateX(-3%)}
 to{filter:blur(172px);transform:scale(1.38) translateX(6%)}
}

.motion-band{position:fixed;left:-22%;right:-22%;height:36%;z-index:10;pointer-events:none;mix-blend-mode:screen;filter:blur(52px);opacity:0.62;background:linear-gradient(90deg,rgba(90,120,255,0.72),rgba(255,80,220,0.66),rgba(80,255,210,0.62),rgba(90,120,255,0.72));animation:bandSweep 3.4s ease-in-out infinite alternate}
.motion-band.b2{height:48%;animation-duration:5.8s;animation-direction:alternate-reverse;filter:blur(92px);opacity:0.56}
.motion-band.b3{height:30%;animation-duration:4.6s;filter:blur(128px);opacity:0.5}
@keyframes bandSweep{
 0%{transform:translateX(-16%) translateY(-10%) skewX(-14deg)}
 100%{transform:translateX(16%) translateY(12%) skewX(14deg)}
}

.glass-layer{position:fixed;inset:0;z-index:92;pointer-events:none}
.liquid-glass{
 position:fixed;z-index:96;min-width:188px;min-height:84px;padding:18px 22px;border-radius:34px;cursor:pointer;user-select:none;
 border:1px solid rgba(255,255,255,0.42);color:#fff;font-size:17px;font-weight:800;letter-spacing:1.2px;
 background:
  linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.09)),
  radial-gradient(circle at 30% 22%,rgba(255,255,255,0.58),transparent 46%),
  radial-gradient(circle at 70% 76%,rgba(180,220,255,0.24),transparent 42%);
 backdrop-filter:blur(38px) saturate(2.55) brightness(1.18) contrast(1.08);
 -webkit-backdrop-filter:blur(38px) saturate(2.55) brightness(1.18) contrast(1.08);
 box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.72),
  inset 0 -18px 32px rgba(255,255,255,0.18),
  inset 18px 0 28px rgba(255,255,255,0.08),
  0 28px 58px rgba(0,0,0,0.55);
 transition:transform .1s ease,filter .12s ease;filter:url(#liquidRefraction) brightness(1.04)}
.liquid-glass::before{content:"";position:absolute;inset:12px;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,0.4),transparent 58%);opacity:0.66;pointer-events:none}
.liquid-glass::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;filter:blur(10px);opacity:0.55;background:linear-gradient(45deg,rgba(255,255,255,0.9),transparent 18%,transparent 82%,rgba(255,255,255,0.82))}
.liquid-glass:active{transform:scale(0.95)}
.liquid-glass.danger{border-color:rgba(255,110,70,0.82);background:
  linear-gradient(180deg,rgba(255,190,130,0.3),rgba(255,90,50,0.16)),
  radial-gradient(circle at 30% 24%,rgba(255,255,255,0.55),transparent 44%),
  radial-gradient(circle at 76% 74%,rgba(255,120,80,0.28),transparent 46%);
 backdrop-filter:blur(52px) saturate(2.8) brightness(1.26) contrast(1.14);
 -webkit-backdrop-filter:blur(52px) saturate(2.8) brightness(1.26) contrast(1.14)}

#dock{position:fixed;left:50%;bottom:252px;transform:translateX(-50%);z-index:98;display:flex;flex-direction:column;align-items:center;gap:14px;pointer-events:auto}
#mainGlass{pointer-events:auto}
#detonate{pointer-events:auto}

#clickCounter{position:fixed;left:50%;bottom:188px;transform:translateX(-50%);z-index:99;padding:8px 14px;border-radius:16px;font-size:11px;color:#fff;background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}

.chaos-field{position:fixed;inset:0;z-index:5;pointer-events:none;overflow:hidden}
.chaos-thing{position:absolute;left:0;top:0;pointer-events:none;mix-blend-mode:screen;filter:blur(2px) saturate(1.5)}
.chaos-thing .inner{position:absolute;left:0;top:0;display:block;border-radius:14px;box-shadow:0 12px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.22)}
</style>
</head>
<body>
<svg aria-hidden="true" style="position:fixed;width:0;height:0;z-index:0">
<defs>
<filter id="liquidRefraction" x="-12%" y="-12%" width="124%" height="124%">
<feTurbulence type="fractalNoise" baseFrequency="0.018 0.026" numOctaves="3" result="noise">
<animate attributeName="baseFrequency" values="0.018 0.026;0.031 0.023;0.018 0.026" dur="5.2s" repeatCount="indefinite"/>
</feTurbulence>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G"/>
</filter>
</defs>
</svg>

<div class="grid-bg"></div>
<div class="gauss-field" id="gaussField"></div>
<div class="motion-band" style="top:8%"></div>
<div class="motion-band b2" style="top:38%"></div>
<div class="motion-band b3" style="top:70%"></div>
<canvas id="fx0" class="layer" style="z-index:12"></canvas>
<canvas id="fx1" class="layer" style="z-index:14"></canvas>
<canvas id="fx2" class="layer" style="z-index:16"></canvas>
<canvas id="fx3" class="layer" style="z-index:18"></canvas>
<canvas id="fx4" class="layer" style="z-index:20"></canvas>
<canvas id="fx5" class="layer" style="z-index:22"></canvas>
<canvas id="fx6" class="layer" style="z-index:24"></canvas>
<canvas id="fx7" class="layer" style="z-index:26"></canvas>
<canvas id="fx8" class="layer" style="z-index:28"></canvas>
<canvas id="fx9" class="layer" style="z-index:30"></canvas>
<canvas id="fxA" class="layer" style="z-index:32"></canvas>
<canvas id="fxB" class="layer" style="z-index:34"></canvas>

<div class="chaos-field" id="chaosField"></div>
<div class="glass-layer" id="glassLayer"></div>
<div id="hud">
 <div class="title">挑战室</div>
 <div class="sub">
   多重高成本特效已启动：动态模糊 + 多层高斯模糊 + 液态玻璃。<br>
   现在进页面就开始卡，不等后面。
 </div>
 <div class="hint">当前目标：让高端设备也顶不住。</div>
</div>

<div id="dock">
 <button class="liquid-glass" id="mainGlass">点我加压</button>
 <button class="liquid-glass danger" id="detonate">一键自爆</button>
</div>
<div id="clickCounter">点击次数：0</div>

<script>
(function blockBack(){
 var allowExitAfter=Date.now()+180000;
 history.pushState(null,'',window.location.href);
 window.addEventListener('popstate',function(){
  if(Date.now()<allowExitAfter){
   history.pushState(null,'',window.location.href);
   var hint=document.querySelector('#hud .hint');
   if(hint)hint.innerHTML='你试图返回，但挑战尚未结束。<br>3 分钟后才允许正常返回。';
  }else{location.replace('/');}
 },false);
 setTimeout(function(){allowExitAfter=0;},180000);
})();

(function heavyRender(){
 var t=0;
 var baseCanvases=['fx0','fx1','fx2','fx3','fx4','fx5','fx6','fx7','fx8','fx9','fxA','fxB'].map(function(id){return document.getElementById(id);});
 var extraCanvases=[];
 var chaosItems=[];
 var chaosHost=document.getElementById('chaosField');
 var chaosShapes=['▚','▞','◼','●','■','◆','▲','●','✦','✸','⚡','⚙','🔥','🌀','⭕'];

 function fitAll(){
  for(var i=0;i<baseCanvases.length;i++){
   baseCanvases[i].width=window.innerWidth;
   baseCanvases[i].height=window.innerHeight;
  }
  for(var j=0;j<extraCanvases.length;j++){
   extraCanvases[j].width=window.innerWidth;
   extraCanvases[j].height=window.innerHeight;
  }
 }
 fitAll();
 window.addEventListener('resize',function(){fitAll();},false);

 var particles=[];
 for(var i=0;i<1400;i++){
  particles.push({
   x:Math.random()*window.innerWidth,
   y:Math.random()*window.innerHeight,
   px:0,py:0,
   vx:(Math.random()-0.5)*14,
   vy:(Math.random()-0.5)*14,
   r:2+Math.random()*18,
   hue:Math.floor(Math.random()*360),
   alpha:0.18+Math.random()*0.5,
   depth:1+Math.floor(Math.random()*4)
  });
 }

 function addExtraCanvas(){
  if(extraCanvases.length>=18)return;
  var c=document.createElement('canvas');
  c.className='layer';
  c.style.zIndex=(30+extraCanvases.length*4).toString();
  c.width=window.innerWidth;c.height=window.innerHeight;
  document.body.appendChild(c);
  extraCanvases.push(c);
 }

 function addGaussStrip(){
  if(document.querySelectorAll('.gauss-strip').length>=14)return;
  var g=document.createElement('div');
  g.className='gauss-field gauss-strip';
  g.style.top=(8+Math.random()*72)+'%';
  g.style.height=(18+Math.random()*24).toFixed(1)+'%';
  g.style.left='-10%';
  g.style.right='-10%';
  g.style.animationDuration=(2.8+Math.random()*3.2).toFixed(2)+'s';
  document.body.appendChild(g);
 }

 function addBand(){
  if(document.querySelectorAll('.extra-band').length>=18)return;
  var b=document.createElement('div');
  b.className='motion-band extra-band';
  b.style.top=(6+Math.random()*76).toFixed(1)+'%';
  b.style.height=(22+Math.random()*24).toFixed(1)+'%';
  b.style.filter='blur('+(34+Math.floor(Math.random()*70))+'px)';
  b.style.animationDuration=(3+Math.random()*4.2).toFixed(2)+'s';
  document.body.appendChild(b);
 }

 function addGlassOverlay(level){
  var layer=document.getElementById('glassLayer');
  if(!layer)return;
  if(layer.children.length>=96)return;

  var btn=document.createElement('button');
  btn.className='liquid-glass';
  btn.style.left=(6+Math.random()*72)+'%';
  btn.style.top=(12+Math.random()*66)+'%';
  btn.style.fontSize=(13+level*2)+'px';
  btn.style.borderRadius=(30+level*3)+'px';
  btn.style.backdropFilter='blur('+(36+level*18)+'px) saturate('+(2.3+level*0.6).toFixed(2)+') brightness('+(1.08+level*0.06).toFixed(2)+')';
  btn.style.webkitBackdropFilter=btn.style.backdropFilter;
  btn.style.boxShadow='inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -'+(14+level*4)+'px '+(26+level*7)+'px rgba(255,255,255,0.18), 0 '+(26+level*8)+'px '+(52+level*10)+'px rgba(0,0,0,0.55)';
  btn.textContent='加压 '+level;

  btn.addEventListener('click',function(){
   addGlassOverlay(level+1);
   addGlassOverlay(level+1);
   addBand();
   addGaussStrip();
   addExtraCanvas();
  },false);

  layer.appendChild(btn);
 }

 function addChurn(n){
  var container=document.createElement('div');
  container.style.cssText='position:fixed;inset:0;z-index:34;pointer-events:none;overflow:hidden;';
  document.body.appendChild(container);
  var chunks=[];
  for(var i=0;i<n;i++){
   var el=document.createElement('div');
   el.textContent=(i%10).toString();
   el.style.cssText='position:absolute;width:10px;height:10px;background:hsl('+i+',82%,60%);opacity:0.72;border-radius:3px;filter:blur(1px);';
   container.appendChild(el);
   chunks.push({el:el,x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,vx:(Math.random()-0.5)*7,vy:(Math.random()-0.5)*7,phase:Math.random()*6.28});
  }
  (function tick(){
   for(var i=0;i<chunks.length;i++){
    var c=chunks[i];
    c.x+=c.vx+Math.sin(c.phase)*2.6;
    c.y+=c.vy+Math.cos(c.phase)*2.6;
    c.phase+=0.12;
    if(c.x<0||c.x>window.innerWidth)c.vx*=-1;
    if(c.y<0||c.y>window.innerHeight)c.vy*=-1;
    c.el.style.transform='translate('+c.x.toFixed(1)+'px,'+c.y.toFixed(1)+'px) rotate('+(c.phase*12)+'deg)';
    c.el.style.background='hsl('+((c.phase*120)%360)+',86%,60%)';
    c.el.style.filter='blur('+((c.phase*2.4)%4).toFixed(1)+'px)';
   }
   requestAnimationFrame(tick);
  })();
 }

 function spawnChaos(){
  if(!chaosHost)return;
  if(chaosItems.length>=320)return;

  var wrap=document.createElement('div');
  wrap.className='chaos-thing';
  var inner=document.createElement('div');
  inner.className='inner';

  var shape=chaosShapes[Math.floor(Math.random()*chaosShapes.length)];
  inner.textContent=shape;
  var size=14+Math.random()*88;
  var hue=Math.floor(Math.random()*360);
  var isBlock=Math.random()<0.26;
  if(isBlock){
   inner.style.width=size+'px';
   inner.style.height=(size*0.55)+'px';
   inner.style.background='linear-gradient(135deg,hsla('+hue+',95%,62%,0.82),hsla('+((hue+60)%360)+',95%,46%,0.58),transparent 80%)';
  }else{
   inner.style.fontSize=size+'px';
   inner.style.color='hsla('+hue+',95%,64%,0.9)';
  }

  wrap.appendChild(inner);
  chaosHost.appendChild(wrap);
  chaosItems.push({
   el:wrap,
   x:Math.random()*window.innerWidth,
   y:Math.random()*window.innerHeight,
   vx:(Math.random()-0.5)*18,
   vy:(Math.random()-0.5)*18,
   rot:Math.random()*360,
   vr:(Math.random()-0.5)*42,
   phase:Math.random()*6.28,
   size:size,
   wobble:2+Math.random()*10
  });
 }

 function updateChaos(){
  for(var i=0;i<chaosItems.length;i++){
   var c=chaosItems[i];
   c.x+=c.vx+Math.sin(c.phase)*c.wobble;
   c.y+=c.vy+Math.cos(c.phase*0.82)*c.wobble;
   c.rot+=c.vr;
   c.phase+=0.07;

   if(c.x<-160)c.x=window.innerWidth+140;
   if(c.x>window.innerWidth+160)c.x=-140;
   if(c.y<-160)c.y=window.innerHeight+140;
   if(c.y>window.innerHeight+160)c.y=-140;

   c.el.style.transform='translate('+c.x.toFixed(1)+'px,'+c.y.toFixed(1)+'px) rotate('+c.rot.toFixed(1)+'deg) scale('+(0.78+Math.abs(Math.sin(c.phase*1.3))*0.95).toFixed(2)+')';
   c.el.style.filter='blur('+((c.phase*4)%7).toFixed(1)+'px) saturate('+(1.5+Math.abs(Math.cos(c.phase))*1.6).toFixed(2)+')';
  }
 }

 function drawTrailLayer(idx,offset,motionBlur){
  var c=baseCanvases[idx];
  var ctx=c.getContext('2d');
  var w=c.width,h=c.height;
  if(motionBlur){
   ctx.globalAlpha=0.42;
   ctx.clearRect(0,0,w,h);
   ctx.globalAlpha=1;
   ctx.fillStyle='rgba(3,4,10,0.22)';
   ctx.fillRect(0,0,w,h);
  }else{
   ctx.clearRect(0,0,w,h);
  }

  for(var i=0;i<particles.length;i++){
   var p=particles[i];
   p.px=p.x;p.py=p.y;
   p.x+=p.vx*(0.6+p.depth*0.25);
   p.y+=p.vy*(0.6+p.depth*0.25);
   p.hue=(p.hue+2)%360;

   if(p.x<-60)p.x=w+60;
   if(p.x>w+60)p.x=-60;
   if(p.y<-60)p.y=h+60;
   if(p.y>h+60)p.y=-60;

   var cx=p.x+Math.sin((t+offset)*0.05+i)*12;
   var cy=p.y+Math.cos((t+offset)*0.05+i)*12;

   ctx.beginPath();
   ctx.moveTo(p.px,p.py);
   ctx.lineTo(cx,cy);
   ctx.strokeStyle='hsla('+p.hue+',85%,60%,'+(p.alpha*0.55)+')';
   ctx.lineWidth=p.r*0.42;
   ctx.stroke();

   ctx.beginPath();
   ctx.arc(cx,cy,p.r+Math.sin((t+offset)*0.08+i)*3,0,Math.PI*2);
   ctx.fillStyle='hsla('+p.hue+',85%,58%,'+p.alpha+')';
   ctx.fill();
  }
 }

 function updateDynamicBlur(){
  var field=document.getElementById('gaussField');
  var bands=document.querySelectorAll('.motion-band');
  var sv=42+Math.abs(Math.sin(t*0.045))*128;
  field.style.filter='blur('+sv.toFixed(1)+'px)';

  for(var i=0;i<bands.length;i++){
   var v=26+Math.abs(Math.cos(t*0.05+i))*96;
   bands[i].style.filter='blur('+v.toFixed(1)+'px)';
  }
 }

 function frame(){
  t+=1;
  for(var i=0;i<baseCanvases.length;i++){
   drawTrailLayer(i,(i+1)*40,i%2===0);
  }

  for(var j=0;j<extraCanvases.length;j++){
   var ec=extraCanvases[j];
   var ctx=ec.getContext('2d');
   ctx.clearRect(0,0,ec.width,ec.height);
   for(var k=0;k<particles.length;k++){
    var p=particles[k];
    if((k+j)%3!==0)continue;
    ctx.beginPath();
    ctx.arc(
     p.x+Math.sin((t+j*50)*0.06+k)*10,
     p.y+Math.cos((t+j*50)*0.06+k)*10,
     p.r*0.65,
     0,
     Math.PI*2
    );
    ctx.fillStyle='hsla('+p.hue+',80%,60%,'+(p.alpha*0.6)+')';
    ctx.fill();
   }
  }

  updateDynamicBlur();
  updateChaos();
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);

 function bootstrapHeavy(){
  addExtraCanvas();addExtraCanvas();addExtraCanvas();addExtraCanvas();addExtraCanvas();addExtraCanvas();addExtraCanvas();addExtraCanvas();
  addGaussStrip();addGaussStrip();addGaussStrip();addGaussStrip();addGaussStrip();addGaussStrip();
  addBand();addBand();addBand();addBand();addBand();addBand();addBand();addBand();addBand();addBand();addBand();addBand();
  addChurn(160);addChurn(160);addChurn(160);addChurn(160);
  for(var i=0;i<160;i++)spawnChaos();

  setInterval(function(){
   spawnChaos();spawnChaos();spawnChaos();spawnChaos();spawnChaos();spawnChaos();spawnChaos();spawnChaos();spawnChaos();spawnChaos();
  },620);

  setTimeout(function(){
   addGlassOverlay(1);addGlassOverlay(1);addGlassOverlay(2);addGlassOverlay(2);addGlassOverlay(3);addGlassOverlay(3);
  },120);
  setTimeout(function(){
   addChurn(120);addChurn(120);
   addBand();addBand();
   addGaussStrip();addGaussStrip();
   addExtraCanvas();addExtraCanvas();
  },650);
  setTimeout(function(){
   addGlassOverlay(4);addGlassOverlay(4);addGlassOverlay(5);addGlassOverlay(5);addGlassOverlay(6);
   addChurn(140);
   addBand();addBand();addBand();
   addGaussStrip();addGaussStrip();addGaussStrip();
  },1300);
 }
 bootstrapHeavy();

 window.__stressAddPressure=function(){
  addGlassOverlay(1+Math.floor(Math.random()*5));
  addGlassOverlay(2+Math.floor(Math.random()*5));
  addGlassOverlay(3+Math.floor(Math.random()*6));
  addGlassOverlay(4+Math.floor(Math.random()*6));
  addBand();addBand();addBand();
  addGaussStrip();addGaussStrip();addGaussStrip();
  addExtraCanvas();addExtraCanvas();
  addChurn(64);
  spawnChaos();spawnChaos();spawnChaos();spawnChaos();spawnChaos();spawnChaos();
 };

 window.__stressDetonate=function(){
  var mainBtn=document.getElementById('mainGlass');
  var detBtn=document.getElementById('detonate');
  var counter=document.getElementById('clickCounter');
  var hint=document.querySelector('#hud .hint');

  if(mainBtn){
   mainBtn.textContent='已引爆';
   mainBtn.disabled=true;
  }
  if(detBtn){
   detBtn.textContent='持续自爆';
   detBtn.disabled=true;
  }
  if(hint){
   hint.innerHTML='已触发一键自爆。<br>现在不考虑性能，只持续加压。';
  }

  setInterval(function(){
   window.__stressAddPressure();
   spawnChaos();spawnChaos();spawnChaos();
  },120);

  for(var i=0;i<10;i++){
   (function delayIndex){
    setTimeout(function(){
     window.__stressAddPressure();
     window.__stressAddPressure();
     window.__stressAddPressure();
     spawnChaos();spawnChaos();spawnChaos();spawnChaos();
    },delayIndex*90);
   }();
  }

  if(counter)counter.textContent='点击次数：自爆中';
 };
})();

(function domChurn(){
 var container=document.createElement('div');
 container.style.cssText='position:fixed;inset:0;z-index:28;pointer-events:none;overflow:hidden;';
 document.body.appendChild(container);

 var chunks=[];
 for(var i=0;i<520;i++){
  var el=document.createElement('div');
  el.textContent=i.toString();
  el.style.cssText='position:absolute;width:9px;height:9px;background:hsl('+i+',80%,60%);opacity:0.72;border-radius:3px;filter:blur(1px);';
  container.appendChild(el);
  chunks.push({el:el,x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,vx:(Math.random()-0.5)*7,vy:(Math.random()-0.5)*7,phase:Math.random()*6.28});
 }

 function tick(){
  for(var i=0;i<chunks.length;i++){
   var c=chunks[i];
   c.x+=c.vx+Math.sin(c.phase)*2.6;
   c.y+=c.vy+Math.cos(c.phase)*2.6;
   c.phase+=0.11;
   if(c.x<0||c.x>window.innerWidth)c.vx*=-1;
   if(c.y<0||c.y>window.innerHeight)c.vy*=-1;
   c.el.style.transform='translate('+c.x.toFixed(1)+'px,'+c.y.toFixed(1)+'px) rotate('+(c.phase*12)+'deg)';
   c.el.style.background='hsl('+((c.phase*120)%360)+',85%,60%)';
   c.el.style.filter='blur('+((c.phase*2.2)%4).toFixed(1)+'px)';
  }
  requestAnimationFrame(tick);
 }
 requestAnimationFrame(tick);
})();

(function timerStorm(){
 var tickCount=0;
 var timers=[];
 for(var i=0;i<26;i++){
  timers.push(setInterval(function(idx){
   tickCount++;
   var canvas=document.getElementById('fx'+(idx%12));
   if(!canvas)return;
   var ctx=canvas.getContext('2d');
   ctx.save();
   ctx.globalAlpha=0.05;
   ctx.translate(Math.random()*30-15,Math.random()*30-15);
   ctx.scale(1+Math.random()*0.08,1+Math.random()*0.08);
   ctx.fillStyle='hsl('+((tickCount*9)%360)+',75%,50%)';
   ctx.fillRect(0,0,24,24);
   ctx.restore();
  },36+i*20,i));
 }
})();

(function controls(){
 var mainBtn=document.getElementById('mainGlass');
 var detBtn=document.getElementById('detonate');
 var counter=document.getElementById('clickCounter');
 var clickCount=0;

 mainBtn.addEventListener('click',function(){
  clickCount++;
  if(counter)counter.textContent='点击次数：'+clickCount;
  if(window.__stressAddPressure)window.__stressAddPressure();
 },false);

 detBtn.addEventListener('click',function(){
  if(window.__stressDetonate)window.__stressDetonate();
 },false);
})();
</script>
</body>
</html>`;
