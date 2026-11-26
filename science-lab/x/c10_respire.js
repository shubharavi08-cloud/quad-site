QLab.register({
id:'c10_respire',code:'10-B5',title:'Respiration: yeast breathes out carbon dioxide',grade:10,subject:'Biology',emoji:'🎈',
hook:{title:'Bakers add yeast to dough and it rises. Why?',text:'Yeast is a tiny living fungus. It respires without oxygen (anaerobic respiration) and gives off a gas. A balloon on the flask catches it.'},
prior:'You know that living things need food and that respiration releases energy from food.',
guess:{q:'Yeast is mixed with sugar and warm water in a flask with a balloon on top. What will the balloon do?',options:['Stay flat','Inflate','Shrink','Burst at once'],answer:1,hint:'Yeast eats the sugar and gives off a gas.',after:'Try different mixtures.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A flask with a balloon on top. Sugar, yeast and warm or cold water are dragged in. A limewater cup tests the gas.'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const fx=P?200:330,fy=P?430:330,fh=P?150:160,fw=P?130:150;
 let st={sugar:false,yeast:false,water:null},size=0,busy=false,tested=new Set(),lime=false,gas=false;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const fk=sc.vessel({x:fx,y:fy,type:'flask',w:fw,h:fh,level:.0,color:'#fff4cf',label:''});
 const gB=E('g',{},sc.gMain),gI=E('g',{},sc.gMain);
 function balloon(){gB.innerHTML='';const ry=14+size*26,rx=11+size*22,cy=fy-fh-6-ry,ny=fy-fh;
  E('rect',{x:fx-10,y:ny-12,width:20,height:14,rx:3,fill:'#e5534b'},gB);E('ellipse',{cx:fx,cy:cy,rx:rx,ry:ry,fill:'#ff7a9a',stroke:'#b02050','stroke-width':3,opacity:.95},gB);E('ellipse',{cx:fx-rx*.35,cy:cy-ry*.35,rx:rx*.18,ry:ry*.25,fill:'#fff',opacity:.5},gB)}
 function info(){gI.innerHTML='';const x0=P?20:50,y0=P?100:110;
  const items=[['Sugar',st.sugar],['Yeast',st.yeast],['Water',st.water||false]];
  items.forEach((it,i)=>{T(gI,x0+(P?i*128:0)+(P?60:0),P?114:y0+i*28,(it[1]?'✅ ':'⬜ ')+it[0]+(it[0]==='Water'&&st.water?': '+st.water:''),{'font-size':P?13:15,'font-weight':900,fill:it[1]?'#237a47':'#55688a','text-anchor':P?'middle':'start',class:''})});
  // limewater cup
  const lx=P?340:600,ly=P?330:300;E('path',{d:`M${lx-34} ${ly-70} L${lx-30} ${ly} H${lx+30} L${lx+34} ${ly-70}Z`,fill:lime?'#f0f0e8':'#e8f6ff',stroke:'#4a6a80','stroke-width':3,opacity:.95},gI);T(gI,lx,ly+20,'Limewater',{'font-size':13,'font-weight':900,class:''});
  const c=api.ctrl.querySelector('#fl');if(c){const t=[['ok','Yeast + sugar + warm: inflates'],['cold','Cold water: slow'],['nos','No sugar: nothing'],['noy','No yeast: nothing']];c.innerHTML=t.map(x=>`<span style="display:inline-block;margin:2px 8px 2px 0;font-size:13px">${tested.has(x[0])?'✅':'⬜'} ${x[1]}</span>`).join('')}}
 const redraw=()=>{fk.setColor&&fk.setColor(st.yeast&&st.sugar?'#f1d9a0':st.sugar||st.yeast?'#f9ecc4':'#e8f6ff');fk.setLevel&&fk.setLevel(st.water?(st.sugar||st.yeast?.55:.5):0);balloon();info()};
 sc.add=k=>{if(busy)return;L.snd.drop&&L.snd.drop();if(k==='sugar')st.sugar=true;else if(k==='yeast')st.yeast=true;else{st.water=k}size=0;gas=false;lime=false;redraw();sc.say({sugar:'Sugar is the food for the yeast.',yeast:'Yeast cells added: living fungus.',warm:'Warm water (about 35 °C).',cold:'Cold water (about 5 °C).'}[k])};
 sc.empty=()=>{if(busy)return;st={sugar:false,yeast:false,water:null};size=0;gas=false;lime=false;redraw();sc.say('Flask emptied.')};
 sc.run=async()=>{if(busy)return;if(!st.water){sc.say('Add water first, so the yeast can wake up.','warn');return}busy=true;const rate=st.sugar&&st.yeast?(st.water==='warm'?1:.22):0;sc.say('Waiting 30 minutes…');
  for(let i=0;i<10;i++){size=Math.min(1,size+rate/10);if(rate)fk.bubbles&&fk.bubbles(500,8,'#fff');balloon();await sc.sleep(300)}
  gas=rate>0;busy=false;sc.say(rate===0?(!st.sugar?'No sugar: the yeast has no food. Balloon flat.':'No yeast: nothing alive to respire. Balloon flat.'):(rate>.5?'The balloon inflated! The yeast respired the sugar and gave out CO₂.':'Only a little: cold slows the yeast down.'),rate>0?'ok':'warn');
  const k=rate>.5?'ok':rate>0?'cold':!st.sugar?'nos':'noy';if(!chal){tested.add(k);info();if(tested.size===4){api.award('did');api.ready()}}
  else if(rate>.5&&size>=.99)api.solved();else if(chal)api.nope('The balloon stayed small or flat. Yeast needs food (sugar), itself, and warmth to respire fast.')};
 sc.lime=()=>{if(busy)return;if(gas){lime=true;L.snd.ok&&L.snd.ok();info();sc.say('Limewater turns milky: the gas is carbon dioxide.','ok')}else sc.say('No gas was made, so limewater stays clear.','warn')};
 const tl=[['sugar','Sugar','🍬'],['yeast','Yeast','🟤'],['warm','Warm water','♨️'],['cold','Cold water','🧊']];
 tl.forEach((t,i)=>sc.tool({x:P?44+i*100:W*.14+i*W*.16,y:P?492:384,label:t[1],ly:P?32:34,scale:P?.75:.9,draw:g=>T(g,0,10,t[2],{'font-size':28,class:''}),use:()=>sc.add(t[0])}));
 api.ctrl.innerHTML=(chal?'<p style="margin:0 0 6px;font-size:14px"><b>Fully inflate the balloon.</b> Choose what goes in the flask, then start.</p>':'<p style="margin:0 0 4px;font-size:14px"><b>Drag ingredients</b> into the flask, then start. Try the four cases.</p>')+'<div class="row"><button class="pri" id="go2">▶ Start (30 min)</button><button id="lw">🧪 Limewater test</button><button id="em">Empty flask</button></div>'+(chal?'':'<div id="fl"></div>');
 api.ctrl.querySelector('#go2').onclick=()=>sc.run();api.ctrl.querySelector('#lw').onclick=()=>sc.lime();api.ctrl.querySelector('#em').onclick=()=>sc.empty();
 redraw();sc.say(chal?'Yeast needs three things.':'Drag sugar, yeast and warm water into the flask.')},
demo:[[S=>S.add('sugar'),'Sugar for food.',700],[S=>S.add('yeast'),'Add yeast.',700],[S=>S.add('warm'),'Warm water.',700],[S=>S.run(),'Start: the balloon inflates.',3600],[S=>S.lime(),'Limewater turns milky: CO₂.',1100]],
why:['<span class="word">Respiration</span> releases energy from food inside living cells. Yeast does it <b>without oxygen</b>: this is <span class="word">anaerobic respiration</span> (fermentation).','Yeast: glucose → ethanol + carbon dioxide + a little energy.','The CO₂ inflates the balloon and turns limewater milky. Warmth speeds up the enzymes; cold slows them.','In bread, the CO₂ bubbles make dough rise. In people, aerobic respiration uses oxygen: glucose + O₂ → CO₂ + water + lots of energy.'],
check:[{q:'The gas that inflates the balloon is…',options:['oxygen','carbon dioxide','hydrogen','nitrogen'],answer:1,why:'It turns limewater milky: CO₂.',hint:'Limewater test.'},
 {q:'Why did the cold flask inflate slowly?',options:['Cold makes more gas','Enzymes work slowly in the cold','Cold water is heavy','Yeast died at once'],answer:1,why:'Low temperature slows the chemical reactions.',hint:'Think enzymes.'},
 {q:'Yeast respiring without oxygen is called…',options:['Aerobic respiration','Anaerobic respiration (fermentation)','Photosynthesis','Digestion'],answer:1,why:'No oxygen is needed.',hint:'An- means without.'}],
challenge:{text:'Make the balloon <b>fully inflate</b>. Choose the ingredients wisely.',win:'Sugar, yeast and warm water give fast respiration and a full balloon.'},
real:['Bread, idli and dosa batter rise because of fermenting microbes.','Brewing and making curd also use microbial respiration.','Our muscles use anaerobic respiration in a sprint, making lactic acid.'],
words:{Respiration:'Releasing energy from food in cells.',Fermentation:'Anaerobic respiration by yeast: sugar → alcohol + CO₂.',Anaerobic:'Without oxygen.',Limewater:'A clear liquid that turns milky with CO₂.'}
});
