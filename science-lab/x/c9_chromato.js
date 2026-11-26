QLab.register({
id:'c9_chromato',code:'9-C1',title:'Chromatography: what colours are in black ink?',grade:9,subject:'Chemistry',emoji:'🖍️',
hook:{title:'A black pen mark is a secret mixture of colours.',text:'Dip a strip of paper in water. As the water climbs, the colours in the ink separate.'},
prior:'Know that black ink is a colour.',
guess:{q:'You dip paper with a black ink spot into water. What do you see after some minutes?',options:['The ink stays black','The ink separates into different colours','The ink disappears','The paper turns black'],answer:1,hint:'Some pens are mixtures of dyes.',after:'Run the experiment.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A strip of filter paper in a beaker of water with an ink spot, pens and a timer'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const INK={'Black pen A':[['#f5a623',.80],['#d0021b',.60],['#2979ff',.35]],'Black pen B':[['#7ed321',.70],['#2979ff',.40]],'Blue pen':[['#2979ff',.45]],'Red pen':[['#d0021b',.62],['#f5a623',.85]]};
 const pens=Object.keys(INK),penCol={'Black pen A':'#222','Black pen B':'#333','Blue pen':'#2255cc','Red pen':'#cc2222'};
 const mystery='Black pen B';
 const PH=P?190:170;
 const strip=(g,cx,base,ink,t,pw)=>{g.innerHTML='';const top=base-PH-10;
  E('rect',{x:cx-pw/2,y:top,width:pw,height:(base+60)-top,fill:'#faf7ef',stroke:'#c9c2ad','stroke-width':3},g);
  if(t>0)E('rect',{x:cx-pw/2+2,y:base-t/10*PH,width:pw-4,height:60+t/10*PH,fill:'#cde9f9',opacity:.45},g);
  E('line',{x1:cx-pw/2,x2:cx+pw/2,y1:base,y2:base,stroke:'#9a8f70','stroke-dasharray':'5 4','stroke-width':1.5},g);
  if(ink){const dot=Math.max(0,.9-t/6);E('circle',{cx,cy:base,r:t===0?8:5,fill:'#222',opacity:t===0?1:dot},g);
   if(t>0)ink.forEach((c,i)=>{const y=base-c[1]*Math.min(t,10)/10*PH;E('ellipse',{cx,cy:y,rx:pw*.2+i*3,ry:6,fill:c[0],opacity:.88},g)})}};
 if(chal){
  const gS=E('g',{},sc.gMain);const xs=[W*.2,W*.5,W*.8],pw=P?70:84,base=P?330:300,tgs=[['Black pen A',INK['Black pen A']],['Mystery ink',INK[mystery]],['Black pen B',INK['Black pen B']]];
  tgs.forEach((t,i)=>{const g=E('g',{},gS);strip(g,xs[i],base,t[1],10,pw);T(gS,xs[i],base-PH-22,t[0],{'font-size':P?11:13,'font-weight':800,fill:i===1?'#7a5cf0':'#2b2350',class:''})});
  const tg=sc.vessel({x:xs[1],y:base+30,type:'beaker',w:pw+30,h:PH+40,level:0,label:''});tg.g.style.opacity=0;
  sc.answer=async k=>{if(k===mystery){L.snd.ok&&L.snd.ok();sc.say('Yes! Green and blue at the same heights as Black pen B.','ok');api.solved()}else{L.snd.no&&L.snd.no();sc.say('Compare the heights. Pen A has orange, red and blue. The mystery has only green and blue.','warn');api.nope('Black pen A has three dyes, but the mystery ink has just green and blue.')}};
  ['Black pen A','Black pen B'].forEach((k,i)=>sc.tool({x:P?100+i*210:300+i*160,y:P?492:372,label:k,ly:34,scale:1,draw:g=>{E('rect',{x:-6,y:-22,width:12,height:42,rx:4,fill:penCol[k]},g);E('polygon',{points:'-6,20 6,20 0,30',fill:penCol[k]},g)},use:()=>sc.answer(k)}));
  api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Which pen made the mystery ink?</b> Drag a pen onto the middle strip, or tap.</p><div class="row" id="ch">${['Black pen A','Black pen B'].map(k=>`<button data-a="${k}">${k}</button>`).join('')}</div>`;
  api.ctrl.querySelectorAll('#ch [data-a]').forEach(b=>b.onclick=()=>sc.answer(b.dataset.a));sc.say('Compare the colours and where they stopped.');return}
 const mx=P?210:300,my=P?450:378,bw=P?150:140,bh=P?110:120;
 const base=my-bh*0.4-(P?44:46);
 const jar=sc.vessel({x:mx,y:my,type:'beaker',w:bw,h:bh,level:.45,label:'Water'});
 const gP=E('g',{},sc.gMain);sc.gMain.appendChild(gP);
 let pen=null,t=0,busy=false;const seen=new Set();
 const pw=P?76:84;
 function redraw(){strip(gP,mx,base,pen?INK[pen]:null,t,pw);gP.appendChild(E('text',{x:mx,y:base-PH-22,'text-anchor':'middle',class:'lkhint','font-size':13,'font-weight':800,fill:'#2b2350'}));gP.lastChild.textContent=pen?`${pen} ink on the pencil line`:'Pick a pen';
  T(gP,mx+pw/2+(P?4:70),base+4,'pencil line',{'font-size':10,'text-anchor':P?'start':'start'}).setAttribute('text-anchor','start');
  T(gP,mx+pw/2+(P?4:70),my-bh*.4-10,'water level',{'font-size':10}).setAttribute('text-anchor','start');gP.querySelectorAll('text').forEach((e,i)=>{if(i===0)e.setAttribute('x',mx)})}
 sc.pen=k=>{if(busy)return;pen=k;t=0;redraw();L.snd.pop&&L.snd.pop();sc.say(`${k}: one spot of ink on the pencil line. Now let the water climb.`)};
 sc.run=async mins=>{if(busy)return;if(!pen){sc.say('Draw an ink spot first: pick a pen.','warn');return}busy=true;const t0=t,t1=Math.min(10,t+mins);L.snd.fizz&&L.snd.fizz();
  const st=performance.now(),dur=1300;await new Promise(res=>{const f=n=>{const k=Math.min(1,(n-st)/dur);t=t0+(t1-t0)*k;redraw();k<1?requestAnimationFrame(f):res()};requestAnimationFrame(f)});
  t=t1;redraw();
  if(t>=5){const n=INK[pen].length;sc.say(n>1?`${n} different dyes separated. This ink is a mixture.`:'Only one spot. This ink is a single dye.','ok');seen.add(pen);if(seen.size>=2){api.award('did');api.ready()}}else sc.say('The water is climbing and carrying the dyes. Keep going.');
  busy=false};
 pens.forEach((k,i)=>sc.tool({x:P?48+i*98:430+i*80,y:P?516:372,label:k.replace(' pen','').replace('Black ','Blk '),ly:30,scale:.8,draw:g=>{E('rect',{x:-6,y:-22,width:12,height:42,rx:4,fill:penCol[k]},g);E('polygon',{points:'-6,20 6,20 0,30',fill:penCol[k]},g)},use:()=>sc.pen(k)}));
 sc.tool({x:P?60:110,y:P?250:200,label:'+2 min',ly:34,scale:.9,draw:g=>{E('path',{d:'M-12 -16 H12 L2 0 L12 16 H-12 L-2 0 Z',fill:'#f7efc4',stroke:'#8a6a2a','stroke-width':2.5},g)},use:()=>sc.run(2)});
 redraw();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Pick a pen</b> (drag it onto the paper), then drag the <b>timer</b> onto the beaker to let the water climb.</p><div class="row" style="flex-wrap:wrap">${pens.map(k=>`<button data-p="${k}">${k}</button>`).join('')}</div><div class="row"><button class="pri" id="r2">⏳ +2 min</button><button id="r10">⏩ Run to 10</button></div><p class="lockhint" style="margin:6px 0 0;text-align:left">Run 2 different pens for at least 5 minutes to unlock the next step.</p>`;
 api.ctrl.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>sc.pen(b.dataset.p));api.ctrl.querySelector('#r2').onclick=()=>sc.run(2);api.ctrl.querySelector('#r10').onclick=()=>sc.run(10);
 sc.say('Pick a pen to put an ink spot on the paper.')},
demo:[[S=>S.pen('Black pen A'),'Draw a black ink spot on the pencil line.',800],[S=>S.run(10),'Water climbs the paper. The black splits into orange, red and blue.',900],[S=>S.pen('Blue pen'),'A blue pen is a single dye.',800],[S=>S.run(10),'Only one spot travels. No splitting.',900]],
why:['Black ink is often a <b>mixture of dyes</b>. Water climbs the paper and carries each dye with it.','Each dye travels at a different speed. Dyes that dissolve well and stick weakly travel far. Others stay low.','This separation by speed is called <span class="word">chromatography</span>.','The pattern is like a fingerprint. Two pens with the same dyes give the same pattern.'],
check:[{q:'Why do different colours climb to different heights?',options:['They are different sizes of paper','Each dye moves at its own speed','Water is a mixture','Gravity changes'],answer:1,why:'Each dye dissolves and sticks to the paper differently.',hint:'Think of runners with different speeds.'},
 {q:'A pure single dye on chromatography paper gives…',options:['One spot','Many colours','No spot','A black line'],answer:0,why:'A pure substance gives a single spot.',hint:'Try the blue pen.'},
 {q:'Chromatography is used to…',options:['Make ink','Separate and identify coloured substances','Boil water','Cut paper'],answer:1,why:'It separates parts of a mixture and helps identify them.',hint:'Think of the black pen.'}],
challenge:{text:'A mystery ink is run on paper. <b>Match its pattern</b> to the right pen.',win:'The green and blue pattern matches Black pen B.'},
real:['Police use chromatography to match inks and dyes.','Labs test food colours and drugs by chromatography.','Athletes are tested using related methods.'],
words:{Chromatography:'Separating mixtures by how fast parts move over paper or a gel.',Dye:'A coloured substance.',Solvent:'The liquid that climbs the paper.',Mixture:'Several substances together.'}
});
