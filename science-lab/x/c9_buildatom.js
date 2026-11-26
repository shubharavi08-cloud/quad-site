QLab.register({
id:'c9_buildatom',code:'9-C2',title:'Build an atom: protons, neutrons, electrons',grade:9,subject:'Chemistry',emoji:'⚛️',
hook:{title:'What makes a gold atom different from an oxygen atom?',text:'Only the number of protons. Build atoms with different numbers and see which element you make.'},
prior:'Know that atoms have a nucleus with electrons around it.',
guess:{q:'What decides which element an atom is?',options:['The number of neutrons','The number of electrons only','The number of protons','The colour of the atom'],answer:2,hint:'The atomic number is the number of protons.',after:'Build some atoms.'},
build(api){
 const L=QLab.lab,chal=!!api.challenge,E=L.E,stage=api.stage;
 const sc=L.scene(stage,{alt:'Atom builder: bins of protons, neutrons and electrons next to an atom you assemble'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const SY=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'];
 const NM=['','Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon','Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulphur','Chlorine','Argon','Potassium','Calcium'];
 let p=1,n=0,e=1,last='',frozen=false;const seen=new Set();
 const cx=P?210:340,cy=P?208:218,RS=P?[34,60,86,110]:[42,70,98,126];
 const gA=E('g',{},sc.gMain),gB=E('g',{},sc.gMain),gC=E('g',{},sc.gMain),gG=E('g',{},sc.gMain);
 const T=(g,x,y,t,o)=>{const el=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);el.textContent=t;return el};
 const COL={p:['#e5534b','#a8302a'],n:['#aeb6c2','#6f7a89'],e:['#2aa5d8','#1b6f95']};
 const shells=z=>{const o=[];let r=z;for(const c of [2,8,8,2]){const t=Math.min(c,r);if(t>0)o.push(t);r-=t}return o};
 function ball(g,x,y,t,r,pop){const c=E('circle',{cx:x,cy:y,r,fill:COL[t][0],stroke:'#fff','stroke-width':1.5,style:'cursor:pointer'+(pop?';transform-box:fill-box;transform-origin:center;animation:qpop .35s':'')},g);c.dataset.t=t;return c}
 function draw(){gA.innerHTML='';const sh=shells(e);
  sh.forEach((c,i)=>{const R=RS[i],grp=E('g',{},gA);E('circle',{cx,cy,r:R,fill:'none',stroke:'#b9c9e6','stroke-width':2,'stroke-dasharray':'3 5'},grp);const rot=E('g',{},grp);
   for(let k=0;k<c;k++){const a=k/c*6.283,b=ball(rot,cx+R*Math.cos(a),cy+R*Math.sin(a),'e',P?5:6,last==='e'&&i===sh.length-1&&k===c-1)}
   E('animateTransform',{attributeName:'transform',type:'rotate',from:`0 ${cx} ${cy}`,to:`${i%2?-360:360} ${cx} ${cy}`,dur:`${14+i*7}s`,repeatCount:'indefinite'},rot)});
  E('circle',{cx,cy,r:(P?12:16)+Math.sqrt(p+n)*(P?4.4:5.8),fill:'#ffd9d4',opacity:.5},gA);
  const k0=P?4.4:5.8;
  // interleave protons and neutrons so the nucleus looks mixed
  const list=[];let pi=0,ni=0;while(pi<p||ni<n){if(pi<p)list.push('p'),pi++;if(ni<n)list.push('n'),ni++}
  list.forEach((t,k)=>{const a=k*2.4,r=Math.sqrt(k)*k0;ball(gA,cx+r*Math.cos(a),cy+r*Math.sin(a),t,P?5:6.2,(last===t&&k>=list.length-2))});
  card()}
 function card(){gC.innerHTML='';const ch=p-e,A=p+n,x=P?210:626,y=P?334:130,w=P?250:200,h=P?92:158;
  E('rect',{x:x-w/2,y:y-(P?0:42),width:w,height:h,rx:16,fill:'#fff',stroke:ch===0?'#2e9d5b':'#e8a21c','stroke-width':3,opacity:.96},gC);
  const ty=P?y+44:y+26;
  T(gC,P?x-60:x,ty,SY[p]||'?',{'font-size':P?44:56,'font-weight':900,fill:'#4b3fd1',class:''});
  if(ch!==0)T(gC,(P?x-60:x)+(P?34:44),ty-(P?22:30),(ch>0?'+':'−')+Math.abs(ch),{'font-size':18,'font-weight':900,fill:'#e5534b',class:''});
  T(gC,P?x+40:x,P?y+30:y+52,NM[p]||'',{'font-size':14,'font-weight':800,fill:'#2b2350',class:''});
  T(gC,P?x+40:x,P?y+50:y+74,`Atomic number ${p}`,{'font-size':12,class:''});T(gC,P?x+40:x,P?y+68:y+92,`Mass number ${A}`,{'font-size':12,class:''});
  T(gC,P?x+40:x,P?y+84:y+110,ch===0?'neutral atom':ch>0?'positive ion':'negative ion',{'font-size':12,'font-weight':800,fill:ch===0?'#2e9d5b':'#e8a21c',class:''});
  api.ctrl.querySelector('#pv')&&(api.ctrl.querySelector('#pv').textContent=p,api.ctrl.querySelector('#nv').textContent=n,api.ctrl.querySelector('#ev').textContent=e,api.ctrl.querySelector('#sh').textContent=shells(e).join(', ')||'none')}
 // ---- bins (tap to add, or drag into the atom, tap a particle in the atom to take it out)
 const binPos=t=>P?{x:{p:70,n:210,e:350}[t],y:496}:{x:70,y:{p:150,n:240,e:330}[t]};
 const bins={p:'Proton +',n:'Neutron',e:'Electron −'};
 Object.keys(bins).forEach(t=>{const q=binPos(t),g=E('g',{style:'cursor:pointer;touch-action:none'},gB);
  E('ellipse',{cx:q.x,cy:q.y+26,rx:40,ry:9,fill:'#000',opacity:.12},g);
  E('path',{d:`M${q.x-36} ${q.y-22}L${q.x-30} ${q.y+24}Q${q.x} ${q.y+32} ${q.x+30} ${q.y+24}L${q.x+36} ${q.y-22}Z`,fill:'#e9f3ff',stroke:'#5a7fb0','stroke-width':3,opacity:.95},g);
  [[-14,8],[2,14],[14,4],[-4,0],[10,16]].forEach(o=>E('circle',{cx:q.x+o[0],cy:q.y+o[1],r:7,fill:COL[t][0],stroke:'#fff','stroke-width':1.5},g));
  E('rect',{x:q.x-46,y:q.y-34,width:92,height:14,rx:7,fill:'#fff',stroke:COL[t][1],'stroke-width':2},g);T(g,q.x,q.y-24,bins[t],{'font-size':11,'font-weight':800,fill:COL[t][1],class:''});
  g.dataset.t=t;
  g.addEventListener('pointerdown',ev=>{ev.preventDefault();if(frozen)return;const s=stage.querySelector('svg'),pt=e=>{const m=s.getScreenCTM().inverse(),z=s.createSVGPoint();z.x=e.clientX;z.y=e.clientY;return z.matrixTransform(m)};const p0=pt(ev);let gh=null;
   const mv=e2=>{const c=pt(e2);if(!gh&&Math.hypot(c.x-p0.x,c.y-p0.y)>8)gh=E('circle',{r:9,fill:COL[t][0],stroke:'#fff','stroke-width':2},gG);if(gh){gh.setAttribute('cx',c.x);gh.setAttribute('cy',c.y)}};
   const up=e3=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);const c=pt(e3);if(!gh)sc.add(t,1);else{gh.remove();if(Math.hypot(c.x-cx,c.y-cy)<RS[3]+30)sc.add(t,1)}};
   addEventListener('pointermove',mv);addEventListener('pointerup',up)})});
 gA.addEventListener('click',ev=>{const t=ev.target.dataset&&ev.target.dataset.t;if(!t||frozen)return;sc.take(t)});
 sc.add=async(t,k=1)=>{for(let i=0;i<k;i++){if(t==='p')p=Math.min(20,p+1);if(t==='n')n=Math.min(25,n+1);if(t==='e')e=Math.min(21,e+1);last=t;draw();L.snd.pop&&L.snd.pop();note();if(k>1)await sc.sleep(230)}};
 sc.take=t=>{if(t==='p')p=Math.max(1,p-1);if(t==='n')n=Math.max(0,n-1);if(t==='e')e=Math.max(0,e-1);last='';draw();note()};
 sc.reset=(P0=1,N0=0,E0=1)=>{p=P0;n=N0;e=E0;last='';draw()};
 function note(){const ch=p-e;if(!chal&&ch===0){seen.add(p);if(seen.size>=3){api.award('did');api.ready()}}}
 api.ctrl.innerHTML=`<p style="margin:0">Tap a jar, or drag a particle into the atom. Tap a particle in the atom to take it out.</p><p>Protons: <b id="pv"></b> · Neutrons: <b id="nv"></b> · Electrons: <b id="ev"></b><br>Electrons in shells: <b id="sh"></b></p><div class="row"><button id="rs">↺ Start again</button></div>${chal?'<button class="pri" id="ck">Check my atom</button>':'<p class="lockhint" style="margin:0;text-align:left">Build 3 different neutral atoms to unlock the next step.</p>'}`;
 api.ctrl.querySelector('#rs').onclick=()=>sc.reset();
 if(chal)api.ctrl.querySelector('#ck').onclick=()=>{if(p!==8)return api.nope('Oxygen has 8 protons. You have '+p+' ('+(NM[p]||'?')+').');if(e!==8)return api.nope('A neutral atom has equal protons and electrons: 8 electrons.');if(n!==8)return api.nope('Mass number 16 means protons + neutrons = 16, so 8 neutrons.');api.solved()};
 sc.say('Start with the hydrogen atom. Add particles from the jars. The element card changes.');
 draw()},
demo:[[S=>S.add('p',1),'Add a proton. Now there are 2 protons, so the element changes to helium.',700],[S=>S.add('e',1),'Add an electron to balance the charge. A neutral helium atom.',900],[S=>S.add('n',2),'Add 2 neutrons. Neutrons add mass but do not change the element.',900],[S=>S.add('p',4),'Add 4 more protons. 6 protons make carbon.',700],[S=>S.add('e',4),'Add 4 electrons. The shells fill: 2 in the first, 4 in the second.',1200]],
why:['The <b>number of protons</b> is the <span class="word">atomic number</span>. It decides the element: 1 is hydrogen, 6 is carbon, 8 is oxygen.','A <b>neutral atom</b> has equal protons and electrons. If it loses or gains electrons it becomes an <b>ion</b>.','<span class="word">Mass number</span> = protons + neutrons. Electrons weigh almost nothing.','Electrons fill shells: 2 in the first, 8 in the second, 8 in the third (up to calcium).'],
check:[{q:'An atom has 6 protons. It is…',options:['Hydrogen','Carbon','Oxygen','Helium'],answer:1,why:'6 protons means carbon.',hint:'Atomic number 6.'},
 {q:'A neutral atom has 11 protons. How many electrons?',options:['0','1','11','22'],answer:2,why:'Neutral means equal protons and electrons.',hint:'Positive and negative charges balance.'},
 {q:'Mass number = ?',options:['Protons','Protons + neutrons','Electrons + protons','Neutrons'],answer:1,why:'Mass number counts the particles in the nucleus.',hint:'Electrons are too light to count.'}],
challenge:{text:'Build a <b>neutral oxygen atom</b> with mass number <b>16</b>.',win:'8 protons, 8 neutrons, 8 electrons: oxygen-16.'},
real:['Atomic numbers are the order of the periodic table.','Sodium becomes Na⁺ by losing one electron, as in table salt.','Isotopes differ only in neutrons.'],
words:{Proton:'Positive particle in the nucleus.',Neutron:'Neutral particle in the nucleus.',Electron:'Negative particle around the nucleus.','Atomic number':'Number of protons.','Mass number':'Protons plus neutrons.',Ion:'An atom that has gained or lost electrons.'}
});
