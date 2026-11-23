QLab.register({
id:'c9_buildatom',code:'9-C2',title:'Build an atom: protons, neutrons, electrons',grade:9,subject:'Chemistry',emoji:'⚛️',
hook:{title:'What makes a gold atom different from an oxygen atom?',text:'Only the number of protons. Build atoms with different numbers and see which element you make.'},
prior:'Know that atoms have a nucleus with electrons around it.',
guess:{q:'What decides which element an atom is?',options:['The number of neutrons','The number of electrons only','The number of protons','The colour of the atom'],answer:2,hint:'The atomic number is the number of protons.',after:'Build some atoms.'},
build(api){
 const chal=!!api.challenge;
 const E=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'];
 const N=['','Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon','Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulphur','Chlorine','Argon','Potassium','Calcium'];
 let p=1,n=0,e=1;const seen=new Set();
 api.ctrl.innerHTML=`<label>Protons: <b id="pv"></b></label><div class="row"><button id="pm">−</button><button id="pp">+</button></div><label>Neutrons: <b id="nv"></b></label><div class="row"><button id="nm">−</button><button id="np">+</button></div><label>Electrons: <b id="ev"></b></label><div class="row"><button id="em">−</button><button id="ep">+</button></div><p id="out" style="font-weight:800"></p>${chal?'<button class="pri" id="ck">Check my atom</button>':''}`;
 const q=s=>api.ctrl.querySelector(s);
 const shells=z=>{const s=[];let r=z;for(const c of [2,8,8,2]){const t=Math.min(c,r);if(t>0)s.push(t);r-=t}return s};
 function draw(){const sh=shells(e),sym=E[p]||'?',charge=p-e,mass=p+n;
  let o='';sh.forEach((c,i)=>{const R=60+i*34;o+=`<circle cx="380" cy="160" r="${R}" fill="none" stroke="#cfdcee" stroke-width="2"/>`;for(let k=0;k<c;k++){const a=k/c*6.283;o+=`<circle cx="${380+R*Math.cos(a)}" cy="${160+R*Math.sin(a)}" r="6" fill="#2aa5d8"/>`}});
  let nuc='';for(let k=0;k<p+n;k++){const a=k*2.4,r=Math.sqrt(k)*5;nuc+=`<circle cx="${380+r*Math.cos(a)}" cy="${160+r*Math.sin(a)}" r="5" fill="${k<p?'#e5534b':'#9aa4ad'}" stroke="#fff"/>`}
  api.stage.innerHTML=QLab.svg(760,320,`<rect width="760" height="320" fill="#fff"/>${o}${nuc}<text x="560" y="90" font-size="14" font-weight="800"><tspan fill="#e5534b">● proton</tspan> <tspan fill="#9aa4ad" dx="10">● neutron</tspan> <tspan fill="#2aa5d8" dx="10">● electron</tspan></text><text x="560" y="150" font-size="44" font-weight="900" fill="#4b3fd1">${sym}</text><text x="560" y="180" font-size="14">${N[p]||''}</text><text x="560" y="206" font-size="13">Atomic no. ${p} · Mass no. ${mass}</text>`);
  q('#pv').textContent=p;q('#nv').textContent=n;q('#ev').textContent=e;
  q('#out').textContent=`${N[p]||'?'}: ${charge===0?'neutral atom':charge>0?'positive ion (+'+charge+')':'negative ion ('+charge+')'} · electrons in shells: ${sh.join(', ')||'none'}`;
  if(!chal&&charge===0){seen.add(p);if(seen.size>=3){api.award('did');api.ready()}}}
 const step=(id,f)=>q('#'+id).onclick=()=>{f();draw()};
 step('pp',()=>p=Math.min(20,p+1));step('pm',()=>p=Math.max(1,p-1));step('np',()=>n=Math.min(25,n+1));step('nm',()=>n=Math.max(0,n-1));step('ep',()=>e=Math.min(21,e+1));step('em',()=>e=Math.max(0,e-1));
 if(chal)q('#ck').onclick=()=>{if(p!==8)return api.nope('Oxygen has 8 protons. You have '+p+' ('+(N[p]||'?')+').');if(e!==8)return api.nope('A neutral atom has equal protons and electrons: 8 electrons.');if(n!==8)return api.nope('Mass number 16 means protons + neutrons = 16, so 8 neutrons.');api.solved()};
 draw()},
why:['The <b>number of protons</b> is the <span class="word">atomic number</span>. It decides the element: 1 is hydrogen, 6 is carbon, 8 is oxygen.','A <b>neutral atom</b> has equal protons and electrons. If it loses or gains electrons it becomes an <b>ion</b>.','<span class="word">Mass number</span> = protons + neutrons. Electrons weigh almost nothing.','Electrons fill shells: 2 in the first, 8 in the second, 8 in the third (up to calcium).'],
check:[{q:'An atom has 6 protons. It is…',options:['Hydrogen','Carbon','Oxygen','Helium'],answer:1,why:'6 protons means carbon.',hint:'Atomic number 6.'},
 {q:'A neutral atom has 11 protons. How many electrons?',options:['0','1','11','22'],answer:2,why:'Neutral means equal protons and electrons.',hint:'Positive and negative charges balance.'},
 {q:'Mass number = ?',options:['Protons','Protons + neutrons','Electrons + protons','Neutrons'],answer:1,why:'Mass number counts the particles in the nucleus.',hint:'Electrons are too light to count.'}],
challenge:{text:'Build a <b>neutral oxygen atom</b> with mass number <b>16</b>.',win:'8 protons, 8 neutrons, 8 electrons: oxygen-16.'},
real:['Atomic numbers are the order of the periodic table.','Sodium becomes Na⁺ by losing one electron, as in table salt.','Isotopes differ only in neutrons.'],
words:{Proton:'Positive particle in the nucleus.',Neutron:'Neutral particle in the nucleus.',Electron:'Negative particle around the nucleus.','Atomic number':'Number of protons.','Mass number':'Protons plus neutrons.',Ion:'An atom that has gained or lost electrons.'}
});
