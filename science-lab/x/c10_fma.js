QLab.register({
id:'c10_fma',code:'10-P2',title:"Force and motion: Newton's second law",grade:10,subject:'Physics',emoji:'🛒',
hook:{title:"An empty trolley is easy to push fast. A full one is hard. Why?",text:"Force makes things speed up, and heavier things speed up less. Change the force and the mass and watch the acceleration."},
prior:"You know that a push makes a trolley move and a heavier trolley is harder to move.",
guess:{q:"If you double the force on the same trolley, its acceleration…",options:["halves", "stays the same", "doubles", "becomes zero"],answer:2,hint:"More push, faster change in speed.",after:"Try it with different forces and masses."},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge;
 const sc=L.scene(api.stage,{alt:"Interactive experiment: Force and motion: Newton's second law"});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const PR=[{k:"F",label:"Force",min:2,max:20,step:1,v:10,unit:"N"},{k:"m",label:"Mass",min:1,max:10,step:1,v:5,unit:"kg"}],TARGET=2,TOL=0.05,DEC=1,UNIT="m/s²",OL="Acceleration";
 const p={};PR.forEach(q=>p[q.k]=q.v);
 const g=E('g',{},sc.gMain);let tt=1,busy=false,runs=[],seen=new Set();
 const f=p=>(p.F/p.m);
 const T=(g,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:''},o||{}),g);e.textContent=t;return e};
 function draw(){g.innerHTML='';const out=f(p);const y=H*.62;E('rect',{x:30,y:y+16,width:W-60,height:8,rx:4,fill:'#9aa3b2'},g);const cx=70+(W-190)*tt*tt*Math.min(1,out/4);E('rect',{x:cx,y:y-24,width:60+p.m*3,height:26,rx:6,fill:'#3b82f6'},g);E('circle',{cx:cx+12,cy:y+16,r:8,fill:'#222'},g);E('circle',{cx:cx+48+p.m*3,cy:y+16,r:8,fill:'#222'},g);T(g,cx+30+p.m*1.5,y-6,p.m+' kg',{"font-size":13,"font-weight":900,fill:'#fff'});const al=10+p.F*5;E('line',{x1:cx-al,y1:y-10,x2:cx-2,y2:y-10,stroke:'#e0453a',"stroke-width":6},g);E('polygon',{points:`${cx-2},${y-18} ${cx+8},${y-10} ${cx-2},${y-2}`,fill:'#e0453a'},g);T(g,W/2,H*.32,'a = F ÷ m = '+p.F+' ÷ '+p.m+' = '+out.toFixed(1)+' m/s²',{"font-size":17,"font-weight":900,fill:'#237a47'});}
 function tbl(){const t=api.ctrl.querySelector('#tb');if(t)t.innerHTML=runs.slice(-4).map(r=>'<div>'+r+'</div>').join('')}
 sc.set=(i,v)=>{p[PR[i].k]=v;const s=api.ctrl.querySelector('#s'+i);if(s)s.value=v;const l=api.ctrl.querySelector('#l'+i);if(l)l.textContent=v+' '+PR[i].unit;if(!busy){tt=1;draw()}};
 sc.run=async()=>{if(busy)return;busy=true;const out=f(p);for(let i=0;i<=20;i++){tt=i/20;draw();await sc.sleep(55)}tt=1;draw();busy=false;
  const o=+out.toFixed(DEC);const row=PR.map(q=>q.label+' '+p[q.k]+' '+q.unit).join(', ')+' → '+OL+' '+o+' '+UNIT;runs.push(row);tbl();
  if(chal){if(Math.abs(out-TARGET)<=TOL)api.solved();else api.nope('You got '+o+' '+UNIT+'. '+(out<TARGET?'Too low':'Too high')+', aim for '+TARGET+' '+UNIT+'.')}
  else{seen.add(o);sc.say('Force '+p.F+' N on '+p.m+' kg gives '+out.toFixed(1)+' m/s². F = m × a.','ok');L.snd.pop&&L.snd.pop();if(seen.size>=3){api.award('did');api.ready()}}};
 api.ctrl.innerHTML='<p style="margin:0 0 4px;font-size:14px">'+(chal?'<b>Challenge:</b> get <b>'+TARGET+' '+UNIT+'</b>. ':'<b>Change the sliders and press Run.</b> Try at least three different runs. ')+'</p>'+PR.map((q,i)=>'<label style="display:block;font-size:14px;margin:2px 0">'+q.label+': <b id="l'+i+'">'+q.v+' '+q.unit+'</b><br><input type="range" id="s'+i+'" min="'+q.min+'" max="'+q.max+'" step="'+q.step+'" value="'+q.v+'" style="width:100%"></label>').join('')+'<div class="row"><button class="pri" id="go">Run ▶</button></div><div id="tb" style="font-size:12px;margin-top:4px"></div>';
 PR.forEach((q,i)=>api.ctrl.querySelector('#s'+i).oninput=e=>sc.set(i,+e.target.value));
 api.ctrl.querySelector('#go').onclick=()=>sc.run();
 draw();sc.say(chal?'Find the right values, then press Run.':'Pick values and press Run.')},
demo:[[S=>S.run(),"Run with the starting values.",1600],[S=>{S.set(0,11);S.run()},'Change a value and run again.',1800]],
why:["Newton's second law: <b>F = m × a</b>, so a = F ÷ m.", "The same force gives a heavier object a smaller acceleration.", "Force is measured in newtons (N). 1 N gives 1 kg an acceleration of 1 m/s².", "Balanced forces cause no acceleration; an unbalanced force does."],
check:[{q:"A 2 kg trolley gets a 10 N push. Its acceleration is…",options:["5 m/s²", "20 m/s²", "0.2 m/s²", "8 m/s²"],answer:0,why:"a = F ÷ m = 10 ÷ 2.",hint:"Divide."},
 {q:"Doubling the mass with the same force makes acceleration…",options:["double", "half", "same", "zero"],answer:1,why:"a = F ÷ m.",hint:"Heavier moves less."},
 {q:"The unit of force is the…",options:["joule", "newton", "watt", "pascal"],answer:1,why:"Named after Newton.",hint:"N."}],
challenge:{text:"Make the trolley accelerate at <b>exactly 2 m/s²</b>. Choose the force and the mass.",win:"F ÷ m = 2, for example 10 N on 5 kg or 8 N on 4 kg."},
real:["A loaded truck needs a stronger engine to accelerate like an empty one.", "Rockets lose mass as fuel burns, so they accelerate more.", "Seat belts apply a large force to stop you in a crash."],
words:{"Force": "A push or a pull, measured in newtons.", "Mass": "The amount of matter in an object, in kg.", "Acceleration": "The rate at which velocity changes.", "Newton": "The unit of force (N)."}
});
