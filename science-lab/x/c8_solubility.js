QLab.register({
id:'c8_solubility',code:'8-C2',title:'Does it dissolve? The solubility tester',grade:8,subject:'Chemistry',emoji:'🧪',
hook:{title:'Sugar disappears in water. Does sand? Does oil?',text:'Test different things in water and in oil, and sort them into soluble and insoluble.'},
prior:'Know what stirring a spoon of sugar into water looks like.',
guess:{q:'Which of these will dissolve in water?',options:['Sand','Chalk powder','Sugar','Cooking oil'],answer:2,hint:'You stir this into tea.',after:'Test them all yourself.'},
build(api){
 const chal=!!api.challenge;
 const W={sugar:[1,'#fff','clear'],salt:[1,'#fff','clear'],sand:[0],chalk:[0],'baking soda':[1,'#fff','clear'],vinegar:[1,'#fff','clear'],'copper sulphate':[1,'#4aa8ff','blue'],ghee:[0],'mustard oil':[0]};
 const O={ghee:1,'mustard oil':1};
 const list=Object.keys(W);let solv='water',item=null;const log={};
 api.ctrl.innerHTML=`<b>Solvent</b><div class="row" id="sv"><button data-s="water">💧 Water</button><button data-s="oil">🫒 Cooking oil</button></div><b>Choose a substance</b><div class="row" id="it" style="flex-wrap:wrap">${list.map(x=>`<button data-i="${x}">${x}</button>`).join('')}</div><button class="pri" id="stir">🥄 Stir it!</button><p id="res" style="font-weight:800"></p><div id="tbl" style="font-size:14px"></div>${chal?'<button class="pri" id="ck">Check my answer</button>':''}`;
 const q=s=>api.ctrl.querySelector(s);
 const dissolves=()=>solv==='water'?W[item][0]:(O[item]?1:0);
 function draw(res){
  const col=res&&dissolves()&&solv==='water'&&W[item][2]==='blue'?'#8ec9ff':'#e8f3fb',sol=solv==='water'?'#cde9f9':'#f5e29a';
  const lump=!res?'':dissolves()?'':item==='ghee'?'🧈':item==='mustard oil'?'🫒':'⚪';
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/><path d="M270 60 V250 Q270 265 285 265 H475 Q490 265 490 250 V60" fill="none" stroke="#1b2a4a" stroke-width="5"/><rect x="273" y="120" width="214" height="143" fill="${res&&dissolves()&&solv==='water'&&W[item][2]==='blue'?col:sol}" opacity=".85"/>
  <text x="380" y="42" text-anchor="middle" font-size="18" font-weight="800">${item||'Pick a substance'} in ${solv}</text>
  ${res&&!dissolves()?`<text x="380" y="${solv==='water'&&(item==='ghee'||item==='mustard oil')?135:245}" text-anchor="middle" font-size="40">${lump}${lump}${lump}</text>`:''}
  ${res&&dissolves()?`<text x="380" y="200" text-anchor="middle" font-size="18" font-weight="800" fill="#4b3fd1">Gone! It dissolved</text>`:''}`)}
 function table(){q('#tbl').innerHTML='Tested: '+(Object.keys(log).length?Object.entries(log).map(([k,v])=>`${v?'✅':'❌'} ${k}`).join(' · '):'nothing yet')}
 q('#sv').querySelectorAll('button').forEach(b=>b.onclick=()=>{solv=b.dataset.s;q('#sv').querySelectorAll('button').forEach(x=>{x.className=x===b?'pri':''});q('#res').textContent='';draw()});
 q('#sv').querySelector('[data-s=water]').className='pri';
 q('#it').querySelectorAll('button').forEach(b=>b.onclick=()=>{item=b.dataset.i;q('#it').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');q('#res').textContent='';draw()});
 q('#stir').onclick=()=>{if(!item)return api.coach('warn','Pick something first','Choose a substance, then stir.');const d=dissolves();draw(true);
  q('#res').textContent=d?'✅ It dissolves in '+solv+'. It is soluble.':'❌ It does not dissolve in '+solv+'. It is insoluble.';
  log[item+' in '+solv]=d;table();
  if(!chal&&Object.keys(log).length>=7&&new Set(Object.values(log)).size===2){api.award('did');api.ready()}};
 if(chal)q('#ck').onclick=()=>{if(!item)return api.nope('Choose a substance first.');if(solv==='water'&&item==='copper sulphate'){draw(true);api.solved()}else api.nope('Not yet. Which substance gives a clear <b>blue</b> liquid? Try each and look at the beaker.')};
 draw();table()},
why:['A substance that dissolves is <b>soluble</b>. One that does not is <b>insoluble</b>.','Sugar, salt, baking soda, vinegar and copper sulphate dissolve in water. Sand, chalk and oils do not.','Solubility depends on <b>both</b> the substance and the solvent. Ghee and oil dissolve in oil but not in water.','A rule of thumb: <i>like dissolves like</i>. Water mixes with water-loving things, oil with oil-like things.'],
check:[{q:'Sand is stirred into water. We say sand is…',options:['Soluble','Insoluble','Saturated','A solvent'],answer:1,why:'It does not dissolve, so it is insoluble.',hint:'Did the sand disappear?'},
 {q:'Which pair mixes completely?',options:['Oil and water','Ghee and cooking oil','Sand and water','Chalk and water'],answer:1,why:'Ghee is oil-like, so it dissolves in oil.',hint:'Test ghee in the oil.'},
 {q:'Copper sulphate dissolves in water to make…',options:['A clear colourless liquid','A blue solution','A white powder','A gas'],answer:1,why:'Copper sulphate gives a blue solution.',hint:'Look at the colour of the beaker.'}],
challenge:{text:'Make a <b>clear blue solution</b>. Choose the right substance and solvent, then stir.',win:'Copper sulphate dissolves in water to make a bright blue solution.'},
real:['Salt and sugar dissolve in water, so you can cook with them.','Oil paint is cleaned with turpentine, not water, because oil does not dissolve in water.','Medicines are made as syrups or tablets that dissolve in your body.'],
words:{Soluble:'Can dissolve.',Insoluble:'Cannot dissolve.',Solute:'The thing that dissolves.',Solvent:'The liquid that dissolves it.'}
});
