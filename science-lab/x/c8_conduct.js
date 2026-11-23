QLab.register({
id:'c8_conduct',code:'8-C3',title:'Conductors and insulators',grade:8,subject:'Chemistry',emoji:'🔌',
hook:{title:'Why are wires made of metal but covered in plastic?',text:'Place different objects in a simple circuit. If the bulb glows, electricity can flow through the object.'},
prior:'Know that a bulb lights when a circuit is complete.',
guess:{q:'Which of these will let electricity flow through it?',options:['A plastic ruler','An iron nail','A rubber eraser','A dry wooden stick'],answer:1,hint:'Wires inside your home are made of copper.',after:'Test them in the circuit.'},
build(api){
 const chal=!!api.challenge;
 const M=[['copper wire','🟠',1],['iron nail','🔩',1],['aluminium foil','🪙',1],['steel spoon','🥄',1],['pencil lead (graphite)','✏️',1],['plastic ruler','📏',0],['rubber eraser','🧽',0],['dry wood','🪵',0],['glass','🥃',0],['cloth','🧵',0]];
 let cur=null;const log={};
 api.ctrl.innerHTML=`<b>Put an object in the gap</b><div class="row" id="ob" style="flex-wrap:wrap">${M.map((m,i)=>`<button data-i="${i}">${m[1]} ${m[0]}</button>`).join('')}</div><p id="res" style="font-weight:800"></p><div id="tbl" style="font-size:14px"></div>${chal?'<p><b>Which bench object is NOT a metal but still conducts?</b></p><div class="row" id="ans"></div>':''}`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(){const on=cur!==null&&M[cur][2];
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/><g stroke="#1b2a4a" stroke-width="5" fill="none"><path d="M120 150 V70 H640 V150"/><path d="M120 150 V240 H300"/><path d="M460 240 H640 V150"/></g>
  <rect x="300" y="215" width="160" height="50" rx="10" fill="${cur!==null?'#f1f5ff':'none'}" stroke="#8aa0c8" stroke-dasharray="6 5" stroke-width="3"/><text x="380" y="247" text-anchor="middle" font-size="${cur!==null?15:13}" font-weight="800">${cur!==null?M[cur][1]+' '+M[cur][0]:'object goes here'}</text>
  <circle cx="380" cy="70" r="34" fill="${on?'#ffe14d':'#e9edf5'}" stroke="#1b2a4a" stroke-width="4"/>${on?'<g stroke="#f0a800" stroke-width="4"><path d="M380 14V26M330 30L338 40M430 30L422 40M320 70H334M440 70H426"/></g>':''}<text x="380" y="78" text-anchor="middle" font-size="22">💡</text>
  <rect x="104" y="140" width="32" height="60" rx="6" fill="#ffb347" stroke="#1b2a4a" stroke-width="3"/><text x="120" y="176" text-anchor="middle" font-size="14" font-weight="800">+ −</text>
  <text x="380" y="130" text-anchor="middle" font-size="16" font-weight="800" fill="${on?'#2f9e5b':'#55688a'}">${cur===null?'':on?'Bulb glows: it conducts':'Bulb stays off: it does not conduct'}</text>`)}
 q('#ob').querySelectorAll('button').forEach(b=>b.onclick=()=>{cur=+b.dataset.i;q('#ob').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');log[M[cur][0]]=M[cur][2];draw();
  q('#res').textContent=M[cur][2]?'✅ Conductor':'❌ Insulator';q('#tbl').textContent='Tested '+Object.keys(log).length+' of '+M.length;
  if(!chal&&Object.keys(log).length>=8&&new Set(Object.values(log)).size===2){api.award('did');api.ready()}});
 if(chal){const o=['copper wire','pencil lead (graphite)','glass','iron nail'];q('#ans').innerHTML=o.map(x=>`<button data-a="${x}">${x}</button>`).join('');q('#ans').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='pencil lead (graphite)'?api.solved():api.nope(b.dataset.a==='glass'?'Glass is a non-metal, but it did not light the bulb. Test it.':'That is a metal. Look for a non-metal that lights the bulb.'))}
 draw()},
why:['A <span class="word">conductor</span> lets electricity pass through. <b>Metals</b> such as copper, iron and aluminium are good conductors.','An <span class="word">insulator</span> does not let electricity pass. Plastic, rubber, wood, glass and cloth are insulators.','Most non-metals are insulators, but <b>graphite</b> (pencil lead) is a non-metal that <b>does conduct</b>.','That is why wires have a metal core to carry current and a plastic coat to keep us safe.'],
check:[{q:'Which of these is an insulator?',options:['Copper wire','Aluminium foil','Rubber eraser','Iron nail'],answer:2,why:'Rubber does not let electricity pass.',hint:'The bulb stayed off.'},
 {q:'Why are electric wires covered in plastic?',options:['To look nice','Plastic is an insulator, so it keeps us safe','Plastic carries the current','To make them heavier'],answer:1,why:'The plastic coat stops current from leaking into us.',hint:'Think about what an insulator does.'},
 {q:'Pencil lead is a non-metal. Does it conduct?',options:['No, never','Yes, graphite conducts','Only when hot','Only when wet'],answer:1,why:'Graphite is the well-known non-metal that conducts.',hint:'You tested it.'}],
challenge:{text:'Find the object that is <b>not a metal</b> but still lights the bulb. Test the objects, then choose.',win:'Graphite, the pencil lead, is a non-metal conductor.'},
real:['Electricians use screwdrivers with plastic handles.','Cooking pans are metal (conducts heat) with wooden or plastic handles.','Electric poles have glass or ceramic discs to stop current flowing into the pole.'],
words:{Conductor:'Lets electricity pass.',Insulator:'Does not let electricity pass.',Circuit:'A complete path for current.',Graphite:'A form of carbon that conducts.'}
});
