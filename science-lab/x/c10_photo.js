QLab.register({
id:'c10_photo',code:'10-B1',title:'Photosynthesis: how light makes oxygen',grade:10,subject:'Biology',emoji:'🌿',
hook:{title:'A pond plant under a lamp makes tiny bubbles. What are they?',text:'Green plants make their own food using light. A gas comes out as a by-product. Move the lamp near and far and count the bubbles.'},
prior:'You know that plants are green, need sunlight and water, and that we need oxygen to breathe.',
guess:{q:'A water plant is placed under a bright lamp. The bubbles rising from it are mostly…',options:['carbon dioxide','oxygen','nitrogen','steam'],answer:1,hint:'Plants give us the gas we breathe.',after:'Now find how light changes the number of bubbles.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A lamp that can be dragged near or far from a water plant in a beaker, with bubbles of oxygen'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const bx=P?318:520,by=P?420:340,bw=P?130:170,bh=P?170:190;
 const lx0=P?34:70,lx1=P?202:420,dOf=x=>Math.max(10,Math.round((P?(226-x)/2.4:(bx-bw/2-12-x)/4.2)/5)*5);
 let lampX=chal?lx1-60:lx0+40,co2=false,pts=[],busy=false,count=0;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const rate=d=>Math.round(6000/(d*d)*(co2?1.5:1));
 const bk=sc.vessel({x:bx,y:by,type:'beaker',w:bw,h:bh,level:.85,color:'#d6f0fb',label:co2?'Water + baking soda':'Pond water'});
 const gP=E('g',{},sc.gMain),gB=E('g',{},sc.gMain),gLamp=E('g',{style:'cursor:grab;touch-action:none'},sc.gMain),gI=E('g',{},sc.gMain);
 function plant(){gP.innerHTML='';const base=by-6;[[-24,-.3],[-8,.05],[10,-.1],[26,.25]].forEach(([dx,sl],k)=>{const h=bh*.62-k%2*14;let d=`M${bx+dx} ${base}`;for(let i=1;i<=6;i++)d+=` L${bx+dx+sl*i*14+(i%2?3:-3)} ${base-h/6*i}`;E('path',{d,stroke:'#2f8f3e','stroke-width':4,fill:'none','stroke-linecap':'round'},gP);for(let i=1;i<=6;i++){const x=bx+dx+sl*i*14,y=base-h/6*i;E('ellipse',{cx:x-8,cy:y,rx:9,ry:4,fill:'#4fc25a',transform:`rotate(-25 ${x-8} ${y})`},gP);E('ellipse',{cx:x+8,cy:y-4,rx:9,ry:4,fill:'#3fae4b',transform:`rotate(25 ${x+8} ${y-4})`},gP)}});
  E('rect',{x:bx-bw/2,y:by-bh,width:bw,height:6,fill:'transparent'},gP);sc.gMain.appendChild(gB)}
 function lamp(){gLamp.innerHTML='';const y=P?330:250;
  E('rect',{x:lampX-6,y:y+20,width:12,height:P?60:70,fill:'#7a5a3a'},gLamp);E('rect',{x:lampX-26,y:y+(P?80:90),width:52,height:8,rx:3,fill:'#5b4430'},gLamp);
  E('path',{d:`M${lampX-26} ${y+22} L${lampX-18} ${y-24} L${lampX+18} ${y-24} L${lampX+26} ${y+22}Z`,fill:'#ffb300',stroke:'#7a4b00','stroke-width':3},gLamp);
  const dd=Math.max(0,bx-bw/2-lampX-30);const a=Math.max(.15,Math.min(.8,1-dd/320));E('polygon',{points:`${lampX+26},${y-4} ${bx-bw/2},${by-bh*.8} ${bx-bw/2},${by-bh*.2}`,fill:'#fff3a0',opacity:a*.55},gLamp);
  E('circle',{cx:lampX,cy:y-6,r:14,fill:'#fff6b8',stroke:'#e0a800','stroke-width':3},gLamp);E('rect',{x:lampX-34,y:y-34,width:68,height:140,fill:'transparent'},gLamp);
  T(gLamp,lampX,y+(P?112:122),dOf(lampX)+' cm',{'font-size':15,'font-weight':900,fill:'#8a5a00',class:''})}
 function info(){gI.innerHTML='';const d=dOf(lampX);
  T(gI,bx,P?150:96,'Bubbles per minute: '+rate(d),{'font-size':P?14:17,'font-weight':900,fill:'#237a47',class:''});
  if(!P){const gx0=70,gy0=215,gx1=300,gy1=105;E('rect',{x:gx0-32,y:gy1-26,width:gx1-gx0+52,height:gy0-gy1+58,rx:10,fill:'#fff',stroke:'#e1d7ff','stroke-width':2},gI);E('line',{x1:gx0,y1:gy0,x2:gx1,y2:gy0,stroke:'#1b2a4a','stroke-width':3},gI);E('line',{x1:gx0,y1:gy0,x2:gx0,y2:gy1,stroke:'#1b2a4a','stroke-width':3},gI);
   T(gI,(gx0+gx1)/2,gy0+26,'Lamp distance (cm)',{'font-size':12,'font-weight':800,class:''});T(gI,gx0+40,gy1-10,'Bubbles/min',{'font-size':12,'font-weight':800,class:''});
   const X=d=>gx0+(d-10)/70*(gx1-gx0-10),Y=r=>gy0-Math.min(r,80)/80*(gy0-gy1-10);[10,40,80].forEach(v=>T(gI,X(v),gy0+14,v,{'font-size':10,class:''}));
   const s=pts.slice().sort((a,b)=>a.d-b.d);if(s.length>1)E('polyline',{points:s.map(p=>X(p.d)+','+Y(p.r)).join(' '),fill:'none',stroke:'#2aa5d8','stroke-width':3},gI);s.forEach(p=>E('circle',{cx:X(p.d),cy:Y(p.r),r:5,fill:p.c?'#e5534b':'#2e9d5b'},gI))}
  const c=api.ctrl.querySelector('#cnt');if(c)c.textContent=pts.length?pts.slice().sort((a,b)=>a.d-b.d).map(p=>p.d+' cm: '+p.r).join(' · '):'No counts yet.'}
 let acc=0;function loop(){if(!stage.isConnected)return;const r=rate(dOf(lampX));acc+=r/60/60*16;
  while(acc>=1){acc--;const k=Math.floor(Math.random()*4),x=bx-30+k*20+(Math.random()*8-4),b=E('circle',{cx:x,cy:by-30-Math.random()*60,r:3+Math.random()*2,fill:'#fff',stroke:'#7ac8ee','stroke-width':1.5,opacity:.9},gB);const t0=performance.now();(function f(){const k2=(performance.now()-t0)/1200;if(k2>=1||!b.isConnected){b.remove();return}b.setAttribute('cy',(+b.getAttribute('cy'))-1.4);b.setAttribute('cx',(+b.getAttribute('cx'))+Math.sin(k2*18)*.5);requestAnimationFrame(f)})()}
  requestAnimationFrame(loop)}
 gLamp.addEventListener('pointerdown',ev=>{ev.preventDefault();gLamp.setPointerCapture(ev.pointerId);gLamp.dataset.d=1;gLamp.style.cursor='grabbing'});
 gLamp.addEventListener('pointermove',ev=>{if(!gLamp.dataset.d)return;sc.lamp(sc.pt(ev).x,true)});
 const up=()=>{delete gLamp.dataset.d;gLamp.style.cursor='grab'};gLamp.addEventListener('pointerup',up);gLamp.addEventListener('pointercancel',up);
 sc.lamp=(x,drag)=>{lampX=Math.max(lx0,Math.min(lx1,x));lamp();info()};
 sc.dist=d=>sc.lamp(P?226-d*2.4:bx-bw/2-12-d*4.2);
 sc.count=async()=>{if(busy)return;busy=true;const d=dOf(lampX),r=rate(d);sc.say('Counting bubbles for one minute…');for(let i=0;i<=10;i++){info();gI.querySelector('text')&&(gI.querySelector('text').textContent='Counting… '+Math.round(r*i/10));await sc.sleep(120)}
  pts=pts.filter(p=>!(p.d===d&&p.c===co2));pts.push({d,r,c:co2});busy=false;info();
  if(chal){if(r>=40){api.solved()}else api.nope(`Only ${r} bubbles per minute. You need 40 or more: move the lamp closer${co2?'':' or add baking soda (more CO₂)'}.`)}
  else{const same=pts.filter(p=>p.c===false);if(same.length>=4){api.award('did');api.ready();sc.say('Closer lamp, more light, more bubbles. Photosynthesis speeds up with light.','ok')}else sc.say(r+' bubbles per minute at '+d+' cm. Move the lamp and count again.')}};
 sc.soda=async()=>{if(co2)return;co2=true;bk.bubbles&&bk.bubbles(1200,26,'#fff');L.snd.fizz&&L.snd.fizz();sc.say('Baking soda adds CO₂ to the water. Plants use CO₂ in photosynthesis.');await sc.sleep(400);info()};
 sc.fresh=()=>{co2=false;info();sc.say('Fresh pond water.')};
 sc.tool({x:P?60:W*.88,y:P?492:384,label:'Baking soda',ly:P?32:34,scale:P?.75:.85,draw:g=>{E('rect',{x:-16,y:-18,width:32,height:34,rx:5,fill:'#fff',stroke:'#7d6bd6','stroke-width':3},g);T(g,0,6,'NaHCO₃',{'font-size':9,'font-weight':900,class:''})},use:()=>sc.soda()});
 api.ctrl.innerHTML=chal?'<p style="margin:0 0 6px;font-size:14px"><b>Get 40 or more bubbles per minute.</b> Drag the lamp (and baking soda if you like), then count.</p><div class="row"><button class="pri" id="ct">🔢 Count bubbles</button></div>'
  :'<p style="margin:0 0 4px;font-size:14px"><b>Drag the lamp</b> near and far. Tap Count each time (need 4 distances).</p><div class="row"><button class="pri" id="ct">🔢 Count 1 minute</button><button id="fr">Fresh water</button></div><p id="cnt" style="font-size:14px;color:#55688a;margin:4px 0 0"></p>';
 api.ctrl.querySelector('#ct').onclick=()=>sc.count();const fr=api.ctrl.querySelector('#fr');if(fr)fr.onclick=()=>sc.fresh();
 plant();lamp();info();sc.say(chal?'More light and more CO₂ mean faster food-making.':'Drag the lamp towards the plant.');loop()},
demo:[[S=>S.dist(60),'Lamp far away: few bubbles.',900],[S=>S.count(),'Count them.',1100],[S=>S.dist(20),'Lamp close: many more.',900],[S=>S.count(),'Count again.',1100]],
why:['<span class="word">Photosynthesis</span>: carbon dioxide + water, using light energy in chlorophyll, makes glucose (food) and oxygen.','The bubbles are <b>oxygen</b>. More light means faster photosynthesis, so more bubbles.','Light intensity falls quickly with distance: halve the distance and the light is four times stronger.','Carbon dioxide and temperature also change the rate. When one thing is short, it limits the whole process.'],
check:[{q:'Which gas do the bubbles contain?',options:['Carbon dioxide','Oxygen','Hydrogen','Nitrogen'],answer:1,why:'Oxygen is released in photosynthesis.',hint:'We breathe it.'},
 {q:'The lamp is moved closer to the plant. The bubbles…',options:['become fewer','stay the same','become more','stop'],answer:2,why:'More light, faster photosynthesis.',hint:'You saw it.'},
 {q:'Adding baking soda to the water increases the rate because it adds…',options:['oxygen','carbon dioxide','nitrogen','heat'],answer:1,why:'CO₂ is a raw material of photosynthesis.',hint:'Fizzy gas.'}],
challenge:{text:'Make the plant give <b>40 or more bubbles per minute</b>. What can you change?',win:'Bright light and extra CO₂ speed up photosynthesis.'},
real:['Farmers grow vegetables in greenhouses with extra light and CO₂.','Aquarium plants are kept near a lamp to give oxygen to fish.','Forests are called the lungs of the planet because of photosynthesis.'],
words:{Photosynthesis:'Making food (glucose) from CO₂ and water using light.',Chlorophyll:'The green substance in leaves that traps light.',Oxygen:'The gas released by plants in the light.',Glucose:'The sugar food made by the plant.'}
});
