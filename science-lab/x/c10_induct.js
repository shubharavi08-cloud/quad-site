QLab.register({
id:'c10_induct',code:'10-P5',title:'Electromagnetic induction: making electricity with a magnet',grade:10,subject:'Physics',emoji:'🧲',
hook:{title:'There is no battery here. Can a magnet make electricity?',text:'A coil of wire is joined only to a meter. Push a magnet in and out. Faraday found that moving a magnet makes current flow.'},
prior:'You know a magnet has a field around it and that electric current flows in a closed wire.',
guess:{q:'A bar magnet is held completely still inside a coil joined to a meter. What does the meter show?',options:['A steady current','No current','The biggest current','The current reverses all the time'],answer:1,hint:'Faraday found it is the CHANGE of the field that matters.',after:'Find out by moving the magnet yourself.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A bar magnet moved through a coil joined to a galvanometer'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const cxm=P?210:300,cc=P?290:240,top=P?120:104,bot=P?330:280,MH=70;
 const gxp=P?210:590,gyp=P?440:215,gr=P?56:72;
 let my=top+10,pol=1,turns=30,defl=0,lastY=my,lastT=performance.now(),lastE=0,flags=new Set(),pkF=0,pkS=0,sawD=false,rest=false;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const gS=E('g',{},sc.gMain),gMag=E('g',{style:'cursor:grab;touch-action:none'},sc.gMain),gG=E('g',{},sc.gMain);
 const S2=60,phiP=y=>-2*(y-cc)/(S2*S2)*Math.exp(-Math.pow((y-cc)/S2,2));
 function drawS(){gS.innerHTML='';const n=turns===10?4:turns===30?8:12,ch=P?130:150,y0=cc-ch/2;
  const wp=`M${cxm-46} ${y0+8} Q${cxm-80} ${y0+8} ${cxm-80} ${bot+40} ${P?'':''}L${gxp-gr} ${gyp}`;
  E('path',{d:`M${cxm-48} ${y0+ch-4} L${cxm-80} ${y0+ch-4} L${cxm-80} ${gyp} L${gxp-gr} ${gyp}`,fill:'none',stroke:'#1b2a4a','stroke-width':4},gS);
  E('path',{d:`M${cxm+48} ${y0+4} L${cxm+80} ${y0+4} L${cxm+80} ${gyp+(P?30:34)} L${gxp+(P?0:-gr*.0)} ${gyp+gr}`,fill:'none',stroke:'#1b2a4a','stroke-width':4,opacity:P?1:0},gS);
  if(!P)E('path',{d:`M${cxm+48} ${y0+4} L${cxm+80} ${y0+4} L${cxm+80} ${gyp+gr+22} L${gxp} ${gyp+gr+22} L${gxp} ${gyp+gr}`,fill:'none',stroke:'#1b2a4a','stroke-width':4},gS);
  for(let i=0;i<n;i++){const y=y0+8+i*(ch-16)/(n-1);E('ellipse',{cx:cxm,cy:y,rx:48,ry:9,fill:'none',stroke:'#c9772a','stroke-width':4},gS)}
  T(gS,cxm,y0+ch+26,turns+' turns',{'font-size':14,'font-weight':900,fill:'#8a4b10',class:''})}
 function drawMag(){gMag.innerHTML='';const g=E('g',{transform:`translate(${cxm},${my})`},gMag);
  E('rect',{x:-14,y:-MH/2,width:28,height:MH/2,fill:pol>0?'#e5534b':'#2f7fd6',stroke:'#333','stroke-width':3,rx:3},g);E('rect',{x:-14,y:0,width:28,height:MH/2,fill:pol>0?'#2f7fd6':'#e5534b',stroke:'#333','stroke-width':3,rx:3},g);
  T(g,0,-MH/4+6,pol>0?'N':'S',{'font-size':18,'font-weight':900,fill:'#fff',class:''});T(g,0,MH/4+6,pol>0?'S':'N',{'font-size':18,'font-weight':900,fill:'#fff',class:''});
  E('rect',{x:-34,y:-MH/2-12,width:68,height:MH+24,fill:'transparent'},g)}
 function drawG(){gG.innerHTML='';
  E('circle',{cx:gxp,cy:gyp,r:gr,fill:'#fff',stroke:'#1b2a4a','stroke-width':5},gG);
  for(let k=-4;k<=4;k++){const a=(k*10)*Math.PI/180;E('line',{x1:gxp+(gr-14)*Math.sin(a),y1:gyp+8-(gr-14)*Math.cos(a),x2:gxp+(gr-6)*Math.sin(a),y2:gyp+8-(gr-6)*Math.cos(a),stroke:k===0?'#e5534b':'#55688a','stroke-width':k===0?3:2},gG)}
  const a=Math.max(-45,Math.min(45,defl))*Math.PI/180;E('line',{x1:gxp,y1:gyp+8,x2:gxp+(gr-12)*Math.sin(a),y2:gyp+8-(gr-12)*Math.cos(a),stroke:'#e5534b','stroke-width':4,'stroke-linecap':'round'},gG);E('circle',{cx:gxp,cy:gyp+8,r:5,fill:'#1b2a4a'},gG);
  T(gG,gxp,gyp+gr-14,'G',{'font-size':16,'font-weight':900,class:''});T(gG,gxp,gyp+gr+(P?24:44),'Galvanometer',{'font-size':13,'font-weight':800,class:''});
  const c=api.ctrl.querySelector('#fl');if(c){const t=[['in','Magnet in: needle one way'],['out','Magnet out: other way'],['still','Magnet still: zero'],['fast','Faster: bigger swing'],['flip','Flip magnet: reverses']];c.innerHTML=t.map(x=>`<span style="display:inline-block;margin:2px 8px 2px 0;font-size:13px">${flags.has(x[0])?'✅':'⬜'} ${x[1]}</span>`).join('')}}
 function setPos(y,t){y=Math.max(top,Math.min(bot,y));const dt=Math.max(1,t-lastT),v=(y-lastY)/dt;
  lastE=pol*(turns/30)*phiP(y)*v*2600;lastY=y;lastT=t;my=y;drawMag();
  const e=Math.abs(lastE);if(v>0&&y<cc){const sp=Math.abs(v);if(sp>.6)pkF=Math.max(pkF,e);else if(sp>.04&&sp<.25)pkS=Math.max(pkS,e)}}
 function loop(){if(!stage.isConnected)return;const now=performance.now();const tg=now-lastT<70?lastE:0;defl+=(tg-defl)*.35;if(Math.abs(defl)<.15)defl=0;
  const d=defl;let ch=false;
  if(d>8&&pol>0&&!flags.has('in')){flags.add('in');ch=true}if(d<-8&&pol>0&&!flags.has('out')){flags.add('out');ch=true}
  if(pol<0&&d<-8&&lastY<cc&&!flags.has('flip')){flags.add('flip');ch=true}
  if(Math.abs(d)>8)sawD=true;if(sawD&&now-lastT>300&&Math.abs(d)<2&&Math.abs(lastY-cc)<70&&!flags.has('still')){flags.add('still');ch=true}
  if(pkF>0&&pkS>0&&pkF>=1.8*pkS&&!flags.has('fast')){flags.add('fast');ch=true}
  if(chal&&d>30&&!rest){rest=true;api.solved()}
  drawG();if(ch&&!chal&&flags.size>=4&&!rest){rest=true;api.award('did');api.ready();sc.say('Changing the magnet\'s field through the coil makes current. This is electromagnetic induction.','ok')}
  requestAnimationFrame(loop)}
 const dragM=gMag;dragM.addEventListener('pointerdown',ev=>{ev.preventDefault();dragM.setPointerCapture(ev.pointerId);dragM.dataset.d=1;dragM.style.cursor='grabbing'});
 dragM.addEventListener('pointermove',ev=>{if(!dragM.dataset.d)return;const p=sc.pt(ev);setPos(p.y,performance.now())});
 const up=()=>{delete dragM.dataset.d;dragM.style.cursor='grab'};dragM.addEventListener('pointerup',up);dragM.addEventListener('pointercancel',up);
 sc.swing=(y0,y1,ms)=>new Promise(res=>{const t0=performance.now();lastY=y0;lastT=t0;my=y0;(function f(){const k=Math.min(1,(performance.now()-t0)/ms);setPos(y0+(y1-y0)*k,performance.now());if(k<1)setTimeout(f,12);else res()})()});
 sc.flip=()=>{pol=-pol;L.snd.pop&&L.snd.pop();drawMag();sc.say('Magnet flipped. Now move it again.')};
 sc.turns=n=>{turns=n;drawS();sc.say(n+' turns in the coil.')};
 sc.top=top;sc.bot=bot;sc.cc=cc;
 api.ctrl.innerHTML=(chal?'<p style="margin:0 0 6px;font-size:14px"><b>Swing the needle right past 30°.</b> Drag the magnet in quickly. Use more turns if you need to.</p>':'<p style="margin:0 0 4px;font-size:14px"><b>Drag the magnet</b> in and out of the coil, slowly and quickly. Tick four things.</p>')+'<div class="row"><button id="fp">🔄 Flip magnet</button>'+[10,30,60].map(n=>`<button data-t="${n}">${n} turns</button>`).join('')+'</div>'+(chal?'':'<div id="fl"></div>');
 api.ctrl.querySelector('#fp').onclick=()=>sc.flip();api.ctrl.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>sc.turns(+b.dataset.t));
 drawS();drawMag();drawG();sc.say(chal?'Fast and many turns means a big push.':'Drag the magnet down into the coil.');loop()},
demo:[[async S=>{await S.swing(S.top+10,S.cc,300)},'Magnet going in: the needle jumps one way.',1000],[async S=>{await S.swing(S.cc,S.top+10,300)},'Coming out: it jumps the other way.',1000],[S=>S.flip(),'Flip the magnet and the jumps reverse.',900]],
why:['A moving magnet changes the <span class="word">magnetic field</span> through the coil. That change <b>induces</b> a voltage and a current.','No movement, no change, <b>no current</b>, even if the magnet sits inside the coil.','Faster movement, more turns or a stronger magnet make a bigger current. Reversing the motion or the magnet reverses the current.','This is <span class="word">electromagnetic induction</span> (Faraday). Generators in power stations are built on it: spin magnets near coils to make electricity.'],
check:[{q:'A magnet is held still inside a coil. The meter shows…',options:['maximum current','zero','a reversing current','a steady small current'],answer:1,why:'The field through the coil is not changing.',hint:'Change is what matters.'},
 {q:'Which change gives a bigger current?',options:['Slower magnet','Fewer turns','Faster magnet','A weaker magnet'],answer:2,why:'A faster change induces a larger voltage.',hint:'You saw a bigger swing when you moved quickly.'},
 {q:'When you pull the magnet out instead of pushing it in, the current…',options:['is the same way','reverses','becomes zero','doubles'],answer:1,why:'The change in the field is reversed.',hint:'The needle goes the other way.'}],
challenge:{text:'Make the needle swing <b>right past 30°</b>. Think about speed and the number of turns.',win:'A fast push through a coil with many turns gives a large induced current.'},
real:['Power station generators spin magnets inside coils.','A bicycle dynamo lights your lamp when the wheel turns.','Wireless phone chargers also use induction.'],
words:{'Electromagnetic induction':'Making a current by changing the magnetic field through a coil.',Galvanometer:'A meter that detects small currents.',Coil:'Many turns of wire.',Faraday:'The scientist who discovered induction in 1831.'}
});
