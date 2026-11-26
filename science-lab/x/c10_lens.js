QLab.register({
id:'c10_lens',code:'10-P6',title:'Image formation by a convex lens',grade:10,subject:'Physics',emoji:'🔎',
hook:{title:'A magnifying glass makes things big. A camera lens makes them small and upside down. Same lens?',text:'Slide an object towards a convex lens and watch where the image forms, how big it is and which way up.'},
prior:'You know that light bends (refracts) when it enters glass, and that a lens is a curved piece of glass.',
guess:{q:'An object is placed very close to a convex lens, inside its focal length. The image you see is…',options:['small and upside down','the same size','big and upright (a magnifying glass)','there is no image'],answer:2,hint:'This is how a magnifying glass works.',after:'Slide the object and watch all four cases.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A convex lens with a draggable object arrow, three rays and the image formed'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const lx=W/2,ay=P?300:235,f=P?50:80,oh=P?34:46,umin=Math.round(f*.35/5)*5,umax=P?190:340;
 let u=chal?2*f:umax-20;const seen=new Set();let won=false;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const g=E('g',{},sc.gMain);const X=x=>lx+x,Y=y=>ay-y;
 const cm=px=>(px/10).toFixed(px%10?1:0);
 function draw(){g.innerHTML='';
  E('line',{x1:10,y1:ay,x2:W-10,y2:ay,stroke:'#55688a','stroke-width':2},g);
  [[-2*f,'2F'],[-f,'F'],[f,'F'],[2*f,'2F']].forEach(([x,t])=>{E('line',{x1:X(x),y1:ay-7,x2:X(x),y2:ay+7,stroke:'#7d6bd6','stroke-width':3},g);T(g,X(x),ay+24,t,{'font-size':13,'font-weight':900,fill:'#5b4bc4',class:''})});
  E('path',{d:`M${lx} ${ay-(P?100:120)} Q${lx+20} ${ay} ${lx} ${ay+(P?100:120)} Q${lx-20} ${ay} ${lx} ${ay-(P?100:120)}Z`,fill:'#bfe9f5',opacity:.9,stroke:'#2a7fa5','stroke-width':3},g);
  const inf=Math.abs(u-f)<4;let v=inf?1e9:1/(1/f-1/u),virt=v<0,hi=-oh*v/u;
  const top=[-u,oh];
  // ray1: parallel then through F'
  const yl1=oh;const ext=W;const s1=(0-f)/(yl1===0?1:yl1);
  const pt1=x=>{const k=(x-0)/(f-0);return yl1+(0-yl1)*k};
  E('line',{x1:X(-u),y1:Y(oh),x2:X(0),y2:Y(oh),stroke:'#ff7a00','stroke-width':3},g);
  const xe=lx>W/2?W:W;const xr=(W-lx-12);E('line',{x1:X(0),y1:Y(oh),x2:X(xr),y2:Y(pt1(xr)),stroke:'#ff7a00','stroke-width':3},g);
  // ray2: through centre
  const sl=-oh/u;E('line',{x1:X(-u),y1:Y(oh),x2:X(xr),y2:Y(sl*xr),stroke:'#2e9d5b','stroke-width':3},g);
  // ray3: through F on object side (only if u>f)
  if(u>f+4){const yl=oh*(0+f)/(-u+f)*-1;const y3=oh*f/(u-f);E('line',{x1:X(-u),y1:Y(oh),x2:X(0),y2:Y(y3),stroke:'#2aa5d8','stroke-width':3},g);E('line',{x1:X(0),y1:Y(y3),x2:X(xr),y2:Y(y3),stroke:'#2aa5d8','stroke-width':3},g)}
  if(!inf){if(virt){E('line',{x1:X(0),y1:Y(oh),x2:X(v),y2:Y(hi),stroke:'#ff7a00','stroke-width':2,'stroke-dasharray':'5 4'},g);E('line',{x1:X(0),y1:Y(0),x2:X(v),y2:Y(hi),stroke:'#2e9d5b','stroke-width':2,'stroke-dasharray':'5 4'},g)}
   const ix=Math.max(-lx+14,Math.min(W-lx-14,v)),iy=hi*(ix/v);E('line',{x1:X(ix),y1:Y(0),x2:X(ix),y2:Y(iy),stroke:'#c0281d','stroke-width':6,'stroke-linecap':'round',opacity:virt?.55:1,'stroke-dasharray':virt?'6 4':''},g);E('polygon',{points:`${X(ix)},${Y(iy)} ${X(ix)-6},${Y(iy)+(iy>0?9:-9)} ${X(ix)+6},${Y(iy)+(iy>0?9:-9)}`,fill:'#c0281d',opacity:virt?.55:1},g)}
  // object
  const og=E('g',{style:'cursor:grab;touch-action:none'},g);E('line',{x1:X(-u),y1:Y(0),x2:X(-u),y2:Y(oh),stroke:'#1b6fd6','stroke-width':6,'stroke-linecap':'round'},og);E('polygon',{points:`${X(-u)},${Y(oh)-2} ${X(-u)-6},${Y(oh)+9} ${X(-u)+6},${Y(oh)+9}`,fill:'#1b6fd6'},og);E('rect',{x:X(-u)-16,y:Y(oh)-14,width:32,height:oh+34,fill:'transparent'},og);
  og.addEventListener('pointerdown',ev=>{ev.preventDefault();og.setPointerCapture(ev.pointerId);og.dataset.d=1});
  og.addEventListener('pointermove',ev=>{if(!og.dataset.d)return;sc.obj(-(sc.pt(ev).x-lx),true)});
  const up=()=>{delete og.dataset.d};og.addEventListener('pointerup',up);og.addEventListener('pointercancel',up);
  const m=inf?'–':Math.abs(v/u).toFixed(1);
  const kind=inf?'no image: rays come out parallel':virt?'Virtual · upright · magnified':(u>2*f+5?'Real · inverted · smaller':Math.abs(u-2*f)<=5?'Real · inverted · same size':'Real · inverted · magnified');
  T(g,W/2,P?96:98,`u = ${cm(u)} cm   v = ${inf?'∞':cm(Math.abs(Math.round(v)))+(virt?' (same side)':'')}   size ×${m}`,{'font-size':P?12:15,'font-weight':900,fill:'#1b2a4a',class:''});
  T(g,W/2,P?118:122,kind,{'font-size':P?13:16,'font-weight':900,fill:virt?'#8a5a00':'#237a47',class:''});
  const c=api.ctrl.querySelector('#fl');if(c){const t=[['far','Beyond 2F: small, inverted'],['two','At 2F: same size'],['mid','Between F and 2F: big, inverted'],['near','Inside F: big, upright, virtual']];c.innerHTML=t.map(x=>`<span style="display:inline-block;margin:2px 8px 2px 0;font-size:13px">${seen.has(x[0])?'✅':'⬜'} ${x[1]}</span>`).join('')}}
 function note(){const r=u>2*f+5?'far':Math.abs(u-2*f)<=5?'two':u>f+4?'mid':u<f-4?'near':null;if(r&&!seen.has(r)&&!chal){seen.add(r);if(seen.size===4){api.award('did');api.ready();sc.say('All four cases found. Inside F the lens works as a magnifying glass.','ok')}}}
 sc.obj=(x,drag)=>{u=Math.max(umin,Math.min(umax,Math.round(x/5)*5));if(!drag)L.snd.pop&&L.snd.pop();note();draw()};
 sc.check=()=>{if(u<f-4){won=true;api.solved()}else api.nope(`Now the image is ${u>f+4?'real and upside down':'at infinity'}. For a magnifying glass the object must be closer to the lens than its focal point F. Slide it in.`)};
 sc.f=f;sc.W2=W;
 api.ctrl.innerHTML=chal?'<p style="margin:0 0 6px;font-size:14px"><b>Make a magnifying glass:</b> an upright, bigger, virtual image.</p><div class="row"><button id="mn">◀ Nearer lens</button><button id="mf">Farther ▶</button><button class="pri" id="ck">Check</button></div>'
  :'<p style="margin:0 0 4px;font-size:14px"><b>Drag the blue arrow</b> (or use buttons). Find all four cases.</p><div class="row"><button id="mn">◀ Nearer lens</button><button id="mf">Farther ▶</button></div><div id="fl"></div>';
 api.ctrl.querySelector('#mn').onclick=()=>sc.obj(u-10);api.ctrl.querySelector('#mf').onclick=()=>sc.obj(u+10);if(chal)api.ctrl.querySelector('#ck').onclick=()=>sc.check();
 draw();note();sc.say(chal?'Where must the object be for a magnifying glass?':'Drag the object towards the lens.')},
demo:[[S=>S.obj(S.f*3),'Far away: small upside-down image.',1100],[S=>S.obj(S.f*2),'At 2F: same size.',1100],[S=>S.obj(S.f*1.5),'Between F and 2F: bigger.',1100],[S=>S.obj(S.f*.6),'Inside F: upright and magnified.',1100]],
why:['A <span class="word">convex lens</span> is thicker in the middle. It bends parallel rays so they meet at the <span class="word">focal point</span> F.','Three easy rays: one parallel to the axis then through F, one through the centre straight, one through F then parallel.','Object beyond 2F: small, real, inverted. At 2F: same size. Between F and 2F: bigger, real, inverted. Inside F: upright, bigger, <b>virtual</b> (rays only seem to meet).','Lens formula: 1/v − 1/u = 1/f. Magnification m = v/u.'],
check:[{q:'Object beyond 2F of a convex lens gives an image that is…',options:['virtual, upright, big','real, inverted, small','real, upright, big','no image'],answer:1,why:'It forms between F and 2F, small and inverted.',hint:'A camera.'},
 {q:'A magnifying glass works with the object…',options:['at 2F','beyond 2F','inside F','at infinity'],answer:2,why:'Inside F the image is virtual, upright and bigger.',hint:'Very close to the lens.'},
 {q:'A real image can be…',options:['seen only by looking through the lens','caught on a screen','never be inverted','always upright'],answer:1,why:'Light actually meets there, so a screen shows it.',hint:'Cinema projector.'}],
challenge:{text:'Place the object so the lens works like a <b>magnifying glass</b> (upright, bigger image).',win:'Inside the focal length, the image is virtual, upright and magnified.'},
real:['Cameras and projectors use convex lenses.','Spectacles for long sight use convex lenses.','The lens in your eye focuses light on the retina.'],
words:{'Convex lens':'A lens thicker in the middle that brings rays together.','Focal point':'The point where parallel rays meet after the lens (F).','Real image':'An image formed where light actually meets; it can be caught on a screen.','Virtual image':'An image that only seems to be there; it cannot be caught on a screen.'}
});
