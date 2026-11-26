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
 const svg=g.ownerSVGElement;let defs=svg.querySelector('defs')||E('defs',{},svg);
 const GR=(id,a,b,h)=>{if(!svg.querySelector('#'+id)){const l=E('linearGradient',{id,x1:0,y1:0,x2:h?1:0,y2:h?0:1},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const RG=(id,a,b)=>{if(!svg.querySelector('#'+id)){const l=E('radialGradient',{id,cx:'35%',cy:'30%',r:'70%'},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const sh=(x,y,w)=>E('ellipse',{cx:x,cy:y,rx:w,ry:w*.2,fill:'rgba(0,0,0,.25)'},g);
 const wheel=(x,y,r,rot)=>{E('circle',{cx:x,cy:y,r,fill:'#222'},g);E('circle',{cx:x,cy:y,r:r*.58,fill:'#d5dbe3'},g);for(let k=0;k<5;k++){const a=rot+k*1.2566;E('line',{x1:x,y1:y,x2:x+Math.cos(a)*r*.55,y2:y+Math.sin(a)*r*.55,stroke:'#7b8493','stroke-width':2},g)}E('circle',{cx:x,cy:y,r:r*.16,fill:'#555'},g)};
 const cloud=(x,y,s)=>{[[0,0,16],[16,-6,20],[34,0,16],[18,6,16]].forEach(c=>E('circle',{cx:x+c[0]*s,cy:y+c[1]*s,r:c[2]*s,fill:'#fff',opacity:.95},g))};
 function draw(){g.innerHTML='';const out=f(p);const gy=H*.7,sx=60,run=W-sx-150,v=Math.min(1,out/4),cx=sx+run*tt*tt*v;
E('rect',{x:0,y:0,width:W,height:gy,fill:GR('wallF','#fff3d6','#ffe3a8')},g);
for(let r=0;r<2;r++){E('rect',{x:0,y:H*.22+r*H*.2,width:W,height:6,fill:'#b97a3d'},g);const cols=['#e0453a','#3b82f6','#f2b01e','#3fae4b','#a855f7','#ff8a3d'];for(let k=0;k<(P?9:16);k++){const x=8+k*(W/(P?9:16));E('rect',{x,y:H*.22+r*H*.2-26,width:(W/(P?9:16))-8,height:26,rx:4,fill:cols[(k+r*2)%6]},g)}}
E('rect',{x:0,y:gy,width:W,height:H-gy,fill:GR('flF','#e8edf3','#c7d0dc')},g);for(let k=0;k<14;k++)E('line',{x1:k*W/12,y1:gy,x2:k*W/12-30+k*5,y2:H,stroke:'#fff',opacity:.6},g);
sh(cx+46,gy+30,60);
// trolley
const bx=cx,by=gy-62,bw=92+p.m*2,bh=46;
E('path',{d:`M${bx} ${by} L${bx+bw} ${by} L${bx+bw-10} ${by+bh} L${bx+8} ${by+bh}Z`,fill:'#dfe6ee',stroke:'#667',"stroke-width":3},g);
for(let k=1;k<5;k++)E('line',{x1:bx+k*bw/5,y1:by,x2:bx+8+k*(bw-18)/5,y2:by+bh,stroke:'#9aa6b5',"stroke-width":2},g);E('line',{x1:bx+4,y1:by+bh/2,x2:bx+bw-5,y2:by+bh/2,stroke:'#9aa6b5',"stroke-width":2},g);
// load boxes = mass
const bc=['#e0453a','#3b82f6','#f2b01e','#3fae4b','#a855f7'];for(let k=0;k<p.m;k++){const col=k%5,row=Math.floor(k/5);E('rect',{x:bx+6+col*((bw-14)/5),y:by-12-row*13,width:(bw-14)/5-1,height:12,rx:2,fill:bc[k%5],stroke:'#fff'},g)}
E('path',{d:`M${bx} ${by} L${bx-22} ${by-18}`,stroke:'#667',"stroke-width":5,fill:'none',"stroke-linecap":'round'},g);
wheel(bx+16,gy+22,8,cx/8);wheel(bx+bw-18,gy+22,8,cx/8);E('line',{x1:bx+10,y1:by+bh,x2:bx+16,y2:gy+16,stroke:'#667',"stroke-width":3},g);E('line',{x1:bx+bw-12,y1:by+bh,x2:bx+bw-18,y2:gy+16,stroke:'#667',"stroke-width":3},g);
// person pushing
const px=bx-58,py=gy+26;E('ellipse',{cx:px+8,cy:py,rx:26,ry:5,fill:'rgba(0,0,0,.2)'},g);
E('line',{x1:px,y1:py-40,x2:px-8,y2:py,stroke:'#2b3a67',"stroke-width":9,"stroke-linecap":'round'},g);E('line',{x1:px+6,y1:py-40,x2:px+18,y2:py,stroke:'#2b3a67',"stroke-width":9,"stroke-linecap":'round'},g);
E('path',{d:`M${px-6} ${py-42} L${px+10} ${py-80} L${px+22} ${py-74} L${px+8} ${py-40}Z`,fill:'#ff8a3d'},g);
E('circle',{cx:px+20,cy:py-92,r:12,fill:'#e8b48a'},g);E('path',{d:`M${px+8} ${py-96} Q${px+20} ${py-110} ${px+31} ${py-96}`,fill:'#2a1a10'},g);
E('line',{x1:px+18,y1:py-70,x2:bx-18,y2:by-16,stroke:'#e8b48a',"stroke-width":7,"stroke-linecap":'round'},g);
// force arrow
const al=14+p.F*3.2,ay=by-34;E('line',{x1:bx-24-al,y1:ay,x2:bx-26,y2:ay,stroke:'#e0453a',"stroke-width":7,"stroke-linecap":'round'},g);E('polygon',{points:`${bx-26},${ay-9} ${bx-12},${ay} ${bx-26},${ay+9}`,fill:'#e0453a'},g);T(g,bx-24-al/2,ay-12,p.F+' N',{'font-size':14,'font-weight':900,fill:'#b3261e'});
if(tt<1&&tt>.05)for(let k=0;k<3;k++)E('line',{x1:bx+bw+10+k*6,y1:by+8+k*12,x2:bx+bw+10+k*6+14+out*4,y2:by+8+k*12,stroke:'#8aa0b8',opacity:.7,"stroke-width":3,"stroke-linecap":'round'},g);
T(g,bx+bw/2,gy+52,'Mass '+p.m+' kg',{'font-size':14,'font-weight':900,fill:'#2b3a67'});
T(g,W/2,H*.9,'a = F ÷ m = '+p.F+' ÷ '+p.m+' = '+out.toFixed(1)+' m/s²',{'font-size':P?15:17,'font-weight':900,fill:'#17402a'});
}
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
