QLab.register({
id:'c8_evap',code:'8-C2',title:'Get salt (and water) back from salt water',grade:8,subject:'Chemistry',emoji:'🧂',
hook:{title:'Sea water has salt in it. How do we get the salt out?',text:'Try a filter first. Then try heating. Can you save the water too?'},
prior:'Know that filter paper catches sand from muddy water.',
guess:{q:'You pour salt water through filter paper. What comes out?',options:['Pure water only','Salt water, unchanged','Only salt','Nothing'],answer:1,hint:'The salt is dissolved, so it is in tiny pieces smaller than the holes of the paper.',after:'Test it on the bench.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A beaker of salt water with a funnel, burner and cold lid, and a collecting beaker'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const mx=P?120:250,my=P?320:340,bw=P?140:160,bh=P?130:140;
 const rx=P?300:560,rw=P?110:120,rh=P?100:110;
 const jar=sc.vessel({x:mx,y:my,type:'beaker',w:bw,h:bh,level:.55,color:'#cde9f9',label:'Salt water'});
 const rec=sc.vessel({x:rx,y:my,type:'beaker',w:rw,h:rh,level:0,color:'#cde9f9',label:'Collected'});
 const gD=E('g',{},sc.gMain),gF=E('g',{},sc.gMain);
 let heat=0,filt=false,lid=false,coll=0,busy=false;
 const x0=mx-bw/2+10,x1=mx+bw/2-10,yb=my-12;let dots=[];
 const surf=()=>my-bh*(.55*(1-heat/10))-6;
 function draw(){gD.innerHTML='';const lvl=.55*(1-heat/10);jar.setLevel(lvl,500);
  if(lvl>.04&&heat<10){for(let i=0;i<14;i++)E('circle',{cx:x0+((i*37)%(x1-x0)),cy:Math.min(yb-6,surf()+10+((i*23)%Math.max(8,yb-surf()-14))),r:3,fill:'#fff',stroke:'#8aa0c8','stroke-width':1.2,opacity:.9},gD)}
  const salt=heat>=10?10:heat>7?(heat-7)*3:0,crys=Math.round(salt/10*14);for(let i=0;i<crys;i++)E('rect',{x:x0+4+(i*11)%(x1-x0-12),y:yb-4-Math.floor(i/10)*7,width:8,height:7,fill:'#fff',stroke:'#5a7fb0','stroke-width':1.3},gD);
  if(lid)E('path',{d:`M${mx-bw/2-6} ${my-bh-6} Q${mx} ${my-bh-42} ${mx+bw/2+6} ${my-bh-6}`,fill:'#bfe3ff',stroke:'#2a7fb0','stroke-width':4},gD),T(gD,mx,my-bh-48,'cold lid',{'font-size':11,'font-weight':800,fill:'#2a7fb0',class:''});
  rec.setLevel(Math.min(.75,coll/10*.6+(filt?.35:0)),600)}
 function steam(){for(let i=0;i<5;i++){const t=E('text',{x:mx-40+i*20,y:surf()-6,'font-size':18,opacity:.7,'text-anchor':'middle',style:'transition:all 1.5s'},gF);t.textContent='☁️';setTimeout(()=>{t.setAttribute('y',lid?my-bh-14:my-bh-70);t.style.opacity=0},40+i*90);setTimeout(()=>t.remove(),1800)}}
 sc.filter=async()=>{if(busy)return;busy=true;L.snd.whoosh&&L.snd.whoosh();
  const fp=E('polygon',{points:`${rx-40},${my-rh-70} ${rx+40},${my-rh-70} ${rx+5},${my-rh-14} ${rx-5},${my-rh-14}`,fill:'#f4efe0',stroke:'#8a7a50','stroke-width':3},gF);T(gF,rx,my-rh-78,'filter paper',{'font-size':11,class:'lkhint'});
  filt=true;jar.setLevel(.08,900);await sc.sleep(1100);draw();for(let i=0;i<6;i++)E('circle',{cx:rx-30+i*12,cy:my-rh*.5,r:3,fill:'#fff',stroke:'#8aa0c8','stroke-width':1.2},gF);
  T(gF,rx,my+(P?44:46),'still salty!',{'font-size':14,'font-weight':900,fill:'#c0392b',class:''});
  sc.say('The salt went right through the paper. Filtering does not work here.','warn');api.coach('warn','Still salty','The salt is dissolved. Its pieces are too small to be caught. Try heating instead.');await sc.sleep(900);fp.remove();busy=false};
 sc.lid=()=>{if(busy)return;lid=true;L.snd.pop&&L.snd.pop();draw();sc.say('Cold lid on. It will catch the steam.','')};
 sc.heat=async()=>{if(busy)return;if(heat>=10){sc.say('All the water is gone. Salt crystals are left.','');return}busy=true;L.snd.fizz&&L.snd.fizz();
  const fl=E('text',{x:mx,y:my+34,'text-anchor':'middle','font-size':30},gF);fl.textContent='🔥';steam();heat++;if(lid)coll=Math.min(10,coll+1);draw();await sc.sleep(1200);fl.remove();
  if(heat>=10){L.snd.ok&&L.snd.ok();sc.say('All the water evaporated. White salt crystals are left!'+(lid?' The cold lid caught the steam as pure water.':''),'ok');
   if(!chal&&filt){api.award('did');api.ready()}else if(!chal)api.coach('ok','Salt crystals!','Now also try the filter to see why it does not work here.')}else sc.say(`Heating for ${heat} minute${heat>1?'s':''}. The water is evaporating (${heat*10}%).`);busy=false};
 sc.reset=()=>{if(busy)return;heat=0;filt=false;lid=false;coll=0;gF.innerHTML='';draw();sc.say('Fresh salt water. Choose a tool.')};
 sc.check=()=>{if(heat<10){const m='Keep heating until all the water has gone.';sc.say(m,'warn');return api.nope(m)}if(!lid||coll<5){const m='You got the salt, but the steam escaped. Add the cold lid before you heat, to catch the water.';sc.say(m,'warn');return api.nope(m)}L.snd.ok&&L.snd.ok();sc.say('Salt AND clean water. That is how sea water can be made drinkable.','ok');api.solved()};
 const tl=[['filter','Funnel',g=>{E('polygon',{points:'-22,-12 22,-12 4,14 -4,14',fill:'#f4efe0',stroke:'#8a7a50','stroke-width':3},g)},()=>sc.filter()],['heat','Burner',g=>{E('rect',{x:-18,y:2,width:36,height:12,rx:3,fill:'#8a96a8',stroke:'#4a5568','stroke-width':2},g);const f=E('text',{x:0,y:0,'text-anchor':'middle','font-size':26},g);f.textContent='🔥'},()=>sc.heat()],['lid','Cold lid',g=>{E('path',{d:'M-22 8 Q0 -14 22 8 Z',fill:'#bfe3ff',stroke:'#2a7fb0','stroke-width':3},g)},()=>sc.lid()]];
 const use=chal?tl.filter(d=>d[0]!=='filter'):tl;
 use.forEach((d,i)=>sc.tool({x:P?60+i*110:90+i*95,y:P?492:372,label:d[1],ly:34,scale:1,draw:d[2],use:d[3]}));
 if(chal)sc.tool({x:P?60+2*110:90+2*95,y:P?492:372,label:'Check',ly:34,scale:1,draw:g=>{E('rect',{x:-13,y:-16,width:26,height:32,rx:4,fill:'#fff',stroke:'#5a6a85','stroke-width':2.5},g);T(g,0,6,'✔',{'font-size':18,fill:'#2e9d5b',class:''})},use:()=>sc.check()});
 draw();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px">${chal?'<b>Get the salt AND the water.</b> Put the cold lid on first, heat until dry, then Check.':'<b>Drag a tool onto the beaker.</b> Try the funnel first, then the burner.'}</p><div class="row" style="flex-wrap:wrap">${chal?'':'<button data-t="filter">🧻 Funnel</button>'}<button class="pri" data-t="heat">🔥 Heat 1 minute</button><button data-t="lid">🧊 Cold lid</button><button id="rs">↺ Start again</button>${chal?'<button class="pri" id="ck">✔ Check</button>':''}</div>${chal?'':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Try the funnel, then heat until the water is gone.</p>'}`;
 api.ctrl.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>sc[b.dataset.t]());api.ctrl.querySelector('#rs').onclick=()=>sc.reset();if(chal)api.ctrl.querySelector('#ck').onclick=()=>sc.check();
 sc.say(chal?'Add the cold lid first, then heat.':'Sea water has salt in it. Can a filter take it out?')},
demo:[[S=>S.filter(),'Filter first. The salt passes right through.',1100],[S=>S.reset(),'Start again. Heat the salt water instead.',700],[S=>S.heat(),'The water evaporates.',900],[S=>{S.heat();S.heat()},'Keep heating.',2600],[S=>{S.heat()},'Salt stays behind as crystals.',1600]],
why:['Salt dissolved in water is in <b>tiny pieces</b>. They are smaller than the holes in filter paper, so filtering cannot separate them.','When you heat the solution the water <b>evaporates</b> (turns to a gas). The salt does not evaporate, so it stays behind as crystals.','If you catch the steam on a cold surface it turns back into water. This is <span class="word">condensation</span>. Doing both together is simple <span class="word">distillation</span>.','Pick the method by looking at what is mixed: filtering for undissolved solids, evaporating for dissolved solids.'],
check:[{q:'Can you filter dissolved salt out of water?',options:['Yes, easily','No, the salt passes through','Only with hot water','Only with sand'],answer:1,why:'Dissolved particles are too small to be caught by the paper.',hint:'You tried this first.'},
 {q:'When salt water is heated until it is dry, what is left?',options:['Water','Salt','Nothing','Steam'],answer:1,why:'The water evaporates and the salt stays.',hint:'Look at the bottom of the dish.'},
 {q:'Steam touching a cold lid turns into water. This is called…',options:['Evaporation','Condensation','Melting','Filtering'],answer:1,why:'Gas turning into liquid is condensation.',hint:'Think of drops on a cold glass.'}],
challenge:{text:'Get <b>both</b> the salt <b>and</b> the water. Add the cold lid first, then heat until the water is all gone.',win:'You made salt AND clean water. That is how sea water can be made drinkable.'},
real:['Salt farms use sunlight to evaporate sea water and collect salt.','Ships and islands make drinking water from sea water by distillation.','Clouds and rain are nature\'s evaporation and condensation.'],
words:{Evaporation:'A liquid turning into a gas.',Condensation:'A gas turning into a liquid.',Distillation:'Evaporate, then condense, to collect the liquid.',Crystal:'A solid with a regular shape.'}
});
