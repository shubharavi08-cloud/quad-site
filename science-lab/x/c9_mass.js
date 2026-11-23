QLab.register({
id:'c9_mass',code:'9-C3',title:'Law of conservation of mass: weigh the reaction',grade:9,subject:'Chemistry',emoji:'⚖️',
hook:{title:'When something burns or fizzes, does matter vanish?',text:'Weigh a reaction before and after. Try it in a sealed flask and in an open one.'},
prior:'Know that baking soda fizzes in vinegar.',
guess:{q:'Baking soda and vinegar are mixed in a SEALED flask on a balance. The total mass will…',options:['Increase','Decrease','Stay the same','Become zero'],answer:2,hint:'Nothing can escape from a sealed flask.',after:'Weigh it.'},
build(api){
 const chal=!!api.challenge;let sealed=true,mixed=false,runs=new Set();const m0=120.0;
 api.ctrl.innerHTML=chal?`<p><b>12 g of carbon burns completely with 32 g of oxygen in a sealed vessel to form carbon dioxide. What is the mass of CO₂?</b></p><div class="row" id="cc" style="flex-wrap:wrap">${['20 g','32 g','44 g','12 g'].map(x=>`<button data-a="${x}">${x}</button>`).join('')}</div>`:`<div class="row" id="fl"><button data-s="1">🔒 Sealed flask</button><button data-s="0">🔓 Open flask</button></div><button class="pri" id="mx">Tip the vinegar into the baking soda</button> <button id="rs">↺ Reset</button><p>Mass: <span class="read" id="ms"></span></p><p id="nt"></p>`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(){const m=mixed?(sealed?m0:m0-1.8):m0;
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/><rect x="250" y="235" width="260" height="30" rx="6" fill="#8a97a8"/><rect x="300" y="262" width="160" height="22" fill="#55688a"/><text x="380" y="256" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">BALANCE</text>
  <path d="M340 100 L350 70 H410 L420 100 L450 230 H310 Z" fill="${mixed?'#d9f0ff':'#fffbe0'}" stroke="#1b2a4a" stroke-width="4"/>${sealed?'<rect x="352" y="56" width="56" height="16" rx="4" fill="#c0392b"/>':''}
  ${mixed&&!sealed?'<text x="380" y="40" text-anchor="middle" font-size="30">💨💨</text>':''}${mixed?[...Array(8)].map((_,k)=>`<circle cx="${345+k*14}" cy="${200-(k*13%40)}" r="4" fill="#fff" stroke="#8ec9ff"/>`).join(''):''}
  <text x="560" y="150" font-size="40" font-weight="900" fill="#4b3fd1">${m.toFixed(1)} g</text><text x="560" y="180" font-size="13">${sealed?'sealed':'open'}</text>`);
  if(!chal){q('#ms').textContent=m.toFixed(1)+' g';q('#nt').textContent=mixed?(sealed?'Same mass. The gas stayed in the flask.':'Lost mass! The CO₂ gas escaped into the air.'):'Before mixing.'}}
 if(!chal){q('#fl').querySelectorAll('button').forEach(b=>b.onclick=()=>{sealed=b.dataset.s==='1';mixed=false;q('#fl').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});q('#fl button').className='pri';
  q('#mx').onclick=()=>{mixed=true;draw();runs.add(sealed?'s':'o');if(runs.size===2){api.award('did');api.ready()}};q('#rs').onclick=()=>{mixed=false;draw()}}
 else q('#cc').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='44 g'?api.solved():api.nope('Mass is conserved: mass of products = mass of reactants. Add 12 g + 32 g.'));
 draw()},
why:['The <span class="word">law of conservation of mass</span>: in a chemical reaction, mass is <b>neither created nor destroyed</b>. Total mass before = total mass after.','In the open flask the mass seemed to drop. But the carbon dioxide gas escaped into the air. If you could weigh it, the total would be the same.','Atoms are only <b>rearranged</b> in a reaction. None disappears.','Example: 12 g carbon + 32 g oxygen → 44 g carbon dioxide.'],
check:[{q:'In a sealed flask, the mass after a reaction is…',options:['Less','More','The same','Zero'],answer:2,why:'Nothing escaped, so the mass is conserved.',hint:'You saw 120.0 g before and after.'},
 {q:'Why did the open flask lose mass?',options:['Matter was destroyed','A gas escaped','The balance broke','Water evaporated only'],answer:1,why:'The carbon dioxide gas left the flask.',hint:'Look at the bubbles.'},
 {q:'10 g of A reacts completely with 6 g of B. Mass of products?',options:['4 g','6 g','10 g','16 g'],answer:3,why:'Total mass is conserved: 10 + 6 = 16 g.',hint:'Add reactants.'}],
challenge:{text:'12 g of carbon burns with 32 g of oxygen in a sealed vessel. What is the <b>mass of carbon dioxide</b> formed?',win:'12 + 32 = 44 g. Mass is conserved.'},
real:['Cooks weigh a closed pan to check for evaporation losses.','A burning candle seems to lose mass, but the gases go into the air.','Chemical equations must balance because atoms are conserved.'],
words:{Reactant:'A substance that reacts.',Product:'A substance that is made.',Conservation:'Staying the same in total.','Sealed system':'Nothing can enter or leave.'}
});
