/* Picture emoji: swaps emoji characters for 3D picture files so they look the same on every phone and never flicker.
   Art: Microsoft Fluent Emoji (MIT licence). */
(()=>{const MAP=window.QEMO||{},BASE=((document.currentScript&&document.currentScript.src)||'').replace(/[^\/]*$/,'')+'home-img/';
const SRC='[\\u{1F000}-\\u{1FAFF}\\u{2600}-\\u{27BF}\\u{2B00}-\\u{2BFF}\\u{2300}-\\u{23FF}]\\uFE0F?(?:\\u200D[\\u{1F000}-\\u{1FAFF}\\u{2600}-\\u{27BF}\\u2640\\u2642]\\uFE0F?)*[\\u{1F3FB}-\\u{1F3FF}]?';
const SKIP=/^(OPTION|TEXTAREA|SCRIPT|STYLE|TITLE|NOSCRIPT|CANVAS|SVG|text|tspan)$/;
function skip(n){for(let p=n.parentNode;p&&p.nodeType===1;p=p.parentNode){if(SKIP.test(p.nodeName)||p.hasAttribute&&p.hasAttribute('data-noemo'))return true}return false}
function parse(root){if(!root||root.nodeType===8)return;const re=new RegExp(SRC,'gu'),list=[];
 if(root.nodeType===3){list.push(root)}else{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))list.push(n)}
 list.forEach(n=>{const t=n.nodeValue;if(!t||!/[^\x00- ]/.test(t)||skip(n))return;re.lastIndex=0;let m,last=0,f=null;
  while((m=re.exec(t))){const code=MAP[m[0].replace(/️/g,'')];if(!code)continue;f=f||document.createDocumentFragment();if(m.index>last)f.appendChild(document.createTextNode(t.slice(last,m.index)));const i=document.createElement('img');i.className='em';i.alt=m[0];i.src=BASE+code+'.webp';i.draggable=false;i.decoding='async';f.appendChild(i);last=m.index+m[0].length}
  if(f&&n.parentNode){if(last<t.length)f.appendChild(document.createTextNode(t.slice(last)));n.parentNode.replaceChild(f,n)}})}
window.QEmoji={parse};
const go=()=>{parse(document.body);new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData'){if(m.target.parentNode)parse(m.target)}else m.addedNodes.forEach(n=>{if(n.nodeType===1||n.nodeType===3)parse(n)})}}).observe(document.body,{childList:true,subtree:true,characterData:true})};
if(document.body)go();else addEventListener('DOMContentLoaded',go);
})();
