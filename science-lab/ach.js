/* Achievements: milestone and action badges. Saved on this device. */
(()=>{
const Q=QLab,$=(s,r=document)=>r.querySelector(s);
const AK='qlab2_ach';
const got=()=>{try{return JSON.parse(localStorage.getItem(AK)||'{}')}catch(e){return{}}};
const gm=()=>{try{return JSON.parse(localStorage.getItem('qlab2_game')||'{}')}catch(e){return{}}};
const keys=()=>Object.keys(Q.P);
const cnt=s=>keys().filter(k=>k.endsWith(':'+s)).length;
const doneIn=(g,sub)=>{const l=Object.values(Q.REG).filter(e=>e.grade===g&&e.subject===sub);return l.length>0&&l.every(e=>Q.P[e.id+':did'])};
const A=[
 // points milestones
 ...[[10,'🌱','First Sprout'],[50,'🔥','Spark'],[100,'⭐','Century Star'],[250,'🌟','Shining Star'],[500,'🏅','Medal Maker'],[1000,'🥇','Thousand Club'],[2500,'🏆','Champion'],[5000,'💎','Diamond Mind'],[10000,'👑','Science Royalty']].map(([n,i,t])=>({id:'p'+n,i,t,d:'Earn '+n.toLocaleString('en-IN')+' points',prog:()=>[Q.total(),n],ok:()=>Q.total()>=n})),
 {id:'w1',i:'🎬',t:'Movie Scientist',d:'Watch your first OSH video',prog:()=>[cnt('watch'),1],ok:()=>cnt('watch')>=1},
 {id:'w5',i:'📺',t:'Video Fan',d:'Watch 5 videos',prog:()=>[cnt('watch'),5],ok:()=>cnt('watch')>=5},
 {id:'l1',i:'🔬',t:'First Experiment',d:'Finish your first lab',prog:()=>[cnt('did'),1],ok:()=>cnt('did')>=1},
 {id:'l5',i:'🧪',t:'Lab Regular',d:'Finish 5 labs',prog:()=>[cnt('did'),5],ok:()=>cnt('did')>=5},
 {id:'l15',i:'⚗️',t:'Lab Expert',d:'Finish 15 labs',prog:()=>[cnt('did'),15],ok:()=>cnt('did')>=15},
 {id:'l30',i:'🧬',t:'Lab Legend',d:'Finish 30 labs',prog:()=>[cnt('did'),30],ok:()=>cnt('did')>=30},
 {id:'q1',i:'🧠',t:'Quiz Whiz',d:'Answer all quiz questions of one experiment',prog:()=>[Object.values(Q.REG).filter(e=>e.check.every((_,j)=>Q.P[e.id+':q'+j])).length,1],ok:()=>Object.values(Q.REG).some(e=>e.check.every((_,j)=>Q.P[e.id+':q'+j]))},
 {id:'c1',i:'🏆',t:'Challenge Winner',d:'Win a challenge',prog:()=>[cnt('challenge'),1],ok:()=>cnt('challenge')>=1},
 {id:'c10',i:'🎯',t:'Challenge Master',d:'Win 10 challenges',prog:()=>[cnt('challenge'),10],ok:()=>cnt('challenge')>=10},
 {id:'g8',i:'🧊',t:'Grade 8 Chemist',d:'Finish every Grade 8 chemistry lab',prog:()=>[Object.values(Q.REG).filter(e=>e.grade===8&&e.subject==='Chemistry'&&Q.P[e.id+':did']).length,Object.values(Q.REG).filter(e=>e.grade===8&&e.subject==='Chemistry').length],ok:()=>doneIn(8,'Chemistry')},
 {id:'g9',i:'⚛️',t:'Grade 9 Chemist',d:'Finish every Grade 9 chemistry lab',prog:()=>[Object.values(Q.REG).filter(e=>e.grade===9&&e.subject==='Chemistry'&&Q.P[e.id+':did']).length,Object.values(Q.REG).filter(e=>e.grade===9&&e.subject==='Chemistry').length],ok:()=>doneIn(9,'Chemistry')},
 {id:'g10',i:'🧫',t:'Grade 10 Chemist',d:'Finish every Grade 10 chemistry lab',prog:()=>[Object.values(Q.REG).filter(e=>e.grade===10&&e.subject==='Chemistry'&&Q.P[e.id+':did']).length,Object.values(Q.REG).filter(e=>e.grade===10&&e.subject==='Chemistry').length],ok:()=>doneIn(10,'Chemistry')},
 {id:'s1',i:'🥽',t:'Safety First',d:'Buy safety goggles and gloves in the game shop',prog:()=>[['goggles','gloves'].filter(x=>(gm().own||[]).includes(x)).length,2],ok:()=>['goggles','gloves'].every(x=>(gm().own||[]).includes(x))},
 {id:'m1',i:'🕵️',t:'Young Detective',d:'Solve your first Mystery Lab mission',prog:()=>[Object.keys(gm().cleared||{}).length,1],ok:()=>Object.keys(gm().cleared||{}).length>=1},
 {id:'m4',i:'🔎',t:'Case Closer',d:'Solve 4 missions',prog:()=>[Object.keys(gm().cleared||{}).length,4],ok:()=>Object.keys(gm().cleared||{}).length>=4},
 {id:'m7',i:'🧑‍🔬',t:'Master Detective',d:'Solve all 7 missions',prog:()=>[Object.keys(gm().cleared||{}).length,7],ok:()=>Object.keys(gm().cleared||{}).length>=7}];
function toast(a){Q.pop(a.i,'Badge earned!',a.t,0,2300)}
Q.achCheck=()=>{const g=got();let q=[];A.forEach(a=>{if(!g[a.id]&&a.ok()){g[a.id]=1;q.push(a)}});if(q.length){try{localStorage.setItem(AK,JSON.stringify(g))}catch(e){}q.forEach((a,i)=>setTimeout(()=>toast(a),i*900))}};
const prevAward=Q.onAward;Q.onAward=k=>{setTimeout(()=>Q.achCheck(),0)};
Q.ACH=A;
Q.achHTML=()=>{const g=got();const n=A.filter(a=>g[a.id]).length;return `<div class="card"><h2>🏅 My badges <small>${n} of ${A.length}</small></h2><div class="badges">${A.map(a=>{const p=a.prog(),on=g[a.id];return `<div class="badge ${on?'on':''}"><span class="bi">${on?a.i:'🔒'}</span><b>${a.t}</b><small>${a.d}</small>${on?'':`<div class="bar"><i style="width:${Math.min(100,Math.round(100*p[0]/p[1]))}%"></i></div><small>${Math.min(p[0],p[1]).toLocaleString('en-IN')} / ${p[1].toLocaleString('en-IN')}</small>`}</div>`}).join('')}</div></div>`};
})();
