QLab.register({
id:'c10_salts',code:'10-C2',title:'Salt family: make salts from acids and bases',grade:10,subject:'Chemistry',emoji:'🧂',
hook:{title:'Table salt is one of a whole family. Mix any acid with any base and you make a salt.',text:'Choose an acid and a base. See the salt, its formula and whether it is acidic, neutral or basic.'},
prior:'You know neutralisation from the last experiment.',
guess:{q:'Hydrochloric acid and sodium hydroxide make which salt?',options:['Sodium sulphate','Sodium chloride','Potassium chloride','Calcium chloride'],answer:1,hint:'Cl from HCl and Na from NaOH.',after:'Build other salts.'},
build(api){
 const L=QLab.lab,chal=!!api.challenge,sc=L.scene(api.stage,{alt:'Acid and base bottles, a beaker and a burner on a lab bench'}),PT=sc.portrait;
 const AC={HCl:['chloride','Cl',1,1],H2SO4:['sulphate','SO₄',2,1],HNO3:['nitrate','NO₃',1,1],H2CO3:['carbonate','CO₃',2,0]};
 const BA={NaOH:['sodium','Na',1,1],KOH:['potassium','K',1,1],'Ca(OH)2':['calcium','Ca',2,1],NH4OH:['ammonium','NH₄',1,0]};
 const LB={HCl:'HCl',H2SO4:'H₂SO₄',HNO3:'HNO₃',H2CO3:'H₂CO₃',NaOH:'NaOH',KOH:'KOH','Ca(OH)2':'Ca(OH)₂',NH4OH:'NH₄OH'};const lab=k=>LB[k]||k;
 let a=null,b=null,step=0,made=null;const seen=new Set();
 function salt(){const A=AC[a],B=BA[b];
  const fm=B[2]===A[2]?B[1]+A[1]:B[2]===2?B[1]+(A[1].length>2?'('+A[1]+')':A[1])+'₂':(B[1].length>2?'('+B[1]+')':B[1])+'₂'+A[1];
  const nature=A[3]&&B[3]?'neutral':A[3]&&!B[3]?'acidic':!A[3]&&B[3]?'basic':'depends';
  const msg=fm==='CaCO₃'?'insoluble: it settles as a white solid (chalk, marble)':fm==='CaSO₄'?'only slightly soluble; its solution is neutral':nature==='depends'?'nearly neutral in water':'its solution is '+nature;return{name:B[0]+' '+A[0],fm,nature,msg}}
 const bk=sc.vessel({x:PT?210:380,y:PT?330:282,type:'beaker',w:PT?120:130,h:PT?130:150,level:0,color:'#ffd1d1',label:'Beaker',data:{}});
 const empty=()=>{a=b=null;step=0;bk.setLevel(0,600);bk.sediment('#fff',0);bk.glow('#ff7a33',false);bk.setColor('#ffd1d1',300);sc.say('Pick an acid bottle and a base bottle. Drag each into the beaker.')};
 const mk=(k,i,isA)=>sc.tool({x:PT?(isA?50:50)+i*82:(isA?60+i*72:500+i*72),y:PT?(isA?425:497):366,label:lab(k),ly:32,scale:.8,draw:(g,D)=>D.bottle(g,isA?'#ffd1d1':'#cfe4ff',isA?'#e5534b':'#4a6cf7'),
  use:async()=>{sc.deselect();if(step>=1){sc.say('Press "New beaker" to start again.');L.snd.no();return}
   if(isA&&a||!isA&&b){sc.say('You already added '+(isA?'an acid':'a base')+'. Add the other one.');L.snd.no();return}
   if(isA)a=k;else b=k;await new Promise(r=>bk.drop(isA?'#ff9aa2':'#9ec8ff',r));bk.setLevel(a&&b?.6:.35,900);bk.setColor(isA?'#ffd1d1':'#cfe4ff',600);L.snd.drop();
   if(a&&b){const s=salt();step=1;made=s;await sc.sleep(500);bk.setColor(s.nature==='neutral'?'#7fd37a':s.nature==='acidic'?'#ffb347':s.nature==='basic'?'#6a8cff':'#9fe3b0',900);bk.glow('#ff9a3c',true);bk.bubbles(1200,14,'#fff',1);
    sc.say(`Mixed. Colour: ${s.nature==='neutral'?'green = neutral':s.nature==='acidic'?'orange = acidic':s.nature==='basic'?'blue = basic':'almost neutral'}. Now heat it with the burner.`,'ok');L.snd.ok()}
   else sc.say(isA?'Acid added. Now add a base.':'Base added. Now add an acid.')}});
 Object.keys(AC).forEach((k,i)=>mk(k,i,true));Object.keys(BA).forEach((k,i)=>mk(k,i,false));
 sc.tool({x:PT?372:420,y:PT?470:366,label:'Burner',ly:36,scale:.9,draw:g=>{g.innerHTML=`<rect x="-14" y="10" width="28" height="22" rx="4" fill="#8a94a6"/><rect x="-6" y="-8" width="12" height="20" fill="#b8c2d6"/><path d="M0 -10C-9 -22 -6 -30 0 -40C6 -30 9 -22 0 -10Z" fill="#ff9f1c"/><path d="M0 -12C-4 -20 -3 -26 0 -32C3 -26 4 -20 0 -12Z" fill="#ffe27a"/>`},
  use:async(v)=>{sc.deselect();if(step<1){sc.say('Mix an acid and a base first.');L.snd.no();return}
   if(step>=2)return;step=2;bk.glow('#ff9a3c',false);sc.puff(bk.x,bk.y-bk.h-4,'#ffffff',8,true);bk.setLevel(.05,3200);await sc.sleep(2200);bk.sediment('#ffffff',.9);const s=made;
   seen.add(a+b);sc.say(`${s.name} (${s.fm}): ${s.msg}. Salts made: ${seen.size} of 2.${seen.size>=2?' Done!':' Press New beaker for another.'}`,'ok');L.snd.ok();
   if(!chal&&seen.size>=2){api.award('did');api.ready()}}});
 api.ctrl.innerHTML=`<div class="row"><button id="nb">↺ New beaker</button></div>${chal?'<p><b>Make potassium nitrate, then press check.</b></p><button class="pri" id="ck">Check: I made potassium nitrate</button>':'<p class="lockhint" style="margin:6px 0 0;text-align:left">Make 2 different salts to unlock the next step.</p>'}`;
 api.ctrl.querySelector('#nb').onclick=empty;
 if(chal)api.ctrl.querySelector('#ck').onclick=()=>a==='HNO3'&&b==='KOH'?api.solved():api.nope('Potassium comes from KOH and nitrate from HNO₃. You chose '+(a?lab(a):'no acid')+' and '+(b?lab(b):'no base')+'.');
 empty()},
why:['A <span class="word">salt</span> is made when the hydrogen of an acid is replaced by a metal (or ammonium) from a base.','Name: <b>metal name</b> from the base + <b>anion name</b> from the acid. HCl gives chlorides, H₂SO₄ gives sulphates, HNO₃ gives nitrates, H₂CO₃ gives carbonates.','Strong acid + strong base → <b>neutral</b> salt (NaCl, pH 7). Strong acid + weak base → <b>acidic</b> salt (NH₄Cl). Weak acid + strong base → <b>basic</b> salt (Na₂CO₃).','Salts of the same acid or the same base form a <b>family</b>, for example all chlorides.'],
check:[{q:'H₂SO₄ + 2NaOH → ?',options:['Sodium sulphate + water','Sodium chloride + water','Sodium nitrate + water','Sodium carbonate + water'],answer:0,why:'Sulphate from sulphuric acid, sodium from sodium hydroxide.',hint:'Name from each part.'},
 {q:'NaCl in water is…',options:['Acidic','Basic','Neutral','A metal'],answer:2,why:'Strong acid + strong base.',hint:'pH 7.'},
 {q:'Sodium carbonate in water is…',options:['Acidic','Basic','Neutral','Insoluble'],answer:1,why:'It comes from a weak acid and a strong base.',hint:'Washing soda feels slippery.'}],
challenge:{text:'Make <b>potassium nitrate</b>. Choose the right acid and base, then check.',win:'HNO₃ + KOH → KNO₃ + H₂O.'},
real:['Common salt (NaCl) is food and a preservative.','Washing soda (Na₂CO₃) softens water.','Plaster of Paris and gypsum are calcium sulphate salts.'],
words:{Salt:'Product of an acid and a base.',Neutralisation:'Acid + base reaction.','Strong acid':'Fully ionises in water.','Weak acid':'Only partly ionises.'}
});
