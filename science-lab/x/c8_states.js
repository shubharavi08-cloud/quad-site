QLab.register({
id:'c8_states',code:'8-C1',title:'Particles in a solid, a liquid and a gas',grade:8,subject:'Chemistry',emoji:'🧊',
hook:{title:'Ice, water and steam are the same stuff. Why do they look so different?',text:'Everything around you is made of tiny moving particles. Heating or cooling changes how they move. Let us watch them.'},
prior:'Nothing! You only need to know that ice melts and water boils.',
guess:{q:'What happens to the tiny particles of water when it gets hotter?',options:['They get bigger','They move faster','They stop moving','They disappear'],answer:1,hint:'Think of kids in a classroom: calm when sitting, wild when the bell rings.',after:'Heat the water below and watch.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A beaker of water particles with a burner, ice and a thermometer'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const mx=P?170:300,my=P?330:340,bw=P?170:190,bh=P?200:210;
 const jar=sc.vessel({x:mx,y:my,type:'beaker',w:bw,h:bh,level:0,label:'Water particles'});
 const gP=E('g',{},sc.gMain),gI=E('g',{},sc.gMain);
 const x0=mx-bw/2+12,x1=mx+bw/2-12,yt=my-bh+16,yb=my-12,pr=8,N=30;
 let Tm=-10,dispT=-10,busy=false;const seen={};
 const cols={solid:'#9fd8f8',liquid:'#2aa5d8',gas:'#7a5cf0'};
 const state=t=>t<0?'solid':t<100?'liquid':'gas';
 const ps=[];const cols8=6;for(let i=0;i<N;i++){const c=i%cols8,r=Math.floor(i/cols8);const hx=mx-(cols8-1)*pr+c*pr*2.1,hy=yb-pr-r*pr*2.1;const o={c:E('circle',{r:pr,fill:cols.solid,stroke:'#fff','stroke-width':1.5},gP),hx,hy,x:hx,y:hy,vx:Math.random()-.5,vy:Math.random()-.5};ps.push(o)}
 // thermometer
 const thx=P?352:mx+bw/2+60,thy=my-bh+10,thh=bh-30;
 E('rect',{x:thx-7,y:thy,width:14,height:thh,rx:7,fill:'#fff',stroke:'#5a6a85','stroke-width':3},sc.gMain);E('circle',{cx:thx,cy:thy+thh+4,r:12,fill:'#e5484d',stroke:'#5a6a85','stroke-width':3},sc.gMain);
 const merc=E('rect',{x:thx-4,y:thy,width:8,height:thh,rx:4,fill:'#e5484d'},sc.gMain);const tval=T(sc.gMain,thx,thy-8,'',{'font-size':15,'font-weight':900,fill:'#2b2350',class:''});
 [[0,'0°'],[100,'100°']].forEach(([v,t])=>{const y=thy+thh-(v+20)/150*thh;E('line',{x1:thx+8,x2:thx+16,y1:y,y2:y,stroke:'#2b2350','stroke-width':2},sc.gMain);T(sc.gMain,thx+34,y+4,t,{'font-size':11,'text-anchor':'start'}).setAttribute('text-anchor','start')});
 const stl=T(sc.gMain,mx,my+(P?66:68),'',{'font-size':15,'font-weight':800,fill:'#2b2350',class:''});
 function readout(){const y=thy+thh-(dispT+20)/150*thh;merc.setAttribute('y',y);merc.setAttribute('height',thy+thh-y+4);tval.textContent=Math.round(dispT)+' °C';const s=state(dispT);stl.textContent={solid:'Solid ice',liquid:'Liquid water',gas:'Gas: steam'}[s]}
 let raf=0;
 function tick(){if(!stage.isConnected)return;const s=state(dispT),sp=Math.max(.35,(dispT+30)/50);
  ps.forEach(p=>{let tx,ty;
   if(s==='solid'){tx=p.hx+(Math.random()-.5)*2.4;ty=p.hy+(Math.random()-.5)*2.4;p.x+=(tx-p.x)*.35;p.y+=(ty-p.y)*.35}
   else if(s==='liquid'){p.vx+=(Math.random()-.5)*.9*sp;p.vy+=(Math.random()-.5)*.9*sp;p.vx*=.88;p.vy*=.88;p.x+=p.vx*sp*1.2;p.y+=p.vy*sp*1.2;const top=yb-90;if(p.x<x0)p.vx=Math.abs(p.vx);if(p.x>x1)p.vx=-Math.abs(p.vx);if(p.y>yb)p.vy=-Math.abs(p.vy);if(p.y<top)p.vy=Math.abs(p.vy);p.y+=(yb-30-p.y)*.01}
   else{if(Math.hypot(p.vx,p.vy)<2.2){p.vx*=1.6;p.vy*=1.6;if(Math.hypot(p.vx,p.vy)<.5){p.vx=(Math.random()-.5)*4;p.vy=(Math.random()-.5)*4}}p.x+=p.vx*1.4;p.y+=p.vy*1.4;if(p.x<x0||p.x>x1)p.vx*=-1;if(p.y<yt||p.y>yb)p.vy*=-1;p.x=Math.max(x0,Math.min(x1,p.x));p.y=Math.max(yt,Math.min(yb,p.y))}
   p.c.setAttribute('cx',p.x);p.c.setAttribute('cy',p.y);p.c.setAttribute('fill',cols[s])});
  raf=requestAnimationFrame(tick)}
 sc.setT=async v=>{if(busy)return;busy=true;Tm=Math.max(-20,Math.min(130,v));const a=dispT,st=performance.now(),dur=Math.min(1600,300+Math.abs(Tm-a)*14);
  await new Promise(res=>{const f=n=>{const k=Math.min(1,(n-st)/dur);dispT=a+(Tm-a)*k;readout();k<1?requestAnimationFrame(f):res()};requestAnimationFrame(f)});
  const s=state(Tm);seen[s]=1;readout();
  const msg={solid:'Solid: particles are packed in a pattern and only jiggle.',liquid:'Liquid: particles touch but slide past each other. That is why water flows.',gas:'Gas: particles are far apart and zoom around. They fill the whole beaker.'}[s];sc.say(msg,'');
  if(!chal&&seen.solid&&seen.liquid&&seen.gas){api.award('did');api.ready()}busy=false};
 sc.heat=d=>sc.setT(Tm+d);
 sc.tea=()=>{if(busy)return;const s=state(Tm);if(s==='liquid'&&Tm>80){L.snd.ok&&L.snd.ok();sc.say('Perfect tea water: liquid and hot.','ok');api.solved()}else{L.snd.no&&L.snd.no();const m=s==='gas'?'At '+Tm+' °C the water is steam, a gas. You need a liquid.':s==='solid'?'At '+Tm+' °C the water is ice, a solid. You need a liquid.':'It is a liquid, but only '+Tm+' °C. Tea needs water hotter than 80 °C.';sc.say(m,'warn');api.nope(m)}};
 sc.tool({x:P?60:560,y:P?492:372,label:'Burner +10°',ly:34,scale:1,draw:g=>{E('rect',{x:-18,y:2,width:36,height:12,rx:3,fill:'#8a96a8',stroke:'#4a5568','stroke-width':2},g);const f=E('text',{x:0,y:0,'text-anchor':'middle','font-size':26},g);f.textContent='🔥'},use:()=>sc.heat(10)});
 sc.tool({x:P?170:660,y:P?492:372,label:'Ice −10°',ly:34,scale:1,draw:g=>{E('rect',{x:-14,y:-12,width:28,height:26,rx:5,fill:'#dff3ff',stroke:'#5aa6d8','stroke-width':3},g)},use:()=>sc.heat(-10)});
 if(chal)sc.tool({x:P?290:460,y:P?492:372,label:'Make tea',ly:34,scale:1,draw:g=>{E('path',{d:'M-14 -8 H14 V8 Q14 18 0 18 Q-14 18 -14 8 Z',fill:'#fff',stroke:'#8a6a2a','stroke-width':3},g);E('rect',{x:-3,y:-18,width:6,height:12,fill:'#a0693a'},g)},use:()=>sc.tea()});
 readout();tick();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px">${chal?'<b>Make the water a liquid hotter than 80 °C, then drag the teabag in.</b>':'<b>Drag the burner or ice onto the beaker</b> to change the temperature.'}</p><div class="row" style="flex-wrap:wrap"><button class="pri" id="hb">🔥 +10 °C</button><button id="ib">🧊 −10 °C</button><button id="h30">🔥 +30 °C</button>${chal?'<button class="pri" id="tb">🍵 Make tea</button>':''}</div>${chal?'':'<p class="lockhint" style="margin:6px 0 0;text-align:left">See solid, liquid and gas to unlock the next step.</p>'}`;
 const q=s=>api.ctrl.querySelector(s);q('#hb').onclick=()=>sc.heat(10);q('#ib').onclick=()=>sc.heat(-10);q('#h30').onclick=()=>sc.heat(30);if(chal)q('#tb').onclick=()=>sc.tea();
 sc.say('Ice at −10 °C. Heat it up and watch the particles.')},
demo:[[S=>S.setT(-10),'Cold ice: particles packed, just jiggling.',900],[S=>S.setT(40),'Warm it up: ice melts to liquid. The particles slide.',1200],[S=>S.setT(120),'Heat it past 100 °C: a gas. The particles fly apart.',1400]],
why:['In a <b>solid</b>, particles are packed tightly in a fixed pattern. They cannot move around, they only jiggle.','Heat gives particles <b>energy</b>, so they jiggle harder until they break free. That is <span class="word">melting</span>.','In a <b>liquid</b>, particles still touch but slide past each other, so a liquid takes the shape of its container.','In a <b>gas</b>, particles are far apart and move very fast, so a gas spreads out and fills the whole space.'],
check:[{q:'Which state has particles that are far apart and move fastest?',options:['Solid','Liquid','Gas','All the same'],answer:2,why:'In a gas the particles have the most energy and the most space.',hint:'Think about steam spreading in a kitchen.'},
 {q:'Why can you pour water but not ice?',options:['Water particles are smaller','Water particles can slide past each other','Ice particles are hotter','Water has no particles'],answer:1,why:'Liquid particles slide past each other. In ice they are held in place.',hint:'Compare the liquid and solid pictures.'},
 {q:'You heat a liquid. What happens to its particles?',options:['They slow down','They move faster','They stop','They get colder'],answer:1,why:'More heat means more energy, so the particles move faster.',hint:'Move the slider to the right and watch.'}],
challenge:{text:'Set the temperature so the water is still a <b>liquid</b> but hot enough to make tea (<b>above 80 °C</b>).',win:'Just right. Water boils at 100 °C, so you stayed in the liquid zone.'},
real:['Steam from a hot cooker (gas) turns back into water drops on the lid.','Ice cubes melt in a glass of juice as the juice particles pass energy to them.','Wet clothes dry because liquid water slowly becomes a gas, even below 100 °C.'],
words:{Particle:'A tiny piece that matter is made of.',Solid:'Fixed shape. Particles are packed and only jiggle.',Liquid:'Flows. Particles touch but slide.',Gas:'Fills space. Particles are far apart and fast.',Melting:'A solid becoming a liquid.'}
});
