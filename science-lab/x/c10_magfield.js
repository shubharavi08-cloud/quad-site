QLab.register({
id:'c10_magfield',code:'10-P4',title:'Magnetic field lines around a bar magnet',grade:10,subject:'Physics',emoji:'🧲',
hook:{title:'You cannot see a magnet\'s push and pull. A compass can.',text:'Drag a small compass round a bar magnet. The needle shows which way the magnetic field points at every spot. Mark enough spots and the field lines appear.'},
prior:'You know that a magnet has a north pole and a south pole, and that like poles repel.',
guess:{q:'A compass needle is a tiny magnet. Placed near the north pole of a big magnet, its red (north) tip will point…',options:['towards that pole','away from that pole','up','nowhere in particular'],answer:1,hint:'Like poles repel, unlike poles attract. The red tip is a north pole.',after:'Test it with the compass.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A bar magnet with a draggable compass, marked needle directions and field lines'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const cx=W/2,cy=P?270:225,hl=P?62:75,NX=cx+(chal?hl:-hl),SX=cx+(chal?-hl:hl);
 let cp=[cx+(P?0:130),cy-(P?110:90)],marks=[],lines=false;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const gM=E('g',{},sc.gMain),gL=E('g',{},sc.gMain),gK=E('g',{},sc.gMain);
 const B=(x,y)=>{const f=(px,py,q)=>{const dx=x-px,dy=y-py,d=Math.max(8,Math.hypot(dx,dy));return[q*dx/d**3,q*dy/d**3]},a=f(NX,cy,1),b=f(SX,cy,-1);return[a[0]+b[0],a[1]+b[1]]};
 const ang=(x,y)=>{const b=B(x,y);return Math.atan2(b[1],b[0])*180/Math.PI};
 function arrow(g,x,y,a,col,len){const r=a*Math.PI/180,dx=Math.cos(r),dy=Math.sin(r);E('line',{x1:x-dx*len/2,y1:y-dy*len/2,x2:x+dx*len/2,y2:y+dy*len/2,stroke:col,'stroke-width':3,'stroke-linecap':'round'},g);E('polygon',{points:`${x+dx*len/2},${y+dy*len/2} ${x+dx*len/2-dx*7-dy*4},${y+dy*len/2-dy*7+dx*4} ${x+dx*len/2-dx*7+dy*4},${y+dy*len/2-dy*7-dx*4}`,fill:col},g)}
 function drawM(){gM.innerHTML='';const h=P?30:36;
  E('rect',{x:cx-hl,y:cy-h/2,width:hl,height:h,fill:chal?'#c9ccd6':'#e5534b',stroke:'#333','stroke-width':3,rx:4},gM);E('rect',{x:cx,y:cy-h/2,width:hl,height:h,fill:chal?'#c9ccd6':'#2f7fd6',stroke:'#333','stroke-width':3,rx:4},gM);
  if(!chal){T(gM,NX,cy+7,'N',{'font-size':22,'font-weight':900,fill:'#fff',class:''});T(gM,SX,cy+7,'S',{'font-size':22,'font-weight':900,fill:'#fff',class:''})}else T(gM,cx,cy+6,'?   ?',{'font-size':20,'font-weight':900,fill:'#555',class:''})}
 function drawL(){gL.innerHTML='';if(!lines)return;
  for(let k=0;k<12;k++){const a=k/12*2*Math.PI,pts=[];let x=NX+16*Math.cos(a),y=cy+16*Math.sin(a);
   for(let s=0;s<260;s++){pts.push(x+','+y);const b=B(x,y),m=Math.hypot(b[0],b[1]);x+=b[0]/m*6;y+=b[1]/m*6;if(Math.hypot(x-SX,y-cy)<14||x<8||x>W-8||y<68||y>H-90)break}
   E('polyline',{points:pts.join(' '),fill:'none',stroke:'#7d6bd6','stroke-width':2,opacity:.75},gL)}}
 function drawK(){gK.innerHTML='';marks.forEach(m=>arrow(gK,m.x,m.y,m.a,'#2e9d5b',18));
  const a=ang(cp[0],cp[1]);const g=E('g',{transform:`translate(${cp[0]},${cp[1]})`,style:'cursor:grab;touch-action:none'},gK);
  E('circle',{r:22,fill:'#fff',stroke:'#333','stroke-width':3},g);const r=a*Math.PI/180,dx=Math.cos(r),dy=Math.sin(r);
  E('polygon',{points:`${dx*18},${dy*18} ${-dy*4},${dx*4} ${dy*4},${-dx*4}`,fill:'#e5534b'},g);E('polygon',{points:`${-dx*18},${-dy*18} ${-dy*4},${dx*4} ${dy*4},${-dx*4}`,fill:'#9aa3b5'},g);E('circle',{r:3,fill:'#333'},g);
  g.addEventListener('pointerdown',ev=>{ev.preventDefault();g.setPointerCapture(ev.pointerId);g.dataset.d=1;g.style.cursor='grabbing'});
  g.addEventListener('pointermove',ev=>{if(!g.dataset.d)return;const p=sc.pt(ev);sc.put(p.x,p.y)});
  const up=()=>{delete g.dataset.d;g.style.cursor='grab'};g.addEventListener('pointerup',up);g.addEventListener('pointercancel',up);
  const c=api.ctrl.querySelector('#cnt');if(c)c.textContent='Marks: '+marks.length+' (need 8 spread around the magnet)'}
 sc.put=(x,y)=>{cp=[Math.max(24,Math.min(W-24,x)),Math.max(80,Math.min(H-100,y))];if(Math.hypot(cp[0]-cx,cp[1]-cy)<hl+8&&Math.abs(cp[1]-cy)<24){cp[1]=cy-(cp[1]<cy?32:-32)}drawK()};
 sc.mark=()=>{if(marks.some(m=>Math.hypot(m.x-cp[0],m.y-cp[1])<22)){sc.say('Move the compass to a new spot first.','warn');return}marks.push({x:cp[0],y:cp[1],a:ang(cp[0],cp[1])});L.snd.pop&&L.snd.pop();drawK();sc.say('Marked. The green arrow shows the field direction there.')};
 sc.lines=()=>{if(marks.length<8){sc.say('Mark at least 8 spots all round the magnet first.','warn');return}lines=true;drawL();L.snd.ok&&L.snd.ok();api.award('did');api.ready();sc.say('Field lines leave the north pole and enter the south pole. Closer lines = stronger field.','ok')};
 sc.clear=()=>{marks=[];lines=false;drawL();drawK()};
 sc.answer=s=>{const nIsRight=NX>cx;if((s==='right')===nIsRight)api.solved();else api.nope('Look at the compass: its red tip points TOWARDS a south pole and AWAY from a north pole. Put the compass near each end and see.')};
 api.ctrl.innerHTML=chal?'<p style="margin:0 0 6px;font-size:14px"><b>Which end is the NORTH pole?</b> Move the compass near each end and watch the red tip.</p><div class="row"><button data-a="left">Left end</button><button data-a="right">Right end</button></div>'
  :'<p style="margin:0 0 4px;font-size:14px"><b>Drag the compass</b> around the magnet. Tap Mark to leave an arrow.</p><div class="row"><button class="pri" id="mk">📍 Mark here</button><button id="ln">〰️ Show field lines</button><button id="cl">Clear</button></div><p id="cnt" style="font-size:14px;color:#55688a;margin:4px 0 0"></p>';
 if(chal)api.ctrl.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>sc.answer(b.dataset.a));else{api.ctrl.querySelector('#mk').onclick=()=>sc.mark();api.ctrl.querySelector('#ln').onclick=()=>sc.lines();api.ctrl.querySelector('#cl').onclick=()=>sc.clear()}
 drawM();drawL();drawK();sc.say(chal?'Use the compass to find the north pole.':'Drag the compass near the magnet. Watch the red tip.')},
demo:[[S=>S.put(S.W/2-110,S.H*.45-10),'Near the north pole the red tip points away.',1100],[S=>S.mark(),'Mark it.',600],[S=>S.put(S.W/2+110,S.H*.45-10),'Near the south pole the red tip points towards it.',1100],[S=>S.mark(),'Mark it too.',600]],
why:['A magnet has a <span class="word">magnetic field</span> around it. The compass needle lines up with the field.','By agreement, the field points <b>out of the north pole and into the south pole</b>.','<span class="word">Field lines</span> join the poles. They never cross. They are closest together near the poles, where the field is strongest.','The red tip of a compass is its north pole. It is pulled towards a south pole and pushed away from a north pole.'],
check:[{q:'Magnetic field lines outside a magnet go…',options:['from south to north','from north to south','in circles round the middle','nowhere'],answer:1,why:'They leave the north pole and enter the south pole.',hint:'Out of N, into S.'},
 {q:'Where is the field strongest?',options:['Far from the magnet','Near the poles, where lines are closest','At the middle of the magnet','It is equal everywhere'],answer:1,why:'Closely packed lines mean a strong field.',hint:'Look at where the lines bunch up.'},
 {q:'Can two magnetic field lines cross each other?',options:['Yes, often','Never','Only at the poles','Only in water'],answer:1,why:'At a point the field has only one direction, so lines cannot cross.',hint:'One direction per point.'}],
challenge:{text:'The paint has worn off this magnet. Use the compass to find which end is the <b>north</b> pole.',win:'The compass red tip pointed away from that end, so it is the north pole.'},
real:['The Earth is a giant magnet, and compasses follow its field.','MRI scanners and electric motors use strong magnets.','Fridge magnets and speakers use magnetic fields.'],
words:{'Magnetic field':'The space around a magnet where it pulls or pushes.','Field line':'A line showing the direction of the field.','North pole':'The end that points to Earth\'s north when free to turn.',Compass:'A tiny magnet needle that shows field direction.'}
});
