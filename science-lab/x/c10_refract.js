QLab.register({
id:'c10_refract',code:'10-P2',title:'Refraction of light: bending in glass and water',grade:10,subject:'Physics',emoji:'🔍',
hook:{title:'Why does a straw look bent in a glass of water?',text:'Light slows down when it enters glass or water, so its path bends. Shine a torch into different materials and measure how much.'},
prior:'You know that light travels in straight lines and reflects from mirrors.',
guess:{q:'A ray of light goes from air into glass at a slant. How does it bend?',options:['Away from the normal','Towards the normal','It does not bend','It turns back'],answer:1,hint:'Light slows down in glass. Think of a car whose one wheel hits mud first.',after:'Check it with the torch.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A torch shining into a block of glass, water or diamond, showing the incident and refracted angles'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const ox=W/2,oy=P?270:215,R=P?140:150;
 const MAT={Water:[1.33,'#9fd8f5'],Glass:[1.5,'#bfe7e0'],Diamond:[2.42,'#e6e9ff']};
 let mat=chal?'Glass':'Water',ang=chal?45:30,pts=[],hid=chal;
 const rad=a=>a*Math.PI/180,nn=()=>MAT[mat][0],rr=()=>Math.asin(Math.sin(rad(ang))/nn())*180/Math.PI;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const g=E('g',{},sc.gMain);
 function draw(){g.innerHTML='';const mw=P?170:200,bh=P?190:150,r=rr();
  E('rect',{x:ox-mw,y:oy,width:mw*2,height:bh,fill:MAT[mat][1],opacity:.8,stroke:'#4a6a80','stroke-width':3,rx:4},g);T(g,ox+mw-8,oy+bh-8,hid?'Unknown material':mat,{'font-size':14,'font-weight':900,'text-anchor':'end',fill:'#2b4a60',class:''});
  E('line',{x1:ox,y1:oy-R-10,x2:ox,y2:oy+bh-10,stroke:'#55688a','stroke-width':2,'stroke-dasharray':'6 5'},g);T(g,ox+4,oy-R-14,'normal',{'font-size':12,'text-anchor':'start',class:''});
  const s=[ox-R*Math.sin(rad(ang)),oy-R*Math.cos(rad(ang))],L2=bh-30,e=[ox+L2*Math.sin(rad(r)),oy+L2*Math.cos(rad(r))];
  E('line',{x1:s[0],y1:s[1],x2:ox,y2:oy,stroke:'#ffb300','stroke-width':5,'stroke-linecap':'round'},g);
  E('line',{x1:ox,y1:oy,x2:e[0],y2:e[1],stroke:'#ff7a00','stroke-width':5,'stroke-linecap':'round'},g);
  E('line',{x1:ox,y1:oy,x2:ox+R*.7*Math.sin(rad(ang)),y2:oy-R*.7*Math.cos(rad(ang)),stroke:'#ffb300','stroke-width':2,opacity:.35},g);
  E('circle',{cx:ox,cy:oy,r:5,fill:'#e5534b'},g);
  const ar=P?42:52,a0=[ox,oy-ar],a1=[ox-ar*Math.sin(rad(ang)),oy-ar*Math.cos(rad(ang))],b0=[ox,oy+ar],b1=[ox+ar*Math.sin(rad(r)),oy+ar*Math.cos(rad(r))];
  E('path',{d:`M${a0[0]} ${a0[1]} A${ar} ${ar} 0 0 0 ${a1[0]} ${a1[1]}`,fill:'none',stroke:'#2aa5d8','stroke-width':3},g);
  E('path',{d:`M${b0[0]} ${b0[1]} A${ar} ${ar} 0 0 0 ${b1[0]} ${b1[1]}`,fill:'none',stroke:'#2e9d5b','stroke-width':3},g);
  T(g,ox-ar-26,oy-ar+2,'i = '+ang+'°',{'font-size':P?13:15,'font-weight':900,fill:'#1f7fa8',class:''});T(g,ox+ar+(P?34:40),oy+ar-4,'r = '+r.toFixed(1)+'°',{'font-size':P?13:15,'font-weight':900,fill:'#237a47',class:''});
  const rot=Math.atan2(oy-s[1],ox-s[0])*180/Math.PI;const tg=E('g',{transform:`translate(${s[0]},${s[1]}) rotate(${rot})`,style:'cursor:grab;touch-action:none'},g);
  E('rect',{x:-44,y:-11,width:38,height:22,rx:6,fill:'#e5534b',stroke:'#7a1d17','stroke-width':3},tg);E('polygon',{points:'-6,-15 8,-9 8,9 -6,15',fill:'#ffd966',stroke:'#7a1d17','stroke-width':3},tg);E('circle',{cx:-20,cy:0,r:26,fill:'transparent'},tg);
  tg.addEventListener('pointerdown',ev=>{ev.preventDefault();tg.setPointerCapture(ev.pointerId);tg.dataset.d=1});
  tg.addEventListener('pointermove',ev=>{if(!tg.dataset.d)return;const p=sc.pt(ev);let a=Math.atan2(-(p.x-ox),-(p.y-oy))*180/Math.PI;sc.angle(Math.round(Math.max(5,Math.min(80,a))),true)});
  const up=()=>{delete tg.dataset.d};tg.addEventListener('pointerup',up);tg.addEventListener('pointercancel',up);
  api.ctrl.querySelectorAll('[data-m]').forEach(b=>{b.className=b.dataset.m===mat?'pri':''});
  const c=api.ctrl.querySelector('#cnt');if(c)c.textContent=pts.length?'sin i ÷ sin r →  '+pts.map(p=>p.toFixed(2)).join(' · '):'No readings yet.'}
 sc.angle=(a,drag)=>{ang=Math.max(5,Math.min(80,a));if(!drag)L.snd.pop&&L.snd.pop();draw()};
 sc.mat=m=>{if(hid)return;mat=m;L.snd.pop&&L.snd.pop();draw()};
 sc.rec=()=>{const v=Math.sin(rad(ang))/Math.sin(rad(rr()));pts.push(v);if(pts.length>4)pts.shift();draw();
  const mats=new Set(pts.map(x=>x.toFixed(2)));
  if(chal){sc.say('sin i ÷ sin r = '+v.toFixed(2)+'. Compare with the table in the book.')}
  else if(pts.length>=3&&mats.size===1){api.award('did');api.ready();sc.say('Same number every time: this ratio is the refractive index of '+mat+' ('+nn()+').','ok')}
  else sc.say('Saved: '+v.toFixed(2)+'. Change the angle and save again (same material).')};
 sc.answer=m=>{if(m==='Glass')api.solved();else api.nope(`${m} has index ${MAT[m][0]}. Your measurement gives sin i ÷ sin r = ${(Math.sin(rad(ang))/Math.sin(rad(rr()))).toFixed(2)}. Match it to the list: water 1.33, glass 1.50, diamond 2.42.`)};
 api.ctrl.innerHTML=chal?'<p style="margin:0 0 6px;font-size:14px"><b>Find the unknown material.</b> Drag the torch, save a reading, then answer (water 1.33, glass 1.50, diamond 2.42).</p><div class="row"><button id="m5">◀ −5°</button><button id="p5">+5° ▶</button><button id="rec">📝 Save reading</button></div><div class="row" id="ans">'+Object.keys(MAT).map(m=>`<button data-a="${m}">${m}</button>`).join('')+'</div><p id="cnt" style="font-size:14px;color:#55688a;margin:4px 0 0"></p>'
  :'<p style="margin:0 0 4px;font-size:14px"><b>Pick a material</b>, drag the torch, and save readings.</p><div class="row">'+Object.keys(MAT).map(m=>`<button data-m="${m}">${m}</button>`).join('')+'</div><div class="row"><button id="m5">◀ −5°</button><button id="p5">+5° ▶</button><button class="pri" id="rec">📝 Save reading</button></div><p id="cnt" style="font-size:14px;color:#55688a;margin:4px 0 0"></p>';
 api.ctrl.querySelector('#m5').onclick=()=>sc.angle(ang-5);api.ctrl.querySelector('#p5').onclick=()=>sc.angle(ang+5);api.ctrl.querySelector('#rec').onclick=()=>sc.rec();
 api.ctrl.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{sc.mat(b.dataset.m);pts=[]});
 api.ctrl.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>sc.answer(b.dataset.a));
 draw();sc.say(chal?'Measure, then decide what the block is made of.':'The ray bends where it enters. Drag the torch.')},
demo:[[S=>S.rec(),'30° in, about 22° out: it bends towards the normal.',1100],[S=>S.angle(50),'A bigger angle…',800],[S=>S.rec(),'…the ratio sin i ÷ sin r is the same.',1000],[S=>S.mat('Diamond'),'Diamond bends light much more.',1000]],
why:['Light slows down in glass and water. When a slanted ray enters, one side slows first, so the ray <span class="word">bends</span>.','Going from air into a denser material, the ray bends <b>towards the normal</b>. Going out, it bends <b>away</b>.','<b>Snell\'s law:</b> sin i ÷ sin r = a constant, the <span class="word">refractive index</span> n of the material.','Water n = 1.33, glass n = 1.5, diamond n = 2.42. Bigger n means more bending. That is why diamonds sparkle.'],
check:[{q:'A ray goes from air into water. It bends…',options:['away from the normal','towards the normal','not at all','backwards'],answer:1,why:'Water is denser, so light slows and bends towards the normal.',hint:'Air to a denser material.'},
 {q:'Which material has the bigger refractive index?',options:['Water','Glass','Diamond','Air'],answer:2,why:'Diamond is 2.42, the highest here.',hint:'It bends light the most.'},
 {q:'A straw in water looks bent because…',options:['water bends the straw','light bends when it leaves the water','the straw gets soft','water is cold'],answer:1,why:'Light from the straw bends at the surface, so it seems to come from a different place.',hint:'Refraction at the surface.'}],
challenge:{text:'The block is a <b>mystery material</b>. Measure sin i ÷ sin r and name it.',win:'The ratio is 1.50, so it is glass.'},
real:['Lenses in spectacles and cameras use refraction.','A swimming pool looks shallower than it really is.','Rainbows are made by refraction in raindrops.'],
words:{Refraction:'The bending of light when it passes from one material to another.','Refractive index':'How much a material bends light: sin i ÷ sin r.',Normal:'A line at 90° to the surface.','Snell\'s law':'sin i ÷ sin r is constant for two materials.'}
});
