QLab.register({
id:'c10_indicators',code:'10-C2',title:'Indicators and the pH scale',grade:10,subject:'Chemistry',emoji:'🌈',
hook:{title:'How can colour tell us if something is acidic or basic?',text:'Test everyday liquids with litmus, phenolphthalein, methyl orange and universal indicator.'},
prior:'You have tasted lemon (sour) and felt soap (slippery).',
guess:{q:'Blue litmus paper dipped in lemon juice turns…',options:['Red','Stays blue','Green','White'],answer:0,hint:'Acids turn blue litmus red.',after:'Test other liquids.'},
build(api){
 const L=QLab.lab,chal=!!api.challenge;
 const S0=[['Stomach\nacid',1,'#ffe9e0'],['Lemon\njuice',2,'#fff3a8'],['Vinegar',3,'#fbeedd'],['Tomato\njuice',4.5,'#ff9d8a'],['Pure\nwater',7,'#e4f3ff'],['Baking\nsoda',8.3,'#eef6ff'],['Soap\nwater',10,'#f1f4ff'],['Washing\nsoda',11,'#eaf1ff'],['Drain\ncleaner',13,'#e8f0ff']];
 const S=chal?S0.slice(0,0).concat([['Mystery',12,'#eef3ff']]):S0;
 const IN={'Blue litmus':p=>p<7?['#e5534b','red']:['#4a6cf7','blue'],'Red litmus':p=>p>7?['#4a6cf7','blue']:['#e5534b','red'],'Phenolphthalein':p=>p>8.3?['#ff5fa8','pink']:['#f4f8ff','colourless'],'Methyl orange':p=>p<3.1?['#e5534b','red']:p<4.4?['#f08a3c','orange']:['#f2d84a','yellow'],'Universal indicator':p=>{const c=['#d62828','#e5534b','#f27c3c','#f5a623','#f2d84a','#9ad04f','#3fa34d','#2f9e8f','#2a7fd1','#3b5bdb','#4c3fd1','#5a2fb8','#6a1fa0','#5b1486'];return[c[Math.min(13,Math.max(0,Math.round(p)-1))],'pH '+p]}};
 const sc=L.scene(api.stage,{alt:'Test tubes of everyday liquids and indicator tools on a lab bench'});
 const n=S.length,PT=sc.portrait,log=new Set(),sols=new Set();
 const posOf=i=>chal?{x:sc.W/2,y:PT?330:300}:PT?(i<5?{x:52+i*79,y:262}:{x:92+(i-5)*79,y:410}):{x:380-66*(n-1)/2+i*66,y:300};
 // pH colour strip on the wall
 const SW=PT?24:32,strip=L.E('g',{transform:PT?'translate(42,112)':'translate(150,86)'},sc.gBack);if(!chal){const c=['#d62828','#e5534b','#f27c3c','#f5a623','#f2d84a','#9ad04f','#3fa34d','#2f9e8f','#2a7fd1','#3b5bdb','#4c3fd1','#5a2fb8','#6a1fa0','#5b1486'];c.forEach((k,i)=>L.E('rect',{x:i*SW,y:0,width:SW,height:20,fill:k,rx:i===0?8:i===13?8:0},strip));[0,3,6,9,13].forEach(i=>{const t=L.E('text',{x:i*SW+SW/2,y:36,'text-anchor':'middle',class:'lkhint'},strip);t.textContent=i+1});const t=L.E('text',{x:SW*7,y:-6,'text-anchor':'middle',class:'lkhint'},strip);t.textContent=PT?'Universal colours: acid ◀ pH ▶ base':'Universal indicator colours: acid  ◀  pH  ▶  base'}
 const V=S.map((x,i)=>{const q=posOf(i);return sc.vessel({x:q.x,y:q.y,type:'tube',h:PT?96:150,level:.55,color:x[2],label:x[0],data:{ph:x[1],base:x[2],i}})});
 const tools=[['Blue litmus','#4a6cf7','strip'],['Red litmus','#e5534b','strip'],['Phenolphthalein','#f4f8ff','drop'],['Methyl orange','#f08a3c','drop'],['Universal indicator','#3fa34d','drop']];
 const nm={'Blue litmus':'Blue litmus','Red litmus':'Red litmus','Phenolphthalein':'Phenol-\nphthalein','Methyl orange':'Methyl\norange','Universal indicator':'Universal'};
 tools.forEach((t,i)=>{const tt=sc.tool({x:PT?48+i*81:100+i*140,y:PT?492:372,label:t[0]==='Universal indicator'?'Universal':t[0]==='Phenolphthalein'?'Phenolphth.':t[0],ly:PT?40:44,scale:.8,draw:(g,D)=>t[2]==='strip'?D.strip(g,t[1]):D.dropper(g,t[0]==='Phenolphthalein'?'#f9d3e6':t[1]),
  use:async(v,T)=>{const ph=v.data.ph,r=IN[t[0]](ph);sc.deselect();
   if(v.data.tint){v.setColor(v.data.base,300);await sc.sleep(300)}
   if(t[2]==='strip'){const dx=v.x,top=v.y-v.h;await new Promise(res=>{T.place(dx,top-20);setTimeout(res,100)});T.inner.querySelector('.tip').setAttribute('fill',t[1]);T.place(dx,v.y-v.h*.4);await sc.sleep(500);const tip=T.inner.querySelector('.tip');tip.style.transition='fill 1s';tip.setAttribute('fill',r[0]);await sc.sleep(1100);L.snd.pop();await sc.sleep(500);T.inner.querySelector('.tip').style.transition='';T.inner.querySelector('.tip').setAttribute('fill',t[1])}
   else{await new Promise(res=>v.drop(t[0]==='Phenolphthalein'?'#f9d3e6':t[1],res));v.setColor(r[0],1100);v.data.tint=1;await sc.sleep(900)}
   const lbl=S[v.data.i][0].replace('\n',' ');const word=ph<7?'ACID':ph>7?'BASE':'NEUTRAL';
   // chip in notebook above the tube
   const k=(v.data.chips=(v.data.chips||0)+1);if(k<=3)L.E('circle',{cx:v.x+27,cy:v.y-v.h+16+(k-1)*18,r:7,fill:r[0],stroke:'#2b2350','stroke-width':1.5},sc.gMain);
   sc.say(`${lbl} with ${nm[t[0]].replace('-\n','')}: ${r[1]}. This is ${chal?'a clue!':word+'.'}`,'ok');L.snd.ok();
   log.add(v.data.i+t[0]);sols.add(v.data.i);if(!chal&&log.size>=6&&sols.size>=3){api.award('did');api.ready()}}})});
 sc.say(chal?'Test the mystery tube with litmus and phenolphthalein. Drag a tool onto it.':'Drag an indicator onto a test tube. Or tap a tool, then tap a tube.');
 if(chal){api.ctrl.innerHTML=`<p><b>What is the mystery liquid?</b></p><div class="row" id="my"><button data-a="acid">An acid</button><button data-a="base">A base</button><button data-a="neutral">Neutral</button></div>`;api.ctrl.querySelectorAll('#my button').forEach(b=>b.onclick=()=>b.dataset.a==='base'?api.solved():api.nope('Red litmus turns blue only in a base. Phenolphthalein turns pink only in a base.'))}
 else api.ctrl.innerHTML=`<p class="lockhint" style="margin:0;text-align:left">Test 3 different liquids with 2 indicators to unlock the next step.</p>`},
demo:[[0,1,'Dip blue litmus in lemon juice. It turns red, so lemon juice is an acid.'],[1,6,'Red litmus in soap water turns blue. Soap water is a base.'],[2,6,'Phenolphthalein turns pink in a base.'],[4,4,'Universal indicator turns green in pure water. Water is neutral.']],
why:['An <span class="word">indicator</span> changes colour depending on whether a solution is acidic or basic.','<b>Blue litmus</b> turns red in acid. <b>Red litmus</b> turns blue in a base. <b>Phenolphthalein</b> is colourless in acid and pink in a base. <b>Methyl orange</b> is red in acid and yellow in a base.','The <span class="word">pH scale</span> runs from 0 to 14. Below 7 is acidic, 7 is neutral (pure water) and above 7 is basic.','<b>Universal indicator</b> gives a different colour for each pH, so you can read the number.'],
check:[{q:'A solution has pH 3. It is…',options:['Acidic','Basic','Neutral','Salt'],answer:0,why:'Below 7 is acidic.',hint:'Lower than 7.'},
 {q:'Which indicator turns pink in a base?',options:['Blue litmus','Methyl orange','Phenolphthalein','Universal indicator'],answer:2,why:'Phenolphthalein is pink in bases.',hint:'Try the soap solution.'},
 {q:'Pure water has a pH of…',options:['0','7','10','14'],answer:1,why:'Pure water is neutral.',hint:'Middle of the scale.'}],
challenge:{text:'A mystery liquid turns <b>red litmus blue</b> and <b>phenolphthalein pink</b>. What is it?',win:'Both clues point to a base.'},
real:['Doctors and farmers test pH of soil, blood and water.','Antacids are bases that neutralise stomach acid.','Red cabbage juice is a natural indicator.'],
words:{Indicator:'A substance that changes colour in acid or base.',pH:'A number showing how acidic or basic a solution is.',Acid:'pH below 7.',Base:'pH above 7.',Neutral:'pH 7.'}
});
