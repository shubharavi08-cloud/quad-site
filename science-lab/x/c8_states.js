QLab.register({
id:'c8_states',code:'8-C1',title:'Particles in a solid, a liquid and a gas',grade:8,subject:'Chemistry',emoji:'🧊',
hook:{title:'Ice, water and steam are the same stuff. Why do they look so different?',text:'Everything around you is made of tiny moving particles. Heating or cooling changes how they move. Let us watch them.'},
prior:'Nothing! You only need to know that ice melts and water boils.',
guess:{q:'What happens to the tiny particles of water when it gets hotter?',options:['They get bigger','They move faster','They stop moving','They disappear'],answer:1,hint:'Think of kids in a classroom: calm when sitting, wild when the bell rings.',after:'Heat the water below and watch.'},
build(api){
 const chal=!!api.challenge;let T=-10,seen={};
 api.ctrl.innerHTML=`<label for="t">Temperature: <span id="tv"></span> °C</label><input id="t" type="range" min="-20" max="130" step="5" value="-10"><p>State: <b id="st"></b></p><p id="note" style="font-size:14px;color:#55688a"></p>${chal?'<button class="pri" id="ck">Check my answer</button>':''}`;
 const cv=document.createElement('canvas');cv.width=760;cv.height=300;cv.style.cssText='width:100%;height:auto;background:#fff;border-radius:12px';cv.setAttribute('role','img');cv.setAttribute('aria-label','Particles of water in a box');api.stage.appendChild(cv);
 const g=cv.getContext('2d'),N=48,P=[];
 for(let i=0;i<N;i++){const c=i%8,r=Math.floor(i/8);P.push({hx:260+c*30,hy:90+r*30,x:260+c*30,y:90+r*30,vx:Math.random()*2-1,vy:Math.random()*2-1})}
 const state=()=>T<0?'solid':T<100?'liquid':'gas';
 const label={solid:'Solid (ice)',liquid:'Liquid (water)',gas:'Gas (steam)'};
 const note={solid:'Particles are packed in a pattern. They only jiggle on the spot.',liquid:'Particles touch, but slide past each other. That is why water flows.',gas:'Particles are far apart and zoom around. They fill the whole box.'};
 function upd(){const s=state();seen[s]=1;api.ctrl.querySelector('#tv').textContent=T;api.ctrl.querySelector('#st').textContent=label[s];api.ctrl.querySelector('#note').textContent=note[s];
  if(!chal&&seen.solid&&seen.liquid&&seen.gas){api.award('did');api.ready()}}
 api.ctrl.querySelector('#t').oninput=e=>{T=+e.target.value;upd()};upd();
 const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function frame(){if(!cv.isConnected)return;const s=state(),sp=Math.max(.3,(T+30)/45);
  g.clearRect(0,0,760,300);g.strokeStyle='#1b2a4a';g.lineWidth=4;g.strokeRect(120,20,520,260);
  for(const p of P){
   if(s==='solid'){const j=reduce?0:1.5;p.x=p.hx+(Math.random()-.5)*j*2;p.y=p.hy+(Math.random()-.5)*j*2}
   else if(s==='liquid'){const bx=140+(p.hx-260)*0.9,by=170;if(!reduce){p.vx+=(Math.random()-.5)*.6*sp/2;p.vy+=(Math.random()-.5)*.6*sp/2;p.vx*=.9;p.vy*=.9;p.x+=p.vx*sp;p.y+=p.vy*sp;p.y+=(by+ (p.hy-90)*.6-p.y)*.03;p.x+=(p.hx-p.x)*.012+ (Math.random()-.5)*.3}else{p.x=p.hx;p.y=p.hy+90}}
   else{if(!reduce){if(Math.abs(p.vx)<2)p.vx*=2.5;if(Math.abs(p.vy)<2)p.vy*=2.5;p.x+=p.vx*sp*.6;p.y+=p.vy*sp*.6;if(p.x<130||p.x>630)p.vx*=-1;if(p.y<30||p.y>270)p.vy*=-1;p.x=Math.min(630,Math.max(130,p.x));p.y=Math.min(270,Math.max(30,p.y))}}
   g.beginPath();g.arc(p.x,p.y,10,0,7);g.fillStyle=s==='solid'?'#7fc8f8':s==='liquid'?'#2aa5d8':'#4b3fd1';g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke()}
  requestAnimationFrame(frame)}
 frame();
 if(chal)api.ctrl.querySelector('#ck').onclick=()=>{if(state()==='liquid'&&T>=80)api.solved();else if(state()!=='liquid')api.nope('At '+T+' °C the water is '+(state()==='gas'?'steam (a gas)':'ice (a solid)')+'. You need a liquid.');else api.nope('It is a liquid, but only '+T+' °C. Tea needs water hotter than 80 °C.')}
},
why:['In a <b>solid</b>, particles are packed tightly in a fixed pattern. They cannot move around, they only jiggle.','Heat gives particles <b>energy</b>, so they jiggle harder until they break free. That is <span class="word">melting</span>.','In a <b>liquid</b>, particles still touch but slide past each other, so a liquid takes the shape of its container.','In a <b>gas</b>, particles are far apart and move very fast, so a gas spreads out and fills the whole space.'],
check:[{q:'Which state has particles that are far apart and move fastest?',options:['Solid','Liquid','Gas','All the same'],answer:2,why:'In a gas the particles have the most energy and the most space.',hint:'Think about steam spreading in a kitchen.'},
 {q:'Why can you pour water but not ice?',options:['Water particles are smaller','Water particles can slide past each other','Ice particles are hotter','Water has no particles'],answer:1,why:'Liquid particles slide past each other. In ice they are held in place.',hint:'Compare the liquid and solid pictures.'},
 {q:'You heat a liquid. What happens to its particles?',options:['They slow down','They move faster','They stop','They get colder'],answer:1,why:'More heat means more energy, so the particles move faster.',hint:'Move the slider to the right and watch.'}],
challenge:{text:'Set the temperature so the water is still a <b>liquid</b> but hot enough to make tea (<b>above 80 °C</b>).',win:'Just right. Water boils at 100 °C, so you stayed in the liquid zone.'},
real:['Steam from a hot cooker (gas) turns back into water drops on the lid.','Ice cubes melt in a glass of juice as the juice particles pass energy to them.','Wet clothes dry because liquid water slowly becomes a gas, even below 100 °C.'],
words:{Particle:'A tiny piece that matter is made of.',Solid:'Fixed shape. Particles are packed and only jiggle.',Liquid:'Flows. Particles touch but slide.',Gas:'Fills space. Particles are far apart and fast.',Melting:'A solid becoming a liquid.'}
});
