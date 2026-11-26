QLab.register({
id:'c10_circuit',code:'10-P7',title:'Bulbs in series and in parallel',grade:10,subject:'Physics',emoji:'💡',
hook:{title:'Why does one dead bulb in old fairy lights switch off the whole string?',text:'Bulbs can be joined one after another (series) or on separate branches (parallel). Add bulbs, unscrew them, and see what happens in each.'},
prior:'You know a battery, bulb and wire in a loop make a complete circuit.',
guess:{q:'Three bulbs are joined one after another (series). One bulb is unscrewed. The other two…',options:['stay lit','go out','get brighter','flicker'],answer:1,hint:'The current has only one path.',after:'Test series and parallel.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A battery with bulbs wired in series or in parallel, with an ammeter'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const ox=P?50:120,oy=P?150:120,cw=P?320:520,ch=P?240:200;
 let n=chal?3:2,mode='series',off=[],seen=new Set();const MAX=4;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const gC=E('g',{},sc.gMain);const slot=sc.vessel({x:ox+cw/2,y:oy+ch+30,type:'beaker',w:cw*.9,h:ch+60,level:0,color:'#fff',label:''});slot.g.style.opacity=0;sc.gMain.appendChild(gC);
 const lit=()=>{const o=Array.from({length:n},(_,i)=>off.includes(i));if(mode==='series')return o.some(x=>x)?[]:Array.from({length:n},(_,i)=>1/n);return o.map(x=>x?0:1)};
 function bulb(x,y,b,i){const gg=E('g',{style:'cursor:pointer'},gC);gg.addEventListener('click',()=>sc.toggle(i));
  if(b>0){E('circle',{cx:x,cy:y,r:34*(.6+.4*b),fill:'#fff59d',opacity:.35*b+.15},gg)}
  E('circle',{cx:x,cy:y,r:18,fill:b>0?`rgb(255,${Math.round(235-60*(1-b))},${Math.round(120-80*b)})`:off.includes(i)?'none':'#e9edf3',stroke:off.includes(i)?'#aab':'#555','stroke-width':3,'stroke-dasharray':off.includes(i)?'4 3':''},gg);
  if(!off.includes(i)){E('path',{d:`M${x-7} ${y+6} L${x-4} ${y-4} L${x} ${y+4} L${x+4} ${y-4} L${x+7} ${y+6}`,fill:'none',stroke:b>0?'#e07b00':'#888','stroke-width':2},gg);E('rect',{x:x-9,y:y+16,width:18,height:9,rx:2,fill:'#777'},gg)}
  else T(gg,x,y+5,'✕',{'font-size':16,fill:'#c0281d',class:''});E('rect',{x:x-24,y:y-24,width:48,height:54,fill:'transparent'},gg)}
 function draw(){gC.innerHTML='';const br=lit(),tot=mode==='series'?(br.length?1/n:0):br.reduce((a,b)=>a+b,0);
  const w=(d)=>E('path',{d,fill:'none',stroke:'#1b2a4a','stroke-width':4,'stroke-linejoin':'round'},gC);
  if(mode==='series'){w(`M${ox} ${oy} H${ox+cw} V${oy+ch} H${ox} Z`);for(let i=0;i<n;i++)bulb(ox+cw*(i+1)/(n+1),oy,br.length?br[i]:0,i)}
  else{w(`M${ox} ${oy} H${ox+cw} M${ox} ${oy+ch} H${ox+cw} M${ox} ${oy} V${oy+ch} M${ox+cw} ${oy} V${oy+ch}`);for(let i=0;i<n;i++){const x=ox+cw*(i+1)/(n+1);w(`M${x} ${oy} V${oy+ch}`);E('rect',{x:x-24,y:oy+ch/2-22,width:48,height:46,fill:'#fff6e0'},gC);bulb(x,oy+ch/2,br[i],i)}}
  // battery
  E('rect',{x:ox-14,y:oy+ch/2-22,width:28,height:44,fill:'#fffaf0'},gC);E('rect',{x:ox-14,y:oy+ch/2-22,width:28,height:44,rx:5,fill:'#ffb347',stroke:'#1b2a4a','stroke-width':3},gC);T(gC,ox,oy+ch/2+6,'6V',{'font-size':14,'font-weight':900,class:''});
  // ammeter
  const ax=ox+cw,ay=oy+ch/2;E('circle',{cx:ax,cy:ay,r:24,fill:'#fff',stroke:'#1b2a4a','stroke-width':4},gC);T(gC,ax,ay-2,'A',{'font-size':13,'font-weight':900,class:''});T(gC,ax,ay+14,tot.toFixed(2),{'font-size':12,'font-weight':900,fill:'#4b3fd1',class:''});
  T(gC,P?W/2:ox+cw/2,P?126:oy-14,mode==='series'?'SERIES: one path':'PARALLEL: separate branches',{'font-size':P?14:17,'font-weight':900,fill:'#4b3fd1',class:''});
  api.ctrl.querySelectorAll('[data-m]').forEach(b=>b.className=b.dataset.m===mode?'pri':'');
  const c=api.ctrl.querySelector('#fl');if(c){const t=[['ds','Series: more bulbs → dimmer'],['dp','Parallel: more bulbs → same brightness'],['os','Series: remove one → all out'],['op','Parallel: remove one → others stay']];c.innerHTML=t.map(x=>`<span style="display:inline-block;margin:2px 8px 2px 0;font-size:13px">${seen.has(x[0])?'✅':'⬜'} ${x[1]}</span>`).join('')}}
 function flag(k){if(chal||seen.has(k))return;seen.add(k);if(seen.size===4){api.award('did');api.ready();sc.say('Series: one path, one break stops all. Parallel: each bulb on its own branch, like house wiring.','ok')}}
 sc.add=()=>{if(n>=MAX){sc.say('That is enough bulbs for this board.','warn');return}n++;L.snd.pop&&L.snd.pop();draw();if(n>=3||true)flag(mode==='series'?'ds':'dp');sc.say(mode==='series'?'More bulbs in series share the push: all get dimmer. Current drops.':'Each branch gets the full 6 V: brightness unchanged. Total current rises.')};
 sc.rm=()=>{if(n<=1)return;n--;off=off.filter(i=>i<n);draw()};
 sc.toggle=i=>{if(i>=n)return;off.includes(i)?off=off.filter(x=>x!==i):off.push(i);L.snd.pop&&L.snd.pop();draw();if(off.includes(i))flag(mode==='series'?'os':'op');sc.say(off.includes(i)?(mode==='series'?'Circuit broken: every bulb goes out.':'Only that branch is broken: the others stay lit.'):'Bulb screwed back in.')};
 sc.mode=m=>{mode=m;off=[];L.snd.pop&&L.snd.pop();draw();sc.say(m==='series'?'Series: bulbs one after another.':'Parallel: each bulb on its own branch.')};
 sc.check=()=>{if(mode==='parallel'&&n===3)api.solved();else api.nope(mode!=='parallel'?'In series, one failed bulb breaks the only path and all go out. Switch to parallel.':'You need exactly three bulbs. Add or remove.')};
 sc.tool({x:P?60:W*.12,y:P?492:384,label:'Bulb',ly:P?32:34,scale:P?.8:.95,draw:g=>{E('circle',{cx:0,cy:-4,r:15,fill:'#fff59d',stroke:'#555','stroke-width':3},g);E('rect',{x:-8,y:10,width:16,height:9,rx:2,fill:'#777'},g)},use:()=>sc.add()});
 api.ctrl.innerHTML=chal?'<p style="margin:0 0 6px;font-size:14px"><b>Wire 3 bulbs</b> so that if one burns out the other two stay lit (like home wiring).</p><div class="row"><button data-m="series">Series</button><button data-m="parallel">Parallel</button><button id="rmb">− Bulb</button><button class="pri" id="ck">Test one bulb failing</button></div>'
  :'<p style="margin:0 0 4px;font-size:14px"><b>Drag a bulb</b> in to add it. <b>Tap a bulb</b> to unscrew it. Switch wiring below.</p><div class="row"><button data-m="series">Series</button><button data-m="parallel">Parallel</button><button id="rmb">− Bulb</button></div><div id="fl"></div>';
 api.ctrl.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>sc.mode(b.dataset.m));api.ctrl.querySelector('#rmb').onclick=()=>sc.rm();if(chal)api.ctrl.querySelector('#ck').onclick=()=>sc.check();
 draw();sc.say(chal?'Which wiring keeps the others lit?':'Two bulbs in series. Drag another bulb in.')},
demo:[[S=>S.add(),'A third bulb in series: all dimmer.',1100],[S=>S.toggle(0),'Unscrew one: all go out.',1100],[S=>S.toggle(0),'Screw it back.',700],[S=>S.mode('parallel'),'Now parallel.',900],[S=>S.toggle(0),'Unscrew one: the rest stay lit.',1100]],
why:['<span class="word">Series</span>: one path. Same current through every bulb. Voltage is shared, so more bulbs means dimmer bulbs. One break stops everything.','<span class="word">Parallel</span>: several paths. Each bulb gets the full battery voltage and stays equally bright. Total current is the sum of the branch currents.','Houses are wired in parallel so each appliance works on its own and gets the full 230 V.','Old fairy lights were in series: one dead bulb turned off the whole string.'],
check:[{q:'Bulbs in series. One fails. The others…',options:['stay lit','go out','get brighter','flicker'],answer:1,why:'The circuit is broken; there is one path only.',hint:'One path.'},
 {q:'Why are house appliances connected in parallel?',options:['It is cheaper','Each works independently on full voltage','They use less power','Wires are shorter'],answer:1,why:'Each branch gets full voltage and can be switched alone.',hint:'Switch the fan without turning off the light.'},
 {q:'Adding more identical bulbs in series makes each bulb…',options:['brighter','dimmer','the same','explode'],answer:1,why:'The battery push is shared among more bulbs.',hint:'You saw it.'}],
challenge:{text:'Wire <b>3 bulbs</b> so that if one burns out, the other two stay lit.',win:'Parallel wiring: each bulb has its own branch.'},
real:['Home wiring is parallel.','Festival string lights often have bulbs that bypass a dead one.','Power strips are parallel.'],
words:{Series:'Components one after another on a single path.',Parallel:'Components on separate branches from the same two points.',Current:'The flow of electric charge (A).','Open circuit':'A circuit with a break, so no current flows.'}
});
