QLab.register({
id:'c10_heat',code:'10-P6',title:"Heat: how much does water warm up?",grade:10,subject:'Physics',emoji:'🌡️',
hook:{title:"A pan of water takes ages to heat, yet a spoon of oil heats fast. Why?",text:"The temperature rise depends on how much is heated and for how long. Heat water with a 500 W heater and watch the thermometer."},
prior:"You know that heating makes things hotter and that more water takes longer to heat.",
guess:{q:"Heating twice as much water with the same heater for the same time gives a temperature rise that is…",options:["double", "half", "the same", "zero"],answer:1,hint:"The same heat is shared by more water.",after:"Try different amounts and times."},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge;
 const sc=L.scene(api.stage,{alt:"Interactive experiment: Heat: how much does water warm up?"});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const PR=[{k:"m",label:"Water",min:0.1,max:1,step:0.1,v:0.5,unit:"kg"},{k:"t",label:"Heating time",min:10,max:120,step:10,v:60,unit:"s"}],TARGET=20,TOL=1.5,DEC=1,UNIT="°C",OL="Temperature rise";
 const p={};PR.forEach(q=>p[q.k]=q.v);
 const g=E('g',{},sc.gMain);let tt=1,busy=false,runs=[],seen=new Set();
 const f=p=>(500*p.t/(p.m*4200));
 const T=(g,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:''},o||{}),g);e.textContent=t;return e};
 const svg=g.ownerSVGElement;let defs=svg.querySelector('defs')||E('defs',{},svg);
 const GR=(id,a,b,h)=>{if(!svg.querySelector('#'+id)){const l=E('linearGradient',{id,x1:0,y1:0,x2:h?1:0,y2:h?0:1},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const RG=(id,a,b)=>{if(!svg.querySelector('#'+id)){const l=E('radialGradient',{id,cx:'35%',cy:'30%',r:'70%'},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const sh=(x,y,w)=>E('ellipse',{cx:x,cy:y,rx:w,ry:w*.2,fill:'rgba(0,0,0,.25)'},g);
 const wheel=(x,y,r,rot)=>{E('circle',{cx:x,cy:y,r,fill:'#222'},g);E('circle',{cx:x,cy:y,r:r*.58,fill:'#d5dbe3'},g);for(let k=0;k<5;k++){const a=rot+k*1.2566;E('line',{x1:x,y1:y,x2:x+Math.cos(a)*r*.55,y2:y+Math.sin(a)*r*.55,stroke:'#7b8493','stroke-width':2},g)}E('circle',{cx:x,cy:y,r:r*.16,fill:'#555'},g)};
 const cloud=(x,y,s)=>{[[0,0,16],[16,-6,20],[34,0,16],[18,6,16]].forEach(c=>E('circle',{cx:x+c[0]*s,cy:y+c[1]*s,r:c[2]*s,fill:'#fff',opacity:.95},g))};
 function draw(){g.innerHTML='';const out=f(p);const sx=W/2-(P?30:60),gy=H*.62,th=out*tt,tmp=20+th;
E('rect',{x:0,y:0,width:W,height:gy+30,fill:GR('kiH','#fff4dc','#ffe4b0')},g);E('rect',{x:0,y:H*.28,width:W,height:3,fill:'#e7c98b'},g);
[[.12,'#e0453a'],[.82,'#3b82f6']].forEach(([a,c],i)=>{E('rect',{x:W*a-16,y:H*.3,width:32,height:34,rx:4,fill:c},g);E('rect',{x:W*a-19,y:H*.3-4,width:38,height:6,rx:3,fill:'#fff',opacity:.7},g)});
// counter + stove
E('rect',{x:0,y:gy+24,width:W,height:H-gy-24,fill:GR('cnH','#8b6a4a','#6a4c32')},g);
E('rect',{x:sx-96,y:gy,width:192,height:30,rx:8,fill:GR('stH','#8e98a6','#5d6674')},g);E('rect',{x:sx-70,y:gy+6,width:140,height:6,rx:3,fill:'#2d333d'},g);
for(let k=-1;k<=1;k++)E('circle',{cx:sx+k*50,cy:gy+22,r:6,fill:'#c6ced8'},g);
// flame
const fh=14+8*Math.sin(tt*40);for(let k=-3;k<=3;k++){const fx=sx+k*14;E('path',{d:`M${fx-5} ${gy} Q${fx} ${gy-fh-Math.abs(k)} ${fx+5} ${gy}Z`,fill:'#ff8a3d'},g);E('path',{d:`M${fx-3} ${gy} Q${fx} ${gy-fh*.6} ${fx+3} ${gy}Z`,fill:'#5aa8ff'},g)}
// pot
const pw=104,ph=88,py=gy-fh-ph-4;E('rect',{x:sx-pw/2,y:py,width:pw,height:ph,rx:10,fill:GR('ptH','#e8edf3','#9aa6b5',1),stroke:'#6b7685',"stroke-width":3},g);
const lv=ph*(.3+.55*p.m);E('rect',{x:sx-pw/2+4,y:py+ph-lv-3,width:pw-8,height:lv,rx:6,fill:'#6db6ff',opacity:.9},g);
E('rect',{x:sx-pw/2-22,y:py+14,width:24,height:9,rx:4,fill:'#3a2a1a'},g);E('rect',{x:sx+pw/2-2,y:py+14,width:24,height:9,rx:4,fill:'#3a2a1a'},g);
T(g,sx,py+ph-lv/2,p.m.toFixed(1)+' kg',{'font-size':13,'font-weight':900,fill:'#0b3a73'});
// bubbles + steam
if(th>8)for(let k=0;k<5;k++){const bx=sx-30+k*15,by=py+ph-8-((tt*70+k*13)%(lv-6));E('circle',{cx:bx,cy:by,r:3,fill:'#fff',opacity:.8},g)}
if(th>25)for(let k=0;k<3;k++){const x=sx-20+k*20,o=Math.min(.6,th/60);E('path',{d:`M${x} ${py-4} q8 -12 0 -22 q-8 -12 0 -22`,stroke:'#fff',"stroke-width":5,fill:'none',opacity:o,"stroke-linecap":'round'},g)}
// thermometer
const tx=sx+pw/2+(P?44:70),tb=gy-6,tH=H*.3,tTop=tb-tH;E('rect',{x:tx-9,y:tTop,width:18,height:tH,rx:9,fill:'#f4f8ff',stroke:'#556',"stroke-width":3},g);E('circle',{cx:tx,cy:tb+4,r:13,fill:'#e0453a',stroke:'#556',"stroke-width":3},g);
const fr=Math.min(1,(tmp-20)/60);E('rect',{x:tx-4,y:tb-tH*fr,width:8,height:tH*fr+2,fill:'#e0453a'},g);
for(let k=0;k<=6;k++){const y=tb-tH*k/6;E('line',{x1:tx+10,y1:y,x2:tx+18,y2:y,stroke:'#556',"stroke-width":2},g);T(g,tx+34,y+4,(20+k*10)+'',{'font-size':11,'font-weight':900,fill:'#4a2e00'})}
T(g,tx,tTop-10,tmp.toFixed(0)+' °C',{'font-size':15,'font-weight':900,fill:'#b3261e'});
// timer
E('rect',{x:12,y:H*.42,width:78,height:40,rx:8,fill:'#1f2937'},g);T(g,51,H*.42+27,(p.t*tt).toFixed(0)+' s',{'font-size':19,'font-weight':900,fill:'#7CFC9a'});
T(g,W/2,H*.93,'500 W heater: temperature rises '+th.toFixed(1)+' °C',{'font-size':P?13:16,'font-weight':900,fill:'#fff'});
}
 function tbl(){const t=api.ctrl.querySelector('#tb');if(t)t.innerHTML=runs.slice(-4).map(r=>'<div>'+r+'</div>').join('')}
 sc.set=(i,v)=>{p[PR[i].k]=v;const s=api.ctrl.querySelector('#s'+i);if(s)s.value=v;const l=api.ctrl.querySelector('#l'+i);if(l)l.textContent=v+' '+PR[i].unit;if(!busy){tt=1;draw()}};
 sc.run=async()=>{if(busy)return;busy=true;const out=f(p);for(let i=0;i<=20;i++){tt=i/20;draw();await sc.sleep(55)}tt=1;draw();busy=false;
  const o=+out.toFixed(DEC);const row=PR.map(q=>q.label+' '+p[q.k]+' '+q.unit).join(', ')+' → '+OL+' '+o+' '+UNIT;runs.push(row);tbl();
  if(chal){if(Math.abs(out-TARGET)<=TOL)api.solved();else api.nope('You got '+o+' '+UNIT+'. '+(out<TARGET?'Too low':'Too high')+', aim for '+TARGET+' '+UNIT+'.')}
  else{seen.add(o);sc.say('Heater 500 W for '+p.t+' s warms '+p.m.toFixed(1)+' kg by '+out.toFixed(1)+' °C. More water means a smaller rise.','ok');L.snd.pop&&L.snd.pop();if(seen.size>=3){api.award('did');api.ready()}}};
 api.ctrl.innerHTML='<p style="margin:0 0 4px;font-size:14px">'+(chal?'<b>Challenge:</b> get <b>'+TARGET+' '+UNIT+'</b>. ':'<b>Change the sliders and press Run.</b> Try at least three different runs. ')+'</p>'+PR.map((q,i)=>'<label style="display:block;font-size:14px;margin:2px 0">'+q.label+': <b id="l'+i+'">'+q.v+' '+q.unit+'</b><br><input type="range" id="s'+i+'" min="'+q.min+'" max="'+q.max+'" step="'+q.step+'" value="'+q.v+'" style="width:100%"></label>').join('')+'<div class="row"><button class="pri" id="go">Run ▶</button></div><div id="tb" style="font-size:12px;margin-top:4px"></div>';
 PR.forEach((q,i)=>api.ctrl.querySelector('#s'+i).oninput=e=>sc.set(i,+e.target.value));
 api.ctrl.querySelector('#go').onclick=()=>sc.run();
 draw();sc.say(chal?'Find the right values, then press Run.':'Pick values and press Run.')},
demo:[[S=>S.run(),"Run with the starting values.",1600],[S=>{S.set(0,0.55);S.run()},'Change a value and run again.',1800]],
why:["Heat energy Q = <b>m × c × ΔT</b>, where c is the specific heat. For water c = 4200 J/kg°C.", "More mass needs more heat for the same rise. Longer heating gives more heat.", "Water has a high specific heat, so it heats and cools slowly. This keeps coastal places mild.", "Heat flows from hot to cold by conduction, convection and radiation."],
check:[{q:"Water has a high specific heat, so it…",options:["Heats quickly", "Heats slowly and holds heat", "Cannot be heated", "Is always cold"],answer:1,why:"It takes a lot of heat for each degree.",hint:"Slow."},
 {q:"Heating for twice as long raises the temperature…",options:["Half as much", "Twice as much", "The same", "None"],answer:1,why:"Double heat.",hint:"Proportional."},
 {q:"Heat flows from…",options:["cold to hot", "hot to cold", "neither", "both"],answer:1,why:"Always hot to cold.",hint:"Cooling."}],
challenge:{text:"Warm the water by <b>20 °C</b>. Choose how much water and how long to heat.",win:"Rise = (500 × t) ÷ (m × 4200). For example 0.5 kg for 84 s gives 20 °C."},
real:["Sea breezes happen because land heats faster than water.", "Hot water bottles keep warm because water holds heat.", "A heater coil heats water in a geyser."],
words:{"Heat": "Energy that flows from hot to cold.", "Temperature": "How hot or cold something is.", "Specific heat": "Heat needed to warm 1 kg by 1 °C.", "Conduction": "Heat travelling through a solid."}
});
