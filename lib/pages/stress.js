// BACK Shop - 重载特效页 v3
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

/* 多层高斯模糊场 */
.gauss-field{position:fixed;inset:-12%;z-index:6;pointer-events:none;opacity:0.72;mix-blend-mode:screen;filter:blur(48px);background:
 radial-gradient(circle at 16% 26%,rgba(70,110,255,0.58),transparent 30%),
 radial-gradient(circle at 76% 18%,rgba(255,60,205,0.5),transparent 28%),
 radial-gradient(circle at 26% 78%,rgba(60,215,255,0.52),transparent 32%),
 radial-gradient(circle at 84% 82%,rgba(150,255,170,0.4),transparent 28%);
 animation:gaussPulse 4.2s ease-in-out infinite alternate}
@keyframes gaussPulse{
 from{filter:blur(28px);transform:scale(1) translateX(-3%)}
 to{filter:blur(92px);transform:scale(1.24) translateX(4%)}
}

/* 动态模糊带 */
.motion-band{position:fixed;left:-18%;right:-18%;height:34%;z-index:10;pointer-events:none;mix-blend-mode:screen;filter:blur(32px);opacity:0.46;background:linear-gradient(90deg,rgba(90,120,255,0.58),rgba(255,80,220,0.52),rgba(80,255,210,0.48),rgba(90,120,255,0.58));animation:bandSweep 3.4s ease-in-out infinite alternate}
.motion-band.b2{height:44%;animation-duration:5.8s;animation-direction:alternate-reverse;filter:blur(54px);opacity:0.4}
.motion-band.b3{height:28%;animation-duration:4.6s;filter:blur(80px);opacity:0.34}
@keyframes bandSweep{
 0%{transform:translateX(-16%) translateY(-10%) skewX(-14deg)}
 100%{transform:translateX(16%) translateY(12%) skewX(14deg)}
}

/* 液态玻璃 */
.glass-swarm{position:fixed;inset:0;z-index:92;pointer-events:none}
.liquid-glass{
 position:fixed;z-index:95;min-width:150px;min-height:72px;padding:16px 20px;border-radius:30px;cursor:pointer;user-select:none;
 border:1px solid rgba(255,255,255,0.38);color:#fff;font-size:15px;font-weight:700;letter-spacing:1px;
 background:
  linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.08)),
  radial-gradient(circle at 28% 18%,rgba(255,255,255,0.4),transparent 42%);
 backdrop-filter:blur(32px) saturate(2.2) brightness(1.12);
 -webkit-backdrop-filter:blur(32px) saturate(2.2) brightness(1.12);
 box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.62),
  inset 0 -16px 28px rgba(255,255,255,0.15),
  0 24px 54px rgba(0,0,0,0.5);
 transition:transform .1s ease,filter .12s ease}
.liquid-glass::before{content:"";position:absolute;inset:10px;border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,0.32),transparent 55%);opacity:0.62;pointer-events:none}
.liquid-glass:active{transform:scale(0.95)}
.liquid-glass.large{min-width:210px;min-height:96px;font-size:19px;padding:22px 26px}
.liquid-glass.warn{border-color:rgba(255,170,80,0.6);background:linear-gradient(180deg,rgba(255,210,150,0.26),rgba(255,170,80,0.12)),radial-gradient(circle at 30% 20%,rgba(255,255,255,0.35),transparent 40%)}

#clickCounter{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:98;padding:10px 16px;border-radius:18px;font-size:12px;color:#fff;background:rgba(0,0,0,0.42);border:1px solid rgba(255,255,255,0.18);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
</style>
</head>
<body>
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

<div class="glass-swarm" id="glassSwarm"></div>
<div id="hud">
 <div class="title">挑战室</div>
 <div class="sub">
   多重高成本特效已启动：动态模糊 + 多层高斯模糊 + 液态玻璃堆叠。<br>
   每点一次玻璃按钮，会继续叠加更多渲染层。
 </div>
 <div class="hint">当前目标：让高端设备也顶不住。</div>
</div>
<div id="clickCounter">点击次数：0</div>

<script>
// 返回劝退：不做真锁死
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

// 全局多画布 + 动态模糊 + 运动拖尾
(function heavyRender(){
 var t=0;
 var baseCanvases=['fx0','fx1','fx2','fx3','fx4','fx5','fx6','fx7'].map(function(id){return document.getElementById(id);});

 function fitAll(){
  for(var i=0;i<baseCanvases.length;i++){
   baseCanvases[i].width=window.innerWidth;
   baseCanvases[i].height=window.innerHeight;
  }
 }
 fitAll();
 window.addEventListener('resize',fitAll);

 var particles=[];
 for(var i=0;i<420;i++){
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

 var extraCanvases=[];
 function addExtraCanvas(){
  if(extraCanvases.length>=10)return;
  var c=document.createElement('canvas');
  c.className='layer';
  c.style.zIndex=(30+extraCanvases.length*4).toString();
  c.width=window.innerWidth;c.height=window.innerHeight;
  document.body.appendChild(c);
  extraCanvases.push(c);
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
  var sv=24+Math.abs(Math.sin(t*0.045))*78;
  field.style.filter='blur('+sv.toFixed(1)+'px)';

  for(var i=0;i<bands.length;i++){
   var v=18+Math.abs(Math.cos(t*0.05+i))*72;
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
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);

 window.__addExtraCanvas=addExtraCanvas;
})();

// DOM 高频扰动：更强
(function domChurn(){
 var container=document.createElement('div');
 container.style.cssText='position:fixed;inset:0;z-index:28;pointer-events:none;overflow:hidden;';
 document.body.appendChild(container);

 var chunks=[];
 for(var i=0;i<260;i++){
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

// 高频 timer
(function timerStorm(){
 var tickCount=0;
 var timers=[];
 for(var i=0;i<12;i++){
  timers.push(setInterval(function(idx){
   tickCount++;
   var canvas=document.getElementById('fx'+(idx%8));
   if(!canvas)return;
   var ctx=canvas.getContext('2d');
   ctx.save();
   ctx.globalAlpha=0.05;
   ctx.translate(Math.random()*30-15,Math.random()*30-15);
   ctx.scale(1+Math.random()*0.08,1+Math.random()*0.08);
   ctx.fillStyle='hsl('+((tickCount*9)%360)+',75%,50%)';
   ctx.fillRect(0,0,24,24);
   ctx.restore();
  },38+i*22,i));
 }
})();

// 液态玻璃按钮群 v2
(function liquidGlassSwarm(){
 var swarm=document.getElementById('glassSwarm');
 var clickCount=0;
 var counter=document.getElementById('clickCounter');
 var labels=['点我加压','继续','再狠一点','顶不住','别点了','最后一层'];

 function randPos(){
  return {left:(6+Math.random()*74)+'%',top:(10+Math.random()*72)+'%'};
 }

 function makeGlass(level){
  var btn=document.createElement('button');
  btn.className='liquid-glass '+(level>=2?'large':'')+(level>=3?'warn':'');
  var pos=randPos();
  btn.style.left=pos.left;
  btn.style.top=pos.top;
  btn.style.backdropFilter='blur('+(24+level*14)+'px) saturate('+(1.9+level*0.55).toFixed(2)+') brightness('+(1+level*0.06).toFixed(2)+')';
  btn.style.webkitBackdropFilter=btn.style.backdropFilter;
  btn.textContent=labels[level]||'继续加压';
  btn.style.fontSize=(15+level*2)+'px';
  btn.style.borderRadius=(28+level*4)+'px';
  btn.style.boxShadow='inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -'+(12+level*3)+'px '+(24+level*6)+'px rgba(255,255,255,0.15), 0 '+(24+level*6)+'px '+(48+level*8)+'px rgba(0,0,0,0.5)';
  swarm.appendChild(btn);

  btn.addEventListener('click',function(){
   clickCount++;
   counter.textContent='点击次数：'+clickCount;

   addGlass(level+1);

   if(window.__addExtraCanvas)window.__addExtraCanvas();

   if(clickCount<=30){
    var blur=document.createElement('div');
    blur.className='motion-band';
    blur.style.top=(6+(clickCount*4)%70)+'%';
    blur.style.height=(20+Math.random()*28).toFixed(1)+'%';
    blur.style.filter='blur('+(24+clickCount*5)+'px)';
    blur.style.opacity='0.36';
    blur.style.animationDuration=(3.2+Math.random()*4).toFixed(1)+'s';
    document.body.appendChild(blur);
   }

   if(clickCount<=24){
    var churn=document.createElement('div');
    churn.style.cssText='position:fixed;inset:0;z-index:30;pointer-events:none;overflow:hidden;';
    document.body.appendChild(churn);
    for(var i=0;i<70;i++){
     var d=document.createElement('div');
     d.style.cssText='position:absolute;width:8px;height:8px;background:hsl('+i+',80%,60%);opacity:0.7;border-radius:2px;filter:blur(2px);';
     churn.appendChild(d);
    }
   }

   var hint=document.querySelector('#hud .hint');
   if(hint&&clickCount>0){
    hint.innerHTML='你已点击 '+clickCount+' 次。<br>页面正在继续自我加压。';
   }
  });
 }

 function addGlass(level){
  if(clickCount<60)makeGlass(level%5);
 }

 for(var i=0;i<14;i++){
  makeGlass(i%5);
 }
})();
</script>
</body>
</html>`;