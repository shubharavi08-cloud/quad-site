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
 const svg=g.ownerSVGElement;let defs=svg.querySelector('defs')||E('defs',{},svg);
 const GR=(id,a,b,h)=>{if(!svg.querySelector('#'+id)){const l=E('linearGradient',{id,x1:0,y1:0,x2:h?1:0,y2:h?0:1},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const RG=(id,a,b)=>{if(!svg.querySelector('#'+id)){const l=E('radialGradient',{id,cx:'35%',cy:'30%',r:'70%'},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const sh=(x,y,w)=>E('ellipse',{cx:x,cy:y,rx:w,ry:w*.2,fill:'rgba(0,0,0,.25)'},g);
 const wheel=(x,y,r,rot)=>{E('circle',{cx:x,cy:y,r,fill:'#222'},g);E('circle',{cx:x,cy:y,r:r*.58,fill:'#d5dbe3'},g);for(let k=0;k<5;k++){const a=rot+k*1.2566;E('line',{x1:x,y1:y,x2:x+Math.cos(a)*r*.55,y2:y+Math.sin(a)*r*.55,stroke:'#7b8493','stroke-width':2},g)}E('circle',{cx:x,cy:y,r:r*.16,fill:'#555'},g)};
 const cloud=(x,y,s)=>{[[0,0,16],[16,-6,20],[34,0,16],[18,6,16]].forEach(c=>E('circle',{cx:x+c[0]*s,cy:y+c[1]*s,r:c[2]*s,fill:'#fff',opacity:.95},g))};
 function draw(){g.innerHTML='';const out=f(p);const top=H*.36,bot=H*.74,jx=W/2+(P?20:30),jw=P?150:170,tf=tt*tt;
E('rect',{x:0,y:0,width:W,height:bot,fill:GR('skyF','#9ad8ff','#f1fbff')},g);cloud(W*.15,H*.3,.7);cloud(W*.75,H*.24,.6);
E('rect',{x:0,y:bot,width:W,height:H-bot,fill:GR('grF','#6cc36a','#4aa955')},g);
// ruler
const rx=44;E('rect',{x:rx-14,y:top-8,width:28,height:bot-top+8,rx:4,fill:'#ffe8a3',stroke:'#b8862b',"stroke-width":2},g);
for(let k=0;k<=8;k++){const y=top+(bot-top)*k/8;E('line',{x1:rx-14,y1:y,x2:rx-(k%2?4:-2),y2:y,stroke:'#7a5a1a',"stroke-width":2},g)}
T(g,rx,top-14,p.h+' m',{'font-size':13,'font-weight':900,fill:'#17402a'});T(g,rx,bot+18,'0 m',{'font-size':13,'font-weight':900,fill:'#17402a'});
// vacuum jar
E('rect',{x:jx-jw/2,y:top-22,width:jw,height:bot-top+36,rx:18,fill:'rgba(255,255,255,.35)',stroke:'#6b8fb3',"stroke-width":4},g);
E('rect',{x:jx-jw/2-8,y:top-34,width:jw+16,height:14,rx:5,fill:'#8aa0b8'},g);E('rect',{x:jx-6,y:top-50,width:12,height:16,rx:3,fill:'#667'},g);
T(g,jx,bot+34,'Vacuum jar (no air)',{'font-size':13,'font-weight':900,fill:'#17402a'});
const y=top+(bot-top-16)*tf;
// apple (mass slider -> size)
const ar=10+p.m*1.4,ax=jx-jw/4;E('line',{x1:ax,y1:top-6,x2:ax,y2:y-ar,stroke:'#fff',opacity:tt<1?.5:0,"stroke-width":3},g);
E('ellipse',{cx:ax,cy:y+ar+1,rx:ar*.9,ry:ar*.2,fill:'rgba(0,0,0,'+(.08+.15*tf)+')'},g);
E('circle',{cx:ax,cy:y,r:ar,fill:RG('apR','#ff8a7a','#b3261e')},g);E('path',{d:`M${ax} ${y-ar} q4 -8 10 -9`,stroke:'#5a3a1a',"stroke-width":2.5,fill:'none'},g);E('ellipse',{cx:ax+9,cy:y-ar-6,rx:6,ry:3,fill:'#3fae4b'},g);E('ellipse',{cx:ax-ar*.35,cy:y-ar*.35,rx:ar*.2,ry:ar*.3,fill:'#fff',opacity:.5},g);
T(g,ax,y+4,p.m+'',{'font-size':11,'font-weight':900,fill:'#fff'});
// feather
const fx=jx+jw/4;E('path',{d:`M${fx} ${y-16} Q${fx+9} ${y} ${fx} ${y+16} Q${fx-9} ${y} ${fx} ${y-16}Z`,fill:'#f3ecff',stroke:'#9a8cc2',"stroke-width":2},g);E('line',{x1:fx,y1:y-18,x2:fx,y2:y+22,stroke:'#9a8cc2',"stroke-width":2},g);
T(g,ax,top-8,'Apple',{'font-size':12,'font-weight':900,fill:'#17402a'});T(g,fx,top-8,'Feather',{'font-size':12,'font-weight':900,fill:'#17402a'});
// clock
const cx2=W-(P?52:70),cy2=H*.4;E('rect',{x:cx2-42,y:cy2-22,width:84,height:44,rx:8,fill:'#1f2937'},g);T(g,cx2,cy2+8,(out*tt).toFixed(2)+' s',{'font-size':20,'font-weight':900,fill:'#7CFC9a'});
T(g,W/2,H*.92,'Falls '+p.h+' m in '+out.toFixed(2)+' s. Apple and feather land together.',{'font-size':P?12:15,'font-weight':900,fill:'#17402a'});
}
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
