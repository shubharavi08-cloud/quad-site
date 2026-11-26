/* shared building blocks for experiments */
QLab.kit={
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
