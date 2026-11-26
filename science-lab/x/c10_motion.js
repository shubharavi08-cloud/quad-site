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
 function draw(){g.innerHTML='';const out=f(p);const x0=40,x1=W-40,d=Math.min(out,100)/100*(x1-x0);E('rect',{x:x0-10,y:H*.62,width:x1-x0+20,height:10,rx:4,fill:'#9aa3b2'},g);for(let k=0;k<=10;k++){E('line',{x1:x0+k*(x1-x0)/10,y1:H*.62,x2:x0+k*(x1-x0)/10,y2:H*.62-8,stroke:'#667',"stroke-width":2},g);if(k%2==0)T(g,x0+k*(x1-x0)/10,H*.62+28,k*10+' m',{"font-size":12})}const cx=x0+d*tt;E('rect',{x:cx-22,y:H*.62-28,width:44,height:18,rx:6,fill:'#e0453a'},g);E('rect',{x:cx-12,y:H*.62-40,width:24,height:14,rx:5,fill:'#ff8a7a'},g);E('circle',{cx:cx-12,cy:H*.62-8,r:7,fill:'#333'},g);E('circle',{cx:cx+12,cy:H*.62-8,r:7,fill:'#333'},g);T(g,W/2,H*.35,'Distance so far: '+(out*tt).toFixed(0)+' m',{"font-size":18,"font-weight":900,fill:'#237a47'});}
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
