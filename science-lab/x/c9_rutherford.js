QLab.register({
id:'c9_rutherford',code:'9-C2',title:"Rutherford's gold foil: finding the nucleus",grade:9,subject:'Chemistry',emoji:'☢️',
hook:{title:'What is inside an atom? In 1909 scientists fired tiny particles at gold foil to find out.',text:'You will repeat their experiment. What the particles do tells you what the atom looks like inside.'},
prior:'Know that atoms are tiny and that alpha particles are small positively charged particles.',
guess:{q:'If an atom were a smooth ball of positive jelly, what would fast alpha particles do when fired through a thin gold foil?',options:['Mostly bounce straight back','Mostly pass straight through','All stop inside the foil','All turn at right angles'],answer:1,hint:'Smooth jelly is a weak obstacle for a fast particle.',after:'Now fire real particles and compare.'},
build(api){
 const L=QLab.lab,chal=!!api.challenge,E=L.E;
 const sc=L.scene(api.stage,{alt:'Rutherford gold foil apparatus: alpha source in a lead box, thin gold foil in a vacuum chamber and a glowing zinc sulphide screen'});
 const W=sc.W,H=sc.H,P=sc.portrait,cx=P?252:410,cy=P?236:222,R=P?112:138,sx=P?50:128,bx=sx+30;
 let n=0,pass=0,small=0,back=0,mode='main',busy=false,zoomed=0;
 const gM=E('g',{},sc.gMain),gZ=E('g',{style:'display:none'},sc.gMain),gP=E('g',{},sc.gMain);
 const T=(g,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);e.textContent=t;return e};
 // ---- apparatus
 E('circle',{cx,cy,r:R+12,fill:'#000',opacity:.08},gM);
 E('circle',{cx,cy,r:R,fill:'#eaf7ff',opacity:.7,stroke:'#5a7fb0','stroke-width':4},gM);
 E('circle',{cx,cy,r:R-4,fill:'none',stroke:'#7be3a0','stroke-width':8,opacity:.55},gM);
 E('path',{d:`M${cx-R+8} ${cy-30}A${R} ${R} 0 0 1 ${cx+R-8} ${cy-30}`,fill:'none',stroke:'#fff','stroke-width':5,opacity:.5,'stroke-linecap':'round'},gM);
 T(gM,cx,cy-R-10,'Vacuum chamber with glowing screen');
 E('rect',{x:cx-3,y:cy-40,width:6,height:80,fill:'#f2c230',stroke:'#b8860b','stroke-width':1.5},gM);T(gM,cx,cy+56,'Gold foil');
 E('rect',{x:sx-34,y:cy-30,width:64,height:60,rx:8,fill:'#7c869b',stroke:'#4d566b','stroke-width':3},gM);E('rect',{x:sx+30,y:cy-4,width:12,height:8,fill:'#2b2350'},gM);
 T(gM,sx-2,cy+6,'☢',{'font-size':24,'text-anchor':'middle'});T(gM,sx-2,cy+50,'Alpha source',{});T(gM,sx-2,cy+63,'in lead box');
 E('line',{x1:bx+12,y1:cy,x2:cx,y2:cy,stroke:'#2aa5d8','stroke-width':1.5,'stroke-dasharray':'4 5',opacity:.7},gM);
 const knob=E('g',{style:'cursor:pointer'},gM);E('circle',{cx:sx-2,cy:cy-52,r:17,fill:'#e5534b',stroke:'#a8302a','stroke-width':3},knob);T(knob,sx-2,cy-48,'FIRE',{'font-size':11,fill:'#fff','font-weight':800,style:'pointer-events:none'});
 const lens=E('g',{style:'cursor:pointer'},gM);E('circle',{cx:cx+2,cy:cy-62,r:15,fill:'#fff',stroke:'#6a3fd1','stroke-width':3},lens);T(lens,cx+2,cy-56,'🔍',{'font-size':16,style:'pointer-events:none'});
 // ---- particles
 const act=[];let raf=0;
 const ring=a=>[cx+(R-4)*Math.cos(a),cy-(R-4)*Math.sin(a)];
 function flash(a){const [x,y]=ring(a),c=E('circle',{cx:x,cy:y,r:5,fill:'#c8ffd8',stroke:'#2e9d5b','stroke-width':1.5,style:'transition:opacity 1.6s,r 1.6s'},gP);setTimeout(()=>{c.style.opacity=0;c.setAttribute('r',2)},40);setTimeout(()=>c.remove(),1700)}
 function spawn(kind){const ph=kind==='pass'?(Math.random()-.5)*.08:kind==='small'?(Math.random()<.5?1:-1)*(.2+Math.random()*.5):Math.PI+(Math.random()<.5?1:-1)*(.35+Math.random()*.5);
  const dot=E('circle',{r:3.5,fill:kind==='back'?'#e5534b':'#2aa5d8',cx:bx+12,cy},gP);act.push({dot,kind,ph,t0:performance.now(),x:bx+12,y:cy})}
 const V=.62;
 function loop(now){for(let i=act.length-1;i>=0;i--){const p=act[i],d=(now-p.t0)*V,L1=cx-(bx+12);let x,y;
   if(d<0){continue}
   if(d<L1){x=bx+12+d;y=cy}else{const e=d-L1,L2=R-6;if(e>=L2){flash(p.ph);if(p.kind==='pass')pass++;else if(p.kind==='small')small++;else back++;L.snd.tick&&0;p.dot.remove();act.splice(i,1);if(!act.length){stat();coach()}continue}x=cx+e*Math.cos(p.ph);y=cy-e*Math.sin(p.ph)}
   p.dot.setAttribute('cx',x);p.dot.setAttribute('cy',y)}
  if(act.length&&stage.isConnected){raf=requestAnimationFrame(loop);}else raf=0}
 const stage=api.stage;
 sc.fire=async k=>{if(mode!=='main'||busy)return;busy=true;const gap=Math.max(5,Math.min(70,1300/k));
  for(let i=0;i<k;i++){const r=Math.random();spawn(r<.015?'back':r<.06?'small':'pass');n++;stat();if(!raf)raf=requestAnimationFrame(loop);await sc.sleep(gap);if(!stage.isConnected)return}
  await sc.sleep(900);busy=false;stat();coach()};
 function coach(){if(n>=10&&n<60&&back===0)api.coach('info','Look!','Almost all went straight through. The atom is mostly empty space.');
  else if(back>=1&&!coach.b){coach.b=1;api.coach('warn','One bounced back!','Something small and heavy must be in the middle. Keep firing to see how rare it is.')}
  if(!chal&&n>=500&&back>=1){api.award('did');api.ready()}}
 // ---- zoom view: inside one atom
 const zx=P?228:420,zy=P?236:222,R2=P?112:138;let aim=P?34:46,zbusy=false;
 E('rect',{x:zx-R2-48,y:zy-R2-18,width:R2*2+96,height:R2*2+36,rx:18,fill:'#10163a',opacity:.93},gZ);
 E('circle',{cx:zx,cy:zy,r:R2,fill:'#1d2a66',stroke:'#7a8cff','stroke-width':2,'stroke-dasharray':'6 6'},gZ);
 const orb=E('g',{},gZ);[0,120,240].forEach(a=>{const o=E('g',{},orb);E('circle',{cx:zx+R2*.82,cy:zy,r:4,fill:'#6fc3ff',transform:`rotate(${a} ${zx} ${zy})`},o)});
 const an=E('animateTransform',{attributeName:'transform',type:'rotate',from:`0 ${zx} ${zy}`,to:`360 ${zx} ${zy}`,dur:'9s',repeatCount:'indefinite'},orb);
 E('circle',{cx:zx,cy:zy,r:13,fill:'#ff6b5e',opacity:.2},gZ);E('circle',{cx:zx,cy:zy,r:6,fill:'#ff4d3d',stroke:'#fff','stroke-width':1.5},gZ);
 T(gZ,zx,zy-R2-24+0,'Inside one gold atom (zoomed in a lot)',{fill:'#fff'});T(gZ,zx+22,zy-10,'nucleus',{fill:'#ffb3ab'});T(gZ,zx,zy+R2+30,'electrons (tiny) and mostly empty space',{fill:'#b9c4ff'});
 const x0=zx-R2-30,aimLn=E('line',{x1:x0,y1:zy+aim,x2:zx+R2+30,y2:zy+aim,stroke:'#2aa5d8','stroke-dasharray':'5 6','stroke-width':1.5,opacity:.8},gZ);
 const path=E('polyline',{fill:'none',stroke:'#e5534b','stroke-width':2.5,points:''},gZ);
 const hand=E('g',{style:'cursor:ns-resize;touch-action:none'},gZ);E('circle',{cx:x0,cy:zy+aim,r:15,fill:'#2aa5d8',stroke:'#fff','stroke-width':3},hand);T(hand,x0,zy+aim+4,'α',{'font-size':14,fill:'#fff','font-weight':800,style:'pointer-events:none'});
 const par=E('circle',{r:5,fill:'#ffd23f',stroke:'#fff','stroke-width':1.5,cx:-50,cy:-50},gZ);
 function setAim(v){aim=Math.max(-R2*.95,Math.min(R2*.95,v));hand.firstChild.setAttribute('cy',zy+aim);hand.children[1].setAttribute('y',zy+aim+4);aimLn.setAttribute('y1',zy+aim);aimLn.setAttribute('y2',zy+aim)}
 const svg=()=>stage.querySelector('svg');
 hand.addEventListener('pointerdown',ev=>{if(zbusy)return;ev.preventDefault();const s=svg(),mv=e=>{const m=s.getScreenCTM().inverse(),q=s.createSVGPoint();q.x=e.clientX;q.y=e.clientY;setAim(q.matrixTransform(m).y-zy)},up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up)};addEventListener('pointermove',mv);addEventListener('pointerup',up)});
 setAim(aim);
 function track(b){const K=375,v0=5;let x=-R2-30,y=b,vx=v0,vy=0,pts=[[zx+x,zy+y]],st=0;
  while(st++<6000){const r2=x*x+y*y+9,r3=r2*Math.sqrt(r2),ax=K*x/r3,ay=K*y/r3;vx+=ax*.5;vy+=ay*.5;x+=vx*.5;y+=vy*.5;if(st%3===0)pts.push([zx+x,zy+y]);if(st>40&&(x*x+y*y>(R2+60)**2))break}
  const ang=Math.abs(Math.atan2(vy,vx))*180/Math.PI;pts.push([zx+x,zy+y]);return{pts,ang}}
 sc.zoomFire=async(b)=>{if(zbusy)return;zbusy=true;if(b!=null)setAim(b);const {pts,ang}=track(aim);path.setAttribute('points','');
  const t0=performance.now(),dur=1700;await new Promise(res=>{const f=now=>{const u=Math.min(1,(now-t0)/dur),k=Math.floor(u*(pts.length-1));path.setAttribute('points',pts.slice(0,k+1).map(p=>p.join(',')).join(' '));par.setAttribute('cx',pts[k][0]);par.setAttribute('cy',pts[k][1]);u<1&&stage.isConnected?requestAnimationFrame(f):res()};requestAnimationFrame(f)});
  zoomed++;const a=Math.round(ang);sc.say(a<10?`Bent only ${a}°. Far from the nucleus the particle hardly notices it.`:a>140?`Bent ${a}°! Almost bounced straight back. A direct hit on the nucleus!`:`Bent ${a}°. The closer to the nucleus, the more it turns.`,a>140?'ok':'');L.snd.ok&&L.snd.ok();zbusy=false;lastAng=Math.max(lastAng,a)};
 let lastAng=0;
 // ---- views and controls
 function view(m){mode=m;gM.style.display=m==='main'?'':'none';gP.style.display=m==='main'?'':'none';gZ.style.display=m==='zoom'?'':'none';ctrl()}
 sc.view=view;
 function stat(){const q=s=>api.ctrl.querySelector(s);if(!q('#a'))return;q('#a').textContent=n;q('#b').textContent=pass;q('#c').textContent=small;q('#d').textContent=back}
 function ctrl(){
  if(mode==='main')api.ctrl.innerHTML=`<div class="row" style="flex-wrap:wrap"><button class="pri" id="f10">☢️ Fire 10</button><button class="pri" id="f100">☢️ Fire 100</button><button id="zm">🔍 Look inside the atom</button></div><p>Fired: <b id="a"></b> · Straight through: <b id="b"></b> · Bent a little: <b id="c"></b> · Bounced back: <b id="d"></b></p><p style="font-size:12px;color:#55688a">Simplified so you can see the rare events. In the real experiment only about 1 in 8000 bounced back.</p>${chal?'<p><b>The few particles that bounced back show the atom has…</b></p><div class="row" id="ch" style="flex-wrap:wrap"><button data-a="a">A tiny, dense, positive nucleus</button><button data-a="b">A smooth positive jelly</button><button data-a="c">No electrons</button></div>':''}`;
  else api.ctrl.innerHTML=`<p style="margin:0">Drag the blue α up or down to aim, then fire. Try aiming right at the nucleus.</p><div class="row" style="flex-wrap:wrap"><button class="pri" id="zf">☢️ Fire this particle</button><button id="zb">↩ Back to the machine</button></div>`;
  const q=s=>api.ctrl.querySelector(s);
  if(mode==='main'){q('#f10').onclick=()=>sc.fire(10);q('#f100').onclick=()=>sc.fire(100);q('#zm').onclick=()=>view('zoom');stat();
   if(chal)q('#ch').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='a'?api.solved():api.nope(b.dataset.a==='b'?'Jelly could not make a fast particle bounce back. Something small and heavy must be in the middle.':'The bounce is about a positive particle meeting something positive and dense. Electrons are very light.'))}
  else{q('#zf').onclick=()=>sc.zoomFire();q('#zb').onclick=()=>view('main')}}
 knob.onclick=()=>sc.fire(10);lens.onclick=()=>view('zoom');
 sc.say('Tap FIRE. Alpha particles shoot at the gold foil. Green flashes show where they land.');
 ctrl()},
demo:[[S=>S.fire(10),'Fire 10 particles at the gold foil. Almost all go straight through.',1500],[S=>S.fire(190),'Fire 190 more. A few bend a little.',1800],[S=>S.fire(300),'Now and then one bounces right back! That is very rare.',1500],[S=>S.view('zoom'),'Look inside one atom. Most of it is empty space.',1200],[S=>S.zoomFire(2),'Aim at the tiny nucleus. The particle is thrown straight back.',1500]],
why:['<b>Most particles went straight through</b>. So the atom is mostly <b>empty space</b>.','<b>A few bent</b> and a <b>very few bounced back</b>. Something small, heavy and positive must be in the middle to repel them.','That something is the <span class="word">nucleus</span>. It is about 100,000 times smaller than the atom but holds nearly all the mass.','Electrons move around the nucleus in the empty space. This is <b>Rutherford\'s nuclear model</b> (1911).'],
check:[{q:'Most alpha particles passed straight through the foil. What does this show?',options:['Atoms are solid','Atoms are mostly empty space','Gold is liquid','Alpha particles are huge'],answer:1,why:'If atoms were solid, most would be blocked.',hint:'Look at how many went through.'},
 {q:'A few particles bounced back. This shows the nucleus is…',options:['Large and soft','Small, dense and positive','Negative','Empty'],answer:1,why:'Only a tiny dense positive centre could turn a particle round.',hint:'Positive repels positive.'},
 {q:'Where is most of the mass of an atom?',options:['In the empty space','In the electrons','In the nucleus','Spread evenly'],answer:2,why:'The nucleus holds protons and neutrons, which are heavy.',hint:'The dense centre.'}],
challenge:{text:'The rare particles that <b>bounced back</b> show what about the atom?',win:'A tiny, dense, positive nucleus. That was Rutherford\'s big discovery.'},
real:['Nuclear power stations use energy from nuclei.','Smoke detectors contain a source of alpha particles.','Cancer treatment uses radiation from nuclei.'],
words:{Nucleus:'The tiny dense centre of an atom.','Alpha particle':'A fast positive particle, a helium nucleus.',Atom:'The smallest unit of an element.','Empty space':'Most of the volume of an atom.'}
});
