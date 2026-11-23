/* OSH Mystery Lab: a detective game. Earn points in the lab, spend them on tools and safety gear, solve missions. */
(()=>{
const Q=QLab,$=(s,r=document)=>r.querySelector(s);
const GK='qlab2_game';
const gl=()=>{try{return Object.assign({own:['look','water','litmus','acid','coat'],spent:0,cleared:{},name:'',coatCol:'#ffffff',skin:'#f1c27d'},JSON.parse(localStorage.getItem(GK)||'{}'))}catch(e){return{own:['look','water','litmus','acid','coat'],spent:0,cleared:{},name:'',coatCol:'#ffffff',skin:'#f1c27d'}}};
const gs=g=>{try{localStorage.setItem(GK,JSON.stringify(g))}catch(e){}};
const wallet=()=>Q.total()-gl().spent;
// ---- tools: id, icon, name, cost, what it does
const TOOLS=[
 ['look','👀','Look closely',0,'See colour and shape. Never taste or sniff unknown chemicals!'],
 ['water','💧','Add to water',0,'Does it dissolve in water?'],
 ['litmus','🟥','Litmus paper',0,'Red = acid. Blue = base (alkali). No change = neutral.'],
 ['acid','🧪','Drop of dilute acid',0,'Does it fizz? Fizzing means a gas is released.'],
 ['magnet','🧲','Magnet',40,'Only a few metals, like iron, are attracted.'],
 ['cond','💡','Conductivity tester',60,'Does the bulb glow? Metals and dissolved salts or acids conduct electricity.'],
 ['ui','🌈','Universal indicator',80,'Gives a pH number: 0 acid, 7 neutral, 14 strong base.'],
 ['lime','🫗','Limewater test',70,'Turns milky if the gas is carbon dioxide.'],
 ['flame','🔥','Flame test',150,'Metal ions colour a flame. Needs goggles and gloves!']];
const GEAR=[
 ['coat','🥼','Lab coat',0,'A lab coat protects your skin and clothes from spills.'],
 ['goggles','🥽','Safety goggles',20,'Goggles protect your eyes from splashes and sparks.'],
 ['gloves','🧤','Gloves',20,'Gloves protect your hands from chemicals and heat.'],
 ['hair','🎀','Hair tied back',10,'Long hair near a flame can catch fire. Tie it back.'],
 ['shoes','👟','Closed shoes',10,'Never wear sandals in a lab. A dropped chemical or glass can hurt your feet.']];
const COATS=['#ffffff','#bfe3ff','#ffd9a0','#d4f5d0','#f3c6ff'];
// ---- substances (values are real chemistry for the school level)
const S={
 lemon:{n:'Lemon juice',look:'a pale yellow liquid',water:'mixes completely',litmus:'blue litmus turns RED: an acid',ui:2,acid:'nothing happens',lime:'no gas, so nothing to test',magnet:'not attracted',cond:'the bulb glows dimly',flame:'no special colour'},
 water:{n:'Distilled water',look:'a clear, colourless liquid',water:'mixes completely',litmus:'no change: neutral',ui:7,acid:'nothing happens',lime:'no gas, so nothing to test',magnet:'not attracted',cond:'the bulb stays off',flame:'no special colour'},
 bsoda:{n:'Baking soda solution',look:'a clear liquid',water:'already dissolved',litmus:'red litmus turns BLUE: a base',ui:8.3,acid:'fizzes: a gas is released',lime:'limewater turns MILKY: carbon dioxide',magnet:'not attracted',cond:'the bulb glows',flame:'bright yellow flame (sodium)'},
 soap:{n:'Soap solution',look:'a slightly cloudy, slippery liquid',water:'mixes completely',litmus:'red litmus turns BLUE: a base',ui:9.5,acid:'nothing happens',lime:'no gas, so nothing to test',magnet:'not attracted',cond:'the bulb glows dimly',flame:'no special colour'},
 wsoda:{n:'Washing soda solution',look:'a clear liquid',water:'already dissolved',litmus:'red litmus turns BLUE: a base',ui:11.5,acid:'fizzes: a gas is released',lime:'limewater turns MILKY: carbon dioxide',magnet:'not attracted',cond:'the bulb glows',flame:'bright yellow flame (sodium)'},
 salt:{n:'Common salt',look:'small white crystals',water:'dissolves',litmus:'no change: neutral',ui:7,acid:'nothing happens',lime:'no gas, so nothing to test',magnet:'not attracted',cond:'the solution makes the bulb glow brightly',flame:'bright yellow flame (sodium)'},
 sugar:{n:'Sugar',look:'small white crystals',water:'dissolves',litmus:'no change: neutral',ui:7,acid:'nothing happens',lime:'no gas, so nothing to test',magnet:'not attracted',cond:'the solution does NOT make the bulb glow',flame:'it melts and browns, no metal colour'},
 chalk:{n:'Chalk powder',look:'a white powder',water:'does NOT dissolve; it sinks',litmus:'no change (it did not dissolve)',ui:7,acid:'fizzes: a gas is released',lime:'limewater turns MILKY: carbon dioxide',magnet:'not attracted',cond:'the bulb stays off',flame:'brick-red flame (calcium)'},
 bsodap:{n:'Baking soda',look:'a white powder',water:'dissolves',litmus:'red litmus turns BLUE: a base',ui:8.3,acid:'fizzes: a gas is released',lime:'limewater turns MILKY: carbon dioxide',magnet:'not attracted',cond:'the solution makes the bulb glow',flame:'bright yellow flame (sodium)'},
 wsodap:{n:'Washing soda',look:'a white powder',water:'dissolves',litmus:'red litmus turns BLUE: a base',ui:11.5,acid:'fizzes: a gas is released',lime:'limewater turns MILKY: carbon dioxide',magnet:'not attracted',cond:'the solution makes the bulb glow',flame:'bright yellow flame (sodium)'},
 iron:{n:'Iron filings',look:'dark grey metal filings',water:'do NOT dissolve; they sink',litmus:'no change (no solution)',ui:7,acid:'a slow fizz: hydrogen gas',lime:'limewater stays clear: not carbon dioxide',magnet:'ATTRACTED to the magnet',cond:'the bulb glows (metals conduct)',flame:'tiny sparks, no steady colour'},
 copper:{n:'Copper turnings',look:'reddish-brown metal curls',water:'do NOT dissolve',litmus:'no change (no solution)',ui:7,acid:'nothing happens: copper is below hydrogen',lime:'no gas, so nothing to test',magnet:'not attracted',cond:'the bulb glows (metals conduct)',flame:'green-blue flame'},
 mg:{n:'Magnesium ribbon',look:'a shiny silvery-white ribbon',water:'does NOT dissolve',litmus:'no change (no solution)',ui:7,acid:'a very fast fizz: hydrogen gas',lime:'limewater stays clear: not carbon dioxide',magnet:'not attracted',cond:'the bulb glows (metals conduct)',flame:'burns with a dazzling white light'},
 kcl:{n:'Potassium chloride',look:'small white crystals',water:'dissolves',litmus:'no change: neutral',ui:7,acid:'nothing happens',lime:'no gas, so nothing to test',magnet:'not attracted',cond:'the solution makes the bulb glow',flame:'lilac (pale purple) flame (potassium)'},
 cacl:{n:'Calcium chloride',look:'small white lumps',water:'dissolves',litmus:'no change: neutral',ui:7,acid:'nothing happens',lime:'no gas, so nothing to test',magnet:'not attracted',cond:'the solution makes the bulb glow',flame:'brick-red flame (calcium)'},
 cuso4:{n:'Copper sulphate',look:'bright blue crystals',water:'dissolves to a blue solution',litmus:'blue litmus turns RED: an acid',ui:4,acid:'nothing happens',lime:'no gas, so nothing to test',magnet:'not attracted',cond:'the solution makes the bulb glow',flame:'green-blue flame (copper)'}};
// ---- missions
const M=[
 {id:'L1',t:'Kitchen mystery',story:'Three bottles lost their labels. Which one is the lemon juice?',pick:['lemon','soap','water'],ans:'lemon',tests:4,reward:15},
 {id:'L2',t:'White powders',story:'Four white powders look the same. Find the SUGAR. (Never taste lab chemicals: use tests.)',pick:['salt','sugar','chalk','bsodap'],ans:'sugar',tests:5,reward:20},
 {id:'L3',t:'Metal detective',story:'A box holds shiny metal. It fizzes slowly with acid and sticks to a magnet. What is it?',pick:['iron','copper','mg'],ans:'iron',tests:4,reward:20},
 {id:'L4',t:'How basic is it?',story:'Five clear liquids. Find the WASHING SODA solution. Colours of litmus are not enough!',pick:['lemon','water','bsoda','soap','wsoda'],ans:'wsoda',tests:5,reward:30},
 {id:'L5',t:'Gas detective',story:'Three white powders. All three might fizz. Find the BAKING SODA.',pick:['bsodap','wsodap','chalk'],ans:'bsodap',tests:5,reward:30},
 {id:'L6',t:'Flame secret',story:'Four crystals. Wear your safety gear! Find the POTASSIUM CHLORIDE.',pick:['salt','kcl','cacl','cuso4'],ans:'kcl',tests:4,reward:40,need:['goggles','gloves','hair']},
 {id:'L7',t:'Grand mystery',story:'Six samples, only 4 tests. Choose your tests wisely. Find the MAGNESIUM.',pick:['mg','iron','copper','chalk','sugar','salt'],ans:'mg',tests:2,reward:60,need:['goggles','gloves']}];
const result=(tool,id)=>{const s=S[id];return({look:()=>'It looks like '+s.look+'.',water:()=>'In water: '+s.water+'.',litmus:()=>'Litmus: '+s.litmus+'.',acid:()=>'Drop of acid: '+s.acid+'.',magnet:()=>'Magnet: '+s.magnet+'.',cond:()=>'Tester: '+s.cond+'.',ui:()=>'Universal indicator shows pH '+s.ui+'.',lime:()=>'Limewater test: '+s.lime+'.',flame:()=>'Flame test: '+s.flame+'.'})[tool]()};
const FREE=['look','water','litmus','acid'];
function who(g,big){const sk=g.skin,co=g.coatCol,own=x=>g.own.includes(x);
 return `<svg viewBox="0 0 200 260" ${big?'':'width="90" height="117"'} role="img" aria-label="Your scientist"><rect x="70" y="120" width="60" height="85" rx="10" fill="${co}" stroke="#1b2a4a" stroke-width="3"/><rect x="38" y="125" width="28" height="12" rx="6" fill="${co}" stroke="#1b2a4a" stroke-width="3"/><rect x="134" y="125" width="28" height="12" rx="6" fill="${co}" stroke="#1b2a4a" stroke-width="3"/><circle cx="36" cy="131" r="9" fill="${own('gloves')?'#2aa5d8':sk}" stroke="#1b2a4a" stroke-width="2"/><circle cx="164" cy="131" r="9" fill="${own('gloves')?'#2aa5d8':sk}" stroke="#1b2a4a" stroke-width="2"/><rect x="78" y="205" width="16" height="30" fill="#1b2a4a"/><rect x="106" y="205" width="16" height="30" fill="#1b2a4a"/><rect x="72" y="233" width="26" height="14" rx="6" fill="${own('shoes')?'#2d6a4f':'#888'}"/><rect x="102" y="233" width="26" height="14" rx="6" fill="${own('shoes')?'#2d6a4f':'#888'}"/>
 <circle cx="100" cy="80" r="42" fill="${sk}" stroke="#1b2a4a" stroke-width="3"/><path d="M58 76 Q100 20 142 76 Q130 50 100 48 Q70 50 58 76Z" fill="#3a2a20"/>${own('hair')?'<rect x="92" y="30" width="16" height="12" rx="5" fill="#ff5c8a"/>':''}<circle cx="84" cy="82" r="5" fill="#1b2a4a"/><circle cx="116" cy="82" r="5" fill="#1b2a4a"/><path d="M88 100 Q100 110 112 100" fill="none" stroke="#1b2a4a" stroke-width="3"/>${own('goggles')?'<rect x="68" y="72" width="64" height="22" rx="10" fill="#bfe9ff" fill-opacity=".55" stroke="#1b2a4a" stroke-width="3"/><line x1="100" y1="72" x2="100" y2="94" stroke="#1b2a4a" stroke-width="3"/><line x1="58" y1="82" x2="68" y2="82" stroke="#1b2a4a" stroke-width="4"/><line x1="132" y1="82" x2="142" y2="82" stroke="#1b2a4a" stroke-width="4"/>':''}</svg>`}
Q.who=who;Q.gameWallet=wallet;
function head(g){return `<div class="top"><a class="home" href="#/">← All experiments</a><h1>🎮 Mystery Lab</h1><span class="pts">💰 ${wallet()} to spend</span></div>`}
function tabs(t){return `<div class="chips"><button data-t="m" class="${t==='m'?'on':''}">🕵️ Missions</button><button data-t="s" class="${t==='s'?'on':''}">🛒 Shop</button><button data-t="c" class="${t==='c'?'on':''}">🧑‍🔬 My scientist</button></div>`}
let tab='m';
Q.game=function(){const g=gl(),app=$('#app');
 let body='';
 if(tab==='m'){body=`<p>Solve each mystery like a real scientist: pick tests, read the results, then name the sample. You have a limited number of tests each time. Earn points in the labs to buy better tools.</p>`+M.map((m,i)=>{const done=g.cleared[m.id],open=i===0||g.cleared[M[i-1].id];return `<div class="card mis"><h2>${done?'✅':open?'🔓':'🔒'} Mission ${i+1}: ${m.t}</h2><p>${m.story}</p><small>${m.tests} tests · reward ${m.reward} points${m.need?' · needs: '+m.need.map(x=>GEAR.find(y=>y[0]===x)[2]).join(', '):''}</small><br>${open?`<button class="pri" data-m="${m.id}">${done?'Play again':'Start mission'}</button>`:''}</div>`}).join('')}
 else if(tab==='s'){body=`<p>You have <b>💰 ${wallet()}</b> points to spend. Spending does not reduce your achievements.</p><h2>Tools</h2>`+TOOLS.map(t=>shop(g,t,'tool')).join('')+`<h2>Safety gear</h2>`+GEAR.map(t=>shop(g,t,'gear')).join('')}
 else{body=`<div class="card" style="text-align:center">${who(g,true)}<p><b>${g.name||'Your scientist'}</b></p><input id="gn" class="inp" maxlength="16" placeholder="Name your scientist" value="${(g.name||'').replace(/"/g,'')}"><b>Coat colour</b><div class="row">${COATS.map(c=>`<button data-co="${c}" style="background:${c}">${g.coatCol===c?'✔':'⬤'}</button>`).join('')}</div><p class="lockhint">Buy gear in the Shop. Real scientists always wear safety gear.</p></div>`}
 app.innerHTML=head(g)+tabs(tab)+body;
 app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{tab=b.dataset.t;Q.game()});
 app.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>play(b.dataset.m));
 app.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const g2=gl();const it=[...TOOLS,...GEAR].find(x=>x[0]===b.dataset.buy);if(wallet()<it[3])return;g2.own.push(it[0]);g2.spent+=it[3];gs(g2);Q.achCheck&&Q.achCheck();Q.game()});
 const gn=$('#gn');if(gn)gn.oninput=()=>{const g2=gl();g2.name=gn.value;gs(g2)};
 app.querySelectorAll('[data-co]').forEach(b=>b.onclick=()=>{const g2=gl();g2.coatCol=b.dataset.co;gs(g2);Q.game()})};
function shop(g,t,k){const has=g.own.includes(t[0]);return `<div class="card shop"><span class="sic">${t[1]}</span><div style="flex:1"><b>${t[2]}</b> ${has?'✅ owned':'· '+t[3]+' points'}<br><small>${t[4]}</small></div>${has?'':`<button class="pri" data-buy="${t[0]}" ${wallet()<t[3]?'disabled':''}>Buy</button>`}</div>`}
function play(id){const m=M.find(x=>x.id===id),g=gl(),app=$('#app');
 const miss=(m.need||[]).filter(x=>!g.own.includes(x));
 if(miss.length){app.innerHTML=head(g)+`<div class="card"><h2>🥽 Safety first!</h2><p>This mission uses fire or sparks. Real scientists never start without safety gear. Buy: <b>${miss.map(x=>GEAR.find(y=>y[0]===x)[2]).join(', ')}</b> in the Shop.</p><button class="pri" id="bk">Go to the Shop</button></div>`;$('#bk').onclick=()=>{tab='s';Q.game()};return}
 let left=m.tests,hearts=3,log=[];const order=[...m.pick].sort((a,b)=>(a>b)-(a<b));const sample=m.ans;
 function draw(){app.innerHTML=head(g)+`<div class="card"><h2>${m.t}</h2><p>${m.story}</p><p><b>🧪 Tests left: ${left}</b> · ❤️ ${hearts}</p><div class="row" id="tl">${TOOLS.filter(t=>g.own.includes(t[0])).map(t=>`<button data-u="${t[0]}" ${left<1?'disabled':''}>${t[1]} ${t[2]}</button>`).join('')}</div><p><small>Missing a tool? ${TOOLS.filter(t=>!g.own.includes(t[0])).map(t=>t[1]+' '+t[2]).join(', ')||'You own every tool!'} (Shop)</small></p><div id="lg">${log.map(x=>`<p class="lgl">${x}</p>`).join('')||'<p class="lockhint" style="text-align:left">Choose a tool to test the mystery sample.</p>'}</div></div><div class="card"><h2>What is it?</h2><div class="opts" id="an">${order.map(k=>`<button data-a="${k}">${S[k].n}</button>`).join('')}</div></div><p style="text-align:center"><button id="bk">← Missions</button></p>`;
  app.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{if(left<1)return;left--;log.push(TOOLS.find(t=>t[0]===b.dataset.u)[1]+' '+result(b.dataset.u,sample));draw()});
  app.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{if(b.dataset.a===sample){const g2=gl();const first=!g2.cleared[m.id];g2.cleared[m.id]=1;gs(g2);if(first){Q.award('game:'+m.id+':'+m.reward);Q.pts()}Q.achCheck&&Q.achCheck();app.innerHTML=head(g2)+`<div class="card" style="text-align:center"><h2>🎉 Solved! It was ${S[sample].n}</h2><p>${first?'+'+m.reward+' points!':'Well done again!'}</p><div>${who(g2,false)}</div><button class="pri" id="nx">Next →</button></div>`;$('#nx').onclick=()=>Q.game()}else{hearts--;b.disabled=true;b.classList.add('try');if(hearts<1){app.innerHTML=head(g)+`<div class="card"><h2>😬 Out of tries</h2><p>Real scientists repeat experiments. Check your results and try again.</p><button class="pri" id="rt">Try again</button></div>`;$('#rt').onclick=()=>play(id)}else{log.push('❌ Not '+S[b.dataset.a].n+'. Look at your results again.');draw()}}});
  $('#bk').onclick=()=>Q.game()}
 draw()}
Q.GAME={M,S,TOOLS,GEAR,result};
})();
