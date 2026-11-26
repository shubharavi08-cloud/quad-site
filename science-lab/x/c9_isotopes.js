QLab.register({
id:'c9_isotopes',code:'9-C2',title:'Isotopes: same element, different mass',grade:9,subject:'Chemistry',emoji:'🧬',
hook:{title:'Chlorine has a mass of 35.5. But you cannot have half a neutron. How?',text:'Atoms of the same element can have different numbers of neutrons. They are called isotopes.'},
prior:'You built atoms in the last experiment.',
guess:{q:'Two atoms of carbon have different masses. What must differ?',options:['Protons','Electrons','Neutrons','Atomic number'],answer:2,hint:'Atomic number (protons) is fixed for an element.',after:'Explore the isotopes.'},
build(api){
 const L=QLab.lab,chal=!!api.challenge,E=L.E,stage=api.stage;
 const sc=L.scene(stage,{alt:'A jar of atoms with different masses, a scoop and a weighing scale'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const D={Chlorine:{z:17,sym:'Cl',iso:[[35,75],[37,25]]},Carbon:{z:6,sym:'C',iso:[[12,99],[13,1]]},Boron:{z:5,sym:'B',iso:[[10,20],[11,80]]},Magnesium:{z:12,sym:'Mg',iso:[[24,79],[25,10],[26,11]]}};
 const COL=['#2aa5d8','#f08a3c','#7a5cf0'];
 let el=chal?'Chlorine':'Chlorine',balls=[],scoops=0,sumM=0,sumK=0,hist=[],mode='mix',busy=false;const done={};const seen=new Set();
 const fx=P?110:125,fy=P?250:330,fw=P?140:150,fh=P?140:150,pr=P?5.2:6.4,px=P?302:322,py=fy;
 const x0=fx-fw/2+9,x1=fx+fw/2-9,y0=fy-fh+10,y1=fy-8;
 const gG=E('g',{},sc.gMain);
 const jar=sc.vessel({x:fx,y:fy,type:'beaker',w:fw,h:fh,level:0,label:'Atoms of one element'});
 const gB=E('g',{},sc.gMain),gS=E('g',{},sc.gMain),gR=E('g',{},sc.gMain),gT=E('g',{},sc.gMain);
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 // ---- scale
 E('ellipse',{cx:px,cy:py+4,rx:70,ry:9,fill:'#000',opacity:.13},gS);
 E('rect',{x:px-12,y:py-24,width:24,height:26,fill:'#9aa6bb',stroke:'#5a6a85','stroke-width':2},gS);
 const pan=E('g',{},gS);E('rect',{x:px-64,y:py-32,width:128,height:10,rx:5,fill:'#dfe6f5',stroke:'#5a6a85','stroke-width':2.5},pan);
 T(gS,px,py+22,'Weighing scale');
 const disp=E('g',{},gS);E('rect',{x:px-34,y:py-17,width:68,height:12,rx:3,fill:'#13204d'},disp);const dt=T(disp,px,py-8,'0.0',{fill:'#7bffb0','font-size':10,'font-weight':800,class:''});
 const tgt=()=>D[el].iso.reduce((s,i)=>s+i[0]*i[1],0)/100;
 function setup(){gB.innerHTML='';balls=[];const iso=D[el].iso;let idx=0;
  iso.forEach((s,i)=>{for(let k=0;k<s[1];k++){const c=E('circle',{r:pr,cx:x0+Math.random()*(x1-x0),cy:y0+Math.random()*(y1-y0),fill:COL[i],stroke:'#fff','stroke-width':1.3},gB);balls.push({c,i,m:s[0],x:+c.getAttribute('cx'),y:+c.getAttribute('cy'),vx:(Math.random()-.5)*2.4,vy:(Math.random()-.5)*2.4,home:true})}});
  scoops=0;sumM=0;sumK=0;hist=[];mode='mix';gR.innerHTML='';plot();dt.textContent='0.0';jar.g&&0;legend()}
 function legend(){gT.innerHTML='';const iso=D[el].iso,lx=P?30:20,ly=P?42:34;iso.forEach((s,i)=>{E('circle',{cx:lx+i*(P?118:128)+6,cy:ly,r:6,fill:COL[i]},gT);T(gT,lx+i*(P?118:128)+16,ly+4,`${D[el].sym}-${s[0]}`,{'text-anchor':'start','font-size':12,'font-weight':800,fill:'#2b2350',class:''})})}
 // ---- motion
 let raf=0;function tick(){if(!stage.isConnected)return;if(mode==='mix')balls.forEach(b=>{if(!b.home)return;b.x+=b.vx;b.y+=b.vy;if(b.x<x0||b.x>x1){b.vx*=-1;b.x=Math.max(x0,Math.min(x1,b.x))}if(b.y<y0||b.y>y1){b.vy*=-1;b.y=Math.max(y0,Math.min(y1,b.y))}b.c.setAttribute('cx',b.x);b.c.setAttribute('cy',b.y)});raf=requestAnimationFrame(tick)}
 // ---- plot
 const QX=P?30:440,QY=P?378:196,QW=P?360:290,QH=P?130:120;
 function plot(){gR.innerHTML='';E('rect',{x:QX,y:QY,width:QW,height:QH,rx:12,fill:'#fff',opacity:.92,stroke:'#cdb8ff','stroke-width':2},gR);
  const t=tgt(),lo=t-1,hi=t+1,Y=v=>QY+QH-14-(v-lo)/(hi-lo)*(QH-34);
  T(gR,QX+QW/2,QY+14,'Average mass of all atoms weighed so far',{'font-size':11,'font-weight':800,fill:'#2b2350',class:''});
  E('line',{x1:QX+10,x2:QX+QW-10,y1:Y(t),y2:Y(t),stroke:'#2e9d5b','stroke-dasharray':'5 5','stroke-width':2},gR);T(gR,QX+QW-34,Y(t)-4,`true average ${t.toFixed(2).replace(/\.?0+$/,'')}`,{'font-size':10,fill:'#2e9d5b','font-weight':800,class:''});
  const n=hist.length;hist.forEach((h,i)=>{const x=QX+24+(i/Math.max(7,n-1))*(QW-60);E('circle',{cx:x,cy:Math.max(QY+22,Math.min(QY+QH-8,Y(h.m))),r:3.5,fill:'#f08a3c'},gR);if(i)E('line',{x1:QX+24+((i-1)/Math.max(7,n-1))*(QW-60),y1:Math.max(QY+22,Math.min(QY+QH-8,Y(hist[i-1].c))),x2:x,y2:Math.max(QY+22,Math.min(QY+QH-8,Y(h.c))),stroke:'#6a3fd1','stroke-width':2.5},gR)});
  if(n)E('circle',{cx:QX+24+((n-1)/Math.max(7,n-1))*(QW-60),cy:Math.max(QY+22,Math.min(QY+QH-8,Y(hist[n-1].c))),r:4.5,fill:'#6a3fd1'},gR);
  T(gR,QX+QW/2,QY+QH-2,'dot = one scoop · line = running average',{'font-size':9,class:'lkhint'})}
 // ---- actions
 sc.mix=()=>{if(busy)return;mode='mix';balls.forEach(b=>{b.home=true;b.c.style.transition='';b.vx=(Math.random()-.5)*2.4;b.vy=(Math.random()-.5)*2.4});gS.querySelectorAll('.pile').forEach(e=>e.remove());sc.say('Mixed up again.');};
 sc.sort=async()=>{if(busy)return;busy=true;mode='sort';await sc.clearPan();const iso=D[el].iso;const per=Math.floor((x1-x0)/(pr*2+1));let row=0;const lab=[];
  iso.forEach((s,i)=>{const mine=balls.filter(b=>b.i===i);mine.forEach((b,k)=>{const r=Math.floor(k/per),c=k%per,tx=x0+pr+c*(pr*2+1),ty=y1-pr-(row+r)*(pr*2+1);b.home=false;b.c.style.transition='cx .9s ease,cy .9s ease';b.c.setAttribute('cx',tx);b.c.setAttribute('cy',ty);b.x=tx;b.y=ty});lab[i]=y1-pr-(row+Math.max(0,Math.ceil(mine.length/per)-1)/2)*(pr*2+1);row+=Math.ceil(mine.length/per)+.4});
  L.snd.whoosh&&L.snd.whoosh();await sc.sleep(1000);
  gG.innerHTML='';iso.forEach((s,i)=>{T(gG,fx+fw/2+(P?4:12),lab[i]+4,`${D[el].sym}-${s[0]}: ${s[1]}%`,{'text-anchor':'start','font-size':12,'font-weight':800,fill:COL[i],class:''})});
  done.sort=1;sc.say(iso.map(s=>`${s[1]} of 100 atoms are ${D[el].sym}-${s[0]}`).join(', ')+'. Same element, different masses.','ok');busy=false};
 sc.clearPan=async()=>{if(!gS.querySelector('.pile'))return;const mv=[...gS.querySelectorAll('.pile')];mv.forEach(e=>e.remove());balls.forEach(b=>{if(b.onpan){b.onpan=false;b.c.style.opacity=1}})};
 sc.scoop=async(k=10)=>{if(busy)return;busy=true;if(mode==='sort')sc.mix();await sc.clearPan();
  const pool=balls.filter(b=>b.home&&!b.onpan);const pick=[];while(pick.length<k&&pool.length){pick.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0])}
  let tot=0;pick.forEach((b,j)=>{b.onpan=true;b.c.style.transition='opacity .5s';b.c.style.opacity=.25;const q=E('circle',{class:'pile',r:pr,fill:COL[b.i],stroke:'#fff','stroke-width':1.3,cx:b.x,cy:b.y,style:'transition:cx .8s ease,cy .8s ease'},gS);const col=j%5,row=Math.floor(j/5);setTimeout(()=>{q.setAttribute('cx',px-40+col*(pr*2+3.5)+pr);q.setAttribute('cy',py-32-pr-row*(pr*2+1.5))},20+j*40);tot+=b.m});
  await sc.sleep(900+pick.length*40);
  pan.style.transform='translateY(3px)';setTimeout(()=>pan.style.transform='',300);
  scoops++;sumM+=tot;sumK+=pick.length;const m=tot/pick.length,c=sumM/sumK;hist.push({m,c});if(hist.length>20)hist.shift();
  dt.textContent=m.toFixed(1);plot();L.snd.ok&&L.snd.ok();
  sc.say(`Scoop ${scoops}: ${pick.length} atoms weigh ${tot}. Average ${m.toFixed(1)} each. Running average of everything: ${c.toFixed(2)}.`,'');
  done[el]=(done[el]||0)+1;if(done[el]>=2)seen.add(el);
  if(!chal&&seen.size>=3){api.award('did');api.ready()}
  busy=false};
 sc.pick=async n=>{if(busy)return;el=n;setup();ctrl();sc.say(`${n}: every atom has ${D[n].z} protons. Scoop some and weigh them.`)};
 function ctrl(){api.ctrl.innerHTML=`${chal?'':'<div class="row" id="el" style="flex-wrap:wrap">'+Object.keys(D).map(k=>`<button data-e="${k}" class="${k===el?'pri':''}">${k}</button>`).join('')+'</div>'}<div class="row" style="flex-wrap:wrap"><button class="pri" id="sc">🥄 Scoop 10 atoms</button><button id="so">🧲 Sort by mass</button><button id="mx">🔀 Mix again</button></div><p style="font-size:13px;margin:4px 0">Scoop a few times. The running average settles on one number.</p>${chal?'<p><b>Average atomic mass of chlorine (75% Cl-35, 25% Cl-37) =</b></p><div class="row" id="av">'+['35','35.5','36','37'].map(x=>`<button data-v="${x}">${x}</button>`).join('')+'</div>':'<p class="lockhint" style="margin:0;text-align:left">Weigh 2 scoops of 3 different elements to unlock the next step.</p>'}`;
  const q=s=>api.ctrl.querySelector(s);q('#sc').onclick=()=>sc.scoop(10);q('#so').onclick=()=>sc.sort();q('#mx').onclick=()=>sc.mix();
  if(!chal)q('#el').querySelectorAll('button').forEach(b=>b.onclick=()=>sc.pick(b.dataset.e));
  if(chal)q('#av').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.v==='35.5'?api.solved():api.nope('Average = (35 × 75 + 37 × 25) ÷ 100. Work it out, or scoop many times and watch the running average.'))}
 setup();ctrl();tick();
 sc.say(chal?'Scoop atoms and weigh them. What does the average settle on?':'Chlorine atoms bounce in the jar. Scoop 10 and weigh them.')},
demo:[[S=>S.sort(),'Sort the chlorine atoms by mass. 75 are light and 25 are heavy.',1200],[S=>S.scoop(10),'Scoop 10 atoms and weigh them. The average is not a whole number.',1000],[S=>S.scoop(10),'Scoop again. Each scoop is a bit different.',900],[S=>S.scoop(10),'Keep going. The running average settles near 35.5.',1400],[S=>S.pick('Boron'),'Boron also has two isotopes. Try it too.',1000]],
why:['<span class="word">Isotopes</span> are atoms of the <b>same element</b> (same protons) with <b>different numbers of neutrons</b>.','They behave the same in chemical reactions but have different masses. Hydrogen has 0, 1 or 2 neutrons.','Elements usually have several isotopes mixed in nature. The listed atomic mass is the <b>average</b> weighted by how common each is.','For chlorine: (35 × 75 + 37 × 25) ÷ 100 = 35.5.'],
check:[{q:'Isotopes of an element have the same…',options:['Mass number','Number of neutrons','Number of protons','All three'],answer:2,why:'Same protons, different neutrons.',hint:'The atomic number is fixed.'},
 {q:'Carbon-14 has 8 neutrons. How many protons?',options:['6','8','14','12'],answer:0,why:'Carbon always has 6 protons, so 14 − 6 = 8 neutrons.',hint:'Carbon is atomic number 6.'},
 {q:'Why is chlorine\'s mass 35.5?',options:['It has half a neutron','It is an average of two isotopes','It is a typing error','It gained an electron'],answer:1,why:'About 75% are Cl-35 and 25% are Cl-37.',hint:'Weighted average.'}],
challenge:{text:'Chlorine is 75% Cl-35 and 25% Cl-37. What is its <b>average atomic mass</b>?',win:'(35 × 0.75) + (37 × 0.25) = 35.5.'},
real:['Carbon-14 dating finds the age of old bones and wood.','Medical scanners use radioactive isotopes.','Uranium isotopes are used in nuclear power.'],
words:{Isotope:'Atoms of one element with different neutron numbers.','Atomic mass':'Average mass of an element\'s atoms.',Radioactive:'Gives out radiation as the nucleus changes.',Abundance:'How common each isotope is.'}
});
