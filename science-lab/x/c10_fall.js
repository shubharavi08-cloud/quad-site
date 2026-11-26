QLab.register({
id:'c10_fall',code:'10-P3',title:"Gravitation: free fall",grade:10,subject:'Physics',emoji:'🍎',
hook:{title:"Does a heavy ball fall faster than a light one?",text:"Galileo said that without air, all things fall together. Drop balls from different heights and with different masses."},
prior:"You know that things fall to the ground when dropped.",
guess:{q:"Ignoring air, a 10 kg ball and a 1 kg ball dropped together hit the ground…",options:["10 kg first", "1 kg first", "at the same time", "neither falls"],answer:2,hint:"Gravity gives every object the same acceleration, 9.8 m/s².",after:"Drop from several heights."},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge;
 const sc=L.scene(api.stage,{alt:"Interactive experiment: Gravitation: free fall"});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const PR=[{k:"h",label:"Height",min:5,max:80,step:5,v:20,unit:"m"},{k:"m",label:"Mass",min:1,max:10,step:1,v:5,unit:"kg"}],TARGET=3,TOL=0.1,DEC=2,UNIT="s",OL="Fall time";
 const p={};PR.forEach(q=>p[q.k]=q.v);
 const g=E('g',{},sc.gMain);let tt=1,busy=false,runs=[],seen=new Set();
 const f=p=>(Math.sqrt(2*p.h/9.8));
 const T=(g,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:''},o||{}),g);e.textContent=t;return e};
 function draw(){g.innerHTML='';const out=f(p);const top=H*.18,bot=H*.74;E('rect',{x:W/2-60,y:bot+8,width:120,height:10,rx:4,fill:'#8a5a3a'},g);E('line',{x1:W/2-80,y1:top,x2:W/2-80,y2:bot+8,stroke:'#aab',"stroke-width":2,"stroke-dasharray":'5 5'},g);T(g,W/2-100,(top+bot)/2,p.h+' m',{"font-size":14,"font-weight":900});const y=top+(bot-top)*Math.pow(tt,2);E('circle',{cx:W/2,cy:y,r:8+p.m*1.5,fill:'#e0453a',stroke:'#822',"stroke-width":3},g);T(g,W/2,y+4,p.m+'',{"font-size":12,"font-weight":900,fill:'#fff'});T(g,W/2+110,H*.3,'Time: '+(out*tt).toFixed(2)+' s',{"font-size":17,"font-weight":900,fill:'#237a47'});}
 function tbl(){const t=api.ctrl.querySelector('#tb');if(t)t.innerHTML=runs.slice(-4).map(r=>'<div>'+r+'</div>').join('')}
 sc.set=(i,v)=>{p[PR[i].k]=v;const s=api.ctrl.querySelector('#s'+i);if(s)s.value=v;const l=api.ctrl.querySelector('#l'+i);if(l)l.textContent=v+' '+PR[i].unit;if(!busy){tt=1;draw()}};
 sc.run=async()=>{if(busy)return;busy=true;const out=f(p);for(let i=0;i<=20;i++){tt=i/20;draw();await sc.sleep(55)}tt=1;draw();busy=false;
  const o=+out.toFixed(DEC);const row=PR.map(q=>q.label+' '+p[q.k]+' '+q.unit).join(', ')+' → '+OL+' '+o+' '+UNIT;runs.push(row);tbl();
  if(chal){if(Math.abs(out-TARGET)<=TOL)api.solved();else api.nope('You got '+o+' '+UNIT+'. '+(out<TARGET?'Too low':'Too high')+', aim for '+TARGET+' '+UNIT+'.')}
  else{seen.add(o);sc.say('Fall time '+out.toFixed(2)+' s from '+p.h+' m. Change the mass: the time does not change!','ok');L.snd.pop&&L.snd.pop();if(seen.size>=3){api.award('did');api.ready()}}};
 api.ctrl.innerHTML='<p style="margin:0 0 4px;font-size:14px">'+(chal?'<b>Challenge:</b> get <b>'+TARGET+' '+UNIT+'</b>. ':'<b>Change the sliders and press Run.</b> Try at least three different runs. ')+'</p>'+PR.map((q,i)=>'<label style="display:block;font-size:14px;margin:2px 0">'+q.label+': <b id="l'+i+'">'+q.v+' '+q.unit+'</b><br><input type="range" id="s'+i+'" min="'+q.min+'" max="'+q.max+'" step="'+q.step+'" value="'+q.v+'" style="width:100%"></label>').join('')+'<div class="row"><button class="pri" id="go">Run ▶</button></div><div id="tb" style="font-size:12px;margin-top:4px"></div>';
 PR.forEach((q,i)=>api.ctrl.querySelector('#s'+i).oninput=e=>sc.set(i,+e.target.value));
 api.ctrl.querySelector('#go').onclick=()=>sc.run();
 draw();sc.say(chal?'Find the right values, then press Run.':'Pick values and press Run.')},
demo:[[S=>S.run(),"Run with the starting values.",1600],[S=>{S.set(0,42);S.run()},'Change a value and run again.',1800]],
why:["Every falling object gains speed by about <b>9.8 m/s every second</b>. This is the acceleration due to gravity, g.", "Without air, a feather and a hammer fall together. Mass does not change the fall time.", "Fall time from rest: t = √(2h ÷ g). Four times the height takes only twice the time.", "Gravity is a pull between all masses. The Earth pulls objects towards its centre."],
check:[{q:"Does a heavier ball fall faster (no air)?",options:["Yes", "No, they fall together", "Only on the Moon", "Only in water"],answer:1,why:"g is the same for all.",hint:"Galileo."},
 {q:"The value of g on Earth is about…",options:["1.6 m/s²", "9.8 m/s²", "98 m/s²", "0.98 m/s²"],answer:1,why:"About 10.",hint:"Ten-ish."},
 {q:"Dropping from 4 times the height takes…",options:["4 times as long", "twice as long", "the same time", "half as long"],answer:1,why:"t ∝ √h.",hint:"Square root."}],
challenge:{text:"Make the ball take <b>3 seconds</b> to fall. Choose the height. Does the mass matter?",win:"h = ½ g t², about 44 m. The mass makes no difference."},
real:["Astronauts on the Moon dropped a hammer and a feather and both landed together.", "Parachutes work by using air to slow the fall.", "Rain falls faster from taller clouds."],
words:{"Gravity": "The force of attraction between masses.", "Free fall": "Falling under gravity alone.", "g": "Acceleration due to gravity, about 9.8 m/s².", "Weight": "The pull of gravity on a mass."}
});
