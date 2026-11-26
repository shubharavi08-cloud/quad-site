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
 function draw(){g.innerHTML='';const out=f(p);const bx=W/2-50,by=H*.3,bw=100,bh=H*.4;E('rect',{x:bx,y:by,width:bw,height:bh,rx:8,fill:'rgba(120,180,255,.25)',stroke:'#456',"stroke-width":4},g);const lv=bh*(0.35+0.5*p.m);E('rect',{x:bx+3,y:by+bh-lv,width:bw-6,height:lv-2,fill:'#6db6ff'},g);E('rect',{x:bx+20,y:by+bh+4,width:60,height:12,rx:3,fill:'#e0453a'},g);const th=out*tt;E('rect',{x:bx+bw+30,y:by,width:16,height:bh,rx:8,fill:'#eee',stroke:'#456',"stroke-width":3},g);const rh=Math.min(bh,bh*(th/60));E('rect',{x:bx+bw+34,y:by+bh-rh,width:8,height:rh,fill:'#e0453a'},g);T(g,bx+bw+38,by-8,(20+th).toFixed(0)+' °C',{"font-size":14,"font-weight":900});T(g,bx+bw/2,by-8,p.m.toFixed(1)+' kg',{"font-size":13,"font-weight":900});T(g,W/2,H*.92,'Start 20 °C. Rise '+th.toFixed(1)+' °C',{"font-size":15,"font-weight":900,fill:'#237a47'});}
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
