QLab.register({
id:'c10_series',code:'10-C3',title:'Build the reactivity series',grade:10,subject:'Chemistry',emoji:'📶',
hook:{title:'Can you rank metals just from the evidence?',text:'Read the evidence card for each metal, then put them in order from most to least reactive.'},
prior:'You tested metals in air, water, acid and salt solutions.',
guess:{q:'Which is the most reactive: gold, iron or potassium?',options:['Gold','Iron','Potassium','All the same'],answer:2,hint:'It reacts violently with cold water.',after:'Build the series.'},
build(api){
 const L=QLab.lab,Ek=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'Metal cards to drag into the reactivity ladder, most reactive at the top'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const ED={Potassium:'Reacts violently with cold water, bursts into flame.',Sodium:'Reacts vigorously with cold water. Stored under oil.',Calcium:'Reacts steadily with cold water.',Magnesium:'Burns brightly in air. Reacts slowly with hot water.',Zinc:'Reacts with dilute acid. Not with cold water.',Iron:'Reacts slowly with dilute acid. Rusts.',Copper:'No reaction with dilute acid. Displaced by zinc and iron.',Silver:'No reaction with acid. Displaced by copper.',Gold:'No reaction with air, water or acid.'};
 const want=chal?['Zinc','Hydrogen','Copper']:['Potassium','Sodium','Magnesium','Zinc','Iron','Copper','Gold'];
 const ref=chal?{Zinc:'Zinc reacts with acid, giving H₂, so it is above hydrogen.',Hydrogen:'Acid contains H⁺ ions. Metals that displace H₂ are above it.',Copper:'Copper does not displace H₂ from acid, so it is below hydrogen.'}:ED;
 const N=want.length,order=[...want].reverse();const slot=Array(N).fill(null);
 const sw=P?150:200,sh=P?36:34,sx=P?20:40,sy0=P?116:94,gap=sh+4;
 const T=(p,x,y,t,o)=>{const e=Ek('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const gS=Ek('g',{},sc.gMain),gC=Ek('g',{},sc.gMain);
 const COL={Potassium:'#d9c8ff',Sodium:'#ffd9c8',Calcium:'#e0e0e0',Magnesium:'#d6d6d6',Zinc:'#c3cde0',Iron:'#a9a9b5',Copper:'#e0985a',Silver:'#eef0f4',Gold:'#f5cf55',Hydrogen:'#bfe3ff'};
 const pos=k=>{const i=order.indexOf(k),per=P?4:7,r=Math.floor(i/per),c=i%per,cw=P?92:96;return {x:(P?18:W*.52)+(P?c*cw:c*0)+(P?0:0),y:0,i,r,c,cw}};
 const cardPos=k=>{const i=order.indexOf(k);if(P){const per=4,r=Math.floor(i/per),c=i%per;return{x:12+c*98,y:H-(chal?90:150)+r*46}}else{const cols=chal?3:2,r=Math.floor(i/cols),c=i%cols;return{x:W*.56+c*130,y:110+r*52}}};
 function render(){gS.innerHTML='';gC.innerHTML='';
  for(let i=0;i<N;i++){const y=sy0+i*gap;Ek('rect',{x:sx,y,width:sw,height:sh,rx:8,fill:'#f1f5ff',stroke:'#8aa0c8','stroke-dasharray':'5 4'},gS);T(gS,sx+14,y+sh/2+5,(i+1)+'',{'font-size':13,'font-weight':900,fill:'#8aa0c8',class:''});if(i===0)T(gS,sx+sw/2,y-6,'MOST reactive ▼',{'font-size':10,class:'lkhint'});if(i===N-1)T(gS,sx+sw/2,y+sh+14,'LEAST reactive',{'font-size':10})}
  want.forEach(k=>{const si=slot.indexOf(k);let x,y;if(si>=0){x=sx+6;y=sy0+si*gap+3}else{const c=cardPos(k);x=c.x;y=c.y}
   const cw=P?90:120,ch=P?34:40;const g=Ek('g',{transform:`translate(${x},${y})`,style:'cursor:grab;touch-action:none'},gC);
   Ek('rect',{width:si>=0?sw-12:cw,height:si>=0?sh-6:ch,rx:8,fill:COL[k]||'#ddd',stroke:'#2b2350','stroke-width':2},g);T(g,(si>=0?sw-12:cw)/2,(si>=0?sh-6:ch)/2+5,k,{'font-size':P?13:15,'font-weight':800,fill:'#2b2350',class:''});
   let d=null;g.addEventListener('pointerdown',e=>{g.setPointerCapture(e.pointerId);const p=pt(e);d={dx:p.x-x,dy:p.y-y,moved:false};sc.say(ref[k]||'')});
   g.addEventListener('pointermove',e=>{if(!d)return;const p=pt(e);d.moved=true;g.setAttribute('transform',`translate(${p.x-d.dx},${p.y-d.dy})`)});
   const end=e=>{if(!d)return;const p=pt(e),mv=d.moved;d=null;if(!mv){sc.place(k);return}let t=-1;for(let i=0;i<N;i++){const yy=sy0+i*gap;if(p.x>=sx&&p.x<=sx+sw+30&&p.y>=yy-2&&p.y<=yy+gap)t=i}if(t>=0)sc.drop(k,t);else{const si2=slot.indexOf(k);if(si2>=0)slot[si2]=null;render()}};
   g.addEventListener('pointerup',end);g.addEventListener('pointercancel',end)});
  T(gS,P?W/2:W*.76,P?H-8:H-12,chal?'Drag zinc, hydrogen and copper into the ladder':'Drag each metal into the ladder, most reactive on top',{'font-size':P?10:12,'font-weight':800,fill:'#2b2350',class:''})}
 const pt=e=>{const m=sc.svg.getScreenCTM().inverse(),p=sc.svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(m)};
 function check(){if(slot.some(x=>x===null))return;const ok=slot.join()===want.join();
  if(ok){L.snd.ok&&L.snd.ok();sc.say('Correct order!','ok');chal?api.solved():(api.award('did'),api.ready())}
  else{L.snd.no&&L.snd.no();const m='Check the evidence: the most reactive reacts with cold water; the least reactive does not react with acid. Try again.';sc.say(m,'warn');chal?api.nope(m):api.coach('warn','Not quite',m);slot.fill(null);render();upd()}}
 function upd(){if(api.ctrl.querySelector('#od'))api.ctrl.querySelector('#od').textContent=slot.filter(Boolean).join(' > ')}
 sc.drop=(k,i)=>{const o=slot.indexOf(k);if(o>=0)slot[o]=null;if(slot[i])slot[o>=0?o:slot.indexOf(null)]=slot[i];slot[i]=k;if(slot.indexOf(null)>=0&&slot.filter(Boolean).length<N&&false)0;render();upd();check()};
 sc.place=k=>{if(slot.includes(k))return;const i=slot.indexOf(null);if(i<0)return;slot[i]=k;L.snd.pop&&L.snd.pop();render();upd();check()};
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px"><b>${chal?'Hydrogen is not a metal, but acid reactions place it. Put zinc, hydrogen, copper in order of reactivity.':'Drag the metals into the ladder, MOST to LEAST reactive.'}</b> Tap a card to read its evidence.</p><p id="od" style="font-weight:800;margin:0"></p>`;
 render();sc.say('Tap a metal to read how it behaves. Then rank them.')},
demo:[[S=>S.place('Potassium'),'Potassium: bursts into flame in cold water. Top of the ladder.',1000],[S=>S.place('Sodium'),'Sodium is next: vigorous in water.',900],[S=>S.place('Magnesium'),'Magnesium burns brightly in air.',900]],
why:['The <span class="word">reactivity series</span> ranks metals by how readily they react: K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au.','Evidence: reaction with cold water, steam, dilute acid, and displacement of other metals.','Metals <b>above hydrogen</b> displace hydrogen from acids. Those below do not.','The series tells you how to extract a metal: very reactive ones need electrolysis, less reactive ones can be heated with carbon.'],
check:[{q:'Which of these is least reactive?',options:['Zinc','Iron','Copper','Magnesium'],answer:2,why:'Copper is lowest among them.',hint:'It does not react with acid.'},
 {q:'Metals above hydrogen will…',options:['Not react with acid','Displace hydrogen from acid','Be gases','Be non-magnetic'],answer:1,why:'They give off H₂.',hint:'Metal + acid.'},
 {q:'Why is gold found as a pure metal in nature?',options:['It is heavy','It is very unreactive','It is soft','It is yellow'],answer:1,why:'It does not react with air, water or most acids.',hint:'Bottom of the series.'}],
challenge:{text:'Place <b>hydrogen</b> in the series: put zinc, hydrogen and copper in order of reactivity.',win:'Zinc > hydrogen > copper. Metals above hydrogen displace it from acid.'},
real:['Very reactive metals like sodium are extracted by electrolysis.','Iron is extracted by heating its ore with carbon.','Gold and platinum are used in jewellery because they do not react.'],
words:{'Reactivity series':'Metals ranked by reactivity.',Displace:'To push out and replace.',Extraction:'Obtaining a metal from its ore.',Ore:'A rock containing a metal compound.'}
});
