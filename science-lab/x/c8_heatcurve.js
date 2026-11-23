QLab.register({
id:'c8_heatcurve',code:'8-C1',title:'Melt and boil: the heating graph',grade:8,subject:'Chemistry',emoji:'🌡️',
hook:{title:'A pot of ice is heated steadily. Does the temperature rise all the time?',text:'You will heat ice, measure the temperature every half minute and draw the graph. Watch for a surprise!'},
prior:'Know that a thermometer measures temperature.',
guess:{q:'While ice is melting, the thermometer reading will…',options:['keep rising steadily','stay at 0 °C for a while','go down','jump to 100 °C'],answer:1,hint:'Look at a glass of ice water: it stays cold until all the ice has melted.',after:'Heat it and read the thermometer.'},
build(api){
 const chal=!!api.challenge;let t=0,pts=[{t:0,T:-20}],picked=null;
 const temp=m=>m<=2?-20+m*10:m<=5?0:m<=10?(m-5)*20:m<=16?100:100+(m-16)*10;
 const stage=m=>m<=2?'ice (solid)':m<5?'ice melting (solid + liquid)':m<10?'water (liquid)':m<16?'water boiling (liquid + gas)':'steam (gas)';
 api.ctrl.innerHTML=`<p>Time: <b id="tm"></b> min</p><p>Thermometer: <span class="read" id="th"></span></p><p>Now: <b id="sg"></b></p><button class="pri" id="heat">🔥 Heat for 30 seconds</button>${chal?'<p style="margin-top:12px"><b>Boiling point is…</b></p><div class="row" id="bp">'+[90,100,110,120].map(x=>`<button data-b="${x}" aria-pressed="false">${x} °C</button>`).join('')+'</div><button class="pri" id="ck">Check my answer</button>':''}`;
 const gx=m=>60+m/20*640,gy=T=>240-(T+20)/150*200;
 function draw(){const T=temp(t);
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><g stroke="#1b2a4a" stroke-width="3"><line x1="60" y1="240" x2="700" y2="240"/><line x1="60" y1="240" x2="60" y2="30"/></g>
  <text x="380" y="285" text-anchor="middle" font-size="14" font-weight="700">Time (minutes)</text><text x="14" y="135" font-size="14" font-weight="700" transform="rotate(-90 14 135)" text-anchor="middle">Temperature (°C)</text>
  ${[0,5,10,15,20].map(m=>`<text x="${gx(m)}" y="258" text-anchor="middle" font-size="11">${m}</text>`).join('')}${[0,50,100].map(v=>`<text x="50" y="${gy(v)+4}" text-anchor="end" font-size="11">${v}</text><line x1="60" y1="${gy(v)}" x2="700" y2="${gy(v)}" stroke="#cfdcee" stroke-dasharray="4 4"/>`).join('')}
  <polyline fill="none" stroke="#2aa5d8" stroke-width="3" points="${pts.map(p=>gx(p.t)+','+gy(p.T)).join(' ')}"/>${pts.map(p=>`<circle cx="${gx(p.t)}" cy="${gy(p.T)}" r="4" fill="#e5534b"/>`).join('')}`);
  const q=s=>api.ctrl.querySelector(s);q('#tm').textContent=t.toFixed(1);q('#th').textContent=T+' °C';q('#sg').textContent=stage(t);
  if(!chal&&t>=18){api.award('did');api.ready()}}
 api.ctrl.querySelector('#heat').onclick=()=>{if(t>=20){api.coach('info','Enough!','You heated for 20 minutes. Press the next button to see why.');return}t+=.5;pts.push({t,T:temp(t)});draw();
  if(t===3)api.coach('info','Look at the graph','The line went flat. The heat is being used to melt the ice, not to raise the temperature.');
  if(t===12)api.coach('info','Flat again','Now the heat is turning water into steam. The temperature stays at 100 °C.')};
 if(chal){api.ctrl.querySelectorAll('#bp button').forEach(b=>b.onclick=()=>{picked=+b.dataset.b;api.ctrl.querySelectorAll('#bp button').forEach(x=>{x.className=x===b?'pri':'';x.setAttribute('aria-pressed',x===b)})});
  api.ctrl.querySelector('#ck').onclick=()=>{if(t<12)return api.nope('Keep heating until the water boils and the graph goes flat the second time.');if(picked===null)return api.nope('Pick the temperature where the graph went flat the second time.');picked===100?api.solved():api.nope('Look at the second flat part of the graph. Read the number on the side.')}}
 draw()},
why:['The line has <b>two flat parts</b>. While a solid melts or a liquid boils, the temperature does not rise.','The heat energy is used to <b>break the particles apart</b>, not to make them move faster.','Ice melts at <b>0 °C</b> (the <span class="word">melting point</span>). Water boils at <b>100 °C</b> (the <span class="word">boiling point</span>).','When the state change is finished, the temperature starts rising again.'],
check:[{q:'The graph is flat at 0 °C. What is happening?',options:['Nothing','The ice is melting','The water is boiling','The thermometer is broken'],answer:1,why:'The heat goes into melting the ice, so the temperature stays at 0 °C.',hint:'Look at the stage shown while the line is flat.'},
 {q:'What is the boiling point of pure water?',options:['0 °C','50 °C','100 °C','200 °C'],answer:2,why:'Pure water boils at 100 °C at normal air pressure.',hint:'Read the second flat part.'},
 {q:'Where does the heat go during a flat part of the graph?',options:['It disappears','Into breaking particles apart','Into making particles smaller','Into the thermometer'],answer:1,why:'The energy loosens the bonds between particles, so the state changes.',hint:'Remember the particle pictures from the last experiment.'}],
challenge:{text:'Heat past the boil. Then choose the <b>boiling point</b> of water from the graph.',win:'You read the graph like a scientist.'},
real:['A pressure cooker raises the boiling point, so food cooks faster.','Sweating cools you because water takes heat from your skin to evaporate.','Ice keeps drinks at 0 °C while it melts.'],
words:{'Melting point':'Temperature where a solid melts.','Boiling point':'Temperature where a liquid boils.','Energy':'What makes things move or change.'}
});
