QLab.register({
id:'c8_firetriangle',code:'8-C4',title:'What does fire need?',grade:8,subject:'Chemistry',emoji:'🔥',
hook:{title:'A candle goes out when you cover it with a glass. Why?',text:'Fire needs three things at once. Remove any one and the fire goes out. Switch them on and off to see.'},
prior:'Nothing! You only need to have seen a candle burn.',
guess:{q:'You cover a burning candle with a glass jar. What happens?',options:['It burns brighter','It goes out after some time','Nothing changes','It burns for ever'],answer:1,hint:'Something in the air inside the jar gets used up.',after:'Try it with the switches.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:chal?'A pan of burning oil on a stove with safety tools to choose from':'A campfire with a jar, a water bucket and tongs to put it out'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const fx=P?150:260,fy=P?340:285;
 const gS=E('g',{},sc.gMain),gF=E('g',{},sc.gMain),gX=E('g',{},sc.gMain),gT=E('g',{},sc.gMain);
 let lit=true,logs=true,busy=false,size=1,fan=0;const seen=new Set();
 const tg=sc.vessel({x:fx,y:fy+10,type:'beaker',w:150,h:150,level:0,label:''});tg.g.style.opacity=0;
 const flame=E('text',{x:fx,y:fy-40,'text-anchor':'middle','font-size':80,style:'transform-box:fill-box;transform-origin:50% 100%'},gF);flame.textContent='🔥';
 function scene(){gS.innerHTML='';
  if(chal){E('rect',{x:fx-90,y:fy+4,width:180,height:16,rx:6,fill:'#55688a'},gS);E('path',{d:`M${fx-62} ${fy-20} Q${fx-56} ${fy+4} ${fx} ${fy+4} Q${fx+56} ${fy+4} ${fx+62} ${fy-20} Z`,fill:'#d8dde6',stroke:'#1b2a4a','stroke-width':4},gS);E('rect',{x:fx-62,y:fy-26,width:124,height:8,fill:'#f1c84b'},gS);T(gS,fx,fy+38,'Oil in a pan on the stove',{'font-size':12,'font-weight':800,class:''})}
  else{E('ellipse',{cx:fx,cy:fy+10,rx:90,ry:14,fill:'#000',opacity:.15},gS);if(logs){[[-34,0,-12],[34,0,12],[0,-8,0]].forEach(l=>{E('rect',{x:fx+l[0]-34,y:fy+l[1]-10,width:68,height:18,rx:8,fill:'#8a5a2a',stroke:'#5a3a18','stroke-width':3,transform:`rotate(${l[2]} ${fx+l[0]} ${fy+l[1]})`},gS)});T(gS,fx,fy+42,'Campfire: wood (fuel)',{'font-size':12,'font-weight':800,class:''})}else T(gS,fx,fy+42,'Wood removed',{'font-size':12,'font-weight':800,class:''})}}
 function tri(){gT.innerHTML='';if(chal)return;const tx=P?310:520,ty=P?170:150;E('polygon',{points:`${tx-70},${ty+90} ${tx+70},${ty+90} ${tx},${ty-30}`,fill:'#fff6d6',stroke:'#1b2a4a','stroke-width':4},gT);T(gT,tx,ty+40,'FIRE',{'font-size':14,'font-weight':900,class:''});
  T(gT,tx-60,ty+112,seen.has('f')?'Fuel ✔':'Fuel',{'font-size':13,'font-weight':800,fill:seen.has('f')?'#2e9d5b':'#2b2350',class:''});T(gT,tx+66,ty+112,seen.has('a')?'Oxygen ✔':'Oxygen',{'font-size':13,'font-weight':800,fill:seen.has('a')?'#2e9d5b':'#2b2350',class:''});T(gT,tx,ty-40,seen.has('h')?'Heat ✔':'Heat',{'font-size':13,'font-weight':800,fill:seen.has('h')?'#2e9d5b':'#2b2350',class:''})}
 let tt=0;(function tick(){if(!stage.isConnected)return;tt+=.2;const k=lit?size*(1+Math.sin(tt)*.05):0;flame.style.transform=`scale(${k},${k})`;flame.style.opacity=lit?1:0;requestAnimationFrame(tick)})();
 const out=async(how)=>{lit=false;L.snd.whoosh&&L.snd.whoosh();for(let i=0;i<4;i++){const c=E('text',{x:fx-30+i*20,y:fy-30,'text-anchor':'middle','font-size':20,opacity:.7,style:'transition:all 1.4s'},gX);c.textContent='☁️';setTimeout(()=>{c.setAttribute('y',fy-120);c.style.opacity=0},40+i*100)}await sc.sleep(1500);gX.innerHTML=''};
 sc.use=async k=>{if(busy)return;busy=true;
  if(chal){
   if(k==='lid'){const lidg=E('rect',{x:fx-76,y:fy-70,width:152,height:12,rx:5,fill:'#8a97a8',stroke:'#1b2a4a','stroke-width':3,style:'transition:y .7s'},gX);setTimeout(()=>lidg.setAttribute('y',fy-30),30);await sc.sleep(900);lit=false;await sc.sleep(700);L.snd.ok&&L.snd.ok();sc.say('The lid cuts off the oxygen. The fire dies and you stay safe.','ok');api.solved()}
   else if(k==='water'){L.snd.boom&&L.snd.boom();size=1.8;const b=E('text',{x:fx,y:fy-90,'text-anchor':'middle','font-size':46},gX);b.textContent='💥💦';await sc.sleep(1100);gX.innerHTML='';size=1.4;const m='Never use water on an oil fire. The burning oil floats and splashes, spreading the fire. Cut off the oxygen instead.';sc.say(m,'warn');api.nope(m)}
   else if(k==='fan'){size=1.9;L.snd.whoosh&&L.snd.whoosh();await sc.sleep(900);const m='Fanning gives the fire more oxygen. It will get bigger!';sc.say(m,'warn');api.nope(m);await sc.sleep(600);size=1}
   else{const m='Carrying a burning pan is dangerous. You could spill burning oil. Cut off the oxygen where it is.';sc.say(m,'warn');api.nope(m)}
   busy=false;return}
  if(!lit){sc.say('The fire is already out. Light it again to try another way.','');busy=false;return}
  if(k==='fuel'){L.snd.pop&&L.snd.pop();logs=false;scene();await sc.sleep(500);await out();seen.add('f');sc.say('Wood removed: no fuel, so the fire dies.','ok')}
  else if(k==='air'){const j=E('rect',{x:fx-62,y:fy-130,width:124,height:140,rx:14,fill:'#cfe9ff',opacity:.55,stroke:'#5a7fb0','stroke-width':4,style:'transition:y .8s'},gX);j.setAttribute('y',fy-125);await sc.sleep(900);size=.4;await sc.sleep(900);await out();gX.innerHTML='';seen.add('a');sc.say('A jar covers the fire: no oxygen, so the fire dies.','ok')}
  else if(k==='heat'){for(let i=0;i<9;i++){const d=E('text',{x:fx-40+i*10,y:fy-150,'font-size':18,style:'transition:all .8s'},gX);d.textContent='💧';setTimeout(()=>d.setAttribute('y',fy-20),30+i*60)}L.snd.drop&&L.snd.drop();await sc.sleep(1000);await out();seen.add('h');sc.say('Water cools it down: no heat, so the fire dies.','ok')}
  tri();if(!chal&&seen.size>=3){api.award('did');api.ready()}busy=false};
 sc.relight=()=>{if(busy)return;lit=true;logs=true;size=1;gX.innerHTML='';scene();sc.say('Fire lit again. Try another way to put it out.')};
 const defs=chal?[['water','Water',g=>{T(g,0,8,'🪣',{'font-size':30,class:''})}],['lid','Pan lid',g=>{E('ellipse',{cx:0,cy:4,rx:20,ry:8,fill:'#8a97a8',stroke:'#1b2a4a','stroke-width':3},g);E('rect',{x:-3,y:-10,width:6,height:10,fill:'#1b2a4a'},g)}],['fan','Fan',g=>{T(g,0,8,'🪭',{'font-size':30,class:''})}],['out','Carry out',g=>{T(g,0,8,'🏃',{'font-size':30,class:''})}]]:[['fuel','Tongs',g=>{T(g,0,8,'🥢',{'font-size':30,class:''})}],['air','Glass jar',g=>{E('rect',{x:-16,y:-14,width:32,height:34,rx:8,fill:'#cfe9ff',opacity:.7,stroke:'#5a7fb0','stroke-width':3},g)}],['heat','Water',g=>{T(g,0,8,'🪣',{'font-size':30,class:''})}]];
 defs.forEach((d,i)=>sc.tool({x:P?60+i*100:(chal?100:110)+i*110,y:P?492:372,label:d[1],ly:34,scale:1,draw:d[2],use:()=>sc.use(d[0])}));
 scene();tri();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px">${chal?'<b>A pan of cooking oil is on fire.</b> Drag the safe tool onto it.':'<b>Put the fire out three different ways.</b> Drag a tool onto the fire.'}</p><div class="row" style="flex-wrap:wrap">${defs.map(d=>`<button data-u="${d[0]}">${d[1]}</button>`).join('')}${chal?'':'<button id="rl">🔥 Light it again</button>'}</div>${chal?'':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Take away fuel, oxygen and heat once each to unlock the next step.</p>'}`;
 api.ctrl.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>sc.use(b.dataset.u));if(!chal)api.ctrl.querySelector('#rl').onclick=()=>sc.relight();
 sc.say(chal?'Think: which one is safe for an oil fire?':'A fire needs three things. Take one away.')},
demo:[[S=>S.use('fuel'),'Take the wood away: no fuel, the fire dies.',900],[S=>S.relight(),'Light it again.',600],[S=>S.use('air'),'Cover it with a jar: no oxygen, the fire dies.',900],[S=>S.relight(),'Light it again.',600],[S=>S.use('heat'),'Pour water: it cools and the fire dies.',900]],
why:['Fire needs <b>three things</b>: fuel (something to burn), oxygen (from air) and enough heat. This is the <span class="word">fire triangle</span>.','Remove any one and the fire goes out. Covering with a lid or blanket removes oxygen. Water removes heat. Clearing away the wood removes fuel.','<b>Water is not safe for every fire</b>: not for oil or petrol fires, and not for electrical fires.','To put out a fire quickly, choose the method that removes the right side of the triangle.'],
check:[{q:'Which is NOT needed for a fire?',options:['Fuel','Oxygen','Heat','Water'],answer:3,why:'Water usually puts fire out. The three needs are fuel, oxygen and heat.',hint:'Look at the triangle.'},
 {q:'A fire blanket puts out a fire by…',options:['Adding fuel','Cutting off oxygen','Adding heat','Making it windy'],answer:1,why:'It covers the fire so air cannot reach it.',hint:'Which side of the triangle does a cover remove?'},
 {q:'Which fire must NOT be put out with water?',options:['Paper','Wood','Burning oil','Dry leaves'],answer:2,why:'Water makes burning oil splash and spread.',hint:'Oil floats on water.'}],
challenge:{text:'A pan of cooking oil is on fire. Choose the <b>safe</b> way to put it out.',win:'Cover with a lid. Without oxygen the fire dies, and you stay safe.'},
real:['Fire extinguishers use foam, powder or CO₂ to cut off oxygen.','Firefighters create a gap in forests to remove the fuel.','A campfire dies down if you stop adding wood.'],
words:{Fuel:'Something that can burn.',Oxygen:'The gas in air that fire needs.','Fire triangle':'Fuel, oxygen and heat together.',Combustion:'Burning.'}
});
