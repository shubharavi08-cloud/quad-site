QLab.register({
id:'c10_titration',code:'10-C2',title:'Neutralise it: acid + base titration',grade:10,subject:'Chemistry',emoji:'🧪',
hook:{title:'Add base to acid drop by drop. When does it become neutral?',text:'Phenolphthalein is colourless in acid and turns pink when the acid has just been used up.'},
prior:'You know pH and indicators.',
guess:{q:'When an acid and a base react completely, what do they form?',options:['Another acid','A salt and water','Only water','A gas only'],answer:1,hint:'HCl + NaOH → NaCl + H₂O.',after:'Add base to the acid.'},
build(api){
 const L=QLab.lab,chal=!!api.challenge,E=L.E,sc=L.scene(api.stage,{alt:'A burette of sodium hydroxide above a flask of acid with indicator, and a pH graph'}),PT=sc.portrait;
 const VA=chal?20:25,CA=chal?0.08:0.10;let V=0,seen=false;
 const pH=v=>{const nA=CA*VA,nB=0.1*v,tot=VA+v;const ex=nA-nB;if(Math.abs(ex)<1e-9)return 7;return ex>0?-Math.log10(ex/tot):14+Math.log10(-ex/tot)};
 const bx=PT?90:300,by0=PT?170:62,bh=PT?170:118,fx=bx,fy=PT?470:352;
 // burette
 const bg=E('g',{transform:`translate(${bx},${by0})`},sc.gMain);
 E('rect',{x:-13,y:0,width:26,height:bh,rx:6,fill:'#fff',opacity:.75,stroke:'#5a7fb0','stroke-width':3},bg);
 const liq=E('rect',{x:-10,y:4,width:20,height:bh-8,rx:4,fill:'#bfe0ff',style:'transform-box:fill-box;transform-origin:bottom;transition:transform .2s'},bg);
 for(let i=1;i<10;i++)E('line',{x1:6,x2:i%5?10:13,y1:i*bh/10,y2:i*bh/10,stroke:'#5a7fb0','stroke-width':1.5},bg);
 E('path',{d:`M-5 ${bh} L-3 ${bh+26} L3 ${bh+26} L5 ${bh}`,fill:'#e6f0fb',stroke:'#5a7fb0','stroke-width':2.5},bg);
 const lb=E('text',{x:0,y:-8,'text-anchor':'middle',class:'lkhint'},bg);lb.textContent='0.10 M NaOH';
 // two hand controls
 const mkBtn=(x,y,t,sub)=>{const g=E('g',{transform:`translate(${x},${y})`,style:'cursor:pointer',role:'button','aria-label':t+' '+sub,tabindex:0},sc.gMain);E('rect',{x:-56,y:-18,width:112,height:36,rx:18,fill:'#6c4cf0',stroke:'#fff','stroke-width':3},g);const tx=E('text',{x:0,y:5,'text-anchor':'middle','font-size':13,'font-weight':900,fill:'#fff'},g);tx.textContent=t;return g};
 const fast=mkBtn(bx+(PT?110:110),by0+bh-8,'💧 Hold: fast',''),slow=mkBtn(bx+(PT?110:110),by0+bh+38,'• 1 drop','');
 // flask
 const fl=sc.vessel({x:fx,y:fy,type:'flask',w:PT?130:118,h:PT?110:112,level:.45,color:'#f4f8ff',label:chal?'20 mL HCl':'25 mL HCl'});
 const swirl=()=>{fl.shake&&fl.shake()};
 // graph
 const gx=PT?244:520,gy=PT?330:70,gw=PT?160:200,gh=PT?120:130,gp=E('g',{transform:`translate(${gx},${gy})`},PT?sc.gMain:sc.gBack);
 E('rect',{x:0,y:0,width:gw,height:gh,rx:10,fill:'#fff',opacity:.9,stroke:'#cfd8f0','stroke-width':2},gp);
 E('line',{x1:18,y1:gh-16,x2:gw-8,y2:gh-16,stroke:'#2b2350','stroke-width':2},gp);E('line',{x1:18,y1:10,x2:18,y2:gh-16,stroke:'#2b2350','stroke-width':2},gp);
 const gt=E('text',{x:gw/2+6,y:gh-3,'text-anchor':'middle',class:'lkhint'},gp);gt.textContent='NaOH added (mL) →';const gy2=E('text',{x:8,y:gh/2,'text-anchor':'middle',class:'lkhint',transform:`rotate(-90 8 ${gh/2})`},gp);gy2.textContent='pH';
 const pl=E('polyline',{fill:'none',stroke:'#2aa5d8','stroke-width':3,'stroke-linejoin':'round'},gp),dot=E('circle',{r:5,fill:'#e5534b',cx:18,cy:gh-16},gp);
 const rd=E('text',{x:gw-10,y:24,'text-anchor':'end','font-size':13,'font-weight':900,fill:'#2b2350'},gp);
 const X=v=>18+v/40*(gw-30),Y=p=>gh-16-p/14*(gh-30);const pts=[];
 function upd(){const p=pH(V),pink=p>8.3;
  liq.style.transform=`scaleY(${Math.max(0,1-V/40)})`;
  fl.setColor(pink?'#ff7fb8':'#f4f8ff',700);fl.setLevel(.45+Math.min(V,40)/40*.25,400);
  pts.length=0;for(let v=0;v<=V+1e-9;v+=.5)pts.push(X(v)+','+Y(pH(v)));pts.push(X(V)+','+Y(p));pl.setAttribute('points',pts.join(' '));dot.setAttribute('cx',X(V));dot.setAttribute('cy',Y(p));
  rd.textContent=`${V.toFixed(1)} mL · pH ${p.toFixed(1)}`;
  if(!chal&&pink&&V<=VA+.2&&!seen){seen=true;sc.say('Pink! The acid is just used up. This is the end point.','ok');L.snd.ok()}
  if(!chal&&seen&&V>=VA){api.award('did');api.ready()}}
 const add=dv=>{V=Math.min(40,Math.round((V+dv)*10)/10);upd()};sc.titrate=add;
 const dropAnim=()=>{const d=E('circle',{cx:bx,cy:by0+bh+26,r:4,fill:'#bfe0ff'},sc.gFx);L.anim(d,[{transform:'translateY(0)',opacity:1},{transform:`translateY(${fy-fl.h-(by0+bh+26)+8}px)`,opacity:.8}],420,{easing:'ease-in'}).onfinish=()=>d.remove();L.snd.drop()};
 slow.addEventListener('click',()=>{dropAnim();setTimeout(()=>add(.1),400)});
 slow.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();slow.dispatchEvent(new Event('click'))}});
 let iv=null;const stop=()=>{clearInterval(iv);iv=null};
 fast.addEventListener('pointerdown',e=>{e.preventDefault();if(iv)return;iv=setInterval(()=>{if(!fast.isConnected)return stop();dropAnim();add(.5)},180)});
 ['pointerup','pointerleave','pointercancel'].forEach(t=>fast.addEventListener(t,stop));
 fast.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();dropAnim();add(1)}});
 sc.say(chal?'Unknown HCl, 20 mL. Add base until the flask just turns pink.':'Hold fast, then single drops. Stop at pink.');
 api.ctrl.innerHTML=`<div class="row"><button id="rs">↺ Restart</button></div>${chal?'<p><b>After you find the end point, what was the HCl concentration?</b></p><div class="row" id="cc">'+['0.05 M','0.08 M','0.10 M','0.16 M'].map(x=>`<button data-a="${x}">${x}</button>`).join('')+'</div>':''}`;
 api.ctrl.querySelector('#rs').onclick=()=>{V=0;seen=false;upd()};
 if(chal)api.ctrl.querySelectorAll('#cc button').forEach(b=>b.onclick=()=>{if(V<15.5)return api.nope('First titrate: add base until the flask just turns pink, then work out the concentration.');b.dataset.a==='0.08 M'?api.solved():api.nope('At the end point moles of acid = moles of base. 0.10 × V(base) = C × 20.')});
 upd()},
why:['<span class="word">Neutralisation</span>: acid + base → salt + water. HCl + NaOH → NaCl + H₂O.','At the <b>end point</b> the acid has just been used up, so the solution is neutral (pH 7) and phenolphthalein turns pink with the next drop of base.','The pH curve is steady, then <b>jumps suddenly</b> near the end point. That is why a single drop changes the colour.','At the end point: moles of acid = moles of base, so you can find an unknown concentration.'],
check:[{q:'HCl + NaOH → ?',options:['NaCl + H₂O','NaO + HCl','Na + Cl₂','H₂'],answer:0,why:'A salt and water.',hint:'Neutralisation.'},
 {q:'pH at the exact end point (strong acid + strong base) is…',options:['1','7','10','14'],answer:1,why:'The solution is neutral.',hint:'Watch the meter.'},
 {q:'It takes 25 mL of 0.1 M NaOH for 25 mL HCl. What is the HCl concentration?',options:['0.05 M','0.1 M','0.25 M','1 M'],answer:1,why:'Equal volumes and equal moles gives equal concentration.',hint:'Compare to your experiment.'}],
challenge:{text:'20 mL of HCl of unknown strength needs <b>16 mL</b> of 0.10 M NaOH to turn pink. Titrate it, then find the <b>concentration</b>.',win:'0.10 × 16 = C × 20, so C = 0.08 M.'},
real:['Antacid tablets neutralise extra stomach acid.','Farmers add lime to acidic soil.','Water labs titrate samples to check quality.'],
words:{Neutralisation:'Acid and base reacting to make salt and water.','End point':'The moment the reaction is complete.',Titration:'Adding one solution to another to find a concentration.',Burette:'A tube for adding liquid slowly.'}
});
