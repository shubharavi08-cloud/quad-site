QLab.register({
id:'c8_sortchange',code:'8-C5',title:'Physical or chemical change? Sort them',grade:8,subject:'Chemistry',emoji:'🔀',
hook:{title:'Melting ice and burning paper are both changes. Are they the same kind?',text:'Some changes can be undone and make nothing new. Others make a brand new substance. Sort the changes.'},
prior:'Know that ice melts and paper burns.',
guess:{q:'Which change makes a NEW substance?',options:['Ice melting','Sugar dissolving','Paper burning','Cutting paper'],answer:2,hint:'Can you get the paper back from the ash?',after:'Sort them yourself.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A card showing a change, to drag into a physical or a chemical bin'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const A=[['Ice melting into water','P','Same substance (water), just a different state.','🧊','💧'],['Paper burning to ash','C','New substances (ash, gases) are made and it cannot be reversed.','📄','🔥'],['An iron nail rusting','C','Rust is a new substance.','🔩','🟤'],['Sugar dissolving in water','P','Sugar is still sugar. Evaporate the water to get it back.','🍬','☕'],['Cooking an egg','C','The egg proteins change. It cannot become raw again.','🥚','🍳'],['Milk turning sour','C','New substances (acids) are made.','🥛','🤢'],['Cutting paper into pieces','P','Only the shape and size changed.','📄','✂️'],['Baking a cake','C','The batter changes into something new. It cannot go back.','🥣','🎂']];
 const B=[['Boiling water into steam','P','Steam is still water.','💧','☁️'],['Lighting a matchstick','C','Burning makes new substances.','🪵','🔥'],['Crushing chalk to powder','P','Smaller pieces of the same chalk.','🧱','⚪'],['Digesting food in the stomach','C','Food is broken down into new substances.','🍚','🧪']];
 const LST=chal?B:A;let i=0,ok=0,wrong=0,busy=false;
 const cw=P?240:300,chh=P?150:140,cx=W/2,cy=P?190:150;
 const binW=P?170:230,binH=P?100:90,by=H-binH-(P?24:20),bxP=W*.27,bxC=W*.73;
 [['P','Physical change','📦',bxP,'#e3f4ff','#2aa5d8','no new substance'],['C','Chemical change','🧪',bxC,'#ffe9d6','#f08a3c','new substance made']].forEach(([k,n,em,x,f,st,sub])=>{E('rect',{x:x-binW/2,y:by,width:binW,height:binH,rx:16,fill:f,stroke:st,'stroke-width':3,'stroke-dasharray':'8 5'},sc.gMain);T(sc.gMain,x,by+34,em,{'font-size':28,class:''});T(sc.gMain,x,by+binH-26,n,{'font-size':P?14:16,'font-weight':800,fill:'#2b2350',class:''});T(sc.gMain,x,by+binH-10,sub,{'font-size':10})});
 const gC=E('g',{},sc.gMain),gM=E('g',{},sc.gMain);
 const pt=e=>{const m=sc.svg.getScreenCTM().inverse(),p=sc.svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(m)};
 function status(){gM.innerHTML='';T(gM,W/2,P?H-8:H-4,`✅ ${ok} right · ❌ ${wrong} tries · ${Math.min(i+1,LST.length)} of ${LST.length}`,{'font-size':11,'font-weight':800,fill:'#2b2350',class:''})}
 function show(){gC.innerHTML='';status();if(i>=LST.length){T(gC,cx,cy,'All sorted!',{'font-size':26,'font-weight':800,fill:'#2e9d5b',class:''});return}
  const c=LST[i];const card=E('g',{transform:`translate(${cx},${cy})`,style:'cursor:grab;touch-action:none'},gC);E('rect',{x:-cw/2,y:-chh/2,width:cw,height:chh,rx:16,fill:'#fff',stroke:'#cdb8ff','stroke-width':3},card);
  T(card,-50,8,c[3],{'font-size':46,class:''});T(card,0,8,'➜',{'font-size':22,class:''});T(card,50,8,c[4],{'font-size':46,class:''});T(card,0,-chh/2+26,c[0],{'font-size':P?14:16,'font-weight':800,fill:'#2b2350',class:''});T(card,0,chh/2-14,'Is a NEW substance made?',{'font-size':11});
  let d=null;card.addEventListener('pointerdown',e=>{if(busy)return;card.setPointerCapture(e.pointerId);const p=pt(e);d={dx:p.x-cx,dy:p.y-cy}});
  card.addEventListener('pointermove',e=>{if(!d)return;const p=pt(e);card.setAttribute('transform',`translate(${p.x-d.dx},${p.y-d.dy})`)});
  const end=e=>{if(!d)return;const p=pt(e);d=null;const k=p.y>by-10?(p.x<W/2?'P':'C'):null;if(k)sc.sort(k);else card.setAttribute('transform',`translate(${cx},${cy})`)};card.addEventListener('pointerup',end);card.addEventListener('pointercancel',end)}
 sc.sort=k=>{if(busy||i>=LST.length)return;const t=LST[i];
  if(t[1]===k){busy=true;ok++;L.snd.ok&&L.snd.ok();sc.say('✅ Right! '+t[2],'ok');i++;setTimeout(()=>{show();busy=false;if(i>=LST.length){if(chal)api.solved();else{api.award('did');api.ready()}}},500)}
  else{wrong++;L.snd.no&&L.snd.no();sc.say('❌ Not quite. Ask: is a new substance made? Try again.','warn');show()}};
 show();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>Drag each card into the right bin</b>, or tap a button.</p><div class="row"><button class="pri" id="p">📦 Physical</button><button class="pri" id="c">🧪 Chemical</button></div>${chal?'':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Sort all 8 changes to unlock the next step.</p>'}`;
 api.ctrl.querySelector('#p').onclick=()=>sc.sort('P');api.ctrl.querySelector('#c').onclick=()=>sc.sort('C');
 sc.say('Does a new substance form? Drag the card into a bin.')},
demo:[[S=>S.sort('P'),'Ice melting: still water. Physical change.',900],[S=>S.sort('C'),'Paper burning: ash and gases are new. Chemical change.',900],[S=>S.sort('C'),'Rusting makes new rust. Chemical.',900]],
why:['In a <span class="word">physical change</span> no new substance is made. Only shape, size or state changes. Many can be reversed.','In a <span class="word">chemical change</span> one or more <b>new substances</b> are made. It is usually hard or impossible to reverse.','Clues for a chemical change: a new colour, gas bubbles, light or heat given out, a new smell, or a solid forming.','Ask yourself: <i>is it still the same stuff?</i> If yes, it is physical.'],
check:[{q:'Which is a chemical change?',options:['Folding paper','Melting wax','Rusting of iron','Boiling water'],answer:2,why:'Rust is a new substance.',hint:'Which one makes something new?'},
 {q:'Dissolving sugar in water is…',options:['A chemical change','A physical change','Burning','Rusting'],answer:1,why:'The sugar is still there. You can evaporate the water to get it back.',hint:'Can you taste the sugar?'},
 {q:'Which is a clue that a chemical change has happened?',options:['Same shape','Gas bubbles and a new smell','Smaller pieces','Colder water'],answer:1,why:'Gas, colour change, light, heat and new smells are chemical clues.',hint:'Think of milk turning sour.'}],
challenge:{text:'Four tricky changes. Sort them all <b>correctly</b>.',win:'You sorted them like a chemist.'},
real:['Cooking changes food chemically, so you cannot uncook it.','Freezing water for ice is physical. You can melt it again.','Burning fuel in a vehicle is chemical. It makes new gases.'],
words:{'Physical change':'No new substance is made.','Chemical change':'A new substance is made.',Reversible:'Can be changed back.',Substance:'A kind of matter, like water or sugar.'}
});
