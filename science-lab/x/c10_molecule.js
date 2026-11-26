QLab.register({
id:'c10_molecule',code:'10-C4',title:'Molecule builder: covalent bonds',grade:10,subject:'Chemistry',emoji:'🧩',
hook:{title:'Water, methane, carbon dioxide: no metals, no charges. How do their atoms hold together?',text:'Non-metal atoms can share electrons. Build molecules by giving each atom the bonds it needs.'},
prior:'You know ionic bonds move electrons.',
guess:{q:'In a covalent bond, the atoms…',options:['Give electrons away completely','Share electrons','Swap protons','Lose neutrons'],answer:1,hint:'Non-metals with non-metals.',after:'Build some molecules.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A central atom with open bonding hands; drag hydrogen atoms onto it to build a molecule'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const M={H2O:{n:'Water',c:'O',h:2,f:'H₂O'},CH4:{n:'Methane',c:'C',h:4,f:'CH₄'},NH3:{n:'Ammonia',c:'N',h:3,f:'NH₃'},HCl:{n:'Hydrogen chloride',c:'Cl',h:1,f:'HCl'}};
 let k=chal?'NH3':'H2O',hs=0;const done=new Set();
 const cx=W/2,cy=P?250:225,R=P?85:100;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const gM=E('g',{},sc.gMain);
 const tgt=sc.vessel({x:cx,y:cy+110,type:'beaker',w:230,h:230,level:0,color:'#fff',label:''});tgt.g.style.opacity=0;sc.gMain.appendChild(gM);
 function q(x){return api.ctrl.querySelector(x)}
 function draw(){gM.innerHTML='';const d=M[k],full=hs>=d.h;
  for(let i=0;i<d.h;i++){const a=i/d.h*6.28-1.57+(d.h===2?.9:0),x=cx+R*Math.cos(a),y=cy+R*Math.sin(a);
   if(i<hs){E('line',{x1:cx,y1:cy,x2:x,y2:y,stroke:'#4b3fd1','stroke-width':6},gM);E('circle',{cx:x,cy:y,r:20,fill:'#ffb347',stroke:'#333','stroke-width':2},gM);T(gM,x,y+5,'H',{'font-weight':900,class:''})}
   else{E('line',{x1:cx,y1:cy,x2:cx+(x-cx)*.6,y2:cy+(y-cy)*.6,stroke:'#cdb8ff','stroke-width':5,'stroke-dasharray':'4 5'},gM);E('circle',{cx:cx+(x-cx)*.75,cy:cy+(y-cy)*.75,r:9,fill:'none',stroke:'#cdb8ff','stroke-width':3,'stroke-dasharray':'3 3'},gM)}}
  E('circle',{cx,cy,r:30,fill:'#2aa5d8',stroke:'#333','stroke-width':2},gM);T(gM,cx,cy+7,d.c,{'font-weight':900,'font-size':20,class:''});
  T(gM,W/2,P?96:98,full?d.n+' '+d.f+' is complete':hs+' of '+d.h+' hydrogens: '+d.c+' has '+d.h+' open hand'+(d.h>1?'s':''),{'font-size':P?13:17,'font-weight':900,fill:full?'#2e9d5b':'#2b2350',class:''});
  if(q('#st'))q('#st').textContent=full?`Every hand is shared with an H. ${d.f}: covalent bonds.`:'Drag a hydrogen atom onto the central atom.';
  if(full&&!chal){done.add(k);if(done.size>=4){api.award('did');api.ready()}}}
 sc.add=()=>{const d=M[k];if(hs>=d.h){sc.say('All the hands are full. No more H fits.','warn');return}hs++;L.snd.pop&&L.snd.pop();draw();if(hs>=d.h)sc.say(`${M[k].f} is complete. Each shared pair is a covalent bond.`,'ok')};
 sc.pick=x=>{k=x;hs=0;if(q('#pp'))q('#pp').querySelectorAll('button').forEach(b=>b.className=b.dataset.k===x?'pri':'');draw()};
 sc.tool({x:P?W/2:W/2,y:P?492:384,label:'Hydrogen atom',ly:P?34:34,scale:1,draw:g=>{E('circle',{r:16,fill:'#ffb347',stroke:'#333','stroke-width':2},g);T(g,0,5,'H',{'font-weight':900,class:''})},use:()=>sc.add()});
 api.ctrl.innerHTML=chal?`<p style="margin:0 0 6px;font-size:14px"><b>How many hydrogen atoms bond to one nitrogen atom?</b> (N needs 3 more electrons.) Try dragging H atoms onto N.</p><div class="row" id="fm">${[1,2,3,4].map(x=>`<button data-a="${x}">${x}</button>`).join('')}</div>`:`<p style="margin:0 0 4px;font-size:14px"><b>Pick a molecule</b>, then <b>drag hydrogen atoms</b> onto the central atom.</p><div class="row" id="pp">${Object.keys(M).map(x=>`<button data-k="${x}">${M[x].f}</button>`).join('')}</div><p id="st" style="font-weight:800;margin:4px 0"></p><p class="lockhint" style="margin:0;text-align:left">Build all 4 to unlock the next step.</p>`;
 if(chal)q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.a==='3'){L.snd.ok&&L.snd.ok();api.solved()}else{L.snd.no&&L.snd.no();api.nope('Nitrogen needs 3 more electrons, so it shares with 3 hydrogens.')}});
 else{q('#pp').querySelectorAll('button').forEach(b=>b.onclick=()=>sc.pick(b.dataset.k));q('#pp button').className='pri'}
 draw();sc.say(chal?'Fill the open hands of nitrogen.':'Fill every open hand with a hydrogen.')},
demo:[[S=>S.add(),'Oxygen has 2 open hands. First hydrogen bonds.',900],[S=>S.add(),'Second hydrogen: water, H₂O, is complete.',1000],[S=>S.pick('CH4'),'Carbon has 4 open hands.',800]],
why:['A <span class="word">covalent bond</span> is a pair of electrons <b>shared</b> between two non-metal atoms.','Each atom shares until its outer shell is full. Carbon needs 4, nitrogen 3, oxygen 2, hydrogen 1.','So carbon bonds to 4 hydrogens (CH₄), nitrogen to 3 (NH₃), oxygen to 2 (H₂O).','Covalent compounds are made of small <b>molecules</b>. They usually have low melting points and do not conduct electricity.'],
check:[{q:'Covalent bonds form between…',options:['Two metals','A metal and non-metal','Two non-metals','Noble gases'],answer:2,why:'Non-metals share electrons.',hint:'No metal needed.'},
 {q:'How many hydrogens bond to carbon in methane?',options:['1','2','3','4'],answer:3,why:'Carbon needs 4 bonds.',hint:'CH?'},
 {q:'Why does oxygen bond to two hydrogens in water?',options:['It needs 2 more electrons','It has 2 protons','It is heavy','It is a gas'],answer:0,why:'It shares 2 electrons.',hint:'Outer shell has 6.'}],
challenge:{text:'How many hydrogen atoms bond to <b>one nitrogen</b>?',win:'Three: NH₃, ammonia.'},
real:['Water, sugar and plastics are all covalent compounds.','Methane is the main gas in cooking gas (LPG is related).','Ammonia is used to make fertilisers.'],
words:{'Covalent bond':'A shared pair of electrons.',Molecule:'A group of atoms bonded together.',Valency:'How many bonds an atom forms.',Shell:'Energy level of electrons.'}
});
