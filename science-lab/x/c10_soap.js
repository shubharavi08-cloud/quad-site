QLab.register({
id:'c10_soap',code:'10-C4',title:'Soap, scum and hard water',grade:10,subject:'Chemistry',emoji:'🧼',
hook:{title:'In some towns soap hardly lathers and leaves a grey scum. Why?',text:'Hard water holds calcium and magnesium. Soap and detergent react with them differently.'},
prior:'You know soap cleans grease.',
guess:{q:'In hard water, soap…',options:['Lathers extra well','Forms scum with calcium and magnesium','Dissolves the minerals','Turns into acid'],answer:1,hint:'Grey sticky film.',after:'Test the water.'},
build(api){
 const chal=!!api.challenge;
 let water='soft',agent='soap',n=0;const seen=new Set();
 api.ctrl.innerHTML=chal?`<p><b>You must wash clothes in hard water with the least scum. Choose:</b></p><div class="row" id="fm">${['Soap','Detergent','Plain water','Salt'].map(x=>`<button data-a="${x}">${x}</button>`).join('')}</div>`:`<b>Water</b><div class="row" id="ww"><button data-w="soft">Soft</button><button data-w="hard">Hard</button></div><b>Cleaner</b><div class="row" id="aa"><button data-a="soap">Soap</button><button data-a="det">Detergent</button></div><button class="pri" id="sh">🫧 Shake</button><p id="st" style="font-weight:800"></p>`;
 const q=x=>api.ctrl.querySelector(x);
 function draw(){const scum=n&&water==='hard'&&agent==='soap',lather=n&&!scum;api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><path d="M300 90 V245 Q300 260 315 260 H445 Q460 260 460 245 V90" fill="none" stroke="#1b2a4a" stroke-width="5"/><rect x="303" y="140" width="154" height="118" fill="${water==='hard'?'#e3e7ea':'#e8f3fb'}"/>${lather?'<g fill="#fff" stroke="#9ec8e8"><circle cx="330" cy="135" r="12"/><circle cx="360" cy="125" r="14"/><circle cx="395" cy="132" r="13"/><circle cx="425" cy="128" r="11"/></g>':''}${scum?'<rect x="310" y="190" width="140" height="18" rx="8" fill="#b9b2a0"/>':''}<text x="380" y="40" text-anchor="middle" font-size="18" font-weight="800">${chal?'Hard water':water+' water + '+(agent==='soap'?'soap':'detergent')}</text>`);
  if(q('#st'))q('#st').textContent=!n?'Press Shake':scum?'Grey scum forms. Little lather. Ca²⁺/Mg²⁺ + soap → insoluble scum.':'Good lather, no scum.';
  if(!chal&&n){seen.add(water+agent);if(seen.size>=4){api.award('did');api.ready()}}}
 if(!chal){q('#ww').querySelectorAll('button').forEach(b=>b.onclick=()=>{water=b.dataset.w;n=0;draw()});q('#aa').querySelectorAll('button').forEach(b=>b.onclick=()=>{agent=b.dataset.a;n=0;draw()});q('#sh').onclick=()=>{n=1;draw()}}
 else q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='Detergent'?api.solved():api.nope('Soap makes scum in hard water. Which cleaner does not?'));
 draw()},
why:['<span class="word">Soap</span> is the sodium or potassium salt of a long-chain fatty acid. One end loves water, the other loves grease.','Soap molecules surround grease and lift it into the water as <b>micelles</b>.','In <b>hard water</b>, calcium and magnesium ions react with soap to form insoluble <b>scum</b>, so more soap is wasted.','<b>Detergents</b> have salts that stay soluble with Ca²⁺ and Mg²⁺, so they lather in hard water.'],
check:[{q:'What makes water hard?',options:['Dissolved Ca²⁺ and Mg²⁺','Too much air','Chlorine','Sand'],answer:0,why:'Calcium and magnesium salts.',hint:'Metal ions.'},
 {q:'The grey film with soap in hard water is…',options:['Grease','Scum','Rust','Soot'],answer:1,why:'Insoluble calcium/magnesium soap.',hint:'It does not dissolve.'},
 {q:'Which cleaner works best in hard water?',options:['Soap','Detergent','Neither','Both equally'],answer:1,why:'Its calcium salts are soluble.',hint:'Not soap.'}],
challenge:{text:'You must wash clothes in <b>hard water</b> with the least scum. Which cleaner?',win:'Detergent: no scum in hard water.'},
real:['Boiling or adding washing soda can soften temporary hard water.','Kettles get white limescale in hard water areas.','Most shampoos and washing liquids are detergents.'],
words:{Soap:'Salt of a fatty acid, used for cleaning.',Micelle:'Cluster of soap around grease.','Hard water':'Water rich in Ca²⁺ and Mg²⁺.',Detergent:'Synthetic cleaning agent.'}
});
