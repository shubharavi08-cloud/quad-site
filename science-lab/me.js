/* My notebook: student name, points, progress, science card builder, backup code. Saved on this device. */
(()=>{
const Q=QLab,$=(s,r=document)=>r.querySelector(s);
const MK='qlab2_me';
const load=()=>{try{return JSON.parse(localStorage.getItem(MK)||'{}')}catch(e){return{}}};
const save=m=>{try{localStorage.setItem(MK,JSON.stringify(m))}catch(e){}};
const THEMES={Indigo:['#4b3fd1','#ffb347'],Sky:['#1b7fb3','#ffe27a'],Green:['#1f8a5b','#ffd166'],Sunset:['#d6452f','#ffd9a0']};
const code=()=>btoa(unescape(encodeURIComponent(JSON.stringify({me:load(),P:Q.P}))));
function restore(s){try{const o=JSON.parse(decodeURIComponent(escape(atob(s.trim()))));if(!o||typeof o!=='object')return false;Object.keys(o.P||{}).forEach(k=>{Q.P[k]=1});localStorage.setItem('qlab2_pts',JSON.stringify(Q.P));save(Object.assign(load(),o.me||{}));return true}catch(e){return false}}
function stickers(){return Object.values(Q.REG).filter(e=>Q.P[e.id+':did']).map(e=>e.emoji)}
function drawCard(cv,m){const T=THEMES[m.theme||'Indigo'],W=720,H=1000;cv.width=W;cv.height=H;const g=cv.getContext('2d');
  g.fillStyle=T[0];g.fillRect(0,0,W,H);g.fillStyle='#fff';g.beginPath();g.roundRect?g.roundRect(30,30,W-60,H-60,36):g.rect(30,30,W-60,H-60);g.fill();
  g.fillStyle=T[1];g.fillRect(30,30,W-60,150);g.fillStyle='#1b2a4a';g.font='900 44px system-ui,sans-serif';g.textAlign='center';g.fillText('OSH SCIENCE LAB',W/2,100);g.font='700 26px system-ui,sans-serif';g.fillText('Young Scientist Card',W/2,145);
  g.font='140px system-ui,sans-serif';g.fillText(m.avatar||'🧑‍🔬',W/2,340);
  g.fillStyle='#1b2a4a';g.font='900 56px system-ui,sans-serif';g.fillText((m.name||'Young Scientist').slice(0,18),W/2,430);
  g.fillStyle=T[0];g.font='800 34px system-ui,sans-serif';g.fillText(Q.level(),W/2,485);
  g.fillStyle='#1b2a4a';g.font='700 30px system-ui,sans-serif';g.fillText('⭐ '+Q.total()+' points',W/2,540);
  const st=(m.stick||[]).slice(0,6);g.font='72px system-ui,sans-serif';st.forEach((s,i)=>g.fillText(s,W/2-(st.length-1)*45+i*90,650));
  g.fillStyle='#1b2a4a';g.font='600 28px system-ui,sans-serif';const f=(m.fact||'').slice(0,90);const words=f.split(' ');let line='',y=740;words.forEach(w=>{if((line+w).length>30){g.fillText(line,W/2,y);y+=40;line=''}line+=w+' '});g.fillText(line,W/2,y);
  g.font='600 24px system-ui,sans-serif';g.fillStyle='#55688a';g.fillText('Experiments done: '+stickers().length,W/2,900);g.fillText('Try free: quadacademy.org/science-lab',W/2,940)}
Q.me=function(){const m=load();const app=$('#app');const st=stickers();
 const list=Object.values(Q.REG);const nextL=Q.LEVELS.find(l=>l[0]>Q.total());
 app.innerHTML=`<div class="top"><a class="home" href="#/">← All experiments</a><h1>📒 My notebook</h1><span class="pts" id="pts"></span></div>
 <div class="card"><h2>Who is the scientist?</h2><input id="nm" class="inp" maxlength="18" placeholder="Your first name" value="${(m.name||'').replace(/"/g,'')}"><p>${nextL?`Next level <b>${nextL[1]}</b> at ${nextL[0]} points (${nextL[0]-Q.total()} more).`:'You are a Master Scientist!'}</p><p class="lockhint" style="text-align:left">Each experiment gives points: 🎬 watch the video +10, 🔬 do the lab +10, ❓ quiz +4 each, 🏆 challenge +10.</p></div>
 ${Q.achHTML?Q.achHTML():''}
 <div class="card"><h2>My progress</h2><div class="prog">${list.map(e=>`<a class="prow" href="#/x/${e.id}"><span>${e.emoji}</span><b>${e.title}</b><small>${(Q.VIDEOS&&Q.VIDEOS[e.id])?(Q.P[e.id+':watch']?'🎬✅':'🎬'):''} ${Q.P[e.id+':did']?'🔬✅':'🔬'} ${Q.P[e.id+':q2']?'❓✅':'❓'} ${Q.P[e.id+':challenge']?'🏆✅':'🏆'}</small></a>`).join('')}</div></div>
 <div class="card"><h2>Build my science card</h2>${Q.total()<30?`<p>🔒 Earn <b>30 points</b> to unlock the card builder. You have ${Q.total()}.</p>`:`<p>Pick a picture, colour and stickers. Every experiment you finish unlocks a new sticker.</p>
 <b>My picture</b><div class="row" id="av">${['🧑‍🔬','👩‍🔬','🦉','🐱','🦁','🚀','🤖','🌟'].map(a=>`<button data-a="${a}" class="${(m.avatar||'🧑‍🔬')===a?'pri':''}">${a}</button>`).join('')}</div>
 <b>Colour</b><div class="row" id="th">${Object.keys(THEMES).map(t=>`<button data-t="${t}" class="${(m.theme||'Indigo')===t?'pri':''}">${t}</button>`).join('')}</div>
 <b>Stickers I earned</b><div class="row" id="sk">${st.length?st.map(s=>`<button data-s="${s}" class="${(m.stick||[]).includes(s)?'pri':''}">${s}</button>`).join(''):'<small>Finish an experiment lab to unlock stickers.</small>'}</div>
 <b>My favourite science fact (short)</b><input id="fa" class="inp" maxlength="90" placeholder="Example: Water is made of H and O" value="${(m.fact||'').replace(/"/g,'')}">
 <canvas id="cv" style="width:100%;max-width:360px;border-radius:16px;margin:10px auto;display:block"></canvas>
 <div class="row"><button class="pri" id="dl">💾 Save picture</button><button class="pri" id="sh">📤 Share</button></div><p id="shn" class="lockhint"></p>`}</div>
 <div class="card"><h2>Keep my points safe</h2><p>Your points are saved on this phone. To move them to another device, copy this code and paste it there.</p><textarea id="cd" class="inp" rows="3" readonly></textarea><div class="row"><button id="cp">📋 Copy code</button></div><b>Restore from a code</b><textarea id="rc" class="inp" rows="2" placeholder="Paste your code here"></textarea><button id="rs">Restore</button><p id="rn" class="lockhint"></p></div>`;
 Q.pts();$('#cd').value=code();
 const upd=()=>{const o=load();o.name=$('#nm').value.trim();save(o)};$('#nm').oninput=()=>{upd();const cv=$('#cv');if(cv)drawCard(cv,load())};
 $('#cp').onclick=()=>{$('#cd').select();try{navigator.clipboard.writeText($('#cd').value)}catch(e){document.execCommand('copy')}$('#rn').textContent='Copied.'};
 $('#rs').onclick=()=>{$('#rn').textContent=restore($('#rc').value)?'Restored. Reloading…':'That code did not work. Check you copied all of it.';if($('#rn').textContent.startsWith('Restored'))setTimeout(()=>Q.me(),600)};
 if(Q.total()>=30){const cv=$('#cv');const re=()=>drawCard(cv,load());re();
  $('#av').onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const o=load();o.avatar=b.dataset.a;save(o);Q.me()};
  $('#th').onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;const o=load();o.theme=b.dataset.t;save(o);Q.me()};
  $('#sk').onclick=e=>{const b=e.target.closest('[data-s]');if(!b)return;const o=load();const a=new Set(o.stick||[]);a.has(b.dataset.s)?a.delete(b.dataset.s):a.add(b.dataset.s);o.stick=[...a].slice(0,6);save(o);Q.me()};
  $('#fa').oninput=()=>{const o=load();o.fact=$('#fa').value;save(o);re()};
  const blob=()=>new Promise(r=>cv.toBlob(r,'image/png'));
  $('#dl').onclick=async()=>{const b=await blob();const f=new File([b],'my-science-card.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:'My OSH science card'});return}catch(e){}}const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='my-science-card.png';a.click();$('#shn').textContent='If nothing downloaded, press and hold the card picture and choose Save.'};
  $('#sh').onclick=async()=>{const b=await blob();const f=new File([b],'my-science-card.png',{type:'image/png'});const txt='I am a '+Q.level()+' at the OSH Science Lab with '+Q.total()+' points! Try free: https://quadacademy.org/science-lab/';if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:txt});return}catch(e){}}window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank')}}
};
})();
