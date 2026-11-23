QLab.register({
id:'c10_oxid',code:'10-C1',title:'Oxidation around us: corrosion and rancidity',grade:10,subject:'Chemistry',emoji:'🧈',
hook:{title:'Rusty iron, green copper, black silver and smelly old oil are all caused by air.',text:'Oxygen slowly attacks many things. Pick the protection that works for each.'},
prior:'You know that iron rusts with air and water.',
guess:{q:'Oil and fat kept for months in air turn smelly and bad (rancid). Why?',options:['They freeze','They are oxidised by oxygen','They dissolve','They lose water only'],answer:1,hint:'Oxygen slowly reacts with fats.',after:'Try protecting each item.'},
build(api){
 const chal=!!api.challenge;
 const P=[['Iron gate','rusts (reddish-brown)',['paint','galvanise'],'Paint or zinc stops air and water reaching the iron.'],['Copper vessel','turns green (corrosion)',['lacquer'],'A varnish or lacquer coat keeps air away. Copper is also kept clean and dry.'],['Silver spoon','turns black (tarnish)',['anti-tarnish cloth'],'Silver reacts with sulphur gases in air. Special cloths or sealed bags protect it.'],['Packet of chips','goes rancid',['nitrogen'],'Packets are flushed with nitrogen so no oxygen is left.'],['Cooking oil','goes rancid',['antioxidant'],'Antioxidants such as BHA or vitamin E react with oxygen first.']];
 const METH=['paint','galvanise','lacquer','anti-tarnish cloth','nitrogen','antioxidant','water'];
 const seen=new Set();let k=0,pick=null;const ord=chal?[3]:[0,1,2,3,4];
 api.ctrl.innerHTML=`${chal?'':'<div class="row" id="it" style="flex-wrap:wrap">'+P.map((p,i)=>`<button data-i="${i}">${p[0]}</button>`).join('')+'</div>'}<b>Choose a protection</b><div class="row" id="mt" style="flex-wrap:wrap">${METH.map(m=>`<button data-m="${m}">${m}</button>`).join('')}</div><p id="fb" style="font-weight:800"></p>`;
 const q=s=>api.ctrl.querySelector(s);k=chal?3:0;
 function draw(res){const p=P[k];api.stage.innerHTML=QLab.svg(760,280,`<rect width="760" height="280" fill="#fff"/><rect x="200" y="50" width="360" height="130" rx="20" fill="#f1f5ff" stroke="#8aa0c8" stroke-width="3"/><text x="380" y="105" text-anchor="middle" font-size="24" font-weight="800">${p[0]}</text><text x="380" y="140" text-anchor="middle" font-size="16" fill="#d9534f">${res==='ok'?'✅ protected':'in air it '+p[1]}</text>`)}
 if(!chal)q('#it').querySelectorAll('button').forEach(b=>b.onclick=()=>{k=+b.dataset.i;q('#it').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');q('#fb').textContent='';draw()});
 q('#mt').querySelectorAll('button').forEach(b=>b.onclick=()=>{const m=b.dataset.m,p=P[k];
  if(p[2].includes(m)){draw('ok');q('#fb').textContent='✅ '+p[3];seen.add(k);if(chal)api.solved();else if(seen.size>=4){api.award('did');api.ready()}}
  else{q('#fb').textContent=m==='water'?'❌ Water makes most of these worse!':'❌ That does not help this item. Think: what is attacking it?';if(chal)api.nope('That will not stop oxygen from reaching the chips. Think about what you can fill the packet with.')}});
 draw()},
why:['<span class="word">Oxidation</span> is when a substance gains oxygen (or loses electrons). Air slowly oxidises many things.','<b>Corrosion</b> is the slow eating away of metals: iron rusts, copper turns green, silver turns black.','<b>Rancidity</b> is when fats and oils are oxidised and smell and taste bad.','Protection: paint, oil, galvanising (zinc coat), lacquer, airtight packing with nitrogen, and <span class="word">antioxidants</span>.'],
check:[{q:'Chips packets are filled with…',options:['Oxygen','Nitrogen','Carbon dioxide only','Water vapour'],answer:1,why:'Nitrogen is unreactive, so the fat does not turn rancid.',hint:'No oxygen wanted.'},
 {q:'Green coating on copper vessels is…',options:['Rust','Corrosion','Rancidity','Paint'],answer:1,why:'It is copper corroding in air.',hint:'Metals corrode.'},
 {q:'An antioxidant protects food by…',options:['Adding oxygen','Reacting with oxygen first','Freezing it','Adding sugar'],answer:1,why:'It uses up the oxygen before the food does.',hint:'It is a sacrificial guard.'}],
challenge:{text:'Keep a <b>packet of chips</b> from going rancid. Choose the right protection.',win:'Nitrogen flushing: no oxygen, no rancidity.'},
real:['Galvanised roofing sheets last for decades.','Old brass lamps are polished to remove tarnish.','Bakers add antioxidants to extend shelf life.'],
words:{Oxidation:'Gaining oxygen.',Corrosion:'Metal being slowly eaten by air and moisture.',Rancidity:'Fat or oil going bad by oxidation.',Antioxidant:'A substance that stops oxidation.'}
});
