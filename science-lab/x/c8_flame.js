QLab.register({
id:'c8_flame',code:'8-C4',title:'Zones of a candle flame',grade:8,subject:'Chemistry',emoji:'🕯️',
hook:{title:'A candle flame has three zones. Which is the hottest?',text:'Hold a thermometer in each zone of the flame and find out where goldsmiths put their gold.'},
prior:'You have seen a candle burn.',
guess:{q:'Which part of a candle flame is the hottest?',options:['The dark middle','The yellow middle','The faint blue outer edge','All are equally hot'],answer:2,hint:'It gets the most oxygen from the air.',after:'Probe each zone.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A burning candle with three flame zones, a thermometer and a spoon to test them'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const Z={inner:['Dark inner zone',400,'Unburnt wax vapour. Little oxygen, so little burning. Coolest.'],mid:['Yellow middle zone',900,'Partial burning. Tiny soot particles glow yellow.'],outer:['Blue outer zone',1400,'Plenty of oxygen. Complete burning. Hottest.']};
 const cx=P?210:290,dy=P?120:40,dx=cx-380;
 const gC=E('g',{transform:`translate(${dx},${dy})`},sc.gMain);
 E('rect',{x:366,y:240,width:28,height:90,fill:'#f4efe0',stroke:'#8a7a50','stroke-width':3},gC);E('ellipse',{cx:380,cy:332,rx:30,ry:7,fill:'#000',opacity:.15},gC);E('line',{x1:380,y1:240,x2:380,y2:215,stroke:'#333','stroke-width':3},gC);
 const po=E('path',{d:'M380 70 C330 130 320 190 380 225 C440 190 430 130 380 70Z',fill:'#7ab8ff',opacity:.55},gC);
 const pm=E('path',{d:'M380 105 C350 150 345 185 380 215 C415 185 410 150 380 105Z',fill:'#ffd54a'},gC);
 const pi=E('path',{d:'M380 165 C368 185 370 205 380 215 C390 205 392 185 380 165Z',fill:'#4a3b2a'},gC);
 const lx=P?W-20:cx+110;
 [['Outer (blue)','#4b3fd1',100],['Middle (yellow)','#b8860b',160],['Inner (dark)','#4a3b2a',212]].forEach(l=>{const t=T(sc.gMain,lx,l[2]+dy,l[0],{'font-size':13,'font-weight':800,fill:l[1],class:''});t.setAttribute('text-anchor',P?'end':'start')});
 const gM=E('g',{},sc.gMain),gI=E('g',{},sc.gMain);let busy=false;const seen=new Set();
 const pt=(e)=>{const m=sc.svg.getScreenCTM().inverse(),p=sc.svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(m)};
 const zoneAt=p=>{const q=sc.svg.createSVGPoint();q.x=p.x-dx;q.y=p.y-dy;if(pi.isPointInFill(q))return'inner';if(pm.isPointInFill(q))return'mid';if(po.isPointInFill(q))return'outer';return null};
 sc.probe=async(kind,k)=>{if(busy)return;busy=true;gM.innerHTML='';const zx=dx+(k==='outer'?345:k==='mid'?362:380),zy=dy+(k==='inner'?200:k==='mid'?170:150);
  if(kind==='gold'){if(k==='outer'){L.snd.ok&&L.snd.ok();sc.say('The blue outer zone is the hottest. Gold melts there.','ok');gM.innerHTML='';E('circle',{cx:zx,cy:zy,r:9,fill:'#f2c200',stroke:'#8a6a00','stroke-width':2},gM);await sc.sleep(900);api.solved()}else{const m=k==='inner'?'The dark inner zone is the coolest, because it has the least oxygen.':'The yellow zone is warm, but not the hottest. The outer edge touches the most oxygen.';L.snd.no&&L.snd.no();sc.say(m,'warn');api.nope(m)}busy=false;return}
  if(kind==='spoon'){const sp=E('ellipse',{cx:zx,cy:zy-10,rx:16,ry:10,fill:'#cfd6e0',stroke:'#5a6a85','stroke-width':2.5},gM);await sc.sleep(500);if(k==='mid'){for(let i=0;i<8;i++)E('circle',{cx:zx-10+i*3,cy:zy-8+(i%3)*3,r:2.6,fill:'#222'},gM);sc.say('Black soot on the spoon! The yellow zone burns incompletely.','ok')}else if(k==='outer')sc.say('The spoon stays clean. Complete burning leaves no soot.','ok');else sc.say('Inside the dark zone there is hardly any burning at all.','');await sc.sleep(1100);gM.innerHTML='';busy=false;return}
  const tb=E('g',{},gM);E('rect',{x:zx-4,y:zy-60,width:8,height:62,rx:4,fill:'#fff',stroke:'#5a6a85','stroke-width':2.5},tb);E('circle',{cx:zx,cy:zy+4,r:7,fill:'#e5484d',stroke:'#5a6a85','stroke-width':2},tb);
  const bx=P?zx:zx+10;T(gM,bx+(P?0:50),zy-70,Z[k][1]+' °C',{'font-size':16,'font-weight':900,fill:'#b0281d',class:''});L.snd.tick&&L.snd.tick();sc.say(Z[k][0]+': '+Z[k][1]+' °C. '+Z[k][2],'ok');seen.add(k);await sc.sleep(1100);
  if(!chal&&seen.size===3){api.award('did');api.ready()}busy=false};
 sc.drag=(g,hx,hy,kind)=>{let d=null;g.style.cursor='grab';g.style.touchAction='none';
  g.addEventListener('pointerdown',e=>{if(busy)return;e.preventDefault();g.setPointerCapture(e.pointerId);const p=pt(e);d={ox:p.x-hx,oy:p.y-hy,moved:false};});
  g.addEventListener('pointermove',e=>{if(!d)return;const p=pt(e);d.moved=true;g.setAttribute('transform',`translate(${p.x-d.ox-hx},${p.y-d.oy-hy})`)});
  const end=e=>{if(!d)return;const p=pt(e);const mv=d.moved;d=null;g.setAttribute('transform','translate(0,0)');if(!mv)return;const k=zoneAt({x:p.x,y:p.y});if(k)sc.probe(kind,k);else sc.say('Drop it right inside the flame.','warn')};
  g.addEventListener('pointerup',end);g.addEventListener('pointercancel',end)};
 const items=chal?[['gold',P?60:90,'Gold crucible',g=>{E('path',{d:'M-16 -8 H16 L10 14 H-10 Z',fill:'#bfc6d0',stroke:'#5a6a85','stroke-width':3},g);E('ellipse',{cx:0,cy:-8,rx:16,ry:4,fill:'#f2c200'},g)}]]:[['therm',P?60:90,'Thermometer',g=>{E('rect',{x:-4,y:-22,width:8,height:36,rx:4,fill:'#fff',stroke:'#5a6a85','stroke-width':2.5},g);E('circle',{cx:0,cy:16,r:7,fill:'#e5484d',stroke:'#5a6a85','stroke-width':2},g)}],['spoon',P?190:200,'Spoon',g=>{E('ellipse',{cx:0,cy:8,rx:13,ry:9,fill:'#cfd6e0',stroke:'#5a6a85','stroke-width':2.5},g);E('rect',{x:-3,y:-22,width:6,height:26,fill:'#8a97a8'},g)}]];
 items.forEach(it=>{const hy=P?490:360;const gg=E('g',{},sc.gMain);const inner=E('g',{transform:`translate(${it[1]},${hy})`},gg);it[3](inner);const tag=T(inner,0,40,it[2],{'font-size':13,class:'lktag'});
  // draggable wrapper moves whole inner group
  sc.drag(gg,0,0,it[0])});
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px">${chal?'<b>A goldsmith melts gold.</b> Drag the gold crucible into the zone where it should go.':'<b>Drag the thermometer into each zone</b> of the flame. The spoon shows soot.'}</p>${chal?'':'<div class="row" style="flex-wrap:wrap"><button data-z="inner">Inner zone</button><button data-z="mid">Middle zone</button><button data-z="outer">Outer zone</button></div><p class="lockhint" style="margin:6px 0 0;text-align:left">Measure all 3 zones to unlock the next step.</p>'}${chal?'<div class="row" style="flex-wrap:wrap"><button data-z="inner">Inner</button><button data-z="mid">Middle</button><button data-z="outer">Outer</button></div>':''}`;
 api.ctrl.querySelectorAll('[data-z]').forEach(b=>b.onclick=()=>sc.probe(chal?'gold':'therm',b.dataset.z));
 sc.say(chal?'Which zone is hot enough to melt gold?':'A candle flame has three zones. Which is hottest?')},
demo:[[S=>S.probe('therm','inner'),'The dark inner zone reads about 400 °C. Coolest.',900],[S=>S.probe('therm','mid'),'The yellow middle zone reads about 900 °C.',900],[S=>S.probe('spoon','mid'),'A spoon here gets black soot. Burning is incomplete.',900],[S=>S.probe('therm','outer'),'The blue outer zone reads about 1400 °C. Hottest!',900]],
why:['A candle flame has <b>three zones</b>. The <b>inner dark zone</b> is unburnt wax vapour and is the coolest.','The <b>middle yellow zone</b> burns partly. Tiny hot soot particles glow yellow.','The <b>outer blue zone</b> gets the most oxygen, burns completely, and is the <b>hottest</b>.','Complete burning gives more heat and no soot. Incomplete burning gives soot and less heat.'],
check:[{q:'Which zone of a flame is the hottest?',options:['Inner dark','Middle yellow','Outer blue','They are the same'],answer:2,why:'The outer zone meets the most oxygen, so it burns completely.',hint:'Look at your thermometer readings.'},
 {q:'Why is the inner zone cooler?',options:['It has little oxygen','It is made of ice','It is far from the wick','It has no wax'],answer:0,why:'Little oxygen reaches the centre, so little burning happens.',hint:'Fire needs oxygen.'},
 {q:'Soot comes from…',options:['Complete burning','Incomplete burning','No burning','Water vapour'],answer:1,why:'When there is not enough oxygen the fuel burns partly and leaves soot.',hint:'The yellow zone makes soot.'}],
challenge:{text:'A goldsmith wants to melt gold <b>fastest</b>. Click the zone of the flame where the gold should be held.',win:'Goldsmiths use the outermost zone, the hottest part.'},
real:['A gas stove flame is blue because the gas burns completely.','Yellow flames and black soot on a vessel mean incomplete burning.','Goldsmiths use the outer zone of the flame, with a blowpipe, to melt metals.'],
words:{Zone:'A part of the flame.','Complete combustion':'Burning with plenty of oxygen.','Incomplete combustion':'Burning with too little oxygen.',Soot:'Fine black carbon particles.'}
});
