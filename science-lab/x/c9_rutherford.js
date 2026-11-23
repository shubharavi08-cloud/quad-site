QLab.register({
id:'c9_rutherford',code:'9-C2',title:"Rutherford's gold foil: finding the nucleus",grade:9,subject:'Chemistry',emoji:'☢️',
hook:{title:'What is inside an atom? In 1909 scientists fired tiny particles at gold foil to find out.',text:'You will repeat their experiment. What the particles do tells you what the atom looks like inside.'},
prior:'Know that atoms are tiny and that alpha particles are small positively charged particles.',
guess:{q:'If an atom were a smooth ball of positive jelly, what would fast alpha particles do when fired through a thin gold foil?',options:['Mostly bounce straight back','Mostly pass straight through','All stop inside the foil','All turn at right angles'],answer:1,hint:'Smooth jelly is a weak obstacle for a fast particle.',after:'Now fire real particles and compare.'},
build(api){
 const chal=!!api.challenge;let n=0,pass=0,small=0,back=0;
 api.ctrl.innerHTML=`<button class="pri" id="f">☢️ Fire 100 particles</button><p>Fired: <b id="a"></b></p><p>Went straight through: <b id="b"></b></p><p>Bent a little: <b id="c"></b></p><p>Bounced back: <b id="d"></b></p><p style="font-size:12px;color:#55688a">Simplified so you can see the rare events. In the real experiment only about 1 in 8000 bounced back.</p>${chal?'<p><b>The few particles that bounced back show the atom has…</b></p><div class="row" id="ch" style="flex-wrap:wrap"><button data-a="a">A tiny, dense, positive nucleus</button><button data-a="b">A smooth positive jelly</button><button data-a="c">No electrons</button></div>':''}`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(){let L='';const k=Math.min(n,300)/300;
  for(let i=0;i<14;i++){const y=60+i*17;L+=`<line x1="40" y1="${y}" x2="360" y2="${y}" stroke="#2aa5d8" stroke-width="2" opacity=".6"/><line x1="360" y1="${y}" x2="720" y2="${y}" stroke="#2aa5d8" stroke-width="2" opacity="${n?.6:0}"/>`}
  if(small)L+=`<path d="M40 150 L360 150 L520 100" stroke="#2aa5d8" stroke-width="2.5" fill="none"/><path d="M40 190 L360 190 L520 250" stroke="#2aa5d8" stroke-width="2.5" fill="none"/>`;
  if(back)L+=`<path d="M40 175 L330 175 L140 140" stroke="#e5534b" stroke-width="3" fill="none"/>`;
  api.stage.innerHTML=QLab.svg(760,320,`<rect width="760" height="320" fill="none"/><rect x="345" y="30" width="30" height="260" fill="#f2c230" opacity=".5" stroke="#b8860b"/><text x="360" y="22" text-anchor="middle" font-size="13" font-weight="800">gold foil</text>${n?L:''}${[...Array(6)].map((_,i)=>`<circle cx="360" cy="${60+i*45}" r="14" fill="none" stroke="#b8860b" opacity=".4"/>`).join('')}<circle cx="360" cy="${175}" r="3.5" fill="#e5534b"/><text x="40" y="310" font-size="12" fill="#55688a">alpha particle gun →</text>`);
  q('#a').textContent=n;q('#b').textContent=pass;q('#c').textContent=small;q('#d').textContent=back}
 q('#f').onclick=()=>{small+=2+(n/100%3===0?1:0);back+=((n/100)%2===1)?1:0;n+=100;pass=n-small-back;draw();
  if(n===100)api.coach('info','Look!','Almost all went straight through. The atom is mostly empty space.');
  if(!chal&&n>=500&&back>=1){api.award('did');api.ready()}else if(back>=1&&n<500)api.coach('warn','One bounced back!','Keep firing to see how rare it is.')};
 if(chal)q('#ch').querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.a==='a'?api.solved():api.nope(b.dataset.a==='b'?'Jelly could not make a fast particle bounce back. Something small and heavy must be in the middle.':'The bounce is about a positive particle meeting something positive and dense. Electrons are very light.'));
 draw()},
why:['<b>Most particles went straight through</b>. So the atom is mostly <b>empty space</b>.','<b>A few bent</b> and a <b>very few bounced back</b>. Something small, heavy and positive must be in the middle to repel them.','That something is the <span class="word">nucleus</span>. It is about 100,000 times smaller than the atom but holds nearly all the mass.','Electrons move around the nucleus in the empty space. This is <b>Rutherford\'s nuclear model</b> (1911).'],
check:[{q:'Most alpha particles passed straight through the foil. What does this show?',options:['Atoms are solid','Atoms are mostly empty space','Gold is liquid','Alpha particles are huge'],answer:1,why:'If atoms were solid, most would be blocked.',hint:'Look at how many went through.'},
 {q:'A few particles bounced back. This shows the nucleus is…',options:['Large and soft','Small, dense and positive','Negative','Empty'],answer:1,why:'Only a tiny dense positive centre could turn a particle round.',hint:'Positive repels positive.'},
 {q:'Where is most of the mass of an atom?',options:['In the empty space','In the electrons','In the nucleus','Spread evenly'],answer:2,why:'The nucleus holds protons and neutrons, which are heavy.',hint:'The dense centre.'}],
challenge:{text:'The rare particles that <b>bounced back</b> show what about the atom?',win:'A tiny, dense, positive nucleus. That was Rutherford\'s big discovery.'},
real:['Nuclear power stations use energy from nuclei.','Smoke detectors contain a source of alpha particles.','Cancer treatment uses radiation from nuclei.'],
words:{Nucleus:'The tiny dense centre of an atom.','Alpha particle':'A fast positive particle, a helium nucleus.',Atom:'The smallest unit of an element.','Empty space':'Most of the volume of an atom.'}
});
