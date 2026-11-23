/* shared building blocks for experiments */
QLab.kit={
 sorter(api,o){/* o: {items:[[label,catKey,why]], cats:[[key,label]], extra:'html', done(), hint} */
  let i=0,ok=0,bad=0;const L=o.items;
  api.ctrl.innerHTML=`<p>Item <b id="n"></b> of ${L.length}</p><div class="row" style="flex-wrap:wrap">${o.cats.map(c=>`<button class="pri" data-c="${c[0]}">${c[1]}</button>`).join('')}</div><p id="fb" style="font-weight:800"></p>`;
  const q=s=>api.ctrl.querySelector(s);
  function show(){q('#n').textContent=Math.min(i+1,L.length);api.stage.innerHTML=QLab.svg(760,280,`<rect width="760" height="280" fill="#fff"/><rect x="100" y="50" width="560" height="140" rx="24" fill="#f1f5ff" stroke="#8aa0c8" stroke-width="3"/><text x="380" y="${i<L.length?125:135}" text-anchor="middle" font-size="${i<L.length&&L[i][0].length>34?19:24}" font-weight="800" fill="#1b2a4a">${i<L.length?L[i][0]:'All sorted!'}</text>${i<L.length&&L[i][3]?`<text x="380" y="165" text-anchor="middle" font-size="15" fill="#55688a">${L[i][3]}</text>`:''}<text x="380" y="245" text-anchor="middle" font-size="14" fill="#55688a">✅ ${ok} right · ❌ ${bad} wrong tries</text>`)}
  api.ctrl.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{if(i>=L.length)return;const t=L[i];
   if(t[1]===b.dataset.c){ok++;q('#fb').textContent='✅ '+t[2];i++;show();if(i>=L.length)o.done()}
   else{bad++;q('#fb').textContent='❌ '+(o.hint||'Not quite. Think again.');show()}});
  show()}
};
