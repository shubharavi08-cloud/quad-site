QLab.register({
id:'c10_molecule',code:'10-C4',title:'Molecule builder: covalent bonds',grade:10,subject:'Chemistry',emoji:'🧩',
hook:{title:'Water, methane, carbon dioxide: no metals, no charges. How do their atoms hold together?',text:'Non-metal atoms can share electrons. Build molecules by giving each atom the bonds it needs.'},
prior:'You know ionic bonds move electrons.',
guess:{q:'In a covalent bond, the atoms…',options:['Give electrons away completely','Share electrons','Swap protons','Lose neutrons'],answer:1,hint:'Non-metals with non-metals.',after:'Build some molecules.'},
build(api){
 const chal=!!api.challenge;
 const M={H2O:{n:'Water',c:'O',h:2,b:1,f:'H₂O'},CH4:{n:'Methane',c:'C',h:4,b:1,f:'CH₄'},NH3:{n:'Ammonia',c:'N',h:3,b:1,f:'NH₃'},HCl:{n:'Hydrogen chloride',c:'Cl',h:1,b:1,f:'HCl'}};
 const V={C:4,N:3,O:2,Cl:1,H:1};
 let k='H2O',hs=0;const done=new Set();
 api.ctrl.innerHTML=chal?`<p><b>How many hydrogen atoms bond to one nitrogen atom? (N needs 3 more electrons)</b></p><div class="row" id="fm">${[1,2,3,4].map(x=>`<button data-a="${x}">${x}</button>`).join('')}</div>`:`<div class="row" id="pp">${Object.keys(M).map(x=>`<button data-k="${x}">${M[x].f}</button>`).join('')}</div><button class="pri" id="add">➕ Add a hydrogen</button> <button id="rs">↺ Again</button><p id="st" style="font-weight:800"></p>`;
 const q=x=>api.ctrl.querySelector(x);
 function draw(){const d=M[k],cx=380,cy=150;let o='';
  for(let i=0;i<hs;i++){const a=i/d.h*6.28-1.57;const x=cx+95*Math.cos(a),y=cy+95*Math.sin(a);o+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#4b3fd1" stroke-width="5"/><circle cx="${x}" cy="${y}" r="20" fill="#ffb347" stroke="#333"/><text x="${x}" y="${y+5}" text-anchor="middle" font-weight="900">H</text>`}
  o+=`<circle cx="${cx}" cy="${cy}" r="30" fill="#2aa5d8" stroke="#333"/><text x="${cx}" y="${cy+6}" text-anchor="middle" font-weight="900" font-size="18">${d.c}</text>`;
  const full=hs>=d.h;api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/>${o}<text x="380" y="285" text-anchor="middle" font-size="18" font-weight="800">${full?d.n+' '+d.f+' is complete':hs+' of '+d.h+' hydrogens'}</text>`);
  if(q('#st'))q('#st').textContent=full?`${d.c} needs ${V[d.c]} bond${V[d.c]>1?'s':''}: each line is one shared pair of electrons.`:'Add hydrogens until the central atom is full.';
  if(full&&!chal){done.add(k);if(done.size>=4){api.award('did');api.ready()}}}
 if(!chal){q('#pp').querySelectorAll('button').forEach(b=>b.onclick=()=>{k=b.dataset.k;hs=0;q('#pp').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});q('#pp button').className='pri';
  q('#add').onclick=()=>{if(hs<M[k].h)hs++;draw()};q('#rs').onclick=()=>{hs=0;draw()}}
 else q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='3'?api.solved():api.nope('Nitrogen needs 3 more electrons, and each hydrogen shares 1.'));
 draw()},
why:['A <span class="word">covalent bond</span> is a pair of electrons <b>shared</b> between two non-metal atoms.','Each atom shares until its outer shell is full. Carbon needs 4, nitrogen 3, oxygen 2, hydrogen 1.','So carbon bonds to 4 hydrogens (CH₄), nitrogen to 3 (NH₃), oxygen to 2 (H₂O).','Covalent compounds are made of small <b>molecules</b>. They usually have low melting points and do not conduct electricity.'],
check:[{q:'Covalent bonds form between…',options:['Two metals','A metal and non-metal','Two non-metals','Noble gases'],answer:2,why:'Non-metals share electrons.',hint:'No metal needed.'},
 {q:'How many hydrogens bond to carbon in methane?',options:['1','2','3','4'],answer:3,why:'Carbon needs 4 bonds.',hint:'CH?'},
 {q:'Why does oxygen bond to two hydrogens in water?',options:['It needs 2 more electrons','It has 2 protons','It is heavy','It is a gas'],answer:0,why:'It shares 2 electrons.',hint:'Outer shell has 6.'}],
challenge:{text:'How many hydrogen atoms bond to <b>one nitrogen</b>?',win:'Three: NH₃, ammonia.'},
real:['Water, sugar and plastics are all covalent compounds.','Methane is the main gas in cooking gas (LPG is related).','Ammonia is used to make fertilisers.'],
words:{'Covalent bond':'A shared pair of electrons.',Molecule:'A group of atoms bonded together.',Valency:'How many bonds an atom forms.',Shell:'Energy level of electrons.'}
});
