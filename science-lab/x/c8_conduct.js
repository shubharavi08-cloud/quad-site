QLab.register({
id:'c8_conduct',code:'8-C3',title:'Conductors and insulators',grade:8,subject:'Chemistry',emoji:'🔌',
hook:{title:'Why are wires made of metal but covered in plastic?',text:'Place different objects in a simple circuit. If the bulb glows, electricity can flow through the object.'},
prior:'Know that a bulb lights when a circuit is complete.',
guess:{q:'Which of these will let electricity flow through it?',options:['A plastic ruler','An iron nail','A rubber eraser','A dry wooden stick'],answer:1,hint:'Wires inside your home are made of copper.',after:'Test them in the circuit.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A simple circuit with a battery, a bulb and a gap where you place objects to test them'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const M0=[['copper wire','🟠',1],['iron nail','🔩',1],['aluminium foil','🪙',1],['steel spoon','🥄',1],['pencil lead (graphite)','✏️',1],['plastic ruler','📏',0],['rubber eraser','🧽',0],['dry wood','🪵',0],['glass','🥃',0],['cloth','🧵',0]];
 const M=chal?M0.filter(m=>['copper wire','pencil lead (graphite)','glass','iron nail','plastic ruler'].includes(m[0])):M0;
 const cx=W/2,xl=P?50:100,xr=W-(P?50:100),yt=P?135:135,yb=P?310:275,gw=P?60:70;
 const gW=E('g',{},sc.gMain);
 const pts=[[cx-gw,yb],[xl,yb],[xl,yt],[xr,yt],[xr,yb],[cx+gw,yb]];
 E('polyline',{points:pts.map(p=>p.join(',')).join(' '),fill:'none',stroke:'#1b2a4a','stroke-width':5,'stroke-linejoin':'round'},gW);
 E('rect',{x:cx-gw-8,y:yb-8,width:16,height:16,rx:4,fill:'#8a96a8',stroke:'#1b2a4a','stroke-width':2},gW);E('rect',{x:cx+gw-8,y:yb-8,width:16,height:16,rx:4,fill:'#8a96a8',stroke:'#1b2a4a','stroke-width':2},gW);
 E('rect',{x:cx-gw+10,y:yb-34,width:gw*2-20,height:44,rx:10,fill:'none',stroke:'#8aa0c8','stroke-dasharray':'6 5','stroke-width':3},gW);T(gW,cx,yb+34,'test gap',{'font-size':11});
 const bat=E('g',{},gW);E('rect',{x:xl-16,y:(yt+yb)/2-30,width:32,height:60,rx:6,fill:'#ffb347',stroke:'#1b2a4a','stroke-width':3},bat);T(bat,xl,(yt+yb)/2+6,'+ −',{'font-size':14,'font-weight':800,class:''});T(bat,xl,(yt+yb)/2+48,'battery',{'font-size':11});
 const bulbG=E('g',{},gW);const bulb=E('circle',{cx,cy:yt,r:32,fill:'#e9edf5',stroke:'#1b2a4a','stroke-width':4},bulbG);const rays=E('g',{stroke:'#f0a800','stroke-width':4,opacity:0},bulbG);[[0,-44,0,-56],[-34,-30,-42,-40],[34,-30,42,-40],[-44,0,-56,0],[44,0,56,0]].forEach(r=>E('line',{x1:cx+r[0],y1:yt+r[1],x2:cx+r[2],y2:yt+r[3]},rays));T(bulbG,cx,yt+8,'💡',{'font-size':22,class:''});
 const gObj=E('g',{},sc.gMain),gMsg=E('g',{},sc.gMain);
 const tg=sc.vessel({x:cx,y:yb+10,type:'beaker',w:gw*2,h:50,level:0,label:''});tg.g.style.opacity=0;
 // current dots
 const loop=[...pts,pts[0]],seg=[];let tot=0;for(let i=0;i<loop.length-1;i++){const d=Math.hypot(loop[i+1][0]-loop[i][0],loop[i+1][1]-loop[i][1]);seg.push(d);tot+=d}
 const at=u=>{let d=(u%1)*tot;for(let i=0;i<seg.length;i++){if(d<=seg[i]){const k=d/seg[i];return[loop[i][0]+(loop[i+1][0]-loop[i][0])*k,loop[i][1]+(loop[i+1][1]-loop[i][1])*k]}d-=seg[i]}return loop[0]};
 const flow=[];for(let i=0;i<16;i++)flow.push(E('circle',{r:4,fill:'#ffd84a',stroke:'#c58f00','stroke-width':1,opacity:0},gW));
 let on=false,u0=0,cur=null,busy=false;const log={};
 (function tick(){if(!stage.isConnected)return;if(on){u0=(u0+.004)%1}flow.forEach((c,i)=>{const p=at(u0+i/16);c.setAttribute('cx',p[0]);c.setAttribute('cy',p[1]);c.setAttribute('opacity',on?1:0)});requestAnimationFrame(tick)})();
 sc.test=async i=>{if(busy)return;busy=true;const m=M.find(x=>x[0]===i)||M[i];cur=m;gObj.innerHTML='';gMsg.innerHTML='';
  const o=T(gObj,cx,yb-4,m[1],{'font-size':34,class:''});on=false;bulb.setAttribute('fill','#e9edf5');rays.setAttribute('opacity',0);L.snd.drop&&L.snd.drop();await sc.sleep(500);
  if(m[2]){on=true;bulb.setAttribute('fill','#ffe14d');rays.setAttribute('opacity',1);L.snd.ok&&L.snd.ok();sc.say(`✅ ${m[0]}: the bulb glows. It conducts.`,'ok')}else{L.snd.no&&L.snd.no();sc.say(`❌ ${m[0]}: the bulb stays off. It is an insulator.`,'warn')}
  log[m[0]]=m[2];T(gMsg,cx,P?yb+60:yb+60,`Tested ${Object.keys(log).length} of ${M.length}`,{'font-size':12,'font-weight':800,fill:'#2b2350',class:''});
  if(!chal&&Object.keys(log).length>=8&&new Set(Object.values(log)).size===2){api.award('did');api.ready()}busy=false};
 sc.answer=k=>{if(k==='pencil lead (graphite)'){L.snd.ok&&L.snd.ok();sc.say('Graphite, a non-metal that conducts.','ok');api.solved()}else{const m=k==='glass'?'Glass is a non-metal, but it did not light the bulb. Test it.':'That is a metal. Look for a non-metal that lights the bulb.';L.snd.no&&L.snd.no();sc.say(m,'warn');api.nope(m)}};
 const row=P?5:M.length;M.forEach((m,i)=>sc.tool({x:P?44+(i%row)*80:(chal?150+i*110:60+i*70),y:P?(i<row?440:512):374,label:m[0].split(' ')[0],ly:30,scale:.75,draw:g=>{T(g,0,8,m[1],{'font-size':30,class:''})},use:()=>sc.test(m[0])}));
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Drag an object into the gap.</b> Does the bulb glow?</p><div class="row" style="flex-wrap:wrap">${M.map((m,i)=>`<button data-i="${m[0]}">${m[1]} ${m[0].split(' (')[0]}</button>`).join('')}</div>${chal?'<p style="margin:6px 0 2px"><b>Which is NOT a metal but still conducts?</b></p><div class="row" id="ans" style="flex-wrap:wrap">'+['copper wire','pencil lead (graphite)','glass','iron nail'].map(x=>`<button class="pri" data-a="${x}">${x}</button>`).join('')+'</div>':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Test 8 objects, some that conduct and some that do not.</p>'}`;
 api.ctrl.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>sc.test(b.dataset.i));if(chal)api.ctrl.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>sc.answer(b.dataset.a));
 sc.say('Put an object in the gap and see if the bulb lights.')},
demo:[[S=>S.test('copper wire'),'Copper wire in the gap: the bulb glows. A conductor.',900],[S=>S.test('plastic ruler'),'Plastic ruler: the bulb stays off. An insulator.',900],[S=>S.test('pencil lead (graphite)'),'Pencil lead is not a metal, but the bulb glows. Graphite conducts!',900]],
why:['A <span class="word">conductor</span> lets electricity pass through. <b>Metals</b> such as copper, iron and aluminium are good conductors.','An <span class="word">insulator</span> does not let electricity pass. Plastic, rubber, wood, glass and cloth are insulators.','Most non-metals are insulators, but <b>graphite</b> (pencil lead) is a non-metal that <b>does conduct</b>.','That is why wires have a metal core to carry current and a plastic coat to keep us safe.'],
check:[{q:'Which of these is an insulator?',options:['Copper wire','Aluminium foil','Rubber eraser','Iron nail'],answer:2,why:'Rubber does not let electricity pass.',hint:'The bulb stayed off.'},
 {q:'Why are electric wires covered in plastic?',options:['To look nice','Plastic is an insulator, so it keeps us safe','Plastic carries the current','To make them heavier'],answer:1,why:'The plastic coat stops current from leaking into us.',hint:'Think about what an insulator does.'},
 {q:'Pencil lead is a non-metal. Does it conduct?',options:['No, never','Yes, graphite conducts','Only when hot','Only when wet'],answer:1,why:'Graphite is the well-known non-metal that conducts.',hint:'You tested it.'}],
challenge:{text:'Find the object that is <b>not a metal</b> but still lights the bulb. Test the objects, then choose.',win:'Graphite, the pencil lead, is a non-metal conductor.'},
real:['Electricians use screwdrivers with plastic handles.','Cooking pans are metal (conducts heat) with wooden or plastic handles.','Electric poles have glass or ceramic discs to stop current flowing into the pole.'],
words:{Conductor:'Lets electricity pass.',Insulator:'Does not let electricity pass.',Circuit:'A complete path for current.',Graphite:'A form of carbon that conducts.'}
});
