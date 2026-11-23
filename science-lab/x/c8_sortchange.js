QLab.register({
id:'c8_sortchange',code:'8-C5',title:'Physical or chemical change? Sort them',grade:8,subject:'Chemistry',emoji:'🔀',
hook:{title:'Melting ice and burning paper are both changes. Are they the same kind?',text:'Some changes can be undone and make nothing new. Others make a brand new substance. Sort the changes.'},
prior:'Know that ice melts and paper burns.',
guess:{q:'Which change makes a NEW substance?',options:['Ice melting','Sugar dissolving','Paper burning','Cutting paper'],answer:2,hint:'Can you get the paper back from the ash?',after:'Sort them yourself.'},
build(api){
 const chal=!!api.challenge;
 const A=[['Ice melting into water','P','Same substance (water), just a different state.'],['Paper burning to ash','C','New substances (ash, gases) are made and it cannot be reversed.'],['An iron nail rusting','C','Rust is a new substance.'],['Sugar dissolving in water','P','Sugar is still sugar. Evaporate the water to get it back.'],['Cooking an egg','C','The egg proteins change. It cannot become raw again.'],['Milk turning sour','C','New substances (acids) are made.'],['Cutting paper into pieces','P','Only the shape and size changed.'],['Baking a cake','C','The batter changes into something new. It cannot go back.']];
 const B=[['Boiling water into steam','P','Steam is still water.'],['Lighting a matchstick','C','Burning makes new substances.'],['Crushing chalk to powder','P','Smaller pieces of the same chalk.'],['Digesting food in the stomach','C','Food is broken down into new substances.']];
 const L=chal?B:A;let i=0,ok=0,wrong=0;
 api.ctrl.innerHTML=`<p>Change <b id="n"></b> of ${L.length}</p><div class="row"><button class="pri" id="p">📦 Physical change</button><button class="pri" id="c">🧪 Chemical change</button></div><p id="fb" style="font-weight:800"></p>`;
 const q=s=>api.ctrl.querySelector(s);
 function show(){q('#n').textContent=Math.min(i+1,L.length);api.stage.innerHTML=QLab.svg(760,280,`<rect width="760" height="280" fill="#fff"/><rect x="160" y="60" width="440" height="140" rx="24" fill="#f1f5ff" stroke="#8aa0c8" stroke-width="3"/><text x="380" y="140" text-anchor="middle" font-size="${i<L.length?22:26}" font-weight="800" fill="#1b2a4a">${i<L.length?L[i][0]:'All sorted!'}</text><text x="380" y="240" text-anchor="middle" font-size="14" fill="#55688a">✅ ${ok} right · ❌ ${wrong} tries</text>`)}
 function ans(k){if(i>=L.length)return;const t=L[i];if(t[1]===k){ok++;q('#fb').textContent='✅ Right! '+t[2];i++;show();if(i>=L.length){if(chal){wrong===0?api.solved():api.solved()}else{api.award('did');api.ready()}}}else{wrong++;q('#fb').textContent='❌ Not quite. Ask: is a new substance made? Try again.';show()}}
 q('#p').onclick=()=>ans('P');q('#c').onclick=()=>ans('C');show()},
why:['In a <span class="word">physical change</span> no new substance is made. Only shape, size or state changes. Many can be reversed.','In a <span class="word">chemical change</span> one or more <b>new substances</b> are made. It is usually hard or impossible to reverse.','Clues for a chemical change: a new colour, gas bubbles, light or heat given out, a new smell, or a solid forming.','Ask yourself: <i>is it still the same stuff?</i> If yes, it is physical.'],
check:[{q:'Which is a chemical change?',options:['Folding paper','Melting wax','Rusting of iron','Boiling water'],answer:2,why:'Rust is a new substance.',hint:'Which one makes something new?'},
 {q:'Dissolving sugar in water is…',options:['A chemical change','A physical change','Burning','Rusting'],answer:1,why:'The sugar is still there. You can evaporate the water to get it back.',hint:'Can you taste the sugar?'},
 {q:'Which is a clue that a chemical change has happened?',options:['Same shape','Gas bubbles and a new smell','Smaller pieces','Colder water'],answer:1,why:'Gas, colour change, light, heat and new smells are chemical clues.',hint:'Think of milk turning sour.'}],
challenge:{text:'Four tricky changes. Sort them all <b>correctly</b>.',win:'You sorted them like a chemist.'},
real:['Cooking changes food chemically, so you cannot uncook it.','Freezing water for ice is physical. You can melt it again.','Burning fuel in a vehicle is chemical. It makes new gases.'],
words:{'Physical change':'No new substance is made.','Chemical change':'A new substance is made.',Reversible:'Can be changed back.',Substance:'A kind of matter, like water or sugar.'}
});
