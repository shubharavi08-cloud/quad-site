QLab.register({
id:'c9_compound',code:'9-C3',title:'Mixture or compound? Iron and sulphur',grade:9,subject:'Chemistry',emoji:'🔶',
hook:{title:'Iron is a magnetic grey metal. Sulphur is a yellow powder. What happens when you heat them together?',text:'Mixing keeps both substances as they are. Heating makes a brand new compound.'},
prior:'Know that elements are made of one kind of atom.',
guess:{q:'Iron filings and sulphur powder are just stirred together. Can a magnet pull the iron out?',options:['Yes, they are only mixed','No, they have joined','Only if heated','No, sulphur is magnetic'],answer:0,hint:'In a mixture each substance keeps its own properties.',after:'Test both the mixture and the heated product.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:chal?'Sample cards to sort into mixture and compound bins':'A beaker of iron filings and sulphur with a spatula, burner, magnet and acid dropper'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 if(chal){
  const SMP=[{n:'Air',k:'M',w:'Oxygen, nitrogen and other gases, each still itself, just mixed.',pic:'mixA'},{n:'Water',k:'C',w:'Hydrogen and oxygen are joined in a fixed ratio, H₂O.',pic:'h2o'},{n:'Salt water',k:'M',w:'Salt and water are just mixed.',pic:'salty'},{n:'Carbon dioxide',k:'C',w:'Carbon and oxygen are joined, CO₂.',pic:'co2'}];
  let i=0,busy=false;const gC=E('g',{},sc.gMain);
  const cw=P?200:230,chh=P?130:150,cx=W/2,cy=P?190:150;
  const binW=P?160:200,binH=P?90:80,by=H-binH-(P?20:16),bxM=W*.27,bxC=W*.73;
  const bins=[['M','Mixture',bxM],['C','Compound',bxC]];
  bins.forEach(([k,n,x])=>{E('rect',{x:x-binW/2,y:by,width:binW,height:binH,rx:16,fill:k==='M'?'#e3f4ff':'#ffe9d6',stroke:k==='M'?'#2aa5d8':'#f08a3c','stroke-width':3,'stroke-dasharray':'8 5'},sc.gMain);T(sc.gMain,x,by+binH/2+6,n,{'font-size':18,'font-weight':800,fill:'#2b2350',class:''})});
  const atom=(g,x,y,c,r)=>E('circle',{cx:x,cy:y,r:r||7,fill:c,stroke:'#fff','stroke-width':1.5},g);
  const bond=(g,x1,y1,x2,y2)=>E('line',{x1,y1,x2,y2,stroke:'#555','stroke-width':3},g);
  const pic=(g,p)=>{const R=(a,b)=>a+Math.random()*(b-a),x0=-cw/2+14,x1=cw/2-14,y0=-chh/2+34,y1=chh/2-10;
   if(p==='mixA'){for(let i=0;i<26;i++)atom(g,R(x0,x1),R(y0,y1),['#2aa5d8','#e5484d','#8a96a8'][i%3],5.5)}
   else if(p==='salty'){for(let i=0;i<7;i++){const x=R(x0+12,x1-12),y=R(y0+8,y1-8);bond(g,x,y,x-8,y+8);bond(g,x,y,x+8,y+8);atom(g,x,y,'#e5484d',7);atom(g,x-8,y+8,'#fff',4.5).setAttribute('stroke','#888');atom(g,x+8,y+8,'#fff',4.5).setAttribute('stroke','#888')}for(let i=0;i<8;i++)atom(g,R(x0,x1),R(y0,y1),i%2?'#7a5cf0':'#2e9d5b',5)}
   else if(p==='h2o'){for(let i=0;i<9;i++){const x=x0+16+(i%3)*((x1-x0-30)/2),y=y0+12+Math.floor(i/3)*((y1-y0-26)/2);bond(g,x,y,x-8,y+8);bond(g,x,y,x+8,y+8);atom(g,x,y,'#e5484d',7);atom(g,x-8,y+8,'#fff',4.5).setAttribute('stroke','#888');atom(g,x+8,y+8,'#fff',4.5).setAttribute('stroke','#888')}}
   else{for(let i=0;i<9;i++){const x=x0+18+(i%3)*((x1-x0-36)/2),y=y0+12+Math.floor(i/3)*((y1-y0-26)/2);bond(g,x-12,y,x+12,y);atom(g,x-12,y,'#e5484d',6.5);atom(g,x,y,'#333',7.5);atom(g,x+12,y,'#e5484d',6.5)}}};
  let card=null;
  function show(){gC.innerHTML='';if(i>=SMP.length){T(gC,cx,cy,'All sorted!',{'font-size':26,'font-weight':800,fill:'#2e9d5b',class:''});return}
   card=E('g',{transform:`translate(${cx},${cy})`,style:'cursor:grab;touch-action:none'},gC);E('rect',{x:-cw/2,y:-chh/2,width:cw,height:chh,rx:16,fill:'#fff',stroke:'#cdb8ff','stroke-width':3},card);T(card,0,-chh/2+22,SMP[i].n,{'font-size':17,'font-weight':800,fill:'#2b2350',class:''});pic(card,SMP[i].pic);T(gC,cx,cy+chh/2+16,'Drag the card into a bin',{'font-size':12});
   let d=null;const pt=e=>{const m=sc.svg.getScreenCTM().inverse(),p=sc.svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(m)};
   card.addEventListener('pointerdown',e=>{if(busy)return;card.setPointerCapture(e.pointerId);const p=pt(e);d={dx:p.x-cx,dy:p.y-cy}});
   card.addEventListener('pointermove',e=>{if(!d)return;const p=pt(e);card.setAttribute('transform',`translate(${p.x-d.dx},${p.y-d.dy})`)});
   const end=e=>{if(!d)return;const p=pt(e);d=null;const k=p.y>by-10?(p.x<W/2?'M':'C'):null;if(k)sc.sort(k);else card.setAttribute('transform',`translate(${cx},${cy})`)};
   card.addEventListener('pointerup',end);card.addEventListener('pointercancel',end)}
  sc.sort=k=>{if(busy||i>=SMP.length)return;const s=SMP[i];
   if(s.k===k){busy=true;L.snd.ok&&L.snd.ok();sc.say('✅ '+s.w,'ok');i++;setTimeout(()=>{show();busy=false;if(i>=SMP.length)api.solved()},450)}
   else{L.snd.no&&L.snd.no();sc.say('Look closely. Are the different atoms joined together in one fixed pattern, or just mixed?','warn');api.nope('Compounds have atoms joined in a repeating pattern. Mixtures have separate bits just mixed together.');show()}};
  show();sc.say('Look at each card. Joined atoms mean compound. Loose bits mean mixture.');return}
 // ---------- learn: bench
 let state='sep',busy=false;const tests=new Set();
 const mx=P?150:250,my=P?280:322,bw=P?170:190,bh=P?110:120;
 const jar=sc.vessel({x:mx,y:my,type:'beaker',w:bw,h:bh,level:0,label:'Test beaker'});
 const gD=E('g',{},sc.gMain),gF=E('g',{},sc.gMain);
 const x0=mx-bw/2+8,x1=mx+bw/2-8,yb=my-8;
 let dots=[];
 function setup(){gD.innerHTML='';gF.innerHTML='';dots=[];state='sep';
  const mid=(x0+x1)/2;for(let i=0;i<44;i++){const iron=i<22,x=iron?x0+Math.random()*(mid-x0-4):mid+4+Math.random()*(x1-mid-4),y=yb-Math.random()*(P?26:30);
   const c=E('circle',{r:3.8,cx:x,cy:y,fill:iron?'#5d6575':'#f2d13a',stroke:'#0003','stroke-width':.8},gD);dots.push({c,iron,x,y,hx:x,hy:y})}
  label();}
 const lab=E('g',{},sc.gMain);
 function label(){lab.innerHTML='';const t=state==='sep'?'Two elements: iron (grey) and sulphur (yellow)':state==='mix'?'A mixture: both still visible':'A compound: iron sulphide';T(lab,mx,my+(P?72:52),t,{'font-size':P?12:13,'font-weight':800,fill:'#2b2350',class:''})}
 const mv=(o,x,y,ms)=>{o.c.style.transition=`cx ${ms}ms ease,cy ${ms}ms ease`;o.c.setAttribute('cx',x);o.c.setAttribute('cy',y);o.x=x;o.y=y};
 const fx={
  async mix(){if(state!=='sep'){sc.say(state==='mix'?'Already mixed.':'It is already a new substance. You cannot un-mix it.','');return}
   L.snd.whoosh&&L.snd.whoosh();for(let r=0;r<3;r++){dots.forEach(o=>mv(o,x0+Math.random()*(x1-x0),yb-Math.random()*(P?26:30),500));await sc.sleep(550)}
   dots.forEach(o=>{o.hx=o.x;o.hy=o.y});state='mix';label();sc.say('Stirred together. Each part is still its own substance.','ok')},
  async heat(){if(state==='sep'){sc.say('Stir them together first, then heat.','warn');return}if(state==='comp'){sc.say('Already changed. It is a new substance now.','');return}
   const fl=E('text',{x:mx,y:my+30,'text-anchor':'middle','font-size':34},gF);fl.textContent='🔥';L.snd.fizz&&L.snd.fizz();
   const glow=E('ellipse',{cx:mx,cy:yb-12,rx:bw/2-10,ry:20,fill:'#ff4a1c',opacity:0,style:'transition:opacity 1s'},gF);setTimeout(()=>glow.style.opacity=.5,30);
   await sc.sleep(1400);dots.forEach(o=>{o.c.style.transition='fill 1s';o.c.setAttribute('fill','#25252c');mv(o,o.x*.5+mx*.5,yb-Math.random()*(P?18:20),900)});await sc.sleep(1100);
   gF.innerHTML='';state='comp';label();sc.say('A red glow, then a NEW black solid. Iron and sulphur joined: iron sulphide.','ok')},
  async magnet(){if(state==='sep'){sc.say('Iron alone is magnetic, of course. Stir them together first.','');return}
   const mg=E('g',{},gF);const my2=my-bh-(P?22:26);E('path',{d:`M${mx-26} ${my2} v26 a26 26 0 0 0 52 0 v-26 h-16 v26 a10 10 0 0 1 -20 0 v-26 z`,fill:'#d33',stroke:'#7a1c1c','stroke-width':3},mg);L.snd.pop&&L.snd.pop();
   if(state==='mix'){const irons=dots.filter(o=>o.iron);irons.forEach((o,i)=>mv(o,mx-20+(i%6)*8,my2+36+Math.floor(i/6)*5,900));await sc.sleep(1100);sc.say('The magnet lifts the iron out. It is still a mixture.','ok');tests.add('mix');await sc.sleep(900);irons.forEach(o=>mv(o,o.hx,o.hy,700));await sc.sleep(800)}
   else{dots.forEach(o=>{o.c.style.transition='cx .12s';o.c.setAttribute('cx',o.x+(Math.random()-.5)*6)});await sc.sleep(900);sc.say('Nothing sticks. The iron has changed into something new.','ok');tests.add('comp');await sc.sleep(500)}
   gF.innerHTML='';if(tests.has('mix')&&tests.has('comp')){api.award('did');api.ready()}},
  async acid(){if(state==='sep'){sc.say('Mix them first.','');return}
   const drop=E('text',{x:mx,y:my-bh-30,'text-anchor':'middle','font-size':22,style:'transition:all .7s'},gF);drop.textContent='💧';setTimeout(()=>drop.setAttribute('y',my-bh*.6),30);await sc.sleep(750);drop.remove();
   jar.bubbles&&jar.bubbles(1800,10,'#fff');L.snd.fizz&&L.snd.fizz();await sc.sleep(1800);
   if(state==='mix')sc.say('Fizzing: the iron makes hydrogen gas. Sulphur does nothing.','ok');else{const sm=E('text',{x:mx,y:my-bh-12,'text-anchor':'middle','font-size':28},gF);sm.textContent='🤢';sc.say('A new gas with a rotten-egg smell: hydrogen sulphide. A new substance reacts in a new way.','ok');await sc.sleep(1200);gF.innerHTML=''}}};
 sc.run=async m=>{if(busy)return;busy=true;try{await fx[m]()}finally{busy=false}};
 sc.reset=()=>{if(busy)return;setup();sc.say('Fresh iron and sulphur. Stir them together first.')};
 const defs=[['mix','Spatula',(g)=>{E('rect',{x:-4,y:-18,width:8,height:30,rx:3,fill:'#a0693a'},g);E('ellipse',{cx:0,cy:18,rx:11,ry:6,fill:'#cfd6e0',stroke:'#5a6a85','stroke-width':2},g)}],
  ['heat','Burner',(g)=>{E('rect',{x:-16,y:2,width:32,height:12,rx:3,fill:'#8a96a8',stroke:'#4a5568','stroke-width':2},g);const f=E('text',{x:0,y:0,'text-anchor':'middle','font-size':22},g);f.textContent='🔥'}],
  ['magnet','Magnet',(g)=>{E('path',{d:'M-16 -14 v18 a16 16 0 0 0 32 0 v-18 h-10 v18 a6 6 0 0 1 -12 0 v-18 z',fill:'#d33',stroke:'#7a1c1c','stroke-width':2},g)}],
  ['acid','Acid',(g)=>{E('rect',{x:-9,y:-6,width:18,height:24,rx:5,fill:'#cfe9ff',stroke:'#5a7fb0','stroke-width':2},g);E('rect',{x:-4,y:-20,width:8,height:16,fill:'#7a5cf0'},g)}]];
 defs.forEach((d,i)=>sc.tool({x:P?48+i*98:420+i*88,y:P?492:372,label:d[1],ly:P?38:36,scale:.85,draw:d[2],use:v=>sc.run(d[0])}));
 setup();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Drag a tool onto the beaker</b>, or tap a button.</p><div class="row" style="flex-wrap:wrap"><button class="pri" data-m="mix">🥄 Mix</button><button class="pri" data-m="heat">🔥 Heat</button><button data-m="magnet">🧲 Magnet</button><button data-m="acid">🧪 Acid</button><button id="rs">↺ Start again</button></div><p class="lockhint" style="margin:6px 0 0;text-align:left">Test with the magnet BEFORE and AFTER heating to unlock the next step.</p>`;
 api.ctrl.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>sc.run(b.dataset.m));api.ctrl.querySelector('#rs').onclick=()=>sc.reset();
 sc.say('Grey iron filings and yellow sulphur. Stir them, then test.')},
demo:[[S=>S.run('mix'),'Stir iron and sulphur together. It is only a mixture.',900],[S=>S.run('magnet'),'The magnet pulls the iron out. Both are unchanged.',900],[S=>S.run('heat'),'Now heat it strongly. A black solid forms.',900],[S=>S.run('magnet'),'The magnet cannot pull it out now. It is a new compound.',900]],
why:['In a <span class="word">mixture</span> the substances are just together. Each keeps its <b>own properties</b> and can be separated by physical methods such as a magnet.','In a <span class="word">compound</span> the elements are <b>chemically joined</b> in a fixed ratio. It has <b>new properties</b>, and you cannot separate it by physical methods.','Iron + sulphur (mixed) → magnet separates iron. Iron + sulphur (heated) → iron sulphide, not magnetic.','Water (H₂O) and carbon dioxide (CO₂) are compounds. Air and salt water are mixtures.'],
check:[{q:'Which keeps the properties of its parts?',options:['A compound','A mixture','Both','Neither'],answer:1,why:'In a mixture each part keeps its properties.',hint:'The magnet test.'},
 {q:'Iron sulphide is…',options:['A mixture','A compound','An element','An atom'],answer:1,why:'Iron and sulphur are chemically joined.',hint:'It is not magnetic.'},
 {q:'Which is a compound?',options:['Air','Salt water','Water','Muddy water'],answer:2,why:'Water has hydrogen and oxygen chemically joined.',hint:'A fixed formula H₂O.'}],
challenge:{text:'Sort four samples: <b>mixture or compound</b>?',win:'Air and salt water are mixtures. Water and carbon dioxide are compounds.'},
real:['Table salt (NaCl) is a compound of a dangerous metal and a poisonous gas.','Air is a mixture. Its gases can be separated by cooling.','Rust is a compound of iron and oxygen.'],
words:{Element:'Only one kind of atom.',Compound:'Different elements chemically joined in a fixed ratio.',Mixture:'Substances together, not joined.','Chemical formula':'Shows which elements and how many atoms.'}
});
