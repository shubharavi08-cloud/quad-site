QLab.register({
id:'c10_oxid',code:'10-C1',title:'Oxidation around us: corrosion and rancidity',grade:10,subject:'Chemistry',emoji:'🧈',
hook:{title:'Rusty iron, green copper, black silver and smelly old oil are all caused by air.',text:'Oxygen slowly attacks many things. Pick the protection that works for each.'},
prior:'You know that iron rusts with air and water.',
guess:{q:'Oil and fat kept for months in air turn smelly and bad (rancid). Why?',options:['They freeze','They are oxidised by oxygen','They dissolve','They lose water only'],answer:1,hint:'Oxygen slowly reacts with fats.',after:'Try protecting each item.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'An item that corrodes or goes rancid, and protection tools to drag onto it'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const PR=[['Iron gate','rusts (reddish-brown)',['paint','galvanise'],'Paint or zinc stops air and water reaching the iron.'],['Copper vessel','turns green (corrosion)',['lacquer'],'A varnish or lacquer coat keeps air away. Copper is also kept clean and dry.'],['Silver spoon','turns black (tarnish)',['anti-tarnish cloth'],'Silver reacts with sulphur gases in air. Special cloths or sealed bags protect it.'],['Packet of chips','goes rancid',['nitrogen'],'Packets are flushed with nitrogen so no oxygen is left.'],['Cooking oil','goes rancid',['antioxidant'],'Antioxidants such as BHA or vitamin E react with oxygen first.']];
 const METH=[['paint','🖌️','Paint'],['galvanise','⚙️','Zinc'],['lacquer','🧴','Lacquer'],['anti-tarnish cloth','🧽','Cloth'],['nitrogen','💨','N₂ gas'],['antioxidant','🧪','Anti-ox'],['water','💧','Water']];
 const seen=new Set();let k=chal?3:0,done=false,busy=false;
 const gI=E('g',{},sc.gMain);
 const tgt=sc.vessel({x:W/2,y:P?330:300,type:'beaker',w:P?200:240,h:P?160:170,level:0,color:'#fff',label:''});tgt.g.style.opacity=0;sc.gMain.appendChild(gI);
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 function q(x){return api.ctrl.querySelector(x)}
 function draw(){gI.innerHTML='';const p=PR[k],cx=W/2,cy=P?250:225,ok=done;
  const dmg=!ok,rustC=k===0?'#b4562a':k===1?'#3a9d7e':k===2?'#222':'#c9a227';
  if(k===0){E('rect',{x:cx-90,y:cy-70,width:12,height:130,fill:ok?'#6b7690':'#8a929c'},gI);E('rect',{x:cx+78,y:cy-70,width:12,height:130,fill:ok?'#6b7690':'#8a929c'},gI);for(let i=0;i<5;i++)E('rect',{x:cx-78+i*31,y:cy-60,width:8,height:110,fill:ok?'#2e7d5b':(dmg?'#a8643a':'#8a929c')},gI)}
  else if(k===1){E('path',{d:`M${cx-70} ${cy-40} Q${cx-70} ${cy+60} ${cx} ${cy+60} Q${cx+70} ${cy+60} ${cx+70} ${cy-40}Z`,fill:ok?'#d8863f':'#7fc9a8',stroke:'#5a3a1a','stroke-width':3},gI);E('rect',{x:cx-80,y:cy-48,width:160,height:12,rx:5,fill:ok?'#d8863f':'#6fb898'},gI)}
  else if(k===2){E('ellipse',{cx:cx,cy:cy-20,rx:42,ry:60,fill:ok?'#e6e9ef':'#3a3a42',stroke:'#555','stroke-width':3},gI);E('rect',{x:cx-8,y:cy+30,width:16,height:80,rx:6,fill:ok?'#e6e9ef':'#3a3a42',stroke:'#555','stroke-width':3},gI)}
  else if(k===3){E('path',{d:`M${cx-70} ${cy-70} h140 v130 h-140z`,fill:'#ffcf4a',stroke:'#c9a227','stroke-width':3},gI);T(gI,cx,cy-5,'CHIPS',{'font-size':22,'font-weight':900,fill:'#c0281d',class:''});if(!ok)T(gI,cx,cy+35,'🤢 rancid',{'font-size':15,'font-weight':800,class:''});else T(gI,cx,cy+35,'💨 N₂ inside',{'font-size':13,'font-weight':800,class:''})}
  else{E('rect',{x:cx-40,y:cy-60,width:80,height:130,rx:12,fill:ok?'#ffe9a3':'#c9a227',stroke:'#8a6d10','stroke-width':3},gI);T(gI,cx,cy+10,'OIL',{'font-size':20,'font-weight':900,class:''})}
  if(dmg&&k<3)for(let i=0;i<7;i++)E('circle',{cx:cx-50+(i*37%100),cy:cy-30+(i*23%70),r:5+i%3,fill:rustC,opacity:.7},gI);
  T(gI,W/2,P?96:96,p[0]+(ok?': ✅ protected':': in air it '+p[1]),{'font-size':P?13:17,'font-weight':900,fill:ok?'#2e9d5b':'#c0281d',class:''})}
 sc.item=i=>{if(chal||busy)return;k=i;done=false;draw();q('#it').querySelectorAll('button').forEach(x=>x.className=+x.dataset.i===i?'pri':'')};
 sc.protect=m=>{if(busy)return;const p=PR[k];
  if(p[2].includes(m)){done=true;draw();L.snd.ok&&L.snd.ok();sc.say('✅ '+p[3],'ok');seen.add(k);if(chal)api.solved();else if(seen.size>=4){api.award('did');api.ready()}}
  else{L.snd.no&&L.snd.no();const msg=m==='water'?'❌ Water makes most of these worse!':'❌ That does not help this item. Think: what is attacking it?';sc.say(msg,'warn');if(chal)api.nope('That will not stop oxygen from reaching the chips. Think about what you can fill the packet with.')}};
 const n=METH.length;METH.forEach((m,i)=>sc.tool({x:P?36+i*58:W*.1+i*(W*.8/(n-1)),y:P?492:384,label:m[2],ly:P?32:34,scale:P?.7:.85,draw:g=>T(g,0,10,m[1],{'font-size':28,class:''}),use:()=>sc.protect(m[0])}));
 api.ctrl.innerHTML=`${chal?'<p style="margin:0 0 6px;font-size:14px"><b>Chips go rancid in air. Drag a protection onto the packet.</b></p>':'<p style="margin:0 0 4px;font-size:14px"><b>Pick an item</b>, then <b>drag a protection onto it</b>.</p><div class="row" id="it" style="flex-wrap:wrap">'+PR.map((p,i)=>`<button data-i="${i}">${p[0]}</button>`).join('')+'</div><p class="lockhint" style="margin:6px 0 0;text-align:left">Protect 4 different items to unlock the next step.</p>'}`;
 if(!chal){q('#it').querySelectorAll('button').forEach(b=>b.onclick=()=>sc.item(+b.dataset.i));q('#it button').className='pri'}
 draw();sc.say(chal?'What keeps oxygen away from the chips?':'Pick an item and protect it.')},
demo:[[S=>S.protect('water'),'Water does not help. It makes rust worse.',900],[S=>S.protect('paint'),'Paint keeps air and water off the iron: protected.',1000],[S=>S.item(3),'Now the packet of chips.',700],[S=>S.protect('nitrogen'),'Nitrogen pushes the oxygen out, so the chips stay fresh.',1000]],
why:['<span class="word">Oxidation</span> is when a substance gains oxygen (or loses electrons). Air slowly oxidises many things.','<b>Corrosion</b> is the slow eating away of metals: iron rusts, copper turns green, silver turns black.','<b>Rancidity</b> is when fats and oils are oxidised and smell and taste bad.','Protection: paint, oil, galvanising (zinc coat), lacquer, airtight packing with nitrogen, and <span class="word">antioxidants</span>.'],
check:[{q:'Chips packets are filled with…',options:['Oxygen','Nitrogen','Carbon dioxide only','Water vapour'],answer:1,why:'Nitrogen is unreactive, so the fat does not turn rancid.',hint:'No oxygen wanted.'},
 {q:'Green coating on copper vessels is…',options:['Rust','Corrosion','Rancidity','Paint'],answer:1,why:'It is copper corroding in air.',hint:'Metals corrode.'},
 {q:'An antioxidant protects food by…',options:['Adding oxygen','Reacting with oxygen first','Freezing it','Adding sugar'],answer:1,why:'It uses up the oxygen before the food does.',hint:'It is a sacrificial guard.'}],
challenge:{text:'Keep a <b>packet of chips</b> from going rancid. Choose the right protection.',win:'Nitrogen flushing: no oxygen, no rancidity.'},
real:['Galvanised roofing sheets last for decades.','Old brass lamps are polished to remove tarnish.','Bakers add antioxidants to extend shelf life.'],
words:{Oxidation:'Gaining oxygen.',Corrosion:'Metal being slowly eaten by air and moisture.',Rancidity:'Fat or oil going bad by oxidation.',Antioxidant:'A substance that stops oxidation.'}
});
