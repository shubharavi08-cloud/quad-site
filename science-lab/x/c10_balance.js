QLab.register({
id:'c10_balance',code:'10-C1',title:'Balance the equation',grade:10,subject:'Chemistry',emoji:'⚖️',
hook:{title:'Atoms cannot appear or vanish in a reaction. So the equation must balance.',text:'Change the numbers in front of each formula until both sides have the same atoms.'},
prior:'You know the law of conservation of mass from Grade 9.',
guess:{q:'In H₂ + O₂ → H₂O the left has 2 oxygen atoms and the right has 1. How do we fix it?',options:['Change the small numbers in the formulas','Put a number (coefficient) in front of formulas','Delete an atom','Ignore it'],answer:1,hint:'Never change the small subscripts. They define the substance.',after:'Balance some equations.'},
sols:{eq:[[2,1,2],[2,1,2],[1,3,2]],ch:[[1,2,1,2],[4,3,2]]},
build(api){
 const chal=!!api.challenge;
 const EQ=[{r:[['H₂',{H:2}],['O₂',{O:2}]],p:[['H₂O',{H:2,O:1}]]},{r:[['Mg',{Mg:1}],['O₂',{O:2}]],p:[['MgO',{Mg:1,O:1}]]},{r:[['N₂',{N:2}],['H₂',{H:2}]],p:[['NH₃',{N:1,H:3}]]}];
 const CH=[{r:[['CH₄',{C:1,H:4}],['O₂',{O:2}]],p:[['CO₂',{C:1,O:2}],['H₂O',{H:2,O:1}]]},{r:[['Fe',{Fe:1}],['O₂',{O:2}]],p:[['Fe₂O₃',{Fe:2,O:3}]]}];
 const L=chal?CH:EQ;let k=0,done=0,c=[];
 api.ctrl.innerHTML=`<p>Equation <b id="n"></b> of ${L.length}</p><div id="cf"></div><p id="ct"></p>`;
 const q=s=>api.ctrl.querySelector(s);
 function load(){const e=L[k];c=[...e.r,...e.p].map(()=>1);draw()}
 function counts(side,e){const t={};side.forEach((s,i)=>{const cc=c[(side===e.r?0:e.r.length)+i];for(const a in s[1])t[a]=(t[a]||0)+cc*s[1][a]});return t}
 function draw(){const e=L[k],lt=counts(e.r,e),rt=counts(e.p,e),els=[...new Set([...Object.keys(lt),...Object.keys(rt)])];
  const bal=els.every(a=>(lt[a]||0)===(rt[a]||0));
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="#fff"/><text x="380" y="50" text-anchor="middle" font-size="26" font-weight="800">${[...e.r.map((s,i)=>`${c[i]>1?c[i]:''}${s[0]}`).join(' + '),'→',e.p.map((s,i)=>`${c[e.r.length+i]>1?c[e.r.length+i]:''}${s[0]}`).join(' + ')].join('  ')}</text>
   ${els.map((a,i)=>{const y=100+i*40,ok=(lt[a]||0)===(rt[a]||0);return `<text x="230" y="${y}" text-anchor="end" font-size="20" font-weight="800">${lt[a]||0}</text><text x="380" y="${y}" text-anchor="middle" font-size="20" font-weight="800" fill="${ok?'#2f9e5b':'#d9534f'}">${a} ${ok?'=':'≠'}</text><text x="530" y="${y}" font-size="20" font-weight="800">${rt[a]||0}</text>`}).join('')}
   <text x="380" y="280" text-anchor="middle" font-size="18" font-weight="900" fill="${bal?'#2f9e5b':'#55688a'}">${bal?'BALANCED ✅':'Not balanced yet'}</text>`);
  q('#cf').innerHTML=[...e.r,...e.p].map((s,i)=>`<div class="row" style="align-items:center;margin:4px 0"><b style="min-width:70px">${s[0]}</b><button data-i="${i}" data-d="-1">−</button><b id="v${i}" style="min-width:24px;text-align:center">${c[i]}</b><button data-i="${i}" data-d="1">+</button></div>`).join('');
  q('#n').textContent=k+1;q('#cf').querySelectorAll('button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;c[i]=Math.max(1,Math.min(9,c[i]+ +b.dataset.d));draw()});
  if(bal&&!q('#ct').dataset.lock){q('#ct').dataset.lock=1;q('#ct').textContent='✅ Balanced!';done++;k++;setTimeout(()=>{delete q('#ct').dataset.lock;q('#ct').textContent='';if(k>=L.length){chal?api.solved():(api.award('did'),api.ready())}else load()},600)}}
 load()},
why:['Atoms are only <b>rearranged</b>, never created or destroyed, so each element must have the <b>same number of atoms on both sides</b>.','Balance using <span class="word">coefficients</span> (the big numbers in front). Never change the small subscripts, because that changes the substance.','Method: count atoms of each element, pick the one that is uneven, fix it, recount, repeat.','2H₂ + O₂ → 2H₂O means 2 molecules of hydrogen react with 1 of oxygen to make 2 of water.'],
check:[{q:'What may you change to balance an equation?',options:['Subscripts','Coefficients','Both','Neither'],answer:1,why:'Coefficients change the amount. Subscripts would change the substance.',hint:'The big numbers.'},
 {q:'Balanced form of Mg + O₂ → MgO is…',options:['Mg + O₂ → 2MgO','2Mg + O₂ → 2MgO','Mg + 2O₂ → MgO','2Mg + 2O₂ → 2MgO'],answer:1,why:'2 Mg and 2 O on each side.',hint:'Count O first.'},
 {q:'Why must equations balance?',options:['To look neat','Atoms are conserved','Water must form','For colour'],answer:1,why:'Mass and atoms are conserved.',hint:'Law of conservation of mass.'}],
challenge:{text:'Two harder equations. Balance <b>both</b>.',win:'CH₄ + 2O₂ → CO₂ + 2H₂O and 4Fe + 3O₂ → 2Fe₂O₃.'},
real:['Engineers use balanced equations to know how much fuel and air an engine needs.','Fertiliser factories balance equations to avoid waste.','Your body balances reactions too, such as in breathing.'],
words:{Coefficient:'The number in front of a formula.',Subscript:'The small number inside a formula.',Balanced:'Same atoms on both sides.',Reactant:'Starting substance.',Product:'New substance made.'}
});
