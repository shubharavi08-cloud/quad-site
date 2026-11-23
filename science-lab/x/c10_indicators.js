QLab.register({
id:'c10_indicators',code:'10-C2',title:'Indicators and the pH scale',grade:10,subject:'Chemistry',emoji:'🌈',
hook:{title:'How can colour tell us if something is acidic or basic?',text:'Test everyday liquids with litmus, phenolphthalein, methyl orange and universal indicator.'},
prior:'You have tasted lemon (sour) and felt soap (slippery).',
guess:{q:'Blue litmus paper dipped in lemon juice turns…',options:['Red','Stays blue','Green','White'],answer:0,hint:'Acids turn blue litmus red.',after:'Test other liquids.'},
build(api){
 const chal=!!api.challenge;
 const S=[['Stomach acid (HCl)',1],['Lemon juice',2],['Vinegar',3],['Tomato juice',4.5],['Pure water',7],['Baking soda solution',8.3],['Soap solution',10],['Washing soda',11],['Sodium hydroxide',13]];
 const IN={'Blue litmus':p=>p<7?['#e5534b','red']:['#4a6cf7','blue'],'Red litmus':p=>p>7?['#4a6cf7','blue']:['#e5534b','red'],'Phenolphthalein':p=>p>8.3?['#ff5fa8','pink']:['#f4f8ff','colourless'],'Methyl orange':p=>p<3.1?['#e5534b','red']:p<4.4?['#f08a3c','orange']:['#f2d84a','yellow'],'Universal indicator':p=>{const c=['#d62828','#e5534b','#f27c3c','#f5a623','#f2d84a','#9ad04f','#3fa34d','#2f9e8f','#2a7fd1','#3b5bdb','#4c3fd1','#5a2fb8','#6a1fa0','#5b1486'];return[c[Math.min(13,Math.max(0,Math.round(p)-1))],'pH '+p]}};
 let s=0,ind='Blue litmus';const log=new Set();
 api.ctrl.innerHTML=`<b>Solution</b><div class="row" id="so" style="flex-wrap:wrap">${S.map((x,i)=>`<button data-i="${i}">${x[0]}</button>`).join('')}</div><b>Indicator</b><div class="row" id="in" style="flex-wrap:wrap">${Object.keys(IN).map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div><button class="pri" id="go2">🧪 Add the indicator</button><p id="rs" style="font-weight:800"></p>${chal?'<p><b>The mystery liquid turns red litmus blue and phenolphthalein pink. It is…</b></p><div class="row" id="my"><button data-a="acid">An acid</button><button data-a="base">A base</button><button data-a="neutral">Neutral</button></div>':''}`;
 const q=x=>api.ctrl.querySelector(x);let added=false;
 function draw(){const p=S[s][1],c=added?IN[ind](p):null;
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/><path d="M300 70 V235 Q300 250 315 250 H445 Q460 250 460 235 V70" fill="none" stroke="#1b2a4a" stroke-width="5"/><rect x="303" y="110" width="154" height="138" fill="${c?c[0]:'#e8f3fb'}" opacity=".9"/><text x="380" y="45" text-anchor="middle" font-size="18" font-weight="800">${S[s][0]}</text><text x="380" y="285" text-anchor="middle" font-size="14">${c?ind+': '+c[1]:'add an indicator'}</text>
  <g transform="translate(560,70)">${[1,3,5,7,9,11,13].map((v,i)=>`<rect x="0" y="${i*26}" width="40" height="24" fill="${IN['Universal indicator'](v)[0]}"/><text x="48" y="${i*26+17}" font-size="12">pH ${v}${v===7?' neutral':v<7?' acid':' base'}</text>`).join('')}</g>`)}
 q('#so').querySelectorAll('button').forEach(b=>b.onclick=()=>{s=+b.dataset.i;added=false;q('#so').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');q('#rs').textContent='';draw()});
 q('#in').querySelectorAll('button').forEach(b=>b.onclick=()=>{ind=b.dataset.k;added=false;q('#in').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});
 q('#go2').onclick=()=>{added=true;draw();const p=S[s][1];q('#rs').textContent=`pH ${p}: ${p<7?'acidic':p>7?'basic':'neutral'}`;log.add(s+ind);if(!chal&&log.size>=6&&new Set([...log].map(x=>x.replace(/\D/g,''))).size>=3){api.award('did');api.ready()}};
 if(chal)q('#my').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='base'?api.solved():api.nope('Red litmus turns blue only in a base. Phenolphthalein turns pink only in a base.'));
 q('#so button').className='pri';q('#in button').className='pri';draw()},
why:['An <span class="word">indicator</span> changes colour depending on whether a solution is acidic or basic.','<b>Blue litmus</b> turns red in acid. <b>Red litmus</b> turns blue in a base. <b>Phenolphthalein</b> is colourless in acid and pink in a base. <b>Methyl orange</b> is red in acid and yellow in a base.','The <span class="word">pH scale</span> runs from 0 to 14. Below 7 is acidic, 7 is neutral (pure water) and above 7 is basic.','<b>Universal indicator</b> gives a different colour for each pH, so you can read the number.'],
check:[{q:'A solution has pH 3. It is…',options:['Acidic','Basic','Neutral','Salt'],answer:0,why:'Below 7 is acidic.',hint:'Lower than 7.'},
 {q:'Which indicator turns pink in a base?',options:['Blue litmus','Methyl orange','Phenolphthalein','Universal indicator'],answer:2,why:'Phenolphthalein is pink in bases.',hint:'Try the soap solution.'},
 {q:'Pure water has a pH of…',options:['0','7','10','14'],answer:1,why:'Pure water is neutral.',hint:'Middle of the scale.'}],
challenge:{text:'A mystery liquid turns <b>red litmus blue</b> and <b>phenolphthalein pink</b>. What is it?',win:'Both clues point to a base.'},
real:['Doctors and farmers test pH of soil, blood and water.','Antacids are bases that neutralise stomach acid.','Red cabbage juice is a natural indicator.'],
words:{Indicator:'A substance that changes colour in acid or base.',pH:'A number showing how acidic or basic a solution is.',Acid:'pH below 7.',Base:'pH above 7.',Neutral:'pH 7.'}
});
