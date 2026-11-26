QLab.register({
id:'c9_mole',code:'9-C3',title:'The mole counter: counting atoms by weighing',grade:9,subject:'Chemistry',emoji:'🔢',
hook:{title:'You cannot count atoms one by one. So how do chemists count them?',text:'They weigh. One mole of any substance has the same huge number of particles.'},
prior:'Know that atoms have different masses.',
guess:{q:'1 mole of carbon (12 g) and 1 mole of copper (63.5 g) contain…',options:['More atoms in copper','More atoms in carbon','The same number of atoms','No atoms'],answer:2,hint:'The mole is a counting number, like a dozen.',after:'Weigh some substances.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A digital balance with a sample pan, substance bottles and scoops, and a mole counter'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const S={'Water':{f:'H₂O',M:18,c:'#bfe3ff'},'Carbon':{f:'C',M:12,c:'#3b3b44'},'Salt':{f:'NaCl',M:58.5,c:'#f3f6fb'},'CO₂ (dry ice)':{f:'CO₂',M:44,c:'#dfe9f2'},'Copper':{f:'Cu',M:63.5,c:'#c8793a'}};
 const mx=P?100:230,my=P?300:340;
 E('rect',{x:mx-92,y:my,width:184,height:P?22:26,rx:10,fill:'#55688a',stroke:'#2d3a52','stroke-width':3},sc.gMain);E('rect',{x:mx-84,y:my-8,width:168,height:10,rx:5,fill:'#c9d1e0',stroke:'#4a5568','stroke-width':2.5},sc.gMain);T(sc.gMain,mx,my+(P?16:18),'BALANCE',{'font-size':11,'font-weight':800,fill:'#fff',class:''});
 const jar=sc.vessel({x:mx,y:my-8,type:'beaker',w:P?130:140,h:P?100:110,level:0,color:'#fff',label:'Sample'});
 const gD=E('g',{},sc.gMain);
 const rx=P?312:520,ry=P?150:120,rw=P?160:230;
 const gP=E('g',{},sc.gMain);
 let sub=chal?'Water':'Water',g=chal?36:0;const seen=new Set();let busy=false;
 function panel(){gP.innerHTML='';const M=S[sub].M,n=g/M;
  E('rect',{x:rx-rw/2,y:ry-50,width:rw,height:70,rx:14,fill:'#13204d',stroke:'#4a5568','stroke-width':3},gP);T(gP,rx,ry-26,'mass on balance',{'font-size':10,fill:'#9fb0d8',class:''});T(gP,rx,ry+6,g.toFixed(1)+' g',{'font-size':30,'font-weight':900,fill:'#7bffb0',class:''});
  T(gP,rx,ry+40,`${sub} (${S[sub].f}): molar mass ${M} g/mol`,{'font-size':P?11:12,'font-weight':800,fill:'#2b2350',class:''});
  if(!chal){T(gP,rx,ry+62,`Moles = ${g.toFixed(1)} ÷ ${M} = ${n.toFixed(2)} mol`,{'font-size':P?12:13,'font-weight':800,fill:'#4b3fd1',class:''});
   T(gP,rx,ry+82,`Particles = ${(n*6.022).toFixed(2)} × 10²³`,{'font-size':P?11:12,fill:'#2b2350',class:''});
   const bx=rx-rw/2,by=ry+98,bw2=rw;E('rect',{x:bx,y:by,width:bw2,height:12,rx:6,fill:'#e8e4f6',stroke:'#cdb8ff','stroke-width':2},gP);E('rect',{x:bx,y:by,width:Math.min(bw2,n/2*bw2),height:12,rx:6,fill:Math.abs(n-1)<.01?'#2e9d5b':'#7a5cf0'},gP);E('line',{x1:bx+bw2/2,x2:bx+bw2/2,y1:by-5,y2:by+17,stroke:'#2b2350','stroke-width':2.5},gP);T(gP,bx+bw2/2,by+30,'1 mole',{'font-size':11,'font-weight':800,class:''});T(gP,bx,by+30,'0',{'font-size':10,'text-anchor':'start'}).setAttribute('text-anchor','start');T(gP,bx+bw2,by+30,'2',{'font-size':10}).setAttribute('text-anchor','end')}}
 function fill(){gD.innerHTML='';const M=S[sub].M,k=Math.min(1,g/(M*2.2));jar.setLevel&&jar.setLevel(k*.7,300);jar.setColor&&jar.setColor(S[sub].c,300);}
 sc.pick=name=>{if(busy)return;sub=name;g=0;fill();panel();L.snd.pop&&L.snd.pop();sc.say(`${name}: one mole weighs ${S[name].M} g. Scoop some in and watch the moles.`)};
 sc.add=x=>{if(busy)return;g=Math.max(0,Math.round((g+x)*10)/10);fill();panel();L.snd.tick&&L.snd.tick();const n=g/S[sub].M;
  if(Math.abs(n-1)<.01){L.snd.ok&&L.snd.ok();sc.say(`Exactly 1 mole of ${sub}: ${g} g and 6.022 × 10²³ particles.`,'ok');seen.add(sub);if(!chal&&seen.size>=3){api.award('did');api.ready()}}
  else sc.say(`${g.toFixed(1)} g ÷ ${S[sub].M} = ${n.toFixed(2)} mol`)};
 sc.clear=()=>{g=0;fill();panel();sc.say('Empty again.')};
 if(chal){
  sub='Water';g=36;fill();panel();
  const ax=P?W/2:rx,ay=P?H-190:H-120;
  const tg=sc.vessel({x:P?W/2:rx,y:P?H-150:H-150,type:'beaker',w:150,h:60,level:0,label:'moles = ?'});
  sc.answer=async v=>{if(busy)return;busy=true;sc.say(`You chose ${v} mol...`);await sc.sleep(500);
   if(v===2){L.snd.ok&&L.snd.ok();sc.say('36 ÷ 18 = 2 moles. Two lots of 18 g.','ok');api.solved()}
   else{L.snd.no&&L.snd.no();sc.say('Not that one. Moles = mass ÷ molar mass = 36 ÷ 18.','warn');api.nope('Moles = mass ÷ molar mass = 36 ÷ 18.')}busy=false};
  [0.5,1,2,18].forEach((v,i)=>sc.tool({x:P?48+i*98:430+i*80,y:P?492:372,label:v+' mol',ly:34,scale:.9,draw:g2=>{E('circle',{r:20,fill:'#efe8ff',stroke:'#7a5cf0','stroke-width':3},g2);T(g2,0,5,String(v),{'font-size':15,'font-weight':900,fill:'#2b2350',class:''})},use:()=>sc.answer(v)}));
  api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>How many moles are in 36 g of water?</b> Drag a number onto the pan, or tap.</p><div class="row" style="flex-wrap:wrap">${[0.5,1,2,18].map(v=>`<button data-a="${v}">${v} mol</button>`).join('')}</div>`;
  api.ctrl.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>sc.answer(+b.dataset.a));sc.say('The balance shows 36 g of water. How many moles?');return}
 const names=Object.keys(S);
 names.forEach((n,i)=>sc.tool({x:P?44+i*76:380+i*76,y:P?440:372,label:n.split(' ')[0],ly:34,scale:.8,draw:g2=>{E('rect',{x:-13,y:-6,width:26,height:26,rx:6,fill:S[n].c,stroke:'#5a6a85','stroke-width':2.5},g2);E('rect',{x:-6,y:-14,width:12,height:9,fill:'#7a5cf0'},g2)},use:()=>sc.pick(n)}));
 [['+10 g',10],['+1 g',1],['+0.5 g',.5]].forEach((d,i)=>sc.tool({x:P?60+i*100:410+i*90,y:P?520:300,label:d[0],ly:34,scale:.8,draw:g2=>{E('path',{d:'M-14 0 Q-14 -16 0 -16 Q14 -16 14 0 Z',fill:'#e8d8b8',stroke:'#8a6a2a','stroke-width':2.5},g2);E('rect',{x:-3,y:-2,width:6,height:22,fill:'#8a6a2a'},g2)},use:()=>sc.add(d[1])}));
 fill();panel();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Pick a bottle</b> (drag it onto the pan), then <b>scoop</b> until the bar reaches 1 mole.</p><div class="row" style="flex-wrap:wrap">${names.map(n=>`<button data-s="${n}">${n}</button>`).join('')}</div><div class="row" style="flex-wrap:wrap"><button class="pri" data-g="10">+10 g</button><button class="pri" data-g="1">+1 g</button><button class="pri" data-g="0.5">+0.5 g</button><button id="ce">Empty</button></div><p class="lockhint" style="margin:6px 0 0;text-align:left">Weigh exactly 1 mole of 3 different substances to unlock the next step.</p>`;
 api.ctrl.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>sc.pick(b.dataset.s));api.ctrl.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>sc.add(+b.dataset.g));api.ctrl.querySelector('#ce').onclick=()=>sc.clear();
 sc.say('Pick a substance and weigh out its molar mass.')},
demo:[[S=>S.pick('Water'),'Pick water. One mole weighs 18 g.',700],[S=>{S.add(10);S.add(5);S.add(3)},'Scoop out 18 g. The bar reaches 1 mole.',900],[S=>S.pick('Carbon'),'Carbon is 12 g per mole. Same number of atoms, much less mass.',700],[S=>{S.add(10);S.add(1);S.add(1)},'12 g of carbon is also exactly 1 mole.',1000]],
why:['A <span class="word">mole</span> is a counting unit, like a dozen. <b>1 mole = 6.022 × 10²³ particles</b> (Avogadro\'s number).','The mass of one mole in grams equals the atomic or molecular mass. Carbon: 12 g. Water: 18 g. Salt: 58.5 g.','<b>Moles = mass ÷ molar mass.</b> Weigh a sample, divide, and you know how many particles you have.','That is how chemists measure out exact numbers of atoms with an ordinary balance.'],
check:[{q:'How many particles are in 1 mole?',options:['6.022 × 10²³','100','1000','12'],answer:0,why:'Avogadro\'s number.',hint:'A very huge number.'},
 {q:'How many moles in 44 g of CO₂ (44 g/mol)?',options:['0.5','1','2','44'],answer:1,why:'44 ÷ 44 = 1 mole.',hint:'Divide mass by molar mass.'},
 {q:'1 mole of copper and 1 mole of carbon have…',options:['Different numbers of atoms','The same number of atoms','Equal mass','No atoms'],answer:1,why:'A mole always has the same number of particles.',hint:'Think of a dozen eggs and a dozen mangoes.'}],
challenge:{text:'How many <b>moles</b> are in <b>36 g of water</b> (molar mass 18 g/mol)?',win:'36 ÷ 18 = 2 moles.'},
real:['Medicine doses and fertiliser amounts are calculated in moles.','Factories use moles to avoid wasting chemicals.','The mole links the tiny world of atoms to everyday grams.'],
words:{Mole:'6.022 × 10²³ particles.','Molar mass':'Mass of one mole, in grams.','Avogadro number':'6.022 × 10²³ per mole.',Particle:'An atom, molecule or ion.'}
});
