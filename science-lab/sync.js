/* OSH student login and points saving. Guests keep playing on their own device. */
(()=>{const Q=QLab;
const URL_=window.QLAB_SYNC_URL||'PENDING_SYNC_URL';
const LK='qlab2_login';
const ld=()=>{try{return JSON.parse(localStorage.getItem(LK)||'null')}catch(e){return null}};
const jg=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}};
const st={msg:'',busy:false,saved:null};
async function call(body){const r=await fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(body)});return r.json()}
function mine(){const me=Object.assign({},jg('qlab2_me')||{});delete me.photo;return me}
function merge(res){
  (res.keys||[]).forEach(k=>{Q.P[k]=1});localStorage.setItem('qlab2_pts',JSON.stringify(Q.P));
  const g=jg('qlab2_game')||{},rg=res.game||{};
  if(res.game){const own=[...new Set([...(g.own||[]),...(rg.own||[])])];const cleared=Object.assign({},rg.cleared||{},g.cleared||{});
    localStorage.setItem('qlab2_game',JSON.stringify(Object.assign({},rg,g,{own,cleared,spent:Math.max(g.spent||0,rg.spent||0)})))}
  if(res.ach){localStorage.setItem('qlab2_ach',JSON.stringify(Object.assign({},res.ach,jg('qlab2_ach')||{})))}
  if(res.me){localStorage.setItem('qlab2_me',JSON.stringify(Object.assign({},res.me,jg('qlab2_me')||{})))}
}
let t=null;
function save(){const L=ld();if(!L||URL_.startsWith('PENDING'))return;clearTimeout(t);t=setTimeout(async()=>{
  try{const r=await call({action:'save',id:L.id,pw:L.pw,keys:Object.keys(Q.P),total:Q.total(),game:jg('qlab2_game'),ach:jg('qlab2_ach'),me:mine()});st.saved=r.ok?new Date():null;if(r.ok)merge(r)}catch(e){st.saved=null}
  const b=document.getElementById('lgstat');if(b)b.textContent=st.saved?'✅ Points saved':'⚠️ Could not save. Will try again.'},1200)}
async function login(id,pw){
  if(URL_.startsWith('PENDING')){st.msg='Student login opens very soon!';return false}
  st.busy=true;st.msg='';
  try{const r=await call({action:'login',id,pw});
    if(!r.ok){st.msg=r.error||'Could not log in.';return false}
    localStorage.setItem(LK,JSON.stringify({id:id.trim().toLowerCase(),pw,name:r.name||''}));merge(r);
    const m=jg('qlab2_me')||{};if(r.name&&!m.name){m.name=r.name.split(' ')[0];localStorage.setItem('qlab2_me',JSON.stringify(m))}
    save();return true}
  catch(e){st.msg='No internet right now. Please try again.';return false}
  finally{st.busy=false}}
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
Q.loginCard=function(){const L=ld();
 if(L)return `<div class="card" id="lgc"><b>👋 Hi ${esc((L.name||L.id).split(' ')[0])}!</b> You are logged in as <b>${esc(L.id)}</b>. <small id="lgstat">${st.saved?'✅ Points saved':'Your points save automatically.'}</small> <button onclick="QLab.logout()">Log out</button></div>`;
 return `<div class="card" id="lgc"><h2>🔑 OSH student?</h2><p>Log in to keep your points, badges and card safe on any phone.</p><div id="lgform"><input id="lgi" class="inp" placeholder="Login ID" autocomplete="username" autocapitalize="none"><input id="lgp" class="inp" type="password" placeholder="Password" autocomplete="current-password"><button class="pri" onclick="QLab.doLogin()">Log in</button><p id="lgm" class="lockhint">${esc(st.msg)}</p></div><p class="lockhint" style="text-align:left">Do not have a login yet? Send a message on the <b>OSH chat box</b> or in the <b>OSH WhatsApp group</b> to get your login ID and password. Registered students also find them on their <b>student page</b>. No login? You can still play as a guest.</p></div>`};
Q.doLogin=async function(){const i=document.getElementById('lgi').value,p=document.getElementById('lgp').value,m=document.getElementById('lgm');
 if(!i.trim()||!p){m.textContent='Type your login ID and password.';return}
 m.textContent='Checking…';const ok=await login(i,p);if(ok){Q.route&&Q.route()}else m.textContent=st.msg};
Q.logout=function(){localStorage.removeItem(LK);st.saved=null;Q.route&&Q.route()};
const prev=Q.onAward;Q.onAward=k=>{prev&&prev(k);save()};
Q.syncNow=save;
window.addEventListener('pagehide',()=>{try{save()}catch(e){}});
})();
