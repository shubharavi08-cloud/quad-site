/* OSH Science Lab core: the recipe every experiment follows.
   Hook -> Guess -> Do -> See -> Why -> Check -> Challenge -> Real life -> Words */
const QLab=(()=>{
const REG={};let cur=null,st={};
const $=(s,r=document)=>r.querySelector(s);
const PK='qlab2_pts',P=(()=>{try{return JSON.parse(localStorage.getItem(PK)||'{}')}catch(e){return{}}})();
function award(k){if(P[k])return;P[k]=1;try{if(QLab.onAward)QLab.onAward(k)}catch(e){}try{localStorage.setItem(PK,JSON.stringify(P))}catch(e){}pts()}
const W=k=>{if(k.slice(0,2)==='h_')return /:did$/.test(k)?6:1;if(k.indexOf('game:')===0)return +k.split(':')[2]||10;const s=k.split(':')[1]||'';return s==='watch'||s==='did'||s==='challenge'?10:s==='done'?5:s==='guess'?2:/^q\d/.test(s)?4:1};
const total=()=>Object.keys(P).reduce((a,k)=>a+W(k),0);
const LEVELS=[[0,'Curious Kid'],[30,'Young Explorer'],[100,'Science Student'],[250,'Science Stream Star'],[500,'College Scientist'],[800,'Masters Scholar'],[1200,'Research Scholar'],[1700,'Scientist'],[2300,'Professor'],[3000,'Nobel Laureate']];
const level=()=>{const t=total();let l=LEVELS[0];LEVELS.forEach(x=>{if(t>=x[0])l=x});return l[1]};
function pts(){const e=$('#pts');if(e)e.innerHTML='⭐ '+total()+' points · '+level()}
const CHEER=['Good try!','So close!','Mistakes are how scientists learn.','You are getting there!','Nice thinking!'];let ci=0;
function coach(kind,title,html){const C=$('#coach');if(kind==='ok'&&QLab.fx)QLab.fx.burst(40);C.innerHTML=`<div class="coach ${kind}" role="status"><span class="ic" aria-hidden="true">${kind==='ok'?'🎉':kind==='warn'?'💡':'🔎'}</span><div><b>${title}</b><br>${html}</div></div>`}
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
function hook(){setBar(0);const e=cur;$('#body').innerHTML=watchCard(e)+`<div class="card"><div class="hook"><div class="em" aria-hidden="true">${e.emoji}</div><div style="flex:1;min-width:220px"><h2>${e.hook.title}</h2><p>${e.hook.text}</p>${e.prior?`<p><b>Before you start:</b> ${e.prior}</p>`:''}<button class="pri" id="go">Let's guess first →</button></div></div></div>`;$('#go').onclick=guess;$('#coach').innerHTML='';wireWatch(e)}

const vids=e=>(QLab.VIDEOS&&QLab.VIDEOS[e.id])||[];
function watchCard(e){const v=vids(e);if(!v.length)return '';const k=e.id+':watch';
  return `<div class="card watch"><h2>🎬 Watch first <small>${P[k]?'✅ +10 earned':'+10 points'}</small></h2><p>A short OSH video explains this idea. Watch it, then do the lab.</p><div id="vbox"><button class="pri" id="vplay">▶ Play: ${v[0].t}</button></div>${v.length>1?`<p class="vmore">More: ${v.slice(1).map((x,i)=>`<a href="#" data-v="${i+1}">${x.t}</a>`).join(' · ')}</p>`:''}<p id="vnote" class="lockhint" style="display:none"></p></div>`}
let ytP=null,ytT=null;
function loadYT(cb){if(window.YT&&YT.Player)return cb(true);let done=false;window.onYouTubeIframeAPIReady=()=>{done=true;cb(true)};const s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';s.onerror=()=>{if(!done)cb(false)};document.head.appendChild(s);setTimeout(()=>{if(!done)cb(false)},7000)}
function playVideo(e,idx){const v=vids(e)[idx],box=$('#vbox');if(!box)return;box.innerHTML='<div id="vframe"></div>';const note=$('#vnote'),k=e.id+':watch';
  const manual=()=>{note.style.display='';note.innerHTML=P[k]?'':'Finished watching? <button class="pri" id="vdone">I watched it (+10)</button>';const b=$('#vdone');if(b)b.onclick=()=>{award(k);pts();note.textContent='✅ +10 points for watching!'}};
  loadYT(ok=>{if(!ok||!$('#vframe')){box.innerHTML=`<p>The video could not load here. <a class="pri" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=${v.id}">Open it on YouTube</a></p>`;return manual()}
    clearInterval(ytT);ytP=new YT.Player('vframe',{videoId:v.id,width:'100%',playerVars:{rel:0,playsinline:1,modestbranding:1},events:{onReady:()=>{note.style.display='';note.textContent='Watch most of the video to earn +10 points.'},onStateChange:ev=>{if(ev.data===0){award(k);pts();note.textContent='✅ +10 points for watching!'}}}});
    ytT=setInterval(()=>{try{const d=ytP.getDuration(),t=ytP.getCurrentTime();if(d>20&&t/d>=.8&&!P[k]){award(k);pts();note.style.display='';note.textContent='✅ +10 points for watching!'}}catch(x){}},2000)})}
function wireWatch(e){const p=$('#vplay');if(!p)return;p.onclick=()=>playVideo(e,0);document.querySelectorAll('.vmore a').forEach(a=>a.onclick=ev=>{ev.preventDefault();playVideo(e,+a.dataset.v)})}
function guess(){clearInterval(ytT);setBar(1);const g=cur.guess;
  $('#body').innerHTML=`<div class="card"><h2>Guess first</h2><p>${g.q}</p><div class="opts">${g.options.map((o,i)=>`<button data-i="${i}">${o}</button>`).join('')}</div></div>`;
  document.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;
    if(i===g.answer){b.classList.add('right');award(cur.id+':guess');coach('ok','Great guess!',g.after||'Now let us test it.');setTimeout(doIt,900)}
    else{b.classList.add('try');coach('warn',CHEER[ci++%CHEER.length],'That is a good thought. '+(g.hint||'Try another one.'))}})}
function doIt(){setBar(2);const e=cur;
  $('#body').innerHTML=`<div class="lab"><div class="stage" id="stage" aria-label="Experiment"></div><div class="ctrl" id="ctrl"></div></div><p style="text-align:center"><button class="pri" id="seeBtn" disabled>I tried it. Show me why →</button></p><p class="lockhint" id="lockhint">🔒 This button unlocks after you try the lab above. Try several different options and watch what happens.</p>`;
  const api={stage:$('#stage'),ctrl:$('#ctrl'),coach,award:k=>award(cur.id+':'+k),ready(){$('#seeBtn').disabled=false;const lh=$('#lockhint');if(lh)lh.style.display='none';coach('info','Nice work!','Now press the purple button below: I tried it. Show me why.');try{$('#seeBtn').scrollIntoView({behavior:'smooth',block:'center'})}catch(e){}},state:st};
  e.build(api);$('#seeBtn').onclick=why}
function why(){setBar(4);const e=cur;
  $('#body').innerHTML=`<div class="card why"><h2>Why did that happen?</h2><ul>${e.why.map(x=>`<li>${x}</li>`).join('')}</ul><button class="pri" id="chk">Check yourself →</button></div>`;$('#chk').onclick=()=>check(0);$('#coach').innerHTML=''}
function check(i){setBar(5);const q=cur.check[i];
  if(!q){const n=cur.check.filter((_,j)=>P[cur.id+':q'+j]).length;coach('ok','Quiz done!','You earned '+n*4+' quiz points ('+n+' of '+cur.check.length+' questions).');return challenge()}
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
  $('#body').innerHTML=`<div class="card real"><h2>Where do we see this?</h2><ul>${e.real.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="card"><h2>Words to know</h2><dl class="gl">${Object.entries(e.words).map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div><div class="card trio"><h2>Keep learning this idea</h2><div class="trio-btns"><span class="pri on">🔬 Do the lab (you are here)</span>${(()=>{const v=vids(e);return v.length?`<a class="pri" href="https://www.youtube.com/watch?v=${v[0].id}" target="_blank" rel="noopener">🎬 Watch the video</a>`:lk(e,'watch','🎬 Watch the episode')})()}${lk(e,'read','📖 Read the comic chapter')}</div></div><p style="text-align:center"><button class="pri" id="fin">🎉 Finish</button> <a class="home" style="padding:12px 16px;border-radius:12px;background:var(--yellow);font-weight:800;color:var(--osh);text-decoration:none" href="#/">More experiments</a></p>`;
  $('#fin').onclick=()=>{award(cur.id+':done');coach('ok','Experiment complete!','You earned your stars. Pick another one.')};$('#coach').innerHTML=''}
function catalog(){
  const app=$('#app');const list=Object.values(REG);
  const grades=[...new Set(list.map(e=>e.grade))].sort((a,b)=>a-b),subs=[...new Set(list.map(e=>e.subject))];
  let fg='all',fs='all';
  function draw(){app.innerHTML=`<div class="top"><h1>OSH Science Lab</h1><span class="pts" id="pts"></span><a class="home" href="#/home">🏠 Home Lab</a> <a class="home" href="#/me">📒 My notebook</a> <a class="home" href="#/game">🎮 Mystery Lab game</a> <a class="home" href="#/career">🏅 Become a scientist</a> <a class="home" href="#/fields">🌍 Fields of science</a> <a class="home" href="/lab/">🧮 Maths Lab</a></div><p>Try real experiments on your screen. Guess first, then test it. No teacher needed.</p>${QLab.homeBanner?QLab.homeBanner():''}${QLab.loginCard?QLab.loginCard():''}
  <div class="chips" aria-label="Filter by grade"><button data-g="all" class="${fg==='all'?'on':''}">All grades</button>${grades.map(g=>`<button data-g="${g}" class="${fg==g?'on':''}">Grade ${g}</button>`).join('')}</div>
  <div class="chips" aria-label="Filter by subject"><button data-s="all" class="${fs==='all'?'on':''}">All subjects</button>${subs.map(s=>`<button data-s="${s}" class="${fs===s?'on':''}">${s}</button>`).join('')}</div>
  <div class="cat">${list.filter(e=>(fg==='all'||e.grade==fg)&&(fs==='all'||e.subject===fs)).map(e=>`<a class="tile sub-${e.subject}" href="#/x/${e.id}"><div class="em" aria-hidden="true">${e.emoji}</div><b>${e.title}</b><br><small>Grade ${e.grade} · ${e.subject}</small><br><span class="bdg">${vids(e).length?(P[e.id+':watch']?'🎬✅':'🎬'):''} ${P[e.id+':did']?'🔬✅':'🔬'} ${P[e.id+':q2']?'❓✅':'❓'}</span></a>`).join('')}</div>`;
  pts();app.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{fg=b.dataset.g;draw()});app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{fs=b.dataset.s;draw()})}
  draw()}
function route(){if(!/^#\/(home|h\/)/.test(location.hash))document.body.classList.remove('homebody');if(/^#\/home/.test(location.hash)&&QLab.home)return QLab.home();const hm=location.hash.match(/^#\/h\/([\w-]+)/);if(hm&&QLab.homeAct)return QLab.homeAct(hm[1]);const m=location.hash.match(/#\/x\/([\w-]+)/);if(location.hash==='#/me'&&QLab.me)return QLab.me();if(location.hash==='#/game'&&QLab.game)return QLab.game();if(location.hash==='#/career'&&QLab.career)return QLab.career();if(location.hash==='#/fields'&&QLab.fields)return QLab.fields();m?open(m[1]):catalog()}
addEventListener('hashchange',route);
return{W,P,total,level,LEVELS,pts,award,register,route,svg:(w,h,inner)=>`<svg viewBox="0 0 ${w} ${h}" role="img"><defs><linearGradient id="qkWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfeeff"/><stop offset="1" stop-color="#fff6d6"/></linearGradient><linearGradient id="qkBench" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d79a"/><stop offset="1" stop-color="#e7b56a"/></linearGradient><pattern id="qkTile" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="3"/></pattern></defs><rect width="${w}" height="${h}" fill="url(#qkWall)"/><rect width="${w}" height="${h*.86}" fill="url(#qkTile)"/><rect y="${h*.86}" width="${w}" height="${h*.14}" fill="url(#qkBench)"/><rect y="${h*.86-3}" width="${w}" height="6" fill="#c88a3c" opacity=".6"/>${inner}</svg>`,$,REG};
})();
