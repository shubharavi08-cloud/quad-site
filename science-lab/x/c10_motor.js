QLab.register({
id:'c10_motor',code:'10-P8',title:'Force on a current in a magnetic field (motor effect)',grade:10,subject:'Physics',emoji:'🧲',
hook:{title:'An electric fan has no engine, only magnets and wires. How does it spin?',text:'A wire carrying current in a magnetic field feels a push. Switch the current on and see which way the rod moves, then change the current and magnet.'},
prior:'You know that current creates a magnetic field and that magnets attract or repel each other.',
guess:{q:'A current-carrying rod sits between the poles of a magnet. When you switch the current on, the rod…',options:['does not move','feels a force and moves','heats up and melts','becomes a magnet only'],answer:1,hint:'This is what turns the motor in a fan.',after:'Now change the current and the magnet.'},
build(api){
 const L=QLab.lab,E=L.E,chal=!!api.challenge,stage=api.stage;
 const sc=L.scene(stage,{alt:'A rod carrying current between magnet poles, moving up or down'});
 const W=sc.W,H=sc.H,P=sc.portrait;
 const cx=W/2,cy=P?300:235,rg=P?70:80;
 let on=false,Iv=1,Bv=1,pos=0,tgt=0,flags=new Set(),won=false;
 const T=(p,x,y,t,o)=>{const e=E('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Fredoka,system-ui',class:'lkhint'},o||{}),p);e.textContent=t;return e};
 const g=E('g',{},sc.gMain);
 function draw(){g.innerHTML='';const mw=P?80:110,mh=P?190:200,mx1=P?20:110,mx2=W-(P?20:110)-mw,my=cy-mh/2;
  const left=Bv>0?['#e5534b','N']:['#2f7fd6','S'],right=Bv>0?['#2f7fd6','S']:['#e5534b','N'];
  E('rect',{x:mx1,y:my,width:mw,height:mh,rx:8,fill:left[0],stroke:'#333','stroke-width':3},g);T(g,mx1+mw/2,cy+9,left[1],{'font-size':32,'font-weight':900,fill:'#fff',class:''});
  E('rect',{x:mx2,y:my,width:mw,height:mh,rx:8,fill:right[0],stroke:'#333','stroke-width':3},g);T(g,mx2+mw/2,cy+9,right[1],{'font-size':32,'font-weight':900,fill:'#fff',class:''});
  for(let k=-2;k<=2;k++){const y=cy+k*38,a=mx1+mw+8,b=mx2-8,dir=Bv;E('line',{x1:a,y1:y,x2:b,y2:y,stroke:'#7d6bd6','stroke-width':2,opacity:.55},g);const ax=dir>0?b:a;E('polygon',{points:`${ax},${y} ${ax-dir*10},${y-5} ${ax-dir*10},${y+5}`,fill:'#7d6bd6',opacity:.7},g)}
  T(g,cx,cy-rg-54-(P?0:0),Bv>0?'Field: N → S':'Field: S → N (flipped)',{'font-size':P?12:14,'font-weight':800,fill:'#5b4bc4',class:''});
  const y=cy+pos;E('line',{x1:cx,y1:cy-rg-20,x2:cx,y2:cy+rg+20,stroke:'#cfd6e6','stroke-width':2,'stroke-dasharray':'5 5'},g);
  E('circle',{cx:cx,cy:y,r:20,fill:on?'#ffc94a':'#d9dde6',stroke:'#555','stroke-width':4},g);
  if(Iv>0){E('circle',{cx:cx,cy:y,r:5,fill:'#222'},g)}else{E('line',{x1:cx-8,y1:y-8,x2:cx+8,y2:y+8,stroke:'#222','stroke-width':4},g);E('line',{x1:cx-8,y1:y+8,x2:cx+8,y2:y-8,stroke:'#222','stroke-width':4},g)}
  T(g,cx-30,y+5,P?(Iv>0?'I ●':'I ✕'):(Iv>0?'current out ●':'current in ✕'),{'font-size':P?12:13,'font-weight':900,fill:'#8a5a00','text-anchor':'end',class:''});
  if(on){const d=Iv*Bv>0?-1:1;E('line',{x1:cx+36,y1:y,x2:cx+36,y2:y+d*44,stroke:'#2e9d5b','stroke-width':6,'stroke-linecap':'round'},g);E('polygon',{points:`${cx+36},${y+d*54} ${cx+28},${y+d*40} ${cx+44},${y+d*40}`,fill:'#2e9d5b'},g);T(g,cx+(P?62:70),y+d*30,'Force',{'font-size':13,'font-weight':900,fill:'#237a47',class:''})}
  api.ctrl.querySelector('#sw')&&(api.ctrl.querySelector('#sw').textContent=on?'⏻ Switch OFF':'⏻ Switch ON');
  const c=api.ctrl.querySelector('#fl');if(c){const t=[['b','Current out, field N→S: rod moves up'],['r','Reverse current: moves down'],['f','Flip magnet: moves down'],['bo','Reverse both: up again']];c.innerHTML=t.map(x=>`<span style="display:inline-block;margin:2px 8px 2px 0;font-size:13px">${flags.has(x[0])?'✅':'⬜'} ${x[1]}</span>`).join('')}}
 function step(){if(!stage.isConnected)return;pos+=(tgt-pos)*.12;if(Math.abs(tgt-pos)<.5)pos=tgt;draw();
  if(chal&&!won&&on&&pos>rg-8){won=true;api.solved()}requestAnimationFrame(step)}
 function note(){if(!on)return;const k=Iv>0&&Bv>0?'b':Iv<0&&Bv>0?'r':Iv>0&&Bv<0?'f':'bo';if(!chal&&!flags.has(k)){flags.add(k);if(flags.size===4){api.award('did');api.ready();sc.say('Force direction depends on BOTH the current and the field. Reverse one and it reverses; reverse both and it stays. (Fleming\'s left-hand rule)','ok')}}}
 const aim=()=>{tgt=on?(Iv*Bv>0?-rg:rg):0;note()};
 sc.on=v=>{on=v===undefined?!on:!!v;L.snd.pop&&L.snd.pop();aim();sc.say(on?'Current ON: the rod feels a force.':'Current OFF: no force, the rod returns.')};
 sc.rev=()=>{Iv=-Iv;L.snd.pop&&L.snd.pop();aim();sc.say('Current reversed.')};
 sc.flip=()=>{Bv=-Bv;L.snd.pop&&L.snd.pop();aim();sc.say('Magnet turned round.')};
 sc.rg=rg;
 api.ctrl.innerHTML=(chal?'<p style="margin:0 0 6px;font-size:14px"><b>Make the rod move DOWN.</b> Change one thing, then switch on.</p>':'<p style="margin:0 0 4px;font-size:14px"><b>Switch on</b>, then <b>reverse the current</b> or <b>flip the magnet</b>. Tick all four.</p>')+'<div class="row"><button class="pri" id="sw">⏻ Switch ON</button><button id="rv">↔ Reverse current</button><button id="fm2">🔄 Flip magnet</button></div>'+(chal?'':'<div id="fl"></div>');
 api.ctrl.querySelector('#sw').onclick=()=>sc.on();api.ctrl.querySelector('#rv').onclick=()=>sc.rev();api.ctrl.querySelector('#fm2').onclick=()=>sc.flip();
 draw();sc.say(chal?'Which one change makes it move down?':'Switch the current on.');step()},
demo:[[S=>S.on(),'Current on: the rod is pushed up.',1300],[S=>S.rev(),'Reverse the current: pushed down.',1300],[S=>S.flip(),'Flip the magnet as well: up again.',1300]],
why:['A wire carrying current in a magnetic field feels a force. This is the <span class="word">motor effect</span>.','The force is greatest when the current is at right angles to the field.','<b>Fleming\'s left-hand rule:</b> first finger = Field, second finger = Current, thumb = Motion (force). All at right angles.','Reverse the current OR the field and the force reverses. Reverse both and it stays. This is how electric motors keep turning.'],
check:[{q:'The current is reversed but the magnet is left alone. The force…',options:['reverses','stays the same','doubles','vanishes'],answer:0,why:'Force depends on both directions; one reversal flips it.',hint:'Think about the rod moving.'},
 {q:'Which hand rule predicts the force direction?',options:['Right-hand grip rule','Fleming\'s left-hand rule','Fleming\'s right-hand rule','Lenz\'s rule'],answer:1,why:'Left hand for motors (motor effect).',hint:'FBI: Field, current (I), thrust.'},
 {q:'Which device uses the motor effect?',options:['Electric fan','Torch','Solar cell','Candle'],answer:0,why:'The motor in a fan spins because of the force on coils.',hint:'Spins when plugged in.'}],
challenge:{text:'Make the rod move <b>down</b> when the current is on. What must change from the start?',win:'Changing either the current or the field (not both) reverses the force.'},
real:['Fans, mixers, washing machines and trains use electric motors.','Loudspeakers move a cone using this force.','Electric cars are driven by motors.'],
words:{'Motor effect':'A force on a current-carrying wire in a magnetic field.','Fleming\'s left-hand rule':'Field, Current, Motion at right angles using the left hand.',Force:'A push or pull.',Motor:'A device that turns electrical energy into movement.'}
});
