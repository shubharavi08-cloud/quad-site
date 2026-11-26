QLab.register({
id:'c9_colloid',code:'9-C1',title:'Solution, suspension or colloid? Shine a torch',grade:9,subject:'Chemistry',emoji:'🔦',
hook:{title:'Why does a torch beam show up in milk but not in sugar water?',text:'Mixtures come in three kinds. A beam of light and a few minutes of waiting will tell them apart.'},
prior:'Know that sugar dissolves and sand does not.',
guess:{q:'You shine a torch through milk. What do you see?',options:['The beam passes with no trace','The beam is clearly visible inside the milk','The milk turns clear','The torch goes off'],answer:1,hint:'Think of a torch in a dusty room or foggy air.',after:'Test the mixtures.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A beaker of liquid on the bench with a torch, a timer and sample bottles'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const M={'Sugar water':['solution',0,0,'#e8f3fb'],'Salt water':['solution',0,0,'#e8f3fb'],'Muddy water':['suspension',1,1,'#cdb68a'],'Chalk water':['suspension',1,1,'#ece8de'],'Milk':['colloid',1,0,'#fbf8f0'],'Fog / smoke':['colloid',1,0,'#e9edf3'],'Starch water':['colloid',1,0,'#f3f1ea']};
 if(chal)M['Mystery liquid']=['colloid',1,0,'#f6f3ea'];
 const names=chal?['Mystery liquid']:Object.keys(M);
 const mx=P?210:330,my=P?310:330,bw=P?130:140,bh=P?150:150;
 const gD=E('g',{},sc.gMain),gB=E('g',{},sc.gMain),gT=E('g',{},sc.gMain);
 let jar=null,cur=chal?'Mystery liquid':null,beamOn=false,waited=false,busy=false;const tested=new Set();let dots=[];
 const tx=P?60:90,ty=P?230:240,beamY=my-bh*.55;
 function setup(){gD.innerHTML='';gB.innerHTML='';dots=[];beamOn=false;waited=false;
  if(jar&&jar.g)jar.g.remove();const m=cur?M[cur]:null;
  jar=sc.vessel({x:mx,y:my,type:'beaker',w:bw,h:bh,level:cur?.62:0,color:m?m[3]:'#e8f3fb',label:cur||'Pick a sample'});sc.gMain.appendChild(gD);sc.gMain.appendChild(gB);sc.gMain.appendChild(gT);
  if(m){const x0=mx-bw/2+8,x1=mx+bw/2-8,y0=my-bh*.62+10,y1=my-12;
   const n=m[0]==='suspension'?14:m[0]==='colloid'?34:0;for(let i=0;i<n;i++){const o={c:E('circle',{r:m[0]==='suspension'?4.2:2.2,fill:m[0]==='suspension'?'#8a6b36':'#fff',stroke:m[0]==='suspension'?'#0003':'#cfc6b0','stroke-width':.8,opacity:.95},gD),x:x0+Math.random()*(x1-x0),y:y0+Math.random()*(y1-y0)};o.c.setAttribute('cx',o.x);o.c.setAttribute('cy',o.y);dots.push(o)}}
  info()}
 function info(){gT.innerHTML='';const lines=[...tested].map(n=>`${n}: ${M[n][0]}`);if(!chal&&lines.length)T(gT,P?W/2:W-150,P?H-50:60,'Sorted: '+lines.slice(-3).join(' · '),{'font-size':P?10:11,fill:'#2b2350','font-weight':800,class:''})}
 sc.pick=n=>{if(busy)return;cur=n;setup();L.snd.pop&&L.snd.pop();sc.say(`${n} in the beaker. Shine the torch through it, then wait.`)};
 sc.torch=async()=>{if(busy)return;if(!cur){sc.say('Pick a sample first.','warn');return}busy=true;gB.innerHTML='';beamOn=true;const m=M[cur];L.snd.whoosh&&L.snd.whoosh();
  const bx0=mx-bw/2,bx1=mx+bw/2;
  E('polygon',{points:`${tx+22},${beamY-6} ${bx0},${beamY-12} ${bx0},${beamY+12} ${tx+22},${beamY+6}`,fill:'#ffe97a',opacity:.45},gB);
  if(m[1]&&!(m[0]==='suspension'&&waited)){E('polygon',{points:`${bx0},${beamY-12} ${bx1},${beamY-14} ${bx1},${beamY+14} ${bx0},${beamY+12}`,fill:'#fff2a0',opacity:.9},gB);dots.forEach(o=>{o.c.setAttribute('fill','#fff7b0');setTimeout(()=>o.c.setAttribute('fill',m[0]==='suspension'?'#8a6b36':'#fff'),1500)})}
  else{E('polygon',{points:`${bx0},${beamY-12} ${bx1},${beamY-12} ${bx1},${beamY+12} ${bx0},${beamY+12}`,fill:'#ffe97a',opacity:.18},gB);E('polygon',{points:`${bx1},${beamY-12} ${P?W-10:W-60},${beamY-6} ${P?W-10:W-60},${beamY+6} ${bx1},${beamY+12}`,fill:'#ffe97a',opacity:.4},gB);E('circle',{cx:P?W-14:W-56,cy:beamY,r:7,fill:'#ffe97a',stroke:'#e0a800'},gB)}
  await sc.sleep(900);
  sc.say(m[1]?'You can see the beam inside it. The particles scatter the light.':'The beam goes straight through. You cannot see it in the liquid.','ok');
  if(waited||true)check();busy=false};
 sc.wait=async()=>{if(busy)return;if(!cur){sc.say('Pick a sample first.','warn');return}busy=true;waited=true;const m=M[cur];
  const hg=E('text',{x:mx,y:my-bh-24,'text-anchor':'middle','font-size':26},gB);hg.textContent='⏳';L.snd.tick&&L.snd.tick();
  if(m[2]){dots.forEach(o=>{o.c.style.transition='cy 2.2s ease';const y=my-12-Math.random()*8;o.c.setAttribute('cy',y);o.y=y})}
  await sc.sleep(2300);hg.remove();
  sc.say(m[2]?'After 10 minutes the mud has settled to the bottom. Big particles settle.':'10 minutes later: nothing settled.','ok');check();busy=false};
 function check(){if(!cur)return;if(beamOn&&waited){tested.add(cur);info();if(!chal&&tested.size>=5&&new Set([...tested].map(n=>M[n][0])).size===3){api.award('did');api.ready()}}}
 sc.guess=k=>{if(busy)return;if(!(beamOn&&waited)){sc.say('Do both tests first: torch, then wait.','warn');api.nope('Shine the torch AND wait 10 minutes before you decide.');return}
  if(k==='colloid'){L.snd.ok&&L.snd.ok();sc.say('A colloid: it scatters the beam but does not settle.','ok');api.solved()}
  else{L.snd.no&&L.snd.no();sc.say('Not quite. The beam is visible, so not a solution. It does not settle, so not a suspension.','warn');api.nope('The beam is visible, so it is not a solution. It does not settle, so it is not a suspension. Which kind is left?')}};
 // tools
 const torchDraw=g=>{E('rect',{x:-20,y:-8,width:34,height:16,rx:4,fill:'#4a5568'},g);E('polygon',{points:'14,-12 28,-18 28,18 14,12',fill:'#ffd84a',stroke:'#8a6a2a','stroke-width':2},g)};
 sc.tool({x:tx,y:ty,label:'Torch',ly:34,scale:.9,draw:torchDraw,use:()=>sc.torch()});
 sc.tool({x:P?W-50:tx,y:P?ty:ty+90,label:'10 min',ly:34,scale:.9,draw:g=>{E('path',{d:'M-12 -16 H12 L2 0 L12 16 H-12 L-2 0 Z',fill:'#f7efc4',stroke:'#8a6a2a','stroke-width':2.5},g)},use:()=>sc.wait()});
 if(chal){['solution','suspension','colloid'].forEach((k,i)=>sc.tool({x:P?60+i*150:330+i*130,y:P?492:372,label:k[0].toUpperCase()+k.slice(1),ly:34,scale:.9,draw:g=>{E('circle',{r:20,fill:'#efe8ff',stroke:'#7a5cf0','stroke-width':3},g);T(g,0,6,k[0].toUpperCase(),{'font-size':17,'font-weight':900,fill:'#2b2350',class:''})},use:()=>sc.guess(k)}))}
 else names.forEach((n,i)=>sc.tool({x:P?(i<4?44+i*88:80+(i-4)*110):150+i*72,y:P?(i<4?440:512):370,label:n.split(' ')[0],ly:30,scale:.7,draw:g=>{E('rect',{x:-13,y:-4,width:26,height:26,rx:6,fill:M[n][3],stroke:'#5a6a85','stroke-width':2.5},g);E('rect',{x:-6,y:-12,width:12,height:9,fill:'#7a5cf0'},g)},use:()=>sc.pick(n)}));
 setup();
 api.ctrl.innerHTML=(chal?`<p style="margin:0 0 6px;font-size:14px"><b>A cloudy liquid shows a visible beam and does not settle.</b> Do both tests, then drag the right kind onto the beaker.</p><div class="row" style="flex-wrap:wrap"><button class="pri" id="bt">🔦 Torch</button><button class="pri" id="bw">⏳ Wait 10 min</button></div><div class="row" style="flex-wrap:wrap" id="kd">${['solution','suspension','colloid'].map(k=>`<button data-k="${k}">${k[0].toUpperCase()+k.slice(1)}</button>`).join('')}</div>`:`<p style="margin:0 0 6px;font-size:14px"><b>Pick a bottle</b>, shine the <b>torch</b>, then <b>wait</b>. Sort 5 samples to unlock the next step.</p><div class="row" style="flex-wrap:wrap" id="mx">${names.map(n=>`<button data-n="${n}">${n}</button>`).join('')}</div><div class="row"><button class="pri" id="bt">🔦 Torch</button><button class="pri" id="bw">⏳ Wait 10 min</button></div>`);
 api.ctrl.querySelector('#bt').onclick=()=>sc.torch();api.ctrl.querySelector('#bw').onclick=()=>sc.wait();
 if(chal)api.ctrl.querySelectorAll('#kd [data-k]').forEach(b=>b.onclick=()=>sc.guess(b.dataset.k));else api.ctrl.querySelectorAll('#mx [data-n]').forEach(b=>b.onclick=()=>sc.pick(b.dataset.n));
 sc.say(chal?'Shine the torch, then wait, then decide.':'Pick a sample bottle for the beaker.')},
demo:[[S=>S.pick('Sugar water'),'Sugar water first.',600],[S=>S.torch(),'The beam passes straight through. A solution.',800],[S=>S.wait(),'Nothing settles.',500],[S=>S.pick('Milk'),'Now milk.',600],[S=>S.torch(),'The beam shows up inside the milk. The particles scatter light.',800],[S=>S.wait(),'But it does not settle. A colloid.',500]],
why:['In a <b>solution</b> the particles are tiny. They do not scatter light and never settle (sugar water).','In a <b>suspension</b> the particles are big. They scatter light and <b>settle</b> when left alone (muddy water).','In a <b>colloid</b> the particles are in between. They scatter light but do <b>not</b> settle (milk, fog).','Light scattering by tiny particles is the <span class="word">Tyndall effect</span>.'],
check:[{q:'Which mixture settles if left alone?',options:['Sugar water','Milk','Muddy water','Fog'],answer:2,why:'Muddy water is a suspension, so the mud settles.',hint:'Wait 10 minutes.'},
 {q:'The Tyndall effect is…',options:['Mixtures settling','Light scattered by particles','Colour change','Boiling'],answer:1,why:'Particles scatter a beam so you can see it.',hint:'The beam in milk.'},
 {q:'Which is a colloid?',options:['Salt water','Milk','Muddy water','Pure water'],answer:1,why:'Milk scatters light but does not settle.',hint:'Compare milk with muddy water.'}],
challenge:{text:'A cloudy liquid shows a visible beam and <b>does not settle</b> after 10 minutes. What kind of mixture is it?',win:'A colloid: it scatters light but never settles.'},
real:['Sunbeams through mist or dusty air show the Tyndall effect.','Milk, butter, jelly and fog are colloids.','Medicines are shaken: they are suspensions that settle.'],
words:{Solution:'Tiny particles. Clear. No scattering.',Suspension:'Big particles. Settles.',Colloid:'Medium particles. Scatters light. Does not settle.','Tyndall effect':'Light scattered by particles in a mixture.'}
});
