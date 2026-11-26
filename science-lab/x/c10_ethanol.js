QLab.register({
id:'c10_ethanol',code:'10-C4',title:'Ethanol and ethanoic acid',grade:10,subject:'Chemistry',emoji:'🧪',
hook:{title:'Vinegar is sour. Spirit is not. Yet they are close cousins made of carbon, hydrogen and oxygen.',text:'Two groups of atoms give ethanol and ethanoic acid their personalities. Test them.'},
prior:'You know carbon compounds burn and form molecules.',
guess:{q:'Which carbon compound is in vinegar?',options:['Ethanol','Ethanoic acid','Methane','Glucose'],answer:1,hint:'It is sour and acidic.',after:'Test both.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'Two beakers of clear liquid and four test tools: litmus paper, washing soda, a flame and your nose'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const S={Ethanol:{f:'C₂H₅OH',g:'−OH (alcohol)',litmus:'No change (neutral)',soda:'No fizz',burn:'Burns with a blue flame',smell:'Pleasant spirit smell'},'Ethanoic acid':{f:'CH₃COOH',g:'−COOH (acid)',litmus:'Blue litmus turns red',soda:'Fizzes: CO₂ is released',burn:'Hard to burn',smell:'Sharp vinegar smell'}};
 const names=chal?['Unknown liquid']:Object.keys(S);const key=chal?['Ethanoic acid']:names;
 const ty=P?320:290,gE=E('g',{},sc.gMain),seen=new Set();let busy=false;
 const vs=names.map((n,i)=>sc.vessel({x:chal?W/2:(P?W*(.3+.4*i):W*(.3+.4*i)),y:ty,type:'beaker',w:116,h:130,level:.55,color:chal?'#fff7d6':(n==='Ethanol'?'#e8f3fb':'#fff7d6'),label:n,data:{k:key[i]}}));
 sc.gMain.appendChild(gE);
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 sc.test=async(k,t)=>{if(busy)return;busy=true;const i=key.indexOf(k),v=vs[i],r=S[k][t],x=v.x;gE.innerHTML='';
  if(t==='litmus'){E('rect',{x:x-6,y:ty-190,width:12,height:70,fill:k==='Ethanoic acid'?'#e5484d':'#4a78e5',stroke:'#2b2350','stroke-width':2},gE);L.snd.drop&&L.snd.drop()}
  if(t==='soda'){E('circle',{cx:x,cy:ty-150,r:7,fill:'#fff',stroke:'#8ec9ff'},gE);if(k==='Ethanoic acid'){v.bubbles&&v.bubbles(1200,10,'#fff');L.snd.fizz&&L.snd.fizz()}}
  if(t==='burn'){const big=k==='Ethanol';E('path',{d:`M${x} ${ty-125} C${x-18} ${ty-125-(big?40:12)} ${x-8} ${ty-125-(big?70:22)} ${x} ${ty-125-(big?75:25)} C${x+8} ${ty-125-(big?70:22)} ${x+18} ${ty-125-(big?40:12)} ${x} ${ty-125}Z`,fill:big?'#4aa8ff':'#ffd05a',opacity:.95},gE);L.snd.whoosh&&L.snd.whoosh()}
  if(t==='smell'){T(gE,x,ty-150,k==='Ethanol'?'🌸':'🤢',{'font-size':40,class:''})}
  sc.say(r,'ok');if(q('#st'))q('#st').textContent=r;await sc.sleep(900);seen.add(k+t);
  if(!chal&&seen.size>=8){api.award('did');api.ready()}busy=false};
 function q(x){return api.ctrl.querySelector(x)}
 [['Litmus','litmus',d=>E('rect',{x:-5,y:-22,width:10,height:44,fill:'#4a78e5',stroke:'#2b2350','stroke-width':2},d)],['Washing soda','soda',d=>{E('rect',{x:-16,y:-6,width:32,height:16,rx:4,fill:'#fff',stroke:'#2b2350','stroke-width':2},d)}],['Flame','burn',d=>E('path',{d:'M0 14 C-12 4 -6 -8 0 -16 C6 -8 12 4 0 14Z',fill:'#ff9a1a'},d)],['Smell','smell',d=>T(d,0,8,'👃',{'font-size':26,class:''})]].forEach((tt,i)=>sc.tool({x:P?48+i*98:W*.18+i*120,y:P?492:384,label:tt[0],ly:P?34:32,scale:.9,draw:tt[2],use:v=>sc.test(v.data.k,tt[1])}));
 api.ctrl.innerHTML=chal?`<p style="margin:0 0 6px;font-size:14px"><b>Drag the tools onto the unknown liquid.</b> It turns blue litmus red and fizzes with washing soda. It is…</p><div class="row" id="fm" style="flex-wrap:wrap">${['Ethanol','Ethanoic acid','Water','Methane'].map(x=>`<button data-a="${x}">${x}</button>`).join('')}</div>`:`<p style="margin:0 0 4px;font-size:14px"><b>Drag each tool onto a beaker.</b> Compare the two liquids.</p><p id="st" style="font-weight:800;margin:4px 0"></p><p class="lockhint" style="margin:0;text-align:left">Run all 4 tests on both liquids to unlock the next step.</p>`;
 if(chal)q('#fm').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.a==='Ethanoic acid'){L.snd.ok&&L.snd.ok();api.solved()}else{L.snd.no&&L.snd.no();api.nope('Acids turn blue litmus red and release CO₂ from carbonates.')}});
 T(sc.gMain,W/2,P?96:96,chal?'Unknown liquid':'Ethanol (C₂H₅OH) and ethanoic acid (CH₃COOH)',{'font-size':P?12:15,'font-weight':900,fill:'#2b2350',class:''});
 sc.say('Test both liquids with each tool.')},
demo:[[S=>S.test('Ethanol','litmus'),'Ethanol does not change litmus. It is neutral.',900],[S=>S.test('Ethanoic acid','litmus'),'Ethanoic acid turns blue litmus red. It is an acid.',900],[S=>S.test('Ethanoic acid','soda'),'And it fizzes with washing soda, releasing CO₂.',900]],
why:['<b>Ethanol</b> (C₂H₅OH) has the <b>−OH</b> alcohol group. It is neutral and burns cleanly.','<b>Ethanoic acid</b> (CH₃COOH) has the <b>−COOH</b> group. It is a weak acid: it turns blue litmus red and fizzes with carbonates.','Ethanol + ethanoic acid (with a little acid catalyst) make a sweet-smelling <span class="word">ester</span>.','The functional group decides how a carbon compound behaves.'],
check:[{q:'Which group makes ethanoic acid acidic?',options:['−OH','−COOH','−CH₃','−Cl'],answer:1,why:'The carboxylic acid group.',hint:'It has 2 oxygens.'},
 {q:'What does ethanoic acid do to washing soda?',options:['Nothing','Fizzes','Turns blue','Explodes'],answer:1,why:'It releases CO₂.',hint:'Like HCl.'},
 {q:'Ethanol with litmus gives…',options:['Red','Blue to red','No change','Green'],answer:2,why:'It is neutral.',hint:'Not an acid.'}],
challenge:{text:'A liquid turns blue litmus red and fizzes with sodium carbonate. <b>What is it?</b>',win:'Ethanoic acid: the −COOH group.'},
real:['Vinegar is about 5 to 8 percent ethanoic acid.','Ethanol is used as a solvent and fuel blended in petrol.','Esters give fruits and perfumes their smells.'],
words:{'Functional group':'Part of a molecule that decides its behaviour.',Ester:'Sweet-smelling compound from alcohol + acid.',Alcohol:'Compound with −OH.','Carboxylic acid':'Compound with −COOH.'}
});
