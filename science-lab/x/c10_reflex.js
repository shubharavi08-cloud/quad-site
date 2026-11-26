QLab.register({
id:'c10_reflex',code:'10-B3',title:'Control and coordination: the reflex arc',grade:10,subject:'Biology',emoji:'⚡',
hook:{title:'You touch something hot and pull your hand away before you even feel the pain. How?',text:'A fast shortcut called the reflex arc skips the thinking part. Build the pathway by dragging each part into place.'},
prior:'You know that nerves carry messages and that the brain controls the body.',
guess:{q:'You touch a hot pan. Your hand jerks away before you feel pain. The message first reached…',options:['the brain, then the hand','the spinal cord, which sent the order to the hand','the heart','the stomach'],answer:1,hint:'It is a shortcut that saves time.',after:'Build the path to see every step.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'Cards of the reflex arc to drag into numbered boxes in the correct order'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const SET=chal?{stim:'💡 STIMULUS: a bright torch shines in your eye',resp:'👁️ RESPONSE: the pupil gets smaller',items:[['Retina','Receptor: detects the light','The retina has light-sensing cells. It is the receptor.'],['Optic nerve','Sensory neuron: carries the signal in','The optic nerve is the sensory neuron that carries the signal inward.'],['Brain stem','Relay: passes the signal across','The brain stem is the relay centre for this reflex.'],['Motor nerve','Motor neuron: carries the order out','The motor nerve carries the order outward to the muscle.'],['Iris muscle','Effector: makes the response','The iris muscle is the effector. It makes the pupil smaller.']]}
  :{stim:'🔥 STIMULUS: a hot pan touches your finger',resp:'🖐️ RESPONSE: your hand jerks away',items:[['Receptor (skin)','Detects heat','Skin receptors detect the heat. This is where every reflex starts.'],['Sensory neuron','Carries the signal in','The sensory neuron carries the message to the spinal cord.'],['Spinal cord','Relay: passes it across','The spinal cord is the relay. It acts without waiting for the brain.'],['Motor neuron','Carries the order out','The motor neuron carries the order out to the muscle.'],['Effector (muscle)','Makes the response','The muscle is the effector. It pulls the hand away.']]};
 const N=5,ord=[2,4,0,3,1],placed=new Array(N).fill(-1);let done=false,errs=0;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const sw=P?172:112,sh=P?44:56,gap=P?8:14,sx=i=>P?18:(W-(N*sw+(N-1)*gap))/2+i*(sw+gap),sy=i=>P?116+i*(sh+gap):168;
 const cw=P?150:108,ch=P?44:52,cX=k=>P?252:(W-(N*cw+(N-1)*12))/2+k*(cw+12),cY=k=>P?116+k*(ch+gap+2):306;
 const gS=E('g',{},sc.gMain),gC=E('g',{},sc.gMain);
 E('text',{x:W/2,y:P?102:100,'text-anchor':'middle','font-family':'Fredoka,system-ui','font-size':P?13:16,'font-weight':900,fill:'#c0281d'},gS).textContent=SET.stim;
 for(let i=0;i<N;i++){E('rect',{x:sx(i),y:sy(i),width:sw,height:sh,rx:10,fill:'#fff',stroke:'#b9a9ee','stroke-width':3,'stroke-dasharray':'6 5'},gS);E('circle',{cx:sx(i)+14,cy:sy(i)+14,r:11,fill:'#7d6bd6'},gS);E('text',{x:sx(i)+14,y:sy(i)+19,'text-anchor':'middle','font-family':'Fredoka,system-ui','font-size':13,'font-weight':900,fill:'#fff'},gS).textContent=i+1}
 E('text',{x:W/2,y:P?416:262,'text-anchor':'middle','font-family':'Fredoka,system-ui','font-size':P?13:16,'font-weight':900,fill:'#237a47'},gS).textContent=SET.resp;
 const slotOf={},cards=[];
 function card(k,ci){const [name,role]=SET.items[ci],g=E('g',{style:'cursor:grab;touch-action:none'},gC);cards[ci]={g,x:cX(k),y:cY(k),k,ci};
  E('rect',{width:cw,height:ch,rx:10,fill:'#ffe9a8',stroke:'#c99a00','stroke-width':3},g);T(g,cw/2,P?19:22,name,{'font-size':P?13:12,'font-weight':900,fill:'#4a3600',class:''});T(g,cw/2,P?35:40,P?'':role.replace(/^[^:]*: ?/,''),{'font-size':10,fill:'#6b5300',class:''});
  g.setAttribute('transform',`translate(${cards[ci].x},${cards[ci].y})`);
  let d=null;g.addEventListener('pointerdown',ev=>{if(done||placed.includes(ci))return;ev.preventDefault();g.setPointerCapture(ev.pointerId);const p=sc.pt(ev);d={ox:p.x-cards[ci].x,oy:p.y-cards[ci].y};gC.appendChild(g)});
  g.addEventListener('pointermove',ev=>{if(!d)return;const p=sc.pt(ev);g.setAttribute('transform',`translate(${p.x-d.ox},${p.y-d.oy})`)});
  const end=ev=>{if(!d)return;const p=sc.pt(ev);d=null;let best=-1,bd=70;for(let i=0;i<N;i++){const dd=Math.hypot(p.x-(sx(i)+sw/2),p.y-(sy(i)+sh/2));if(dd<bd){bd=dd;best=i}}
   if(best<0||placed[best]!==-1){back(ci);return}sc.put(ci,best)};g.addEventListener('pointerup',end);g.addEventListener('pointercancel',end)}
 function back(ci){const c=cards[ci];c.g.setAttribute('transform',`translate(${c.x},${c.y})`)}
 sc.put=(ci,slot)=>{if(done||placed[slot]!==-1||placed.includes(ci))return;const c=cards[ci];
  if(ci===slot){placed[slot]=ci;c.g.setAttribute('transform',`translate(${sx(slot)+(sw-cw)/2},${sy(slot)+(sh-ch)/2})`);c.g.style.cursor='default';L.snd.ok&&L.snd.ok();sc.say('✅ '+SET.items[ci][2],'ok');
   if(placed.every(v=>v>=0)){done=true;api.say&&0;pulse()}}
  else{errs++;back(ci);L.snd.no&&L.snd.no();sc.say('Not there. '+SET.items[ci][1]+'. Which step does that happen at?','warn');if(chal&&errs>=3)api.nope('Think of the signal as a message travelling: it must be detected, travel in, be passed across, travel out, then make something happen.')}};
 async function pulse(){const dot=E('circle',{r:9,fill:'#ff7a00',stroke:'#fff','stroke-width':3},gC);for(let i=0;i<N;i++){const x=sx(i)+sw/2,y=sy(i)+sh/2;dot.setAttribute('cx',x);dot.setAttribute('cy',y);await sc.sleep(380)}dot.remove();sc.say('The signal went through the spinal cord only: a reflex is fast because it skips the brain\'s thinking.'.replace('spinal cord',chal?'brain stem':'spinal cord'),'ok');if(chal)api.solved();else{api.award('did');api.ready()}}
 ord.forEach((ci,k)=>card(k,ci));
 api.ctrl.innerHTML=(chal?'<p style="margin:0 0 6px;font-size:14px"><b>Pupil reflex.</b> Drag each part into the right box in order.</p>':'<p style="margin:0 0 4px;font-size:14px"><b>Drag each card</b> into the numbered box where it belongs.</p>')+'<div class="row"><button id="rs">↺ Start again</button></div>';
 api.ctrl.querySelector('#rs').onclick=()=>{if(done)return;placed.fill(-1);cards.forEach((c,ci)=>{c.g.style.cursor='grab';back(ci)});errs=0;sc.say('Cards back. Start again.')};
 sc.say(chal?'Light hits the eye. What happens first?':'The finger touches the hot pan. What is the first part to notice?')},
demo:[[S=>S.put(0,0),'First the receptor in the skin notices the heat.',1000],[S=>S.put(1,1),'The sensory neuron carries the message in.',1000],[S=>S.put(2,2),'The spinal cord passes it straight across.',1000],[S=>S.put(3,3),'The motor neuron carries the order out.',1000],[S=>S.put(4,4),'The muscle pulls the hand away.',1000]],
why:['A <span class="word">reflex action</span> is quick, automatic and involuntary. You do not decide to do it.','Path: <b>Stimulus → Receptor → Sensory neuron → Spinal cord (relay) → Motor neuron → Effector → Response</b>. This is the <span class="word">reflex arc</span>.','The signal goes through the spinal cord without waiting for the brain, so it is faster. The brain is told afterwards, and that is when you feel the pain.','Voluntary actions (like writing) involve the brain deciding. Reflexes protect us from danger: blinking, coughing, knee jerk.'],
check:[{q:'Which part carries the message from the receptor to the spinal cord?',options:['Motor neuron','Sensory neuron','Muscle','Skin'],answer:1,why:'Sensory neurons carry messages in.',hint:'Sensory = senses.'},
 {q:'Why is a reflex action fast?',options:['The brain thinks quickly','The signal skips the brain\'s thinking and goes through the spinal cord','Muscles are strong','Nerves are short'],answer:1,why:'The relay in the spinal cord gives a shortcut.',hint:'A shortcut.'},
 {q:'Which is a reflex action?',options:['Writing a letter','Blinking when dust flies at your eye','Riding a bicycle','Doing sums'],answer:1,why:'Blinking is automatic and protective.',hint:'Not decided by you.'}],
challenge:{text:'Now the <b>pupil reflex</b>: a bright light makes your pupil shrink. Put the five parts in the right order.',win:'Retina → optic nerve → brain stem → motor nerve → iris muscle.'},
real:['Doctors tap your knee to test if your reflexes and nerves work.','Reflexes help a baby feed and grip from the day it is born.','Pulling your foot off a thorn happens before you feel it.'],
words:{Reflex:'A quick automatic response to a stimulus.',Receptor:'A cell or organ that detects a stimulus.',Neuron:'A nerve cell.',Effector:'A muscle or gland that makes the response.'}
});
