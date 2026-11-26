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
 const svg=g.ownerSVGElement;let defs=svg.querySelector('defs')||E('defs',{},svg);
 const GR=(id,a,b,h)=>{if(!svg.querySelector('#'+id)){const l=E('linearGradient',{id,x1:0,y1:0,x2:h?1:0,y2:h?0:1},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const RG=(id,a,b)=>{if(!svg.querySelector('#'+id)){const l=E('radialGradient',{id,cx:'35%',cy:'30%',r:'70%'},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const sh=(x,y,w)=>E('ellipse',{cx:x,cy:y,rx:w,ry:w*.2,fill:'rgba(0,0,0,.25)'},g);
 const wheel=(x,y,r,rot)=>{E('circle',{cx:x,cy:y,r,fill:'#222'},g);E('circle',{cx:x,cy:y,r:r*.58,fill:'#d5dbe3'},g);for(let k=0;k<5;k++){const a=rot+k*1.2566;E('line',{x1:x,y1:y,x2:x+Math.cos(a)*r*.55,y2:y+Math.sin(a)*r*.55,stroke:'#7b8493','stroke-width':2},g)}E('circle',{cx:x,cy:y,r:r*.16,fill:'#555'},g)};
 const cloud=(x,y,s)=>{[[0,0,16],[16,-6,20],[34,0,16],[18,6,16]].forEach(c=>E('circle',{cx:x+c[0]*s,cy:y+c[1]*s,r:c[2]*s,fill:'#fff',opacity:.95},g))};
 function draw(){g.innerHTML='';const out=f(p);const px=W/2-(P?20:40),py=H*.27,Lr=H*.38,fl=H*.82;
E('rect',{x:0,y:0,width:W,height:fl,fill:GR('wallE','#fdf1d8','#f6dca5')},g);E('rect',{x:0,y:fl,width:W,height:H-fl,fill:GR('flE','#c68a4e','#9a6532')},g);
// stand
E('rect',{x:px-86,y:py-8,width:172,height:12,rx:4,fill:'#8a5a2a'},g);E('rect',{x:px-86,y:py-8,width:12,height:fl-py+8,fill:'#7a4d22'},g);E('rect',{x:px+74,y:py-8,width:12,height:fl-py+8,fill:'#7a4d22'},g);E('rect',{x:px-100,y:fl-6,width:200,height:12,rx:4,fill:'#6b4220'},g);
const ang=Math.acos(1-p.h),a=ang*Math.cos(tt*Math.PI/2),bx=px+Lr*Math.sin(a),by=py+Lr*Math.cos(a),r=11+p.m*2.2;
// protractor arc & release marker
E('path',{d:`M${px-Lr*Math.sin(ang)} ${py+Lr*Math.cos(ang)} A${Lr} ${Lr} 0 0 0 ${px+Lr*Math.sin(ang)} ${py+Lr*Math.cos(ang)}`,fill:'none',stroke:'#c9a25f',"stroke-width":2,"stroke-dasharray":'5 5'},g);
const rbx=px-Lr*Math.sin(ang),rby=py+Lr*Math.cos(ang);E('circle',{cx:rbx,cy:rby,r:r,fill:'none',stroke:'#9aa6b5',"stroke-dasharray":'4 4',"stroke-width":2},g);
// height marker
const low=py+Lr;E('line',{x1:px-Lr*Math.sin(ang)-r-12,y1:rby,x2:px-Lr*Math.sin(ang)-r-12,y2:low,stroke:'#3b82f6',"stroke-width":3},g);E('line',{x1:px-Lr*Math.sin(ang)-r-18,y1:rby,x2:px-Lr*Math.sin(ang)-r-6,y2:rby,stroke:'#3b82f6',"stroke-width":3},g);E('line',{x1:px-Lr*Math.sin(ang)-r-18,y1:low,x2:px-Lr*Math.sin(ang)-r-6,y2:low,stroke:'#3b82f6',"stroke-width":3},g);
T(g,px-Lr*Math.sin(ang)-r-40,(rby+low)/2+4,p.h.toFixed(2)+' m',{'font-size':13,'font-weight':900,fill:'#1d4ed8'});
sh(px,fl+10,40+r);
E('line',{x1:px,y1:py,x2:bx,y2:by,stroke:'#4b5563',"stroke-width":3},g);E('circle',{cx:px,cy:py,r:5,fill:'#333'},g);
E('circle',{cx:bx,cy:by,r:r,fill:RG('bobE','#fde7a1','#c47a08'),stroke:'#8a5600',"stroke-width":2},g);E('circle',{cx:bx,cy:by,r:r*.22,fill:'#fff',opacity:.5},g);T(g,bx,by+4,p.m+'kg',{'font-size':10,'font-weight':900,fill:'#4a2e00'});
// energy bars
const hh=Math.min(1,p.h);const tot=p.m*9.8*p.h,pe=p.m*9.8*(1-Math.cos(a)),ke=Math.max(0,tot-pe),mx=5*9.8,sx=W-(P?80:110),by0=H*.68,bh=H*.4;
E('rect',{x:sx-44,y:by0-bh,width:92,height:bh,rx:6,fill:'rgba(255,255,255,.7)',stroke:'#c9a25f'},g);
E('rect',{x:sx-34,y:by0-bh*Math.min(1,pe/mx),width:30,height:Math.max(1,bh*Math.min(1,pe/mx)),rx:3,fill:'#3b82f6'},g);E('rect',{x:sx+4,y:by0-bh*Math.min(1,ke/mx),width:30,height:Math.max(1,bh*Math.min(1,ke/mx)),rx:3,fill:'#e0453a'},g);
T(g,sx-19,by0+16,'PE '+pe.toFixed(1),{'font-size':11,'font-weight':900,fill:'#1d4ed8'});T(g,sx+19,by0+16,'KE '+ke.toFixed(1),{'font-size':11,'font-weight':900,fill:'#b3261e'});T(g,sx,by0-bh-8,'Energy (J)',{'font-size':12,'font-weight':900,fill:'#4a2e00'});
T(g,W/2,H*.95,'Speed at the bottom: '+out.toFixed(2)+' m/s',{'font-size':P?14:16,'font-weight':900,fill:'#17402a'});
}
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
