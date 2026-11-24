QLab.register({
id:'c10_metalacid',code:'10-C3',title:'Metals and acid: how fast do they fizz?',grade:10,subject:'Chemistry',emoji:'🫧',
hook:{title:'Drop different metals in dilute acid. Some fizz wildly. Some do nothing.',text:'The fizz is hydrogen gas. How fast it forms tells you how reactive the metal is.'},
prior:'You know acids and the reactivity series.',
guess:{q:'A metal reacts with dilute hydrochloric acid and gives bubbles. The gas is…',options:['Oxygen','Carbon dioxide','Hydrogen','Chlorine'],answer:2,hint:'Metal + acid → salt + hydrogen.',after:'Test the metals.'},
build(api){
 const L=QLab.lab,chal=!!api.challenge,sc=L.scene(api.stage,{alt:'Test tubes of dilute hydrochloric acid and metal strips on a lab bench'}),PT=sc.portrait;
 const M=[['Magnesium','Mg',10,'#cfd4dc'],['Zinc','Zn',5,'#a9b4c0'],['Iron','Fe',2,'#7e8591'],['Copper','Cu',0,'#c9773c'],['Silver','Ag',0,'#e8ecf2']];
 const SALT={Mg:'MgCl₂',Zn:'ZnCl₂',Fe:'FeCl₂'};
 const seen=new Set();let popped=0;
 const list=chal?[M[2],M[0],M[1]]:M,n=list.length;
 const tx=i=>PT?210+(i-(n-1)/2)*(chal?100:78):380+(i-(n-1)/2)*(chal?150:112);
 const V=list.map((m,i)=>sc.vessel({x:tx(i),y:PT?340:300,type:'tube',h:PT?130:150,level:.6,color:'#eaf6ff',label:chal?m[1]:'HCl',data:{m}}));
 const fizz=(v,m,ms)=>{const r=m[2];if(!r)return;v.bubbles(ms,Math.round(r*(ms/90)),'#ffffff');if(r>=5)v.glow('#ffb347',true)};
 const mark=(v,m)=>{L.E('rect',{x:-9,y:-14,width:18,height:6,rx:2,fill:m[3],stroke:'#6b7684','stroke-width':1.2},v.g)};
 if(chal){V.forEach(v=>{mark(v,v.data.m);const m=v.data.m,r=m[2],iv=setInterval(()=>{if(!v.g.isConnected)return clearInterval(iv);v.bubbles(1500,Math.round(r*11),'#ffffff')},1600);v.bubbles(1500,Math.round(r*11),'#ffffff')});
  sc.say('Look at the bubbles. Which tube fizzes fastest?')}
 else{
 M.forEach((m,i)=>sc.tool({x:PT?45+i*66:130+i*100,y:PT?470:368,label:m[1],ly:30,draw:(g)=>{g.innerHTML=`<rect x="-24" y="-9" width="48" height="18" rx="5" fill="${m[3]}" stroke="#6b7684" stroke-width="2"/><rect x="-19" y="-6" width="32" height="4" rx="2" fill="#fff" opacity=".6"/>`},
  use:async(v,T)=>{sc.deselect();if(v.data.used){sc.say('That tube already has a metal. Use a fresh one.');L.snd.no();return}
   v.data.used=m;mark(v,m);const r=m[2];seen.add(m[1]);
   if(r){v.data.gas=true;fizz(v,m,r>=5?5000:3500);sc.say(`${m[0]}: ${r>=10?'very fast':r>=5?'steady':'slow'} fizz. That gas is hydrogen.`,'ok');L.snd.ok()}
   else{sc.say(`${m[0]}: no bubbles. It does not react with the acid.`);L.snd.no()}
   await sc.sleep(900)}}));
 sc.tool({x:PT?45+5*66:130+5*100-10,y:PT?470:368,label:'Flame',ly:30,draw:(g,D)=>D.splint(g),use:async(v)=>{sc.deselect();
   if(!v.data.gas){sc.say(v.data.used?'No gas here to test.':'Put a metal in this tube first.');L.snd.no();return}
   L.snd.pop();sc.flash(v.x,v.y-v.h,'#ffe27a',22);popped++;sc.say(`Squeaky pop: hydrogen! ${v.data.used[1]} + 2HCl → ${SALT[v.data.used[1]]} + H₂`,'ok');
   await sc.sleep(700);if(seen.size>=5&&popped>=1){api.award('did');api.ready()}}});
 sc.say('Drag a metal into a tube of acid. Then try the flame on the gas.');
 api.ctrl.innerHTML=`<p class="lockhint" style="margin:0;text-align:left">Test all 5 metals and pop the gas once to unlock the next step. Tubes are used once: reload the experiment for fresh tubes.</p>`}
 if(chal){let ord=[];api.ctrl.innerHTML=`<p><b>Tap the metals from the FASTEST fizz to the slowest:</b></p><div class="row" id="rk">${['Iron','Magnesium','Zinc'].map(k=>`<button data-r="${k}">${k}</button>`).join('')}</div><p id="ro"></p>`;
  api.ctrl.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{if(ord.includes(b.dataset.r))return;ord.push(b.dataset.r);b.disabled=true;api.ctrl.querySelector('#ro').textContent=ord.join(' → ');if(ord.length===3){ord.join()==='Magnesium,Zinc,Iron'?api.solved():(api.nope('Mg bubbles fastest, then Zn, then Fe.'),ord=[],api.ctrl.querySelector('#ro').textContent='',api.ctrl.querySelectorAll('[data-r]').forEach(x=>x.disabled=false))}})}
},
why:['Metals above hydrogen in the reactivity series react with dilute acid: <b>metal + acid → salt + hydrogen</b>.','The more reactive the metal, the <b>faster the fizz</b>: Mg is fast, Zn steady, Fe slow.','Copper and silver are below hydrogen, so they <b>do not react</b> with dilute acid.','Hydrogen is tested with a burning splint: it burns with a <b>squeaky pop</b>.'],
check:[{q:'Which metal gives the fastest fizz?',options:['Iron','Zinc','Magnesium','Copper'],answer:2,why:'Magnesium is the most reactive here.',hint:'Compare bubbles.'},
 {q:'Which metal does NOT react with dilute HCl?',options:['Zinc','Iron','Copper','Magnesium'],answer:2,why:'Copper is below hydrogen.',hint:'No bubbles.'},
 {q:'The gas formed gives a…',options:['Milky limewater','Squeaky pop','Rotten egg smell','Blue flame in air only'],answer:1,why:'Hydrogen burns with a squeaky pop.',hint:'Pop test.'}],
challenge:{text:'Order these three metals from the <b>fastest</b> to the <b>slowest</b> fizz.',win:'Magnesium, then zinc, then iron. It matches the reactivity series.'},
real:['Never store acids in metal tanks that react with them.','Hydrogen from metal and acid fuels some rockets.','Silver and gold jewellery is safe from acids such as lemon juice.'],
words:{Hydrogen:'A light, flammable gas.','Reactivity series':'Metals from most to least reactive.',Fizz:'Bubbles of gas.',Salt:'The other product of metal + acid.'}
});
