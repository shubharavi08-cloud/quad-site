QLab.register({
id:'c10_foodchain',code:'10-B4',title:'Food chain and the energy pyramid',grade:10,subject:'Biology',emoji:'🦎',
hook:{title:'Why are there so many grasshoppers but so few eagles?',text:'Energy moves along a food chain, but most of it is lost at every step. Build the chain and watch the energy shrink.'},
prior:'You know that plants make food and animals eat plants or other animals.',
guess:{q:'Grass has 10,000 J of energy. A grasshopper eats it. Roughly how much energy reaches the grasshopper?',options:['10,000 J','5,000 J','1,000 J','100 J'],answer:2,hint:'About one tenth is passed on. The rest is used or lost as heat.',after:'Build the whole pyramid to see it.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'An energy pyramid with five levels to fill by dragging organism cards, with energy values'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const SET=chal?[['🌿 Algae','Producer','Algae make food by photosynthesis. They are the producers.'],['🦐 Water flea','Primary consumer','The water flea eats algae: a herbivore, primary consumer.'],['🐟 Small fish','Secondary consumer','The small fish eats water fleas: secondary consumer.'],['🐠 Big fish','Tertiary consumer','The big fish eats small fish: tertiary consumer.'],['🦅 Fish eagle','Top carnivore','The eagle eats big fish. Very little energy is left up here.']]
  :[['🌾 Grass','Producer','Grass makes its own food by photosynthesis: the producer. Everything starts here.'],['🦗 Grasshopper','Primary consumer','The grasshopper eats grass: a herbivore, the primary consumer.'],['🐸 Frog','Secondary consumer','The frog eats grasshoppers: secondary consumer.'],['🐍 Snake','Tertiary consumer','The snake eats frogs: tertiary consumer.'],['🦅 Eagle','Top carnivore','The eagle eats snakes: the top carnivore. Only 1 J is left here.']];
 const N=5,E0=10000,en=i=>E0/Math.pow(10,i),ord=[3,0,4,2,1],placed=new Array(N).fill(-1);let done=false,errs=0;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const th=P?36:40,tb=P?290:336,tw=i=>(P?330:400)-i*(P?40:40),tx=P?W/2:236,ty=i=>tb-(i+1)*(th+4)+4;
 const cw=P?118:176,ch=P?40:40,cX=k=>P?(k<3?16+k*(cw+10):16+(k-3)*(cw+10)):510,cY=k=>P?(k<3?352:400):100+k*50;
 const gS=E('g',{},sc.gMain),gC=E('g',{},sc.gMain);
 for(let i=0;i<N;i++){const w=tw(i);E('rect',{x:tx-w/2,y:ty(i),width:w,height:th,rx:8,fill:'#fff',stroke:'#b9a9ee','stroke-width':3,'stroke-dasharray':'6 5'},gS);T(gS,tx-w/2+16,ty(i)+th/2+5,i+1,{'font-size':14,'font-weight':900,fill:'#7d6bd6',class:''})}
 T(gS,tx,ty(N-1)-10,'Energy falls ~90% at every step ▲',{'font-size':P?12:14,'font-weight':900,fill:'#c0281d',class:''});
 const cards=[];
 function card(k,ci){const g=E('g',{style:'cursor:grab;touch-action:none'},gC);cards[ci]={g,x:cX(k),y:cY(k)};E('rect',{width:cw,height:ch,rx:10,fill:'#ffe9a8',stroke:'#c99a00','stroke-width':3},g);T(g,cw/2,ch/2+5,SET[ci][0],{'font-size':P?13:15,'font-weight':900,fill:'#4a3600',class:''});g.setAttribute('transform',`translate(${cX(k)},${cY(k)})`);
  let d=null;g.addEventListener('pointerdown',ev=>{if(done||placed.includes(ci))return;ev.preventDefault();g.setPointerCapture(ev.pointerId);const p=sc.pt(ev);d={ox:p.x-cards[ci].x,oy:p.y-cards[ci].y};gC.appendChild(g)});
  g.addEventListener('pointermove',ev=>{if(!d)return;const p=sc.pt(ev);g.setAttribute('transform',`translate(${p.x-d.ox},${p.y-d.oy})`)});
  const end=ev=>{if(!d)return;const p=sc.pt(ev);d=null;let best=-1,bd=60;for(let i=0;i<N;i++){const dd=Math.hypot(p.x-tx,p.y-(ty(i)+th/2));if(dd<bd){bd=dd;best=i}}if(best<0||placed[best]!==-1){back(ci);return}sc.put(ci,best)};g.addEventListener('pointerup',end);g.addEventListener('pointercancel',end)}
 function back(ci){const c=cards[ci];c.g.setAttribute('transform',`translate(${c.x},${c.y})`)}
 sc.put=(ci,slot)=>{if(done||placed[slot]!==-1||placed.includes(ci))return;const c=cards[ci];
  if(ci===slot){placed[slot]=ci;const w=tw(slot);c.g.remove();L.snd.ok&&L.snd.ok();
   E('rect',{x:tx-w/2,y:ty(slot),width:w,height:th,rx:8,fill:'#cdeccf',stroke:'#2e9d5b','stroke-width':3},gS);gS.appendChild(T(gS,tx+w/2-8,ty(slot)+th/2+5,en(slot)+' J',{'font-size':P?13:15,'font-weight':900,fill:'#237a47','text-anchor':'end',class:''}));T(gS,tx-w/2+34,ty(slot)+th/2+5,SET[ci][0],{'font-size':P?13:15,'font-weight':900,fill:'#4a3600','text-anchor':'start',class:''});sc.say('✅ '+SET[ci][2],'ok');
   if(placed.every(v=>v>=0)){done=true;if(chal)api.solved();else{api.award('did');api.ready();sc.say('Each step passes on about 10%. That is why food chains are short and top animals are few.','ok')}}}
  else{errs++;back(ci);L.snd.no&&L.snd.no();sc.say('Not there. Ask: who makes the food, and who eats whom? Producers go at the bottom.','warn');if(chal&&errs>=3)api.nope('Start at the bottom with the one that makes its own food, then follow who eats whom.')}};
 ord.forEach((ci,k)=>card(k,ci));
 api.ctrl.innerHTML=(chal?'<p style="margin:0 0 6px;font-size:14px"><b>Pond food chain.</b> Drag each organism onto its level of the pyramid (bottom is level 1).</p>':'<p style="margin:0 0 4px;font-size:14px"><b>Drag each animal</b> onto its level. Start at the bottom with the producer.</p>')+'<div class="row"><button id="rs">↺ Cards back</button></div>';
 api.ctrl.querySelector('#rs').onclick=()=>{if(done)return;cards.forEach((c,ci)=>{if(!placed.includes(ci))back(ci)});errs=0};
 sc.say(chal?'Who makes the food in a pond?':'Which one makes its own food?')},
demo:[[S=>S.put(0,0),'Grass is the producer: 10,000 J.',1000],[S=>S.put(1,1),'The grasshopper gets about a tenth: 1,000 J.',1000],[S=>S.put(2,2),'The frog gets 100 J.',900],[S=>S.put(3,3),'The snake gets 10 J.',900],[S=>S.put(4,4),'The eagle gets 1 J.',900]],
why:['A <span class="word">food chain</span> shows who eats whom. Each step is a <span class="word">trophic level</span>: producer, primary, secondary, tertiary consumer.','Producers (green plants) trap light energy by photosynthesis. Consumers get energy by eating.','Only about <b>10%</b> of the energy passes to the next level (the 10% law). The rest is used for life processes or lost as heat.','So the pyramid narrows, chains are short (3 to 5 levels) and top carnivores are few.'],
check:[{q:'Which one is the producer in a food chain?',options:['Frog','Grass','Eagle','Grasshopper'],answer:1,why:'Green plants make their own food.',hint:'Photosynthesis.'},
 {q:'If grass has 10,000 J, how much reaches the frog (2 steps up)?',options:['5,000 J','1,000 J','100 J','10 J'],answer:2,why:'10% each step: 10,000 → 1,000 → 100.',hint:'Divide by 10 twice.'},
 {q:'Why are food chains rarely longer than 5 levels?',options:['Animals are lazy','Too little energy is left at the top','There is not enough water','Predators are tired'],answer:1,why:'Energy falls ~90% at each step.',hint:'The pyramid.'}],
challenge:{text:'Build the <b>pond</b> food chain: algae, water flea, small fish, big fish, fish eagle. Place each at its level.',win:'Algae → water flea → small fish → big fish → fish eagle.'},
real:['This is why a vegetarian diet needs less land than a meat diet.','Pesticides build up in top predators (biomagnification).','Conserving top predators like tigers needs large, healthy forests.'],
words:{'Food chain':'A line showing who eats whom.',Producer:'An organism that makes its own food (green plants).',Consumer:'An organism that eats others for energy.','10% law':'Only about one tenth of the energy passes to the next level.'}
});
