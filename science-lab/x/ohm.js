QLab.register({
id:'ohm',code:'10-P3',title:"Ohm's law: volts, ohms and amps",grade:10,subject:'Physics',emoji:'💡',
hook:{title:'Why does a bulb glow brighter with more batteries?',text:'Add one more battery and the bulb shines brighter. Use a thinner wire and it gets dimmer. Today you will find the exact rule behind this.'},
prior:'Nothing! You only need to know that a battery pushes electricity round a wire loop.',
guess:{q:'You double the battery push (voltage) and keep the same resistor. What happens to the current (the flow)?',
 options:['The current becomes half','The current stays the same','The current doubles','The current becomes four times'],answer:2,
 hint:'Think of a water pump: a stronger push moves more water.',after:'Let us test it with real readings.'},
build(api){
 const R=[10,20,50];let V=3,r=10,pts=[],chal=!!api.challenge;
 const I=()=>V/r;
 api.ctrl.innerHTML=`<label for="v">Battery push: <span id="vv"></span> volts</label><input id="v" type="range" min="1.5" max="12" step="1.5" value="3">
 <label>Resistor (ohms)</label><div class="row" id="rs">${R.map(x=>`<button data-r="${x}" aria-pressed="false">${x} Ω</button>`).join('')}</div>
 <p>Current: <span class="read" id="amp"></span></p>${chal?'<button class="pri" id="ck">Check my answer</button>':'<button class="pri" id="rec">📝 Record this reading</button><p id="cnt" style="font-size:14px;color:#55688a"></p>'}`;
 const draw=()=>{
  const a=I(),sp=Math.max(.5,a*6);
  const gx=v=>450+v/12*260,gy=a2=>200-a2/1.25*140;
  const line=pts.filter(p=>p.r===r).sort((x,y)=>x.v-y.v);
  api.stage.innerHTML=QLab.svg(760,260,`
  <rect width="760" height="260" fill="#ffffff"/>
  <g stroke="#1b2a4a" stroke-width="4" fill="none"><path d="M40 60 H120 M160 60 H260 M300 60 V200 H40 V60"/></g>
  <rect x="26" y="100" width="28" height="60" rx="6" fill="#ffb347" stroke="#1b2a4a" stroke-width="3"/><text x="40" y="136" text-anchor="middle" font-size="16" font-weight="800">${V}V</text>
  <path d="M120 60 l10 -18 l14 36 l14 -36 l14 36 l8 -18" stroke="#e5534b" stroke-width="5" fill="none"/><text x="160" y="28" text-anchor="middle" font-size="16" font-weight="800">${r} Ω</text>
  <circle cx="300" cy="130" r="30" fill="#fff" stroke="#1b2a4a" stroke-width="4"/><text x="300" y="124" text-anchor="middle" font-size="22" font-weight="800">A</text><text x="300" y="146" text-anchor="middle" font-size="13" font-weight="800" fill="#4b3fd1">${a.toFixed(2)}</text>
  <g id="dots" fill="#2aa5d8"></g>
  <line x1="450" y1="200" x2="710" y2="200" stroke="#1b2a4a" stroke-width="3"/><line x1="450" y1="200" x2="450" y2="60" stroke="#1b2a4a" stroke-width="3"/>
  <text x="580" y="238" text-anchor="middle" font-size="14" font-weight="700">Voltage (V)</text><text x="450" y="46" font-size="14" font-weight="700" text-anchor="middle">Current (A)</text>
  ${[0,3,6,9,12].map(v=>`<text x="${gx(v)}" y="216" text-anchor="middle" font-size="11">${v}</text>`).join('')}
  ${line.length>1?`<polyline fill="none" stroke="#2aa5d8" stroke-width="3" points="${line.map(p=>gx(p.v)+','+gy(p.i)).join(' ')}"/>`:''}
  ${pts.map(p=>`<circle cx="${gx(p.v)}" cy="${gy(p.i)}" r="6" fill="${p.r===r?'#e5534b':'#c3cde0'}"/>`).join('')}
  <circle cx="${gx(V)}" cy="${gy(a)}" r="8" fill="none" stroke="#4b3fd1" stroke-width="3" stroke-dasharray="3 3"/>`);
  api.ctrl.querySelector('#vv').textContent=V;api.ctrl.querySelector('#amp').textContent=a.toFixed(2)+' A';
  api.ctrl.querySelectorAll('#rs button').forEach(b=>{const on=+b.dataset.r===r;b.setAttribute('aria-pressed',on);b.className=on?'pri':''});
  const c=api.ctrl.querySelector('#cnt');if(c)c.textContent='Readings recorded: '+pts.length+' (record at least 4 with different volts)';
  api.stage.dots=sp};
 api.ctrl.querySelector('#v').oninput=e=>{V=+e.target.value;draw()};
 api.ctrl.querySelectorAll('#rs button').forEach(b=>b.onclick=()=>{r=+b.dataset.r;draw()});
 if(chal){
  api.stage.insertAdjacentHTML('beforebegin','');
  api.ctrl.querySelector('#ck').onclick=()=>{const a=I();Math.abs(a-.3)<.005?api.solved():api.nope(`Your current is ${a.toFixed(2)} A. You need 0.30 A. ${a>.3?'Too much flow: lower the push or use a bigger resistor.':'Too little flow: raise the push or use a smaller resistor.'}`)}}
 else{
  api.ctrl.querySelector('#rec').onclick=()=>{if(!pts.some(p=>p.v===V&&p.r===r))pts.push({v:V,r,i:I()});draw();
   const same=pts.filter(p=>p.r===r);
   if(same.length>=4&&new Set(same.map(p=>p.v)).size>=4){api.award('did');api.ready()}
   else api.coach('info','Reading saved','Now change the battery push and record again. Watch the dots line up.')}}
 draw();
 /* moving charge dots (skipped for reduced motion) */
 const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;let t=0;
 const path=[[40,60],[300,60],[300,200],[40,200]],len=[260,140,260,140],tot=800;
 const at=d=>{d=((d%tot)+tot)%tot;for(let i=0;i<4;i++){if(d<len[i]){const a=path[i],b=path[(i+1)%4];return[a[0]+(b[0]-a[0])*d/len[i],a[1]+(b[1]-a[1])*d/len[i]]}d-=len[i]}return[40,60]};
 (function loop(){const g=api.stage.querySelector('#dots');if(!api.stage.isConnected)return;
  if(g&&!reduce){t+=(api.stage.dots||1)*.6;let h='';for(let k=0;k<16;k++){const p=at(t+k*50);h+=`<circle cx="${p[0]}" cy="${p[1]}" r="5"/>`}g.innerHTML=h}
  requestAnimationFrame(loop)})();
},
why:['Voltage is the <span class="word">push</span> the battery gives. Current is how much electricity <span class="word">flows</span> each second.','When you doubled the push, the current doubled too. The points made a <b>straight line</b> that starts at zero.','A resistor makes flowing harder. A bigger resistor means a smaller current for the same push.','So <b>V = I × R</b>, or current = voltage ÷ resistance. This is <span class="word">Ohm\'s law</span>.'],
check:[{q:'A 6 V battery is joined to a 20 Ω resistor. What is the current?',options:['0.3 A','3.3 A','120 A','26 A'],answer:0,why:'Current = 6 ÷ 20 = 0.3 A.',hint:'Use current = voltage ÷ resistance.'},
 {q:'You keep the battery the same and use a bigger resistor. The current…',options:['gets bigger','gets smaller','stays the same','becomes zero for ever'],answer:1,why:'A bigger resistor makes flow harder, so less current.',hint:'Try it in the experiment: change 10 Ω to 50 Ω.'},
 {q:'Your graph of voltage against current is a straight line through zero. What does that tell you?',options:['Current is proportional to voltage','Current is the same for every voltage','Voltage is zero','The battery is broken'],answer:0,why:'A straight line through zero means doubling one doubles the other.',hint:'Look at the points you recorded.'}],
challenge:{text:'Set the battery and resistor so the ammeter shows exactly <b>0.30 A</b>. There is more than one answer!',win:'You used V = I × R like a real engineer.'},
real:['The <b>fuse</b> in your home protects wires from too much current.','A <b>dimmer switch</b> or a fan regulator changes resistance to change the flow.','Phone chargers are built using Ohm\'s law so that your phone gets the right current.'],
words:{Voltage:'The push from the battery, in volts (V).',Current:'How much electricity flows each second, in amperes (A).',Resistance:'How hard it is for current to flow, in ohms (Ω).','Ohm\'s law':'Voltage = current × resistance.'}
});
