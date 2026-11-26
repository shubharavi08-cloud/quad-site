QLab.register({
id:'c8_heatcurve',code:'8-C1',title:'Melt and boil: the heating graph',grade:8,subject:'Chemistry',emoji:'🌡️',
hook:{title:'A pot of ice is heated steadily. Does the temperature rise all the time?',text:'You will heat ice, measure the temperature every half minute and draw the graph. Watch for a surprise!'},
prior:'Know that a thermometer measures temperature.',
guess:{q:'While ice is melting, the thermometer reading will…',options:['keep rising steadily','stay at 0 °C for a while','go down','jump to 100 °C'],answer:1,hint:'Look at a glass of ice water: it stays cold until all the ice has melted.',after:'Heat it and read the thermometer.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A beaker of ice on a burner with a thermometer and a live temperature-time graph'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const temp=m=>m<=2?-20+m*10:m<=5?0:m<=10?(m-5)*20:m<=16?100:100+(m-16)*10;
 const stg=m=>m<=2?'ice (solid)':m<5?'ice melting (solid + liquid)':m<10?'water (liquid)':m<16?'water boiling (liquid + gas)':'steam (gas)';
 const mx=P?100:170,my=P?250:340,bw=P?120:130,bh=P?130:140;
 const jar=sc.vessel({x:mx,y:my,type:'beaker',w:bw,h:bh,level:.1,color:'#cde9f9',label:'Beaker'});
 const gD=E('g',{},sc.gMain),gF=E('g',{},sc.gMain),gG=E('g',{},sc.gMain);
 const thx=mx+bw/2+36,thy=my-bh+6,thh=bh-26;
 E('rect',{x:thx-6,y:thy,width:12,height:thh,rx:6,fill:'#fff',stroke:'#5a6a85','stroke-width':3},sc.gMain);E('circle',{cx:thx,cy:thy+thh+3,r:10,fill:'#e5484d',stroke:'#5a6a85','stroke-width':3},sc.gMain);
 const merc=E('rect',{x:thx-3,y:thy,width:6,height:thh,rx:3,fill:'#e5484d'},sc.gMain);const tv=T(sc.gMain,thx,thy-8,'',{'font-size':14,'font-weight':900,fill:'#2b2350',class:''});
 const stl=T(sc.gMain,mx,my+(P?66:68),'',{'font-size':12,'font-weight':800,fill:'#2b2350',class:''});
 const gx0=P?44:380,gx1=P?390:730,gy0=P?360:150,gy1=P?480:300;
 const gX=m=>gx0+m/20*(gx1-gx0),gY=Tc=>gy1-(Tc+20)/150*(gy1-gy0);
 let t=0,pts=[{t:0,T:-20}],picked=null,busy=false;
 function graph(){gG.innerHTML='';E('rect',{x:gx0-26,y:gy0-24,width:gx1-gx0+40,height:gy1-gy0+54,rx:12,fill:'#fff',opacity:.92,stroke:'#cdb8ff','stroke-width':2},gG);
  E('line',{x1:gx0,y1:gy1,x2:gx1,y2:gy1,stroke:'#1b2a4a','stroke-width':2.5},gG);E('line',{x1:gx0,y1:gy1,x2:gx0,y2:gy0-6,stroke:'#1b2a4a','stroke-width':2.5},gG);
  [0,50,100].forEach(v=>{E('line',{x1:gx0,y1:gY(v),x2:gx1,y2:gY(v),stroke:'#cfdcee','stroke-dasharray':'4 4'},gG);T(gG,gx0-12,gY(v)+4,String(v),{'font-size':10,'text-anchor':'end'}).setAttribute('text-anchor','end')});
  [0,5,10,15,20].forEach(m=>T(gG,gX(m),gy1+14,String(m),{'font-size':10}));T(gG,(gx0+gx1)/2,gy1+28,'Time (minutes)',{'font-size':11,'font-weight':700,class:''});T(gG,gx0+4,gy0-10,'Temperature °C',{'font-size':11,'font-weight':700,class:''}).setAttribute('text-anchor','start');
  E('polyline',{fill:'none',stroke:'#2aa5d8','stroke-width':3.5,points:pts.map(p=>gX(p.t)+','+gY(p.T)).join(' ')},gG);const l=pts[pts.length-1];E('circle',{cx:gX(l.t),cy:gY(l.T),r:5,fill:'#e5534b'},gG)}
 function scene(){gD.innerHTML='';const Tc=temp(t);const y=thy+thh-(Tc+20)/150*thh;merc.setAttribute('y',Math.max(thy,y));merc.setAttribute('height',thy+thh-Math.max(thy,y)+3);tv.textContent=Math.round(Tc)+' °C';stl.textContent=stg(t);
  const x0=mx-bw/2+10,x1=mx+bw/2-10;let lvl,ice=0;if(t<=2){lvl=.12;ice=6}else if(t<5){const k=(t-2)/3;lvl=.12+.38*k;ice=Math.round(6*(1-k))}else if(t<=16)lvl=.5;else lvl=Math.max(.1,.5-(t-16)*.1);
  jar.setLevel(lvl,300);jar.setColor(t>=5?'#cde9f9':'#dff3ff',300);
  for(let i=0;i<ice;i++)E('rect',{x:mx-bw/2+14+(i%3)*30,y:my-bh*lvl-14+(i>2?-14:0),width:26,height:24,rx:5,fill:'#e7f6ff',stroke:'#5aa6d8','stroke-width':2,opacity:.95},gD);
  if(t>10&&t<=16)for(let i=0;i<8;i++)E('circle',{cx:x0+((i*37)%(x1-x0)),cy:my-18-((i*23)%(bh*.4)),r:4,fill:'#fff',stroke:'#8ec9ff','stroke-width':1.2},gD);
  if(t>10)for(let i=0;i<4;i++){const c=T(gD,mx-30+i*20,my-bh-6-i%2*10,'☁️',{'font-size':18,class:''});c.setAttribute('opacity',.7)}
  graph()}
 sc.heat=async mins=>{if(busy)return;if(t>=20){sc.say('Enough! You heated for 20 minutes.','');return}busy=true;L.snd.fizz&&L.snd.fizz();const fl=E('text',{x:mx,y:my+34,'text-anchor':'middle','font-size':30},gF);fl.textContent='🔥';
  const steps=Math.round(mins/.5);for(let i=0;i<steps&&t<20;i++){t=Math.round((t+.5)*10)/10;pts.push({t,T:temp(t)});scene();await sc.sleep(120);
   if(t===3)sc.say('The line went flat. The heat is melting the ice, not raising the temperature.','ok');if(t===12)sc.say('Flat again. Now the heat is turning water into steam. Still 100 °C.','ok')}
  fl.remove();if(!chal&&t>=18){api.award('did');api.ready()}busy=false};
 sc.answer=v=>{if(t<12){const m='Keep heating until the water boils and the graph goes flat the second time.';sc.say(m,'warn');return api.nope(m)}if(v===100){L.snd.ok&&L.snd.ok();sc.say('100 °C: the second flat part. You read the graph like a scientist.','ok');api.solved()}else{L.snd.no&&L.snd.no();const m='Look at the second flat part of the graph. Read the number on the side.';sc.say(m,'warn');api.nope(m)}};
 sc.tool({x:P?50:300,y:P?520:372,label:'Burner +2 min',ly:34,scale:1,draw:g=>{E('rect',{x:-18,y:2,width:36,height:12,rx:3,fill:'#8a96a8',stroke:'#4a5568','stroke-width':2},g);const f=E('text',{x:0,y:0,'text-anchor':'middle','font-size':26},g);f.textContent='🔥'},use:()=>sc.heat(2)});
 if(chal)[90,100,110,120].forEach((v,i)=>sc.tool({x:P?140+i*70:420+i*80,y:P?520:372,label:v+' °C',ly:34,scale:.9,draw:g=>{E('circle',{r:20,fill:'#efe8ff',stroke:'#7a5cf0','stroke-width':3},g);T(g,0,5,String(v),{'font-size':14,'font-weight':900,fill:'#2b2350',class:''})},use:()=>sc.answer(v)}));
 scene();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px">${chal?'<b>Heat past the boil, then drag the boiling point onto the beaker.</b>':'<b>Drag the burner onto the beaker</b> and watch the graph grow.'}</p><div class="row" style="flex-wrap:wrap"><button class="pri" id="h2">🔥 Heat +2 min</button><button id="h5">⏩ +5 min</button>${chal?[90,100,110,120].map(v=>`<button data-b="${v}">${v} °C</button>`).join(''):''}</div>${chal?'':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Heat for about 18 minutes to unlock the next step.</p>'}`;
 api.ctrl.querySelector('#h2').onclick=()=>sc.heat(2);api.ctrl.querySelector('#h5').onclick=()=>sc.heat(5);api.ctrl.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>sc.answer(+b.dataset.b));
 sc.say('Ice at −20 °C. Heat it and watch the graph.')},
demo:[[S=>S.heat(5),'Heat the ice. It warms, then the line goes flat while it melts.',700],[S=>S.heat(5),'Water warms up to 100 °C.',700],[S=>S.heat(6),'Flat again while it boils into steam.',900]],
why:['The line has <b>two flat parts</b>. While a solid melts or a liquid boils, the temperature does not rise.','The heat energy is used to <b>break the particles apart</b>, not to make them move faster.','Ice melts at <b>0 °C</b> (the <span class="word">melting point</span>). Water boils at <b>100 °C</b> (the <span class="word">boiling point</span>).','When the state change is finished, the temperature starts rising again.'],
check:[{q:'The graph is flat at 0 °C. What is happening?',options:['Nothing','The ice is melting','The water is boiling','The thermometer is broken'],answer:1,why:'The heat goes into melting the ice, so the temperature stays at 0 °C.',hint:'Look at the stage shown while the line is flat.'},
 {q:'What is the boiling point of pure water?',options:['0 °C','50 °C','100 °C','200 °C'],answer:2,why:'Pure water boils at 100 °C at normal air pressure.',hint:'Read the second flat part.'},
 {q:'Where does the heat go during a flat part of the graph?',options:['It disappears','Into breaking particles apart','Into making particles smaller','Into the thermometer'],answer:1,why:'The energy loosens the bonds between particles, so the state changes.',hint:'Remember the particle pictures from the last experiment.'}],
challenge:{text:'Heat past the boil. Then choose the <b>boiling point</b> of water from the graph.',win:'You read the graph like a scientist.'},
real:['A pressure cooker raises the boiling point, so food cooks faster.','Sweating cools you because water takes heat from your skin to evaporate.','Ice keeps drinks at 0 °C while it melts.'],
words:{'Melting point':'Temperature where a solid melts.','Boiling point':'Temperature where a liquid boils.','Energy':'What makes things move or change.'}
});
