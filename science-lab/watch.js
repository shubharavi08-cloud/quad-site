/* "Watch how": the experiment plays itself on the bench with captions */
(function(){const Q=QLab;
Q.watchBtn=e=>{const st=document.getElementById('stage');if(!st||!e.demo||!st._S||document.querySelector('.watchbtn'))return;
 const b=document.createElement('button');b.className='watchbtn';b.type='button';b.innerHTML='▶ Watch how';const bar=document.createElement('div');bar.className='watchbar';bar.appendChild(b);(st.closest('.lab')||st).before(bar);if(window.QEmoji)QEmoji.parse(b);
 b.onclick=async()=>{const S=st._S,api=e._api;if(!S||S.demoing)return;S.demoing=true;b.disabled=true;b.innerHTML='Playing…';
  const a0=api.award,r0=api.ready;api.award=()=>{};api.ready=()=>{};
  try{for(const s of e.demo){if(typeof s[0]==='function'){if(s[1])S.say(s[1]);await s[0](S);await S.sleep(s[2]||900)}else await S.auto(s[0],s[1],s[2])}
   S.say('Now you try! Drag a tool onto the glassware.','ok')}catch(x){}
  api.award=a0;api.ready=r0;await S.sleep(1200);
  st.innerHTML='';const ct=document.getElementById('ctrl');if(ct)ct.innerHTML='';e.build(api);b.disabled=false;b.innerHTML='▶ Watch how again';if(window.QEmoji)QEmoji.parse(b)}};
})();
