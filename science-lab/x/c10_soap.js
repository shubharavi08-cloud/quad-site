QLab.register({
id:'c10_soap',code:'10-C4',title:'Soap, scum and hard water',grade:10,subject:'Chemistry',emoji:'🧼',
hook:{title:'In some towns soap hardly lathers and leaves a grey scum. Why?',text:'Hard water holds calcium and magnesium. Soap and detergent react with them differently.'},
prior:'You know soap cleans grease.',
guess:{q:'In hard water, soap…',options:['Lathers extra well','Forms scum with calcium and magnesium','Dissolves the minerals','Turns into acid'],answer:1,hint:'Grey sticky film.',after:'Test the water.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A beaker of soft or hard water; drag soap or detergent into it and see lather or scum'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 let water=chal?'hard':'soft',agent=null,busy=false;const seen=new Set();
 const bx=W/2,by=P?330:300;
 const gF=E('g',{},sc.gMain);
 const bk=sc.vessel({x:bx,y:by,type:'beaker',w:150,h:150,level:.55,color:'#e8f3fb',label:'',data:{k:'b'}});
 sc.gMain.appendChild(gF);
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 function q(x){return api.ctrl.querySelector(x)}
 function draw(res){gF.innerHTML='';const top=by-150*.55-8;
  if(res==='lather')for(let i=0;i<8;i++)E('circle',{cx:bx-52+(i%4)*34+(i>3?14:0),cy:top-(i>3?20:4),r:13-(i%3),fill:'#fff',stroke:'#9ec8e8','stroke-width':1.5},gF);
  if(res==='scum')E('rect',{x:bx-58,y:by-150*.55+12,width:116,height:16,rx:8,fill:'#b9b2a0'},gF);
  T(gF,W/2,P?100:98,(water==='hard'?'Hard':'Soft')+' water'+(agent?' + '+(agent==='soap'?'soap':'detergent'):''),{'font-size':P?14:18,'font-weight':900,fill:'#2b2350',class:''})}
 sc.water=w=>{if(busy||chal)return;water=w;agent=null;bk.setColor(w==='hard'?'#e3e7ea':'#e8f3fb');if(q('#ww'))q('#ww').querySelectorAll('button').forEach(b=>b.className=b.dataset.w===w?'pri':'');if(q('#st'))q('#st').textContent='';draw()};
 sc.add=async a=>{if(busy)return;busy=true;agent=a;draw();bk.bubbles&&bk.bubbles(900,8,'#fff');L.snd.fizz&&L.snd.fizz();await sc.sleep(800);
  const scum=water==='hard'&&a==='soap';draw(scum?'scum':'lather');
  const msg=scum?'Grey scum forms. Little lather. Ca²⁺/Mg²⁺ + soap → insoluble scum.':'Good lather, no scum.';sc.say(msg,scum?'warn':'ok');if(q('#st'))q('#st').textContent=msg;
  if(chal){if(!scum)api.solved()}else{seen.add(water+a);if(seen.size>=4){api.award('did');api.ready()}}busy=false};
 sc.tool({x:P?80:W*.3,y:P?492:384,label:'Soap',ly:30,scale:1,draw:g=>{E('rect',{x:-22,y:-12,width:44,height:24,rx:8,fill:'#ffd1e3',stroke:'#c06090','stroke-width':2},g)},use:()=>sc.add('soap')});
 sc.tool({x:P?250:W*.5,y:P?492:384,label:'Detergent',ly:30,scale:1,draw:g=>{E('rect',{x:-13,y:-20,width:26,height:38,rx:6,fill:'#8ecbff',stroke:'#2b6cb0','stroke-width':2},g);E('rect',{x:-6,y:-28,width:12,height:9,fill:'#2b6cb0'},g)},use:()=>sc.add('det')});
 api.ctrl.innerHTML=chal?`<p style="margin:0 0 6px;font-size:14px"><b>You must wash clothes in hard water with the least scum.</b> Drag a cleaner into the beaker to test it, then choose:</p><div class="row" id="fm" style="flex-wrap:wrap">${['Soap','Detergent','Plain water','Salt'].map(x=>`<button data-a="${x}">${x}</button>`).join('')}</div>`:`<p style="margin:0 0 4px;font-size:14px"><b>Pick the water</b>, then <b>drag soap or detergent into the beaker</b>.</p><div class="row" id="ww"><button data-w="soft" class="pri">Soft water</button><button data-w="hard">Hard water</button></div><p id="st" style="font-weight:800;margin:4px 0"></p><p class="lockhint" style="margin:0;text-align:left">Try both cleaners in both kinds of water to unlock the next step.</p>`;
 if(chal)q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.a==='Detergent'){L.snd.ok&&L.snd.ok();api.solved()}else{L.snd.no&&L.snd.no();api.nope('Detergent does not form scum with hard water, so it gives lather.')}});
 else q('#ww').querySelectorAll('button').forEach(b=>b.onclick=()=>sc.water(b.dataset.w));
 bk.setColor(water==='hard'?'#e3e7ea':'#e8f3fb');draw();sc.say(chal?'Try soap and detergent in the hard water.':'Pick water, then add a cleaner.')},
demo:[[S=>S.add('soap'),'Soap in soft water: plenty of lather.',1300],[S=>S.water('hard'),'Now hard water.',700],[S=>S.add('soap'),'Soap in hard water: grey scum, little lather.',1300],[S=>S.add('det'),'Detergent works in hard water. Lather and no scum.',1300]],
why:['<span class="word">Soap</span> is the sodium or potassium salt of a long-chain fatty acid. One end loves water, the other loves grease.','Soap molecules surround grease and lift it into the water as <b>micelles</b>.','In <b>hard water</b>, calcium and magnesium ions react with soap to form insoluble <b>scum</b>, so more soap is wasted.','<b>Detergents</b> have salts that stay soluble with Ca²⁺ and Mg²⁺, so they lather in hard water.'],
check:[{q:'What makes water hard?',options:['Dissolved Ca²⁺ and Mg²⁺','Too much air','Chlorine','Sand'],answer:0,why:'Calcium and magnesium salts.',hint:'Metal ions.'},
 {q:'The grey film with soap in hard water is…',options:['Grease','Scum','Rust','Soot'],answer:1,why:'Insoluble calcium/magnesium soap.',hint:'It does not dissolve.'},
 {q:'Which cleaner works best in hard water?',options:['Soap','Detergent','Neither','Both equally'],answer:1,why:'Its calcium salts are soluble.',hint:'Not soap.'}],
challenge:{text:'You must wash clothes in <b>hard water</b> with the least scum. Which cleaner?',win:'Detergent: no scum in hard water.'},
real:['Boiling or adding washing soda can soften temporary hard water.','Kettles get white limescale in hard water areas.','Most shampoos and washing liquids are detergents.'],
words:{Soap:'Salt of a fatty acid, used for cleaning.',Micelle:'Cluster of soap around grease.','Hard water':'Water rich in Ca²⁺ and Mg²⁺.',Detergent:'Synthetic cleaning agent.'}
});
