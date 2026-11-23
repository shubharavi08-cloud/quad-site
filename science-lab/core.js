/* OSH Science Lab core: the recipe every experiment follows.
   Hook -> Guess -> Do -> See -> Why -> Check -> Challenge -> Real life -> Words */
const QLab=(()=>{
const REG={};let cur=null,st={};
const $=(s,r=document)=>r.querySelector(s);
const PK='qlab2_pts',P=(()=>{try{return JSON.parse(localStorage.getItem(PK)||'{}')}catch(e){return{}}})();
function award(k){if(P[k])return;P[k]=1;try{localStorage.setItem(PK,JSON.stringify(P))}catch(e){}pts()}
function pts(){const e=$('#pts');if(e)e.textContent='⭐ '+Object.keys(P).length+' points'}
const CHEER=['Good try!','So close!','Mistakes are how scientists learn.','You are getting there!','Nice thinking!'];let ci=0;
function coach(kind,title,html){const C=$('#coach');C.innerHTML=`<div class="coach ${kind}" role="status"><span class="ic" aria-hidden="true">${kind==='ok'?'🎉':kind==='warn'?'💡':'🔎'}</span><div><b>${title}</b><br>${html}</div></div>`}
function register(e){REG[e.id]=e}
const STEPS=['Hook','Guess','Do','See','Why','Check','Challenge','Real life'];
let maxS=0;
function bar(i){return `<div class="steps" aria-label="Steps">${STEPS.map((s,j)=>`<button type="button" data-j="${j}" class="${j<i?'done':j===i?'on':''}${j>maxS?' lock':''}">${j+1}. ${s}</button>`).join('')}</div>`}
function open(id){maxS=0;
  const e=REG[id];if(!e)return;cur=e;st={seen:false};
  const app=$('#app');
  app.innerHTML=`<div class="top"><a class="home" href="#/">← All experiments</a><h1>${e.title}</h1><span class="pts" id="pts"></span></div>${e.code?`<p class="strip">OSH Science Series · Concept ${e.code}</p>`:''}<div id="bar"></div><div id="coach" aria-live="polite"></div><div id="body"></div>`;
  pts();hook();
}
function setBar(i){maxS=Math.max(maxS,i);const b=$('#bar');b.innerHTML=bar(i);b.onclick=ev=>{const t=ev.target.closest('button[data-j]');if(!t)return;const j=+t.dataset.j;if(j>maxS)return coach('warn','Not yet','Finish the steps before it first. Do the lab, then this opens.');[hook,guess,doIt,why,why,()=>check(0),challenge,real][j]()}}
function hook(){setBar(0);const e=cur;$('#body').innerHTML=`<div class="card"><div class="hook"><div class="em" aria-hidden="true">${e.emoji}</div><div style="flex:1;min-width:220px"><h2>${e.hook.title}</h2><p>${e.hook.text}</p>${e.prior?`<p><b>Before you start:</b> ${e.prior}</p>`:''}<button class="pri" id="go">Let's guess first →</button></div></div></div>`;$('#go').onclick=guess;$('#coach').innerHTML=''}
function guess(){setBar(1);const g=cur.guess;
  $('#body').innerHTML=`<div class="card"><h2>Guess first</h2><p>${g.q}</p><div class="opts">${g.options.map((o,i)=>`<button data-i="${i}">${o}</button>`).join('')}</div></div>`;
  document.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;
    if(i===g.answer){b.classList.add('right');award(cur.id+':guess');coach('ok','Great guess!',g.after||'Now let us test it.');setTimeout(doIt,900)}
    else{b.classList.add('try');coach('warn',CHEER[ci++%CHEER.length],'That is a good thought. '+(g.hint||'Try another one.'))}})}
function doIt(){setBar(2);const e=cur;
  $('#body').innerHTML=`<div class="lab"><div class="stage" id="stage" aria-label="Experiment"></div><div class="ctrl" id="ctrl"></div></div><p style="text-align:center"><button class="pri" id="seeBtn" disabled>I tried it. Show me why →</button></p><p class="lockhint" id="lockhint">🔒 This button unlocks after you try the lab above. Try several different options and watch what happens.</p>`;
  const api={stage:$('#stage'),ctrl:$('#ctrl'),coach,award:k=>award(cur.id+':'+k),ready(){$('#seeBtn').disabled=false;const lh=$('#lockhint');if(lh)lh.style.display='none';coach('info','Nice work!','You can keep playing, or press the button to see why.')},state:st};
  e.build(api);$('#seeBtn').onclick=why}
function why(){setBar(4);const e=cur;
  $('#body').innerHTML=`<div class="card why"><h2>Why did that happen?</h2><ul>${e.why.map(x=>`<li>${x}</li>`).join('')}</ul><button class="pri" id="chk">Check yourself →</button></div>`;$('#chk').onclick=()=>check(0);$('#coach').innerHTML=''}
function check(i){setBar(5);const q=cur.check[i];
  if(!q)return challenge();
  $('#body').innerHTML=`<div class="card"><h2>Question ${i+1} of ${cur.check.length}</h2><p>${q.q}</p><div class="opts">${q.options.map((o,j)=>`<button data-i="${j}">${o}</button>`).join('')}</div></div>`;
  document.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{const j=+b.dataset.i;
    if(j===q.answer){b.classList.add('right');award(cur.id+':q'+i);coach('ok','Right!',q.why);setTimeout(()=>check(i+1),1100)}
    else{b.classList.add('try');coach('warn',CHEER[ci++%CHEER.length],q.hint||'Look at the experiment again and try once more.')}})}
function challenge(){setBar(6);const c=cur.challenge;
  $('#body').innerHTML=`<div class="card"><h2>Challenge</h2><p>${c.text}</p></div><div class="lab"><div class="stage" id="stage"></div><div class="ctrl" id="ctrl"></div></div><p style="text-align:center"><button class="pri" id="done" disabled>I did it! →</button></p>`;
  const api={stage:$('#stage'),ctrl:$('#ctrl'),coach,award:()=>{},ready(){},state:{},challenge:true,
    solved(){award(cur.id+':challenge');$('#done').disabled=false;coach('ok','Challenge complete!',c.win||'Brilliant.')},
    nope(msg){coach('warn',CHEER[ci++%CHEER.length],msg)}};
  cur.build(api);$('#done').onclick=real}
function lk(e,k,t){const u=e.links&&e.links[k];return u?`<a class="pri" href="${u}" target="_blank" rel="noopener">${t}</a>`:`<span class="pri soon">${t}: coming soon</span>`}
function real(){setBar(7);const e=cur;
  $('#body').innerHTML=`<div class="card real"><h2>Where do we see this?</h2><ul>${e.real.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="card"><h2>Words to know</h2><dl class="gl">${Object.entries(e.words).map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div><div class="card trio"><h2>Keep learning this idea</h2><div class="trio-btns"><span class="pri on">🔬 Do the lab (you are here)</span>${lk(e,'watch','🎬 Watch the episode')}${lk(e,'read','📖 Read the comic chapter')}</div></div><p style="text-align:center"><button class="pri" id="fin">🎉 Finish</button> <a class="home" style="padding:12px 16px;border-radius:12px;background:var(--yellow);font-weight:800;color:var(--osh);text-decoration:none" href="#/">More experiments</a></p>`;
  $('#fin').onclick=()=>{award(cur.id+':done');coach('ok','Experiment complete!','You earned your stars. Pick another one.')};$('#coach').innerHTML=''}
function catalog(){
  const app=$('#app');const list=Object.values(REG);
  const grades=[...new Set(list.map(e=>e.grade))].sort((a,b)=>a-b),subs=[...new Set(list.map(e=>e.subject))];
  let fg='all',fs='all';
  function draw(){app.innerHTML=`<div class="top"><h1>OSH Science Lab</h1><span class="pts" id="pts"></span></div><p>Try real experiments on your screen. Guess first, then test it. No teacher needed.</p>
  <div class="chips" aria-label="Filter by grade"><button data-g="all" class="${fg==='all'?'on':''}">All grades</button>${grades.map(g=>`<button data-g="${g}" class="${fg==g?'on':''}">Grade ${g}</button>`).join('')}</div>
  <div class="chips" aria-label="Filter by subject"><button data-s="all" class="${fs==='all'?'on':''}">All subjects</button>${subs.map(s=>`<button data-s="${s}" class="${fs===s?'on':''}">${s}</button>`).join('')}</div>
  <div class="cat">${list.filter(e=>(fg==='all'||e.grade==fg)&&(fs==='all'||e.subject===fs)).map(e=>`<a class="tile" href="#/x/${e.id}"><div class="em" aria-hidden="true">${e.emoji}</div><b>${e.title}</b><br><small>Grade ${e.grade} · ${e.subject}</small></a>`).join('')}</div>`;
  pts();app.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{fg=b.dataset.g;draw()});app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{fs=b.dataset.s;draw()})}
  draw()}
function route(){const m=location.hash.match(/#\/x\/([\w-]+)/);m?open(m[1]):catalog()}
addEventListener('hashchange',route);
return{register,route,svg:(w,h,inner)=>`<svg viewBox="0 0 ${w} ${h}" role="img">${inner}</svg>`,$,REG};
})();
