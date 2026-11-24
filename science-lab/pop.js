/* Celebration pops: star / medal / trophy burst when something is earned */
(function(){const Q=QLab;let busy=0;const queue=[];
function run(){if(busy||!queue.length)return;busy=1;const o=queue.shift();const d=document.createElement('div');d.className='popx';d.setAttribute('role','status');
let c='';for(let i=0;i<18;i++){const a=i/18*360,r=90+Math.random()*60,col=['#ffc233','#ff4d9d','#6c4cf0','#2bc0e4','#42d38a'][i%5];c+=`<i style="--x:${Math.cos(a*Math.PI/180)*r}px;--y:${Math.sin(a*Math.PI/180)*r}px;--d:${(Math.random()*.15).toFixed(2)}s;background:${col}"></i>`}
d.innerHTML=`<div class="popc"><div class="popr"></div><div class="popf">${c}</div><div class="pope">${o.i}</div><b>${o.h}</b><span>${o.t||''}</span>${o.p?`<em>+${o.p} points</em>`:''}</div>`;
document.body.appendChild(d);if(window.QEmoji)QEmoji.parse(d);
try{if(Q.lab&&Q.lab.snd)Q.lab.snd.ok&&Q.lab.snd.ok()}catch(e){}
const end=()=>{d.classList.add('out');setTimeout(()=>{d.remove();busy=0;run()},260)};d.onclick=end;setTimeout(end,o.ms||2000)}
Q.pop=(i,h,t,p,ms)=>{queue.push({i,h,t,p,ms});run()};
/* experiment milestones: video = star, lab = medal, all three = trophy */
Q.popAward=k=>{const m=k.match(/^(.+):(watch|did|q\d+)$/);if(!m)return;const e=Q.REG[m[1]];if(!e)return;const P=Q.P,id=e.id,kind=m[2];
const hv=Q.VIDEOS&&Q.VIDEOS[id]&&Q.VIDEOS[id].length,all=(!hv||P[id+':watch'])&&P[id+':did']&&e.check.every((_,j)=>P[id+':q'+j]);
if(all){Q.pop('🏆','Experiment master!',e.title,0,2400);return}
if(kind==='did')Q.pop('🏅','Lab complete!',e.title,0);
else if(kind==='watch')Q.pop('⭐','Video watched!',e.title,0)};
})();
