QLab.register({
id:'c8_dissolve',code:'8-C2',title:'Dissolve and saturate',grade:8,subject:'Chemistry',emoji:'🥄',
hook:{title:'Can a glass of water hold unlimited sugar or salt?',text:'Stir spoon after spoon into water. At some point the solid stops disappearing. Find out when, and how heat changes it.'},
prior:'Know that sugar disappears when you stir it into tea.',
guess:{q:'You keep adding a white salt to 100 mL of water. What happens?',options:['It always dissolves, no matter how much','It dissolves up to a limit, then the rest sinks','Nothing dissolves','It turns into water'],answer:1,hint:'A glass can only hold so much, like a bag can only hold so many books.',after:'Add spoonfuls and watch the bottom of the beaker.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A beaker of 100 mL water with a salt spoon, burner, ice and thermometer'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const LIM={20:32,30:46,40:64,50:85,60:110,70:138,80:169};
 const mx=P?150:260,my=P?330:340,bw=P?150:170,bh=P?190:200;
 const jar=sc.vessel({x:mx,y:my,type:'beaker',w:bw,h:bh,level:.6,label:'100 mL water'});
 const gD=E('g',{},sc.gMain),gC=E('g',{},sc.gMain);
 const x0=mx-bw/2+10,x1=mx+bw/2-10,yTop=my-bh*.6+12,yBot=my-26;
 let Tm=20,added=0,warmed=false,tried=new Set(),busy=false;let dots=[];
 const thx=P?330:mx+bw/2+60,thy=my-bh+10,thh=bh-30;
 E('rect',{x:thx-7,y:thy,width:14,height:thh,rx:7,fill:'#fff',stroke:'#5a6a85','stroke-width':3},sc.gMain);E('circle',{cx:thx,cy:thy+thh+4,r:12,fill:'#e5484d',stroke:'#5a6a85','stroke-width':3},sc.gMain);
 const merc=E('rect',{x:thx-4,y:thy,width:8,height:thh,rx:4,fill:'#e5484d'},sc.gMain);const tval=T(sc.gMain,thx,thy-8,'',{'font-size':15,'font-weight':900,fill:'#2b2350',class:''});
 const gT=E('g',{},sc.gMain);const rx=P?W-70:590;
 function draw(){const lim=LIM[Tm],dis=Math.min(added,lim),bot=added-dis;
  const y=thy+thh-(Tm-10)/80*thh;merc.setAttribute('y',y);merc.setAttribute('height',thy+thh-y+4);tval.textContent=Tm+' °C';
  gC.innerHTML='';const nc=Math.min(40,Math.round(bot/2));for(let i=0;i<nc;i++)E('rect',{x:x0+(i*17%(x1-x0-10)),y:yBot+4-Math.floor(i/8)*8,width:9,height:7,fill:'#fff',stroke:'#8aa0c8'},gC);
  const nd=Math.min(46,Math.round(dis/3));while(dots.length<nd){const c=E('circle',{r:3,fill:'#7a5cf0',opacity:.85},gD),o={c,x:x0+Math.random()*(x1-x0),y:yTop+Math.random()*(yBot-yTop-14),vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.8};dots.push(o)}
  while(dots.length>nd)dots.pop().c.remove();
  gT.innerHTML='';T(gT,P?mx+4:rx,P?my+50:130,`Limit at ${Tm} °C: ${lim} g`,{'font-size':P?13:15,'font-weight':900,fill:'#4b3fd1',class:''});
  T(gT,P?mx+4:rx,P?my+68:154,`Added ${added} g · dissolved ${dis} g · on bottom ${bot} g`,{'font-size':P?11:12,fill:'#2b2350',class:'lkhint'});
  return {lim,dis,bot}}
 function say(){const {bot}=draw();sc.say(bot>0?'Saturated! No more can dissolve. The extra sinks.':added===0?'Clear water.':'Unsaturated: it can still dissolve more.')}
 let raf=0;(function tick(){if(!stage.isConnected)return;dots.forEach(o=>{o.x+=o.vx;o.y+=o.vy;if(o.x<x0||o.x>x1)o.vx*=-1;if(o.y<yTop||o.y>yBot-12)o.vy*=-1;o.c.setAttribute('cx',o.x);o.c.setAttribute('cy',o.y)});raf=requestAnimationFrame(tick)})();
 sc.add=async()=>{if(busy||added>=300)return;busy=true;const sp=E('text',{x:mx,y:my-bh-24,'text-anchor':'middle','font-size':24,style:'transition:all .6s'},gC);sp.textContent='🥄';setTimeout(()=>sp.setAttribute('y',my-bh*.6-4),30);L.snd.drop&&L.snd.drop();await sc.sleep(650);sp.remove();
  added+=10;const r=draw();if(r.bot>0)tried.add(Tm);say();if(r.bot>0&&tried.size===1)api.coach('info','Saturated','Now raise the temperature and watch what happens.');busy=false};
 sc.setT=d=>{if(busy)return;const before=draw();Tm=Math.max(20,Math.min(80,Tm+d));const r=draw();say();if(before.bot>0&&r.bot<before.bot&&added>0){warmed=true;L.snd.ok&&L.snd.ok();api.coach('ok','Look at that!','Warm water holds more. Solid from the bottom dissolved.')}
  if(!chal&&tried.size>=1&&warmed){api.award('did');api.ready()}};
 sc.reset=()=>{if(busy)return;added=0;Tm=20;say()};
 sc.check=()=>{const r=draw();let m=null;if(added!==100)m='You have added '+added+' g. You need exactly 100 g in the water.';else if(r.bot>0)m='Some salt is still on the bottom. Warm the water until it all dissolves.';else if(Tm>60)m='It dissolves, but you used too much heat. Try a lower temperature.';
  if(m){L.snd.no&&L.snd.no();sc.say(m,'warn');api.nope(m)}else{L.snd.ok&&L.snd.ok();sc.say('100 g dissolved at '+Tm+' °C. Nothing on the bottom.','ok');api.solved()}};
 sc.tool({x:P?50:470,y:P?492:372,label:'Salt +10 g',ly:34,scale:1,draw:g=>{E('path',{d:'M-14 0 Q-14 -16 0 -16 Q14 -16 14 0 Z',fill:'#f4efe0',stroke:'#8a6a2a','stroke-width':2.5},g);E('rect',{x:-3,y:-2,width:6,height:22,fill:'#8a6a2a'},g)},use:()=>sc.add()});
 sc.tool({x:P?150:570,y:P?492:372,label:'Burner +10°',ly:34,scale:1,draw:g=>{E('rect',{x:-18,y:2,width:36,height:12,rx:3,fill:'#8a96a8',stroke:'#4a5568','stroke-width':2},g);const f=E('text',{x:0,y:0,'text-anchor':'middle','font-size':26},g);f.textContent='🔥'},use:()=>sc.setT(10)});
 sc.tool({x:P?250:670,y:P?492:372,label:'Ice −10°',ly:34,scale:1,draw:g=>{E('rect',{x:-14,y:-12,width:28,height:26,rx:5,fill:'#dff3ff',stroke:'#5aa6d8','stroke-width':3},g)},use:()=>sc.setT(-10)});
 if(chal)sc.tool({x:P?350:370,y:P?492:372,label:'Check',ly:34,scale:1,draw:g=>{E('rect',{x:-13,y:-16,width:26,height:32,rx:4,fill:'#fff',stroke:'#5a6a85','stroke-width':2.5},g);T(g,0,6,'✔',{'font-size':18,fill:'#2e9d5b',class:''})},use:()=>sc.check()});
 draw();say();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px">${chal?'<b>Dissolve exactly 100 g with nothing left on the bottom, at the lowest temperature you can (60 °C or less).</b> Then press Check.':'<b>Drag the salt spoon into the beaker</b> until it is saturated, then <b>warm it</b> with the burner.'}</p><div class="row" style="flex-wrap:wrap"><button class="pri" id="ad">🥄 Salt +10 g</button><button id="hb">🔥 +10 °C</button><button id="ib">🧊 −10 °C</button><button id="rs">↺ Start again</button>${chal?'<button class="pri" id="ck">✔ Check</button>':''}</div>${chal?'':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Make it saturated, then warm it so the solid dissolves.</p>'}`;
 const q=s=>api.ctrl.querySelector(s);q('#ad').onclick=()=>sc.add();q('#hb').onclick=()=>sc.setT(10);q('#ib').onclick=()=>sc.setT(-10);q('#rs').onclick=()=>sc.reset();if(chal)q('#ck').onclick=()=>sc.check()},
demo:[[S=>{S.add()},'Add a spoon of salt. It dissolves.',900],[S=>{S.add()},'Keep adding.',700],[S=>{S.add()},'And again.',700],[S=>{S.add()},'Soon it cannot dissolve any more. It is saturated. Salt sinks.',900],[S=>S.setT(10),'Now warm the water. The solid on the bottom starts to dissolve.',900],[S=>S.setT(10),'Warm water holds more.',900]],
why:['A <span class="word">solution</span> is a solute (what dissolves) mixed into a solvent (what does the dissolving). Here the salt is the solute and the water is the solvent.','Water can hold only a certain amount of solute at one temperature. When it is full, the solution is <b>saturated</b>.','Extra solid just sinks to the bottom. It is not lost. It is simply not dissolved.','For most solids, <b>hotter water dissolves more</b>. That is why sugar goes into hot tea faster and in larger amounts.'],
check:[{q:'The water holds as much salt as it can, and the rest sinks. The solution is…',options:['Unsaturated','Saturated','Empty','Pure water'],answer:1,why:'Saturated means no more solute can dissolve at that temperature.',hint:'Look at the message below the beaker.'},
 {q:'You warm a saturated solution that has solid on the bottom. What happens?',options:['More solid appears','Some or all of the solid dissolves','Nothing changes','The water disappears'],answer:1,why:'Hot water can hold more of most solids.',hint:'You did this in the experiment.'},
 {q:'In salt water, which one is the solvent?',options:['Salt','Water','Both','Neither'],answer:1,why:'The solvent does the dissolving. Water is the solvent.',hint:'The solvent is usually the larger part.'}],
challenge:{text:'Dissolve exactly <b>100 g</b> of the salt in 100 mL of water, with <b>nothing left on the bottom</b>, using the <b>lowest temperature</b> possible (60 °C or less).',win:'Well done. At 60 °C the water can hold 110 g, so 100 g just fits.'},
real:['Sugar dissolves better in hot tea than in cold lemonade.','Sea water is a solution. Salt farms dry it to get salt.','Fish need oxygen dissolved in water. Warm water holds less dissolved oxygen.'],
words:{Solute:'What dissolves.',Solvent:'What does the dissolving, like water.',Solution:'A solute fully mixed in a solvent.',Saturated:'Holding as much solute as possible.'}
});
