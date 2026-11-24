/* Fields of science explorer: kid-friendly map of branches. */
(()=>{const Q=QLab,$=s=>document.querySelector(s);
const F=[
['core','The big three',[
['⚛️','Physics','How things move, push, glow and shock. Why a ball falls and how a phone works.','Physicist, engineer, astronomer','c10_series'],
['🧪','Chemistry','What everything is made of and how it changes: cooking, rusting, fizzing, medicines.','Chemist, pharmacist, food technologist','c9_buildatom'],
['🌱','Biology','Living things: plants, animals, you! How cells, food and families of life work.','Doctor, biologist, vet, farmer-scientist','']]],
['branch','Branches that grow from them',[
['🧫','Organic chemistry','The chemistry of carbon, the atom in plastics, soaps, fuels and medicines.','Medicine maker, perfume and soap scientist','c10_soap'],
['🔥','Physical chemistry','Why reactions are fast or slow, hot or cold.','Battery and fuel scientist','c8_heatcurve'],
['🌊','Marine biology','Life in the ocean: fish, corals, whales and tiny plankton.','Ocean scientist, coral protector',''],
['🧬','Biotechnology','Using living cells to make medicines, vaccines and better crops.','Vaccine researcher, lab-grown food maker',''],
['🧠','Neuroscience','How your brain thinks, remembers and dreams.','Brain scientist, psychologist',''],
['🩺','Medicine and health','How the body stays well and how doctors fight germs.','Doctor, nurse, public-health scientist',''],
['🌾','Agriculture science','Growing better food using soil, seeds and weather knowledge.','Agri scientist, soil expert',''],
['🌋','Geology and earth science','Rocks, volcanoes, earthquakes, rivers and minerals.','Geologist, mining and water scientist',''],
['🌦️','Weather and climate','Why it rains, how cyclones form and how our planet is changing.','Meteorologist, climate scientist',''],
['🌳','Environmental science','Protecting air, water, forests and animals.','Ecologist, wildlife scientist',''],
['🔭','Astronomy and space','Planets, stars, rockets and satellites.','ISRO scientist, astronomer','']]],
['new','Science you may not expect',[
['💻','Computer science','Giving instructions to computers to solve problems. Every app and game starts here.','Software engineer, game maker, data scientist',''],
['🤖','Artificial intelligence','Teaching computers to learn from examples, to recognise pictures, speech and patterns.','AI scientist, robotics engineer',''],
['🦾','Robotics','Machines that sense, think and move.','Robot designer, space-rover engineer',''],
['🏠','Home science','Nutrition, fabrics, child care and healthy homes. Real science of everyday life.','Nutritionist, food scientist, textile designer',''],
['🍲','Food science','Why bread rises, milk curdles and pickles last for months.','Food technologist, chef-scientist','c10_burn'],
['🕵️','Forensic science','Solving mysteries using science clues, like our Mystery Lab!','Forensic scientist, detective','#/game'],
['📐','Mathematics','The language of science: patterns, numbers and shapes.','Mathematician, data analyst, cryptographer','']]]];
const COL={core:['#ffd0ec','#ff8ac6'],branch:['#cdeeff','#5cc3f5'],new:['#ffe9a8','#ffc233']};
Q.fields=function(){document.body.classList.add('fieldsbody');let sheet=null;
$('#app').innerHTML=`<div class="top"><a class="home" href="#/">← Science Lab</a><h1>🌍 Fields of science</h1><span class="pts" id="pts"></span></div>
<p class="fnote">Tap a puzzle piece to open it. Start with the big three, then see where science can take you.</p>
${F.map(g=>`<h2 class="fh">${g[1]}</h2><div class="pzg" style="--c:${COL[g[0]][0]};--d:${COL[g[0]][1]}">${g[2].map((f,i)=>{const r=Math.floor(i/2),c=i%2,has=i+1<g[2].length,live=f[4]&&(f[4][0]==='#'||Q.REG[f[4]]);return`<button class="pz ${c?'nl':'kr'} ${r%2?'nt':'kb'}${has&&c===0?'':' lone'}" data-i="${g[0]}:${i}"><span class="pf"><span class="pe">${f[0]}</span><b>${f[1]}</b>${live?'<i class="pb on">▶ Lab</i>':'<i class="pb">soon</i>'}</span>${c===0&&i+1<g[2].length?'<span class="pk r"></span>':''}${r%2===0&&i+2<g[2].length?'<span class="pk b"></span>':''}</button>`}).join('')}</div>`).join('')}
<div class="pzs" id="pzs" hidden><div class="pzc"><button class="pzx" aria-label="Close">✕</button><div id="pzb"></div></div></div>`;
const find=k=>{const [g,i]=k.split(':');return F.find(x=>x[0]===g)[2][+i]};
document.querySelectorAll('.pz').forEach(b=>b.onclick=()=>{const f=find(b.dataset.i),live=f[4]&&(f[4][0]==='#'||Q.REG[f[4]]),href=f[4]?(f[4][0]==='#'?f[4]:'#/x/'+f[4]):'';
 $('#pzb').innerHTML=`<div class="pzh"><span class="pe">${f[0]}</span><h3>${f[1]}</h3></div><p>${f[2]}</p><p><b>Jobs:</b> ${f[3]}</p>${live?`<a class="pri pzgo" href="${href}">▶ Try it now</a>`:'<p class="pzsoon">🚧 Lab coming soon</p>'}`;$('#pzs').hidden=false;if(window.QEmoji)QEmoji.parse($('#pzs'))});
const cl=()=>{$('#pzs').hidden=true};$('.pzx').onclick=cl;$('#pzs').onclick=e=>{if(e.target.id==='pzs')cl()};
Q.pts()};
})();
