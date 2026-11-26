QLab.register({
id:'c10_motion',code:'10-P1',title:"Motion: speed, distance and time",grade:10,subject:'Physics',emoji:'🚗',
hook:{title:"A car goes 60 km in one hour. How far in half an hour?",text:"Speed tells how fast something moves. Change the speed and the time and watch how far the car goes."},
prior:"You know that faster things cover more distance.",
guess:{q:"A car moves at 10 m/s for 4 s. How far does it go?",options:["14 m", "40 m", "2.5 m", "4 m"],answer:1,hint:"distance = speed × time.",after:"Try your own speeds and times."},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge;
 const sc=L.scene(api.stage,{alt:"Interactive experiment: Motion: speed, distance and time"});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const PR=[{k:"v",label:"Speed",min:2,max:20,step:1,v:8,unit:"m/s"},{k:"t",label:"Time",min:1,max:10,step:1,v:4,unit:"s"}],TARGET=60,TOL=1,DEC=0,UNIT="m",OL="Distance";
 const p={};PR.forEach(q=>p[q.k]=q.v);
 const g=E('g',{},sc.gMain);let tt=1,busy=false,runs=[],seen=new Set();
 const f=p=>(p.v*p.t);
 const T=(g,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:''},o||{}),g);e.textContent=t;return e};
 const svg=g.ownerSVGElement;let defs=svg.querySelector('defs')||E('defs',{},svg);
 const GR=(id,a,b,h)=>{if(!svg.querySelector('#'+id)){const l=E('linearGradient',{id,x1:0,y1:0,x2:h?1:0,y2:h?0:1},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const RG=(id,a,b)=>{if(!svg.querySelector('#'+id)){const l=E('radialGradient',{id,cx:'35%',cy:'30%',r:'70%'},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const sh=(x,y,w)=>E('ellipse',{cx:x,cy:y,rx:w,ry:w*.2,fill:'rgba(0,0,0,.25)'},g);
 const wheel=(x,y,r,rot)=>{E('circle',{cx:x,cy:y,r,fill:'#222'},g);E('circle',{cx:x,cy:y,r:r*.58,fill:'#d5dbe3'},g);for(let k=0;k<5;k++){const a=rot+k*1.2566;E('line',{x1:x,y1:y,x2:x+Math.cos(a)*r*.55,y2:y+Math.sin(a)*r*.55,stroke:'#7b8493','stroke-width':2},g)}E('circle',{cx:x,cy:y,r:r*.16,fill:'#555'},g)};
 const cloud=(x,y,s)=>{[[0,0,16],[16,-6,20],[34,0,16],[18,6,16]].forEach(c=>E('circle',{cx:x+c[0]*s,cy:y+c[1]*s,r:c[2]*s,fill:'#fff',opacity:.95},g))};
 function draw(){g.innerHTML='';const out=f(p);const gy=H*.64,x0=44,x1=W-44,S=out>0?Math.min(out,200)/200:0;
E('rect',{x:0,y:0,width:W,height:gy,fill:GR('skyM','#7cc8ff','#eaf8ff')},g);
E('circle',{cx:W-58,cy:H*.3,r:26,fill:'#ffd84a'},g);E('circle',{cx:W-58,cy:H*.3,r:34,fill:'#ffd84a',opacity:.3},g);
cloud(W*.18,H*.33,.9);cloud(W*.56,H*.27,.7);
E('path',{d:`M0 ${gy} L0 ${gy-26} Q${W*.2} ${gy-80} ${W*.42} ${gy-30} T${W*.8} ${gy-40} T${W} ${gy-24} V${gy}Z`,fill:'#7fc873'},g);
[[.08,1],[.3,.8],[.52,1.1],[.78,.9],[.93,1]].forEach(([a,s])=>{E('rect',{x:W*a-3,y:gy-26*s,width:6,height:22*s,fill:'#7a4a22'},g);E('circle',{cx:W*a,cy:gy-34*s,r:15*s,fill:'#3f9a4b'},g);E('circle',{cx:W*a-6*s,cy:gy-30*s,r:10*s,fill:'#4fb25a'},g)});
E('rect',{x:0,y:gy,width:W,height:H-gy,fill:GR('grS','#6cc36a','#4aa955')},g);
const ry=gy+14,rh=54;E('rect',{x:0,y:ry,width:W,height:rh,fill:GR('rdM','#5a606c','#3f444e')},g);E('rect',{x:0,y:ry,width:W,height:3,fill:'#fff'},g);E('rect',{x:0,y:ry+rh-3,width:W,height:3,fill:'#fff'},g);
for(let k=0;k<22;k++)E('rect',{x:k*(W/22)+4,y:ry+rh/2-2,width:W/22-14,height:4,fill:'#ffe066'},g);
for(let k=0;k<=10;k++){const x=x0+k*(x1-x0)/10;E('rect',{x:x-2,y:ry+rh+4,width:4,height:12,fill:'#fff'},g);if(k%2==0)T(g,x,ry+rh+34,k*20+' m',{'font-size':13,'font-weight':900,fill:'#17402a'})}
const cx=x0+(x1-x0)*S*tt,yb=ry+rh/2+10;
sh(cx,yb+16,44);
if(tt<1&&tt>0)for(let k=0;k<4;k++)E('line',{x1:cx-46-k*8,y1:yb-18+k*6,x2:cx-46-k*8-(14+p.v),y2:yb-18+k*6,stroke:'#fff',opacity:.7,'stroke-width':3,'stroke-linecap':'round'},g);
E('rect',{x:cx-40,y:yb-24,width:80,height:22,rx:9,fill:GR('carB','#ff6a5b','#c62d22')},g);
E('path',{d:`M${cx-22} ${yb-24} L${cx-12} ${yb-42} L${cx+14} ${yb-42} L${cx+28} ${yb-24}Z`,fill:'#e0453a'},g);
E('path',{d:`M${cx-16} ${yb-26} L${cx-9} ${yb-39} L${cx-1} ${yb-39} L${cx-1} ${yb-26}Z`,fill:'#bfe6ff'},g);
E('path',{d:`M${cx+2} ${yb-26} L${cx+2} ${yb-39} L${cx+12} ${yb-39} L${cx+23} ${yb-26}Z`,fill:'#bfe6ff'},g);
E('circle',{cx:cx+36,cy:yb-14,r:4,fill:'#fff59a'},g);E('rect',{x:cx-41,y:yb-16,width:5,height:6,fill:'#ffb3a8'},g);
wheel(cx-22,yb,9,cx/9);wheel(cx+22,yb,9,cx/9);
// stopwatch
const sx=P?54:70,sy=H*.3;E('circle',{cx:sx,cy:sy,r:30,fill:'#f4f6fa',stroke:'#334',"stroke-width":4},g);E('rect',{x:sx-5,y:sy-40,width:10,height:8,rx:2,fill:'#334'},g);
for(let k=0;k<12;k++){const a=k*Math.PI/6;E('line',{x1:sx+Math.sin(a)*24,y1:sy-Math.cos(a)*24,x2:sx+Math.sin(a)*28,y2:sy-Math.cos(a)*28,stroke:'#334'},g)}
const ta=(p.t*tt)/10*2*Math.PI;E('line',{x1:sx,y1:sy,x2:sx+Math.sin(ta)*22,y2:sy-Math.cos(ta)*22,stroke:'#e0453a',"stroke-width":3,"stroke-linecap":'round'},g);T(g,sx,sy+46,(p.t*tt).toFixed(1)+' s',{'font-size':15,'font-weight':900,fill:'#17402a'});
T(g,W/2,H*.975,'Speed '+p.v+' m/s × '+p.t+' s = '+out+' m',{'font-size':P?15:17,'font-weight':900,fill:'#17402a'});
}
 function tbl(){const t=api.ctrl.querySelector('#tb');if(t)t.innerHTML=runs.slice(-4).map(r=>'<div>'+r+'</div>').join('')}
 sc.set=(i,v)=>{p[PR[i].k]=v;const s=api.ctrl.querySelector('#s'+i);if(s)s.value=v;const l=api.ctrl.querySelector('#l'+i);if(l)l.textContent=v+' '+PR[i].unit;if(!busy){tt=1;draw()}};
 sc.run=async()=>{if(busy)return;busy=true;const out=f(p);for(let i=0;i<=20;i++){tt=i/20;draw();await sc.sleep(55)}tt=1;draw();busy=false;
  const o=+out.toFixed(DEC);const row=PR.map(q=>q.label+' '+p[q.k]+' '+q.unit).join(', ')+' → '+OL+' '+o+' '+UNIT;runs.push(row);tbl();
  if(chal){if(Math.abs(out-TARGET)<=TOL)api.solved();else api.nope('You got '+o+' '+UNIT+'. '+(out<TARGET?'Too low':'Too high')+', aim for '+TARGET+' '+UNIT+'.')}
  else{seen.add(o);sc.say('Speed '+p.v+' m/s × '+p.t+' s = '+out+' m. Distance = speed × time.','ok');L.snd.pop&&L.snd.pop();if(seen.size>=3){api.award('did');api.ready()}}};
 api.ctrl.innerHTML='<p style="margin:0 0 4px;font-size:14px">'+(chal?'<b>Challenge:</b> get <b>'+TARGET+' '+UNIT+'</b>. ':'<b>Change the sliders and press Run.</b> Try at least three different runs. ')+'</p>'+PR.map((q,i)=>'<label style="display:block;font-size:14px;margin:2px 0">'+q.label+': <b id="l'+i+'">'+q.v+' '+q.unit+'</b><br><input type="range" id="s'+i+'" min="'+q.min+'" max="'+q.max+'" step="'+q.step+'" value="'+q.v+'" style="width:100%"></label>').join('')+'<div class="row"><button class="pri" id="go">Run ▶</button></div><div id="tb" style="font-size:12px;margin-top:4px"></div>';
 PR.forEach((q,i)=>api.ctrl.querySelector('#s'+i).oninput=e=>sc.set(i,+e.target.value));
 api.ctrl.querySelector('#go').onclick=()=>sc.run();
 draw();sc.say(chal?'Find the right values, then press Run.':'Pick values and press Run.')},
demo:[[S=>S.run(),"Run with the starting values.",1600],[S=>{S.set(0,11);S.run()},'Change a value and run again.',1800]],
why:["<span class=\"word\">Speed</span> = distance ÷ time. So <b>distance = speed × time</b>.", "Speed in SI is measured in metres per second (m/s). 36 km/h is the same as 10 m/s.", "Doubling the time doubles the distance if the speed is the same.", "A distance-time graph of steady speed is a straight line sloping up."],
check:[{q:"A bus goes 90 km in 3 h. Its speed is…",options:["20 km/h", "30 km/h", "270 km/h", "93 km/h"],answer:1,why:"90 ÷ 3 = 30.",hint:"Divide."},
 {q:"At 5 m/s, how far in 6 s?",options:["11 m", "30 m", "1.2 m", "5 m"],answer:1,why:"Distance = speed × time.",hint:"Multiply."},
 {q:"The SI unit of speed is…",options:["km/h", "m/s", "m", "s"],answer:1,why:"Metres per second.",hint:"Metre over second."}],
challenge:{text:"Make the car travel <b>exactly 60 m</b>. Choose a speed and a time.",win:"Any pair with speed × time = 60 m works, such as 10 m/s for 6 s or 12 m/s for 5 s."},
real:["Road signs show speed in km/h.", "Athletes are timed over a fixed distance to find speed.", "Trains and flights are planned using distance ÷ speed."],
words:{"Speed": "How fast something moves: distance ÷ time.", "Distance": "How far something has moved.", "Velocity": "Speed in a given direction.", "Uniform motion": "Moving at a steady speed in a straight line."}
});
