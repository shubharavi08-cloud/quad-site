QLab.register({
id:'c10_balance',code:'10-C1',title:'Balance the equation',grade:10,subject:'Chemistry',emoji:'⚖️',
hook:{title:'Atoms cannot appear or vanish in a reaction. So the equation must balance.',text:'Change the numbers in front of each formula until both sides have the same atoms.'},
prior:'You know the law of conservation of mass from Grade 9.',
guess:{q:'In H₂ + O₂ → H₂O the left has 2 oxygen atoms and the right has 1. How do we fix it?',options:['Change the small numbers in the formulas','Put a number (coefficient) in front of formulas','Delete an atom','Ignore it'],answer:1,hint:'Never change the small subscripts. They define the substance.',after:'Balance some equations.'},
sols:{eq:[[2,1,2],[2,1,2],[1,3,2]],ch:[[1,2,1,2],[4,3,2]]},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A balance scale with atoms of each element in its two pans'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const EQ=[{r:[['H₂',{H:2}],['O₂',{O:2}]],p:[['H₂O',{H:2,O:1}]]},{r:[['Mg',{Mg:1}],['O₂',{O:2}]],p:[['MgO',{Mg:1,O:1}]]},{r:[['N₂',{N:2}],['H₂',{H:2}]],p:[['NH₃',{N:1,H:3}]]}];
 const CH=[{r:[['CH₄',{C:1,H:4}],['O₂',{O:2}]],p:[['CO₂',{C:1,O:2}],['H₂O',{H:2,O:1}]]},{r:[['Fe',{Fe:1}],['O₂',{O:2}]],p:[['Fe₂O₃',{Fe:2,O:3}]]}];
 const COL={H:'#6ec6ff',O:'#ff7a7a',Mg:'#b9b9c9',N:'#7a8cff',C:'#555',Fe:'#b4562a'};
 const LST=chal?CH:EQ;let k=0,c=[],lock=false;
 const g=E('g',{},sc.gMain);
 const q=s=>api.ctrl.querySelector(s);
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle',class:''},o||{}),p);e.textContent=t;return e};
 function counts(side,off){const t={};side.forEach((s,i)=>{const cc=c[off+i];for(const a in s[1])t[a]=(t[a]||0)+cc*s[1][a]});return t}
 function pan(p,cx,cy,tot){const els=Object.keys(tot);E('path',{d:`M${cx-62} ${cy} Q${cx} ${cy+34} ${cx+62} ${cy}`,fill:'#e8eefc',stroke:'#5a6a85','stroke-width':3},p);
  let n=0;els.forEach(a=>{for(let i=0;i<tot[a];i++){const col=n%6,row=Math.floor(n/6);E('circle',{cx:cx-45+col*18,cy:cy-9-row*17,r:8,fill:COL[a]||'#999',stroke:'#fff','stroke-width':1.5},p);n++}})}
 function draw(){g.innerHTML='';const e=LST[k],lt=counts(e.r,0),rt=counts(e.p,e.r.length),els=[...new Set([...Object.keys(lt),...Object.keys(rt)])];
  const bal=els.every(a=>(lt[a]||0)===(rt[a]||0));const sum=o=>Object.values(o).reduce((x,y)=>x+y,0);const tilt=bal?0:Math.max(-14,Math.min(14,(sum(rt)-sum(lt))*3));
  const bx=W/2,by=P?190:170,arm=P?125:190;
  E('path',{d:`M${bx} ${by} L${bx-22} ${by+90} L${bx+22} ${by+90} Z`,fill:'#9aa8c4',stroke:'#5a6a85','stroke-width':3},g);E('rect',{x:bx-60,y:by+88,width:120,height:12,rx:5,fill:'#7d8bab'},g);
  const bm=E('g',{transform:`rotate(${tilt} ${bx} ${by})`},g);E('rect',{x:bx-arm,y:by-5,width:arm*2,height:10,rx:5,fill:'#7d8bab',stroke:'#5a6a85','stroke-width':2},bm);
  const ang=tilt*Math.PI/180,lx=bx-arm*Math.cos(ang),ly=by-arm*Math.sin(ang),rx=bx+arm*Math.cos(ang),ry=by+arm*Math.sin(ang);
  [[lx,ly,lt],[rx,ry,rt]].forEach(([x,y,t])=>{E('line',{x1:x,y1:y,x2:x,y2:y+44,stroke:'#5a6a85','stroke-width':2},g);pan(g,x,y+60,t)});
  E('circle',{cx:bx,cy:by,r:7,fill:'#fff',stroke:'#5a6a85','stroke-width':3},g);
  const ft=(side,off)=>side.map((s,i)=>`${c[off+i]>1?c[off+i]:''}${s[0]}`).join(' + ');
  T(g,W/2,P?100:98,`${ft(e.r,0)}  →  ${ft(e.p,e.r.length)}`,{'font-size':P?19:24,'font-weight':800,fill:'#2b2350'});
  const ty=P?H-130:H-110;els.forEach((a,i)=>{const ok=(lt[a]||0)===(rt[a]||0),x=W/2-(els.length-1)*(P?44:60)+i*(P?88:120);E('circle',{cx:x,cy:ty,r:9,fill:COL[a]||'#999'},g);T(g,x+12,ty+5,`${a}: ${lt[a]||0} ${ok?'=':'≠'} ${rt[a]||0}`,{'font-size':P?12:14,'font-weight':800,fill:ok?'#2f9e5b':'#d9534f','text-anchor':'start'})});
  T(g,W/2,H-(P?72:56),bal?'BALANCED ✅':'Not balanced yet',{'font-size':18,'font-weight':900,fill:bal?'#2f9e5b':'#55688a'});
  q('#cf').innerHTML=[...e.r,...e.p].map((s,i)=>`<div class="row" style="align-items:center;margin:3px 0"><b style="min-width:70px">${s[0]}</b><button data-i="${i}" data-d="-1">−</button><b style="min-width:24px;text-align:center">${c[i]}</b><button data-i="${i}" data-d="1">+</button></div>`).join('');
  q('#n').textContent=k+1;q('#cf').querySelectorAll('button').forEach(b=>b.onclick=()=>sc.add(+b.dataset.i,+b.dataset.d));
  if(bal&&!lock){lock=true;L.snd.ok&&L.snd.ok();sc.say('✅ Balanced! Same atoms on both sides.','ok');k++;setTimeout(()=>{lock=false;if(k>=LST.length){k=LST.length-1;chal?api.solved():(api.award('did'),api.ready())}else load()},600)}}
 function load(){const e=LST[k];c=[...e.r,...e.p].map(()=>1);draw();sc.say('Add molecules until the scale levels out.')}
 sc.add=(i,d)=>{if(lock)return;c[i]=Math.max(1,Math.min(9,c[i]+d));L.snd.pop&&L.snd.pop();draw()};
 api.ctrl.innerHTML=`<p style="margin:0 0 4px;font-size:14px">Equation <b id="n"></b> of ${LST.length}. <b>Tap + or −</b> to add molecules (coefficients) until the scale balances.</p><div id="cf"></div>${chal?'':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Balance all 3 to unlock the next step.</p>'}`;
 load()},
demo:[[S=>{S.add(0,1);},'Hydrogen doubles. Oxygen is still uneven.',900],[S=>{S.add(2,1)},'Make 2 water. Now both sides match.',900]],
why:['Atoms are only <b>rearranged</b>, never created or destroyed, so each element must have the <b>same number of atoms on both sides</b>.','Balance using <span class="word">coefficients</span> (the big numbers in front). Never change the small subscripts, because that changes the substance.','Method: count atoms of each element, pick the one that is uneven, fix it, recount, repeat.','2H₂ + O₂ → 2H₂O means 2 molecules of hydrogen react with 1 of oxygen to make 2 of water.'],
check:[{q:'What may you change to balance an equation?',options:['Subscripts','Coefficients','Both','Neither'],answer:1,why:'Coefficients change the amount. Subscripts would change the substance.',hint:'The big numbers.'},
 {q:'Balanced form of Mg + O₂ → MgO is…',options:['Mg + O₂ → 2MgO','2Mg + O₂ → 2MgO','Mg + 2O₂ → MgO','2Mg + 2O₂ → 2MgO'],answer:1,why:'2 Mg and 2 O on each side.',hint:'Count O first.'},
 {q:'Why must equations balance?',options:['To look neat','Atoms are conserved','Water must form','For colour'],answer:1,why:'Mass and atoms are conserved.',hint:'Law of conservation of mass.'}],
challenge:{text:'Two harder equations. Balance <b>both</b>.',win:'CH₄ + 2O₂ → CO₂ + 2H₂O and 4Fe + 3O₂ → 2Fe₂O₃.'},
real:['Engineers use balanced equations to know how much fuel and air an engine needs.','Fertiliser factories balance equations to avoid waste.','Your body balances reactions too, such as in breathing.'],
words:{Coefficient:'The number in front of a formula.',Subscript:'The small number inside a formula.',Balanced:'Same atoms on both sides.',Reactant:'Starting substance.',Product:'New substance made.'}
});
