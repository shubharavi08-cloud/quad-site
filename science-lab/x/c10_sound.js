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
 function draw(){g.innerHTML='';const out=f(p);const y=H*.52,x0=50,x1=W-50;const amp=26*(1-tt*.5);E('rect',{x:x0-12,y:y-40,width:12,height:80,rx:4,fill:'#7a4a14'},g);const Ls=(x1-x0)*(p.L/100);E('rect',{x:x0+Ls,y:y-40,width:12,height:80,rx:4,fill:'#7a4a14'},g);let d='M'+x0+' '+y;const k=Math.max(1,Math.round(out/110));for(let i=1;i<=60;i++){const x=x0+Ls*i/60;d+=' L'+x+' '+(y+amp*Math.sin(Math.PI*i/60*k)*Math.cos(tt*20))}E('path',{d,fill:'none',stroke:'#e0453a',"stroke-width":3},g);T(g,W/2,H*.82,'Frequency: '+out.toFixed(0)+' Hz'+(out>=300?' (high pitch)':out<150?' (low pitch)':''),{"font-size":17,"font-weight":900,fill:'#237a47'});}
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
