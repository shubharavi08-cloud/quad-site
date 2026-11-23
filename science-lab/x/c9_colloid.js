QLab.register({
id:'c9_colloid',code:'9-C1',title:'Solution, suspension or colloid? Shine a torch',grade:9,subject:'Chemistry',emoji:'🔦',
hook:{title:'Why does a torch beam show up in milk but not in sugar water?',text:'Mixtures come in three kinds. A beam of light and a few minutes of waiting will tell them apart.'},
prior:'Know that sugar dissolves and sand does not.',
guess:{q:'You shine a torch through milk. What do you see?',options:['The beam passes with no trace','The beam is clearly visible inside the milk','The milk turns clear','The torch goes off'],answer:1,hint:'Think of a torch in a dusty room or foggy air.',after:'Test the mixtures.'},
build(api){
 const chal=!!api.challenge;
 const M={'Sugar in water':['solution',0,0],'Salt in water':['solution',0,0],'Muddy water':['suspension',1,1],'Chalk in water':['suspension',1,1],'Milk':['colloid',1,0],'Fog / smoke':['colloid',1,0],'Starch in water':['colloid',1,0]};
 const names=Object.keys(M);let cur=null,beam=false,wait=0;const tested=new Set();
 api.ctrl.innerHTML=`<div class="row" id="mx" style="flex-wrap:wrap">${names.map(n=>`<button data-n="${n}">${n}</button>`).join('')}</div><div class="row"><button id="bm">🔦 Shine torch</button><button id="wt">⏱ Wait 10 minutes</button></div><p id="rs" style="font-weight:800"></p>${chal?'<p><b>Which kind of mixture is the unknown cloudy liquid? (Beam visible, does not settle)</b></p><div class="row" id="kd"><button data-k="solution">Solution</button><button data-k="suspension">Suspension</button><button data-k="colloid">Colloid</button></div>':'<div id="tb" style="font-size:14px"></div>'}`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(){const m=cur?M[cur]:null;
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><path d="M360 60 V250 Q360 265 375 265 H475 Q490 265 490 250 V60" fill="none" stroke="#1b2a4a" stroke-width="5"/><rect x="363" y="90" width="124" height="173" fill="${!m?'#e8f3fb':m[0]==='solution'?'#e8f3fb':'#e6dfcf'}" opacity=".9"/>
  ${beam?`<polygon points="120,150 363,135 363,170" fill="#ffe97a" opacity=".5"/>${m&&m[1]?`<polygon points="363,135 487,135 487,170 363,170" fill="#ffe97a" opacity=".8"/>`:`<polygon points="487,150 760,140 760,160" fill="#ffe97a" opacity=".5"/>`}`:''}
  ${m&&m[2]&&wait?`<rect x="363" y="${240}" width="124" height="22" fill="#a3874e"/>`:''}
  ${m&&m[2]&&!wait?[...Array(14)].map((_,i)=>`<circle cx="${375+(i*29%100)}" cy="${110+(i*41%120)}" r="4" fill="#a3874e"/>`).join(''):''}
  <text x="425" y="42" text-anchor="middle" font-size="16" font-weight="800">${cur||'Choose a mixture'}</text><text x="130" y="220" font-size="30">🔦</text>`)}
 q('#mx').querySelectorAll('button').forEach(b=>b.onclick=()=>{cur=b.dataset.n;beam=false;wait=0;q('#mx').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');q('#rs').textContent='';draw()});
 q('#bm').onclick=()=>{if(!cur)return;beam=true;draw();const m=M[cur];q('#rs').textContent=m[1]?'The beam is visible inside it: particles scatter the light.':'The beam passes through without being seen.'};
 q('#wt').onclick=()=>{if(!cur)return;wait=1;draw();const m=M[cur];q('#rs').textContent=m[2]?'After 10 min the particles settled to the bottom: a suspension.':'Nothing settles.';
  if(beam){tested.add(cur);if(!chal){q('#tb').textContent='Classified: '+[...tested].map(n=>n+' → '+M[n][0]).join(' · ');if(tested.size>=5&&new Set([...tested].map(n=>M[n][0])).size===3){api.award('did');api.ready()}}}};
 if(chal)q('#kd').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.k==='colloid'?api.solved():api.nope('The beam is visible, so it is not a solution. It does not settle, so it is not a suspension. Which kind is left?'));
 draw()},
why:['In a <b>solution</b> the particles are tiny. They do not scatter light and never settle (sugar water).','In a <b>suspension</b> the particles are big. They scatter light and <b>settle</b> when left alone (muddy water).','In a <b>colloid</b> the particles are in between. They scatter light but do <b>not</b> settle (milk, fog).','Light scattering by tiny particles is the <span class="word">Tyndall effect</span>.'],
check:[{q:'Which mixture settles if left alone?',options:['Sugar water','Milk','Muddy water','Fog'],answer:2,why:'Muddy water is a suspension, so the mud settles.',hint:'Wait 10 minutes.'},
 {q:'The Tyndall effect is…',options:['Mixtures settling','Light scattered by particles','Colour change','Boiling'],answer:1,why:'Particles scatter a beam so you can see it.',hint:'The beam in milk.'},
 {q:'Which is a colloid?',options:['Salt water','Milk','Muddy water','Pure water'],answer:1,why:'Milk scatters light but does not settle.',hint:'Compare milk with muddy water.'}],
challenge:{text:'A cloudy liquid shows a visible beam and <b>does not settle</b> after 10 minutes. What kind of mixture is it?',win:'A colloid: it scatters light but never settles.'},
real:['Sunbeams through mist or dusty air show the Tyndall effect.','Milk, butter, jelly and fog are colloids.','Medicines are shaken: they are suspensions that settle.'],
words:{Solution:'Tiny particles. Clear. No scattering.',Suspension:'Big particles. Settles.',Colloid:'Medium particles. Scatters light. Does not settle.','Tyndall effect':'Light scattered by particles in a mixture.'}
});
