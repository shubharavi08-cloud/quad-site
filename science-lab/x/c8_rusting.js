QLab.register({
id:'c8_rusting',code:'8-C5',title:'Rusting tubes: what makes iron rust?',grade:8,subject:'Chemistry',emoji:'🔩',
hook:{title:'Iron gates rust. Why do some rust faster, and can rust be stopped?',text:'Five test tubes each hold an iron nail in different conditions. Let the days pass and see which nails rust.'},
prior:'You have seen a rusty iron object.',
guess:{q:'What does iron need to rust?',options:['Only water','Only air','Both air (oxygen) and water','Neither: it rusts by itself'],answer:2,hint:'Iron in a dry desert rusts very slowly. Iron under water with no air also does not.',after:'Run the tubes and see.'},
build(api){
 const chal=!!api.challenge;
 const T=[['A','Dry air','Dry air (no water)',0],['B','Boiled water + oil','Boiled water with oil on top (no air)',0],['C','Air + water','Tap water with air',1],['D','Salt water','Salty water with air',2],['E','Painted nail','Painted nail in air + water',0]];
 let day=0,pick=new Set();
 api.ctrl.innerHTML=`<label for="dy">Day: <span id="dv"></span></label><input id="dy" type="range" min="0" max="7" value="0">${chal?'<p><b>Tick the tubes where the nail WILL rust, then check.</b></p><div class="row" id="pk">'+T.map(t=>`<button data-k="${t[0]}" aria-pressed="false">${t[0]}</button>`).join('')+'</div><button class="pri" id="ck">Check my answer</button>':'<p id="inf" style="font-size:14px;color:#55688a"></p>'}`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(reveal){const show=!chal||reveal;
  api.stage.innerHTML=QLab.svg(760,320,`<rect width="760" height="320" fill="#fff"/>${T.map((t,i)=>{const x=60+i*136,r=show?Math.min(1,(t[3]*day)/(t[3]===2?5:7)):0,col=`rgb(${Math.round(160+r*0)},${Math.round(165-r*85)},${Math.round(170-r*120)})`;
   const water=t[0]==='A'?'#fff':t[0]==='B'?'#cde9f9':'#cde9f9';
   return `<g><path d="M${x} 60 V250 Q${x} 265 ${x+15} 265 H${x+75} Q${x+90} 265 ${x+90} 250 V60" fill="none" stroke="#1b2a4a" stroke-width="4"/><rect x="${x+3}" y="${t[0]==='A'?250:120}" width="84" height="${t[0]==='A'?12:143}" fill="${water}" opacity=".85"/>${t[0]==='B'?`<rect x="${x+3}" y="116" width="84" height="10" fill="#f1c84b"/>`:''}${t[0]==='A'?`<text x="${x+45}" y="256" font-size="11" text-anchor="middle">dry</text>`:''}
   <rect x="${x+38}" y="${t[0]==='A'?100:90}" width="14" height="150" rx="5" fill="${col}" stroke="${t[0]==='E'?'#2aa5d8':'#555'}" stroke-width="${t[0]==='E'?5:2}"/>
   <text x="${x+45}" y="292" text-anchor="middle" font-size="14" font-weight="800">${t[0]}</text><text x="${x+45}" y="310" text-anchor="middle" font-size="10">${t[1]}</text></g>`}).join('')}`);
  q('#dv').textContent=day+(day===1?' day':' days');if(!chal){const ru=T.filter(t=>t[3]&&day>=4).map(t=>t[0]);q('#inf').textContent=day<4?'Slide to day 4 or more and look at the nails.':'Rust on tube '+ru.join(' and ')+'. Tube D (salty) rusts fastest.';if(day>=6){api.award('did');api.ready()}}}
 q('#dy').oninput=e=>{day=+e.target.value;draw(false)};
 if(chal){q('#dy').style.display='none';q('label[for=dy]').style.display='none';q('#pk').querySelectorAll('button').forEach(b=>b.onclick=()=>{const k=b.dataset.k;pick.has(k)?pick.delete(k):pick.add(k);b.setAttribute('aria-pressed',pick.has(k));b.className=pick.has(k)?'pri':''});
  q('#ck').onclick=()=>{const need=['C','D'];const ok=need.every(x=>pick.has(x))&&pick.size===2;day=7;draw(true);ok?api.solved():api.nope('Rust needs both air AND water. Tubes C and D have both. Dry air, no air, or a paint coat all protect the nail.')}}
 draw(false);if(chal)q('#dv').textContent='after 7 days'},
why:['Iron rusts only when it touches <b>both oxygen (air) and water</b>. Rust is a new substance, so rusting is a chemical change.','Tube A (dry air) and tube B (no air) stay clean. Tube C (air and water) rusts. Tube D rusts <b>faster</b> because salt speeds it up.','Paint blocks air and water from reaching the iron, so tube E stays clean until the paint is scratched.','Rust crumbles and weakens iron. That is why we protect iron with paint, oil, grease or a zinc coat (<span class="word">galvanising</span>).'],
check:[{q:'Which tube rusts the fastest?',options:['Dry air','Salt water with air','Painted nail','Boiled water with oil'],answer:1,why:'Salt makes rusting faster. This is why cars rust quickly near the sea.',hint:'Look at tube D.'},
 {q:'Why did the nail in boiled water with oil stay clean?',options:['Oil is hot','There was no air (oxygen) in it','There was no iron','Boiling kills rust'],answer:1,why:'Boiling removes dissolved air and oil stops more from entering.',hint:'What does iron need besides water?'},
 {q:'How does paint protect iron?',options:['It adds oxygen','It blocks air and water','It makes iron colder','It dissolves rust'],answer:1,why:'Paint stops air and water touching the iron.',hint:'Think of a barrier.'}],
challenge:{text:'Without looking, <b>predict</b> which two tubes will rust. Pick them, then check after 7 days.',win:'Rust needs both air and water. C and D are the ones with both.'},
real:['Bridges and gates are painted so they do not rust.','Iron vessels near the sea rust faster because of salt.','Galvanised iron sheets have a zinc coat to protect them.'],
words:{Rust:'Hydrated iron oxide, the reddish-brown flaky layer on iron.',Galvanising:'Coating iron with zinc.',Corrosion:'Slow damage of metal by air and water.',Oxygen:'The gas in air that makes iron rust.'}
});
