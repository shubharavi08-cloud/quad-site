QLab.register({
id:'c8_dissolve',code:'8-C2',title:'Dissolve and saturate',grade:8,subject:'Chemistry',emoji:'🥄',
hook:{title:'Can a glass of water hold unlimited sugar or salt?',text:'Stir spoon after spoon into water. At some point the solid stops disappearing. Find out when, and how heat changes it.'},
prior:'Know that sugar disappears when you stir it into tea.',
guess:{q:'You keep adding a white salt to 100 mL of water. What happens?',options:['It always dissolves, no matter how much','It dissolves up to a limit, then the rest sinks','Nothing dissolves','It turns into water'],answer:1,hint:'A glass can only hold so much, like a bag can only hold so many books.',after:'Add spoonfuls and watch the bottom of the beaker.'},
build(api){
 const chal=!!api.challenge;
 const S={20:32,30:46,40:64,50:85,60:110,70:138,80:169};/* g of potassium nitrate per 100 g water */
 let T=20,added=0,sat=false,tried=new Set(),warmed=false;
 api.ctrl.innerHTML=`<label for="tp">Water temperature: <span id="tv"></span> °C</label><input id="tp" type="range" min="20" max="80" step="10" value="20"><button class="pri" id="add">➕ Add 10 g of salt</button> <button id="rs">↺ Start again</button><p>Added: <b id="ad"></b> g · Dissolved: <b id="di"></b> g · On the bottom: <b id="bo"></b> g</p><p id="sn" style="font-weight:800"></p>${chal?'<button class="pri" id="ck">Check my answer</button>':''}`;
 const q=s=>api.ctrl.querySelector(s);
 function draw(){const lim=S[T],dis=Math.min(added,lim),bot=added-dis;sat=bot>0;if(sat)tried.add(T);
  const h=Math.min(200,120+dis*.35),dots=Math.min(60,Math.round(dis/3));
  let d='';for(let i=0;i<dots;i++)d+=`<circle cx="${250+((i*53)%160)}" cy="${150+((i*37)%(h-30))}" r="3" fill="#7a8cff" opacity=".8"/>`;
  let b='';for(let i=0;i<Math.min(40,Math.round(bot/2));i++)b+=`<rect x="${255+(i*17%150)}" y="${268-Math.floor(i/9)*8}" width="9" height="7" fill="#fff" stroke="#8aa0c8"/>`;
  api.stage.innerHTML=QLab.svg(760,320,`<rect width="760" height="320" fill="#fff"/><path d="M230 70 V275 Q230 290 245 290 H415 Q430 290 430 275 V70" fill="none" stroke="#1b2a4a" stroke-width="5"/><rect x="233" y="${290-h+40}" width="194" height="${h-40}" fill="#cde9f9" opacity=".8"/>${d}${b}
  <text x="520" y="130" font-size="16" font-weight="800" fill="#1b2a4a">Limit at ${T} °C:</text><text x="520" y="156" font-size="28" font-weight="900" fill="#4b3fd1">${lim} g</text><text x="520" y="182" font-size="14" fill="#55688a">per 100 mL of water</text>
  <text x="330" y="52" text-anchor="middle" font-size="16" font-weight="800">100 mL water</text>`);
  q('#tv').textContent=T;q('#ad').textContent=added;q('#di').textContent=dis;q('#bo').textContent=bot;
  q('#sn').textContent=bot>0?'Saturated! No more can dissolve. The extra sinks.':added===0?'Clear water.':'Unsaturated: it can still dissolve more.';
  if(!chal&&tried.size>=1&&warmed){api.award('did');api.ready()}}
 q('#tp').oninput=e=>{T=+e.target.value;const before=sat;draw();if(before&&!sat&&added>0)warmed=true;draw();if(before&&!sat&&added>0)api.coach('ok','Look at that!','Warm water holds more. The solid on the bottom dissolved.')};
 q('#add').onclick=()=>{if(added>=300)return;added+=10;draw();if(sat&&tried.size===1)api.coach('info','Saturated','Now raise the temperature and watch what happens.')};
 q('#rs').onclick=()=>{added=0;draw()};
 if(chal)q('#ck').onclick=()=>{const lim=S[T],dis=Math.min(added,lim);if(added!==100)return api.nope('You have added '+added+' g. You need exactly 100 g in the water.');if(added>lim)return api.nope('Some salt is still on the bottom. Warm the water until it all dissolves.');if(T>60)return api.nope('It dissolves, but you used too much heat. Try a lower temperature.');api.solved()};
 draw()},
why:['A <span class="word">solution</span> is a solute (what dissolves) mixed into a solvent (what does the dissolving). Here the salt is the solute and the water is the solvent.','Water can hold only a certain amount of solute at one temperature. When it is full, the solution is <b>saturated</b>.','Extra solid just sinks to the bottom. It is not lost. It is simply not dissolved.','For most solids, <b>hotter water dissolves more</b>. That is why sugar goes into hot tea faster and in larger amounts.'],
check:[{q:'The water holds as much salt as it can, and the rest sinks. The solution is…',options:['Unsaturated','Saturated','Empty','Pure water'],answer:1,why:'Saturated means no more solute can dissolve at that temperature.',hint:'Look at the message below the beaker.'},
 {q:'You warm a saturated solution that has solid on the bottom. What happens?',options:['More solid appears','Some or all of the solid dissolves','Nothing changes','The water disappears'],answer:1,why:'Hot water can hold more of most solids.',hint:'You did this in the experiment.'},
 {q:'In salt water, which one is the solvent?',options:['Salt','Water','Both','Neither'],answer:1,why:'The solvent does the dissolving. Water is the solvent.',hint:'The solvent is usually the larger part.'}],
challenge:{text:'Dissolve exactly <b>100 g</b> of the salt in 100 mL of water, with <b>nothing left on the bottom</b>, using the <b>lowest temperature</b> possible (60 °C or less).',win:'Well done. At 60 °C the water can hold 110 g, so 100 g just fits.'},
real:['Sugar dissolves better in hot tea than in cold lemonade.','Sea water is a solution. Salt farms dry it to get salt.','Fish need oxygen dissolved in water. Warm water holds less dissolved oxygen.'],
words:{Solute:'What dissolves.',Solvent:'What does the dissolving, like water.',Solution:'A solute fully mixed in a solvent.',Saturated:'Holding as much solute as possible.'}
});
