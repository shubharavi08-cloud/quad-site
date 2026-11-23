QLab.register({
id:'c10_ionic',code:'10-C3',title:'Ionic bonds: moving electrons',grade:10,subject:'Chemistry',emoji:'🔗',
hook:{title:'Sodium is a violent metal and chlorine is a poisonous gas. Together they make safe table salt. How?',text:'Atoms can give or take electrons to get full outer shells. Watch the electron move.'},
prior:'You can place electrons in shells (2, 8, 8).',
guess:{q:'When sodium (2,8,1) meets chlorine (2,8,7), what happens?',options:['Both share an electron','Sodium gives its outer electron to chlorine','Chlorine gives an electron to sodium','Nothing'],answer:1,hint:'Sodium has 1 spare electron; chlorine needs 1 more.',after:'Watch the transfer.'},
build(api){
 const chal=!!api.challenge;
 const P={NaCl:{m:'Na',mv:1,n:'Cl',nv:1,mel:[2,8,1],nel:[2,8,7],mc:'+',nc:'−',f:'NaCl'},MgO:{m:'Mg',mv:2,n:'O',nv:2,mel:[2,8,2],nel:[2,6],mc:'2+',nc:'2−',f:'MgO'},CaCl2:{m:'Ca',mv:2,n:'Cl',nv:1,mel:[2,8,8,2],nel:[2,8,7],mc:'2+',nc:'− (two Cl)',f:'CaCl₂'}};
 let k='NaCl',moved=0;const done=new Set();
 api.ctrl.innerHTML=chal?`<p><b>Magnesium (2,8,2) reacts with chlorine (2,8,7). What is the formula?</b></p><div class="row" id="fm">${['MgCl','MgCl₂','Mg₂Cl','Mg₂Cl₂'].map(x=>`<button data-a="${x}">${x}</button>`).join('')}</div>`:`<div class="row" id="pp">${Object.keys(P).map(x=>`<button data-k="${x}">${P[x].f}</button>`).join('')}</div><button class="pri" id="mv">➡️ Transfer an electron</button> <button id="rs">↺ Again</button><p id="st" style="font-weight:800"></p>`;
 const q=x=>api.ctrl.querySelector(x);
 function atom(cx,cy,el,sym,extra,col){let o='';el.forEach((c,i)=>{const R=36+i*26;o+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#cfdcee"/>`;for(let j=0;j<c;j++){const a=j/c*6.28+i;o+=`<circle cx="${cx+R*Math.cos(a)}" cy="${cy+R*Math.sin(a)}" r="6" fill="${col}"/>`}});return o+`<text x="${cx}" y="${cy+7}" text-anchor="middle" font-size="22" font-weight="900">${sym}${extra}</text>`}
 function draw(){const d=P[k],mel=[...d.mel];mel[mel.length-1]-=moved;const nel=[...d.nel];nel[nel.length-1]+=moved;if(mel[mel.length-1]===0)mel.pop();
  const full=moved>=d.mv;api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/>${atom(220,150,mel,d.m,full?d.mc:'','#2aa5d8')}${atom(540,150,nel,d.n,full?'⁻':'','#e5534b')}${full?'<text x="380" y="150" text-anchor="middle" font-size="40">⚡</text>':'<text x="380" y="150" text-anchor="middle" font-size="44">→</text>'}<text x="380" y="270" text-anchor="middle" font-size="24" font-weight="800">${full?d.f+' : ionic compound':moved+' of '+d.mv+' electrons moved'}</text>`);
  if(q('#st'))q('#st').textContent=full?`${d.m} became ${d.m}${d.mc} (lost ${d.mv}), ${d.n} became ${d.n}⁻ . Opposite charges attract: an <b>ionic bond</b>.`.replace(/<[^>]+>/g,''):'Click to move an outer electron.';if(full){done.add(k);if(!chal&&done.size>=3){api.award('did');api.ready()}}}
 if(!chal){q('#pp').querySelectorAll('button').forEach(b=>b.onclick=()=>{k=b.dataset.k;moved=0;q('#pp').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});q('#pp button').className='pri';
  q('#mv').onclick=()=>{if(moved<P[k].mv)moved++;draw()};q('#rs').onclick=()=>{moved=0;draw()}}
 else q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='MgCl₂'?api.solved():api.nope('Mg loses 2 electrons. Each Cl gains only 1. So how many Cl are needed?'));
 draw()},
why:['An <span class="word">ionic bond</span> forms when a metal atom <b>gives</b> electrons to a non-metal atom.','The metal becomes a <b>positive ion</b> (Na⁺) and the non-metal a <b>negative ion</b> (Cl⁻). Opposite charges attract strongly.','Both ions end up with a full outer shell, which makes them stable.','Total charge must balance: Mg²⁺ needs two Cl⁻, so the formula is MgCl₂.'],
check:[{q:'Sodium becomes Na⁺ by…',options:['Gaining an electron','Losing an electron','Gaining a proton','Losing a neutron'],answer:1,why:'It loses its outer electron.',hint:'Positive ion.'},
 {q:'What holds Na⁺ and Cl⁻ together?',options:['Shared electrons','Attraction of opposite charges','Gravity','Magnetism'],answer:1,why:'That is the ionic bond.',hint:'Opposite charges.'},
 {q:'Why does calcium chloride have two chlorine atoms?',options:['Ca gives 2 electrons and each Cl takes 1','Cl is bigger','A mistake','Ca takes 2'],answer:0,why:'Charges must balance: Ca²⁺ and 2 Cl⁻.',hint:'Count electrons.'}],
challenge:{text:'Magnesium (2,8,2) reacts with chlorine (2,8,7). What is the <b>formula</b> of the compound?',win:'MgCl₂: one Mg²⁺ and two Cl⁻.'},
real:['Table salt (NaCl) is an ionic compound.','Ionic compounds are hard, brittle and have high melting points.','They conduct electricity when molten or dissolved, not as solids.'],
words:{Ion:'A charged atom.','Ionic bond':'Attraction between positive and negative ions.',Cation:'Positive ion.',Anion:'Negative ion.'}
});
