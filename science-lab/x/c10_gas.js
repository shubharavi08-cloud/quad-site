QLab.register({
id:'c10_gas',code:'10-C2',title:'The baking soda test: which gas fizzes out?',grade:10,subject:'Chemistry',emoji:'🫧',
hook:{title:'Baking soda fizzes in vinegar. What is the gas?',text:'Pass the gas through limewater. If limewater turns milky, you know which gas it is.'},
prior:'Know that baking soda fizzes in vinegar.',
guess:{q:'Limewater turns milky when you pass this gas through it:',options:['Hydrogen','Oxygen','Carbon dioxide','Nitrogen'],answer:2,hint:'It is the test for the gas you breathe out.',after:'Test some solids with acid.'},
build(api){
 const chal=!!api.challenge;
 const S={'Baking soda (NaHCO₃)':1,'Washing soda (Na₂CO₃)':1,'Chalk (CaCO₃)':1,'Marble chips':1,'Common salt (NaCl)':0,'Sand':0};
 let s=null,acid=false,bub=false,mil=false;const log=new Set();
 api.ctrl.innerHTML=`<b>Solid</b><div class="row" id="so" style="flex-wrap:wrap">${Object.keys(S).map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div><div class="row"><button class="pri" id="ad">➕ Add dilute acid</button><button class="pri" id="lw">➡️ Pass gas into limewater</button></div><p id="rs" style="font-weight:800"></p><p style="font-size:13px;color:#55688a">${chal?'':'Tested: <span id="tl">0</span>'}</p>${chal?'<p><b>The gas that turned limewater milky is…</b></p><div class="row" id="gs"><button data-a="H">Hydrogen</button><button data-a="O">Oxygen</button><button data-a="C">Carbon dioxide</button></div>':''}`;
 const q=x=>api.ctrl.querySelector(x);
 function draw(){api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/><path d="M130 120 V230 Q130 245 145 245 H245 Q260 245 260 230 V120" fill="none" stroke="#1b2a4a" stroke-width="4"/><rect x="133" y="${acid?170:215}" width="124" height="${acid?73:28}" fill="${acid?'#d9f0ff':'#fff'}"/>${s?`<text x="195" y="236" text-anchor="middle" font-size="12" font-weight="800">${s.split(' ')[0]}</text>`:''}${bub&&s&&S[s]?[...Array(7)].map((_,i)=>`<circle cx="${150+i*16}" cy="${200-(i*17%60)}" r="5" fill="#fff" stroke="#8ec9ff"/>`).join(''):''}
  ${acid&&s?`<path d="M260 140 H400 V230" stroke="#1b2a4a" stroke-width="3" fill="none"/>`:''}<path d="M360 130 V250 Q360 265 375 265 H495 Q510 265 510 250 V130" fill="none" stroke="#1b2a4a" stroke-width="4"/><rect x="363" y="170" width="144" height="93" fill="${mil?'#e9e4d8':'#e8f3fb'}"/><text x="435" y="115" text-anchor="middle" font-size="13" font-weight="800">limewater ${mil?'→ MILKY':'(clear)'}</text>`)}
 q('#so').querySelectorAll('button').forEach(b=>b.onclick=()=>{s=b.dataset.k;acid=false;bub=false;mil=false;q('#so').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');q('#rs').textContent='';draw()});
 q('#ad').onclick=()=>{if(!s)return api.coach('warn','Choose a solid','Pick a solid first.');acid=true;bub=true;draw();q('#rs').textContent=S[s]?'🫧 It fizzes. A gas is made.':'Nothing happens. No gas.'};
 q('#lw').onclick=()=>{if(!acid)return api.coach('warn','Add acid first','You need a gas to pass.');mil=!!S[s];draw();q('#rs').textContent=S[s]?'Limewater turns milky: the gas is carbon dioxide.':'Limewater stays clear: no CO₂.';log.add(s);if(!chal){const t=q('#tl');if(t)t.textContent=log.size;if(log.size>=4&&[...log].some(k=>!S[k])){api.award('did');api.ready()}}};
 if(chal)q('#gs').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='C'?api.solved():api.nope('Limewater turning milky is the standard test for carbon dioxide.'));
 draw()},
why:['<b>Carbonates and hydrogencarbonates</b> react with acids to give <b>carbon dioxide</b>, a salt and water. Example: NaHCO₃ + HCl → NaCl + H₂O + CO₂.','Carbon dioxide turns <span class="word">limewater</span> (calcium hydroxide solution) <b>milky</b> because insoluble calcium carbonate forms.','Salt (NaCl) and sand contain no carbonate, so they give no gas.','So the limewater test, after adding acid, identifies a carbonate.'],
check:[{q:'Which gas turns limewater milky?',options:['O₂','H₂','CO₂','N₂'],answer:2,why:'CO₂ forms insoluble calcium carbonate.',hint:'You made it fizz out of baking soda.'},
 {q:'Which solid gives no gas with acid?',options:['Chalk','Baking soda','Salt','Washing soda'],answer:2,why:'Salt has no carbonate.',hint:'Not a carbonate.'},
 {q:'Baking soda + HCl gives…',options:['Salt, water and CO₂','Only salt','Only water','Hydrogen'],answer:0,why:'NaHCO₃ + HCl → NaCl + H₂O + CO₂.',hint:'Fizz.'}],
challenge:{text:'The gas from baking soda and acid turned limewater milky. <b>Name the gas.</b>',win:'Carbon dioxide.'},
real:['Baking soda makes cakes rise by releasing CO₂ in the heat.','Antacids neutralise acid and give off CO₂, so you burp.','Marble and limestone buildings are damaged by acid rain.'],
words:{Limewater:'Calcium hydroxide solution, used to test for CO₂.',Carbonate:'A salt containing CO₃.',Fizzing:'Bubbles of gas being released.','Test for CO₂':'Turns limewater milky.'}
});
