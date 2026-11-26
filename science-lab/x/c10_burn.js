QLab.register({
id:'c10_burn',code:'10-C4',title:'Burn it: carbon compounds and flames',grade:10,subject:'Chemistry',emoji:'🕯️',
hook:{title:'Why does a candle give a yellow sooty flame, but a gas stove burns blue and clean?',text:'Carbon compounds burn in oxygen. How much oxygen gets in decides the flame.'},
prior:'You know combustion and the flame zones.',
guess:{q:'When a carbon compound burns completely in air, the products are…',options:['Carbon and hydrogen','CO₂ and water','Only ash','Oxygen and water'],answer:1,hint:'Hydrocarbon + O₂ → ?',after:'Adjust the air supply.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A burner with an adjustable air hole, a flame, and a cold pan to catch soot'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 let air=chal?0:2,fuel='methane',sootAmt=0,pan=false,busy=false;const seen=new Set();
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const g=E('g',{},sc.gMain);
 const q=x=>api.ctrl.querySelector(x);
 const sooty=()=>chal?true:(fuel==='methane'?air===0:air<2);
 function draw(){g.innerHTML='';const s=sooty(),bx=P?W/2:W/2-60,by=P?330:310,fh=s?(fuel==='kero'?95:80):55,col=s?'#ffc233':'#4aa8ff';
  E('rect',{x:bx-8,y:by-120,width:16,height:120,fill:'#8a929c',stroke:'#5a6a85','stroke-width':2},g);E('rect',{x:bx-30,y:by,width:60,height:14,rx:5,fill:'#6b7690'},g);
  const open=air===2?9:air===1?5:0;E('rect',{x:bx-11,y:by-60,width:22,height:22,rx:3,fill:'#c3ccdd',stroke:'#5a6a85','stroke-width':2},g);E('rect',{x:bx-open/2,y:by-54,width:open,height:10,fill:'#2b2350'},g);
  if(!chal)T(g,bx+44,by-44,['air hole: closed','air hole: half','air hole: open'][air],{'font-size':11,'font-weight':800,'text-anchor':'start',class:''});
  E('path',{d:`M${bx} ${by-120} C${bx-22} ${by-120-fh*.4} ${bx-14} ${by-120-fh*.8} ${bx} ${by-120-fh} C${bx+14} ${by-120-fh*.8} ${bx+22} ${by-120-fh*.4} ${bx} ${by-120}Z`,fill:col,opacity:.92},g);
  E('path',{d:`M${bx} ${by-120} C${bx-9} ${by-120-fh*.3} ${bx-6} ${by-120-fh*.5} ${bx} ${by-120-fh*.6} C${bx+6} ${by-120-fh*.5} ${bx+9} ${by-120-fh*.3} ${bx} ${by-120}Z`,fill:s?'#ff9a1a':'#2b7bd9',opacity:.9},g);
  if(s)for(let i=0;i<4;i++)E('circle',{cx:bx-8+i*5,cy:by-120-fh-10-i*10,r:3+i%2,fill:'#333',opacity:.6-i*.1},g);
  if(pan){const py=by-120-fh-12;E('rect',{x:bx-44,y:py,width:88,height:10,rx:4,fill:'#6b7690',stroke:'#444','stroke-width':2},g);if(sootAmt>0)E('rect',{x:bx-30,y:py+10,width:60*Math.min(1,sootAmt),height:4,rx:2,fill:'#111'},g)}
  T(g,W/2,106,chal?'Yellow, sooty flame':s?'Yellow flame with soot: incomplete combustion':'Blue flame: complete combustion',{'font-size':P?14:17,'font-weight':900,fill:'#2b2350'});
  if(q('#st'))q('#st').textContent=s?'Not enough oxygen: carbon (soot) and poisonous CO form.':'CH₄ + 2O₂ → CO₂ + 2H₂O  (clean, hot)';
  if(!chal){seen.add(s?'y':'b');if(seen.size>=2){api.award('did');api.ready()}}}
 sc.setAir=v=>{air=v;sootAmt=0;L.snd.pop&&L.snd.pop();draw();sc.say(sooty()?'Little air: the flame turns yellow.':'Plenty of air: the flame turns blue.')};
 sc.setFuel=f=>{fuel=f;sootAmt=0;draw()};
 sc.holdPan=async()=>{if(busy)return;busy=true;pan=true;sootAmt=0;draw();for(let i=0;i<8;i++){await sc.sleep(300);if(sooty()){sootAmt=i/7;draw()}}sc.say(sooty()?'Black soot (unburnt carbon) sticks to the cold pan.':'The pan stays clean. All the carbon burned to CO₂.',sooty()?'warn':'ok');await sc.sleep(900);pan=false;draw();busy=false};
 sc.tool({x:P?60:W-180,y:P?492:392,label:'Cold pan',ly:30,scale:.9,draw:g2=>{E('rect',{x:-24,y:-8,width:48,height:12,rx:4,fill:'#6b7690',stroke:'#444','stroke-width':2},g2)},use:()=>sc.holdPan()});
 if(chal){api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Drag the cold pan onto the flame, then choose the cause:</b></p><div class="row" id="fm" style="flex-wrap:wrap">${['Too much oxygen','Not enough oxygen','Too hot','Water in fuel'].map((x,i)=>`<button data-a="${i}">${x}</button>`).join('')}</div>`;
  q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.a==='1'){L.snd.ok&&L.snd.ok();api.solved()}else{L.snd.no&&L.snd.no();api.nope('Soot is unburnt carbon: the air supply was too low.')}})}
 else{api.ctrl.innerHTML=`<p style="margin:0 0 4px;font-size:14px"><b>Turn the air hole and pick a fuel</b>, then hold the cold pan over the flame.</p><b>Air hole</b><div class="row" id="ah">${[['Closed',0],['Half',1],['Open',2]].map(([l,v])=>`<button data-v="${v}">${l}</button>`).join('')}</div><b>Fuel</b><div class="row" id="fl" style="flex-wrap:wrap">${[['Methane (gas stove)','methane'],['Candle wax','wax'],['Kerosene','kero']].map(([l,v])=>`<button data-f="${v}">${l}</button>`).join('')}</div><p id="st" style="font-weight:800;margin:4px 0"></p><p class="lockhint" style="margin:0;text-align:left">See both a blue and a yellow flame to unlock the next step.</p>`;
  q('#ah').querySelectorAll('button').forEach(b=>b.onclick=()=>sc.setAir(+b.dataset.v));q('#fl').querySelectorAll('button').forEach(b=>b.onclick=()=>sc.setFuel(b.dataset.f))}
 draw();sc.say(chal?'Hold the pan over the flame and look.':'Close the air hole and watch the flame.')},
demo:[[S=>S.setAir(0),'Air hole closed: yellow, sooty flame.',900],[S=>S.holdPan(),'Soot forms on a cold pan: unburnt carbon.',900],[S=>S.setAir(2),'Open the air hole: clean blue flame.',900]],
why:['With plenty of oxygen, carbon compounds burn <b>completely</b>: they give CO₂ and water, with a blue, clean flame.','With too little oxygen they burn <b>incompletely</b>: yellow flame, black soot (carbon) and poisonous carbon monoxide.','Saturated compounds (like methane) burn with a clean flame; unsaturated or large ones give a sooty flame.','Burning is also called <span class="word">combustion</span> and releases heat and light.'],
check:[{q:'A blue flame means…',options:['Incomplete burning','Complete burning','No oxygen','Cold fuel'],answer:1,why:'Plenty of oxygen.',hint:'Gas stove.'},
 {q:'Soot is mainly…',options:['Water','Carbon','Oxygen','Ash of metal'],answer:1,why:'Unburnt carbon particles.',hint:'Black.'},
 {q:'Which poisonous gas forms in incomplete burning?',options:['CO₂','CO','O₂','H₂'],answer:1,why:'Carbon monoxide.',hint:'One oxygen only.'}],
challenge:{text:'A flame is yellow and sooty. What is the <b>cause</b>?',win:'Not enough oxygen: incomplete combustion.'},
real:['Never run a gas heater or sigdi in a closed room: carbon monoxide can kill.','Gas stove burners have air holes for a blue flame.','Cars use catalytic converters to turn CO into CO₂.'],
words:{Combustion:'Burning in oxygen.','Incomplete combustion':'Burning with too little oxygen.',Soot:'Unburnt carbon.','Carbon monoxide':'Poisonous gas, CO.'}
});
