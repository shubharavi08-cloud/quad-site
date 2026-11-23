QLab.register({
id:'c8_flame',code:'8-C4',title:'Zones of a candle flame',grade:8,subject:'Chemistry',emoji:'🕯️',
hook:{title:'A candle flame has three zones. Which is the hottest?',text:'Hold a thermometer in each zone of the flame and find out where goldsmiths put their gold.'},
prior:'You have seen a candle burn.',
guess:{q:'Which part of a candle flame is the hottest?',options:['The dark middle','The yellow middle','The faint blue outer edge','All are equally hot'],answer:2,hint:'It gets the most oxygen from the air.',after:'Probe each zone.'},
build(api){
 const chal=!!api.challenge;const Z={inner:['Dark inner zone',400,'Unburnt wax vapour. Little oxygen, so little burning.'],mid:['Yellow middle zone',900,'Partial burning. Tiny soot particles glow yellow.'],outer:['Blue outer zone',1400,'Plenty of oxygen. Complete burning. Hottest.']};
 let z=null;const seen=new Set();
 api.ctrl.innerHTML=chal?`<p><b>A goldsmith melts gold. Click the zone where the gold should go.</b></p>`:`<div class="row" id="zb">${Object.entries(Z).map(([k,v])=>`<button data-z="${k}">${v[0]}</button>`).join('')}</div><p>Thermometer: <span class="read" id="th">—</span></p><p id="zn" style="font-size:14px"></p>`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(){api.stage.innerHTML=QLab.svg(760,320,`<rect width="760" height="320" fill="none"/><rect x="368" y="240" width="24" height="70" fill="#f4efe0" stroke="#8a7a50" stroke-width="3"/><line x1="380" y1="240" x2="380" y2="215" stroke="#333" stroke-width="3"/>
  <path d="M380 70 C330 130 320 190 380 225 C440 190 430 130 380 70Z" fill="#7ab8ff" opacity=".55" data-z="outer" style="cursor:pointer"/>
  <path d="M380 105 C350 150 345 185 380 215 C415 185 410 150 380 105Z" fill="#ffd54a" data-z="mid" style="cursor:pointer"/>
  <path d="M380 165 C368 185 370 205 380 215 C390 205 392 185 380 165Z" fill="#4a3b2a" data-z="inner" style="cursor:pointer"/>
  ${z?`<circle cx="${z==='outer'?338:z==='mid'?356:380}" cy="${z==='inner'?195:170}" r="9" fill="none" stroke="#e5534b" stroke-width="3"/>`:''}
  <text x="500" y="100" font-size="14" font-weight="800" fill="#4b3fd1">Outer (blue)</text><text x="500" y="160" font-size="14" font-weight="800" fill="#b8860b">Middle (yellow)</text><text x="500" y="215" font-size="14" font-weight="800" fill="#4a3b2a">Inner (dark)</text>`);
  api.stage.querySelectorAll('[data-z]').forEach(p=>p.onclick=()=>pick(p.dataset.z))}
 function pick(k){z=k;draw();if(chal){k==='outer'?api.solved():api.nope(k==='inner'?'The dark inner zone is the coolest, because it has the least oxygen.':'The yellow zone is warm, but not the hottest. The outer edge touches the most oxygen.');return}
  q('#th').textContent=Z[k][1]+' °C';q('#zn').textContent=Z[k][2];seen.add(k);if(seen.size===3){api.award('did');api.ready()}}
 if(!chal)q('#zb').querySelectorAll('button').forEach(b=>b.onclick=()=>pick(b.dataset.z));
 draw()},
why:['A candle flame has <b>three zones</b>. The <b>inner dark zone</b> is unburnt wax vapour and is the coolest.','The <b>middle yellow zone</b> burns partly. Tiny hot soot particles glow yellow.','The <b>outer blue zone</b> gets the most oxygen, burns completely, and is the <b>hottest</b>.','Complete burning gives more heat and no soot. Incomplete burning gives soot and less heat.'],
check:[{q:'Which zone of a flame is the hottest?',options:['Inner dark','Middle yellow','Outer blue','They are the same'],answer:2,why:'The outer zone meets the most oxygen, so it burns completely.',hint:'Look at your thermometer readings.'},
 {q:'Why is the inner zone cooler?',options:['It has little oxygen','It is made of ice','It is far from the wick','It has no wax'],answer:0,why:'Little oxygen reaches the centre, so little burning happens.',hint:'Fire needs oxygen.'},
 {q:'Soot comes from…',options:['Complete burning','Incomplete burning','No burning','Water vapour'],answer:1,why:'When there is not enough oxygen the fuel burns partly and leaves soot.',hint:'The yellow zone makes soot.'}],
challenge:{text:'A goldsmith wants to melt gold <b>fastest</b>. Click the zone of the flame where the gold should be held.',win:'Goldsmiths use the outermost zone, the hottest part.'},
real:['A gas stove flame is blue because the gas burns completely.','Yellow flames and black soot on a vessel mean incomplete burning.','Goldsmiths use the outer zone of the flame, with a blowpipe, to melt metals.'],
words:{Zone:'A part of the flame.','Complete combustion':'Burning with plenty of oxygen.','Incomplete combustion':'Burning with too little oxygen.',Soot:'Fine black carbon particles.'}
});
