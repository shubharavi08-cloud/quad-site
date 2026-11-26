/* shared building blocks for experiments */
QLab.kit={

 order(api,o){/* o:{stim,resp,items:[[name,role,why]] in correct order, shuffle:[..], done(), fail(), tail} ; drag cards into numbered steps in order */
  const L2=QLab.lab,E=L2.E,stage=api.stage;const sc=L2.scene(stage,{alt:'Cards to drag into numbered boxes in the correct order'});const W=sc.W,H=sc.H,P=sc.portrait;
  const SET=o.items,N=SET.length,ord=o.shuffle||SET.map((_,i)=>i).reverse().map((v,i,a)=>i===0?a[1]:i===1?a[0]:v);let placed=new Array(N).fill(-1),done=false,errs=0;
  const T=(p,x,y,t,op)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},op||{}),p);e.textContent=t;return e};
  const sw=P?172:Math.floor((W-40-(N-1)*10)/N),sh=P?Math.min(44,Math.floor(300/N)-6):56,gap=P?6:10,sx=i=>P?18:20+i*(sw+gap),sy=i=>P?116+i*(sh+gap):168;
  const cw=P?150:sw,ch=P?sh:52,cX=k=>P?252:20+k*(cw+gap),cY=k=>P?116+k*(sh+gap):306;
  const gS=E('g',{},sc.gMain),gC=E('g',{},sc.gMain);
  T(gS,W/2,P?102:100,o.stim,{'font-size':P?13:16,'font-weight':900,fill:'#c0281d',class:''});
  for(let i=0;i<N;i++){E('rect',{x:sx(i),y:sy(i),width:sw,height:sh,rx:10,fill:'#fff',stroke:'#b9a9ee','stroke-width':3,'stroke-dasharray':'6 5'},gS);E('circle',{cx:sx(i)+13,cy:sy(i)+13,r:10,fill:'#7d6bd6'},gS);T(gS,sx(i)+13,sy(i)+18,i+1,{'font-size':12,'font-weight':900,fill:'#fff',class:''})}
  T(gS,W/2,P?116+N*(sh+gap)+16:262,o.resp,{'font-size':P?13:16,'font-weight':900,fill:'#237a47',class:''});
  const cards=[];
  function back(ci){const c=cards[ci];c.g.setAttribute('transform',`translate(${c.x},${c.y})`)}
  function card(k,ci){const g=E('g',{style:'cursor:grab;touch-action:none'},gC);cards[ci]={g,x:cX(k),y:cY(k)};E('rect',{width:cw,height:ch,rx:10,fill:'#ffe9a8',stroke:'#c99a00','stroke-width':3},g);T(g,cw/2,ch/2-(P?0:4)+4,SET[ci][0],{'font-size':P?12:(N>5?11:12),'font-weight':900,fill:'#4a3600',class:''});if(!P)T(g,cw/2,ch-10,SET[ci][1],{'font-size':9.5,fill:'#6b5300',class:''});
   g.setAttribute('transform',`translate(${cX(k)},${cY(k)})`);let d=null;
   g.addEventListener('pointerdown',ev=>{if(done||placed.includes(ci))return;ev.preventDefault();g.setPointerCapture(ev.pointerId);const p=sc.pt(ev);d={ox:p.x-cards[ci].x,oy:p.y-cards[ci].y};gC.appendChild(g)});
   g.addEventListener('pointermove',ev=>{if(!d)return;const p=sc.pt(ev);g.setAttribute('transform',`translate(${p.x-d.ox},${p.y-d.oy})`)});
   const end=ev=>{if(!d)return;const p=sc.pt(ev);d=null;let best=-1,bd=70;for(let i=0;i<N;i++){const dd=Math.hypot(p.x-(sx(i)+sw/2),p.y-(sy(i)+sh/2));if(dd<bd){bd=dd;best=i}}if(best<0||placed[best]!==-1){back(ci);return}sc.put(ci,best)};g.addEventListener('pointerup',end);g.addEventListener('pointercancel',end)}
  sc.put=(ci,slot)=>{if(done||placed[slot]!==-1||placed.includes(ci))return;const c=cards[ci];
   if(ci===slot){placed[slot]=ci;c.g.setAttribute('transform',`translate(${sx(slot)+(sw-cw)/2},${sy(slot)+(sh-ch)/2})`);c.g.style.cursor='default';L2.snd.ok&&L2.snd.ok();sc.say('✅ '+SET[ci][2],'ok');if(placed.every(v=>v>=0)){done=true;o.done&&o.done(sc)}}
   else{errs++;back(ci);L2.snd.no&&L2.snd.no();sc.say('Not there. '+(o.hint||'Think about what happens first.'),'warn');if(errs>=3&&o.fail)o.fail(errs)}};
  ord.forEach((ci,k)=>card(k,ci));
  api.ctrl.innerHTML=`<p style="margin:0 0 4px;font-size:14px"><b>${o.prompt||'Drag each card into the right box in order.'}</b></p><div class="row"><button id="rs">↺ Start again</button></div>`;
  api.ctrl.querySelector('#rs').onclick=()=>{if(done)return;placed.fill(-1);cards.forEach((c,ci)=>{c.g.style.cursor='grab';back(ci)});errs=0;sc.say('Cards back. Start again.')};
  sc.N=N;sc.say(o.first||'Which step comes first?');return sc},
 sorter(api,o){/* o: {items:[[label,catKey,why,sub]], cats:[[key,label]], done(), hint} ; drag the card into a bin, or tap a bin button */
  const L2=QLab.lab,E=L2.E,stage=api.stage;let i=0,ok=0,bad=0,busy=false;const LST=o.items;
  const sc=L2.scene(stage,{alt:'A card to drag into the correct bin'});const W=sc.W,H=sc.H,P=sc.portrait;
  const N=o.cats.length,cols=P?2:N,rows=Math.ceil(N/cols),bw=(W-30-(cols-1)*10)/cols,bh=P?66:84,by0=H-rows*(bh+10)-(P?30:26);
  const bins=o.cats.map((c,j)=>({k:c[0],x:15+(j%cols)*(bw+10),y:by0+Math.floor(j/cols)*(bh+10)}));
  const T=(p,x,y,t,op)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle',class:'lkhint'},op||{}),p);e.textContent=t;return e};
  bins.forEach((b,j)=>{E('rect',{x:b.x,y:b.y,width:bw,height:bh,rx:14,fill:'#eef2ff',stroke:'#7b8fd6','stroke-width':3,'stroke-dasharray':'8 5'},sc.gMain);T(sc.gMain,b.x+bw/2,b.y+bh/2+5,o.cats[j][1],{'font-size':P?13:15,'font-weight':900,fill:'#2b2350',class:''})});
  const gC=E('g',{},sc.gMain),gM=E('g',{},sc.gMain);
  api.ctrl.innerHTML=`<p style="margin:0 0 4px;font-size:14px"><b>Drag each card into the right bin</b>, or tap a button. Card <b id="n"></b> of ${LST.length}.</p><div class="row" style="flex-wrap:wrap">${o.cats.map(c=>`<button class="pri" data-c="${c[0]}">${c[1]}</button>`).join('')}</div>`;
  const q=s=>api.ctrl.querySelector(s);
  const pt=e=>{const m=sc.svg.getScreenCTM().inverse(),p=sc.svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(m)};
  const cw=P?W-40:Math.min(560,W-120),ch=P?130:120,cx=W/2,cy=(P?160:150);
  function show(){gC.innerHTML='';gM.innerHTML='';q('#n').textContent=Math.min(i+1,LST.length);T(gM,W/2,H-6,`✅ ${ok} right · ❌ ${bad} wrong tries`,{'font-size':11,'font-weight':800,fill:'#2b2350',class:''});
   if(i>=LST.length){T(gC,cx,cy,'All sorted!',{'font-size':26,'font-weight':800,fill:'#2e9d5b',class:''});return}
   const t=LST[i],card=E('g',{transform:`translate(${cx},${cy})`,style:'cursor:grab;touch-action:none'},gC);E('rect',{x:-cw/2,y:-ch/2,width:cw,height:ch,rx:16,fill:'#fff',stroke:'#cdb8ff','stroke-width':3},card);
   const words=t[0].split(' ');let ln=[],cur='';words.forEach(w=>{if((cur+' '+w).length>(P?22:38)){ln.push(cur);cur=w}else cur=(cur?cur+' ':'')+w});ln.push(cur);
   ln.forEach((l,j)=>T(card,0,-(ln.length-1)*11+j*24,l,{'font-size':P?16:20,'font-weight':800,fill:'#2b2350',class:''}));if(t[3])T(card,0,ch/2-14,t[3],{'font-size':12});
   let d=null;card.addEventListener('pointerdown',e=>{if(busy)return;card.setPointerCapture(e.pointerId);const p=pt(e);d={dx:p.x-cx,dy:p.y-cy,m:false}});
   card.addEventListener('pointermove',e=>{if(!d)return;const p=pt(e);d.m=true;card.setAttribute('transform',`translate(${p.x-d.dx},${p.y-d.dy})`)});
   const end=e=>{if(!d)return;const p=pt(e),mv=d.m;d=null;const b=bins.find(b=>p.x>=b.x&&p.x<=b.x+bw&&p.y>=b.y&&p.y<=b.y+bh);if(b)sc.sort(b.k);else card.setAttribute('transform',`translate(${cx},${cy})`)};card.addEventListener('pointerup',end);card.addEventListener('pointercancel',end)}
  sc.sort=k=>{if(busy||i>=LST.length)return;const t=LST[i];
   if(t[1]===k){ok++;L2.snd.ok&&L2.snd.ok();sc.say('✅ '+t[2],'ok');i++;show();if(i>=LST.length)o.done()}
   else{bad++;L2.snd.no&&L2.snd.no();sc.say('❌ '+(o.hint||'Not quite. Think again.'),'warn');show()}};
  api.ctrl.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>sc.sort(b.dataset.c));
  show();sc.say('Which group does this belong to? Drag the card into a bin.')}
};
