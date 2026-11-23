QLab.register({
id:'c9_isotopes',code:'9-C2',title:'Isotopes: same element, different mass',grade:9,subject:'Chemistry',emoji:'🧬',
hook:{title:'Chlorine has a mass of 35.5. But you cannot have half a neutron. How?',text:'Atoms of the same element can have different numbers of neutrons. They are called isotopes.'},
prior:'You built atoms in the last experiment.',
guess:{q:'Two atoms of carbon have different masses. What must differ?',options:['Protons','Electrons','Neutrons','Atomic number'],answer:2,hint:'Atomic number (protons) is fixed for an element.',after:'Explore the isotopes.'},
build(api){
 const chal=!!api.challenge;
 const D={Hydrogen:{z:1,iso:[[1,99.98,'protium'],[2,0.02,'deuterium'],[3,0,'tritium (radioactive)']]},Carbon:{z:6,iso:[[12,98.9,''],[13,1.1,''],[14,0,'carbon-14 (radioactive, used for dating)']]},Chlorine:{z:17,iso:[[35,75,''],[37,25,'']]}};
 let el='Hydrogen',seen=new Set();
 api.ctrl.innerHTML=`<div class="row" id="el">${Object.keys(D).map(k=>`<button data-e="${k}">${k}</button>`).join('')}</div><p id="ex" style="font-size:14px"></p>${chal?'<p><b>Average atomic mass of chlorine (75% Cl-35, 25% Cl-37) =</b></p><div class="row" id="av">'+['35','35.5','36','37'].map(x=>`<button data-v="${x}">${x}</button>`).join('')+'</div>':''}`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(){const d=D[el];let g='';d.iso.forEach((s,i)=>{const x=80+i*210;const n=s[0]-d.z;g+=`<g><circle cx="${x+60}" cy="130" r="46" fill="#fff" stroke="#8aa0c8" stroke-width="2"/>${[...Array(d.z)].map((_,k)=>`<circle cx="${x+60+Math.cos(k*2.4)*Math.sqrt(k)*5}" cy="${130+Math.sin(k*2.4)*Math.sqrt(k)*5}" r="4.5" fill="#e5534b"/>`).join('')}${[...Array(n)].map((_,k)=>`<circle cx="${x+60+Math.cos(k*2.4+1)*Math.sqrt(k+d.z)*5}" cy="${130+Math.sin(k*2.4+1)*Math.sqrt(k+d.z)*5}" r="4.5" fill="#9aa4ad"/>`).join('')}<text x="${x+60}" y="210" text-anchor="middle" font-size="18" font-weight="900">${s[0]}${el[0]}${el==='Chlorine'?'l':''}</text><text x="${x+60}" y="232" text-anchor="middle" font-size="12">${d.z} protons, ${n} neutrons</text><text x="${x+60}" y="250" text-anchor="middle" font-size="12" fill="#4b3fd1">${s[1]?s[1]+'% of atoms':'traces'}</text></g>`});
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><text x="380" y="30" text-anchor="middle" font-size="18" font-weight="800">${el}: all have ${d.z} proton${d.z>1?'s':''}</text>${g}`);
  q('#ex').textContent=d.iso.map(s=>s[2]).filter(Boolean).join(' · ')||'';seen.add(el);if(!chal&&seen.size>=3){api.award('did');api.ready()}}
 q('#el').querySelectorAll('button').forEach(b=>b.onclick=()=>{el=b.dataset.e;q('#el').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});
 if(chal){el='Chlorine';draw();q('#av').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.v==='35.5'?api.solved():api.nope('Average = (35 × 75 + 37 × 25) ÷ 100. Work it out.'))}else{q('#el button').className='pri';draw()}},
why:['<span class="word">Isotopes</span> are atoms of the <b>same element</b> (same protons) with <b>different numbers of neutrons</b>.','They behave the same in chemical reactions but have different masses. Hydrogen has 0, 1 or 2 neutrons.','Elements usually have several isotopes mixed in nature. The listed atomic mass is the <b>average</b> weighted by how common each is.','For chlorine: (35 × 75 + 37 × 25) ÷ 100 = 35.5.'],
check:[{q:'Isotopes of an element have the same…',options:['Mass number','Number of neutrons','Number of protons','All three'],answer:2,why:'Same protons, different neutrons.',hint:'The atomic number is fixed.'},
 {q:'Carbon-14 has 8 neutrons. How many protons?',options:['6','8','14','12'],answer:0,why:'Carbon always has 6 protons, so 14 − 6 = 8 neutrons.',hint:'Carbon is atomic number 6.'},
 {q:'Why is chlorine\'s mass 35.5?',options:['It has half a neutron','It is an average of two isotopes','It is a typing error','It gained an electron'],answer:1,why:'About 75% are Cl-35 and 25% are Cl-37.',hint:'Weighted average.'}],
challenge:{text:'Chlorine is 75% Cl-35 and 25% Cl-37. What is its <b>average atomic mass</b>?',win:'(35 × 0.75) + (37 × 0.25) = 35.5.'},
real:['Carbon-14 dating finds the age of old bones and wood.','Medical scanners use radioactive isotopes.','Uranium isotopes are used in nuclear power.'],
words:{Isotope:'Atoms of one element with different neutron numbers.','Atomic mass':'Average mass of an element\'s atoms.',Radioactive:'Gives out radiation as the nucleus changes.',Abundance:'How common each isotope is.'}
});
