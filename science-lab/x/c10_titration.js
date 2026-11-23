QLab.register({
id:'c10_titration',code:'10-C2',title:'Neutralise it: acid + base titration',grade:10,subject:'Chemistry',emoji:'🧪',
hook:{title:'Add base to acid drop by drop. When does it become neutral?',text:'Phenolphthalein is colourless in acid and turns pink when the acid has just been used up.'},
prior:'You know pH and indicators.',
guess:{q:'When an acid and a base react completely, what do they form?',options:['Another acid','A salt and water','Only water','A gas only'],answer:1,hint:'HCl + NaOH → NaCl + H₂O.',after:'Add base to the acid.'},
build(api){
 const chal=!!api.challenge;
 const VA=chal?20:25,CA=chal?0.08:0.10;let V=0,seen=false,logd=[];
 const pH=v=>{const nA=CA*VA,nB=0.1*v,tot=VA+v;const ex=nA-nB;if(Math.abs(ex)<1e-9)return 7;return ex>0?-Math.log10(ex/tot):14+Math.log10(-ex/tot)};
 api.ctrl.innerHTML=`<p>${chal?'Unknown HCl, 20 mL.':'0.10 M HCl, 25 mL.'} Burette: 0.10 M NaOH</p><div class="row"><button class="pri" id="a1">+1 mL</button><button class="pri" id="a2">+0.1 mL</button><button id="rs">↺ Restart</button></div><p>Added: <span class="read" id="vv"></span></p><p>pH: <b id="ph"></b></p>${chal?'<p><b>After you find the end point, what was the HCl concentration?</b></p><div class="row" id="cc">'+['0.05 M','0.08 M','0.10 M','0.16 M'].map(x=>`<button data-a="${x}">${x}</button>`).join('')+'</div>':''}`;
 const q=x=>api.ctrl.querySelector(x);
 function draw(){const p=pH(V),pink=p>8.3;
  const pts=[];for(let v=0;v<=40;v+=.5)pts.push([60+v/40*500,260-pH(v)/14*220]);
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><g stroke="#1b2a4a" stroke-width="3"><line x1="60" y1="260" x2="580" y2="260"/><line x1="60" y1="260" x2="60" y2="30"/></g><polyline fill="none" stroke="#2aa5d8" stroke-width="3" points="${pts.map(p=>p.join(',')).join(' ')}"/><circle cx="${60+Math.min(V,40)/40*500}" cy="${260-p/14*220}" r="7" fill="#e5534b"/><text x="320" y="290" text-anchor="middle" font-size="13" font-weight="700">NaOH added (mL)</text><text x="30" y="150" font-size="13" font-weight="700" transform="rotate(-90 30 150)" text-anchor="middle">pH</text>
  <path d="M640 120 V240 Q640 255 655 255 H715 Q730 255 730 240 V120" fill="none" stroke="#1b2a4a" stroke-width="4"/><rect x="643" y="140" width="84" height="113" fill="${pink?'#ff7fb8':'#f4f8ff'}" stroke="#cfdcee"/><text x="685" y="105" text-anchor="middle" font-size="13" font-weight="800">flask</text>${V>0?`<text x="600" y="60" font-size="30">💧</text>`:''}`);
  q('#vv').textContent=V.toFixed(1)+' mL';q('#ph').textContent=p.toFixed(2)+(Math.abs(p-7)<.01?'  (neutral!)':'');
  if(!chal&&pink&&V<=VA+.2&&!seen){seen=true}
  if(!chal&&seen&&V>=VA){api.award('did');api.ready()}}
 q('#a1').onclick=()=>{V=Math.min(40,Math.round((V+1)*10)/10);draw()};q('#a2').onclick=()=>{V=Math.min(40,Math.round((V+.1)*10)/10);draw()};q('#rs').onclick=()=>{V=0;seen=false;draw()};
 if(chal)q('#cc').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(V<15.5)return api.nope('First titrate: add base until the flask just turns pink, then work out the concentration.');b.dataset.a==='0.08 M'?api.solved():api.nope('At the end point moles of acid = moles of base. 0.10 × V(base) = C × 20.')});
 draw()},
why:['<span class="word">Neutralisation</span>: acid + base → salt + water. HCl + NaOH → NaCl + H₂O.','At the <b>end point</b> the acid has just been used up, so the solution is neutral (pH 7) and phenolphthalein turns pink with the next drop of base.','The pH curve is steady, then <b>jumps suddenly</b> near the end point. That is why a single drop changes the colour.','At the end point: moles of acid = moles of base, so you can find an unknown concentration.'],
check:[{q:'HCl + NaOH → ?',options:['NaCl + H₂O','NaO + HCl','Na + Cl₂','H₂'],answer:0,why:'A salt and water.',hint:'Neutralisation.'},
 {q:'pH at the exact end point (strong acid + strong base) is…',options:['1','7','10','14'],answer:1,why:'The solution is neutral.',hint:'Watch the meter.'},
 {q:'It takes 25 mL of 0.1 M NaOH for 25 mL HCl. What is the HCl concentration?',options:['0.05 M','0.1 M','0.25 M','1 M'],answer:1,why:'Equal volumes and equal moles gives equal concentration.',hint:'Compare to your experiment.'}],
challenge:{text:'20 mL of HCl of unknown strength needs <b>16 mL</b> of 0.10 M NaOH to turn pink. Titrate it, then find the <b>concentration</b>.',win:'0.10 × 16 = C × 20, so C = 0.08 M.'},
real:['Antacid tablets neutralise extra stomach acid.','Farmers add lime to acidic soil.','Water labs titrate samples to check quality.'],
words:{Neutralisation:'Acid and base reacting to make salt and water.','End point':'The moment the reaction is complete.',Titration:'Adding one solution to another to find a concentration.',Burette:'A tube for adding liquid slowly.'}
});
