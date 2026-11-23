QLab.register({
id:'c9_mole',code:'9-C3',title:'The mole counter: counting atoms by weighing',grade:9,subject:'Chemistry',emoji:'🔢',
hook:{title:'You cannot count atoms one by one. So how do chemists count them?',text:'They weigh. One mole of any substance has the same huge number of particles.'},
prior:'Know that atoms have different masses.',
guess:{q:'1 mole of carbon (12 g) and 1 mole of copper (63.5 g) contain…',options:['More atoms in copper','More atoms in carbon','The same number of atoms','No atoms'],answer:2,hint:'The mole is a counting number, like a dozen.',after:'Weigh some substances.'},
build(api){
 const chal=!!api.challenge;
 const S={'Water H₂O':18,'Carbon C':12,'Common salt NaCl':58.5,'Carbon dioxide CO₂':44,'Copper Cu':63.5};
 let s='Water H₂O',g=18;const seen=new Set();
 api.ctrl.innerHTML=chal?`<p><b>How many moles are in 36 g of water (molar mass 18 g/mol)?</b></p><div class="row" id="cc">${['0.5','1','2','18'].map(x=>`<button data-a="${x}">${x} mol</button>`).join('')}</div>`:`<div class="row" id="sb" style="flex-wrap:wrap">${Object.keys(S).map(k=>`<button data-s="${k}">${k}</button>`).join('')}</div><label for="gg">Mass: <span id="gv"></span> g</label><input id="gg" type="range" min="0" max="200" step="0.5" value="18"><p>Moles = mass ÷ molar mass = <span class="read" id="mo"></span></p><p>Particles = <b id="pa"></b></p>`;
 const q=s2=>api.ctrl.querySelector(s2);
 function draw(){const M=S[s],n=g/M;
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><rect x="200" y="200" width="360" height="26" rx="6" fill="#8a97a8"/><rect x="${380-Math.min(120,g*.7)/2}" y="${200-Math.min(120,g*.7)}" width="${Math.min(120,g*.7)}" height="${Math.min(120,g*.7)}" rx="10" fill="#cde9f9" stroke="#1b2a4a" stroke-width="3"/><text x="380" y="${200-Math.min(120,g*.7)/2+6}" text-anchor="middle" font-size="16" font-weight="800">${chal?'water':s.split(' ')[0]}</text><text x="380" y="250" text-anchor="middle" font-size="22" font-weight="900" fill="#4b3fd1">${chal?'36 g':g+' g'}</text><text x="380" y="40" text-anchor="middle" font-size="14" font-weight="800">molar mass: ${chal?18:M} g/mol</text>`);
  if(!chal){q('#gv').textContent=g;q('#mo').textContent=n.toFixed(2)+' mol';q('#pa').textContent=(n*6.022).toFixed(2)+' × 10²³';if(Math.abs(n-1)<.01)seen.add(s);if(seen.size>=3){api.award('did');api.ready()}}}
 if(!chal){q('#sb').querySelectorAll('button').forEach(b=>b.onclick=()=>{s=b.dataset.s;g=S[s];q('#gg').value=g;q('#sb').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});q('#sb button').className='pri';q('#gg').oninput=e=>{g=+e.target.value;draw()}}
 else q('#cc').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='2'?api.solved():api.nope('Moles = mass ÷ molar mass = 36 ÷ 18.'));
 draw()},
why:['A <span class="word">mole</span> is a counting unit, like a dozen. <b>1 mole = 6.022 × 10²³ particles</b> (Avogadro\'s number).','The mass of one mole in grams equals the atomic or molecular mass. Carbon: 12 g. Water: 18 g. Salt: 58.5 g.','<b>Moles = mass ÷ molar mass.</b> Weigh a sample, divide, and you know how many particles you have.','That is how chemists measure out exact numbers of atoms with an ordinary balance.'],
check:[{q:'How many particles are in 1 mole?',options:['6.022 × 10²³','100','1000','12'],answer:0,why:'Avogadro\'s number.',hint:'A very huge number.'},
 {q:'How many moles in 44 g of CO₂ (44 g/mol)?',options:['0.5','1','2','44'],answer:1,why:'44 ÷ 44 = 1 mole.',hint:'Divide mass by molar mass.'},
 {q:'1 mole of copper and 1 mole of carbon have…',options:['Different numbers of atoms','The same number of atoms','Equal mass','No atoms'],answer:1,why:'A mole always has the same number of particles.',hint:'Think of a dozen eggs and a dozen mangoes.'}],
challenge:{text:'How many <b>moles</b> are in <b>36 g of water</b> (molar mass 18 g/mol)?',win:'36 ÷ 18 = 2 moles.'},
real:['Medicine doses and fertiliser amounts are calculated in moles.','Factories use moles to avoid wasting chemicals.','The mole links the tiny world of atoms to everyday grams.'],
words:{Mole:'6.022 × 10²³ particles.','Molar mass':'Mass of one mole, in grams.','Avogadro number':'6.022 × 10²³ per mole.',Particle:'An atom, molecule or ion.'}
});
