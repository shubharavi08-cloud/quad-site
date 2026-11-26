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
 const svg=g.ownerSVGElement;let defs=svg.querySelector('defs')||E('defs',{},svg);
 const GR=(id,a,b,h)=>{if(!svg.querySelector('#'+id)){const l=E('linearGradient',{id,x1:0,y1:0,x2:h?1:0,y2:h?0:1},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const RG=(id,a,b)=>{if(!svg.querySelector('#'+id)){const l=E('radialGradient',{id,cx:'35%',cy:'30%',r:'70%'},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const sh=(x,y,w)=>E('ellipse',{cx:x,cy:y,rx:w,ry:w*.2,fill:'rgba(0,0,0,.25)'},g);
 const wheel=(x,y,r,rot)=>{E('circle',{cx:x,cy:y,r,fill:'#222'},g);E('circle',{cx:x,cy:y,r:r*.58,fill:'#d5dbe3'},g);for(let k=0;k<5;k++){const a=rot+k*1.2566;E('line',{x1:x,y1:y,x2:x+Math.cos(a)*r*.55,y2:y+Math.sin(a)*r*.55,stroke:'#7b8493','stroke-width':2},g)}E('circle',{cx:x,cy:y,r:r*.16,fill:'#555'},g)};
 const cloud=(x,y,s)=>{[[0,0,16],[16,-6,20],[34,0,16],[18,6,16]].forEach(c=>E('circle',{cx:x+c[0]*s,cy:y+c[1]*s,r:c[2]*s,fill:'#fff',opacity:.95},g))};
 function draw(){g.innerHTML='';const out=f(p);const gy=H*.68,x0=70,x1=W-60,d=p.d/10,cx=x0+(x1-x0-100)*d*tt+60;
E('rect',{x:0,y:0,width:W,height:gy,fill:GR('wlW','#d7ecff','#f4faff')},g);E('rect',{x:0,y:gy-10,width:W,height:H-gy+10,fill:GR('flW','#b8bec9','#8c93a0')},g);
for(let k=0;k<10;k++)E('rect',{x:k*(W/10)+8,y:H*.3,width:W/10-16,height:H*.2,rx:4,fill:'#fff',opacity:.4},g);
// ruler on floor
E('rect',{x:x0,y:gy+14,width:x1-x0-40,height:20,fill:'#ffe8a3',stroke:'#b8862b',"stroke-width":2},g);for(let k=0;k<=10;k++){const x=x0+(x1-x0-40)*k/10;E('line',{x1:x,y1:gy+14,x2:x,y2:gy+(k%5?24:30),stroke:'#7a5a1a',"stroke-width":2},g);if(k%2==0)T(g,x,gy+48,k+' m',{'font-size':12,'font-weight':900,fill:'#17402a'})}
// start line + trail
E('line',{x1:x0+60,y1:gy-6,x2:x0+60,y2:gy+36,stroke:'#e0453a',"stroke-width":3,"stroke-dasharray":'4 3'},g);
E('line',{x1:x0+60,y1:gy+4,x2:cx,y2:gy+4,stroke:'#3fae4b',"stroke-width":4,opacity:.7},g);
sh(cx+20,gy+8,50);
// crate
const cs=44+p.F/10;E('rect',{x:cx,y:gy+4-cs,width:cs+10,height:cs,fill:GR('crW','#d9a066','#a86f32'),stroke:'#6a4012',"stroke-width":3},g);E('line',{x1:cx,y1:gy+4-cs,x2:cx+cs+10,y2:gy+4,stroke:'#6a4012',"stroke-width":3},g);E('line',{x1:cx+cs+10,y1:gy+4-cs,x2:cx,y2:gy+4,stroke:'#6a4012',"stroke-width":3},g);
// person
const px=cx-46;E('line',{x1:px+2,y1:gy-36,x2:px-6,y2:gy+6,stroke:'#2b3a67',"stroke-width":9,"stroke-linecap":'round'},g);E('line',{x1:px+8,y1:gy-36,x2:px+22,y2:gy+6,stroke:'#2b3a67',"stroke-width":9,"stroke-linecap":'round'},g);
E('path',{d:`M${px-4} ${gy-38} L${px+16} ${gy-76} L${px+28} ${gy-70} L${px+10} ${gy-34}Z`,fill:'#3fae4b'},g);E('circle',{cx:px+26,cy:gy-88,r:12,fill:'#e8b48a'},g);E('path',{d:`M${px+14} ${gy-92} Q${px+26} ${gy-106} ${px+38} ${gy-92}`,fill:'#2a1a10'},g);
E('line',{x1:px+24,y1:gy-66,x2:cx-2,y2:gy-cs*.5,stroke:'#e8b48a',"stroke-width":7,"stroke-linecap":'round'},g);
if(p.F>120&&tt<1)E('path',{d:`M${px+40} ${gy-98} q3 6 0 9`,stroke:'#58b8ff',"stroke-width":3,fill:'none'},g);
// force arrow
const al=14+p.F*.3,ay=gy-cs-30;E('line',{x1:cx-al,y1:ay,x2:cx+2,y2:ay,stroke:'#e0453a',"stroke-width":7,"stroke-linecap":'round'},g);E('polygon',{points:`${cx},${ay-9} ${cx+14},${ay} ${cx},${ay+9}`,fill:'#e0453a'},g);T(g,cx-al/2,ay-10,p.F+' N',{'font-size':14,'font-weight':900,fill:'#b3261e'});
T(g,W/2,H*.9,'Work = '+p.F+' N × '+p.d+' m = '+out+' J',{'font-size':P?15:17,'font-weight':900,fill:'#17402a'});
}
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
