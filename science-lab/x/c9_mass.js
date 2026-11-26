QLab.register({
id:'c9_mass',code:'9-C3',title:'Law of conservation of mass: weigh the reaction',grade:9,subject:'Chemistry',emoji:'⚖️',
hook:{title:'When something burns or fizzes, does matter vanish?',text:'Weigh a reaction before and after. Try it in a sealed flask and in an open one.'},
prior:'Know that baking soda fizzes in vinegar.',
guess:{q:'Baking soda and vinegar are mixed in a SEALED flask on a balance. The total mass will…',options:['Increase','Decrease','Stay the same','Become zero'],answer:2,hint:'Nothing can escape from a sealed flask.',after:'Weigh it.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:chal?'A two-pan balance with carbon and oxygen on one side and weights to choose for the other':'A flask of vinegar on a digital balance with baking soda and a balloon to try'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const wDraw={
  g20:g=>{E('rect',{x:-16,y:-12,width:32,height:24,rx:5,fill:'#c9ced8',stroke:'#5a6a85','stroke-width':2.5},g);T(g,0,5,'20 g',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''})},
  g32:g=>{E('rect',{x:-18,y:-14,width:36,height:28,rx:5,fill:'#c9ced8',stroke:'#5a6a85','stroke-width':2.5},g);T(g,0,5,'32 g',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''})},
  g44:g=>{E('rect',{x:-20,y:-16,width:40,height:32,rx:5,fill:'#c9ced8',stroke:'#5a6a85','stroke-width':2.5},g);T(g,0,5,'44 g',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''})},
  g12:g=>{E('rect',{x:-14,y:-11,width:28,height:22,rx:5,fill:'#c9ced8',stroke:'#5a6a85','stroke-width':2.5},g);T(g,0,5,'12 g',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''})}};
 if(chal){
  const px=W/2,py=P?170:150,arm=P?130:170,LW=44;let right=0,busy=false;
  E('rect',{x:px-8,y:py,width:16,height:P?120:140,fill:'#8a97a8',stroke:'#4a5568','stroke-width':2.5},sc.gMain);E('rect',{x:px-50,y:py+(P?120:140),width:100,height:12,rx:5,fill:'#55688a'},sc.gMain);
  const beam=E('g',{},sc.gMain),gL=E('g',{},sc.gMain),gRr=E('g',{},sc.gMain);
  const bm=E('rect',{x:-arm,y:-5,width:arm*2,height:10,rx:5,fill:'#9aa6bb',stroke:'#4a5568','stroke-width':2.5},beam);E('circle',{cx:px,cy:py,r:9,fill:'#4a5568'},sc.gMain);
  const pans=(ang)=>{const r=ang*Math.PI/180,dy=Math.sin(r)*arm;beam.setAttribute('transform',`translate(${px},${py}) rotate(${ang})`);gL.setAttribute('transform',`translate(${px-arm*Math.cos(r)},${py-dy})`);gRr.setAttribute('transform',`translate(${px+arm*Math.cos(r)},${py+dy})`)};
  const pan=(g)=>{E('line',{x1:-34,y1:0,x2:0,y2:-6,stroke:'#4a5568','stroke-width':2},g);E('line',{x1:34,y1:0,x2:0,y2:-6,stroke:'#4a5568','stroke-width':2},g);E('path',{d:'M-48 34 Q0 50 48 34 L40 30 H-40 Z',fill:'#dfe6f5',stroke:'#4a5568','stroke-width':2.5},g);E('line',{x1:-34,y1:0,x2:-40,y2:30,stroke:'#4a5568','stroke-width':2},g);E('line',{x1:34,y1:0,x2:40,y2:30,stroke:'#4a5568','stroke-width':2},g)};
  pan(gL);pan(gRr);
  E('rect',{x:-26,y:10,width:22,height:18,rx:4,fill:'#2b2b30'},gL);T(gL,-15,23,'C',{'font-size':11,fill:'#fff','font-weight':800,class:''});
  E('rect',{x:2,y:6,width:26,height:24,rx:6,fill:'#7fc4f0',stroke:'#2a7fb0','stroke-width':2},gL);T(gL,15,23,'O₂',{'font-size':11,'font-weight':800,class:''});
  T(gL,0,64,'12 g carbon + 32 g oxygen',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''});T(gRr,0,64,'CO₂ made',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''});
  const slot=E('g',{},gRr);pans(0);
  const tgt=sc.vessel({x:px+arm,y:py+(P?64:60),type:'beaker',w:80,h:50,level:0,label:''});
  tgt.g.style.opacity=0.0;tgt.g.querySelectorAll('*').forEach(e=>e.style.pointerEvents='none');
  const place=v=>{right=v;slot.innerHTML='';if(v){E('rect',{x:-18,y:10,width:36,height:24,rx:5,fill:'#c9ced8',stroke:'#5a6a85','stroke-width':2.5},slot);T(slot,0,27,v+' g',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''})}
   const ang=Math.max(-14,Math.min(14,(right-LW)/LW*14));pans(ang);return ang};
  sc.weigh=async v=>{if(busy)return;busy=true;const ang=place(v);L.snd.tick&&L.snd.tick();await sc.sleep(900);
   if(v===LW){L.snd.ok&&L.snd.ok();sc.say('Balanced! 12 + 32 = 44 g. Mass is not lost.','ok');api.solved()}
   else{L.snd.no&&L.snd.no();const m=ang>0?'This side is heavier. The atoms are only rearranged, so the totals must match.':'This side is lighter. No atoms are lost in a reaction.';sc.say(m,'warn');api.nope('Mass before = mass after. Add 12 g + 32 g.');await sc.sleep(900);place(0)}busy=false};
  [20,32,44,12].forEach((v,i)=>sc.tool({x:P?48+i*98:130+i*90,y:P?492:372,label:v+' g',ly:34,scale:1,draw:wDraw['g'+v],use:()=>sc.weigh(v)}));
  api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>12 g of carbon burns with 32 g of oxygen in a sealed vessel. Drag the right weight onto the CO₂ pan to balance.</b></p><div class="row" style="flex-wrap:wrap">${[20,32,44,12].map(v=>`<button data-w="${v}">${v} g</button>`).join('')}</div>`;
  api.ctrl.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>sc.weigh(+b.dataset.w));
  sc.say('Which weight will balance the carbon dioxide pan?');return}
 // ---------- learn: digital balance + flask
 const mx=P?150:240,my=P?300:340;let sealed=false,done=false,busy=false;const runs=new Set();let mass=120.0;
 E('rect',{x:mx-92,y:my,width:184,height:P?22:26,rx:10,fill:'#55688a',stroke:'#2d3a52','stroke-width':3},sc.gMain);E('rect',{x:mx-84,y:my-8,width:168,height:10,rx:5,fill:'#c9d1e0',stroke:'#4a5568','stroke-width':2.5},sc.gMain);T(sc.gMain,mx,my+(P?16:18),'BALANCE',{'font-size':11,'font-weight':800,fill:'#fff',class:''});
 const jar=sc.vessel({x:mx,y:my-8,type:'flask',w:P?120:130,h:P?135:150,level:.3,color:'#f7efc4',label:'Vinegar'});
 const gB=E('g',{},sc.gMain),gF=E('g',{},sc.gMain);
 const dx=P?300:520,dy=P?180:160;
 E('rect',{x:dx-80,y:dy-46,width:160,height:78,rx:14,fill:'#13204d',stroke:'#4a5568','stroke-width':3},sc.gMain);const rd=T(sc.gMain,dx,dy+10,'120.0 g',{'font-size':34,'font-weight':900,fill:'#7bffb0',class:''});T(sc.gMain,dx,dy-26,'mass on balance',{'font-size':11,fill:'#9fb0d8',class:''});
 const note=T(sc.gMain,dx,dy+56,'Before mixing',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''});
 const set=(m,txt)=>{mass=m;rd.textContent=m.toFixed(1)+' g';if(txt)note.textContent=txt};
 let ball=null;const neckY=my-8-(P?135:150);
 sc.seal=()=>{if(busy||done||sealed)return;sealed=true;ball=E('ellipse',{cx:mx,cy:neckY-6,rx:12,ry:5,fill:'#e5484d',stroke:'#a02020','stroke-width':2,style:'transform-box:fill-box;transform-origin:50% 100%'},gB);L.snd.pop&&L.snd.pop();sc.say('Balloon fitted. Nothing can escape now.','');note.textContent='Sealed flask'};
 sc.react=async()=>{if(busy||done)return;busy=true;done=true;L.snd.fizz&&L.snd.fizz();
  const sp=E('text',{x:mx,y:neckY-36,'text-anchor':'middle','font-size':24,style:'transition:all .7s'},gF);sp.textContent='🥄';setTimeout(()=>sp.setAttribute('y',neckY+10),30);await sc.sleep(750);sp.remove();
  jar.bubbles&&jar.bubbles(2600,12,'#fff');jar.setColor&&jar.setColor('#e9f6ff',1200);
  if(sealed){for(let i=1;i<=10;i++){if(ball){ball.setAttribute('rx',12+i*3);ball.setAttribute('ry',5+i*3.4);ball.setAttribute('cy',neckY-6-i*3.4)}await sc.sleep(220)}
   await sc.sleep(500);set(120.0,'Sealed: mass unchanged');sc.say('120.0 g before and 120.0 g after. The gas is in the balloon, so nothing was lost.','ok');runs.add('s')}
  else{for(let i=0;i<8;i++){const c=E('text',{x:mx-10+i*3,y:neckY,'font-size':18,'text-anchor':'middle',style:'transition:all 1.4s'},gF);c.textContent='💨';setTimeout(()=>{c.setAttribute('y',neckY-70-(i%3)*14);c.setAttribute('x',mx+(i-4)*14);c.style.opacity=0},60+i*180)}
   for(let k=0;k<9;k++){set(120-1.8*(k+1)/9);await sc.sleep(240)}await sc.sleep(500);set(118.2,'Open: mass dropped');gF.innerHTML='';sc.say('The mass dropped to 118.2 g. The carbon dioxide gas escaped into the air. The atoms did not vanish.','ok');runs.add('o')}
  if(runs.size===2){api.award('did');api.ready()}busy=false};
 sc.reset=()=>{if(busy)return;done=false;sealed=false;gB.innerHTML='';gF.innerHTML='';ball=null;jar.setColor&&jar.setColor('#f7efc4',800);set(120.0,'Before mixing');sc.say('Fresh flask. Try the other way: with or without the balloon.')};
 const defs=[['react','Baking soda',g=>{E('path',{d:'M-14 8 Q-14 -10 0 -10 Q14 -10 14 8 Z',fill:'#fff',stroke:'#8aa0c8','stroke-width':2.5},g);E('rect',{x:-6,y:-18,width:12,height:10,fill:'#7a5cf0'},g)},()=>sc.react()],
 ['seal','Balloon',g=>{E('ellipse',{cx:0,cy:0,rx:12,ry:16,fill:'#e5484d',stroke:'#a02020','stroke-width':2},g);E('line',{x1:0,y1:16,x2:0,y2:26,stroke:'#a02020','stroke-width':2},g)},()=>sc.seal()]];
 defs.forEach((d,i)=>sc.tool({x:P?60+i*110:450+i*110,y:P?492:372,label:d[0]==='react'?'Baking soda':'Balloon',ly:34,scale:1,draw:d[2],use:d[3]}));
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Drag the baking soda into the flask.</b> First try it open, then again with the balloon fitted.</p><div class="row" style="flex-wrap:wrap"><button class="pri" id="bs">🥄 Add baking soda</button><button id="bl">🎈 Fit balloon</button><button id="rs">↺ Start again</button></div><p class="lockhint" style="margin:6px 0 0;text-align:left">Do it open AND sealed to unlock the next step.</p>`;
 api.ctrl.querySelector('#bs').onclick=()=>sc.react();api.ctrl.querySelector('#bl').onclick=()=>sc.seal();api.ctrl.querySelector('#rs').onclick=()=>sc.reset();
 sc.say('Weigh the flask. Then add baking soda to the vinegar.')},
demo:[[S=>S.react(),'Open flask: the gas escapes and the mass drops.',1200],[S=>S.reset(),'Start again. This time seal it.',600],[S=>S.seal(),'Fit a balloon over the mouth.',700],[S=>S.react(),'The balloon catches the gas. The mass stays the same.',1200]],
why:['The <span class="word">law of conservation of mass</span>: in a chemical reaction, mass is <b>neither created nor destroyed</b>. Total mass before = total mass after.','In the open flask the mass seemed to drop. But the carbon dioxide gas escaped into the air. If you could weigh it, the total would be the same.','Atoms are only <b>rearranged</b> in a reaction. None disappears.','Example: 12 g carbon + 32 g oxygen → 44 g carbon dioxide.'],
check:[{q:'In a sealed flask, the mass after a reaction is…',options:['Less','More','The same','Zero'],answer:2,why:'Nothing escaped, so the mass is conserved.',hint:'You saw 120.0 g before and after.'},
 {q:'Why did the open flask lose mass?',options:['Matter was destroyed','A gas escaped','The balance broke','Water evaporated only'],answer:1,why:'The carbon dioxide gas left the flask.',hint:'Look at the bubbles.'},
 {q:'10 g of A reacts completely with 6 g of B. Mass of products?',options:['4 g','6 g','10 g','16 g'],answer:3,why:'Total mass is conserved: 10 + 6 = 16 g.',hint:'Add reactants.'}],
challenge:{text:'12 g of carbon burns with 32 g of oxygen in a sealed vessel. What is the <b>mass of carbon dioxide</b> formed?',win:'12 + 32 = 44 g. Mass is conserved.'},
real:['Cooks weigh a closed pan to check for evaporation losses.','A burning candle seems to lose mass, but the gases go into the air.','Chemical equations must balance because atoms are conserved.'],
words:{Reactant:'A substance that reacts.',Product:'A substance that is made.',Conservation:'Staying the same in total.','Sealed system':'Nothing can enter or leave.'}
});
