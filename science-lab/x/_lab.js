/* OSH Visual Lab kit: a real-looking bench drawn in SVG, with glassware, tools you drag, and animated reactions.
   Every experiment must use it: stage = apparatus you touch, text = one short line. */
QLab.lab=(()=>{
const NS='http://www.w3.org/2000/svg',E=(t,a,p)=>{const e=document.createElementNS(NS,t);if(a)for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const rnd=(a,b)=>a+Math.random()*(b-a),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;let UID=0;
const emo=g=>{const c=(window.QEMO||{})[String(g).replace(/️/g,'')];return c?'home-img/'+c+'.webp':''};
const anim=(el,kf,ms,o)=>el.animate(kf,Object.assign({duration:RM?1:ms,fill:'forwards',easing:'ease-out'},o||{}));
/* sound */
let AC=null;const on=()=>{try{return localStorage.getItem('qlab2_snd')!=='0'}catch(e){return true}};
function tone(f,d,ty,v,w){if(!on())return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+(w||0);o.type=ty||'sine';o.frequency.value=f;g.gain.setValueAtTime(v||.1,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d)}catch(e){}}
function noise(d,v,hp){if(!on())return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const n=AC.sampleRate*d,b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);const s=AC.createBufferSource();s.buffer=b;const f=AC.createBiquadFilter();f.type='highpass';f.frequency.value=hp||2500;const g=AC.createGain();g.gain.value=v||.08;s.connect(f);f.connect(g);g.connect(AC.destination);s.start()}catch(e){}}
const snd={drop(){tone(520,.08,'sine',.09);tone(330,.12,'sine',.07,.06)},pop(){tone(700,.06,'square',.04)},fizz(){noise(.9,.07,3000)},ok(){[523,659,784,1046].forEach((f,i)=>tone(f,.15,'triangle',.11,i*.08))},no(){tone(240,.22,'sine',.09)},whoosh(){noise(.4,.05,800)},boom(){noise(.6,.12,200);tone(80,.4,'sawtooth',.12)},tick(){tone(900,.03,'square',.03)}};
/* one-time styles */
function css(){if(document.getElementById('lkcss'))return;const s=document.createElement('style');s.id='lkcss';s.textContent=`
.labstage{position:relative;border-radius:24px;overflow:hidden;line-height:0;box-shadow:0 6px 0 rgba(0,0,0,.08)}
.labsvg{width:100%;height:auto;display:block;user-select:none;-webkit-user-select:none}
.lkfill{transition:fill 1.2s ease}.lkliq{transition:transform .9s cubic-bezier(.3,.8,.3,1)}
.lkwave{animation:lkw 2.4s linear infinite}@keyframes lkw{to{transform:translateX(-60px)}}
.lktool{cursor:grab;touch-action:none}.lktool.lift{cursor:grabbing;filter:drop-shadow(0 10px 8px rgba(0,0,0,.28))}
.lkv{transition:filter .2s}.lkv.hot{filter:drop-shadow(0 0 10px #ffc233) drop-shadow(0 0 4px #fff)}
.lksel{filter:drop-shadow(0 0 8px #6c4cf0) drop-shadow(0 0 3px #fff)}
.lkflame{transform-box:fill-box;transform-origin:50% 100%;animation:lkf .35s ease-in-out infinite alternate}@keyframes lkf{from{transform:scale(.94,.9) skewX(-3deg)}to{transform:scale(1.04,1.08) skewX(4deg)}}
.lktag{font:700 15px/1 ui-rounded,"OSH Fredoka",system-ui,sans-serif;fill:#1b2a4a}
.labsay{position:absolute;left:10px;right:10px;top:8px;line-height:1.3;background:rgba(255,255,255,.94);border:3px solid #ffd0e8;border-radius:18px;padding:8px 12px;font-weight:800;font-size:clamp(.95rem,3.4vw,1.15rem);color:#2b2350;box-shadow:0 4px 0 #ffd0e8;pointer-events:none;animation:pop .3s ease both}
.labsay.ok{border-color:#9be8b6;box-shadow:0 4px 0 #9be8b6}.labsay.bad{border-color:#ffb3b3;box-shadow:0 4px 0 #ffb3b3}
.labsay:empty{display:none}
.lkhint{fill:#6a5f8e;font:700 13px ui-rounded,system-ui,sans-serif}
`;document.head.appendChild(s)}
/* scene: wall, window, shelf, bench */
function scene(stage,o){css();o=o||{};const P=!o.w&&((stage.clientWidth||innerWidth)<540),W=o.w||(P?420:760),H=o.h||(P?560:420),id='lk'+(++UID);stage.innerHTML='';stage.classList.add('labstage');
 const svg=E('svg',{viewBox:`0 0 ${W} ${H}`,class:'labsvg',role:'img','aria-label':o.alt||'Science lab bench'});stage.appendChild(svg);
 const defs=E('defs',0,svg);
 defs.innerHTML=`<linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8ecff"/><stop offset="1" stop-color="#fff3d9"/></linearGradient><linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6b574"/><stop offset="1" stop-color="#c98f4e"/></linearGradient><linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9803f"/><stop offset="1" stop-color="#9a6630"/></linearGradient><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd8ff"/><stop offset="1" stop-color="#e9f7ff"/></linearGradient><linearGradient id="${id}sh" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient><pattern id="${id}t" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/></pattern><radialGradient id="${id}g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`;
 const by=P?150:Math.round(H*.76);
 const bg=E('g',0,svg);
 bg.innerHTML=`<rect width="${W}" height="${by}" fill="url(#${id}w)"/><rect width="${W}" height="${by}" fill="url(#${id}t)"/>
 <g transform="translate(${W-190},26)"><rect width="150" height="112" rx="10" fill="#7aa2d6"/><rect x="6" y="6" width="138" height="100" rx="6" fill="url(#${id}s)"/><circle cx="108" cy="34" r="20" fill="#ffe27a"/><circle cx="108" cy="34" r="34" fill="url(#${id}g)"/><ellipse cx="46" cy="70" rx="30" ry="11" fill="#fff"/><ellipse cx="68" cy="64" rx="22" ry="10" fill="#fff"/><path d="M75 6V106M6 56H144" stroke="#7aa2d6" stroke-width="5"/></g>
 <g transform="translate(26,34)"><rect width="104" height="130" rx="8" fill="#fff" stroke="#e1d7ff" stroke-width="3"/><rect x="8" y="8" width="88" height="14" rx="4" fill="#8a5cf0"/>${[0,1,2,3].map(r=>[0,1,2,3,4].map(c=>`<rect x="${10+c*17}" y="${30+r*22}" width="14" height="18" rx="3" fill="${['#ffb3c7','#ffd89b','#bdeaff','#c9f2c0','#e1c8ff'][(r+c)%5]}"/>`).join('')).join('')}</g>
 <g transform="translate(${W/2-120},40)"><rect width="240" height="10" rx="5" fill="#caa06b"/><rect x="14" y="10" width="8" height="14" fill="#a5784a"/><rect x="218" y="10" width="8" height="14" fill="#a5784a"/><g opacity=".9"><rect x="22" y="-40" width="26" height="40" rx="6" fill="#ff8aa5"/><rect x="26" y="-48" width="18" height="10" rx="3" fill="#fff"/><rect x="62" y="-52" width="30" height="52" rx="8" fill="#7fd1ff"/><rect x="68" y="-60" width="18" height="10" rx="3" fill="#fff"/><rect x="108" y="-34" width="24" height="34" rx="6" fill="#ffd45e"/><rect x="146" y="-46" width="30" height="46" rx="8" fill="#9ae6a0"/><rect x="152" y="-54" width="18" height="10" rx="3" fill="#fff"/><rect x="190" y="-36" width="26" height="36" rx="6" fill="#c9a8ff"/></g></g>
 <rect y="${by}" width="${W}" height="${H-by}" fill="url(#${id}b)"/><rect y="${by-4}" width="${W}" height="10" fill="#f3cf9a"/><rect y="${by+8}" width="${W}" height="3" fill="#fff" opacity=".35"/>${[0,1,2,3,4,5,6,7].map(i=>`<path d="M${i*110+20} ${by+22}q40 -6 80 0M${i*110-10} ${by+48}q50 6 90 0" stroke="#b27a3a" stroke-width="2" fill="none" opacity=".25"/>`).join('')}<rect y="${H-18}" width="${W}" height="18" fill="url(#${id}f)"/>`;
 if(P){const c=bg.children;c[2].setAttribute('transform',`translate(${W-118},14) scale(.74)`);c[3].setAttribute('transform','translate(12,16) scale(.72)');c[4].remove()}
 const gBack=E('g',0,svg),gMain=E('g',0,svg),gFx=E('g',{style:'pointer-events:none'},svg),gTool=E('g',0,svg);
 const say=document.createElement('div');say.className='labsay';stage.appendChild(say);
 const S={svg,W,H,by,id,portrait:P,gBack,gMain,gFx,gTool,stage,vessels:[],tools:[],sel:null,
  say(t,k){say.className='labsay'+(k?' '+k:'');say.style.animation='none';void say.offsetWidth;say.style.animation='';say.textContent=t||''},
  pt(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())},
  snd,sleep,E,emo};
 stage._S=S;S.vessel=o2=>vessel(S,o2);S.tool=o2=>tool(S,o2);S.burner=(x,y)=>burner(S,x,y);
 S.puff=(x,y,c,n,up)=>puff(S,x,y,c,n,up);S.flash=(x,y,c,r)=>flash(S,x,y,c,r);S.image=(g,src,x,y,s)=>{const i=E('image',{href:src,x:x-s/2,y:y-s/2,width:s,height:s},g);return i};
 return S}
/* vessel: beaker, tube, bottle, flask, jar. x = centre, y = bottom of glass */
function vessel(S,o){const type=o.type||'beaker',w=o.w||(type==='tube'?36:type==='bottle'?84:type==='flask'?130:116),h=o.h||(type==='tube'?150:type==='bottle'?120:type==='flask'?150:140),hw=w/2,r=type==='tube'?hw:type==='bottle'?12:10,uid=S.id+'v'+(++UID);
 const g=E('g',{class:'lkv',transform:`translate(${o.x},${o.y})`},S.gMain);
 let d;if(type==='flask'){const nw=w*.17;d=`M${-nw} ${-h}L${-nw} ${-h*.5}L${-hw} -6Q${-hw} 0 ${-hw+12} 0L${hw-12} 0Q${hw} 0 ${hw} -6L${nw} ${-h*.5}L${nw} ${-h}Z`}
 else if(type==='bottle'){const nw=w*.26,sh=h*.28;d=`M${-nw} ${-h}L${-nw} ${-h+sh*.5}Q${-hw} ${-h+sh} ${-hw} ${-h+sh*1.7}L${-hw} ${-r}Q${-hw} 0 ${-hw+r} 0L${hw-r} 0Q${hw} 0 ${hw} ${-r}L${hw} ${-h+sh*1.7}Q${hw} ${-h+sh} ${nw} ${-h+sh*.5}L${nw} ${-h}Z`}
 else d=`M${-hw} ${-h}L${-hw} ${-r}Q${-hw} 0 ${-hw+r} 0L${hw-r} 0Q${hw} 0 ${hw} ${-r}L${hw} ${-h}Z`;
 const cp=E('clipPath',{id:uid},g);E('path',{d},cp);
 E('ellipse',{cx:0,cy:4,rx:hw+10,ry:8,fill:'#000',opacity:.13},g);
 const inner=E('g',{'clip-path':`url(#${uid})`},g);
 E('path',{d,fill:'#fff',opacity:.28},inner);
 const top=type==='bottle'?-h*.74:-h+4,Hin=-top;let level=o.level==null?.6:o.level;
 const lq=E('g',{class:'lkliq',style:`transform:translateY(${(1-level)*Hin}px)`},inner);
 const wv=E('g',{class:RM?'':'lkwave'},lq);
 const wl=w+180;let wp=`M${-wl/2} ${top}`;for(let i=0;i<wl/30;i++)wp+=`q15 ${i%2?5:-5} 30 0`;wp+=`V4H${-wl/2}Z`;
 const col=o.color||'#bfe3ff';const body=E('path',{d:wp,class:'lkfill',fill:col},wv);
 const cloud=E('rect',{x:-hw,y:top,width:w,height:Hin+6,fill:'#fff',opacity:0,style:'transition:opacity 1.4s,fill 1s'},lq);
 const sed=E('rect',{x:-hw,y:-14,width:w,height:14,fill:'#d9c9a8',style:'transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0);transition:transform 1.6s ease'},inner);
 E('rect',{x:-hw,y:top,width:w,height:Hin,fill:`url(#${S.id}sh)`},inner);
 const bub=E('g',0,inner);
 E('path',{d,fill:'none',stroke:'#5a7fb0','stroke-width':3,'stroke-linejoin':'round',opacity:.85},g);
 E('rect',{x:-hw+6,y:-h+14,width:6,height:h*.62,rx:3,fill:'#fff',opacity:.6},g);E('rect',{x:hw-12,y:-h+22,width:3.5,height:h*.34,rx:2,fill:'#fff',opacity:.4},g);
 if(type==='beaker'||type==='jar')E('path',{d:`M${-hw-6} ${-h}H${hw+6}`,stroke:'#5a7fb0','stroke-width':4,'stroke-linecap':'round'},g);
 if(type==='beaker')[.25,.5,.75].forEach((k,i)=>E('path',{d:`M${hw-14-(i%2?0:6)} ${-h*k-8}H${hw-2}`,stroke:'#5a7fb0','stroke-width':2,opacity:.7},g));
 if(type==='bottle'){E('rect',{x:-w*.3,y:-h-14,width:w*.6,height:16,rx:5,fill:o.cap||'#6c4cf0'},g);E('rect',{x:-hw+8,y:-h*.5,width:w-16,height:h*.3,rx:6,fill:'#fff',opacity:.92,stroke:'#cfd8f0'},g);E('text',{x:0,y:-h*.5+h*.2,'text-anchor':'middle',class:'lktag','font-size':20},g).textContent=o.tag||'?'}
 if(o.label){const lines=String(o.label).split('\n'),t=E('g',{transform:`translate(0,${lines.length>1?24:28})`},g);const mx=Math.max(...lines.map(l=>l.length)),bw=Math.max(40,mx*(lines.length>1?7.4:8.4)+14),bh=lines.length*16+8;t.appendChild(E('rect',{x:-bw/2,y:-13,width:bw,height:bh,rx:11,fill:'#fff',opacity:.92,stroke:'#e1d7ff','stroke-width':2}));lines.forEach((l,i)=>{const tx=E('text',{x:0,y:i*16,'text-anchor':'middle',class:'lktag','font-size':lines.length>1?13:15},t);tx.textContent=l})}
 const V={g,type,x:o.x,y:o.y,w,h,hw,top,Hin,id:o.id,data:o.data||{},get level(){return level},color:col,
  setLevel(l,ms){level=Math.max(0,Math.min(1,l));lq.style.transition=`transform ${(ms||900)/1000}s cubic-bezier(.3,.8,.3,1)`;lq.style.transform=`translateY(${(1-level)*Hin}px)`},
  setColor(c,ms){V.color=c;body.style.transition=`fill ${(ms||1200)/1000}s ease`;body.setAttribute('fill',c)},
  cloud(c,op){cloud.setAttribute('fill',c||'#fff');cloud.style.opacity=op==null?.7:op},
  sediment(c,a){sed.setAttribute('fill',c||'#d9c9a8');sed.style.transform=`scaleY(${a==null?1:a})`},
  bubbles(ms,n,c){if(RM)return;const t0=performance.now(),iv=setInterval(()=>{if(performance.now()-t0>(ms||1800)){clearInterval(iv);return}
    const b=E('circle',{cx:rnd(-hw+8,hw-8),cy:-6,r:rnd(2,5.5),fill:c||'#fff',opacity:.8,stroke:'#cfe9ff'},bub),topY=top+Hin*(1-level)+4;anim(b,[{transform:'translateY(0)',opacity:.85},{transform:`translateY(${topY+6}px)`,opacity:.2}],rnd(700,1400)).onfinish=()=>b.remove()},Math.max(25,(ms||1800)/(n||40)))},
  foam(c,ms){const f=E('g',0,S.gFx);const cx=o.x,ty=o.y-h-4;for(let i=0;i<10;i++){const b=E('circle',{cx:cx+rnd(-hw+6,hw-6),cy:ty+8,r:rnd(7,14),fill:c||'#fff',opacity:.95,stroke:'#dbeeff','stroke-width':1.5},f);anim(b,[{transform:'translate(0,10px) scale(.2)',opacity:0},{transform:`translate(${rnd(-12,12)}px,${-rnd(8,28)}px) scale(1)`,opacity:.95}],700,{delay:i*70})}setTimeout(()=>{anim(f,[{opacity:1},{opacity:0}],900).onfinish=()=>f.remove()},ms||1800)},
  drop(c,cb){const x=o.x,y0=o.y-h-70,y1=o.y-Hin*level-6-(type==='bottle'?h*.26:0)-0;const dr=E('path',{d:'M0 -9C6 0 8 4 0 8C-8 4 -6 0 0 -9Z',fill:c||'#fff',stroke:'#2b2350','stroke-width':1.5,transform:`translate(${x},${y0})`},S.gFx);snd.drop();
   anim(dr,[{transform:`translate(${x}px,${y0}px)`},{transform:`translate(${x}px,${Math.min(y1,o.y-24)}px)`}],520,{easing:'ease-in'}).onfinish=()=>{dr.remove();ring(S,x,Math.min(y1,o.y-24)+6,c);cb&&cb()}},
  stream(c,ms,from){const x=o.x,y0=o.y-h-100,y1=o.y-Hin*level-4,s=E('rect',{x:x-4,y:y0,width:8,height:Math.max(20,y1-y0),rx:4,fill:c||'#fff',opacity:.85,style:'transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)'},S.gFx);snd.whoosh();
   anim(s,[{transform:'scaleY(0)'},{transform:'scaleY(1)'}],300).onfinish=()=>setTimeout(()=>anim(s,[{opacity:.85},{opacity:0}],300).onfinish=()=>s.remove(),ms||700)},
  glow(c,on){let e=g.querySelector('.lkgl');if(!e){e=E('ellipse',{class:'lkgl',cx:0,cy:-8,rx:hw+6,ry:12,fill:c||'#ff7a33',opacity:0,style:'transition:opacity .8s'},g);g.insertBefore(e,g.firstChild)}e.setAttribute('fill',c||'#ff7a33');e.style.opacity=on?.55:0},
  shake(){anim(g,[{transform:`translate(${o.x}px,${o.y}px)`},{transform:`translate(${o.x-5}px,${o.y}px) rotate(-2deg)`},{transform:`translate(${o.x+5}px,${o.y}px) rotate(2deg)`},{transform:`translate(${o.x}px,${o.y}px)`}],360,{iterations:2})},
  rect(){return g.getBoundingClientRect()}};
 S.vessels.push(V);g.addEventListener('click',()=>{if(S.sel&&S.sel.use){S.sel.use(V);S.deselect()}});return V}
function ring(S,x,y,c){const r=E('ellipse',{cx:x,cy:y,rx:6,ry:2.5,fill:'none',stroke:c||'#fff','stroke-width':2.5,opacity:.9},S.gFx);anim(r,[{transform:'scale(1)',opacity:.9},{transform:'scale(4)',opacity:0}],600,{transformOrigin:'center',transformBox:'fill-box'}).onfinish=()=>r.remove()}
function puff(S,x,y,c,n,up){n=n||8;for(let i=0;i<n;i++){const p=E('circle',{cx:x+rnd(-12,12),cy:y,r:rnd(8,16),fill:c||'#fff',opacity:.0},S.gFx);anim(p,[{transform:'translate(0,0) scale(.4)',opacity:0},{opacity:.55,offset:.3},{transform:`translate(${rnd(-26,26)}px,${-(up||90)-rnd(0,40)}px) scale(1.8)`,opacity:0}],rnd(1200,2000),{delay:i*130}).onfinish=()=>p.remove()}}
function flash(S,x,y,c,rad){const f=E('circle',{cx:x,cy:y,r:rad||30,fill:c||'#ffe27a',opacity:.9},S.gFx);anim(f,[{transform:'scale(.2)',opacity:.95},{transform:'scale(2.2)',opacity:0}],520,{transformOrigin:'center',transformBox:'fill-box'}).onfinish=()=>f.remove();for(let i=0;i<8;i++){const s=E('circle',{cx:x,cy:y,r:3,fill:c||'#ffc233'},S.gFx),a=i/8*6.28;anim(s,[{transform:'translate(0,0)',opacity:1},{transform:`translate(${Math.cos(a)*50}px,${Math.sin(a)*50}px)`,opacity:0}],600).onfinish=()=>s.remove()}}
function burner(S,x,y){const g=E('g',{transform:`translate(${x},${y})`},S.gMain);
 g.innerHTML=`<ellipse cx="0" cy="4" rx="46" ry="8" fill="#000" opacity=".13"/><path d="M-40 0Q-40 -14 -22 -16H22Q40 -14 40 0Z" fill="#6b7a99"/><rect x="-9" y="-70" width="18" height="56" rx="4" fill="#9aa8c4"/><rect x="-12" y="-44" width="24" height="9" rx="3" fill="#cf4f4f"/><rect x="-11" y="-76" width="22" height="9" rx="3" fill="#6b7a99"/>`;
 const fl=E('g',{class:'lkflame',style:'opacity:0;transition:opacity .3s'},g);fl.innerHTML=`<path d="M0 -78C-18 -102 -14 -118 0 -146C14 -118 18 -102 0 -78Z" fill="#4aa8ff" opacity=".75"/><path d="M0 -80C-11 -98 -8 -112 0 -128C8 -112 11 -98 0 -80Z" fill="#ffb02e"/><path d="M0 -82C-5 -94 -4 -102 0 -110C4 -102 5 -94 0 -82Z" fill="#fff4b0"/>`;
 const B={g,x,y,top:y-80,on(c){fl.style.opacity=1;if(c){const p=fl.querySelectorAll('path');p[0].setAttribute('fill',c)}snd.whoosh()},off(){fl.style.opacity=0}};S.burner.last=B;return B}
/* tools: draw(g) draws around (0,0). Drag onto a vessel, or tap tool then tap vessel. */
const DRAW={
 dropper(g,c,t){g.innerHTML=`<rect x="-5" y="-6" width="10" height="58" rx="4" fill="#fff" opacity=".7" stroke="#5a7fb0" stroke-width="2.5"/><rect x="-3" y="20" width="6" height="30" rx="3" fill="${c}"/><path d="M-5 -6Q-9 -20 0 -32Q9 -20 5 -6Z" fill="#e24a6b"/><path d="M-5 52L0 64L5 52Z" fill="${c}"/>`},
 strip(g,c,c2){g.innerHTML=`<rect x="-8" y="-34" width="16" height="68" rx="3" fill="#fff" stroke="#cfd8f0" stroke-width="2"/><rect class="tip" x="-8" y="8" width="16" height="26" rx="3" fill="${c}"/>`},
 bottle(g,c,cap){g.innerHTML=`<rect x="-16" y="-30" width="32" height="52" rx="9" fill="${c}" stroke="#5a7fb0" stroke-width="2.5"/><rect x="-9" y="-44" width="18" height="16" rx="4" fill="${cap||'#6c4cf0'}"/><rect x="-12" y="-8" width="24" height="16" rx="4" fill="#fff" opacity=".9"/>`},
 spoon(g,c){g.innerHTML=`<rect x="-3" y="-48" width="6" height="64" rx="3" fill="#b8c2d6"/><ellipse cx="0" cy="26" rx="17" ry="11" fill="#b8c2d6"/><path d="M-11 22Q0 8 11 22Z" fill="${c}"/>`},
 magnet(g){g.innerHTML=`<path d="M-26 28V-8A26 26 0 0 1 26 -8V28H10V-8A10 10 0 0 0 -10 -8V28Z" fill="#e24a4a"/><rect x="-26" y="14" width="16" height="14" fill="#dfe6f2"/><rect x="10" y="14" width="16" height="14" fill="#dfe6f2"/>`},
 bulb(g,on){g.innerHTML=`<path d="M-4 40H4V60H-4Z" fill="#9aa8c4"/><circle cx="0" cy="12" r="22" fill="${on?'#fff3a0':'#f1f4fa'}" stroke="#9aa8c4" stroke-width="3"/><path d="M-8 24L-4 8M8 24L4 8M-4 8Q0 2 4 8" stroke="#8a97b3" stroke-width="2" fill="none"/>${on?'<circle cx="0" cy="12" r="36" fill="#ffe27a" opacity=".35"/>':''}`},
 splint(g){g.innerHTML=`<rect x="-3" y="-44" width="6" height="84" rx="3" fill="#caa06b"/><circle cx="0" cy="-48" r="7" fill="#ff7a33"/><path d="M0 -58C-6 -66 -4 -70 0 -76C4 -70 6 -66 0 -58Z" fill="#ffb02e"/>`},
 thermo(g){g.innerHTML=`<rect x="-6" y="-48" width="12" height="82" rx="6" fill="#fff" stroke="#9aa8c4" stroke-width="2.5"/><circle cx="0" cy="38" r="10" fill="#e24a4a"/><rect x="-2.5" y="-10" width="5" height="46" fill="#e24a4a"/>`},
 pic(g,src,s){const i=E('image',{href:src,x:-s/2,y:-s/2,width:s,height:s},g)}
};
function tool(S,o){const g=E('g',{class:'lktool',transform:`translate(${o.x},${o.y})`},S.gTool),inner=E('g',{transform:`scale(${o.scale||1})`},g);
 if(o.draw)o.draw(inner,DRAW);
 if(o.label){const t=E('text',{x:0,y:(o.ly||62),'text-anchor':'middle',class:'lktag','font-size':14},g);t.textContent=o.label;const bw=Math.max(40,o.label.length*8+14),bg=E('rect',{x:-bw/2,y:(o.ly||62)-14,width:bw,height:21,rx:10,fill:'#fff',opacity:.92,stroke:'#e1d7ff','stroke-width':2});g.insertBefore(bg,t)}
 const T={g,inner,id:o.id,x:o.x,y:o.y,data:o.data||{},use:v=>o.use&&o.use(v,T),redraw(f){inner.innerHTML='';f(inner,DRAW)},home(){return[o.x,o.y]}};S.tools.push(T);
 let drag=null;
 const place=(x,y,sc,rot)=>g.setAttribute('transform',`translate(${x},${y})${rot?` rotate(${rot})`:''}`);T.place=place;
 g.addEventListener('touchstart',e=>e.preventDefault(),{passive:false});g.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
 g.addEventListener('pointerdown',e=>{if(T.busy)return;e.preventDefault();g.setPointerCapture(e.pointerId);const p=S.pt(e);drag={ox:p.x-T.x,oy:p.y-T.y,sx:e.clientX,sy:e.clientY,moved:false};g.classList.add('lift');S.svg.appendChild(S.gTool)});
 g.addEventListener('pointermove',e=>{if(!drag)return;if(Math.abs(e.clientX-drag.sx)+Math.abs(e.clientY-drag.sy)>6)drag.moved=true;if(!drag.moved)return;const p=S.pt(e);place(p.x-drag.ox,p.y-drag.oy);const v=hit(S,e);S.vessels.forEach(x=>x.g.classList.toggle('hot',x===v))});
 const end=e=>{if(!drag)return;g.classList.remove('lift');const d=drag;drag=null;S.vessels.forEach(x=>x.g.classList.remove('hot'));
  if(!d.moved){place(T.x,T.y);S.select(T);return}
  const v=hit(S,e);if(v&&T.use){const r=v.rect(),p=S.pt({clientX:r.left+r.width/2,clientY:r.top}),tx=p.x,ty=p.y-30;tween(g,[T.curX(),T.curY()],[tx,ty],240,()=>{T.busy=true;const done=()=>{T.busy=false;tween(g,[tx,ty],[T.x,T.y],360)};const res=T.use(v);if(res&&res.then)res.then(done);else setTimeout(done,500)})}
  else tween(g,[T.curX(),T.curY()],[T.x,T.y],260)};
 g.addEventListener('pointerup',end);g.addEventListener('pointercancel',end);
 T.curX=()=>{const m=g.getAttribute('transform').match(/translate\(([-\d.]+)[ ,]+([-\d.]+)/);return m?+m[1]:T.x};T.curY=()=>{const m=g.getAttribute('transform').match(/translate\(([-\d.]+)[ ,]+([-\d.]+)/);return m?+m[2]:T.y};
 return T}
function tween(g,a,b,ms,cb){const t0=performance.now();(function f(t){let k=Math.min(1,(t-t0)/(RM?1:ms));k=1-Math.pow(1-k,3);g.setAttribute('transform',`translate(${a[0]+(b[0]-a[0])*k},${a[1]+(b[1]-a[1])*k})`);if(k<1)requestAnimationFrame(f);else cb&&cb()})(t0)}
function hit(S,e){let best=null,bd=1e9;S.vessels.forEach(v=>{const r=v.rect(),px=r.left-24,py=r.top-90,qx=r.right+24,qy=r.bottom+10;if(e.clientX>=px&&e.clientX<=qx&&e.clientY>=py&&e.clientY<=qy){const d=Math.abs(e.clientX-(r.left+r.right)/2);if(d<bd){bd=d;best=v}}});return best}
/* selection for tap-then-tap */
function installSelect(S){S.select=T=>{S.deselect();S.sel=T;T.g.classList.add('lksel');S.say&&0};S.deselect=()=>{if(S.sel){S.sel.g.classList.remove('lksel');S.sel=null}}}
const _scene=scene;
function sceneX(stage,o){const S=_scene(stage,o);installSelect(S);return S}
/* effects interpreter: run a list of ops on a vessel one after another */
async function run(S,V,ops){for(const op of ops){const k=op[0];
 if(k==='color')V.setColor(op[1],op[2]);else if(k==='level')V.setLevel(op[1],op[2]);else if(k==='bubbles'){V.bubbles(op[1]||1800,op[2]||40,op[3]);if(!op[4])snd.fizz()}
 else if(k==='foam'){V.foam(op[1],op[2]);snd.fizz()}else if(k==='cloud')V.cloud(op[1],op[2]);else if(k==='sediment')V.sediment(op[1],op[2]);
 else if(k==='glow')V.glow(op[1],op[2]);else if(k==='puff')S.puff(V.x,V.y-V.h-6,op[1],op[2],op[3]);else if(k==='flash'){S.flash(V.x,V.y-V.h*.5,op[1]);snd.boom()}
 else if(k==='say')S.say(op[1],op[2]);else if(k==='drop')await new Promise(r=>V.drop(op[1],r));else if(k==='stream')V.stream(op[1],op[2]);else if(k==='shake')V.shake();
 else if(k==='ok')snd.ok();else if(k==='no')snd.no();else if(k==='wait')await sleep(op[1]);else if(k==='fn')await op[1]()}}
return{scene:sceneX,run,snd,E,emo,DRAW,sleep,rnd,anim,RM}})();
