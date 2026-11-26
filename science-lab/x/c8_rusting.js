QLab.register({
id:'c8_rusting',code:'8-C5',title:'Rusting tubes: what makes iron rust?',grade:8,subject:'Chemistry',emoji:'🔩',
hook:{title:'Iron gates rust. Why do some rust faster, and can rust be stopped?',text:'Five test tubes each hold an iron nail in different conditions. Let the days pass and see which nails rust.'},
prior:'You have seen a rusty iron object.',
guess:{q:'What does iron need to rust?',options:['Only water','Only air','Both air (oxygen) and water','Neither: it rusts by itself'],answer:2,hint:'Iron in a dry desert rusts very slowly. Iron under water with no air also does not.',after:'Run the tubes and see.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A rack of five test tubes each holding an iron nail in different conditions, with a calendar to move time on'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const T=(g,x,y,t,o)=>{const q=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},o||{}),g);q.textContent=t;return q};
 const TB=[['A','Dry air',0,0,'#fff'],['B','Boiled water + oil',0,.62,'#cde9f9'],['C','Air + water',1,.62,'#cde9f9'],['D','Salt water',2,.62,'#bfe0ee'],['E','Painted nail',0,.62,'#cde9f9']];
 const ty=P?320:290,th=150,gN=E('g',{},sc.gMain);
 const vs=TB.map((t,i)=>sc.vessel({x:P?50+i*80:130+i*125,y:ty,type:'tube',w:36,h:th,level:t[3],color:t[4],label:t[0],data:{k:t[0]}}));
 sc.gMain.appendChild(gN);
 let day=0,busy=false;const pick=new Set();
 const rate=t=>t[2]===2?1/5:t[2]===1?1/7:0;
 function draw(reveal){gN.innerHTML='';TB.forEach((t,i)=>{const v=vs[i],x=v.x,show=!chal||reveal,r=show?Math.min(1,rate(t)*day):0,col=`rgb(${Math.round(160+r*40)},${Math.round(165-r*95)},${Math.round(170-r*130)})`;
   if(t[0]==='B')E('rect',{x:x-16,y:ty-th*t[3]-4,width:32,height:8,fill:'#f1c84b',opacity:.9},gN);
   if(t[0]==='A')T(gN,x,ty-14,'dry',{'font-size':10});
   E('rect',{x:x-6,y:ty-(t[0]==='A'?118:130),width:12,height:112,rx:5,fill:col,stroke:t[0]==='E'?'#2aa5d8':'#555','stroke-width':t[0]==='E'?4:2},gN);
   if(r>.3)for(let k=0;k<Math.round(r*6);k++)E('circle',{cx:x-12+(k%2)*24,cy:ty-30-k*14,r:3,fill:'#b4562a',opacity:.8},gN);
   T(gN,x,ty+(P?54:56),['Dry air','No air','Air + water','Salty','Painted'][i],{'font-size':P?9:11,'font-weight':800,class:''});
   if(chal&&pick.has(t[0])){E('circle',{cx:x,cy:ty-th-16,r:12,fill:'#ffd9c8',stroke:'#e5484d','stroke-width':3},gN);T(gN,x,ty-th-11,'R',{'font-size':13,'font-weight':900,fill:'#c0281d',class:''})}});
  gN.appendChild(E('text',{x:W/2,y:P?100:98,'text-anchor':'middle',class:'lkhint','font-size':16,'font-weight':900,fill:'#2b2350'}));gN.lastChild.textContent=chal?'after 7 days':`Day ${day}`}
 sc.time=async d=>{if(busy)return;busy=true;const a=day,b2=Math.min(7,a+d),st=performance.now(),dur=1400;L.snd.tick&&L.snd.tick();await new Promise(res=>{const f=n=>{const k=Math.min(1,(n-st)/dur);day=a+(b2-a)*k;draw();k<1?requestAnimationFrame(f):res()};requestAnimationFrame(f)});day=b2;draw();
  if(day>=4){const ru=TB.filter(t=>t[2]&&day>=4).map(t=>t[0]);sc.say(`Rust on tube ${ru.join(' and ')}. Tube D (salty) rusts fastest.`,'ok')}else sc.say('Time passes. Look closely at the nails.');
  if(!chal&&day>=6){api.award('did');api.ready()}busy=false};
 sc.mark=k=>{if(!chal)return;pick.has(k)?pick.delete(k):pick.add(k);L.snd.pop&&L.snd.pop();draw()};
 sc.check=()=>{day=7;draw(true);const ok=['C','D'].every(x=>pick.has(x))&&pick.size===2;if(ok){L.snd.ok&&L.snd.ok();sc.say('Right! Rust needs both air AND water. Salt makes it faster.','ok');api.solved()}else{const m='Rust needs both air AND water. Tubes C and D have both. Dry air, no air, or a paint coat all protect the nail.';L.snd.no&&L.snd.no();sc.say(m,'warn');api.nope(m);day=0;pick.clear();api.ctrl.querySelectorAll('[data-k]').forEach(b=>b.className='');draw(false)}};
 if(chal){vs.forEach(v=>{v.g.style.cursor='pointer';v.g.addEventListener('click',()=>sc.mark(v.data.k))});
  sc.tool({x:P?60:120,y:P?492:384,label:'Rust tag',ly:30,scale:.9,draw:g=>{E('circle',{r:16,fill:'#ffd9c8',stroke:'#e5484d','stroke-width':3},g);T(g,0,5,'R',{'font-size':15,'font-weight':900,fill:'#c0281d',class:''})},use:v=>sc.mark(v.data.k)});
  sc.tool({x:P?190:260,y:P?492:384,label:'Check',ly:30,scale:.9,draw:g=>{E('rect',{x:-13,y:-16,width:26,height:32,rx:4,fill:'#fff',stroke:'#5a6a85','stroke-width':2.5},g);T(g,0,6,'✔',{'font-size':18,fill:'#2e9d5b',class:''})},use:()=>sc.check()})}
 else sc.tool({x:P?60:100,y:P?492:384,label:'+2 days',ly:30,scale:1,draw:g=>{E('rect',{x:-18,y:-16,width:36,height:32,rx:5,fill:'#fff',stroke:'#5a6a85','stroke-width':3},g);E('rect',{x:-18,y:-16,width:36,height:10,rx:3,fill:'#e5484d'},g);T(g,0,10,'7',{'font-size':15,'font-weight':900,class:''})},use:()=>sc.time(2)});
 draw(false);
 api.ctrl.innerHTML=chal?`<p style="margin:0 0 6px;font-size:14px"><b>Which nails WILL rust?</b> Tap a tube, or drag the rust tag onto it. Then Check.</p><div class="row" style="flex-wrap:wrap">${TB.map(t=>`<button data-k="${t[0]}">${t[0]}</button>`).join('')}<button class="pri" id="ck">✔ Check</button></div>`:`<p style="margin:0 0 6px;font-size:14px"><b>Drag the calendar onto a tube</b> to move time on. Which nails rust?</p><div class="row"><button class="pri" id="d2">📅 +2 days</button><button id="d7">⏩ To day 7</button></div><p class="lockhint" style="margin:6px 0 0;text-align:left">Let time pass to day 6 or more to unlock the next step.</p>`;
 if(chal){api.ctrl.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{sc.mark(b.dataset.k);b.className=pick.has(b.dataset.k)?'pri':''});api.ctrl.querySelector('#ck').onclick=()=>sc.check()}
 else{api.ctrl.querySelector('#d2').onclick=()=>sc.time(2);api.ctrl.querySelector('#d7').onclick=()=>sc.time(7)}
 sc.say(chal?'Which tubes have both air and water?':'Five nails, five conditions. Move time on.')},
demo:[[S=>S.time(3),'Three days pass. Tube D (salty) starts to rust first.',900],[S=>S.time(4),'A week later, tubes C and D are rusty. A, B and E are clean.',900]],
why:['Iron rusts only when it touches <b>both oxygen (air) and water</b>. Rust is a new substance, so rusting is a chemical change.','Tube A (dry air) and tube B (no air) stay clean. Tube C (air and water) rusts. Tube D rusts <b>faster</b> because salt speeds it up.','Paint blocks air and water from reaching the iron, so tube E stays clean until the paint is scratched.','Rust crumbles and weakens iron. That is why we protect iron with paint, oil, grease or a zinc coat (<span class="word">galvanising</span>).'],
check:[{q:'Which tube rusts the fastest?',options:['Dry air','Salt water with air','Painted nail','Boiled water with oil'],answer:1,why:'Salt makes rusting faster. This is why cars rust quickly near the sea.',hint:'Look at tube D.'},
 {q:'Why did the nail in boiled water with oil stay clean?',options:['Oil is hot','There was no air (oxygen) in it','There was no iron','Boiling kills rust'],answer:1,why:'Boiling removes dissolved air and oil stops more from entering.',hint:'What does iron need besides water?'},
 {q:'How does paint protect iron?',options:['It adds oxygen','It blocks air and water','It makes iron colder','It dissolves rust'],answer:1,why:'Paint stops air and water touching the iron.',hint:'Think of a barrier.'}],
challenge:{text:'Without looking, <b>predict</b> which two tubes will rust. Pick them, then check after 7 days.',win:'Rust needs both air and water. C and D are the ones with both.'},
real:['Bridges and gates are painted so they do not rust.','Iron vessels near the sea rust faster because of salt.','Galvanised iron sheets have a zinc coat to protect them.'],
words:{Rust:'Hydrated iron oxide, the reddish-brown flaky layer on iron.',Galvanising:'Coating iron with zinc.',Corrosion:'Slow damage of metal by air and water.',Oxygen:'The gas in air that makes iron rust.'}
});
