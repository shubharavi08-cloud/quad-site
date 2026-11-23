QLab.register({
id:'c8_metalreact',code:'8-C3',title:'Metals in air and water: who is most reactive?',grade:8,subject:'Chemistry',emoji:'⚗️',
hook:{title:'Gold stays shiny for ever. Iron rusts. Sodium must be kept in oil. Why?',text:'Metals differ in how eagerly they react. This is a virtual lab, because some of these metals are far too dangerous to try at home.'},
prior:'Know that iron rusts.',
guess:{q:'Which metal reacts the most with air and water?',options:['Gold','Copper','Iron','Sodium'],answer:3,hint:'It is stored under oil to keep it away from air and water.',after:'Test five metals.'},
build(api){
 const chal=!!api.challenge;
 const MET=[['Sodium','Na','#c9d1d9'],['Magnesium','Mg','#dfe4ea'],['Iron','Fe','#9aa4ad'],['Copper','Cu','#d98a4b'],['Gold','Au','#f2c230']];
 const AIR={Sodium:'Tarnishes within seconds. Must be kept in oil.',Magnesium:'Burns with a dazzling white flame and leaves white ash (magnesium oxide).',Iron:'Slowly rusts in moist air. Needs days.',Copper:'Slowly turns dull, then green, over months.',Gold:'No change at all.'};
 const WAT={Sodium:'Fizzes wildly, darts about, can catch fire. VERY violent.',Magnesium:'Almost nothing in cold water. Bubbles slowly in hot water.',Iron:'No reaction in cold water.',Copper:'No reaction.',Gold:'No reaction.'};
 let m=null,test=null;const done={};let order=[];
 api.ctrl.innerHTML=`<b>Metal</b><div class="row" id="mm" style="flex-wrap:wrap">${MET.map((x,i)=>`<button data-i="${i}">${x[0]}</button>`).join('')}</div><b>Test</b><div class="row" id="tt"><button data-t="air">🔥 Heat in air</button><button data-t="wat">💧 Drop in cold water</button></div><button class="pri" id="go">▶ Run the test</button><p id="res" style="font-weight:800"></p><p style="font-size:13px;color:#55688a">⚠️ Virtual only. Never try sodium or magnesium at home.</p>${chal?'<p><b>Click the metals from MOST to LEAST reactive:</b></p><div class="row" id="rk" style="flex-wrap:wrap">'+MET.map((x,i)=>`<button data-r="${x[0]}">${x[0]}</button>`).join('')+'</div><p id="ro"></p>':''}`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(res){const c=m!==null?MET[m]:null;
  const wild=res&&((test==='air'&&c[0]==='Magnesium')||(test==='wat'&&c[0]==='Sodium')||(test==='air'&&c[0]==='Sodium'));
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/>
  ${test==='wat'?'<path d="M240 120 V250 Q240 265 255 265 H505 Q520 265 520 250 V120" fill="none" stroke="#1b2a4a" stroke-width="5"/><rect x="243" y="150" width="274" height="113" fill="#cde9f9" opacity=".85"/>':'<rect x="270" y="215" width="220" height="14" fill="#8a7a50"/>'}
  ${c?`<rect x="${test==='wat'?340:330}" y="${test==='wat'?138:190}" width="80" height="24" rx="6" fill="${c[2]}" stroke="#1b2a4a" stroke-width="3"/><text x="${test==='wat'?380:370}" y="${test==='wat'?156:208}" text-anchor="middle" font-size="14" font-weight="800">${c[1]}</text>`:''}
  ${wild?'<text x="380" y="110" text-anchor="middle" font-size="60">'+(test==='air'&&c[0]==='Magnesium'?'✨':'💥')+'</text>':''}
  <text x="380" y="50" text-anchor="middle" font-size="18" font-weight="800">${c?c[0]+' — '+(test==='air'?'in air':test==='wat'?'in water':'choose a test'):'Choose a metal and a test'}</text>`)}
 q('#mm').querySelectorAll('button').forEach(b=>b.onclick=()=>{m=+b.dataset.i;q('#mm').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});
 q('#tt').querySelectorAll('button').forEach(b=>b.onclick=()=>{test=b.dataset.t;q('#tt').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});
 q('#go').onclick=()=>{if(m===null||!test)return api.coach('warn','Choose both','Pick a metal and a test first.');const n=MET[m][0];draw(true);q('#res').textContent=(test==='air'?AIR[n]:WAT[n]);done[n+test]=1;
  if(!chal&&Object.keys(done).length>=8){api.award('did');api.ready()}};
 if(chal){q('#rk').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(order.includes(b.dataset.r))return;order.push(b.dataset.r);b.disabled=true;q('#ro').textContent=order.map((x,i)=>(i+1)+'. '+x).join('  ');
  if(order.length===5){const ok=order.join()===MET.map(x=>x[0]).join();if(ok)api.solved();else{api.nope('Not quite. The most reactive burns or fizzes fastest; the least reactive shows no change. Start again.');order=[];q('#ro').textContent='';q('#rk').querySelectorAll('button').forEach(x=>x.disabled=false)}}})}
 draw()},
why:['Metals differ in how readily they react. This order is the start of the <span class="word">reactivity series</span>.','<b>Sodium</b> reacts violently with water. <b>Magnesium</b> burns brilliantly in air. <b>Iron</b> rusts slowly. <b>Copper</b> tarnishes slowly. <b>Gold</b> hardly reacts at all.','Very reactive metals are stored carefully (sodium under oil). Unreactive metals like gold and platinum stay shiny, which is why they are used in jewellery.','When a metal burns in air it joins with oxygen to make a metal <b>oxide</b>.'],
check:[{q:'Which metal is stored under oil?',options:['Gold','Copper','Sodium','Iron'],answer:2,why:'Sodium reacts with air and water, so oil protects it.',hint:'It was the most violent in water.'},
 {q:'Magnesium burns in air and gives…',options:['A white ash, magnesium oxide','Water','Gold','Smoke only'],answer:0,why:'Magnesium joins with oxygen to make white magnesium oxide.',hint:'You saw the dazzling flame.'},
 {q:'Why is gold used for jewellery that lasts for ever?',options:['It is cheap','It hardly reacts with air or water','It is a gas','It is magnetic'],answer:1,why:'Gold is very unreactive, so it never rusts or tarnishes.',hint:'Gold showed no change.'}],
challenge:{text:'Click the five metals in order from <b>most reactive</b> to <b>least reactive</b>.',win:'Na, Mg, Fe, Cu, Au. You rebuilt the start of the reactivity series.'},
real:['Iron objects are painted or galvanised because iron rusts.','Aluminium foil does not corrode easily because a thin oxide layer protects it.','Gold and silver coins found in old shipwrecks still shine, while iron ones have rusted away.'],
words:{Reactivity:'How eagerly a metal reacts.',Oxide:'A compound of a metal with oxygen.',Tarnish:'A dull layer on a metal surface.','Reactivity series':'Metals listed from most to least reactive.'}
});
