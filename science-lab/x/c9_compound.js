QLab.register({
id:'c9_compound',code:'9-C3',title:'Mixture or compound? Iron and sulphur',grade:9,subject:'Chemistry',emoji:'🔶',
hook:{title:'Iron is a magnetic grey metal. Sulphur is a yellow powder. What happens when you heat them together?',text:'Mixing keeps both substances as they are. Heating makes a brand new compound.'},
prior:'Know that elements are made of one kind of atom.',
guess:{q:'Iron filings and sulphur powder are just stirred together. Can a magnet pull the iron out?',options:['Yes, they are only mixed','No, they have joined','Only if heated','No, sulphur is magnetic'],answer:0,hint:'In a mixture each substance keeps its own properties.',after:'Test both the mixture and the heated product.'},
build(api){
 const chal=!!api.challenge;
 const S=chal?[['Air','M','Oxygen, nitrogen and others, each keeping its properties.'],['Water','C','H and O are chemically joined in a fixed ratio.'],['Salt water','M','Salt and water mixed.'],['Carbon dioxide','C','Carbon and oxygen joined chemically.']]:null;
 let state='sep',mag=false,heated=false,tests=new Set(),i=0;
 if(chal){api.ctrl.innerHTML=`<p>Sample <b id="n"></b> of ${S.length}</p><div class="row"><button class="pri" id="m">Mixture</button><button class="pri" id="c">Compound</button></div><p id="fb" style="font-weight:800"></p>`;
  const q=s=>api.ctrl.querySelector(s);
  const show=()=>{q('#n').textContent=Math.min(i+1,S.length);api.stage.innerHTML=QLab.svg(760,260,`<rect width="760" height="260" fill="#fff"/><rect x="180" y="60" width="400" height="120" rx="22" fill="#f1f5ff" stroke="#8aa0c8" stroke-width="3"/><text x="380" y="130" text-anchor="middle" font-size="28" font-weight="800">${i<S.length?S[i][0]:'All done!'}</text>`)};
  const ans=k=>{if(i>=S.length)return;if(S[i][1]===k){q('#fb').textContent='✅ '+S[i][2];i++;show();if(i>=S.length)api.solved()}else q('#fb').textContent='❌ Think: are the parts chemically joined in a fixed ratio, or just mixed?'};
  q('#m').onclick=()=>ans('M');q('#c').onclick=()=>ans('C');show();return}
 api.ctrl.innerHTML=`<div class="row"><button class="pri" id="mx">🥄 Mix iron + sulphur</button><button class="pri" id="ht">🔥 Heat strongly</button></div><div class="row"><button id="mg">🧲 Test with a magnet</button><button id="cs">🧪 Add dilute acid</button></div><p id="rs" style="font-weight:800"></p><div id="lg" style="font-size:14px"></div>`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(){const mix=state==='mix',comp=state==='comp';
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/>${state==='sep'?'<rect x="180" y="180" width="160" height="70" rx="10" fill="#9aa4ad"/><text x="260" y="222" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">iron filings</text><rect x="420" y="180" width="160" height="70" rx="10" fill="#f2d84a"/><text x="500" y="222" text-anchor="middle" font-size="15" font-weight="800">sulphur</text>':`<rect x="250" y="170" width="260" height="90" rx="14" fill="${comp?'#3a3a3a':'#c8c25a'}"/>${mix?[...Array(30)].map((_,k)=>`<rect x="${260+k*8%240}" y="${180+(k*13)%60}" width="6" height="6" fill="#6f7780"/>`).join(''):''}<text x="380" y="222" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">${comp?'iron sulphide (new black solid)':'mixture (both still visible)'}</text>`}
  ${mag?`<text x="${state==='mix'?280:380}" y="120" text-anchor="middle" font-size="46">🧲</text>`:''}<text x="380" y="36" text-anchor="middle" font-size="16" font-weight="800">${state==='sep'?'Two elements':comp?'A compound':'A mixture'}</text>`)}
 q('#mx').onclick=()=>{state='mix';heated=false;mag=false;draw();q('#rs').textContent='They are just mixed. Each keeps its own properties.'};
 q('#ht').onclick=()=>{if(state==='sep')return api.coach('warn','Mix first','Mix them, then heat.');state='comp';heated=true;mag=false;draw();q('#rs').textContent='🔥 A red glow, and a NEW black solid forms: iron sulphide. It is a compound.'};
 q('#mg').onclick=()=>{if(state==='sep')return;mag=true;draw();tests.add('mag'+state);q('#rs').textContent=state==='mix'?'✅ The magnet pulls out the iron. It is still a mixture.':'❌ The magnet does not pick it up. The iron has changed into something new.';chk()};
 q('#cs').onclick=()=>{if(state==='sep')return;tests.add('acid'+state);q('#rs').textContent=state==='mix'?'Iron fizzes with acid and gives hydrogen. Sulphur stays unchanged.':'The compound gives off a gas with a rotten-egg smell: hydrogen sulphide. A new substance reacts differently.';chk()};
 function chk(){q('#lg').textContent='Tests done: '+tests.size;if(tests.has('magmix')&&tests.has('magcomp')){api.award('did');api.ready()}}
 draw()},
why:['In a <span class="word">mixture</span> the substances are just together. Each keeps its <b>own properties</b> and can be separated by physical methods such as a magnet.','In a <span class="word">compound</span> the elements are <b>chemically joined</b> in a fixed ratio. It has <b>new properties</b>, and you cannot separate it by physical methods.','Iron + sulphur (mixed) → magnet separates iron. Iron + sulphur (heated) → iron sulphide, not magnetic.','Water (H₂O) and carbon dioxide (CO₂) are compounds. Air and salt water are mixtures.'],
check:[{q:'Which keeps the properties of its parts?',options:['A compound','A mixture','Both','Neither'],answer:1,why:'In a mixture each part keeps its properties.',hint:'The magnet test.'},
 {q:'Iron sulphide is…',options:['A mixture','A compound','An element','An atom'],answer:1,why:'Iron and sulphur are chemically joined.',hint:'It is not magnetic.'},
 {q:'Which is a compound?',options:['Air','Salt water','Water','Muddy water'],answer:2,why:'Water has hydrogen and oxygen chemically joined.',hint:'A fixed formula H₂O.'}],
challenge:{text:'Sort four samples: <b>mixture or compound</b>?',win:'Air and salt water are mixtures. Water and carbon dioxide are compounds.'},
real:['Table salt (NaCl) is a compound of a dangerous metal and a poisonous gas.','Air is a mixture. Its gases can be separated by cooling.','Rust is a compound of iron and oxygen.'],
words:{Element:'Only one kind of atom.',Compound:'Different elements chemically joined in a fixed ratio.',Mixture:'Substances together, not joined.','Chemical formula':'Shows which elements and how many atoms.'}
});
