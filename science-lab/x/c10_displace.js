QLab.register({
id:'c10_displace',code:'10-C3',title:'Metal showdown: displacement reactions',grade:10,subject:'Chemistry',emoji:'🥊',
hook:{title:'Put an iron nail in blue copper sulphate. It turns red-brown. Where did the copper come from?',text:'A more reactive metal can push a less reactive one out of its salt solution. Test the pairs.'},
prior:'You know that some metals are more reactive than others.',
guess:{q:'An iron nail is dipped in blue copper sulphate solution. After a while…',options:['Nothing happens','The nail gets a red-brown copper coating','The solution turns red','The nail dissolves completely'],answer:1,hint:'Iron is more reactive than copper.',after:'Try other pairs.'},
build(api){
 const chal=!!api.challenge;
 const RK=['Mg','Zn','Fe','Cu','Ag'];const SOL={'CuSO₄':['Cu','#58b7ff','blue'],'FeSO₄':['Fe','#cde9c9','pale green'],'ZnSO₄':['Zn','#f4f8ff','colourless'],'AgNO₃':['Ag','#f4f8ff','colourless']};
 const MET={Mg:'#dfe4ea',Zn:'#b8c2cc',Fe:'#8c969f',Cu:'#d98a4b',Ag:'#e6e9ee'};
 const reacts=(m,sol)=>RK.indexOf(m)<RK.indexOf(SOL[sol][0]);
 const OUT={'Fe|CuSO₄':'Copper coats the iron. Blue fades to pale green: FeSO₄ forms.','Zn|CuSO₄':'Copper coats the zinc. Blue fades to colourless: ZnSO₄ forms.','Mg|CuSO₄':'Fast reaction: copper forms and the blue goes.','Cu|AgNO₃':'Silver crystals grow on the copper. The solution turns blue.','Zn|FeSO₄':'Iron is displaced by zinc.','Mg|FeSO₄':'Iron is displaced by magnesium.','Mg|ZnSO₄':'Zinc is displaced by magnesium.','Fe|AgNO₃':'Silver is displaced.','Zn|AgNO₃':'Silver is displaced.','Mg|AgNO₃':'Silver is displaced.'};
 let m='Fe',sol='CuSO₄';const seen=new Set();
 if(chal)return QLab.kit.sorter(api,{items:[['Zn + FeSO₄','y','Zinc is above iron, so it displaces it.'],['Cu + ZnSO₄','n','Copper is below zinc. No reaction.'],['Mg + CuSO₄','y','Magnesium is above copper.'],['Ag + FeSO₄','n','Silver is below iron. No reaction.']],cats:[['y','Reaction'],['n','No reaction']],hint:'Is the metal above the one in the solution in the reactivity series? Mg, Zn, Fe, Cu, Ag.',done:()=>api.solved()});
 api.ctrl.innerHTML=`<b>Metal strip</b><div class="row" id="mm">${RK.map(k=>`<button data-m="${k}">${k}</button>`).join('')}</div><b>Solution</b><div class="row" id="ss">${Object.keys(SOL).map(k=>`<button data-s="${k}">${k}</button>`).join('')}</div><button class="pri" id="go2">▶ Dip the metal in</button><p id="rs" style="font-weight:800"></p><p style="font-size:13px">Series: Mg > Zn > Fe > Cu > Ag</p>`;
 const q=x=>api.ctrl.querySelector(x);let dip=false;
 function draw(){const r=dip&&reacts(m,sol),col=dip&&r?(sol==='CuSO₄'?(m==='Mg'||m==='Zn'?'#f4f8ff':'#cde9c9'):SOL[sol][1]):SOL[sol][1];
  api.stage.innerHTML=QLab.svg(760,300,`<rect width="760" height="300" fill="none"/><path d="M300 90 V245 Q300 260 315 260 H445 Q460 260 460 245 V90" fill="none" stroke="#1b2a4a" stroke-width="5"/><rect x="303" y="130" width="154" height="128" fill="${m==='Cu'&&sol==='AgNO₃'&&r?'#58b7ff':col}" opacity=".85"/><rect x="368" y="${dip?110:40}" width="24" height="130" rx="4" fill="${r&&sol==='CuSO₄'?'#c06b3a':MET[m]}" stroke="#555"/><text x="380" y="30" text-anchor="middle" font-size="16" font-weight="800">${m} in ${sol}</text>${r?'<text x="500" y="200" font-size="30">✨</text>':''}`)}
 q('#mm').querySelectorAll('button').forEach(b=>b.onclick=()=>{m=b.dataset.m;dip=false;q('#mm').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');q('#rs').textContent='';draw()});
 q('#ss').querySelectorAll('button').forEach(b=>b.onclick=()=>{sol=b.dataset.s;dip=false;q('#ss').querySelectorAll('button').forEach(x=>x.className=x===b?'pri':'');q('#rs').textContent='';draw()});
 q('#go2').onclick=()=>{if(m===SOL[sol][0])return api.coach('warn','Same metal','Pick a different metal from the solution\'s metal.');dip=true;draw();const r=reacts(m,sol);q('#rs').textContent=r?'✅ '+(OUT[m+'|'+sol]||'Displacement happens.'):'❌ No reaction. '+m+' is less reactive than '+SOL[sol][0]+'.';seen.add(m+sol);if(seen.size>=6&&[...seen].length){api.award('did');api.ready()}};
 q('#mm button').className='pri';q('#ss button').className='pri';draw()},
why:['A more reactive metal <b>displaces</b> a less reactive metal from its salt solution: Fe + CuSO₄ → FeSO₄ + Cu.','If the metal strip is less reactive than the metal in the solution, <b>nothing happens</b>.','From your tests: Mg > Zn > Fe > Cu > Ag. This is part of the <span class="word">reactivity series</span>.','Displacement reactions are used to extract and recover metals.'],
check:[{q:'Will copper displace iron from FeSO₄?',options:['Yes','No, copper is less reactive','Only when hot','Only in acid'],answer:1,why:'Copper is below iron.',hint:'Series: Mg, Zn, Fe, Cu, Ag.'},
 {q:'Iron nail in CuSO₄ becomes coated with…',options:['Zinc','Copper','Silver','Rust only'],answer:1,why:'Iron displaces copper.',hint:'Red-brown.'},
 {q:'Which metal displaces all the others in your list?',options:['Ag','Cu','Fe','Mg'],answer:3,why:'Magnesium is the most reactive.',hint:'Top of the series.'}],
challenge:{text:'Predict: will each pair <b>react or not</b>?',win:'You can predict displacement from the reactivity series.'},
real:['Copper is recovered from waste solutions using scrap iron.','Zinc galvanising protects iron because zinc is more reactive.','Thermit welding uses aluminium to displace iron.'],
words:{Displacement:'A more reactive element replaces a less reactive one in a compound.','Reactivity series':'Metals ranked by reactivity.',Salt:'Compound of metal and non-metal parts.',Solution:'Mixture of solute in solvent.'}
});
