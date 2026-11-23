QLab.register({
id:'c10_burn',code:'10-C4',title:'Burn it: carbon compounds and flames',grade:10,subject:'Chemistry',emoji:'🕯️',
hook:{title:'Why does a candle give a yellow sooty flame, but a gas stove burns blue and clean?',text:'Carbon compounds burn in oxygen. How much oxygen gets in decides the flame.'},
prior:'You know combustion and the flame zones.',
guess:{q:'When a carbon compound burns completely in air, the products are…',options:['Carbon and hydrogen','CO₂ and water','Only ash','Oxygen and water'],answer:1,hint:'Hydrocarbon + O₂ → ?',after:'Adjust the air supply.'},
build(api){
 const chal=!!api.challenge;
 let air=1,fuel='methane';const seen=new Set();
 api.ctrl.innerHTML=chal?`<p><b>A flame is yellow and leaves black soot on a pan. Choose the cause:</b></p><div class="row" id="fm">${['Too much oxygen','Not enough oxygen','Too hot','Water in fuel'].map((x,i)=>`<button data-a="${i}">${x}</button>`).join('')}</div>`:`<b>Air hole</b><div class="row" id="ah">${[['Closed',0],['Half',1],['Open',2]].map(([l,v])=>`<button data-v="${v}">${l}</button>`).join('')}</div><b>Fuel</b><div class="row" id="fl">${[['Methane (gas stove)','methane'],['Candle wax','wax'],['Kerosene','kero']].map(([l,v])=>`<button data-f="${v}">${l}</button>`).join('')}</div><p id="st" style="font-weight:800"></p>`;
 const q=x=>api.ctrl.querySelector(x);
 function draw(){const sooty=chal?true:(fuel==='methane'?air===0:air<2),col=sooty?'#ffcc33':'#4aa8ff',blue=!sooty;
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><rect x="340" y="230" width="80" height="40" fill="#8a929c"/><path d="M380 230 C340 190 350 150 380 80 C410 150 420 190 380 230Z" fill="${col}" opacity=".9"/>${sooty?'<g fill="#333"><circle cx="372" cy="60" r="5"/><circle cx="388" cy="45" r="6"/><circle cx="378" cy="28" r="5"/></g><rect x="320" y="12" width="120" height="14" fill="#555"/>':''}<text x="380" y="290" text-anchor="middle" font-size="16" font-weight="800">${chal?'Yellow, sooty flame':blue?'Blue flame: complete combustion':'Yellow flame with soot: incomplete combustion'}</text>`);
  if(q('#st'))q('#st').textContent=blue?'CH₄ + 2O₂ → CO₂ + 2H₂O  (clean, hot)':'Not enough oxygen: carbon (soot) and poisonous CO form.';
  if(!chal){seen.add(sooty?'y':'b');if(seen.size>=2){api.award('did');api.ready()}}}
 if(!chal){q('#ah').querySelectorAll('button').forEach(b=>b.onclick=()=>{air=+b.dataset.v;draw()});q('#fl').querySelectorAll('button').forEach(b=>b.onclick=()=>{fuel=b.dataset.f;draw()})}
 else q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='1'?api.solved():api.nope('Soot is unburnt carbon: the air supply was too low.'));
 draw()},
why:['With plenty of oxygen, carbon compounds burn <b>completely</b>: they give CO₂ and water, with a blue, clean flame.','With too little oxygen they burn <b>incompletely</b>: yellow flame, black soot (carbon) and poisonous carbon monoxide.','Saturated compounds (like methane) burn with a clean flame; unsaturated or large ones give a sooty flame.','Burning is also called <span class="word">combustion</span> and releases heat and light.'],
check:[{q:'A blue flame means…',options:['Incomplete burning','Complete burning','No oxygen','Cold fuel'],answer:1,why:'Plenty of oxygen.',hint:'Gas stove.'},
 {q:'Soot is mainly…',options:['Water','Carbon','Oxygen','Ash of metal'],answer:1,why:'Unburnt carbon particles.',hint:'Black.'},
 {q:'Which poisonous gas forms in incomplete burning?',options:['CO₂','CO','O₂','H₂'],answer:1,why:'Carbon monoxide.',hint:'One oxygen only.'}],
challenge:{text:'A flame is yellow and sooty. What is the <b>cause</b>?',win:'Not enough oxygen: incomplete combustion.'},
real:['Never run a gas heater or sigdi in a closed room: carbon monoxide can kill.','Gas stove burners have air holes for a blue flame.','Cars use catalytic converters to turn CO into CO₂.'],
words:{Combustion:'Burning in oxygen.','Incomplete combustion':'Burning with too little oxygen.',Soot:'Unburnt carbon.','Carbon monoxide':'Poisonous gas, CO.'}
});
