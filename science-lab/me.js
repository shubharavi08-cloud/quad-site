/* My notebook: scientist ID card (photo + biodata), points, badges, progress, backup code. Saved on this device only. */
(()=>{
const Q=QLab,$=(s,r=document)=>r.querySelector(s);
const MK='qlab2_me';
const load=()=>{try{return JSON.parse(localStorage.getItem(MK)||'{}')}catch(e){return{}}};
const save=m=>{try{localStorage.setItem(MK,JSON.stringify(m))}catch(e){}};
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// card designs unlock with levels
const DESIGNS=[
 {k:'green',lv:'Curious Cat',n:'Green Explorer',a:'#22c070',b:'#d9f7e4',c:'#ffc233',d:'🌿'},
 {k:'sunny',lv:'Lab Rookie',n:'Sunny Rookie',a:'#ff9a1f',b:'#fff1c9',c:'#6c4cf0',d:'☀️'},
 {k:'ocean',lv:'Science Student',n:'Ocean Scientist',a:'#19b5e8',b:'#dff5ff',c:'#ff4d9d',d:'🐠'},
 {k:'rocket',lv:'Lab Hero',n:'Rocket Hero',a:'#ff4d9d',b:'#ffe0f0',c:'#6c4cf0',d:'🚀'},
 {k:'galaxy',lv:'College Scientist',n:'Galaxy Master',a:'#6c4cf0',b:'#e9e2ff',c:'#ffc233',d:'🌌'}];
const lvIdx=()=>Q.LEVELS.findIndex(l=>l[1]===Q.level());
const code=()=>btoa(unescape(encodeURIComponent(JSON.stringify({me:Object.assign(load(),{photo:undefined}),P:Q.P,g:JSON.parse(localStorage.getItem('qlab2_game')||'{}'),a:JSON.parse(localStorage.getItem('qlab2_ach')||'{}')}))));
function restore(s){try{const o=JSON.parse(decodeURIComponent(escape(atob(s.trim()))));if(!o||typeof o!=='object')return false;Object.keys(o.P||{}).forEach(k=>{Q.P[k]=1});localStorage.setItem('qlab2_pts',JSON.stringify(Q.P));save(Object.assign(load(),o.me||{}));if(o.g)localStorage.setItem('qlab2_game',JSON.stringify(o.g));if(o.a)localStorage.setItem('qlab2_ach',JSON.stringify(o.a));return true}catch(e){return false}}
const stickers=()=>Object.values(Q.REG).filter(e=>Q.P[e.id+':did']).map(e=>e.emoji);
const bdgIcons=()=>{let g={};try{g=JSON.parse(localStorage.getItem('qlab2_ach')||'{}')}catch(e){}return (Q.ACH||[]).filter(a=>g[a.id]).map(a=>a.i)};
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function drawCard(cv,m,done){const D=DESIGNS.find(d=>d.k===(m.design||'green'))||DESIGNS[0],W=720,H=1060;cv.width=W;cv.height=H;const g=cv.getContext('2d');
  g.fillStyle=D.a;g.fillRect(0,0,W,H);
  for(let i=0;i<14;i++){g.globalAlpha=.18;g.fillStyle='#fff';g.beginPath();g.arc((i*173)%W,(i*271)%H,30+(i%4)*14,0,7);g.fill()}g.globalAlpha=1;
  g.fillStyle='#fff';rr(g,28,28,W-56,H-56,44);g.fill();g.fillStyle=D.b;rr(g,28,28,W-56,170,44);g.fill();g.fillRect(28,120,W-56,78);
  g.textAlign='center';g.fillStyle='#2b2350';g.font='800 40px "OSH Logo",Montserrat,sans-serif';g.fillText('OurSchoolHouse ID',W/2,98);g.font='800 26px ui-rounded,system-ui,sans-serif';g.fillStyle=D.a;g.fillText(D.d+' '+D.n+' '+D.d,W/2,150);
  const cx=W/2,cy=330,R=120;g.fillStyle=D.c;g.beginPath();g.arc(cx,cy,R+12,0,7);g.fill();
  const finish=()=>{
    g.fillStyle='#2b2350';g.font='900 54px ui-rounded,system-ui,sans-serif';g.fillText((m.name||'Young Scientist').slice(0,16),cx,520);
    g.fillStyle=D.a;g.font='800 30px ui-rounded,system-ui,sans-serif';g.fillText(Q.level()+'  ·  ⭐ '+Q.total(),cx,566);
    const rows=[['Class',m.cls?'Class '+m.cls:''],['From',m.city],['I want to be',m.dream],['Favourite subject',m.subj],['Hobby',m.hobby]].filter(r=>r[1]);
    g.textAlign='left';let y=626;rows.forEach(r=>{g.fillStyle='#6a5f8e';g.font='700 24px ui-rounded,system-ui,sans-serif';g.fillText(r[0],80,y);g.fillStyle='#2b2350';g.font='800 28px ui-rounded,system-ui,sans-serif';g.fillText(String(r[1]).slice(0,22),300,y);y+=46});
    g.textAlign='center';const bi=bdgIcons().slice(-6);g.font='54px ui-rounded,system-ui,sans-serif';bi.forEach((s,i)=>g.fillText(s,cx-(bi.length-1)*38+i*76,Math.max(y+40,880)));
    const st=(m.stick||[]).slice(0,6);g.font='40px ui-rounded,system-ui,sans-serif';st.forEach((s,i)=>g.fillText(s,cx-(st.length-1)*30+i*60,Math.max(y+100,940)));
    g.fillStyle='#6a5f8e';g.font='800 22px "OSH Logo",Montserrat,sans-serif';g.fillText('Labs done: '+stickers().length+'   ·   OurSchoolHouse Science Lab',cx,1008);
    done&&done()};
  if(m.photo){const im=new Image();im.onload=()=>{g.save();g.beginPath();g.arc(cx,cy,R,0,7);g.clip();g.drawImage(im,cx-R,cy-R,2*R,2*R);g.restore();finish()};im.onerror=()=>{g.font='150px ui-rounded,system-ui,sans-serif';g.fillText(m.avatar||'🧑‍🔬',cx,cy+50);finish()};im.src=m.photo}
  else{g.fillStyle='#fff';g.beginPath();g.arc(cx,cy,R,0,7);g.fill();g.font='150px ui-rounded,system-ui,sans-serif';g.fillStyle='#000';g.fillText(m.avatar||'🧑‍🔬',cx,cy+50);finish()}}
function photoFrom(file,cb){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(im.width,im.height),c=document.createElement('canvas');c.width=c.height=260;c.getContext('2d').drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,260,260);cb(c.toDataURL('image/jpeg',.82))};im.src=r.result};r.readAsDataURL(file)}
Q.me=function(){const m=load();const app=$('#app');const li=lvIdx();
 const list=Object.values(Q.REG);const nextL=Q.LEVELS.find(l=>l[0]>Q.total());const st=stickers();
 const cardOpen=Q.total()>=30;
 app.innerHTML=`<div class="top"><a class="home" href="#/">← All experiments</a><h1>📒 My notebook</h1><span class="pts" id="pts"></span></div>
 <div class="card"><h2>🧑‍🔬 My scientist ID card</h2>${cardOpen?`
 <div id="cvw"><canvas id="cv" style="width:100%;max-width:340px;border-radius:22px;margin:6px auto 10px;display:block;box-shadow:0 8px 0 #ffd0e8"></canvas></div>
 <p class="lockhint" style="text-align:left">🔒 Your photo and details stay on THIS device. Use your first name only. Never put a phone number or home address.</p>
 <div class="row"><button class="pri" id="ph1">📷 Take photo</button><button class="pri" id="ph2">🖼️ Choose photo</button>${m.photo?'<button id="ph0">Remove photo</button>':''}</div>
 <input type="file" id="f1" accept="image/*" capture="user" hidden><input type="file" id="f2" accept="image/*" hidden>
 <b>My first name</b><input id="nm" class="inp" maxlength="16" placeholder="First name" value="${esc(m.name)}">
 <b>My class</b><div class="row" id="cls" style="flex-wrap:wrap">${[1,2,3,4,5,6,7,8,9,10,11,12].map(c=>`<button data-c="${c}" class="${String(m.cls)===String(c)?'pri':''}" style="flex:0 0 auto;min-width:52px">${c}</button>`).join('')}</div>
 <b>My city (optional)</b><input id="ct" class="inp" maxlength="20" placeholder="Example: Bengaluru" value="${esc(m.city)}">
 <b>When I grow up I want to be…</b><input id="dr" class="inp" maxlength="22" placeholder="Example: Space scientist" value="${esc(m.dream)}">
 <b>My favourite subject</b><div class="row" id="sj" style="flex-wrap:wrap">${['Science','Maths','English','Art','Sports'].map(s=>`<button data-s="${s}" class="${m.subj===s?'pri':''}" style="flex:0 0 auto">${s}</button>`).join('')}</div>
 <b>My hobby</b><input id="hb" class="inp" maxlength="22" placeholder="Example: Drawing" value="${esc(m.hobby)}">
 <b>Card design <small>(new designs unlock as you level up)</small></b><div class="row" id="ds" style="flex-wrap:wrap">${DESIGNS.map((d,i)=>`<button data-d="${d.k}" ${i>li?'disabled':''} class="${(m.design||'green')===d.k?'pri':''}" style="flex:0 0 auto">${i>li?'🔒 ':d.d+' '}${d.n}</button>`).join('')}</div>
 <b>Picture if no photo</b><div class="row" id="av" style="flex-wrap:wrap">${['🧑‍🔬','👩‍🔬','🦉','🐱','🦁','🚀','🤖','🌟'].map(a=>`<button data-a="${a}" class="${(m.avatar||'🧑‍🔬')===a?'pri':''}" style="flex:0 0 auto">${a}</button>`).join('')}</div>
 <b>Stickers I earned</b><div class="row" id="sk" style="flex-wrap:wrap">${st.length?st.map(s=>`<button data-k="${s}" class="${(m.stick||[]).includes(s)?'pri':''}" style="flex:0 0 auto">${s}</button>`).join(''):'<small>Finish an experiment lab to unlock stickers.</small>'}</div>
 <div class="row" style="margin-top:12px"><button class="pri" id="dl">💾 Save card</button><button class="pri" id="sh">📤 Share</button></div><p id="shn" class="lockhint"></p>`:`<p>🔒 Earn <b>30 points</b> to unlock your scientist ID card with your photo and details. You have ${Q.total()}.</p>`}</div>
 <div class="card"><h2>Points and levels</h2><p><a class="pri" href="#/career" style="display:inline-block;padding:8px 14px;border-radius:14px;text-decoration:none">🏅 See the scientist career path</a></p><p>${nextL?`Next level <b>${nextL[1]}</b> at ${nextL[0]} points (${nextL[0]-Q.total()} more).`:'You won the Nobel Prize! 🏆'}</p><p class="lockhint" style="text-align:left">🎬 watch the video +10 · 🔬 do the lab +10 · ❓ quiz +4 each · 🏆 challenge +10 · 🎮 missions +15 to +60</p></div>
 ${Q.loginCard?Q.loginCard():''}
 ${Q.achHTML?Q.achHTML():''}
 <div class="card"><h2>My progress</h2><div class="prog">${list.map(e=>`<a class="prow" href="#/x/${e.id}"><span>${e.emoji}</span><b>${e.title}</b><small>${(Q.VIDEOS&&Q.VIDEOS[e.id])?(Q.P[e.id+':watch']?'🎬✅':'🎬'):''} ${Q.P[e.id+':did']?'🔬✅':'🔬'} ${Q.P[e.id+':q2']?'❓✅':'❓'} ${Q.P[e.id+':challenge']?'🏆✅':'🏆'}</small></a>`).join('')}</div></div>
 <div class="card"><h2>Keep my points safe</h2><p>Points are saved on this phone. To move them to another device, copy this code and paste it there (your photo does not move).</p><textarea id="cd" class="inp" rows="3" readonly></textarea><div class="row"><button id="cp">📋 Copy code</button></div><b>Restore from a code</b><textarea id="rc" class="inp" rows="2" placeholder="Paste your code here"></textarea><button id="rs">Restore</button><p id="rn" class="lockhint"></p></div>`;
 Q.pts();$('#cd').value=code();
 const set=(k,v)=>{const o=load();o[k]=v;save(o);return o};
 $('#cp').onclick=()=>{$('#cd').select();try{navigator.clipboard.writeText($('#cd').value)}catch(e){document.execCommand('copy')}$('#rn').textContent='Copied.'};
 $('#rs').onclick=()=>{const ok=restore($('#rc').value);$('#rn').textContent=ok?'Restored. Reloading…':'That code did not work. Check you copied all of it.';if(ok)setTimeout(()=>Q.me(),600)};
 if(cardOpen){const cv=$('#cv');const re=()=>drawCard(cv,load());re();
  const again=()=>{const y=scrollY;Q.me();scrollTo(0,y)};
  [['#nm','name'],['#ct','city'],['#dr','dream'],['#hb','hobby']].forEach(([s,k])=>$(s).oninput=()=>{set(k,$(s).value);re()});
  $('#cls').onclick=e=>{const b=e.target.closest('[data-c]');if(b){set('cls',b.dataset.c);again()}};
  $('#sj').onclick=e=>{const b=e.target.closest('[data-s]');if(b){set('subj',b.dataset.s);again()}};
  $('#ds').onclick=e=>{const b=e.target.closest('[data-d]');if(b&&!b.disabled){set('design',b.dataset.d);again()}};
  $('#av').onclick=e=>{const b=e.target.closest('[data-a]');if(b){set('avatar',b.dataset.a);again()}};
  $('#sk').onclick=e=>{const b=e.target.closest('[data-k]');if(!b)return;const o=load();const a=new Set(o.stick||[]);a.has(b.dataset.k)?a.delete(b.dataset.k):a.add(b.dataset.k);o.stick=[...a].slice(0,6);save(o);again()};
  $('#ph1').onclick=()=>$('#f1').click();$('#ph2').onclick=()=>$('#f2').click();
  ['#f1','#f2'].forEach(s=>$(s).onchange=e=>{const f=e.target.files[0];if(f)photoFrom(f,d=>{set('photo',d);again()})});
  const p0=$('#ph0');if(p0)p0.onclick=()=>{const o=load();delete o.photo;save(o);again()};
  const blob=()=>new Promise(r=>cv.toBlob(r,'image/png'));
  $('#dl').onclick=async()=>{const b=await blob();const f=new File([b],'my-scientist-card.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:'My OSH scientist card'});return}catch(e){}}const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='my-scientist-card.png';a.click();$('#shn').textContent='If nothing downloaded, press and hold the card and choose Save.'};
  $('#sh').onclick=async()=>{const b=await blob();const f=new File([b],'my-scientist-card.png',{type:'image/png'});const txt='I am a '+Q.level()+' at the OSH Science Lab with '+Q.total()+' points! Try free: https://quadacademy.org/science-lab/';if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:txt});return}catch(e){}}window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank')}}
};
})();
