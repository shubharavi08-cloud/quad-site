QLab.register({
id:'c10_work',code:'10-P5',title:"Work: force times distance",grade:10,subject:'Physics',emoji:'📦',
hook:{title:"Pushing a wall with all your might does no work. Why?",text:"In science, work is done only when a force moves something. Push a crate with different forces over different distances."},
prior:"You know that pushing or lifting heavy things is tiring.",
guess:{q:"You push a heavy wall hard but it does not move. The work you do is…",options:["large", "zero", "negative", "infinite"],answer:1,hint:"Work needs movement.",after:"Push the crate."},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge;
 const sc=L.scene(api.stage,{alt:"Interactive experiment: Work: force times distance"});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const PR=[{k:"F",label:"Force",min:10,max:200,step:10,v:50,unit:"N"},{k:"d",label:"Distance",min:1,max:10,step:1,v:4,unit:"m"}],TARGET=500,TOL=1,DEC=0,UNIT="J",OL="Work done";
 const p={};PR.forEach(q=>p[q.k]=q.v);
 const g=E('g',{},sc.gMain);let tt=1,busy=false,runs=[],seen=new Set();
 const f=p=>(p.F*p.d);
 const T=(g,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:''},o||{}),g);e.textContent=t;return e};
 function draw(){g.innerHTML='';const out=f(p);const y=H*.64;E('rect',{x:30,y:y+14,width:W-60,height:8,rx:4,fill:'#9aa3b2'},g);const cx=60+(W-200)*(p.d/10)*tt;E('rect',{x:cx,y:y-34,width:50,height:48,rx:6,fill:'#c68642',stroke:'#7a4a14',"stroke-width":3},g);E('circle',{cx:cx-34,cy:y-30,r:12,fill:'#ffd9a0'},g);E('line',{x1:cx-24,y1:y-24,x2:cx,y2:y-14,stroke:'#e0453a',"stroke-width":p.F/20+3},g);T(g,W/2,H*.3,'Work = '+p.F+' N × '+p.d+' m = '+out+' J',{"font-size":17,"font-weight":900,fill:'#237a47'});T(g,W/2,H*.4,'moved '+(p.d*tt).toFixed(1)+' m',{"font-size":14});}
 function tbl(){const t=api.ctrl.querySelector('#tb');if(t)t.innerHTML=runs.slice(-4).map(r=>'<div>'+r+'</div>').join('')}
 sc.set=(i,v)=>{p[PR[i].k]=v;const s=api.ctrl.querySelector('#s'+i);if(s)s.value=v;const l=api.ctrl.querySelector('#l'+i);if(l)l.textContent=v+' '+PR[i].unit;if(!busy){tt=1;draw()}};
 sc.run=async()=>{if(busy)return;busy=true;const out=f(p);for(let i=0;i<=20;i++){tt=i/20;draw();await sc.sleep(55)}tt=1;draw();busy=false;
  const o=+out.toFixed(DEC);const row=PR.map(q=>q.label+' '+p[q.k]+' '+q.unit).join(', ')+' → '+OL+' '+o+' '+UNIT;runs.push(row);tbl();
  if(chal){if(Math.abs(out-TARGET)<=TOL)api.solved();else api.nope('You got '+o+' '+UNIT+'. '+(out<TARGET?'Too low':'Too high')+', aim for '+TARGET+' '+UNIT+'.')}
  else{seen.add(o);sc.say(p.F+' N × '+p.d+' m = '+out+' J of work.','ok');L.snd.pop&&L.snd.pop();if(seen.size>=3){api.award('did');api.ready()}}};
 api.ctrl.innerHTML='<p style="margin:0 0 4px;font-size:14px">'+(chal?'<b>Challenge:</b> get <b>'+TARGET+' '+UNIT+'</b>. ':'<b>Change the sliders and press Run.</b> Try at least three different runs. ')+'</p>'+PR.map((q,i)=>'<label style="display:block;font-size:14px;margin:2px 0">'+q.label+': <b id="l'+i+'">'+q.v+' '+q.unit+'</b><br><input type="range" id="s'+i+'" min="'+q.min+'" max="'+q.max+'" step="'+q.step+'" value="'+q.v+'" style="width:100%"></label>').join('')+'<div class="row"><button class="pri" id="go">Run ▶</button></div><div id="tb" style="font-size:12px;margin-top:4px"></div>';
 PR.forEach((q,i)=>api.ctrl.querySelector('#s'+i).oninput=e=>sc.set(i,+e.target.value));
 api.ctrl.querySelector('#go').onclick=()=>sc.run();
 draw();sc.say(chal?'Find the right values, then press Run.':'Pick values and press Run.')},
demo:[[S=>S.run(),"Run with the starting values.",1600],[S=>{S.set(0,105);S.run()},'Change a value and run again.',1800]],
why:["<span class=\"word\">Work</span> = force × distance moved in the direction of the force: W = F × d.", "Work is measured in joules. 1 J is the work done by 1 N moving something 1 m.", "No movement means no work, however hard you push.", "<span class=\"word\">Power</span> is the rate of doing work: P = W ÷ t, in watts."],
check:[{q:"Pushing 20 N over 3 m does…",options:["23 J", "60 J", "6.7 J", "17 J"],answer:1,why:"20 × 3.",hint:"Multiply."},
 {q:"Which does NO work in science?",options:["Pushing a car that moves", "Holding a heavy bag still", "Lifting a book", "Climbing stairs"],answer:1,why:"No distance, no work.",hint:"Standing."},
 {q:"The unit of work is the…",options:["newton", "joule", "watt", "kg"],answer:1,why:"Joule.",hint:"J."}],
challenge:{text:"Do exactly <b>500 J</b> of work. Choose the force and the distance.",win:"Force × distance = 500, for example 100 N × 5 m or 50 N × 10 m."},
real:["A crane does work against gravity lifting loads.", "A lift motor is rated in watts (power).", "A food label gives energy in kilojoules."],
words:{"Work": "Force × distance moved: the energy transferred.", "Joule": "Unit of work and energy.", "Power": "Work done per second.", "Watt": "The unit of power: 1 J per second."}
});
