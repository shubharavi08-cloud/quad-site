QLab.register({
id:'c8_metalreact',code:'8-C3',title:'Metals in air and water: who is most reactive?',grade:8,subject:'Chemistry',emoji:'⚗️',
hook:{title:'Gold stays shiny for ever. Iron rusts. Sodium must be kept in oil. Why?',text:'Metals differ in how eagerly they react. This is a virtual lab, because some of these metals are far too dangerous to try at home.'},
prior:'Know that iron rusts.',
guess:{q:'Which metal reacts the most with air and water?',options:['Gold','Copper','Iron','Sodium'],answer:3,hint:'It is stored under oil to keep it away from air and water.',after:'Test five metals.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:chal?'Five metals to rank from most to least reactive':'A burner and a trough of water with five metal samples to test'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const MET=[['Sodium','Na','#c9d1d9'],['Magnesium','Mg','#dfe4ea'],['Iron','Fe','#9aa4ad'],['Copper','Cu','#d98a4b'],['Gold','Au','#f2c230']];
 const AIR={Sodium:'Tarnishes within seconds. Must be kept in oil.',Magnesium:'Burns with a dazzling white flame and leaves white ash (magnesium oxide).',Iron:'Slowly rusts in moist air. Needs days.',Copper:'Slowly turns dull, then green, over months.',Gold:'No change at all.'};
 const WAT={Sodium:'Fizzes wildly, darts about, can catch fire. VERY violent.',Magnesium:'Almost nothing in cold water. Bubbles slowly in hot water.',Iron:'No reaction in cold water.',Copper:'No reaction.',Gold:'No reaction.'};
 const mk=(g,m,x,y)=>{const r=E('rect',{x:x-20,y:y-10,width:40,height:20,rx:5,fill:m[2],stroke:'#1b2a4a','stroke-width':2.5},g);T(g,x,y+5,m[1],{'font-size':12,'font-weight':800,class:''});return r};
 const metalDraw=m=>g=>{E('rect',{x:-20,y:-10,width:40,height:20,rx:5,fill:m[2],stroke:'#1b2a4a','stroke-width':2.5},g);T(g,0,5,m[1],{'font-size':12,'font-weight':800,class:''})};
 const gA=E('g',{},sc.gMain);
 if(chal){
  const order=[];const sx=P?[60,150,240,330,330]:[0];
  const slotW=P?64:110,sy=P?120:150;const gS=E('g',{},sc.gMain);let busy=false;
  const slots=[];for(let i=0;i<5;i++){const x=P?(60+(i%3)*150):(120+i*130),y=P?(i<3?150:260):170;slots.push([x,y])}
  const draw=()=>{gS.innerHTML='';slots.forEach((p,i)=>{E('rect',{x:p[0]-48,y:p[1]-30,width:96,height:60,rx:12,fill:'#fff',opacity:.85,stroke:'#cdb8ff','stroke-width':3,'stroke-dasharray':order[i]?'0':'6 5'},gS);T(gS,p[0]-34,p[1]-14,String(i+1),{'font-size':13,'font-weight':900,fill:'#7a5cf0',class:''});if(order[i]){mk(gS,MET.find(m=>m[0]===order[i]),p[0]+4,p[1]+8)}else T(gS,p[0],p[1]+16,i===0?'most':i===4?'least':'',{'font-size':10})})};
  const tg=sc.vessel({x:W/2,y:P?330:300,type:'beaker',w:P?300:620,h:P?340:260,level:0,label:''});tg.g.style.opacity=0;
  sc.rank=async n=>{if(busy||order.includes(n))return;order.push(n);L.snd.pop&&L.snd.pop();draw();if(order.length===5){busy=true;await sc.sleep(500);if(order.join()===MET.map(x=>x[0]).join()){L.snd.ok&&L.snd.ok();sc.say('Correct: Sodium, Magnesium, Iron, Copper, Gold.','ok');api.solved()}else{const m='Not quite. The most reactive burns or fizzes fastest; the least reactive shows no change. Start again.';L.snd.no&&L.snd.no();sc.say(m,'warn');api.nope(m);order.length=0;draw()}busy=false}};
  sc.reset=()=>{order.length=0;draw()};
  MET.forEach((m,i)=>sc.tool({x:P?60+(i%3)*150:130+i*130,y:P?(i<3?452:520):372,label:m[0],ly:34,scale:1,draw:metalDraw(m),use:()=>sc.rank(m[0])}));
  api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Rank the metals from MOST to LEAST reactive.</b> Drag each metal onto the slots in order.</p><div class="row" style="flex-wrap:wrap">${MET.map(m=>`<button data-r="${m[0]}">${m[0]}</button>`).join('')}<button id="rs">↺ Start again</button></div>`;
  api.ctrl.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>sc.rank(b.dataset.r));api.ctrl.querySelector('#rs').onclick=()=>sc.reset();draw();sc.say('Which metal is most reactive? Put it first.');return}
 // learn: burner dish + water trough
 const by=P?300:285,bx=P?110:210,wx=P?290:520;
 const dish=sc.vessel({x:bx,y:by,type:'beaker',w:P?120:130,h:P?60:70,level:0,label:''});
 const trough=sc.vessel({x:wx,y:by,type:'beaker',w:P?140:190,h:P?110:120,level:.6,color:'#cde9f9',label:'Cold water'});
 const flame=E('text',{x:bx,y:by+34,'text-anchor':'middle','font-size':30},sc.gMain);flame.textContent='🔥';T(sc.gMain,bx,by+60,'Burner: heat in air',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''});
 const done={};let busy=false;
 sc.run=async(n,test)=>{if(busy)return;const m=MET.find(x=>x[0]===n);busy=true;gA.innerHTML='';const x=test==='air'?bx:wx,y=test==='air'?by-26:by-bh0()-0;
  function bh0(){return P?110:120}
  const px=x,py=test==='air'?by-16:by-(P?110:120)*.55;
  const pc=E('g',{},gA);const r=E('rect',{x:px-20,y:py-26-60,width:40,height:20,rx:5,fill:m[2],stroke:'#1b2a4a','stroke-width':2.5,style:'transition:y .7s'},pc);const lb=T(pc,px,py-26-45,m[1],{'font-size':12,'font-weight':800,class:''});
  setTimeout(()=>{r.setAttribute('y',py-12);lb.setAttribute('y',py+3)},30);L.snd.drop&&L.snd.drop();await sc.sleep(800);
  if(test==='air'){
   if(n==='Sodium'){r.setAttribute('fill','#8a8f96');const f=T(gA,px,py-30,'✨',{'font-size':26,class:''});await sc.sleep(900);f.remove()}
   else if(n==='Magnesium'){L.snd.boom&&L.snd.boom();const f=E('circle',{cx:px,cy:py-4,r:10,fill:'#fff',opacity:.95,style:'transition:all .6s'},gA);setTimeout(()=>{f.setAttribute('r',46);f.setAttribute('opacity',.35)},30);T(gA,px,py-60,'✨ dazzling white flame',{'font-size':12,'font-weight':800,class:''});await sc.sleep(900);r.setAttribute('fill','#f2f2f2');for(let i=0;i<8;i++)E('circle',{cx:px-14+i*4,cy:py+6,r:2.5,fill:'#fff',stroke:'#aaa'},gA);f.remove()}
   else if(n==='Iron'){r.style.transition='fill 1.6s';r.setAttribute('fill','#b4562a');await sc.sleep(1700)}
   else if(n==='Copper'){r.style.transition='fill 1.6s';r.setAttribute('fill','#6fae8f');await sc.sleep(1700)}
   else await sc.sleep(900)}
  else{
   if(n==='Sodium'){L.snd.fizz&&L.snd.fizz();trough.bubbles&&trough.bubbles(1800,14,'#fff');for(let k=0;k<8;k++){const nx=wx-40+Math.random()*80;r.style.transition='x .25s';r.setAttribute('x',nx-20);lb.setAttribute('x',nx);await sc.sleep(260)}const b=T(gA,wx,by-140,'💥',{'font-size':40,class:''});await sc.sleep(800);b.remove()}
   else if(n==='Magnesium'){trough.bubbles&&trough.bubbles(1200,3,'#fff');await sc.sleep(1300)}
   else await sc.sleep(900)}
  const msg=(test==='air'?AIR[n]:WAT[n]);sc.say(`${n}: ${msg}`,'ok');done[n+test]=1;
  if(!chal&&Object.keys(done).length>=8){api.award('did');api.ready()}busy=false};
 const sel={m:'Sodium'};
 MET.forEach((m,i)=>sc.tool({x:P?60+(i%3)*150:130+i*100,y:P?(i<3?452:520):372,label:m[0],ly:34,scale:1,draw:metalDraw(m),use:v=>sc.run(m[0],v===trough?'wat':'air')}));
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Drag a metal onto the flame dish or the water trough.</b></p><div class="row" style="flex-wrap:wrap">${MET.map(m=>`<button data-m="${m[0]}">${m[0]}</button>`).join('')}</div><div class="row"><button class="pri" id="ta">🔥 Heat in air</button><button class="pri" id="tw">💧 Drop in water</button></div><p style="font-size:13px;margin:4px 0 0">⚠️ Virtual only. Never try sodium or magnesium at home.</p><p class="lockhint" style="margin:6px 0 0;text-align:left">Run 8 of the 10 tests to unlock the next step.</p>`;
 api.ctrl.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{sel.m=b.dataset.m;api.ctrl.querySelectorAll('[data-m]').forEach(x=>x.className=x===b?'pri':'');sc.say(sel.m+' selected. Choose a test.')});
 api.ctrl.querySelector('#ta').onclick=()=>sc.run(sel.m,'air');api.ctrl.querySelector('#tw').onclick=()=>sc.run(sel.m,'wat');
 sc.say('Pick a metal and test it in flame or in water.')},
demo:[[S=>S.run('Sodium','wat'),'Sodium in water: it fizzes and darts about. Very violent.',500],[S=>S.run('Magnesium','air'),'Magnesium in a flame: a dazzling white light.',500],[S=>S.run('Iron','air'),'Iron only rusts slowly.',500],[S=>S.run('Gold','wat'),'Gold: nothing happens at all.',500]],
why:['Metals differ in how readily they react. This order is the start of the <span class="word">reactivity series</span>.','<b>Sodium</b> reacts violently with water. <b>Magnesium</b> burns brilliantly in air. <b>Iron</b> rusts slowly. <b>Copper</b> tarnishes slowly. <b>Gold</b> hardly reacts at all.','Very reactive metals are stored carefully (sodium under oil). Unreactive metals like gold and platinum stay shiny, which is why they are used in jewellery.','When a metal burns in air it joins with oxygen to make a metal <b>oxide</b>.'],
check:[{q:'Which metal is stored under oil?',options:['Gold','Copper','Sodium','Iron'],answer:2,why:'Sodium reacts with air and water, so oil protects it.',hint:'It was the most violent in water.'},
 {q:'Magnesium burns in air and gives…',options:['A white ash, magnesium oxide','Water','Gold','Smoke only'],answer:0,why:'Magnesium joins with oxygen to make white magnesium oxide.',hint:'You saw the dazzling flame.'},
 {q:'Why is gold used for jewellery that lasts for ever?',options:['It is cheap','It hardly reacts with air or water','It is a gas','It is magnetic'],answer:1,why:'Gold is very unreactive, so it never rusts or tarnishes.',hint:'Gold showed no change.'}],
challenge:{text:'Click the five metals in order from <b>most reactive</b> to <b>least reactive</b>.',win:'Na, Mg, Fe, Cu, Au. You rebuilt the start of the reactivity series.'},
real:['Iron objects are painted or galvanised because iron rusts.','Aluminium foil does not corrode easily because a thin oxide layer protects it.','Gold and silver coins found in old shipwrecks still shine, while iron ones have rusted away.'],
words:{Reactivity:'How eagerly a metal reacts.',Oxide:'A compound of a metal with oxygen.',Tarnish:'A dull layer on a metal surface.','Reactivity series':'Metals listed from most to least reactive.'}
});
