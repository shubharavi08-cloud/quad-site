QLab.register({
id:'c9_separate',code:'9-C1',title:'Separate the mixture: filter, evaporate, distil',grade:9,subject:'Chemistry',emoji:'🧫',
hook:{title:'Muddy salt water: how do you get clean water and salt from it?',text:'Different mixtures need different methods. Pick the right tool for each job.'},
prior:'You tried filtering and evaporating in Grade 8. Here you choose between methods.',
guess:{q:'To get sand out of sand-and-water, you should…',options:['Evaporate it','Filter it','Distil it','Dissolve it'],answer:1,hint:'Sand does not dissolve. A filter catches big pieces.',after:'Now try harder mixtures.'},
build(api){
 const chal=!!api.challenge;
 const J=chal?[['Salt + water + sand','Separate everything: sand, then salt, then water',['filter','evaporate','distil'],'Sand is undissolved, so filter first. Salt is dissolved, so evaporate. To keep the water too, distil.'],['Sulphur + iron filings','Which tool is easiest?',['magnet'],'Iron is magnetic. Sulphur is not.']]:
 [['Sand + water','Which method separates the sand?',['filter'],'Sand is undissolved. The filter paper catches it.'],['Salt + water','Which method gets the salt?',['evaporate'],'Salt is dissolved, so it passes the filter. Evaporate the water.'],['Water + alcohol (different boiling points)','Which method separates them?',['distil'],'They are both liquids that dissolve into each other. Distil using different boiling points.'],['Iron filings + sulphur','Which method?',['magnet'],'Iron is magnetic.']];
 let i=0,step=0,tries=0;
 api.ctrl.innerHTML=`<p><b id="jb"></b></p><p id="jq"></p><div class="row" style="flex-wrap:wrap"><button data-m="filter">🧻 Filter</button><button data-m="evaporate">🔥 Evaporate</button><button data-m="distil">⚗️ Distil</button><button data-m="magnet">🧲 Magnet</button></div><p id="fb" style="font-weight:800"></p>`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(){const j=J[i];api.stage.innerHTML=QLab.svg(760,280,`<rect width="760" height="280" fill="none"/><rect x="230" y="90" width="300" height="110" rx="20" fill="#f1f5ff" stroke="#8aa0c8" stroke-width="3"/><text x="380" y="155" text-anchor="middle" font-size="20" font-weight="800">${j?j[0]:'All done!'}</text><text x="380" y="245" text-anchor="middle" font-size="14" fill="#55688a">${i+(j?1:0)} of ${J.length}</text>`);
  if(j){q('#jb').textContent='Mixture: '+j[0];q('#jq').textContent=j[1]+(j[2].length>1?` (step ${step+1} of ${j[2].length})`:'')}}
 api.ctrl.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const j=J[i];if(!j)return;const want=j[2][step];
  if(b.dataset.m===want){q('#fb').textContent='✅ '+(step===j[2].length-1?j[3]:'Right. Next step?');step++;if(step>=j[2].length){i++;step=0}draw();
   if(i>=J.length){chal?api.solved():(api.award('did'),api.ready())}}
  else{q('#fb').textContent='❌ That will not work here. Ask: is the solid dissolved? Is it magnetic? Do the liquids have different boiling points?'}});
 draw()},
why:['Pick the method from the <b>property that differs</b> between the parts of the mixture.','<b>Filtration</b> separates an undissolved solid from a liquid. <b>Evaporation</b> gets a dissolved solid. <b>Distillation</b> separates liquids by boiling point. A <b>magnet</b> separates magnetic from non-magnetic.','If one method does not work, ask what is different: size, solubility, boiling point, magnetism.','Many real jobs need two or three methods one after another.'],
check:[{q:'Which separates alcohol from water?',options:['Filtration','Distillation','Magnet','Sieving'],answer:1,why:'Alcohol and water have different boiling points.',hint:'Both are liquids.'},
 {q:'Dissolved salt is separated from water by…',options:['Filtration','A magnet','Evaporation','Sieving'],answer:2,why:'Dissolved salt passes through a filter, so evaporate the water.',hint:'The salt is dissolved.'},
 {q:'Why can a magnet separate iron filings from sulphur?',options:['Iron is magnetic, sulphur is not','Sulphur is heavier','Iron dissolves','Sulphur melts'],answer:0,why:'Only iron is attracted to a magnet.',hint:'Test each with a magnet.'}],
challenge:{text:'Separate <b>muddy salt water</b> into sand, salt and clean water. Choose the methods in the right order: filter, then evaporate, then distil.',win:'Filter first, then remove the water. The steps depend on what is dissolved.'},
real:['Water treatment plants filter muddy river water.','Petrol, diesel and kerosene are separated from crude oil by distillation.','Scrap yards use giant magnets to lift iron.'],
words:{Mixture:'Two or more substances together, not joined chemically.',Filtration:'Separating an undissolved solid from a liquid.',Distillation:'Separating liquids by boiling point.',Residue:'What is left behind on the filter paper.'}
});
