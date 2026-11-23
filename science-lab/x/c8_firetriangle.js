QLab.register({
id:'c8_firetriangle',code:'8-C4',title:'What does fire need?',grade:8,subject:'Chemistry',emoji:'🔥',
hook:{title:'A candle goes out when you cover it with a glass. Why?',text:'Fire needs three things at once. Remove any one and the fire goes out. Switch them on and off to see.'},
prior:'Nothing! You only need to have seen a candle burn.',
guess:{q:'You cover a burning candle with a glass jar. What happens?',options:['It burns brighter','It goes out after some time','Nothing changes','It burns for ever'],answer:1,hint:'Something in the air inside the jar gets used up.',after:'Try it with the switches.'},
build(api){
 const chal=!!api.challenge;let fuel=1,air=1,heat=1,seen=new Set();
 api.ctrl.innerHTML=chal?`<p><b>A pan of cooking oil catches fire on the stove. What do you do?</b></p><div class="row" id="ch" style="flex-wrap:wrap"><button data-a="water">💧 Pour water on it</button><button data-a="lid">🍳 Cover it with a lid</button><button data-a="fan">🌬️ Fan it</button><button data-a="move">🏃 Carry it outside</button></div>`:
 `<div class="row" id="sw"><button data-k="fuel" aria-pressed="true">🪵 Fuel: ON</button><button data-k="air" aria-pressed="true">💨 Oxygen: ON</button><button data-k="heat" aria-pressed="true">🌡️ Heat: ON</button></div><p id="st" style="font-weight:800"></p>`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(out,msg){const on=fuel&&air&&heat&&!out;
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><polygon points="${chal?'':'110,230 250,230 180,100'}" fill="none"/>
  ${chal?`<path d="M290 200 Q300 245 380 245 Q460 245 470 200 Z" fill="#d8dde6" stroke="#1b2a4a" stroke-width="4"/><rect x="300" y="195" width="160" height="10" fill="#f1c84b"/>${out?'':'<text x="380" y="170" text-anchor="middle" font-size="70">🔥</text>'}${msg==='lid'?'<rect x="280" y="170" width="200" height="12" rx="5" fill="#8a97a8" stroke="#1b2a4a" stroke-width="3"/>':''}${msg==='water'?'<text x="380" y="120" text-anchor="middle" font-size="46">💥💦</text>':''}`
  :`<g><polygon points="140,230 340,230 240,70" fill="#fff6d6" stroke="#1b2a4a" stroke-width="4"/><text x="240" y="130" text-anchor="middle" font-size="14" font-weight="800">FIRE</text><text x="150" y="255" font-size="14" font-weight="800" fill="${fuel?'#2f9e5b':'#d9534f'}">Fuel</text><text x="300" y="255" font-size="14" font-weight="800" fill="${air?'#2f9e5b':'#d9534f'}">Oxygen</text><text x="215" y="62" font-size="14" font-weight="800" fill="${heat?'#2f9e5b':'#d9534f'}">Heat</text></g>
  <rect x="470" y="220" width="40" height="70" fill="#f4efe0" stroke="#8a7a50" stroke-width="3" ${fuel?'':'opacity=".25"'}/><text x="490" y="${on?200:205}" text-anchor="middle" font-size="${on?64:36}">${on?'🔥':fuel&&air&&!heat?'🕯️':'💨'}</text>${air?'':'<path d="M440 120 H540 V300" stroke="#8aa0c8" stroke-width="3" fill="none"/>'}`}
  <text x="${chal?380:560}" y="${chal?60:120}" text-anchor="middle" font-size="16" font-weight="800" fill="#1b2a4a">${chal?'Oil fire in a pan':on?'Burning':'Fire is OUT'}</text>`)}
 function upd(){const out=!(fuel&&air&&heat);draw(out);q('#st').textContent=out?'The fire went out because '+[!fuel&&'there is no fuel',!air&&'there is no oxygen',!heat&&'it is too cold (no heat)'].filter(Boolean).join(' and ')+'.':'All three are present, so it burns.';
  if(!fuel)seen.add('f');if(!air)seen.add('a');if(!heat)seen.add('h');if(!chal&&seen.size>=3){api.award('did');api.ready()}}
 if(!chal){q('#sw').querySelectorAll('button').forEach(b=>b.onclick=()=>{const k=b.dataset.k;const v=k==='fuel'?(fuel^=1):k==='air'?(air^=1):(heat^=1);b.setAttribute('aria-pressed',!!v);b.textContent=b.textContent.replace(/ON|OFF/,v?'ON':'OFF');b.className=v?'':'try';upd()});upd()}
 else{draw(false);q('#ch').querySelectorAll('button').forEach(b=>b.onclick=()=>{const a=b.dataset.a;
  if(a==='lid'){draw(true,'lid');api.solved()}
  else if(a==='water'){draw(false,'water');api.nope('Never use water on an oil fire. The burning oil floats and splashes, spreading the fire. Cut off the oxygen instead.')}
  else if(a==='fan')api.nope('Fanning gives the fire more oxygen. It will get bigger!');
  else api.nope('Carrying a burning pan is dangerous. You could spill burning oil. Cut off the oxygen where it is.')})}},
why:['Fire needs <b>three things</b>: fuel (something to burn), oxygen (from air) and enough heat. This is the <span class="word">fire triangle</span>.','Remove any one and the fire goes out. Covering with a lid or blanket removes oxygen. Water removes heat. Clearing away the wood removes fuel.','<b>Water is not safe for every fire</b>: not for oil or petrol fires, and not for electrical fires.','To put out a fire quickly, choose the method that removes the right side of the triangle.'],
check:[{q:'Which is NOT needed for a fire?',options:['Fuel','Oxygen','Heat','Water'],answer:3,why:'Water usually puts fire out. The three needs are fuel, oxygen and heat.',hint:'Look at the triangle.'},
 {q:'A fire blanket puts out a fire by…',options:['Adding fuel','Cutting off oxygen','Adding heat','Making it windy'],answer:1,why:'It covers the fire so air cannot reach it.',hint:'Which side of the triangle does a cover remove?'},
 {q:'Which fire must NOT be put out with water?',options:['Paper','Wood','Burning oil','Dry leaves'],answer:2,why:'Water makes burning oil splash and spread.',hint:'Oil floats on water.'}],
challenge:{text:'A pan of cooking oil is on fire. Choose the <b>safe</b> way to put it out.',win:'Cover with a lid. Without oxygen the fire dies, and you stay safe.'},
real:['Fire extinguishers use foam, powder or CO₂ to cut off oxygen.','Firefighters create a gap in forests to remove the fuel.','A campfire dies down if you stop adding wood.'],
words:{Fuel:'Something that can burn.',Oxygen:'The gas in air that fire needs.','Fire triangle':'Fuel, oxygen and heat together.',Combustion:'Burning.'}
});
