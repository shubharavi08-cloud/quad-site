QLab.register({
id:'c10_metalacid',code:'10-C3',title:'Metals and acid: how fast do they fizz?',grade:10,subject:'Chemistry',emoji:'🫧',
hook:{title:'Drop different metals in dilute acid. Some fizz wildly. Some do nothing.',text:'The fizz is hydrogen gas. How fast it forms tells you how reactive the metal is.'},
prior:'You know acids and the reactivity series.',
guess:{q:'A metal reacts with dilute hydrochloric acid and gives bubbles. The gas is…',options:['Oxygen','Carbon dioxide','Hydrogen','Chlorine'],answer:2,hint:'Metal + acid → salt + hydrogen.',after:'Test the metals.'},
build(api){
 const chal=!!api.challenge;
 const M={Magnesium:[10,'MgCl₂'],Zinc:[5,'ZnCl₂'],Iron:[2,'FeCl₂'],Copper:[0,''],Silver:[0,'']};
 let m=null,t=0,seen=new Set(),ord=[];
 api.ctrl.innerHTML=chal?`<p><b>Click the metals from the FASTEST fizz to the slowest (the ones that react):</b></p><div class="row" id="rk">${['Iron','Magnesium','Zinc'].map(k=>`<button data-r="${k}">${k}</button>`).join('')}</div><p id="ro"></p>`:`<div class="row" id="mm" style="flex-wrap:wrap">${Object.keys(M).map(k=>`<button data-m="${k}">${k}</button>`).join('')}</div><button class="pri" id="go2">▶ Add to dilute HCl</button> <button id="pop">🔥 Pop test (lit splint)</button><p id="rs" style="font-weight:800"></p>`;
 const q=x=>api.ctrl.querySelector(x);
 function draw(){const r=m?M[m][0]:0;api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/><path d="M300 90 V245 Q300 260 315 260 H445 Q460 260 460 245 V90" fill="none" stroke="#1b2a4a" stroke-width="5"/><rect x="303" y="130" width="154" height="128" fill="#e8f3fb" opacity=".9"/>${m?`<rect x="360" y="210" width="40" height="40" rx="6" fill="#aab4be" stroke="#555"/>`:''}${t&&r?[...Array(r*3)].map((_,i)=>`<circle cx="${315+(i*37%120)}" cy="${240-(i*53%100)}" r="${3+(i%3)}" fill="#fff" stroke="#8ec9ff"/>`).join(''):''}<text x="380" y="40" text-anchor="middle" font-size="18" font-weight="800">${m?m+' in dilute HCl':'Choose a metal'}</text>`)}
 if(!chal){q('#mm').querySelectorAll('button').forEach(b=>b.onclick=()=>{m=b.dataset.m;t=0;q('#mm').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');q('#rs').textContent='';draw()});
  q('#go2').onclick=()=>{if(!m)return;t=1;draw();const r=M[m][0];q('#rs').textContent=r>7?'Very fast fizz!':r>3?'Steady fizz.':r>0?'Slow fizz.':'No bubbles at all. No reaction.';seen.add(m)};
  q('#pop').onclick=()=>{if(!m||!t)return;q('#rs').textContent=M[m][0]?'🔥 Squeaky pop: hydrogen! '+m+' + 2HCl → '+M[m][1]+' + H₂':'No gas to test.';if(seen.size>=5){api.award('did');api.ready()}}}
 else q('#rk').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(ord.includes(b.dataset.r))return;ord.push(b.dataset.r);b.disabled=true;q('#ro').textContent=ord.join(' → ');if(ord.length===3){ord.join()==='Magnesium,Zinc,Iron'?api.solved():(api.nope('Mg fizzes fastest, then Zn, then Fe. Try again.'),ord=[],q('#ro').textContent='',q('#rk').querySelectorAll('button').forEach(x=>x.disabled=false))}});
 draw()},
why:['Metals above hydrogen in the reactivity series react with dilute acid: <b>metal + acid → salt + hydrogen</b>.','The more reactive the metal, the <b>faster the fizz</b>: Mg is fast, Zn steady, Fe slow.','Copper and silver are below hydrogen, so they <b>do not react</b> with dilute acid.','Hydrogen is tested with a burning splint: it burns with a <b>squeaky pop</b>.'],
check:[{q:'Which metal gives the fastest fizz?',options:['Iron','Zinc','Magnesium','Copper'],answer:2,why:'Magnesium is the most reactive here.',hint:'Compare bubbles.'},
 {q:'Which metal does NOT react with dilute HCl?',options:['Zinc','Iron','Copper','Magnesium'],answer:2,why:'Copper is below hydrogen.',hint:'No bubbles.'},
 {q:'The gas formed gives a…',options:['Milky limewater','Squeaky pop','Rotten egg smell','Blue flame in air only'],answer:1,why:'Hydrogen burns with a squeaky pop.',hint:'Pop test.'}],
challenge:{text:'Order these three metals from the <b>fastest</b> to the <b>slowest</b> fizz.',win:'Magnesium, then zinc, then iron. It matches the reactivity series.'},
real:['Never store acids in metal tanks that react with them.','Hydrogen from metal and acid fuels some rockets.','Silver and gold jewellery is safe from acids such as lemon juice.'],
words:{Hydrogen:'A light, flammable gas.','Reactivity series':'Metals from most to least reactive.',Fizz:'Bubbles of gas.',Salt:'The other product of metal + acid.'}
});
