QLab.register({
id:'c10_ethanol',code:'10-C4',title:'Ethanol and ethanoic acid',grade:10,subject:'Chemistry',emoji:'🧪',
hook:{title:'Vinegar is sour. Spirit is not. Yet they are close cousins made of carbon, hydrogen and oxygen.',text:'Two groups of atoms give ethanol and ethanoic acid their personalities. Test them.'},
prior:'You know carbon compounds burn and form molecules.',
guess:{q:'Which carbon compound is in vinegar?',options:['Ethanol','Ethanoic acid','Methane','Glucose'],answer:1,hint:'It is sour and acidic.',after:'Test both.'},
build(api){
 const chal=!!api.challenge;
 const S={Ethanol:{f:'C₂H₅OH',g:'−OH (alcohol)',litmus:'No change (neutral)',soda:'No fizz',burn:'Burns with a blue flame',smell:'Pleasant spirit smell'},'Ethanoic acid':{f:'CH₃COOH',g:'−COOH (acid)',litmus:'Blue litmus turns red',soda:'Fizzes: CO₂ is released',burn:'Hard to burn',smell:'Sharp vinegar smell'}};
 let k='Ethanol';const seen=new Set();
 api.ctrl.innerHTML=chal?`<p><b>A clear liquid turns blue litmus red and fizzes with sodium carbonate. It is…</b></p><div class="row" id="fm">${['Ethanol','Ethanoic acid','Water','Methane'].map(x=>`<button data-a="${x}">${x}</button>`).join('')}</div>`:`<div class="row" id="pp">${Object.keys(S).map(x=>`<button data-k="${x}">${x}</button>`).join('')}</div><div class="row" id="tt">${[['Litmus','litmus'],['Washing soda','soda'],['Flame','burn'],['Smell','smell']].map(([l,v])=>`<button data-t="${v}">${l}</button>`).join('')}</div><p id="st" style="font-weight:800"></p>`;
 const q=x=>api.ctrl.querySelector(x);
 function draw(r){api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/><path d="M300 90 V245 Q300 260 315 260 H445 Q460 260 460 245 V90" fill="none" stroke="#1b2a4a" stroke-width="5"/><rect x="303" y="140" width="154" height="118" fill="${k==='Ethanol'?'#e8f3fb':'#fff7d6'}"/><text x="380" y="40" text-anchor="middle" font-size="20" font-weight="800">${chal?'Unknown liquid':k+'  '+S[k].f}</text><text x="380" y="70" text-anchor="middle" font-size="15">${chal?'':'Group: '+S[k].g}</text>${r&&r.includes('fizz')?'<g fill="#fff" stroke="#8ec9ff"><circle cx="350" cy="200" r="6"/><circle cx="385" cy="170" r="5"/><circle cx="410" cy="215" r="7"/></g>':''}`)}
 if(!chal){q('#pp').querySelectorAll('button').forEach(b=>b.onclick=()=>{k=b.dataset.k;q('#st').textContent='';q('#pp').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');draw()});q('#pp button').className='pri';
  q('#tt').querySelectorAll('button').forEach(b=>b.onclick=()=>{const r=S[k][b.dataset.t];q('#st').textContent=r;seen.add(k+b.dataset.t);draw(r);if(seen.size>=8){api.award('did');api.ready()}})}
 else q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='Ethanoic acid'?api.solved():api.nope('Acids turn blue litmus red and release CO₂ from carbonates.'));
 draw()},
why:['<b>Ethanol</b> (C₂H₅OH) has the <b>−OH</b> alcohol group. It is neutral and burns cleanly.','<b>Ethanoic acid</b> (CH₃COOH) has the <b>−COOH</b> group. It is a weak acid: it turns blue litmus red and fizzes with carbonates.','Ethanol + ethanoic acid (with a little acid catalyst) make a sweet-smelling <span class="word">ester</span>.','The functional group decides how a carbon compound behaves.'],
check:[{q:'Which group makes ethanoic acid acidic?',options:['−OH','−COOH','−CH₃','−Cl'],answer:1,why:'The carboxylic acid group.',hint:'It has 2 oxygens.'},
 {q:'What does ethanoic acid do to washing soda?',options:['Nothing','Fizzes','Turns blue','Explodes'],answer:1,why:'It releases CO₂.',hint:'Like HCl.'},
 {q:'Ethanol with litmus gives…',options:['Red','Blue to red','No change','Green'],answer:2,why:'It is neutral.',hint:'Not an acid.'}],
challenge:{text:'A liquid turns blue litmus red and fizzes with sodium carbonate. <b>What is it?</b>',win:'Ethanoic acid: the −COOH group.'},
real:['Vinegar is about 5 to 8 percent ethanoic acid.','Ethanol is used as a solvent and fuel blended in petrol.','Esters give fruits and perfumes their smells.'],
words:{'Functional group':'Part of a molecule that decides its behaviour.',Ester:'Sweet-smelling compound from alcohol + acid.',Alcohol:'Compound with −OH.','Carboxylic acid':'Compound with −COOH.'}
});
