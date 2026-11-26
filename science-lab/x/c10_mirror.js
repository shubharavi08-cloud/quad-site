QLab.register({
id:'c10_mirror',code:'10-P1',title:'Reflection of light: the law of reflection',grade:10,subject:'Physics',emoji:'🪞',
hook:{title:'How does a mirror send light back?',text:'A torch beam hits a mirror and bounces away. Does it go anywhere, or is there a rule? Move the torch and measure both angles.'},
prior:'You know that light travels in straight lines and a mirror shows your image.',
guess:{q:'A ray hits a plane mirror at 30° to the normal (the line standing straight out of the mirror). At what angle does it leave?',options:['10°','30°','60°','90°'],answer:1,hint:'Think of a ball bouncing off a wall: it leaves at the same slant.',after:'Test it with real angles.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A torch on an arc above a plane mirror, with the normal, incident and reflected rays and angles'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const ox=W/2,oy=P?340:290,R=P?150:170,TG=50;let ang=chal?15:20,pts=[],won=false;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const g=E('g',{},sc.gMain),rad=a=>a*Math.PI/180;
 const pos=(a,r)=>[ox-r*Math.sin(rad(a)),oy-r*Math.cos(rad(a))],posR=(a,r)=>[ox+r*Math.sin(rad(a)),oy-r*Math.cos(rad(a))];
 function draw(){g.innerHTML='';const mw=P?170:200;
  E('rect',{x:ox-mw,y:oy,width:mw*2,height:10,fill:'#bfe3f2',stroke:'#4a6a80','stroke-width':3,rx:3},g);E('rect',{x:ox-mw,y:oy+10,width:mw*2,height:12,fill:'#8a6a4a'},g);
  for(let x=ox-mw+6;x<ox+mw;x+=14)E('line',{x1:x,y1:oy+22,x2:x-8,y2:oy+34,stroke:'#8a6a4a','stroke-width':2},g);
  E('line',{x1:ox,y1:oy,x2:ox,y2:oy-R-14,stroke:'#55688a','stroke-width':2,'stroke-dasharray':'6 5'},g);T(g,ox+4,oy-R-18,'normal',{'font-size':12,'text-anchor':'start',class:''});
  // arc and scale ticks
  E('path',{d:`M${pos(85,R)[0]} ${pos(85,R)[1]} A${R} ${R} 0 0 1 ${posR(85,R)[0]} ${posR(85,R)[1]}`,fill:'none',stroke:'#e1d7ff','stroke-width':3},g);
  for(let a=0;a<=80;a+=10){const p=pos(a,R),q=pos(a,R-8),pr=posR(a,R),qr=posR(a,R-8);E('line',{x1:p[0],y1:p[1],x2:q[0],y2:q[1],stroke:'#7d6bd6','stroke-width':2},g);E('line',{x1:pr[0],y1:pr[1],x2:qr[0],y2:qr[1],stroke:'#7d6bd6','stroke-width':2},g);if(a>0&&a%20===0){T(g,pos(a,R-20)[0],pos(a,R-20)[1]+4,a+'°',{'font-size':11,class:''});T(g,posR(a,R-20)[0],posR(a,R-20)[1]+4,a+'°',{'font-size':11,class:''})}}
  // rays
  const s=pos(ang,R),e=posR(ang,R+10);
  E('line',{x1:s[0],y1:s[1],x2:ox,y2:oy,stroke:'#ffb300','stroke-width':5,'stroke-linecap':'round'},g);
  E('line',{x1:ox,y1:oy,x2:e[0],y2:e[1],stroke:'#ff7a00','stroke-width':5,'stroke-linecap':'round',opacity:.95},g);
  E('circle',{cx:ox,cy:oy,r:5,fill:'#e5534b'},g);
  // angle arcs
  const ar=P?46:56;const a1=pos(ang,ar),a2=posR(ang,ar),a0=[ox,oy-ar];
  E('path',{d:`M${a0[0]} ${a0[1]} A${ar} ${ar} 0 0 0 ${a1[0]} ${a1[1]}`,fill:'none',stroke:'#2aa5d8','stroke-width':3},g);
  E('path',{d:`M${a0[0]} ${a0[1]} A${ar} ${ar} 0 0 1 ${a2[0]} ${a2[1]}`,fill:'none',stroke:'#2e9d5b','stroke-width':3},g);
  T(g,ox-ar-18,oy-ar-6,'i = '+ang+'°',{'font-size':P?13:15,'font-weight':900,fill:'#1f7fa8',class:''});T(g,ox+ar+20,oy-ar-6,'r = '+ang+'°',{'font-size':P?13:15,'font-weight':900,fill:'#237a47',class:''});
  // target in challenge
  if(chal){const t=posR(TG,R-2);E('circle',{cx:t[0],cy:t[1],r:15,fill:won?'#ffe066':'#e8e2f7',stroke:'#7d6bd6','stroke-width':3},g);T(g,t[0],t[1]+7,won?'⭐':'🎯',{'font-size':18,class:''})}
  // torch
  const th=E('g',{transform:`translate(${s[0]},${s[1]}) rotate(${-ang+90-90}) `},g);
  const rot=Math.atan2(oy-s[1],ox-s[0])*180/Math.PI;const tg=E('g',{transform:`translate(${s[0]},${s[1]}) rotate(${rot})`,style:'cursor:grab;touch-action:none'},g);th.remove();
  E('rect',{x:-44,y:-11,width:38,height:22,rx:6,fill:'#e5534b',stroke:'#7a1d17','stroke-width':3},tg);E('polygon',{points:'-6,-15 8,-9 8,9 -6,15',fill:'#ffd966',stroke:'#7a1d17','stroke-width':3},tg);E('circle',{cx:-48,cy:0,r:3,fill:'#fff'},tg);
  E('circle',{cx:-20,cy:0,r:26,fill:'transparent'},tg);
  tg.addEventListener('pointerdown',ev=>{ev.preventDefault();tg.setPointerCapture(ev.pointerId);tg.dataset.d=1;tg.style.cursor='grabbing'});
  tg.addEventListener('pointermove',ev=>{if(!tg.dataset.d)return;const p=sc.pt(ev);let a=Math.atan2(-(p.x-ox),-(p.y-oy))*180/Math.PI;sc.angle(Math.round(Math.max(0,Math.min(80,a))),true)});
  const up=()=>{delete tg.dataset.d;tg.style.cursor='grab'};tg.addEventListener('pointerup',up);tg.addEventListener('pointercancel',up);
  const c=api.ctrl.querySelector('#cnt');if(c)c.textContent=pts.length?'Saved: '+pts.map(p=>p+'°→'+p+'°').join(', '):'No readings yet.'}
 sc.angle=(a,drag)=>{ang=Math.max(0,Math.min(80,a));if(!drag)L.snd.pop&&L.snd.pop();draw()};
 sc.rec=()=>{if(!pts.includes(ang))pts.push(ang);pts.sort((a,b)=>a-b);draw();
  if(pts.length>=4&&pts.some(p=>p<=25)&&pts.some(p=>p>=55)){api.award('did');api.ready();sc.say('Every time, r equals i. That is the law of reflection.','ok')}
  else sc.say('Saved. Move the torch to a very different angle and save again (need 4, small and large).')};
 sc.check=()=>{if(Math.abs(ang-TG)<=2){won=true;draw();L.snd.ok&&L.snd.ok();api.solved()}else api.nope(`The reflected ray leaves at ${ang}°, same as the incident one. The target is on the other side at 50°. ${ang<TG?'Move the torch further from the normal.':'Move the torch closer to the normal.'}`)};
 api.ctrl.innerHTML=chal?'<p style="margin:0 0 6px;font-size:14px"><b>Light the target.</b> Drag the torch (or use the buttons) so the reflected ray hits it.</p><div class="row"><button id="m5">◀ −5°</button><button id="p5">+5° ▶</button><button class="pri" id="ck">Fire!</button></div>'
  :'<p style="margin:0 0 4px;font-size:14px"><b>Drag the torch</b> along the arc (or use the buttons). Read both angles, then save.</p><div class="row"><button id="m5">◀ −5°</button><button id="p5">+5° ▶</button><button class="pri" id="rec">📝 Save reading</button></div><p id="cnt" style="font-size:14px;color:#55688a;margin:4px 0 0"></p>';
 api.ctrl.querySelector('#m5').onclick=()=>sc.angle(ang-5);api.ctrl.querySelector('#p5').onclick=()=>sc.angle(ang+5);
 if(chal)api.ctrl.querySelector('#ck').onclick=()=>sc.check();else api.ctrl.querySelector('#rec').onclick=()=>sc.rec();
 draw();sc.say(chal?'Where must the ray hit the mirror to reach the target?':'Drag the torch. Watch the two angles.')},
demo:[[S=>S.angle(30),'30° in…',800],[S=>S.rec(),'…30° out. Save it.',700],[S=>S.angle(60),'Now 60° in…',800],[S=>S.rec(),'…60° out. Always equal.',900]],
why:['The ray that hits the mirror is the <span class="word">incident ray</span>; the one that bounces off is the <span class="word">reflected ray</span>.','Angles are measured from the <b>normal</b>, the line at 90° to the mirror, not from the mirror itself.','<b>Law of reflection:</b> angle of incidence = angle of reflection, and the incident ray, reflected ray and normal lie in the same plane.','A rough surface also obeys the law at every tiny bump, but the rays scatter in many directions. That is why a wall does not show your image.'],
check:[{q:'A ray strikes a mirror with angle of incidence 40°. The angle of reflection is…',options:['20°','40°','50°','80°'],answer:1,why:'The two angles are equal.',hint:'i = r.'},
 {q:'Angles of incidence and reflection are measured from…',options:['the mirror surface','the normal','the ceiling','the torch'],answer:1,why:'The normal is the reference line at 90° to the surface.',hint:'The dashed line.'},
 {q:'A ray hits a mirror along the normal (i = 0°). It…',options:['is absorbed','goes straight back','leaves at 90°','splits in two'],answer:1,why:'r = 0° too, so it retraces its path.',hint:'Try 0° in the experiment.'}],
challenge:{text:'A star target sits on the right. Aim the torch so the <b>reflected</b> ray lights it up.',win:'The target is at 50°, so the torch had to be at 50° on the other side.'},
real:['Periscopes use two mirrors to see over walls.','Car side mirrors and torches use reflection.','Dentists use small mirrors to see behind teeth.'],
words:{'Incident ray':'The ray that hits the surface.','Reflected ray':'The ray that bounces off.',Normal:'A line at 90° to the surface at the point of contact.','Law of reflection':'Angle of incidence equals angle of reflection.'}
});
