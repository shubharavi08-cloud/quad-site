QLab.register({
id:'c9_separate',code:'9-C1',title:'Separate the mixture: filter, evaporate, distil',grade:9,subject:'Chemistry',emoji:'🧫',
hook:{title:'Muddy salt water: how do you get clean water and salt from it?',text:'Different mixtures need different methods. Pick the right tool for each job.'},
prior:'You tried filtering and evaporating in Grade 8. Here you choose between methods.',
guess:{q:'To get sand out of sand-and-water, you should…',options:['Evaporate it','Filter it','Distil it','Dissolve it'],answer:1,hint:'Sand does not dissolve. A filter catches big pieces.',after:'Now try harder mixtures.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A bench with a mixture in a beaker and a funnel, burner, condenser and magnet to separate it'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const J=chal?[{n:'Muddy salt water',p:['sand','salt','water'],st:['filter','evaporate','distil'],say:['Sand is not dissolved, so filter it out first.','Salt is dissolved. Heat to get the salt.','Catch the steam to keep the water.']}]:
 [{n:'Sand + water',p:['sand','water'],st:['filter'],say:['The paper catches the sand. Clear water goes through.']},
  {n:'Salt + water',p:['salt','water'],st:['evaporate'],say:['The water leaves as steam. White salt stays in the dish.']},
  {n:'Water + alcohol',p:['alc','water'],st:['distil'],say:['Alcohol boils first, so it travels to the cold flask. Water stays behind.']},
  {n:'Iron filings + sulphur',p:['iron','sulphur'],st:['magnet'],say:['Only the iron jumps to the magnet.']}];
 let ji=0,si=0,busy=false,wrong=0;
 const mx=P?110:150,my=P?270:330,bw=P?118:130,bh=P?130:140;
 const gD=E('g',{},sc.gMain),gR=E('g',{},sc.gMain),gT=E('g',{},sc.gMain);
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 let jar,dots=[];
 const COL={sand:'#b08a4a',salt:'#fff',iron:'#5d6575',sulphur:'#f2d13a',alc:'#f4a6c8'};
 const wet=j=>j.p.includes('water');
 function draw(){gD.innerHTML='';gR.innerHTML='';gT.innerHTML='';dots=[];const j=J[ji];
  if(jar&&jar.g)jar.g.remove();
  jar=sc.vessel({x:mx,y:my,type:'beaker',w:bw,h:bh,level:wet(j)?.62:0,color:j.p.includes('alc')?'#f6dbe8':'#bfe3ff',label:j.n});sc.gMain.appendChild(gD);sc.gMain.appendChild(gR);sc.gMain.appendChild(gT);
  const x0=mx-bw/2+10,x1=mx+bw/2-10,wt=wet(j)?my-bh*.62:my-10;
  const mk=(k,n,fn)=>{for(let i=0;i<n;i++){const c=E('circle',{r:k==='iron'?2.6:k==='salt'?3.6:3.8,fill:COL[k],stroke:k==='salt'?'#5a7fb0':'#0003','stroke-width':k==='salt'?1.3:.8},gD);const o={c,k,x:x0+Math.random()*(x1-x0),y:fn(i),vx:0,vy:0};c.setAttribute('cx',o.x);c.setAttribute('cy',o.y);dots.push(o)}};
  if(j.p.includes('sand'))mk('sand',16,i=>my-8-Math.random()*10);
  if(j.p.includes('salt'))mk('salt',16,i=>wt+10+Math.random()*(my-wt-26));
  if(j.p.includes('alc'))mk('alc',14,i=>wt+10+Math.random()*(my-wt-26));
  if(j.p.includes('iron'))mk('iron',20,i=>my-8-Math.random()*22);
  if(j.p.includes('sulphur'))mk('sulphur',20,i=>my-8-Math.random()*22);
  T(gT,mx,my+(P?48:50),`${ji+1} of ${J.length}: ${j.n}`,{'font-size':13,'font-weight':800,fill:'#2b2350',class:''});
  if(J[ji].st.length>1)T(gT,mx,my+(P?64:66),`Step ${si+1} of ${J[ji].st.length}`,{'font-size':12,class:'lkhint'})}
 const outX=P?290:560,outY=P?270:300;
 function pile(k,n,x,y){for(let i=0;i<n;i++){const c=E('circle',{r:3.6,fill:COL[k],stroke:'#0003','stroke-width':.8,cx:x+(i%7)*7-21,cy:y-Math.floor(i/7)*6},gR)}}
 const mvTo=(o,x,y,ms)=>{o.c.style.transition=`cx ${ms}ms ease,cy ${ms}ms ease`;o.c.setAttribute('cx',x);o.c.setAttribute('cy',y)};
 const fx={
 async filter(j){// funnel over a receiving beaker
  const fxp=outX,fyp=outY-60;E('polygon',{points:`${fxp-46},${fyp-60} ${fxp+46},${fyp-60} ${fxp+6},${fyp} ${fxp-6},${fyp}`,fill:'#f4efe0',stroke:'#8a7a50','stroke-width':3},gR);
  const rec=E('path',{d:`M${fxp-40} ${outY-52} V${outY-6} Q${fxp-40} ${outY} ${fxp-34} ${outY} H${fxp+34} Q${fxp+40} ${outY} ${fxp+40} ${outY-6} V${outY-52}`,fill:'none',stroke:'#5a7fb0','stroke-width':3},gR);
  T(gR,fxp,outY+18,'Filter paper in funnel',{'font-size':11});L.snd.whoosh&&L.snd.whoosh();
  const sand=dots.filter(d=>d.k==='sand');sand.forEach((d,i)=>mvTo(d,fxp-30+Math.random()*60,fyp-66+Math.random()*8,900));
  jar.setLevel&&jar.setLevel(0);await sc.sleep(1000);
  E('rect',{x:fxp-34,y:outY-8-(P?20:24),width:68,height:P?20:24,fill:'#bfe3ff',opacity:.9},gR);
  const rest=dots.filter(d=>d.k!=='sand');rest.forEach(d=>mvTo(d,fxp-30+Math.random()*60,outY-8-Math.random()*16,900));await sc.sleep(900);
  T(gR,fxp,fyp-70,'Sand stays on the paper',{'font-size':11,fill:'#8a6a2a','font-weight':800,class:''})},
 async evaporate(j){const dx=outX,dy=outY;
  E('path',{d:`M${dx-44} ${dy-20} Q${dx-40} ${dy} ${dx} ${dy} Q${dx+40} ${dy} ${dx+44} ${dy-20} Z`,fill:'#d8dde6',stroke:'#1b2a4a','stroke-width':3},gR);
  const fl=E('text',{x:dx,y:dy+34,'text-anchor':'middle','font-size':26},gR);fl.textContent='🔥';
  T(gR,dx,dy+52,'Evaporating dish on burner',{'font-size':11});L.snd.fizz&&L.snd.fizz();
  dots.filter(d=>d.k==='salt'||d.k==='sand').forEach((d,i)=>mvTo(d,dx-30+(i%10)*6,dy-6-Math.floor(i/10)*5,1100));
  jar.setLevel&&jar.setLevel(0);
  for(let i=0;i<6;i++){const s=E('text',{x:dx-30+i*12,y:dy-30,'font-size':16,opacity:.7,style:'transition:all 1.4s'},gR);s.textContent='☁️';setTimeout(()=>{s.setAttribute('y',dy-110-i*4);s.style.opacity=0},40+i*100)}
  await sc.sleep(1500);T(gR,dx,dy-46,'White salt crystals left',{'font-size':11,fill:'#2b2350','font-weight':800,class:''})},
 async distil(j){const fxp=outX;E('path',{d:`M${mx+bw/2+8} ${my-bh} Q${(mx+fxp)/2} ${my-bh-70} ${fxp} ${outY-90}`,fill:'none',stroke:'#7a8aa8','stroke-width':6,'stroke-linecap':'round'},gR);
  E('path',{d:`M${fxp-34} ${outY-90} H${fxp+34} L${fxp+34} ${outY-8} Q${fxp+34} ${outY} ${fxp+26} ${outY} H${fxp-26} Q${fxp-34} ${outY} ${fxp-34} ${outY-8} Z`,fill:'none',stroke:'#5a7fb0','stroke-width':3},gR);
  T(gR,fxp,outY+18,'Cold receiver',{'font-size':11});L.snd.fizz&&L.snd.fizz();
  const liq=E('rect',{x:fxp-30,y:outY-6,width:60,height:0,fill:'#bfe3ff',opacity:.9,style:'transition:all 1.6s'},gR);setTimeout(()=>{liq.setAttribute('y',outY-44);liq.setAttribute('height',38)},50);
  for(let i=0;i<5;i++){const t=E('text',{x:(mx+fxp)/2,y:my-bh-40,'font-size':14,style:'transition:all 1.2s'},gR);t.textContent='💧';setTimeout(()=>{t.setAttribute('x',fxp);t.setAttribute('y',outY-60);t.style.opacity=0},100+i*250)}
  jar.setLevel&&jar.setLevel(.1);dots.filter(d=>d.k==='salt'||d.k==='alc').forEach(d=>d.c.style.opacity=0);await sc.sleep(1700);
  T(gR,fxp,outY-100,'Pure liquid collected',{'font-size':11,'font-weight':800,fill:'#2b2350',class:''})},
 async magnet(j){const mgx=outX,mgy=outY-70;const g=E('g',{},gR);E('path',{d:`M${mgx-30} ${mgy} v30 a30 30 0 0 0 60 0 v-30 h-18 v30 a12 12 0 0 1 -24 0 v-30 z`,fill:'#d33',stroke:'#7a1c1c','stroke-width':3},g);E('rect',{x:mgx-30,y:mgy-8,width:18,height:12,fill:'#ddd'},g);E('rect',{x:mgx+12,y:mgy-8,width:18,height:12,fill:'#ddd'},g);
  T(gR,mgx,mgy+62,'Magnet',{'font-size':11});L.snd.pop&&L.snd.pop();
  dots.filter(d=>d.k==='iron').forEach((d,i)=>mvTo(d,mgx-30+(i%6)*10+Math.random()*3,mgy+32+Math.floor(i/6)*5,1100));await sc.sleep(1300);
  T(gR,mgx,mgy-18,'Iron sticks. Sulphur stays.',{'font-size':11,'font-weight':800,fill:'#2b2350',class:''})}};
 const NAMES={filter:'Filter',evaporate:'Evaporate',distil:'Distil',magnet:'Magnet'};
 sc.apply=async m=>{if(busy)return;const j=J[ji];if(!j)return;
  if(m!==j.st[si]){wrong++;L.snd.no&&L.snd.no();const hints={filter:'Filtering catches undissolved solids. Is anything undissolved here?',evaporate:'Evaporation gets a dissolved solid. Is anything dissolved here?',distil:'Distillation needs liquids with different boiling points.',magnet:'A magnet only attracts magnetic things like iron.'};
   sc.say(`${NAMES[m]} will not work yet. ${hints[m]}`,'warn');if(chal)api.nope(hints[m]);return}
  busy=true;gR.innerHTML=gR.innerHTML;await fx[m](j);L.snd.ok&&L.snd.ok();sc.say(j.say[si],'ok');
  si++;
  if(si>=j.st.length){await sc.sleep(1800);ji++;si=0;
   if(ji>=J.length){sc.say(chal?'Sand, salt and water, all separated!':'All four mixtures separated. You pick the method from what is different.','ok');if(chal)api.solved();else{api.award('did');api.ready()}busy=false;return}
   draw()}
  else{await sc.sleep(500);const keep=gR.innerHTML;draw();}
  busy=false};
 // tools
 const defs=[['filter','🧻 Funnel',(g,D)=>{E('polygon',{points:'-24,-14 24,-14 4,16 -4,16',fill:'#f4efe0',stroke:'#8a7a50','stroke-width':3},g)}],
  ['evaporate','Burner',(g,D)=>{E('rect',{x:-16,y:2,width:32,height:12,rx:3,fill:'#8a96a8',stroke:'#4a5568','stroke-width':2},g);const f=E('text',{x:0,y:0,'text-anchor':'middle','font-size':22},g);f.textContent='🔥'}],
  ['distil','Condenser',(g,D)=>{E('rect',{x:-26,y:-6,width:52,height:12,rx:6,fill:'#cde9f9',stroke:'#5a7fb0','stroke-width':3,transform:'rotate(-20)'},g)}],
  ['magnet','Magnet',(g,D)=>{E('path',{d:'M-16 -14 v18 a16 16 0 0 0 32 0 v-18 h-10 v18 a6 6 0 0 1 -12 0 v-18 z',fill:'#d33',stroke:'#7a1c1c','stroke-width':2},g)}]];
 const names={filter:'Funnel',evaporate:'Burner',distil:'Condenser',magnet:'Magnet'};
 defs.forEach((d,i)=>{sc.tool({x:P?48+i*98:330+i*120,y:P?492:372,label:names[d[0]],ly:P?38:36,scale:.85,draw:d[2],use:v=>sc.apply(d[0])})});
 draw();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Drag a tool onto the beaker</b>, or tap a button.</p><div class="row" style="flex-wrap:wrap">${defs.map(d=>`<button data-m="${d[0]}">${d[1]||names[d[0]]}</button>`).join('')}</div>${chal?'':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Separate all 4 mixtures to unlock the next step.</p>'}`;
 api.ctrl.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>sc.apply(b.dataset.m));
 sc.say(chal?'Muddy salt water. Which tool first?':'Look at the first mixture. Which tool will separate it?')},
demo:[[S=>S.apply('filter'),'Sand is not dissolved. The funnel catches it.',900],[S=>S.apply('evaporate'),'Salt is dissolved. Heating drives off the water.',900],[S=>S.apply('distil'),'Two liquids? Use their different boiling points.',900],[S=>S.apply('magnet'),'Iron is magnetic, sulphur is not.',900]],
why:['Pick the method from the <b>property that differs</b> between the parts of the mixture.','<b>Filtration</b> separates an undissolved solid from a liquid. <b>Evaporation</b> gets a dissolved solid. <b>Distillation</b> separates liquids by boiling point. A <b>magnet</b> separates magnetic from non-magnetic.','If one method does not work, ask what is different: size, solubility, boiling point, magnetism.','Many real jobs need two or three methods one after another.'],
check:[{q:'Which separates alcohol from water?',options:['Filtration','Distillation','Magnet','Sieving'],answer:1,why:'Alcohol and water have different boiling points.',hint:'Both are liquids.'},
 {q:'Dissolved salt is separated from water by…',options:['Filtration','A magnet','Evaporation','Sieving'],answer:2,why:'Dissolved salt passes through a filter, so evaporate the water.',hint:'The salt is dissolved.'},
 {q:'Why can a magnet separate iron filings from sulphur?',options:['Iron is magnetic, sulphur is not','Sulphur is heavier','Iron dissolves','Sulphur melts'],answer:0,why:'Only iron is attracted to a magnet.',hint:'Test each with a magnet.'}],
challenge:{text:'Separate <b>muddy salt water</b> into sand, salt and clean water. Choose the methods in the right order: filter, then evaporate, then distil.',win:'Filter first, then remove the water. The steps depend on what is dissolved.'},
real:['Water treatment plants filter muddy river water.','Petrol, diesel and kerosene are separated from crude oil by distillation.','Scrap yards use giant magnets to lift iron.'],
words:{Mixture:'Two or more substances together, not joined chemically.',Filtration:'Separating an undissolved solid from a liquid.',Distillation:'Separating liquids by boiling point.',Residue:'What is left behind on the filter paper.'}
});
