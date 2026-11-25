QLab.register({
id:'c10_displace',code:'10-C3',title:'Metal showdown: displacement reactions',grade:10,subject:'Chemistry',emoji:'🥊',
hook:{title:'Put an iron nail in blue copper sulphate. It turns red-brown. Where did the copper come from?',text:'A more reactive metal can push a less reactive one out of its salt solution. Test the pairs.'},
prior:'You know that some metals are more reactive than others.',
guess:{q:'An iron nail is dipped in blue copper sulphate solution. After a while…',options:['Nothing happens','The nail gets a red-brown copper coating','The solution turns red','The nail dissolves completely'],answer:1,hint:'Iron is more reactive than copper.',after:'Try other pairs.'},
build(api){
 const chal=!!api.challenge;
 if(chal)return QLab.kit.sorter(api,{items:[['Zn + FeSO₄','y','Zinc is above iron, so it displaces it.'],['Cu + ZnSO₄','n','Copper is below zinc. No reaction.'],['Mg + CuSO₄','y','Magnesium is above copper.'],['Ag + FeSO₄','n','Silver is below iron. No reaction.']],cats:[['y','Reaction'],['n','No reaction']],hint:'Is the metal above the one in the solution in the reactivity series? Mg, Zn, Fe, Cu, Ag.',done:()=>api.solved()});
 const L=QLab.lab,sc=L.scene(api.stage,{alt:'Four beakers of metal salt solutions and five metal strips on a lab bench'}),PT=sc.portrait;
 const RK=['Mg','Zn','Fe','Cu','Ag'],MET={Mg:'#dfe4ea',Zn:'#b8c2cc',Fe:'#8c969f',Cu:'#d98a4b',Ag:'#e6e9ee'},ION={Mg:'#f4f8ff',Zn:'#f4f8ff',Fe:'#cde9c9',Cu:'#58b7ff',Ag:'#f4f8ff'};
 const SOL=[['CuSO₄','Cu'],['FeSO₄','Fe'],['ZnSO₄','Zn'],['AgNO₃','Ag']];
 const OUT={'Fe|Cu':'Copper coats the iron. Blue fades to pale green: FeSO₄ forms.','Zn|Cu':'Copper coats the zinc. Blue fades to colourless.','Mg|Cu':'Fast reaction: copper forms and the blue goes.','Cu|Ag':'Silver crystals grow on the copper. The solution turns blue.'};
 const seen=new Set();
 const pos=i=>PT?{x:i%2?300:120,y:i<2?235:395,h:100}:{x:155+i*150,y:285,h:130};
 const V=SOL.map((s,i)=>{const p=pos(i);return sc.vessel({x:p.x,y:p.y,type:'beaker',w:PT?100:116,h:p.h,level:.6,color:ION[s[1]],label:s[0],data:{s,cur:s[1]}})});
 const reset=()=>{V.forEach(v=>{v.data.cur=v.data.s[1];v.setColor(ION[v.data.s[1]],500);v.sediment('#fff',0)});sc.say('Fresh solutions. Drag a metal strip into a beaker.')};
 RK.forEach((m,i)=>sc.tool({x:PT?45+i*82:130+i*125,y:PT?498:366,label:m,ly:32,draw:g=>{g.innerHTML=`<rect x="-9" y="-34" width="18" height="68" rx="3" fill="${MET[m]}" stroke="#6b7684" stroke-width="2"/><rect x="-5" y="-30" width="4" height="60" rx="2" fill="#fff" opacity=".55"/>`},
  use:async(v)=>{sc.deselect();const cur=v.data.cur;
   if(m===v.data.s[1]&&cur===m){sc.say('Same metal as the solution. Pick a different strip.');L.snd.no();return}
   seen.add(m+v.data.s[1]);
   if(RK.indexOf(m)<RK.indexOf(cur)){await sc.sleep(500);v.data.cur=m;v.setColor(ION[m],1800);v.sediment(MET[cur],.9);v.cloud(MET[cur],.25);if(cur==='Ag'||m==='Mg')v.bubbles(1500,m==='Mg'?30:8,'#ffffff',1);L.snd.ok();
    sc.say('✅ '+(OUT[m+'|'+cur]||`${cur} is pushed out of the solution by ${m}.`),'ok')}
   else{await sc.sleep(700);L.snd.no();sc.say(`❌ No reaction. ${m} is less reactive than ${cur}.`)}
   await sc.sleep(500);if(seen.size>=6){api.award('did');api.ready()}}}));
 sc.say('Drag a metal strip into a beaker. A more reactive metal pushes the other one out.');
 api.ctrl.innerHTML=`<div class="row"><button id="rs">↺ Fresh solutions</button></div><p style="font-size:13px;margin:6px 0 0">Reactivity: Mg > Zn > Fe > Cu > Ag. Try 6 different pairs to unlock the next step.</p>`;
 api.ctrl.querySelector('#rs').onclick=reset},
demo:[[2,0,'Iron goes into blue copper sulphate. Copper coats the iron.'],[4,2,'Silver in zinc sulphate: nothing. Silver is less reactive.'],[0,1,'Magnesium pushes iron out of iron sulphate.']],
why:['A more reactive metal <b>displaces</b> a less reactive metal from its salt solution: Fe + CuSO₄ → FeSO₄ + Cu.','If the metal strip is less reactive than the metal in the solution, <b>nothing happens</b>.','From your tests: Mg > Zn > Fe > Cu > Ag. This is part of the <span class="word">reactivity series</span>.','Displacement reactions are used to extract and recover metals.'],
check:[{q:'Will copper displace iron from FeSO₄?',options:['Yes','No, copper is less reactive','Only when hot','Only in acid'],answer:1,why:'Copper is below iron.',hint:'Series: Mg, Zn, Fe, Cu, Ag.'},
 {q:'Iron nail in CuSO₄ becomes coated with…',options:['Zinc','Copper','Silver','Rust only'],answer:1,why:'Iron displaces copper.',hint:'Red-brown.'},
 {q:'Which metal displaces all the others in your list?',options:['Ag','Cu','Fe','Mg'],answer:3,why:'Magnesium is the most reactive.',hint:'Top of the series.'}],
challenge:{text:'Predict: will each pair <b>react or not</b>?',win:'You can predict displacement from the reactivity series.'},
real:['Copper is recovered from waste solutions using scrap iron.','Zinc galvanising protects iron because zinc is more reactive.','Thermit welding uses aluminium to displace iron.'],
words:{Displacement:'A more reactive element replaces a less reactive one in a compound.','Reactivity series':'Metals ranked by reactivity.',Salt:'Compound of metal and non-metal parts.',Solution:'Mixture of solute in solvent.'}
});
