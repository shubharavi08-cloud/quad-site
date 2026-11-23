QLab.register({
id:'c10_series',code:'10-C3',title:'Build the reactivity series',grade:10,subject:'Chemistry',emoji:'📶',
hook:{title:'Can you rank metals just from the evidence?',text:'Read the evidence card for each metal, then put them in order from most to least reactive.'},
prior:'You tested metals in air, water, acid and salt solutions.',
guess:{q:'Which is the most reactive: gold, iron or potassium?',options:['Gold','Iron','Potassium','All the same'],answer:2,hint:'It reacts violently with cold water.',after:'Build the series.'},
build(api){
 const chal=!!api.challenge;
 const E={Potassium:'Reacts violently with cold water, bursts into flame.',Sodium:'Reacts vigorously with cold water. Stored under oil.',Calcium:'Reacts steadily with cold water.',Magnesium:'Burns brightly in air. Reacts slowly with hot water.',Zinc:'Reacts with dilute acid. Not with cold water.',Iron:'Reacts slowly with dilute acid. Rusts.',Copper:'No reaction with dilute acid. Displaced by zinc and iron.',Silver:'No reaction with acid. Displaced by copper.',Gold:'No reaction with air, water or acid.'};
 const ORDER=Object.keys(E);const sub=chal?['Zinc','Hydrogen','Copper']:['Potassium','Sodium','Magnesium','Zinc','Iron','Copper','Gold'];
 let o=[];const shuffled=[...sub].reverse();
 api.ctrl.innerHTML=`<p><b>${chal?'Hydrogen is not a metal, but acid reaction places it. Click zinc, hydrogen, copper in order of reactivity. Evidence: zinc reacts with acid and gives H₂; copper does not.':'Click metals from MOST to LEAST reactive:'}</b></p><div class="row" id="mt" style="flex-wrap:wrap">${shuffled.map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div><button id="rs">↺ Start again</button><p id="od" style="font-weight:800"></p>`;
 const q=x=>api.ctrl.querySelector(x);
 const ref=chal?{Zinc:'Zinc reacts with acid, giving H₂, so it is above hydrogen.',Hydrogen:'Acid contains H⁺ ions. Metals that displace H₂ are above it.',Copper:'Copper does not displace H₂ from acid, so it is below hydrogen.'}:E;
 function draw(){api.stage.innerHTML=QLab.svg(760,360,`<rect width="760" height="360" fill="none"/>${sub.map((k,i)=>{const y=20+i*(chal?60:42);const p=o.indexOf(k);return `<rect x="30" y="${y}" width="${chal?220:200}" height="${chal?44:32}" rx="8" fill="${p>=0?'#e4e0ff':'#f1f5ff'}" stroke="#8aa0c8"/><text x="45" y="${y+(chal?28:22)}" font-size="15" font-weight="800">${p>=0?(p+1)+'. ':''}${k}</text><text x="${chal?270:250}" y="${y+(chal?28:22)}" font-size="13" fill="#55688a">${(ref[k]||'').slice(0,chal?70:74)}</text>`}).join('')}`)}
 q('#mt').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(o.includes(b.dataset.k))return;o.push(b.dataset.k);b.disabled=true;q('#od').textContent=o.join(' > ');draw();
  if(o.length===sub.length){const want=chal?['Zinc','Hydrogen','Copper']:sub;const ok=o.join()===want.join();if(ok){chal?api.solved():(api.award('did'),api.ready())}else{(chal?api.nope:api.coach.bind(null,'warn','Not quite'))('Check the evidence cards: the most reactive reacts with cold water; the least reactive does not react with acid. Start again.');o=[];q('#od').textContent='';q('#mt').querySelectorAll('button').forEach(x=>x.disabled=false);draw()}}});
 q('#rs').onclick=()=>{o=[];q('#od').textContent='';q('#mt').querySelectorAll('button').forEach(x=>x.disabled=false);draw()};draw()},
why:['The <span class="word">reactivity series</span> ranks metals by how readily they react: K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au.','Evidence: reaction with cold water, steam, dilute acid, and displacement of other metals.','Metals <b>above hydrogen</b> displace hydrogen from acids. Those below do not.','The series tells you how to extract a metal: very reactive ones need electrolysis, less reactive ones can be heated with carbon.'],
check:[{q:'Which of these is least reactive?',options:['Zinc','Iron','Copper','Magnesium'],answer:2,why:'Copper is lowest among them.',hint:'It does not react with acid.'},
 {q:'Metals above hydrogen will…',options:['Not react with acid','Displace hydrogen from acid','Be gases','Be non-magnetic'],answer:1,why:'They give off H₂.',hint:'Metal + acid.'},
 {q:'Why is gold found as a pure metal in nature?',options:['It is heavy','It is very unreactive','It is soft','It is yellow'],answer:1,why:'It does not react with air, water or most acids.',hint:'Bottom of the series.'}],
challenge:{text:'Place <b>hydrogen</b> in the series: put zinc, hydrogen and copper in order of reactivity.',win:'Zinc > hydrogen > copper. Metals above hydrogen displace it from acid.'},
real:['Very reactive metals like sodium are extracted by electrolysis.','Iron is extracted by heating its ore with carbon.','Gold and platinum are used in jewellery because they do not react.'],
words:{'Reactivity series':'Metals ranked by reactivity.',Displace:'To push out and replace.',Extraction:'Obtaining a metal from its ore.',Ore:'A rock containing a metal compound.'}
});
