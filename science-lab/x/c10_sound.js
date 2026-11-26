QLab.register({
id:'c10_sound',code:'10-P7',title:"Sound: pitch of a vibrating string",grade:10,subject:'Physics',emoji:'🎸',
hook:{title:"A short guitar string sounds higher than a long one. Why?",text:"Sound is made by vibration. Faster vibration makes a higher pitch. Change the string length and tension and see the frequency."},
prior:"You know that guitar and sitar strings make sound when plucked.",
guess:{q:"Shortening a string makes its pitch…",options:["lower", "higher", "the same", "louder only"],answer:1,hint:"Short strings vibrate faster.",after:"Pluck different strings."},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge;
 const sc=L.scene(api.stage,{alt:"Interactive experiment: Sound: pitch of a vibrating string"});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const PR=[{k:"L",label:"String length",min:20,max:100,step:10,v:50,unit:"cm"},{k:"T",label:"Tension",min:1,max:16,step:1,v:4,unit:"units"}],TARGET=440,TOL=15,DEC=0,UNIT="Hz",OL="Frequency";
 const p={};PR.forEach(q=>p[q.k]=q.v);
 const g=E('g',{},sc.gMain);let tt=1,busy=false,runs=[],seen=new Set();
 const f=p=>((100/p.L)*110*Math.sqrt(p.T/4));
 const T=(g,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:''},o||{}),g);e.textContent=t;return e};
 const svg=g.ownerSVGElement;let defs=svg.querySelector('defs')||E('defs',{},svg);
 const GR=(id,a,b,h)=>{if(!svg.querySelector('#'+id)){const l=E('linearGradient',{id,x1:0,y1:0,x2:h?1:0,y2:h?0:1},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const RG=(id,a,b)=>{if(!svg.querySelector('#'+id)){const l=E('radialGradient',{id,cx:'35%',cy:'30%',r:'70%'},defs);E('stop',{offset:'0%','stop-color':a},l);E('stop',{offset:'100%','stop-color':b},l)}return 'url(#'+id+')'};
 const sh=(x,y,w)=>E('ellipse',{cx:x,cy:y,rx:w,ry:w*.2,fill:'rgba(0,0,0,.25)'},g);
 const wheel=(x,y,r,rot)=>{E('circle',{cx:x,cy:y,r,fill:'#222'},g);E('circle',{cx:x,cy:y,r:r*.58,fill:'#d5dbe3'},g);for(let k=0;k<5;k++){const a=rot+k*1.2566;E('line',{x1:x,y1:y,x2:x+Math.cos(a)*r*.55,y2:y+Math.sin(a)*r*.55,stroke:'#7b8493','stroke-width':2},g)}E('circle',{cx:x,cy:y,r:r*.16,fill:'#555'},g)};
 const cloud=(x,y,s)=>{[[0,0,16],[16,-6,20],[34,0,16],[18,6,16]].forEach(c=>E('circle',{cx:x+c[0]*s,cy:y+c[1]*s,r:c[2]*s,fill:'#fff',opacity:.95},g))};
 function draw(){g.innerHTML='';const out=f(p);const y=H*.58,nx=40,bx=W-(P?130:190),len=bx-nx,xs=bx-len*(p.L/100),k=Math.max(1,Math.round(out/110)),amp=(tt<1?1:.25)*(14-p.T*.4)*(1+.0*tt);
// stage
E('rect',{x:0,y:0,width:W,height:H,fill:GR('stS','#2b1d4a','#5b3f8f')},g);E('rect',{x:0,y:H*.82,width:W,height:H*.18,fill:'#3a2a1a'},g);for(let i=0;i<6;i++)E('circle',{cx:W*(i+.5)/6,cy:H*.12+(i%2)*14,r:4,fill:'#ffd84a',opacity:.8},g);
// guitar neck + body
E('rect',{x:nx-12,y:y-26,width:bx-nx+40,height:52,rx:6,fill:GR('nkS','#8a5a2a','#5d3a18')},g);
for(let i=0;i<9;i++){const fx=nx+(bx-nx)*i/9;E('line',{x1:fx,y1:y-26,x2:fx,y2:y+26,stroke:'#cfd5dd',"stroke-width":2},g)}
E('ellipse',{cx:bx+70,cy:y,rx:74,ry:(P?66:84),fill:GR('bdS','#e0a05a','#a8641e')},g);E('ellipse',{cx:bx+70,cy:y,rx:30,ry:30,fill:'#2a1a10'},g);E('ellipse',{cx:bx+70,cy:y,rx:36,ry:36,fill:'none',stroke:'#fff3d6',"stroke-width":3},g);
E('rect',{x:bx-2,y:y-26,width:8,height:52,rx:3,fill:'#2a1a10'},g);
// 6 strings, the active one is red & vibrates
for(let s=-2;s<=3;s++){const yy=y+s*8-4;if(s===0)continue;E('line',{x1:nx,y1:yy,x2:bx,y2:yy,stroke:'#cfd5dd',"stroke-width":1.5,opacity:.8},g)}
let d='M'+xs+' '+(y-4);for(let i=1;i<=70;i++){const x=xs+(bx-xs)*i/70;d+=' L'+x+' '+(y-4+amp*Math.sin(Math.PI*i/70*k)*Math.cos(tt*30))}
E('path',{d,fill:'none',stroke:'#ff5a4a',"stroke-width":2+p.T*.12,"stroke-linecap":'round'},g);
// finger on fret
E('circle',{cx:xs,cy:y-4,r:8,fill:'#e8b48a',stroke:'#b9855a',"stroke-width":2},g);T(g,xs,y-34,'finger',{'font-size':11,'font-weight':900,fill:'#fff'});
// sound waves
const wl=Math.max(10,2200/out);for(let i=1;i<=5;i++){const rr=30+i*wl*.35+(tt<1?tt*wl*.3:0);E('path',{d:`M${bx+70+rr*.5} ${y-rr*.8} A${rr} ${rr} 0 0 1 ${bx+70+rr*.5} ${y+rr*.8}`,fill:'none',stroke:'#7CFC9a',"stroke-width":3,opacity:Math.max(.12,.8-i*.14)},g)}
// tuning peg tension
E('circle',{cx:nx-4,cy:y-40,r:10,fill:'#d6a64a',stroke:'#8a6a1a',"stroke-width":2},g);E('line',{x1:nx-4,y1:y-40,x2:nx-4+Math.cos(p.T/16*5)*9,y2:y-40+Math.sin(p.T/16*5)*9,stroke:'#5d3a18',"stroke-width":3},g);T(g,nx-4,y-56,'tension '+p.T,{'font-size':11,'font-weight':900,fill:'#fff'});
const notes=['low','LOW','mid','mid','HIGH'];T(g,W/2,H*.9,out.toFixed(0)+' Hz  '+(out>=300?'high pitch':out<150?'low pitch':'medium pitch'),{'font-size':P?15:18,'font-weight':900,fill:'#7CFC9a'});
}
 function tbl(){const t=api.ctrl.querySelector('#tb');if(t)t.innerHTML=runs.slice(-4).map(r=>'<div>'+r+'</div>').join('')}
 sc.set=(i,v)=>{p[PR[i].k]=v;const s=api.ctrl.querySelector('#s'+i);if(s)s.value=v;const l=api.ctrl.querySelector('#l'+i);if(l)l.textContent=v+' '+PR[i].unit;if(!busy){tt=1;draw()}};
 sc.run=async()=>{if(busy)return;busy=true;const out=f(p);for(let i=0;i<=20;i++){tt=i/20;draw();await sc.sleep(55)}tt=1;draw();busy=false;
  const o=+out.toFixed(DEC);const row=PR.map(q=>q.label+' '+p[q.k]+' '+q.unit).join(', ')+' → '+OL+' '+o+' '+UNIT;runs.push(row);tbl();
  if(chal){if(Math.abs(out-TARGET)<=TOL)api.solved();else api.nope('You got '+o+' '+UNIT+'. '+(out<TARGET?'Too low':'Too high')+', aim for '+TARGET+' '+UNIT+'.')}
  else{seen.add(o);sc.say('Length '+p.L+' cm, tension '+p.T+' gives '+out.toFixed(0)+' Hz. Shorter or tighter means higher pitch.','ok');L.snd.pop&&L.snd.pop();if(seen.size>=3){api.award('did');api.ready()}}};
 api.ctrl.innerHTML='<p style="margin:0 0 4px;font-size:14px">'+(chal?'<b>Challenge:</b> get <b>'+TARGET+' '+UNIT+'</b>. ':'<b>Change the sliders and press Run.</b> Try at least three different runs. ')+'</p>'+PR.map((q,i)=>'<label style="display:block;font-size:14px;margin:2px 0">'+q.label+': <b id="l'+i+'">'+q.v+' '+q.unit+'</b><br><input type="range" id="s'+i+'" min="'+q.min+'" max="'+q.max+'" step="'+q.step+'" value="'+q.v+'" style="width:100%"></label>').join('')+'<div class="row"><button class="pri" id="go">Run ▶</button></div><div id="tb" style="font-size:12px;margin-top:4px"></div>';
 PR.forEach((q,i)=>api.ctrl.querySelector('#s'+i).oninput=e=>sc.set(i,+e.target.value));
 api.ctrl.querySelector('#go').onclick=()=>sc.run();
 draw();sc.say(chal?'Find the right values, then press Run.':'Pick values and press Run.')},
demo:[[S=>S.run(),"Run with the starting values.",1600],[S=>{S.set(0,60);S.run()},'Change a value and run again.',1800]],
why:["Sound is a <span class=\"word\">vibration</span> that travels through air as a wave. It cannot travel in a vacuum.", "<b>Frequency</b> (vibrations per second, in hertz) decides pitch. Higher frequency, higher pitch.", "<b>Amplitude</b> decides loudness. A bigger vibration is louder.", "A shorter or tighter string vibrates faster, so the pitch rises."],
check:[{q:"Pitch depends on…",options:["Amplitude", "Frequency", "Speed only", "Colour"],answer:1,why:"More vibrations per second, higher pitch.",hint:"Hz."},
 {q:"Loudness depends on…",options:["Frequency", "Amplitude", "Length", "Pitch"],answer:1,why:"Bigger vibration.",hint:"Size of wave."},
 {q:"Sound cannot travel through…",options:["Air", "Water", "Steel", "A vacuum"],answer:3,why:"It needs matter.",hint:"Space."}],
challenge:{text:"Make a string sound at <b>440 Hz</b> (the note A). Choose length and tension.",win:"Shorter or tighter strings give higher pitch. 440 Hz needs a short, tight string, for example 25 cm at tension 4 or 50 cm at tension 16."},
real:["Tuning a sitar means tightening or loosening the strings.", "Bats and dolphins use echoes, called echolocation.", "Doctors use ultrasound for body scans."],
words:{"Frequency": "Vibrations per second, in hertz (Hz).", "Pitch": "How high or low a sound is.", "Amplitude": "The size of a vibration: loudness.", "Vacuum": "Empty space with no matter."}
});
