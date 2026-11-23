QLab.register({
id:'c10_salts',code:'10-C2',title:'Salt family: make salts from acids and bases',grade:10,subject:'Chemistry',emoji:'🧂',
hook:{title:'Table salt is one of a whole family. Mix any acid with any base and you make a salt.',text:'Choose an acid and a base. See the salt, its formula and whether it is acidic, neutral or basic.'},
prior:'You know neutralisation from the last experiment.',
guess:{q:'Hydrochloric acid and sodium hydroxide make which salt?',options:['Sodium sulphate','Sodium chloride','Potassium chloride','Calcium chloride'],answer:1,hint:'Cl from HCl and Na from NaOH.',after:'Build other salts.'},
build(api){
 const chal=!!api.challenge;
 const AC={HCl:['chloride','Cl',1,1],H2SO4:['sulphate','SO₄',2,1],HNO3:['nitrate','NO₃',1,1],H2CO3:['carbonate','CO₃',2,0]};
 const BA={NaOH:['sodium','Na',1,1],KOH:['potassium','K',1,1],'Ca(OH)2':['calcium','Ca',2,1],NH4OH:['ammonium','NH₄',1,0]};
 let a='HCl',b='NaOH';const seen=new Set();
 api.ctrl.innerHTML=`<b>Acid</b><div class="row" id="ac">${Object.keys(AC).map(k=>`<button data-k="${k}">${k.replace(/(\d)/g,'₂')}</button>`).join('')}</div><b>Base</b><div class="row" id="bs">${Object.keys(BA).map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div><p id="rs" style="font-weight:800"></p>${chal?'<button class="pri" id="ck">Check: I made potassium nitrate</button>':''}`;
 const q=x=>api.ctrl.querySelector(x);
 function salt(){const A=AC[a],B=BA[b];const g=(x,n)=>n>1?(x.length>2||/[A-Z][a-z]?[₄₃]/.test(x)&&x.length>2?`(${x})`:x)+'₂':x;
  const cat=B[2]===2&&A[2]===2?B[1]+A[1]:B[2]===A[2]?B[1]+A[1]:B[2]===2?B[1]+g(A[1],2):g(B[1],2)+A[1];
  const fm=B[2]===A[2]?B[1]+A[1]:B[2]===2?B[1]+(A[1].length>2?'('+A[1]+')':A[1])+'₂':(B[1].length>2?'('+B[1]+')':B[1])+'₂'+A[1];
  const nature=A[3]&&B[3]?'neutral':A[3]&&!B[3]?'acidic':!A[3]&&B[3]?'basic':'depends';
  const msg=fm==='CaCO₃'?'insoluble: it settles as a white solid (chalk, marble)':fm==='CaSO₄'?'only slightly soluble; its solution is neutral':nature==='depends'?'nearly neutral in water':'its solution is '+nature;return{name:B[0]+' '+A[0],fm,nature,msg}}
 function draw(){const s=salt();api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><text x="160" y="110" text-anchor="middle" font-size="26" font-weight="800">${a.replace(/(\d)/g,'₂')}</text><text x="380" y="110" text-anchor="middle" font-size="30">+</text><text x="540" y="110" text-anchor="middle" font-size="26" font-weight="800">${b}</text><text x="380" y="170" text-anchor="middle" font-size="26">↓</text><rect x="180" y="190" width="400" height="80" rx="18" fill="#f1f5ff" stroke="#8aa0c8" stroke-width="3"/><text x="380" y="225" text-anchor="middle" font-size="22" font-weight="900" fill="#4b3fd1">${s.name}</text><text x="380" y="255" text-anchor="middle" font-size="16">${s.fm}</text>`);
  q('#rs').textContent=`${s.name} (${s.fm}): ${s.msg}.`;seen.add(a+b);if(!chal&&seen.size>=5&&new Set([...seen].map(x=>salt.call(0)&&0)).size>=1){api.award('did');api.ready()}}
 q('#ac').querySelectorAll('button').forEach(x=>x.onclick=()=>{a=x.dataset.k;q('#ac').querySelectorAll('button').forEach(y=>y.className=y===x?'pri':'');draw()});
 q('#bs').querySelectorAll('button').forEach(x=>x.onclick=()=>{b=x.dataset.k;q('#bs').querySelectorAll('button').forEach(y=>y.className=y===x?'pri':'');draw()});
 q('#ac button').className='pri';q('#bs button').className='pri';
 if(chal)q('#ck').onclick=()=>a==='HNO3'&&b==='KOH'?api.solved():api.nope('Potassium comes from KOH and nitrate from HNO₃. You chose '+a.replace(/(\d)/g,'₂')+' and '+b+'.');
 draw()},
why:['A <span class="word">salt</span> is made when the hydrogen of an acid is replaced by a metal (or ammonium) from a base.','Name: <b>metal name</b> from the base + <b>anion name</b> from the acid. HCl gives chlorides, H₂SO₄ gives sulphates, HNO₃ gives nitrates, H₂CO₃ gives carbonates.','Strong acid + strong base → <b>neutral</b> salt (NaCl, pH 7). Strong acid + weak base → <b>acidic</b> salt (NH₄Cl). Weak acid + strong base → <b>basic</b> salt (Na₂CO₃).','Salts of the same acid or the same base form a <b>family</b>, for example all chlorides.'],
check:[{q:'H₂SO₄ + 2NaOH → ?',options:['Sodium sulphate + water','Sodium chloride + water','Sodium nitrate + water','Sodium carbonate + water'],answer:0,why:'Sulphate from sulphuric acid, sodium from sodium hydroxide.',hint:'Name from each part.'},
 {q:'NaCl in water is…',options:['Acidic','Basic','Neutral','A metal'],answer:2,why:'Strong acid + strong base.',hint:'pH 7.'},
 {q:'Sodium carbonate in water is…',options:['Acidic','Basic','Neutral','Insoluble'],answer:1,why:'It comes from a weak acid and a strong base.',hint:'Washing soda feels slippery.'}],
challenge:{text:'Make <b>potassium nitrate</b>. Choose the right acid and base, then check.',win:'HNO₃ + KOH → KNO₃ + H₂O.'},
real:['Common salt (NaCl) is food and a preservative.','Washing soda (Na₂CO₃) softens water.','Plaster of Paris and gypsum are calcium sulphate salts.'],
words:{Salt:'Product of an acid and a base.',Neutralisation:'Acid + base reaction.','Strong acid':'Fully ionises in water.','Weak acid':'Only partly ionises.'}
});
