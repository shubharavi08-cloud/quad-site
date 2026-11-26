QLab.register({
id:'c10_mendel',code:'10-B2',title:'Heredity: Mendel\'s pea plant crosses',grade:10,subject:'Biology',emoji:'🌱',
hook:{title:'Why is a child sometimes unlike both parents?',text:'Gregor Mendel crossed pea plants thousands of times. He found that traits are passed on in a pattern you can predict. Be Mendel: pollinate and count.'},
prior:'You know that children look like their parents, and that plants make seeds from flowers.',
guess:{q:'A pure tall pea plant (TT) is crossed with a pure dwarf plant (tt). What are the offspring?',options:['All dwarf','All tall','Half tall, half dwarf','Medium height'],answer:1,hint:'Tall is the dominant trait. One T is enough to be tall.',after:'Pollinate and see what happens.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A mother pea plant to pollinate, a Punnett square, and rows of tall and dwarf offspring'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 let fa=chal?'tt':'TT',ma=chal?'Tt':'tt';const tallOf=g=>/T/.test(g);
 const tally={},kids=[];let busy=false;
 const px=P?210:230,pb=P?410:318,tallH=P?90:130,dwH=P?45:65,ph=()=>tallOf(ma)?tallH:dwH;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const gPl=E('g',{},sc.gMain),gSq=E('g',{},sc.gMain),gK=E('g',{},sc.gMain);
 const fl=()=>[px,pb-ph()-6];
 const tgt=sc.vessel({x:px,y:pb-ph()+34,type:'beaker',w:90,h:90,level:0,color:'#fff',label:''});tgt.g.style.opacity=0;sc.gMain.appendChild(gPl);sc.gMain.appendChild(gSq);sc.gMain.appendChild(gK);
 function plant(){gPl.innerHTML='';const h=ph();E('rect',{x:px-30,y:pb,width:60,height:18,rx:4,fill:'#b0623a',stroke:'#6b3a1f','stroke-width':3},gPl);E('line',{x1:px,y1:pb,x2:px,y2:pb-h,stroke:'#2f8f3e','stroke-width':6,'stroke-linecap':'round'},gPl);
  for(let i=1;i<=3;i++){const y=pb-h*i/4;E('ellipse',{cx:px-16,cy:y,rx:14,ry:6,fill:'#4fc25a',transform:`rotate(-25 ${px-16} ${y})`},gPl);E('ellipse',{cx:px+16,cy:y-6,rx:14,ry:6,fill:'#3fae4b',transform:`rotate(25 ${px+16} ${y-6})`},gPl)}
  const f=fl();for(let k=0;k<5;k++){const a=k/5*Math.PI*2;E('ellipse',{cx:f[0]+Math.cos(a)*11,cy:f[1]+Math.sin(a)*11,rx:9,ry:7,fill:'#ff9ec7',stroke:'#c0467d','stroke-width':1.5,transform:`rotate(${k*72} ${f[0]+Math.cos(a)*11} ${f[1]+Math.sin(a)*11})`},gPl)}E('circle',{cx:f[0],cy:f[1],r:6,fill:'#ffd54a'},gPl);
  T(gPl,px-42,pb-ph()/2,chal?'Tall mother (T?)':'Mother '+ma+(tallOf(ma)?' (tall)':' (dwarf)'),{'font-size':P?13:15,'font-weight':900,fill:'#2b4a60','text-anchor':'end',class:''});
  T(gPl,px+42,pb-ph()/2,chal?'Father tt':'Father '+fa,{'font-size':P?13:15,'font-weight':800,fill:'#7a4b00','text-anchor':'start',class:''})}
 function sq(){gSq.innerHTML='';const c=P?50:62,x0=P?160:480,y0=P?132:112;
  E('rect',{x:x0-44,y:y0-46,width:c*2+80,height:c*2+86,rx:12,fill:'#fff',opacity:.92,stroke:'#e1d7ff','stroke-width':2},gSq);
  const F=fa.split(''),M=ma.split('');if(chal){F.length=0;F.push('t','t')}
  T(gSq,x0+c,y0-24,chal?'Father: t  t':'Father: '+F.join('  '),{'font-size':12,'font-weight':900,class:''});
  F.forEach((a,i)=>T(gSq,x0+c/2+i*c,y0-4,a,{'font-size':18,'font-weight':900,fill:a==='T'?'#c0281d':'#1f7fa8',class:''}));
  const mm=chal?['T','?']:M;mm.forEach((a,j)=>T(gSq,x0-18,y0+c/2+j*c+7,a,{'font-size':18,'font-weight':900,fill:a==='T'?'#c0281d':'#1f7fa8',class:''}));
  F.forEach((a,i)=>mm.forEach((b,j)=>{const g=[a,b].sort().join('');const gg=chal&&b==='?'?'?':g;const tall=/T/.test(g)||(chal&&b==='?');E('rect',{x:x0+i*c,y:y0+j*c,width:c-4,height:c-4,rx:8,fill:chal&&b==='?'?'#eee':tall?'#cdeccf':'#d7e6f7',stroke:'#7d6bd6','stroke-width':2},gSq);T(gSq,x0+i*c+c/2-2,y0+j*c+c/2+5,chal&&b==='?'?'?':g,{'font-size':16,'font-weight':900,class:''})}));
  const k=ma+'x'+fa,t=tally[k]||{t:0,d:0};T(gSq,x0+c-2,y0+c*2+24,'Tall '+t.t+' · Dwarf '+t.d,{'font-size':14,'font-weight':900,fill:'#237a47',class:''})}
 function kidsRow(){gK.innerHTML='';const n=Math.min(kids.length,P?12:16),st=kids.slice(-n),sp=P?30:32,x0=(P?30:30);const by2=P?466:354;
  st.forEach((t,i)=>{const x=x0+i*sp,h=t?32:16;E('line',{x1:x,y1:by2,x2:x,y2:by2-h,stroke:'#2f8f3e','stroke-width':4,'stroke-linecap':'round'},gK);E('ellipse',{cx:x-6,cy:by2-h/2,rx:6,ry:3,fill:'#4fc25a'},gK);E('ellipse',{cx:x+6,cy:by2-h/2-3,rx:6,ry:3,fill:'#3fae4b'},gK)});
  E('line',{x1:20,y1:by2+2,x2:x0+n*sp,y2:by2+2,stroke:'#7a5a3a','stroke-width':3},gK);
  const c=api.ctrl.querySelector('#cnt');if(c){const t=Object.entries(tally).map(([k,v])=>k.replace('x',' × ')+': '+v.t+' tall, '+v.d+' dwarf').join(' | ');c.textContent=t||'No offspring yet.'}}
 sc.set=(f,m)=>{if(chal)return;fa=f;ma=m;busy=false;plant();tgt.g.style.opacity=0;sq();api.ctrl.querySelectorAll('[data-f]').forEach(b=>b.className=b.dataset.f===fa?'pri':'');api.ctrl.querySelectorAll('[data-m]').forEach(b=>b.className=b.dataset.m===ma?'pri':'')};
 sc.cross=async()=>{if(busy)return;busy=true;const k=ma+'x'+fa;tally[k]=tally[k]||{t:0,d:0};const F=chal?['t','t']:fa.split(''),M=chal?['T','t']:ma.split('');
  sc.say('Pollen lands on the flower… 4 seeds grow.');L.snd.pop&&L.snd.pop();await sc.sleep(500);
  for(let i=0;i<4;i++){const g=[F[Math.random()<.5?0:1],M[Math.random()<.5?0:1]].join(''),tall=/T/.test(g);tally[k][tall?'t':'d']++;kids.push(tall);if(chal)tally[k].g=(tally[k].g||'')+g}
  kidsRow();sq();busy=false;const t=tally[k];
  if(!chal){const a=tally['ttxTT'],b=tally['TtxTt'];if(a&&a.t+a.d>=4&&b&&b.t+b.d>=20){api.award('did');api.ready();sc.say('About 3 tall : 1 dwarf from two Tt parents. That is the 3:1 ratio.','ok')}else sc.say('Offspring: '+t.t+' tall, '+t.d+' dwarf so far. Pollinate again.')}
  else sc.say('Offspring so far: '+t.t+' tall, '+t.d+' dwarf. Now decide: TT or Tt?')};
 sc.answer=g=>{if(g==='Tt')api.solved();else api.nope('If the mother were TT, every offspring from a dwarf father would be tall. Look at your dwarf offspring: a dwarf (tt) needs a t from the mother too.')};
 sc.tool({x:P?60:W*.12,y:P?492:384,label:'Pollen',ly:P?32:34,scale:P?.8:.95,draw:g=>{E('circle',{cx:0,cy:0,r:16,fill:'#ffd54a',stroke:'#c99a00','stroke-width':3},g);[[-6,-5],[5,-7],[0,5],[8,3],[-8,4]].forEach(p=>E('circle',{cx:p[0],cy:p[1],r:2.5,fill:'#fff3a0'},g))},use:()=>sc.cross()});
 const gen=['TT','Tt','tt'];
 api.ctrl.innerHTML=chal?'<p style="margin:0 0 6px;font-size:14px"><b>A tall mother is crossed with a dwarf father.</b> Drag pollen onto her flower a few times, then name her genes.</p><div class="row"><button data-a="TT">She is TT</button><button data-a="Tt">She is Tt</button></div><p id="cnt" style="font-size:14px;color:#55688a;margin:4px 0 0"></p>'
  :'<p style="margin:0 0 4px;font-size:14px"><b>Pick the parents</b>, then <b>drag pollen onto the flower</b>.</p><div class="row"><span style="font-size:13px">Father</span>'+gen.map(g=>`<button data-f="${g}">${g}</button>`).join('')+'<span style="font-size:13px">Mother</span>'+gen.map(g=>`<button data-m="${g}">${g}</button>`).join('')+'</div><p id="cnt" style="font-size:13px;color:#55688a;margin:4px 0 0"></p>';
 api.ctrl.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>sc.set(b.dataset.f,ma));api.ctrl.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>sc.set(fa,b.dataset.m));api.ctrl.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>sc.answer(b.dataset.a));
 plant();sq();kidsRow();if(!chal)sc.set(fa,ma);sc.say(chal?'Pollinate, watch the offspring, then decide.':'Start with TT father and tt mother. Drag the pollen onto the flower.')},
demo:[[S=>S.cross(),'Pure tall × pure dwarf: every plant is tall.',1200],[S=>S.set('Tt','Tt'),'Now cross two hybrids (Tt × Tt).',900],[S=>S.cross(),'Pollinate…',1000],[S=>S.cross(),'…and again. About 3 tall to 1 dwarf.',1000]],
why:['Each trait is controlled by a pair of <span class="word">genes</span>, one from each parent. Different forms of a gene are <span class="word">alleles</span> (T and t).','<b>Dominant</b> allele (T, tall) hides the <b>recessive</b> allele (t, dwarf) when both are present. A plant is dwarf only if it is <b>tt</b>.','Tt × Tt: the Punnett square gives TT, Tt, Tt, tt: <b>3 tall : 1 dwarf</b> (a 3:1 phenotype ratio, 1:2:1 genotype ratio).','Mendel counted thousands of plants. Large numbers matter: with only a few offspring the ratio can look different.'],
check:[{q:'Tt × Tt offspring: what fraction are dwarf (tt)?',options:['0','1/4','1/2','3/4'],answer:1,why:'One of the four boxes in the Punnett square is tt.',hint:'Draw the 2×2 square.'},
 {q:'Which genotype is a tall plant that can still pass on dwarfness?',options:['TT','Tt','tt','None'],answer:1,why:'Tt looks tall but carries a t.',hint:'Hybrid.'},
 {q:'Tall is dominant. A plant with genes tt is…',options:['tall','dwarf','medium','not possible'],answer:1,why:'Without a T, the recessive trait shows.',hint:'Recessive shows only when both are t.'}],
challenge:{text:'A tall mother crossed with a dwarf father gives some dwarf plants. What are her genes: <b>TT or Tt</b>?',win:'To give a dwarf (tt) child she must carry t, so she is Tt.'},
real:['Blood groups, eye colour and many genetic conditions follow similar patterns.','Plant breeders cross varieties to get tall, disease-free crops.','Genetic counsellors use Punnett squares to explain risks.'],
words:{Gene:'A unit of heredity on a chromosome.',Allele:'A different form of the same gene.',Dominant:'An allele that shows even with one copy.',Recessive:'An allele that shows only with two copies.',Genotype:'The genes an organism has (TT, Tt, tt).',Phenotype:'The trait you can see (tall or dwarf).'}
});
