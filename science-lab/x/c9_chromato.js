QLab.register({
id:'c9_chromato',code:'9-C1',title:'Chromatography: what colours are in black ink?',grade:9,subject:'Chemistry',emoji:'🖍️',
hook:{title:'A black pen mark is a secret mixture of colours.',text:'Dip a strip of paper in water. As the water climbs, the colours in the ink separate.'},
prior:'Know that black ink is a colour.',
guess:{q:'You dip paper with a black ink spot into water. What do you see after some minutes?',options:['The ink stays black','The ink separates into different colours','The ink disappears','The paper turns black'],answer:1,hint:'Some pens are mixtures of dyes.',after:'Run the experiment.'},
build(api){
 const chal=!!api.challenge;
 const INK={'Black pen A':[['#f5a623',.80],['#d0021b',.60],['#2979ff',.35]],'Black pen B':[['#7ed321',.70],['#2979ff',.40]],'Blue pen':[['#2979ff',.45]],'Red pen':[['#d0021b',.62],['#f5a623',.85]]};
 let pen='Black pen A',t=0,seen=new Set();
 api.ctrl.innerHTML=`<b>Pick a pen</b><div class="row" id="pp" style="flex-wrap:wrap">${Object.keys(INK).map(k=>`<button data-p="${k}">${k}</button>`).join('')}</div><label for="tt">Time: <span id="tv"></span> min</label><input id="tt" type="range" min="0" max="10" value="0"><p id="nt" style="font-size:14px"></p>${chal?'<p><b>The mystery ink spreads to the same colours as which pen?</b></p><div class="row" id="ch"><button data-a="Black pen A">Black pen A</button><button data-a="Black pen B">Black pen B</button></div>':''}`;
 const q=s=>api.ctrl.querySelector(s);
 const mystery='Black pen B';
 function draw(){const P=chal?INK[mystery]:INK[pen];
  api.stage.innerHTML=QLab.svg(760,320,`<rect width="760" height="320" fill="#fff"/><rect x="300" y="30" width="160" height="260" fill="#faf7ef" stroke="#c9c2ad" stroke-width="3"/><rect x="260" y="250" width="240" height="60" fill="#cde9f9" opacity=".8"/><line x1="300" y1="230" x2="460" y2="230" stroke="#c9c2ad" stroke-dasharray="5 4"/>
  <circle cx="380" cy="230" r="${t===0?9:5}" fill="#222" opacity="${t===0?1:Math.max(0,.9-t/6)}"/>
  ${t>0?P.map((c,i)=>{const y=230-c[1]*Math.min(t,10)/10*190;return `<ellipse cx="380" cy="${y}" rx="${14+i*4}" ry="${6}" fill="${c[0]}" opacity=".85"/>`}).join(''):''}
  <text x="380" y="20" text-anchor="middle" font-size="14" font-weight="800">${chal?'Mystery ink':pen}</text>`);
  q('#tv').textContent=t;const n=INK[pen].length;
  if(!chal){q('#nt').textContent=t>=5?`${n} dye${n>1?'s':''} found in this ink.`:'Slide time to 5 minutes or more.';if(t>=5)seen.add(pen);if(seen.size>=2){api.award('did');api.ready()}}}
 q('#tt').oninput=e=>{t=+e.target.value;draw()};
 if(!chal)q('#pp').querySelectorAll('button').forEach(b=>b.onclick=()=>{pen=b.dataset.p;q('#pp').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});
 else{q('#tt').value=10;t=10;q('#ch').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a===mystery?api.solved():api.nope('Compare the colours and their heights. Black pen A has three dyes, but the mystery ink has green and blue.'))}
 draw()},
why:['Black ink is often a <b>mixture of dyes</b>. Water climbs the paper and carries each dye with it.','Each dye travels at a different speed. Dyes that dissolve well and stick weakly travel far. Others stay low.','This separation by speed is called <span class="word">chromatography</span>.','The pattern is like a fingerprint. Two pens with the same dyes give the same pattern.'],
check:[{q:'Why do different colours climb to different heights?',options:['They are different sizes of paper','Each dye moves at its own speed','Water is a mixture','Gravity changes'],answer:1,why:'Each dye dissolves and sticks to the paper differently.',hint:'Think of runners with different speeds.'},
 {q:'A pure single dye on chromatography paper gives…',options:['One spot','Many colours','No spot','A black line'],answer:0,why:'A pure substance gives a single spot.',hint:'Try the blue pen.'},
 {q:'Chromatography is used to…',options:['Make ink','Separate and identify coloured substances','Boil water','Cut paper'],answer:1,why:'It separates parts of a mixture and helps identify them.',hint:'Think of the black pen.'}],
challenge:{text:'A mystery ink is run on paper. <b>Match its pattern</b> to the right pen.',win:'The green and blue pattern matches Black pen B.'},
real:['Police use chromatography to match inks and dyes.','Labs test food colours and drugs by chromatography.','Athletes are tested using related methods.'],
words:{Chromatography:'Separating mixtures by how fast parts move over paper or a gel.',Dye:'A coloured substance.',Solvent:'The liquid that climbs the paper.',Mixture:'Several substances together.'}
});
