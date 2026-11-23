/* Fun effects: confetti burst and floating +points. Respects reduced-motion. */
(()=>{const Q=QLab;const calm=()=>matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function burst(n){if(calm())return;const c=document.createElement('canvas');c.width=innerWidth;c.height=innerHeight;c.style.cssText='position:fixed;inset:0;z-index:97;pointer-events:none';document.body.appendChild(c);const g=c.getContext('2d');const cols=['#ff4d9d','#ffc233','#19b5e8','#22c070','#6c4cf0','#ff7a2f'];
 const ps=[...Array(n||70)].map(()=>({x:innerWidth/2+(Math.random()-.5)*160,y:innerHeight*.35,vx:(Math.random()-.5)*11,vy:-Math.random()*11-3,s:5+Math.random()*7,c:cols[Math.random()*6|0],r:Math.random()*6,vr:(Math.random()-.5)*.4,round:Math.random()<.4}));let f=0;
 (function t(){g.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.r+=p.vr;g.save();g.translate(p.x,p.y);g.rotate(p.r);g.fillStyle=p.c;p.round?(g.beginPath(),g.arc(0,0,p.s/2,0,7),g.fill()):g.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);g.restore()});if(++f<90)requestAnimationFrame(t);else c.remove()})()}
function plus(txt){const e=document.querySelector('#pts');const r=e?e.getBoundingClientRect():{left:innerWidth/2,top:80,width:0};const d=document.createElement('div');d.className='fxfloat';d.textContent=txt;d.style.left=Math.max(10,r.left)+'px';d.style.top=(r.top+30)+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),1400)}
Q.fx={burst,plus};
const prev=Q.onAward;Q.onAward=k=>{prev&&prev(k);try{plus('+'+Q.W(k)+' ⭐')}catch(e){}};
})();
