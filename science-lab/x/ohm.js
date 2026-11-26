QLab.register({
id:'ohm',code:'10-P3',title:"Ohm's law: volts, ohms and amps",grade:10,subject:'Physics',emoji:'💡',
hook:{title:'Why does a bulb glow brighter with more batteries?',text:'Add one more battery and the bulb shines brighter. Use a thinner wire and it gets dimmer. Today you will find the exact rule behind this.'},
prior:'Nothing! You only need to know that a battery pushes electricity round a wire loop.',
guess:{q:'You double the battery push (voltage) and keep the same resistor. What happens to the current (the flow)?',
 options:['The current becomes half','The current stays the same','The current doubles','The current becomes four times'],answer:2,
 hint:'Think of a water pump: a stronger push moves more water.',after:'Let us test it with real readings.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A circuit with battery cells, a resistor, an ammeter and a graph of voltage and current'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const R=[10,20,50];let n=1,r=10,pts=[],bad=0;
 const V=()=>n*1.5,I=()=>V()/r;
 const ox=P?44:50,oy=P?130:96,cw=P?332:370,ch=P?130:190;
 const gx0=P?80:510,gx1=P?392:730,gy0=P?425:300,gy1=P?310:130;
 const gX=v=>gx0+v/12*(gx1-gx0),gY=a=>gy0-a/1.25*(gy0-gy1);
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const gC=E('g',{},sc.gMain);
 const slot=sc.vessel({x:ox+cw/2,y:oy+ch/2+40,type:'beaker',w:cw*.8,h:ch*.8,level:0,color:'#fff',label:''});slot.g.style.opacity=0;sc.gMain.appendChild(gC);
 let t=0;const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const perim=2*(cw+ch);const at=d=>{d=((d%perim)+perim)%perim;if(d<cw)return[ox+d,oy];d-=cw;if(d<ch)return[ox+cw,oy+d];d-=ch;if(d<cw)return[ox+cw-d,oy+ch];d-=cw;return[ox,oy+ch-d]};
 const gD=E('g',{fill:'#2aa5d8'},sc.gMain);
 function draw(){gC.innerHTML='';const a=I();
  E('rect',{x:ox,y:oy,width:cw,height:ch,fill:'none',stroke:'#1b2a4a','stroke-width':4,rx:6},gC);
  // battery stack on left edge
  const bh=14,sh=n*bh,by=oy+ch/2-sh/2;
  for(let i=0;i<n;i++){const y=by+i*bh;E('rect',{x:ox-14,y:y+1,width:28,height:bh-2,rx:3,fill:'#ffb347',stroke:'#1b2a4a','stroke-width':2},gC);E('rect',{x:ox-4,y:y-1,width:8,height:3,fill:'#1b2a4a'},gC)}
  T(gC,ox-4,by-8,'+',{'font-size':16,'font-weight':900,class:''});
  T(gC,ox+22,oy+ch/2+5,V().toFixed(1)+' V',{'font-size':P?14:17,'font-weight':900,fill:'#b25a00','text-anchor':'start',class:''});
  // resistor on top
  const rx=ox+cw/2;
  E('path',{d:`M${rx-48} ${oy} l8 -12 l12 24 l12 -24 l12 24 l12 -24 l12 24 l8 -12`,stroke:'#e5534b','stroke-width':5,fill:'none','stroke-linejoin':'round'},gC);
  T(gC,rx,oy-20,r+' Ω',{'font-size':P?14:17,'font-weight':900,fill:'#c0281d',class:''});
  // ammeter on right edge
  const ax=ox+cw,ay=oy+ch/2,ang=-60+Math.min(1.3,a)/1.25*120;
  E('circle',{cx:ax,cy:ay,r:32,fill:'#fff',stroke:'#1b2a4a','stroke-width':4},gC);
  for(let k=0;k<=5;k++){const q=(-60+k*24)*Math.PI/180;E('line',{x1:ax+22*Math.sin(q),y1:ay+4-22*Math.cos(q),x2:ax+27*Math.sin(q),y2:ay+4-27*Math.cos(q),stroke:'#55688a','stroke-width':2},gC)}
  const q=ang*Math.PI/180;E('line',{x1:ax,y1:ay+8,x2:ax+24*Math.sin(q),y2:ay+8-24*Math.cos(q),stroke:'#e5534b','stroke-width':3,'stroke-linecap':'round'},gC);
  E('circle',{cx:ax,cy:ay+8,r:3,fill:'#1b2a4a'},gC);T(gC,ax,ay+26,'A',{'font-size':13,'font-weight':900,class:''});
  T(gC,ax,ay+52,a.toFixed(2)+' A',{'font-size':P?14:17,'font-weight':900,fill:'#4b3fd1',class:''});
  // graph
  E('rect',{x:gx0-34,y:gy1-30,width:gx1-gx0+52,height:gy0-gy1+72,rx:10,fill:'#fff',stroke:'#e1d7ff','stroke-width':2},gC);
  E('line',{x1:gx0,y1:gy0,x2:gx1,y2:gy0,stroke:'#1b2a4a','stroke-width':3},gC);E('line',{x1:gx0,y1:gy0,x2:gx0,y2:gy1-10,stroke:'#1b2a4a','stroke-width':3},gC);
  [0,3,6,9,12].forEach(v=>T(gC,gX(v),gy0+16,v,{'font-size':11,class:''}));
  [0,.5,1].forEach(v=>T(gC,gx0-12,gY(v)+4,v,{'font-size':11,class:''}));
  T(gC,(gx0+gx1)/2,gy0+34,'Voltage (V)',{'font-size':13,'font-weight':800,class:''});T(gC,gx0+(P?30:10),gy1-14,'Current (A)',{'font-size':13,'font-weight':800,class:''});
  const line=pts.filter(p=>p.r===r).sort((x,y)=>x.v-y.v);
  if(line.length>1)E('polyline',{fill:'none',stroke:'#2aa5d8','stroke-width':3,points:line.map(p=>gX(p.v)+','+gY(p.i)).join(' ')},gC);
  pts.forEach(p=>E('circle',{cx:gX(p.v),cy:gY(p.i),r:6,fill:p.r===r?'#e5534b':'#c3cde0'},gC));
  E('circle',{cx:gX(V()),cy:gY(a),r:8,fill:'none',stroke:'#4b3fd1','stroke-width':3,'stroke-dasharray':'3 3'},gC);
  const c=api.ctrl.querySelector('#cnt');if(c)c.textContent='Readings saved: '+pts.length+' (save 4 with different volts)'}
 sc.cell=()=>{if(n>=8){sc.say('That is the most cells this holder takes.','warn');return}n++;L.snd.pop&&L.snd.pop();draw();sc.say('Push '+V().toFixed(1)+' V → current '+I().toFixed(2)+' A.')};
 sc.rm=()=>{if(n<=1)return;n--;draw();sc.say('Push '+V().toFixed(1)+' V → current '+I().toFixed(2)+' A.')};
 sc.res=x=>{r=x;L.snd.pop&&L.snd.pop();draw();sc.say(x+' Ω resistor in. Current '+I().toFixed(2)+' A.')};
 sc.rec=()=>{if(!pts.some(p=>p.v===V()&&p.r===r))pts.push({v:V(),r,i:I()});draw();const same=pts.filter(p=>p.r===r);
  if(same.length>=4&&new Set(same.map(p=>p.v)).size>=4){api.award('did');api.ready();sc.say('A straight line through zero! Current ∝ voltage.','ok')}
  else sc.say('Saved. Add a cell, save again, and watch the dots line up.')};
 sc.check=()=>{const a=I();if(Math.abs(a-.3)<.005)api.solved();else{bad++;api.nope(`Your current is ${a.toFixed(2)} A. You need 0.30 A. ${a>.3?'Too much flow: remove a cell or use a bigger resistor.':'Too little flow: add a cell or use a smaller resistor.'}`)}};
 // tools
 const ty=P?492:384,tx=i=>P?44+i*(P?78:0):W*.14+i*W*.2;
 sc.tool({x:tx(0),y:ty,label:'Cell +1.5V',ly:P?32:34,scale:P?.75:.9,draw:g=>{E('rect',{x:-12,y:-14,width:24,height:30,rx:4,fill:'#ffb347',stroke:'#1b2a4a','stroke-width':2.5},g);E('rect',{x:-4,y:-19,width:8,height:5,fill:'#1b2a4a'},g)},use:()=>sc.cell()});
 R.forEach((x,i)=>sc.tool({x:tx(i+1),y:ty,label:x+' Ω',ly:P?32:34,scale:P?.75:.9,draw:g=>{E('rect',{x:-20,y:-10,width:40,height:20,rx:6,fill:'#f5d9b8',stroke:'#7a5230','stroke-width':2.5},g);[-10,0,10].forEach((o,k)=>E('rect',{x:o-2,y:-10,width:4,height:20,fill:['#b25a00','#222','#e5534b'][k]},g))},use:()=>sc.res(x)}));
 api.ctrl.innerHTML=chal?'<p style="margin:0 0 6px;font-size:14px"><b>Make the ammeter read exactly 0.30 A.</b> Drag cells or resistors onto the circuit.</p><div class="row"><button id="rmc">− Remove a cell</button><button class="pri" id="ck">Check my answer</button></div>'
  :'<p style="margin:0 0 4px;font-size:14px"><b>Drag a cell or a resistor onto the circuit.</b> Then save the reading.</p><div class="row"><button id="rmc">− Remove a cell</button><button class="pri" id="rec">📝 Save this reading</button></div><p id="cnt" style="font-size:14px;color:#55688a;margin:4px 0 0"></p>';
 api.ctrl.querySelector('#rmc').onclick=()=>sc.rm();
 if(chal)api.ctrl.querySelector('#ck').onclick=()=>sc.check();else api.ctrl.querySelector('#rec').onclick=()=>sc.rec();
 draw();sc.say(chal?'Which cells and resistor give 0.30 A?':'Drag a cell onto the circuit.');
 (function loop(){if(!stage.isConnected)return;if(!reduce){t+=Math.max(.6,I()*4);let h='';for(let k=0;k<22;k++){const p=at(t+k*perim/22);h+=`<circle cx="${p[0]}" cy="${p[1]}" r="4"/>`}gD.innerHTML=h}requestAnimationFrame(loop)})();
},
demo:[[S=>S.cell(),'One more cell: the push goes up.',900],[S=>S.rec(),'Save the reading.',700],[S=>S.cell(),'Another cell: current rises in step.',900],[S=>S.rec(),'Save again.',700],[S=>S.res(50),'A bigger resistor makes the current smaller.',1000]],
why:['Voltage is the <span class="word">push</span> the battery gives. Current is how much electricity <span class="word">flows</span> each second.','When you doubled the push, the current doubled too. The points made a <b>straight line</b> that starts at zero.','A resistor makes flowing harder. A bigger resistor means a smaller current for the same push.','So <b>V = I × R</b>, or current = voltage ÷ resistance. This is <span class="word">Ohm\'s law</span>.'],
check:[{q:'A 6 V battery is joined to a 20 Ω resistor. What is the current?',options:['0.3 A','3.3 A','120 A','26 A'],answer:0,why:'Current = 6 ÷ 20 = 0.3 A.',hint:'Use current = voltage ÷ resistance.'},
 {q:'You keep the battery the same and use a bigger resistor. The current…',options:['gets bigger','gets smaller','stays the same','becomes zero for ever'],answer:1,why:'A bigger resistor makes flow harder, so less current.',hint:'Try it in the experiment: change 10 Ω to 50 Ω.'},
 {q:'Your graph of voltage against current is a straight line through zero. What does that tell you?',options:['Current is proportional to voltage','Current is the same for every voltage','Voltage is zero','The battery is broken'],answer:0,why:'A straight line through zero means doubling one doubles the other.',hint:'Look at the points you recorded.'}],
challenge:{text:'Set the battery and resistor so the ammeter shows exactly <b>0.30 A</b>. There is more than one answer!',win:'You used V = I × R like a real engineer.'},
real:['The <b>fuse</b> in your home protects wires from too much current.','A <b>dimmer switch</b> or a fan regulator changes resistance to change the flow.','Phone chargers are built using Ohm\'s law so that your phone gets the right current.'],
words:{Voltage:'The push from the battery, in volts (V).',Current:'How much electricity flows each second, in amperes (A).',Resistance:'How hard it is for current to flow, in ohms (Ω).','Ohm\'s law':'Voltage = current × resistance.'}
});
