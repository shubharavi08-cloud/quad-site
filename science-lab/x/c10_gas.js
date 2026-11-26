QLab.register({
id:'c10_gas',code:'10-C2',title:'The baking soda test: which gas fizzes out?',grade:10,subject:'Chemistry',emoji:'🫧',
hook:{title:'Baking soda fizzes in vinegar. What is the gas?',text:'Pass the gas through limewater. If limewater turns milky, you know which gas it is.'},
prior:'Know that baking soda fizzes in vinegar.',
guess:{q:'Limewater turns milky when you pass this gas through it:',options:['Hydrogen','Oxygen','Carbon dioxide','Nitrogen'],answer:2,hint:'It is the test for the gas you breathe out.',after:'Test some solids with acid.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A flask with a solid and acid, a delivery tube bubbling gas into limewater'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const S={'Baking soda (NaHCO₃)':1,'Washing soda (Na₂CO₃)':1,'Chalk (CaCO₃)':1,'Marble chips':1,'Common salt (NaCl)':0,'Sand':0};
 let s=chal?'Marble chips':null,acid=false,busy=false;const log=new Set();
 const fx=P?120:250,lx=P?320:520,ty=P?330:300;
 const gT=E('g',{},sc.gMain);
 const fl=sc.vessel({x:fx,y:ty,type:'flask',w:130,h:150,level:0,color:'#e8f3fb',label:'Flask'});
 const lw=sc.vessel({x:lx,y:ty,type:'tube',w:44,h:150,level:.6,color:'#dff0fb',label:'Limewater'});
 function draw(){gT.innerHTML='';const top=ty-150,cx=fx;E('path',{d:`M${cx} ${top-4} V${top-34} H${lx} V${ty-70}`,fill:'none',stroke:'#5a6a85','stroke-width':4,'stroke-linecap':'round'},gT);
  if(s){const e=E('text',{x:fx,y:ty+22,'text-anchor':'middle',class:'lkhint','font-size':P?10:12,'font-weight':800},gT);e.textContent=s.split(' (')[0]}
  const st=E('text',{x:W/2,y:P?104:100,'text-anchor':'middle',class:'lkhint','font-size':P?13:16,'font-weight':900,fill:'#2b2350'},gT);st.textContent=chal?'A gas bubbles through limewater':(s?(acid?(S[s]?'Fizz! Gas passes into the limewater':'No gas. Limewater stays clear'):'Now add dilute acid'):'Pick a solid first')}
 sc.solid=k=>{if(busy||chal)return;s=k;acid=false;fl.setLevel(.12);fl.setColor('#f4f1e8');lw.setLevel(.6);lw.setColor('#dff0fb');draw();if(q('#so'))q('#so').querySelectorAll('button').forEach(x=>x.className=x.dataset.k===k?'pri':'');q('#rs').textContent=''};
 sc.acid=async()=>{if(busy)return;if(!s){sc.say('Pick a solid first.','warn');return}busy=true;acid=true;fl.setLevel(.45);fl.setColor('#d9f0ff');L.snd.pop&&L.snd.pop();draw();
  if(S[s]){fl.bubbles&&fl.bubbles(1400,10,'#fff');L.snd.fizz&&L.snd.fizz();await sc.sleep(900);lw.bubbles&&lw.bubbles(1500,8,'#fff');await sc.sleep(900);lw.setColor('#e9e4d8');q('#rs').textContent='Limewater turns milky: the gas is carbon dioxide.';sc.say('Limewater turned milky: CO₂!','ok')}
  else{await sc.sleep(500);q('#rs').textContent='Nothing happens. No gas, limewater stays clear.';sc.say('No gas from this one.')}
  log.add(s);if(!chal){const t=q('#tl');if(t)t.textContent=log.size;if(log.size>=4&&[...log].some(k=>!S[k])){api.award('did');api.ready()}}busy=false};
 sc.tool({x:P?60:W-190,y:P?492:384,label:'Acid dropper',ly:30,scale:.9,draw:g=>{E('rect',{x:-6,y:-24,width:12,height:30,rx:5,fill:'#d9f0ff',stroke:'#2b2350','stroke-width':2},g);E('rect',{x:-9,y:-34,width:18,height:12,rx:6,fill:'#e5484d'},g);E('path',{d:'M0 6 V14',stroke:'#2b2350','stroke-width':2},g)},use:()=>sc.acid()});
 api.ctrl.innerHTML=chal?`<p style="margin:0 0 6px;font-size:14px"><b>Drag the acid dropper onto the flask.</b> The gas turned limewater milky. It is…</p><div class="row" id="gs"><button data-a="H">Hydrogen</button><button data-a="O">Oxygen</button><button data-a="C">Carbon dioxide</button></div><p id="rs" style="font-weight:800;margin:4px 0"></p>`:`<p style="margin:0 0 4px;font-size:14px"><b>Pick a solid</b>, then <b>drag the acid dropper onto the flask</b>.</p><div class="row" id="so" style="flex-wrap:wrap">${Object.keys(S).map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div><p id="rs" style="font-weight:800;margin:4px 0"></p><p class="lockhint" style="margin:0;text-align:left">Test 4 solids, including one that gives no gas, to unlock the next step. Tested: <span id="tl">0</span></p>`;
 function q(x){return api.ctrl.querySelector(x)}
 if(chal)q('#gs').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.a==='C'){L.snd.ok&&L.snd.ok();api.solved()}else{L.snd.no&&L.snd.no();api.nope('Limewater turning milky is the standard test for carbon dioxide.')}});
 else q('#so').querySelectorAll('button').forEach(b=>b.onclick=()=>sc.solid(b.dataset.k));
 draw();sc.say(chal?'Drop acid on the chips and watch.':'Pick a solid. Then add acid.')},
demo:[[S=>S.solid('Chalk (CaCO₃)'),'Chalk in the flask.',700],[S=>S.acid(),'Acid makes it fizz. The gas turns limewater milky: carbon dioxide.',1200],[S=>S.solid('Sand'),'Now sand.',700],[S=>S.acid(),'No fizz and limewater stays clear.',1200]],
why:['<b>Carbonates and hydrogencarbonates</b> react with acids to give <b>carbon dioxide</b>, a salt and water. Example: NaHCO₃ + HCl → NaCl + H₂O + CO₂.','Carbon dioxide turns <span class="word">limewater</span> (calcium hydroxide solution) <b>milky</b> because insoluble calcium carbonate forms.','Salt (NaCl) and sand contain no carbonate, so they give no gas.','So the limewater test, after adding acid, identifies a carbonate.'],
check:[{q:'Which gas turns limewater milky?',options:['O₂','H₂','CO₂','N₂'],answer:2,why:'CO₂ forms insoluble calcium carbonate.',hint:'You made it fizz out of baking soda.'},
 {q:'Which solid gives no gas with acid?',options:['Chalk','Baking soda','Salt','Washing soda'],answer:2,why:'Salt has no carbonate.',hint:'Not a carbonate.'},
 {q:'Baking soda + HCl gives…',options:['Salt, water and CO₂','Only salt','Only water','Hydrogen'],answer:0,why:'NaHCO₃ + HCl → NaCl + H₂O + CO₂.',hint:'Fizz.'}],
challenge:{text:'The gas from baking soda and acid turned limewater milky. <b>Name the gas.</b>',win:'Carbon dioxide.'},
real:['Baking soda makes cakes rise by releasing CO₂ in the heat.','Antacids neutralise acid and give off CO₂, so you burp.','Marble and limestone buildings are damaged by acid rain.'],
words:{Limewater:'Calcium hydroxide solution, used to test for CO₂.',Carbonate:'A salt containing CO₃.',Fizzing:'Bubbles of gas being released.','Test for CO₂':'Turns limewater milky.'}
});
