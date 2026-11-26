QLab.register({
id:'c10_tropism',code:'10-B6',title:'Plant movements: bending to light and gravity',grade:10,subject:'Biology',emoji:'🌻',
hook:{title:'Plants have no muscles or nerves. How do they turn towards the Sun?',text:'Plants respond to light and gravity with growth movements called tropisms, controlled by a chemical messenger called auxin. Grow seedlings under different lamps and see.'},
prior:'You know that plants grow upwards towards light and that roots grow into the soil.',
guess:{q:'A seedling grows near a window. Over several days its shoot bends…',options:['away from the window','towards the window','stays exactly straight','downwards'],answer:1,hint:'Plants need light for photosynthesis.',after:'Try different lamp positions.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A seedling with its roots, a lamp that can be moved left, right or above, and a pot that can be turned on its side'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const bx=W/2,by=P?390:320,Lmax=P?110:130;
 let light='top',side=false,g=0,busy=false,day=0,flags=new Set();
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const gP=E('g',{},sc.gMain),gL=E('g',{},sc.gMain);
 const LP={left:[P?50:90,P?250:230],right:[W-(P?50:90),P?250:230],top:[bx,P?120:112]};
 function plant(){gP.innerHTML='';
  // soil block
  E('rect',{x:bx-70,y:by,width:140,height:P?70:80,rx:8,fill:'#8a5a3a',stroke:'#5a3a22','stroke-width':3},gP);E('rect',{x:bx-70,y:by,width:140,height:10,fill:'#6b4429'},gP);
  const dark=light==='off';
  const Ls=Lmax*(.35+.65*g)*(dark?1.35:1),col=dark?'#eef0a8':'#3fae4b';
  let phi=0;if(side)phi=90*(1-g);else if(light==='left')phi=-38*g;else if(light==='right')phi=38*g;
  const r=phi*Math.PI/180;
  // shoot: starts vertical (upright) or horizontal (side), curves toward target
  const st=side?Math.PI/2:0;const tip=[bx+Ls*Math.sin(r),by-Ls*Math.cos(r)],ctl=[bx+Ls*.5*Math.sin(st),by-Ls*.5*Math.cos(st)];
  E('path',{d:`M${bx} ${by} Q${ctl[0]} ${ctl[1]} ${tip[0]} ${tip[1]}`,fill:'none',stroke:col,'stroke-width':dark?5:8,'stroke-linecap':'round'},gP);
  const lc=dark?'#f3f5b8':'#4fc25a',lm=Math.min(1,g*1.3);if(!dark&&g>.2){E('ellipse',{cx:tip[0]-12,cy:tip[1]+2,rx:13*lm,ry:6*lm,fill:lc,transform:`rotate(-30 ${tip[0]-12} ${tip[1]+2})`},gP);E('ellipse',{cx:tip[0]+12,cy:tip[1]+2,rx:13*lm,ry:6*lm,fill:lc,transform:`rotate(30 ${tip[0]+12} ${tip[1]+2})`},gP)}
  if(dark&&g>.2)E('circle',{cx:tip[0],cy:tip[1],r:6,fill:'#e8e290'},gP);
  // root
  const Rl=(P?44:52)*(.4+.6*g),rphi=side?-90*(1-g):0,rr=rphi*Math.PI/180,rst=side?-Math.PI/2:0;
  const rt=[bx+Rl*Math.sin(-rr*-1*-1)*(side?1:0)+0,0];
  const ro=[bx+Rl*Math.sin(rr),by+10+Rl*Math.cos(rr)],rc=[bx+Rl*.5*Math.sin(rst),by+10+Rl*.5*Math.cos(rst)];
  E('path',{d:`M${bx} ${by+6} Q${rc[0]} ${rc[1]} ${ro[0]} ${ro[1]}`,fill:'none',stroke:'#f2e3c4','stroke-width':5,'stroke-linecap':'round'},gP);
  [[-.5,.55],[.5,.7]].forEach(([dx,t])=>{const px=bx+(rc[0]-bx)*0,mx=(bx+ro[0])/2,my=(by+ro[1])/2;E('line',{x1:mx,y1:my,x2:mx+dx*18,y2:my+10,stroke:'#f2e3c4','stroke-width':2.5},gP)});
  T(gP,bx,by+(P?60:70),side?'Pot on its side':'Pot upright',{'font-size':12,'font-weight':900,fill:'#f5e6d0',class:''});
  T(gP,bx+(P?96:110),by+(P?30:34),day?'Day '+day:'Day 0',{'font-size':P?13:16,'font-weight':900,fill:'#237a47',class:''})}
 function lamp(){gL.innerHTML='';if(light==='off')return;const p=LP[light];E('circle',{cx:p[0],cy:p[1],r:16,fill:'#fff6b8',stroke:'#e0a800','stroke-width':4},gL);E('rect',{x:p[0]-8,y:p[1]+(light==='top'?14:-24),width:16,height:10,rx:3,fill:'#8a6a3a'},gL);
  for(let k=-2;k<=2;k++){const tx=bx+k*18,ty=by-60+Math.abs(k)*8;E('line',{x1:p[0]+(light==='left'?18:light==='right'?-18:k*6),y1:p[1]+(light==='top'?18:k*6),x2:light==='top'?tx:bx+(light==='left'?-30:30),y2:light==='top'?ty:by-60+k*14,stroke:'#ffd84a','stroke-width':2,opacity:.45,'stroke-dasharray':'6 6'},gL)}
  T(gL,p[0],p[1]+(light==='top'?38:42),'Lamp',{'font-size':12,'font-weight':900,fill:'#8a5a00',class:''})}
 function ctl(){api.ctrl.querySelectorAll('[data-l]').forEach(b=>b.className=b.dataset.l===light?'pri':'');api.ctrl.querySelectorAll('[data-p]').forEach(b=>b.className=(b.dataset.p==='side')===side?'pri':'');const c=api.ctrl.querySelector('#fl');if(c){const t=[['left','Light from left: bends left'],['right','Light from right: bends right'],['dark','No light: tall, pale, weak'],['side','On its side: shoot up, root down']];c.innerHTML=t.map(x=>`<span style="display:inline-block;margin:2px 8px 2px 0;font-size:13px">${flags.has(x[0])?'✅':'⬜'} ${x[1]}</span>`).join('')}}
 const reset=()=>{g=0;day=0;plant();lamp();ctl()};
 sc.light=l=>{if(busy)return;light=l;side=false;L.snd.pop&&L.snd.pop();reset();sc.say(l==='off'?'Lamp off: complete darkness.':'Lamp '+l+'. Now grow the seedling.')};
 sc.pot=s=>{if(busy)return;side=s==='side';if(side)light='top';L.snd.pop&&L.snd.pop();reset();sc.say(side?'Pot turned on its side. Grow it and watch both shoot and root.':'Pot upright.')};
 sc.grow=async()=>{if(busy)return;busy=true;sc.say('Growing for 5 days…');for(let i=1;i<=10;i++){g=i/10;day=Math.ceil(i/2);plant();await sc.sleep(260)}busy=false;
  const k=side?'side':light==='left'?'left':light==='right'?'right':light==='off'?'dark':null;
  if(chal){if(light==='right')api.solved();else api.nope(light==='left'?'The shoot bent left, towards the lamp. To bend right the light must come from the right.':'The shoot grew upright. A shoot only bends if light comes from one side.')}
  else{if(k)flags.add(k);ctl();sc.say(light==='left'||light==='right'?'The shoot bent TOWARDS the light: positive phototropism.':light==='off'?'In the dark: tall, pale and weak (etiolated). It is searching for light.':side?'The shoot turned UP and the root turned DOWN: gravity effects (geotropism).':'Light from above: straight up.','ok');if(flags.size===4){api.award('did');api.ready()}}};
 api.ctrl.innerHTML=(chal?'<p style="margin:0 0 6px;font-size:14px"><b>Make the shoot bend to the RIGHT.</b> Place the lamp, then grow.</p>':'<p style="margin:0 0 4px;font-size:14px"><b>Choose the light</b> (or turn the pot), then grow for 5 days. Tick all four.</p>')+'<div class="row"><button data-l="left">💡 Left</button><button data-l="right">💡 Right</button><button data-l="top">💡 Above</button><button data-l="off">🌑 Off</button></div>'+(chal?'':'<div class="row"><button data-p="up">Pot upright</button><button data-p="side">Pot on its side</button></div>')+'<div class="row"><button class="pri" id="gr">🌱 Grow 5 days</button></div>'+(chal?'':'<div id="fl"></div>');
 api.ctrl.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>sc.light(b.dataset.l));api.ctrl.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>sc.pot(b.dataset.p));api.ctrl.querySelector('#gr').onclick=()=>sc.grow();
 plant();lamp();ctl();sc.say(chal?'Which lamp position bends it right?':'Pick where the light comes from.')},
demo:[[S=>S.light('left'),'Lamp on the left.',800],[S=>S.grow(),'The shoot bends towards the light.',3200],[S=>S.light('off'),'Now complete darkness.',800],[S=>S.grow(),'Tall, pale and weak.',3200],[S=>S.pot('side'),'Pot on its side.',800],[S=>S.grow(),'Shoot turns up, root turns down.',3200]],
why:['A <span class="word">tropism</span> is a growth movement in response to a stimulus. Shoots show <b>positive phototropism</b> (towards light) and <b>negative geotropism</b> (away from gravity).','Roots show <b>positive geotropism</b> (towards gravity), so they grow down into the soil.','The messenger is the plant hormone <span class="word">auxin</span>. Light makes auxin move to the shaded side, where cells elongate more, so the shoot bends towards the light.','Plants kept in the dark grow tall, pale and weak as they search for light. Other hormones: gibberellins (stem growth), cytokinins (cell division), abscisic acid (stops growth).'],
check:[{q:'A shoot bends towards light. This is called…',options:['Geotropism','Positive phototropism','Hydrotropism','Negative phototropism'],answer:1,why:'Photo = light; positive = towards.',hint:'Towards light.'},
 {q:'Which hormone causes the bending?',options:['Insulin','Auxin','Adrenaline','Thyroxine'],answer:1,why:'Auxin moves to the shaded side and makes cells there grow longer.',hint:'Plant hormone.'},
 {q:'A seedling grown in complete darkness looks…',options:['short and dark green','tall, thin and pale','exactly like normal','dead at once'],answer:1,why:'It stretches searching for light (etiolation).',hint:'You saw it.'}],
challenge:{text:'Make the shoot <b>bend to the right</b>. Where must the lamp be?',win:'The shoot bends towards the light, so the lamp must be on the right.'},
real:['Sunflowers track the Sun (heliotropism).','Window plants lean outwards, so we turn pots regularly.','Roots follow gravity, so seeds sprout the right way up whichever way they fall.'],
words:{Tropism:'A growth movement in response to a stimulus.',Phototropism:'Bending towards or away from light.',Geotropism:'Growth response to gravity.',Auxin:'A plant hormone that makes cells grow longer.'}
});
