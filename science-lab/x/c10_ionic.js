QLab.register({
id:'c10_ionic',code:'10-C3',title:'Ionic bonds: moving electrons',grade:10,subject:'Chemistry',emoji:'🔗',
hook:{title:'Sodium is a violent metal and chlorine is a poisonous gas. Together they make safe table salt. How?',text:'Atoms can give or take electrons to get full outer shells. Watch the electron move.'},
prior:'You can place electrons in shells (2, 8, 8).',
guess:{q:'When sodium (2,8,1) meets chlorine (2,8,7), what happens?',options:['Both share an electron','Sodium gives its outer electron to chlorine','Chlorine gives an electron to sodium','Nothing'],answer:1,hint:'Sodium has 1 spare electron; chlorine needs 1 more.',after:'Watch the transfer.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'Two atoms drawn with electron shells; drag an outer electron from the metal to the non-metal'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const D={NaCl:{m:'Na',mv:1,n:'Cl',nv:1,mel:[2,8,1],nel:[2,8,7],mc:'+',nc:'−',f:'NaCl'},MgO:{m:'Mg',mv:2,n:'O',nv:2,mel:[2,8,2],nel:[2,6],mc:'2+',nc:'2−',f:'MgO'},CaCl2:{m:'Ca',mv:2,n:'Cl',nv:1,mel:[2,8,8,2],nel:[2,8,7],mc:'2+',nc:'− (two Cl)',f:'CaCl₂'}};
 let k=chal?'MgO':'NaCl',moved=0;const done=new Set();
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const gA=E('g',{},sc.gMain);
 const pt=e=>{const m=sc.svg.getScreenCTM().inverse(),p=sc.svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(m)};
 function q(x){return api.ctrl.querySelector(x)}
 function atom(g,cx,cy,el,sym,extra,col,drag){const r0=P?22:26,dr=P?16:20;el.forEach((c,i)=>{const R=r0+i*dr;E('circle',{cx,cy,r:R,fill:'none',stroke:'#cfdcee','stroke-width':2},g);for(let j=0;j<c;j++){const a=j/c*6.28+i;const ex=cx+R*Math.cos(a),ey=cy+R*Math.sin(a);const out=i===el.length-1;const dot=E('circle',{cx:ex,cy:ey,r:out&&drag?8:6,fill:col,stroke:out&&drag?'#2b2350':'none','stroke-width':2,style:out&&drag?'cursor:grab;touch-action:none':''},g);
   if(out&&drag){let d=false;dot.addEventListener('pointerdown',e=>{dot.setPointerCapture(e.pointerId);d=true});dot.addEventListener('pointermove',e=>{if(!d)return;const p=pt(e);dot.setAttribute('cx',p.x);dot.setAttribute('cy',p.y)});const end=e=>{if(!d)return;d=false;const p=pt(e);if(Math.abs(p.x-ex)<6&&Math.abs(p.y-ey)<6||p.x>W/2-10)sc.move();else draw()};dot.addEventListener('pointerup',end);dot.addEventListener('pointercancel',end)}}});
  T(g,cx,cy+7,sym+extra,{'font-size':P?16:20,'font-weight':900,fill:'#2b2350',class:''})}
 function draw(){gA.innerHTML='';const d=D[k],mel=[...d.mel];mel[mel.length-1]-=moved;const nel=[...d.nel];nel[nel.length-1]+=moved;if(mel[mel.length-1]===0)mel.pop();
  const full=moved>=d.mv,cy=P?290:240,cx1=P?105:W*.25,cx2=P?315:W*.75;
  atom(gA,cx1,cy,mel,d.m,full?d.mc:'','#2aa5d8',!full&&!chal);atom(gA,cx2,cy,nel,d.n,full?'⁻':'','#e5534b',false);
  T(gA,W/2,cy+6,full?'⚡':'→',{'font-size':36,class:''});
  T(gA,W/2,P?96:98,full?d.f+': ionic compound':(chal?'Magnesium (2,8,2) + chlorine (2,8,7)':moved+' of '+d.mv+' electrons moved'),{'font-size':P?14:18,'font-weight':900,fill:'#2b2350',class:''});
  if(q('#st'))q('#st').textContent=full?`${d.m} became ${d.m}${d.mc} (lost ${d.mv}), ${d.n} became ${d.n}⁻. Opposite charges attract: an ionic bond.`:'Drag an outer electron from the metal across to the non-metal.';
  if(full&&!chal){done.add(k);sc.say(`${d.m} gave away ${d.mv}. Opposite charges attract: an ionic bond.`,'ok');if(done.size>=3){api.award('did');api.ready()}}}
 sc.move=()=>{const d=D[k];if(moved>=d.mv)return;moved++;L.snd.pop&&L.snd.pop();draw()};
 sc.pick=x=>{k=x;moved=0;if(q('#pp'))q('#pp').querySelectorAll('button').forEach(b=>b.className=b.dataset.k===x?'pri':'');draw()};
 api.ctrl.innerHTML=chal?`<p style="margin:0 0 6px;font-size:14px"><b>Magnesium (2,8,2) reacts with chlorine (2,8,7). What is the formula?</b></p><div class="row" id="fm" style="flex-wrap:wrap">${['MgCl','MgCl₂','Mg₂Cl','Mg₂Cl₂'].map(x=>`<button data-a="${x}">${x}</button>`).join('')}</div>`:`<p style="margin:0 0 4px;font-size:14px"><b>Pick a compound</b>, then <b>drag an outer electron</b> from the metal to the non-metal.</p><div class="row" id="pp">${Object.keys(D).map(x=>`<button data-k="${x}">${D[x].f}</button>`).join('')}</div><p id="st" style="font-weight:800;margin:4px 0"></p><p class="lockhint" style="margin:0;text-align:left">Complete all 3 to unlock the next step.</p>`;
 if(chal)q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.a==='MgCl₂'){L.snd.ok&&L.snd.ok();api.solved()}else{L.snd.no&&L.snd.no();api.nope('Mg gives 2 electrons, and each Cl takes only 1. So you need two Cl for every Mg.')}});
 else{q('#pp').querySelectorAll('button').forEach(b=>b.onclick=()=>sc.pick(b.dataset.k));q('#pp button').className='pri'}
 draw();sc.say(chal?'Count the electrons Mg gives and each Cl takes.':'Drag the outer electron of the metal across.')},
demo:[[S=>S.move(),'Sodium gives its one outer electron to chlorine.',1000],[S=>S.pick('MgO'),'Now magnesium oxide: magnesium has 2 outer electrons.',900],[S=>{S.move();S.move()},'It gives both to oxygen. Mg²⁺ and O²⁻ attract: MgO.',1100]],
why:['An <span class="word">ionic bond</span> forms when a metal atom <b>gives</b> electrons to a non-metal atom.','The metal becomes a <b>positive ion</b> (Na⁺) and the non-metal a <b>negative ion</b> (Cl⁻). Opposite charges attract strongly.','Both ions end up with a full outer shell, which makes them stable.','Total charge must balance: Mg²⁺ needs two Cl⁻, so the formula is MgCl₂.'],
check:[{q:'Sodium becomes Na⁺ by…',options:['Gaining an electron','Losing an electron','Gaining a proton','Losing a neutron'],answer:1,why:'It loses its outer electron.',hint:'Positive ion.'},
 {q:'What holds Na⁺ and Cl⁻ together?',options:['Shared electrons','Attraction of opposite charges','Gravity','Magnetism'],answer:1,why:'That is the ionic bond.',hint:'Opposite charges.'},
 {q:'Why does calcium chloride have two chlorine atoms?',options:['Ca gives 2 electrons and each Cl takes 1','Cl is bigger','A mistake','Ca takes 2'],answer:0,why:'Charges must balance: Ca²⁺ and 2 Cl⁻.',hint:'Count electrons.'}],
challenge:{text:'Magnesium (2,8,2) reacts with chlorine (2,8,7). What is the <b>formula</b> of the compound?',win:'MgCl₂: one Mg²⁺ and two Cl⁻.'},
real:['Table salt (NaCl) is an ionic compound.','Ionic compounds are hard, brittle and have high melting points.','They conduct electricity when molten or dissolved, not as solids.'],
words:{Ion:'A charged atom.','Ionic bond':'Attraction between positive and negative ions.',Cation:'Positive ion.',Anion:'Negative ion.'}
});
