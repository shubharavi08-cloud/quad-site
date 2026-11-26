QLab.register({
id:'c8_solubility',code:'8-C2',title:'Does it dissolve? The solubility tester',grade:8,subject:'Chemistry',emoji:'🧪',
hook:{title:'Sugar disappears in water. Does sand? Does oil?',text:'Test different things in water and in oil, and sort them into soluble and insoluble.'},
prior:'Know what stirring a spoon of sugar into water looks like.',
guess:{q:'Which of these will dissolve in water?',options:['Sand','Chalk powder','Sugar','Cooking oil'],answer:2,hint:'You stir this into tea.',after:'Test them all yourself.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'Two beakers, one of water and one of cooking oil, with jars of substances to try'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const WS={sugar:[1,'#fff'],salt:[1,'#fff'],sand:[0,'#d9b86a'],chalk:[0,'#f3f3ee'],'baking soda':[1,'#fff'],vinegar:[1,'#f0e6c8'],'copper sulphate':[1,'#2a7fff'],ghee:[0,'#f5d96b'],'mustard oil':[0,'#e8b82a']};
 const OS={ghee:1,'mustard oil':1};
 const list=chal?['sugar','sand','copper sulphate','chalk','ghee']:Object.keys(WS);
 const by=P?300:310,bw=P?140:150,bh=P?130:140,mx1=P?110:200,mx2=P?290:440;
 const jW=sc.vessel({x:mx1,y:by,type:'beaker',w:bw,h:bh,level:.6,color:'#cde9f9',label:'Water'});
 const jO=sc.vessel({x:mx2,y:by,type:'beaker',w:bw,h:bh,level:.6,color:'#f5e29a',label:'Cooking oil'});
 if(chal){jO.g.style.opacity=.35}
 const gD=E('g',{},sc.gMain),gT=E('g',{},sc.gMain);const log={};let busy=false;
 const dissolves=(it,sv)=>sv==='water'?WS[it][0]:(OS[it]?1:0);
 const clearOne=sv=>{gD.querySelectorAll('.'+sv).forEach(e=>e.remove());(sv==='water'?jW:jO).setColor(sv==='water'?'#cde9f9':'#f5e29a',300)};
 function table(){gT.innerHTML='';const ks=Object.keys(log);const t=ks.length?ks.slice(-4).map(k=>(log[k]?'✅ ':'❌ ')+k).join('  '):'Drag a jar onto a beaker';T(gT,W/2,P?by+70:96,t,{'font-size':P?10:12,fill:'#2b2350','font-weight':800,class:''})}
 sc.test=async(it,sv)=>{if(busy)return;if(chal&&sv==='oil')sv='water';busy=true;clearOne(sv);const v=sv==='water'?jW:jO,x=v.x,x0=x-bw/2+12,x1=x+bw/2-12,yb=by-12,top=by-bh*.6+8,d=dissolves(it,sv);
  const n=10,els=[];for(let i=0;i<n;i++){const c=E('circle',{class:sv,r:5,cx:x-20+Math.random()*40,cy:top-60-Math.random()*20,fill:WS[it][1],stroke:'#0004','stroke-width':1,style:'transition:cy .9s ease-in'},gD);els.push(c);setTimeout(()=>c.setAttribute('cy',yb-Math.random()*8),30+i*50)}
  L.snd.drop&&L.snd.drop();await sc.sleep(1100);
  const sp=E('text',{class:sv,x,y:top-8,'text-anchor':'middle','font-size':26},gD);sp.textContent='🥄';for(let k=0;k<4;k++){sp.setAttribute('x',x+(k%2?-22:22));await sc.sleep(260)}sp.remove();
  if(d){els.forEach(c=>{c.style.transition='opacity 1.2s';c.style.opacity=0});if(WS[it][1]==='#2a7fff'&&sv==='water')v.setColor('#8ec9ff',1200);await sc.sleep(1300);els.forEach(c=>c.remove());sc.say(`✅ ${it} dissolves in ${sv}. It is soluble.`,'ok')}
  else{if(it==='ghee'||it==='mustard oil'){els.forEach((c,i)=>{c.style.transition='cy 1s,opacity 1s';c.setAttribute('cy',top+6+(i%3)*4);c.setAttribute('cx',x-30+i*6)});await sc.sleep(1100)}sc.say(`❌ ${it} does not dissolve in ${sv}. It is insoluble.`,'warn')}
  log[it+' in '+sv]=!!d;table();
  if(chal){if(it==='copper sulphate'&&sv==='water'){L.snd.ok&&L.snd.ok();api.solved()}else api.nope('Not yet. Which substance gives a clear blue liquid? Try each and look at the beaker.')}
  else if(Object.keys(log).length>=7&&new Set(Object.values(log)).size===2){api.award('did');api.ready()}
  busy=false};
 sc.clear=()=>{if(busy)return;gD.innerHTML='';jW.setColor('#cde9f9',200);jO.setColor('#f5e29a',200);sc.say('Both beakers are clean.')};
 const half=Math.ceil(list.length/2);
 list.forEach((it,i)=>{const row=P?(i<5?0:1):0,col=P?(i<5?i:i-5):i;sc.tool({x:P?44+col*80:96+col*72,y:P?(row?512:440):374,label:it.split(' ')[0],ly:30,scale:.72,draw:g=>{E('rect',{x:-13,y:-4,width:26,height:26,rx:6,fill:WS[it][1],stroke:'#5a6a85','stroke-width':2.5},g);E('rect',{x:-6,y:-12,width:12,height:9,fill:'#7a5cf0'},g)},use:v=>sc.test(it,v===jO?'oil':'water')})});
 table();
 api.ctrl.innerHTML=`<p style="margin:0 0 6px;font-size:14px">${chal?'<b>Find the substance that gives a clear blue liquid in water.</b> Drag a jar onto the beaker.':'<b>Drag a jar onto the water or the oil beaker.</b> Does it dissolve?'}</p><div class="row" style="flex-wrap:wrap">${list.map(x=>`<button data-i="${x}">${x}</button>`).join('')}</div><div class="row"><button id="wo">Test in 💧 water</button>${chal?'':'<button id="oo">Test in 🫒 oil</button>'}<button id="cl">Clean beakers</button></div>${chal?'':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Test 7 mixtures, including some that dissolve and some that do not.</p>'}`;
 let sel=list[0];const q=s=>api.ctrl.querySelector(s);api.ctrl.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{sel=b.dataset.i;api.ctrl.querySelectorAll('[data-i]').forEach(x=>x.className=x===b?'pri':'');sc.say(`${sel} selected. Press a test button or drag the jar.`)});
 q('#wo').onclick=()=>sc.test(sel,'water');if(!chal)q('#oo').onclick=()=>sc.test(sel,'oil');q('#cl').onclick=()=>sc.clear();
 sc.say(chal?'Which jar turns the water blue?':'Drag a jar onto a beaker, then watch.')},
demo:[[S=>S.test('sugar','water'),'Sugar in water: it vanishes. It dissolves.',500],[S=>S.test('sand','water'),'Sand in water: it just sinks. It does not dissolve.',500],[S=>S.test('ghee','water'),'Ghee floats on water. Not soluble.',500],[S=>S.test('ghee','oil'),'But ghee dissolves in oil! The solvent matters.',500]],
why:['A substance that dissolves is <b>soluble</b>. One that does not is <b>insoluble</b>.','Sugar, salt, baking soda, vinegar and copper sulphate dissolve in water. Sand, chalk and oils do not.','Solubility depends on <b>both</b> the substance and the solvent. Ghee and oil dissolve in oil but not in water.','A rule of thumb: <i>like dissolves like</i>. Water mixes with water-loving things, oil with oil-like things.'],
check:[{q:'Sand is stirred into water. We say sand is…',options:['Soluble','Insoluble','Saturated','A solvent'],answer:1,why:'It does not dissolve, so it is insoluble.',hint:'Did the sand disappear?'},
 {q:'Which pair mixes completely?',options:['Oil and water','Ghee and cooking oil','Sand and water','Chalk and water'],answer:1,why:'Ghee is oil-like, so it dissolves in oil.',hint:'Test ghee in the oil.'},
 {q:'Copper sulphate dissolves in water to make…',options:['A clear colourless liquid','A blue solution','A white powder','A gas'],answer:1,why:'Copper sulphate gives a blue solution.',hint:'Look at the colour of the beaker.'}],
challenge:{text:'Make a <b>clear blue solution</b>. Choose the right substance and solvent, then stir.',win:'Copper sulphate dissolves in water to make a bright blue solution.'},
real:['Salt and sugar dissolve in water, so you can cook with them.','Oil paint is cleaned with turpentine, not water, because oil does not dissolve in water.','Medicines are made as syrups or tablets that dissolve in your body.'],
words:{Soluble:'Can dissolve.',Insoluble:'Cannot dissolve.',Solute:'The thing that dissolves.',Solvent:'The liquid that dissolves it.'}
});
