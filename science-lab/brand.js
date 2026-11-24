/* OurSchoolHouse brand: full name in the logo font, logo bar, grade/topic line */
(function(){const Q=QLab;
const CH={'8-C1':'Particles of matter','8-C2':'Solutions and mixtures','8-C3':'Metals and non-metals','8-C4':'Combustion and flame','8-C5':'Changes and rusting',
'9-C1':'Is matter around us pure?','9-C2':'Structure of the atom','9-C3':'Atoms, molecules and the mole',
'10-C1':'Chemical reactions and equations','10-C2':'Acids, bases and salts','10-C3':'Metals and non-metals','10-C4':'Carbon and its compounds','10-P3':'Electricity'};
Q.topicLine=e=>{const t=CH[e.code];return `Grade ${e.grade} · ${e.subject}${t?' · '+t:''}`};
const RX=/\bOSH\b/;
function wrap(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentNode;if(!p||!RX.test(n.nodeValue))return NodeFilter.FILTER_REJECT;if(p.closest&&p.closest('script,style,textarea,input,svg,canvas,.oshn,title'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});
const L=[];while(w.nextNode())L.push(w.currentNode);
L.forEach(n=>{const f=document.createDocumentFragment();n.nodeValue.split(/\bOSH\b/).forEach((s,i)=>{if(i){const b=document.createElement('span');b.className='oshn';b.textContent='OurSchoolHouse';f.appendChild(b)}if(s)f.appendChild(document.createTextNode(s))});n.parentNode.replaceChild(f,n)})}
const mo=new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.nodeType===1&&n.textContent.indexOf('OSH')>-1)wrap(n);else if(n.nodeType===3&&RX.test(n.nodeValue)&&n.parentNode)wrap(n.parentNode)}});
function init(){if(!document.getElementById('oshbar')){const h=document.createElement('a');h.id='oshbar';h.className='oshbar';h.href='#/';h.setAttribute('aria-label','OurSchoolHouse Science Lab, home');h.innerHTML='<img src="osh_logo.png" alt="OurSchoolHouse logo" width="58" height="33"><span><b class="oshn">OurSchoolHouse</b><small>Science Lab</small></span>';document.body.insertBefore(h,document.body.firstChild)}
wrap(document.body);mo.observe(document.body,{childList:true,subtree:true})}
if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init)})();
