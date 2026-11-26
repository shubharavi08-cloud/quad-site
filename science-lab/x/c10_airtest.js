QLab.register({
id:'c10_airtest',code:'10-C9',title:"Air: how much oxygen is in it?",grade:10,subject:'Chemistry',emoji:'🕯️',
hook:{title:"A candle goes out under a jar. Does it use up all the air?",text:"Only the oxygen gets used, about one fifth of the air. Do the experiment in the right order."},
prior:"You know that fire needs air and that we breathe air.",
guess:{q:"About how much of air is oxygen?",options:["10%", "21%", "50%", "78%"],answer:1,hint:"Nitrogen is the biggest part at 78%.",after:"Run the test in order."},
build(api){
 const chal=!!api.challenge;
 const A=[["Mark the jar into 5 parts","Equal marks","Divide the jar height into five equal parts."],["Stand a candle in water","In the trough","Fix a candle in a trough of water."],["Light the candle","Flame on","Light it before covering."],["Cover with the jar","Trap the air","Lower the jar over the candle so air is trapped."],["Flame goes out","Oxygen used up","The candle burns until the oxygen is gone."],["Water rises 1/5","About 21% oxygen","Water fills one fifth of the jar to take the place of the oxygen."]],B=[["Nitrogen","About 78%","The biggest part of air."],["Oxygen","About 21%","The gas we need to breathe and burn things."],["Argon","About 0.9%","A noble gas, does not react."],["Carbon dioxide","About 0.04%","A tiny share, but it traps heat."]];
 QLab.kit.order(api,chal?{stim:"🌬️ START: a litre of air",resp:"📊 END: gases named by share",items:B,prompt:"Drag the gases in order, largest first.",first:"Which gas is the biggest part of air?",hint:'Think about what must happen first.',done(){api.solved()},fail(){api.nope('Start from the first event and follow what happens next.')}}
  :{stim:"🕯️ START: a candle in a water trough",resp:"📏 END: oxygen share worked out",items:A,prompt:'Drag each card into the numbered box in the right order.',first:'Which step comes first?',hint:'Think about what must happen first.',done(sc){api.award('did');api.ready();sc.say('All in order. Well done!','ok')}});
},
demo:[[S=>S.put(0,0),"Divide the jar height into five equal parts.",900],[S=>S.put(1,1),"Fix a candle in a trough of water.",900],[S=>S.put(2,2),"Light it before covering.",900],[S=>S.put(3,3),"Lower the jar over the candle so air is trapped.",900],[S=>S.put(4,4),"The candle burns until the oxygen is gone.",900],[S=>S.put(5,5),"Water fills one fifth of the jar to take the place of the oxygen.",900]],
why:["Air is a mixture: about <b>78% nitrogen</b>, <b>21% oxygen</b>, 0.9% argon and 0.04% carbon dioxide.", "In the candle test the flame uses up the oxygen, so water rises to fill about one fifth of the jar.", "The flame goes out but nitrogen is left, so air is not \"used up\" completely.", "Burning, rusting and breathing all use oxygen. Plants return it by photosynthesis."],
check:[{q:"Which gas is the largest part of air?",options:["Oxygen", "Nitrogen", "Argon", "Carbon dioxide"],answer:1,why:"About 78%.",hint:"Not oxygen."},
 {q:"Why does water rise in the jar?",options:["Oxygen is used up", "Heat pushes it", "Air is added", "Candle melts"],answer:0,why:"Less gas means water fills the space.",hint:"One fifth."},
 {q:"Which gas do plants give out in the day?",options:["Nitrogen", "Oxygen", "Argon", "Smoke"],answer:1,why:"Photosynthesis makes oxygen.",hint:"Leaves."}],
challenge:{text:"Put the gases of air in order, <b>largest share first</b>.",win:"Nitrogen, oxygen, argon, then carbon dioxide."},
real:["Divers carry oxygen tanks because water has little air.", "Hospitals give extra oxygen to patients who cannot breathe well.", "Nitrogen fills snack packets to keep them fresh."],
words:{"Mixture": "Two or more substances mixed, not joined chemically.", "Oxygen": "The gas that supports burning and breathing.", "Nitrogen": "The most abundant gas in air.", "Atmosphere": "The layer of air around the Earth."}
});
