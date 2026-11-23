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
Q.fields=function(){
$('#app').innerHTML=`<div class="top"><a class="home" href="#/">← All experiments</a><h1>🌍 Fields of science</h1><span class="pts" id="pts"></span></div>
<div class="card"><p>Science is a huge world. Start with <b>physics, chemistry and biology</b>, then see the many branches that grow from them. You do not need to know anything yet. Just tap a field and be curious!</p><p><a class="pri" href="#/career" style="display:inline-block;padding:8px 14px;border-radius:14px;text-decoration:none">🏅 How to become a scientist</a></p></div>
${F.map(g=>`<h2 style="margin:18px 4px 6px">${g[1]}</h2><div class="cat">${g[2].map(f=>{const live=f[4]&&(f[4][0]==='#'||Q.REG[f[4]]);const href=f[4]?(f[4][0]==='#'?f[4]:'#/x/'+f[4]):'';const t=`<span class="em">${f[0]}</span><b>${f[1]}</b><small>${f[2]}</small><small><b>Jobs:</b> ${f[3]}</small>${live?'<span class="bdg">▶ Try it now</span>':'<span class="bdg">🚧 Lab coming soon</span>'}`;return live?`<a class="tile sub-Physics" href="${href}">${t}</a>`:`<div class="tile sub-Maths">${t}</div>`}).join('')}</div>`).join('')}`;Q.pts()};
})();
