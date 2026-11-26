QLab.register({
id:'c10_crops',code:'10-E2',title:"Food production: crops of the three seasons",grade:10,subject:'Environment',emoji:'🌾',
hook:{title:"Why is wheat sown in winter and rice in the rains?",text:"Indian farmers grow crops by season. Each needs its own temperature and water. Sort the crops."},
prior:"You know that crops are grown by farmers and that rain matters.",
guess:{q:"Rice needs plenty of water. It is sown at the start of the…",options:["Winter", "Monsoon", "Summer only", "Autumn only"],answer:1,hint:"It is a rainy-season crop.",after:"Sort the crops."},
build(api){
 const chal=!!api.challenge;
 const cats=[["kha", "Kharif (monsoon)"],["rab", "Rabi (winter)"],["zai", "Zaid (summer)"]];
 const A=[["Rice","kha","Needs heat and lots of water: sown with the monsoon."],["Maize","kha","A warm rainy-season crop."],["Cotton","kha","Sown in the rains, harvested in autumn."],["Wheat","rab","Sown in cool winter, harvested in spring."],["Mustard","rab","Needs cool weather."],["Gram (chickpea)","rab","A winter pulse."],["Watermelon","zai","Grown in the hot dry summer between Rabi and Kharif."],["Cucumber","zai","A summer vegetable."]];
 const B=[["Soybean","kha","Sown in June or July."],["Barley","rab","A cool-season cereal."],["Pea","rab","Winter vegetable and pulse."],["Muskmelon","zai","A summer fruit."],["Jowar (sorghum)","kha","Sown with the monsoon."]];
 QLab.kit.sorter(api,{items:chal?B:A,cats,hint:"Think of the season each crop needs: heavy rain, cool weather, or heat.",done:()=>chal?api.solved():(api.award('did'),api.ready())})},
why:["<span class=\"word\">Kharif</span> crops (June to October): rice, maize, cotton, soybean. They need warmth and monsoon water.", "<span class=\"word\">Rabi</span> crops (October to March): wheat, mustard, gram, pea. They need cool weather to grow.", "<span class=\"word\">Zaid</span> crops (March to June): watermelon, cucumber, muskmelon. They grow in the short hot summer.", "Good farming also uses crop rotation, manure and fertilisers, irrigation, and improved seeds to raise food production."],
check:[{q:"Wheat is a…",options:["Kharif crop", "Rabi crop", "Zaid crop", "Not a crop"],answer:1,why:"It grows in the cool season.",hint:"Winter."},
 {q:"Kharif crops are sown with the…",options:["Winter cold", "Monsoon", "Summer heat", "Spring"],answer:1,why:"They depend on the rains.",hint:"Rain."},
 {q:"Which is a summer (Zaid) crop?",options:["Rice", "Wheat", "Watermelon", "Mustard"],answer:2,why:"It grows in the hot dry months.",hint:"Fruit."}],
challenge:{text:"Sort <b>five more crops</b> by their season.",win:"Soybean and jowar: Kharif. Barley and pea: Rabi. Muskmelon: Zaid."},
real:["Farmers follow the monsoon forecast to decide when to sow.", "Pulses in rotation put nitrogen back in the soil.", "Government MSP (minimum support price) covers Kharif and Rabi crops."],
words:{"Kharif": "Crops sown with the monsoon.", "Rabi": "Crops sown in winter.", "Zaid": "Crops grown in summer.", "Crop rotation": "Growing different crops one after another on a field."}
});
