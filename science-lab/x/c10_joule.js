QLab.register({
id:'c10_joule',code:'10-P9',title:'Heating effect of electric current',grade:10,subject:'Physics',emoji:'🔥',
hook:{title:'Why does an electric heater glow red but the cable to it stays cool?',text:'Current makes wires hot. How hot depends on the wire and on the current. Heat water with different wires and cells and measure the temperature rise.'},
prior:'You know that a battery makes current flow, and that a thin wire resists current more than a thick one.',
guess:{q:'The same current flows for the same time through a thin nichrome wire and a thick copper wire. Which gets hotter?',options:['Copper','Nichrome','Both the same','Neither'],answer:1,hint:'Which one resists the current more?',after:'Measure it.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A beaker of water with a heating coil, battery cells to add and a thermometer'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const WIRE={Copper:1,Nichrome:4};let wire='Copper',cells=1,pts=[],busy=false,temp=20,seen=new Set();
 const bx=P?210:400,by=P?400:320,bw=P?150:180,bh=P?170:190;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const bk=sc.vessel({x:bx,y:by,type:'beaker',w:bw,h:bh,level:.8,color:'#cfeaff',label:'Water 200 mL'});
 const gC=E('g',{},sc.gMain),gT=E('g',{},sc.gMain);
 const I=()=>cells*.5,Q=t=>Math.round(10*I()*I()*WIRE[wire]*t*2)/10;
 function draw(){gC.innerHTML='';const cx=bx,cy=by-bh*.35;
  let d=`M${cx-34} ${cy-30}`;for(let i=0;i<5;i++)d+=` q8 -10 16 0 q8 10 ${i%2?-6:6} 0`;
  const hot=Math.min(1,(temp-20)/40),col=wire==='Copper'?`rgb(${190+Math.round(40*hot)},${119-Math.round(60*hot)},${42})`:`rgb(${150+Math.round(100*hot)},${150-Math.round(110*hot)},${150-Math.round(120*hot)})`;
  const w=wire==='Copper'?6:3;E('path',{d:`M${cx-30} ${by-bh-10} V${cy-20} C${cx-30} ${cy+10},${cx+30} ${cy-10},${cx+30} ${cy+20} V${by-bh-10}`,fill:'none',stroke:col,'stroke-width':w,'stroke-linecap':'round'},gC);
  for(let i=0;i<cells;i++)E('rect',{x:(P?30:90)+i*34,y:P?150:300,width:28,height:42,rx:5,fill:'#ffb347',stroke:'#1b2a4a','stroke-width':3},gC);
  T(gC,P?30+cells*17:90+cells*17,(P?150:300)-8,cells*.5+' A',{'font-size':14,'font-weight':900,fill:'#b25a00',class:''});
  E('path',{d:`M${cx-30} ${by-bh-10} V${P?120:90} H${P?40:100} V${P?150:300}`,fill:'none',stroke:'#1b2a4a','stroke-width':3,opacity:.6},gC);E('path',{d:`M${cx+30} ${by-bh-10} V${P?120:90} H${P?390:520}`,fill:'none',stroke:'#1b2a4a','stroke-width':3,opacity:.6},gC);
  // thermometer
  const tx=bx+bw/2+(P?24:28),ty=by-bh+20;E('rect',{x:tx-6,y:ty,width:12,height:110,rx:6,fill:'#fff',stroke:'#555','stroke-width':3},gC);const hh=Math.max(4,Math.min(104,(temp-15)/80*104));E('rect',{x:tx-3,y:ty+108-hh,width:6,height:hh,fill:'#e5534b'},gC);E('circle',{cx:tx,cy:ty+116,r:10,fill:'#e5534b',stroke:'#555','stroke-width':3},gC);
  T(gC,tx,ty-6,temp.toFixed(1)+' °C',{'font-size':14,'font-weight':900,fill:'#c0281d',class:''});
  T(gC,W/2,P?112:128,wire+' wire · '+cells+' cell'+(cells>1?'s':'')+' · current '+I().toFixed(2)+' A',{'font-size':P?12:14,'font-weight':900,fill:'#1b2a4a',class:''});
  const c=api.ctrl.querySelector('#cnt');if(c)c.textContent=pts.length?pts.map(p=>p.w+', '+p.c+' cell'+(p.c>1?'s':'')+': +'+p.dt.toFixed(1)+'°C').join(' · '):'No readings yet.'}
 sc.cell=()=>{if(busy)return;if(cells>=4){sc.say('That is the most cells.','warn');return}cells++;temp=20;L.snd.pop&&L.snd.pop();draw()};
 sc.dropc=()=>{if(busy||cells<=1)return;cells--;temp=20;draw()};
 sc.wire=w=>{if(busy)return;wire=w;temp=20;L.snd.pop&&L.snd.pop();draw();sc.say(w+' wire in the water.')};
 sc.run=async()=>{if(busy)return;busy=true;temp=20;const tot=Q(2);sc.say('Heating for 2 minutes…');for(let i=1;i<=10;i++){temp=20+tot*i/10;draw();bk.bubbles&&i%4===0&&bk.bubbles(500,6,'#fff');await sc.sleep(200)}
  pts=pts.filter(p=>!(p.w===wire&&p.c===cells));pts.push({w:wire,c:cells,dt:tot});busy=false;draw();
  if(chal){if(tot>=12)api.solved();else api.nope(`Only +${tot.toFixed(1)} °C. You need at least +12 °C in 2 minutes. More cells or the thin nichrome wire give more heat.`)}
  else{sc.say('Temperature rose by '+tot.toFixed(1)+' °C. Change the wire or cells and heat again.');const nw=new Set(pts.map(p=>p.w)).size,nc=new Set(pts.map(p=>p.c)).size;if(pts.length>=4&&nw>=2&&nc>=2){api.award('did');api.ready();sc.say('More current or more resistance means more heat: H = I²Rt. Doubling the current gives four times the heat.','ok')}}};
 sc.tool({x:P?60:W*.12,y:P?492:384,label:'Cell +0.5 A',ly:P?32:34,scale:P?.75:.9,draw:g=>{E('rect',{x:-12,y:-14,width:24,height:30,rx:4,fill:'#ffb347',stroke:'#1b2a4a','stroke-width':2.5},g);E('rect',{x:-4,y:-19,width:8,height:5,fill:'#1b2a4a'},g)},use:()=>sc.cell()});
 api.ctrl.innerHTML=(chal?'<p style="margin:0 0 6px;font-size:14px"><b>Raise the water temperature by at least 12 °C</b> in one 2-minute run.</p>':'<p style="margin:0 0 4px;font-size:14px"><b>Drag cells</b> in, pick a wire, then heat for 2 minutes. Try both wires and different cells.</p>')+'<div class="row"><button data-w="Copper">Copper wire (thick)</button><button data-w="Nichrome">Nichrome (thin)</button><button id="rmc">− Cell</button><button class="pri" id="ht">🔥 Heat 2 min</button></div>'+(chal?'':'<p id="cnt" style="font-size:13px;color:#55688a;margin:4px 0 0"></p>');
 api.ctrl.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{sc.wire(b.dataset.w);api.ctrl.querySelectorAll('[data-w]').forEach(x=>x.className=x.dataset.w===wire?'pri':'')});api.ctrl.querySelector('[data-w=Copper]').className='pri';
 api.ctrl.querySelector('#rmc').onclick=()=>sc.dropc();api.ctrl.querySelector('#ht').onclick=()=>sc.run();
 draw();sc.say(chal?'What makes a wire hotter?':'Heat the water with the copper wire first.')},
demo:[[S=>S.run(),'Copper wire, one cell: a small rise.',2600],[S=>S.wire('Nichrome'),'Switch to thin nichrome.',800],[S=>S.run(),'Much hotter: higher resistance.',2600],[S=>S.cell(),'Add a cell: more current.',900],[S=>S.run(),'Much more heat again.',2600]],
why:['Moving charges collide with atoms in the wire, so electrical energy becomes <span class="word">heat</span>. This is the <span class="word">heating effect</span> of current (Joule heating).','<b>Joule\'s law: H = I² R t.</b> Heat grows with the <i>square</i> of the current: double the current and the heat is four times.','Heaters, irons and toasters use high-resistance wire (nichrome) so it glows. Connecting cables are thick, low-resistance copper, so they stay cool.','A <span class="word">fuse</span> is a thin wire that melts if too much current flows, protecting the circuit.'],
check:[{q:'The current in a heater is doubled. The heat produced per second becomes…',options:['twice','three times','four times','half'],answer:2,why:'H = I²Rt, so doubling I makes four times the heat.',hint:'I squared.'},
 {q:'Why is the heater element made of nichrome?',options:['It is cheap','It has high resistance and a high melting point','It is a magnet','It does not conduct'],answer:1,why:'High resistance makes lots of heat; the high melting point stops it melting.',hint:'It must get very hot.'},
 {q:'What does a fuse do?',options:['Stores charge','Melts and breaks the circuit when current is too high','Makes current bigger','Measures voltage'],answer:1,why:'It is a safety link.',hint:'Safety.'}],
challenge:{text:'Heat the water by <b>12 °C or more</b> in one 2-minute run.',win:'High resistance wire and more cells give much more heat.'},
real:['Electric kettles, irons, toasters and room heaters.','Fuses and MCBs protect your home wiring.','Bulb filaments glow because of the heating effect.'],
words:{'Heating effect':'Current producing heat in a wire.','Joule\'s law':'H = I² R t.',Resistance:'How hard it is for current to flow (Ω).',Fuse:'A thin wire that melts to protect a circuit.'}
});
