QLab.register({
id:'c10_energy',code:'10-P4',title:"Energy: the swinging pendulum",grade:10,subject:'Physics',emoji:'⚖️',
hook:{title:"A swing is fastest at the bottom and stops at the top. Where does the energy go?",text:"Lift the bob higher to give it more potential energy. It changes into kinetic energy as it swings down."},
prior:"You know that moving things have energy and that lifted things can fall.",
guess:{q:"At the lowest point of a swing, the bob has the most…",options:["potential energy", "kinetic energy", "mass", "weight"],answer:1,hint:"It is moving fastest there.",after:"Release it from different heights."},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge;
 const sc=L.scene(api.stage,{alt:"Interactive experiment: Energy: the swinging pendulum"});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const PR=[{k:"h",label:"Release height",min:0.1,max:1,step:0.05,v:0.5,unit:"m"},{k:"m",label:"Mass",min:1,max:5,step:1,v:2,unit:"kg"}],TARGET=3,TOL=0.12,DEC=2,UNIT="m/s",OL="Speed at the bottom";
 const p={};PR.forEach(q=>p[q.k]=q.v);
 const g=E('g',{},sc.gMain);let tt=1,busy=false,runs=[],seen=new Set();
 const f=p=>(Math.sqrt(2*9.8*p.h));
 const T=(g,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:''},o||{}),g);e.textContent=t;return e};
 function draw(){g.innerHTML='';const out=f(p);const px=W/2,py=H*.26,Lr=H*.4;const ang=Math.acos(1-p.h);const a=ang*Math.cos(tt*Math.PI/2);const bx=px+Lr*Math.sin(a),by=py+Lr*Math.cos(a);E('line',{x1:px-50,y1:py,x2:px+50,y2:py,stroke:'#556',"stroke-width":6},g);E('line',{x1:px,y1:py,x2:bx,y2:by,stroke:'#556',"stroke-width":3},g);E('circle',{cx:bx,cy:by,r:10+p.m*2,fill:'#f59e0b',stroke:'#9a5b00',"stroke-width":3},g);const tot=p.m*9.8*p.h,pe=p.m*9.8*(1-Math.cos(a)),ke=Math.max(0,tot-pe);const mx=5*9.8,sx=W-70,bh=H*.4,y0=H*.3;const hp=bh*Math.min(1,pe/mx),hk=bh*Math.min(1,ke/mx);E('rect',{x:sx-30,y:y0+bh-hp,width:20,height:Math.max(1,hp),fill:'#3b82f6'},g);E('rect',{x:sx,y:y0+bh-hk,width:20,height:Math.max(1,hk),fill:'#e0453a'},g);T(g,sx-20,y0+bh+16,'PE',{"font-size":12,"font-weight":900});T(g,sx+10,y0+bh+16,'KE',{"font-size":12,"font-weight":900});T(g,W/2,H*.88,'Speed at bottom: '+out.toFixed(2)+' m/s',{"font-size":16,"font-weight":900,fill:'#237a47'});}
 function tbl(){const t=api.ctrl.querySelector('#tb');if(t)t.innerHTML=runs.slice(-4).map(r=>'<div>'+r+'</div>').join('')}
 sc.set=(i,v)=>{p[PR[i].k]=v;const s=api.ctrl.querySelector('#s'+i);if(s)s.value=v;const l=api.ctrl.querySelector('#l'+i);if(l)l.textContent=v+' '+PR[i].unit;if(!busy){tt=1;draw()}};
 sc.run=async()=>{if(busy)return;busy=true;const out=f(p);for(let i=0;i<=20;i++){tt=i/20;draw();await sc.sleep(55)}tt=1;draw();busy=false;
  const o=+out.toFixed(DEC);const row=PR.map(q=>q.label+' '+p[q.k]+' '+q.unit).join(', ')+' → '+OL+' '+o+' '+UNIT;runs.push(row);tbl();
  if(chal){if(Math.abs(out-TARGET)<=TOL)api.solved();else api.nope('You got '+o+' '+UNIT+'. '+(out<TARGET?'Too low':'Too high')+', aim for '+TARGET+' '+UNIT+'.')}
  else{seen.add(o);sc.say('From '+p.h.toFixed(2)+' m the speed at the bottom is '+out.toFixed(2)+' m/s. Potential energy turned into kinetic energy.','ok');L.snd.pop&&L.snd.pop();if(seen.size>=3){api.award('did');api.ready()}}};
 api.ctrl.innerHTML='<p style="margin:0 0 4px;font-size:14px">'+(chal?'<b>Challenge:</b> get <b>'+TARGET+' '+UNIT+'</b>. ':'<b>Change the sliders and press Run.</b> Try at least three different runs. ')+'</p>'+PR.map((q,i)=>'<label style="display:block;font-size:14px;margin:2px 0">'+q.label+': <b id="l'+i+'">'+q.v+' '+q.unit+'</b><br><input type="range" id="s'+i+'" min="'+q.min+'" max="'+q.max+'" step="'+q.step+'" value="'+q.v+'" style="width:100%"></label>').join('')+'<div class="row"><button class="pri" id="go">Run ▶</button></div><div id="tb" style="font-size:12px;margin-top:4px"></div>';
 PR.forEach((q,i)=>api.ctrl.querySelector('#s'+i).oninput=e=>sc.set(i,+e.target.value));
 api.ctrl.querySelector('#go').onclick=()=>sc.run();
 draw();sc.say(chal?'Find the right values, then press Run.':'Pick values and press Run.')},
demo:[[S=>S.run(),"Run with the starting values.",1600],[S=>{S.set(0,0.55);S.run()},'Change a value and run again.',1800]],
why:["<span class=\"word\">Potential energy</span> (PE) = m × g × h. A higher bob stores more.", "<span class=\"word\">Kinetic energy</span> (KE) = ½ m v². At the bottom all PE has become KE.", "Energy is never lost: it changes form. This is the <b>law of conservation of energy</b>.", "Mass does not change the speed at the bottom (v = √(2gh)), but it changes the energy."],
check:[{q:"At the top of the swing the bob has mostly…",options:["kinetic energy", "potential energy", "sound", "none"],answer:1,why:"Highest and slowest.",hint:"Stored."},
 {q:"Energy changes from one form to another but its total…",options:["is lost", "stays the same", "doubles", "vanishes"],answer:1,why:"Conservation.",hint:"Constant."},
 {q:"The unit of energy is the…",options:["newton", "watt", "joule", "pascal"],answer:2,why:"J.",hint:"After Joule."}],
challenge:{text:"Release the bob so that it passes the bottom at <b>3 m/s</b>. How high must it start?",win:"v = √(2gh), so h = v² ÷ 2g ≈ 0.46 m."},
real:["Roller coasters convert height into speed.", "Hydro dams turn the potential energy of water into electricity.", "A swing needs a push each time because some energy becomes heat."],
words:{"Potential energy": "Energy stored because of position or height.", "Kinetic energy": "Energy of motion.", "Joule": "The unit of energy (J).", "Conservation of energy": "Energy cannot be created or destroyed."}
});
