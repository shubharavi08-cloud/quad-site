QLab.register({
id:'c10_salts',code:'10-C2',title:'Salt family: make salts from acids and bases',grade:10,subject:'Chemistry',emoji:'🧂',
hook:{title:'Table salt is one of a whole family. Mix any acid with any base and you make a salt.',text:'Choose an acid and a base. See the salt, its formula and whether it is acidic, neutral or basic.'},
prior:'You know neutralisation from the last experiment.',
guess:{q:'Hydrochloric acid and sodium hydroxide make which salt?',options:['Sodium sulphate','Sodium chloride','Potassium chloride','Calcium chloride'],answer:1,hint:'Cl from HCl and Na from NaOH.',after:'Build other salts.'},
build(api){
 const chal=!!api.challenge;
 const AC={HCl:['chloride','Cl',1,1],H2SO4:['sulphate','SO₄',2,1],HNO3:['nitrate','NO₃',1,1],H2CO3:['carbonate','CO₃',2,0]};
 const BA={NaOH:['sodium','Na',1,1],KOH:['potassium','K',1,1],'Ca(OH)2':['calcium','Ca',2,1],NH4OH:['ammonium','NH₄',1,0]};
 let a='HCl',b='NaOH',step=0;const seen=new Set();
 const LB={HCl:'HCl',H2SO4:'H₂SO₄',HNO3:'HNO₃',H2CO3:'H₂CO₃',NaOH:'NaOH',KOH:'KOH','Ca(OH)2':'Ca(OH)₂',NH4OH:'NH₄OH'};const lab=k=>LB[k]||k;
 api.ctrl.innerHTML=`<b>1. Choose an acid</b><div class="row" id="ac">${Object.keys(AC).map(k=>`<button data-k="${k}">${lab(k)}</button>`).join('')}</div><b>2. Choose a base</b><div class="row" id="bs">${Object.keys(BA).map(k=>`<button data-k="${k}">${lab(k)}</button>`).join('')}</div><div class="row"><button class="pri" id="mix">🧪 3. Pour and mix</button><button class="pri" id="evap" style="background:#ff9f1c;color:#1b2a4a">🔥 4. Heat to get the salt</button></div><p id="rs" style="font-weight:800"></p>${chal?'<button class="pri" id="ck">Check: I made potassium nitrate</button>':''}`;
 const q=x=>api.ctrl.querySelector(x);
 function salt(){const A=AC[a],B=BA[b];const g=(x,n)=>n>1?(x.length>2||/[A-Z][a-z]?[₄₃]/.test(x)&&x.length>2?`(${x})`:x)+'₂':x;
  const cat=B[2]===2&&A[2]===2?B[1]+A[1]:B[2]===A[2]?B[1]+A[1]:B[2]===2?B[1]+g(A[1],2):g(B[1],2)+A[1];
  const fm=B[2]===A[2]?B[1]+A[1]:B[2]===2?B[1]+(A[1].length>2?'('+A[1]+')':A[1])+'₂':(B[1].length>2?'('+B[1]+')':B[1])+'₂'+A[1];
  const nature=A[3]&&B[3]?'neutral':A[3]&&!B[3]?'acidic':!A[3]&&B[3]?'basic':'depends';
  const msg=fm==='CaCO₃'?'insoluble: it settles as a white solid (chalk, marble)':fm==='CaSO₄'?'only slightly soluble; its solution is neutral':nature==='depends'?'nearly neutral in water':'its solution is '+nature;return{name:B[0]+' '+A[0],fm,nature,msg}}
 function draw(){const s=salt();const mixed=step>=1,dry=step>=2;
  const col=mixed?(s.nature==='neutral'?'#7fd37a':s.nature==='acidic'?'#ffb347':'#6a8cff'):'#ffd1d1';
  const pour=mixed&&step===1?`<path d="M180 120 Q250 60 330 140" fill="none" stroke="#ff9aa2" stroke-width="6" opacity=".8"><animate attributeName="opacity" values="0;.9;0" dur="1.2s" repeatCount="2"/></path><path d="M580 120 Q510 60 430 140" fill="none" stroke="#9ec8ff" stroke-width="6" opacity=".8"><animate attributeName="opacity" values="0;.9;0" dur="1.2s" repeatCount="2"/></path>`:'';
  const water=dry?0:mixed?70:0,crys=dry?[...Array(14)].map((_,i)=>`<polygon points="${340+i*6},248 ${344+i*6},238 ${348+i*6},248" fill="#fff" stroke="#9aa7b8"/>`).join(''):'';
  api.stage.innerHTML=QLab.svg(760,320,`<rect width="760" height="320" fill="none"/>
  <g><path d="M120 150 L110 250 Q110 268 128 268 H212 Q230 268 230 250 L220 150 Z" fill="#ffd1d1" stroke="#1b2a4a" stroke-width="4"/><text x="170" y="215" text-anchor="middle" font-size="30" font-weight="900">${lab(a)}</text><text x="170" y="292" text-anchor="middle" font-size="22">acid</text></g>
  <g><path d="M530 150 L520 250 Q520 268 538 268 H622 Q640 268 640 250 L630 150 Z" fill="#cfe4ff" stroke="#1b2a4a" stroke-width="4"/><text x="580" y="215" text-anchor="middle" font-size="30" font-weight="900">${lab(b)}</text><text x="580" y="292" text-anchor="middle" font-size="22">base</text></g>
  ${pour}
  <path d="M320 140 V250 Q320 268 340 268 H420 Q440 268 440 250 V140" fill="none" stroke="#1b2a4a" stroke-width="5"/>
  ${mixed?`<rect x="323" y="${248-water}" width="114" height="${water+18}" fill="${col}" opacity=".9"/>`:''}${crys}
  ${dry?'<g><path d="M380 300 C360 285 365 272 380 262 C395 272 400 285 380 300Z" fill="#ffb347"><animate attributeName="opacity" values="1;.4;1" dur=".6s" repeatCount="indefinite"/></path></g>':''}
  <text x="380" y="30" text-anchor="middle" font-size="26" font-weight="800">${dry?s.name+' crystals ('+s.fm+')':mixed?'Mixed: '+(s.nature==='neutral'?'green = neutral':s.nature==='acidic'?'orange = acidic':s.nature==='basic'?'blue = basic':'almost neutral')+' (indicator colour)':'Pick an acid and a base, then pour and mix'}</text>`);
  q('#mix').style.display=step===0?'':'none';q('#evap').style.display=step===1?'':'none';
  q('#rs').textContent=dry?`${s.name} (${s.fm}): ${s.msg}. Salts made: ${seen.size+(seen.has(a+b)?0:1)} of 2. ${seen.size+(seen.has(a+b)?0:1)>=2?'Done! Press the purple "I tried it. Show me why" button below.':'Now pick a different acid or base (step 1 and 2) to make another salt.'}`:mixed?'Colour shows the result. Now press the orange button to heat it and get the salt.':'Step 1: choose an acid. Step 2: choose a base. Step 3: press Pour and mix.';
  if(dry){seen.add(a+b);if(!chal&&seen.size>=2){api.award('did');api.ready()}}}
 const pick=(sel,set)=>q(sel).querySelectorAll('button').forEach(x=>x.onclick=()=>{set(x.dataset.k);step=0;q(sel).querySelectorAll('button').forEach(y=>y.className=y===x?'pri':'');draw()});
 pick('#ac',v=>a=v);pick('#bs',v=>b=v);
 q('#mix').onclick=()=>{step=1;draw()};
 q('#evap').onclick=()=>{if(step<1)return api.coach('warn','Mix first','Press "Pour and mix" before heating.');step=2;draw()};
 q('#ac button').className='pri';q('#bs button').className='pri';
 if(chal)q('#ck').onclick=()=>a==='HNO3'&&b==='KOH'?api.solved():api.nope('Potassium comes from KOH and nitrate from HNO₃. You chose '+lab(a)+' and '+b+'.');
 draw()},
why:['A <span class="word">salt</span> is made when the hydrogen of an acid is replaced by a metal (or ammonium) from a base.','Name: <b>metal name</b> from the base + <b>anion name</b> from the acid. HCl gives chlorides, H₂SO₄ gives sulphates, HNO₃ gives nitrates, H₂CO₃ gives carbonates.','Strong acid + strong base → <b>neutral</b> salt (NaCl, pH 7). Strong acid + weak base → <b>acidic</b> salt (NH₄Cl). Weak acid + strong base → <b>basic</b> salt (Na₂CO₃).','Salts of the same acid or the same base form a <b>family</b>, for example all chlorides.'],
check:[{q:'H₂SO₄ + 2NaOH → ?',options:['Sodium sulphate + water','Sodium chloride + water','Sodium nitrate + water','Sodium carbonate + water'],answer:0,why:'Sulphate from sulphuric acid, sodium from sodium hydroxide.',hint:'Name from each part.'},
 {q:'NaCl in water is…',options:['Acidic','Basic','Neutral','A metal'],answer:2,why:'Strong acid + strong base.',hint:'pH 7.'},
 {q:'Sodium carbonate in water is…',options:['Acidic','Basic','Neutral','Insoluble'],answer:1,why:'It comes from a weak acid and a strong base.',hint:'Washing soda feels slippery.'}],
challenge:{text:'Make <b>potassium nitrate</b>. Choose the right acid and base, then check.',win:'HNO₃ + KOH → KNO₃ + H₂O.'},
real:['Common salt (NaCl) is food and a preservative.','Washing soda (Na₂CO₃) softens water.','Plaster of Paris and gypsum are calcium sulphate salts.'],
words:{Salt:'Product of an acid and a base.',Neutralisation:'Acid + base reaction.','Strong acid':'Fully ionises in water.','Weak acid':'Only partly ionises.'}
});
