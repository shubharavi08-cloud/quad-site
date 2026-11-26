QLab.register({
id:'c10_pollute',code:'10-E1',title:"Pollution: air, water and land",grade:10,subject:'Environment',emoji:'🏭',
hook:{title:"Smoke, sewage and plastic all harm us. Do they harm the same thing?",text:"Pollution can damage air, water or land. Sort each cause to find where it does the damage first."},
prior:"You know that waste and smoke are bad for health.",
guess:{q:"Oil spilling from a ship harms mainly the…",options:["Air", "Water", "Soil only", "Space"],answer:1,hint:"Oil floats on the sea.",after:"Sort the causes."},
build(api){
 const chal=!!api.challenge;
 const cats=[["air", "Air pollution"],["wat", "Water pollution"],["lan", "Land pollution"]];
 const A=[["Smoke from factory chimneys","air","Smoke and gases pollute the air."],["Vehicle exhaust","air","Petrol and diesel fumes release CO and soot."],["Oil spill at sea","wat","Oil floats and kills sea life."],["Sewage into a river","wat","Untreated sewage spreads disease and uses up oxygen."],["Plastic bags dumped on land","lan","Plastic stays for hundreds of years in soil."],["Burning crop stubble","air","Smoke causes haze and breathing trouble."],["Overuse of chemical fertilisers","lan","They damage soil and later wash into rivers."],["Garbage in open dumps","lan","It pollutes soil and attracts disease carriers."]];
 const B=[["Hot water from a power plant","wat","Thermal pollution lowers oxygen in water."],["Dust from construction sites","air","Dust is a particle pollutant in air."],["Pesticides sprayed on soil","lan","They stay in soil and food chains."],["Detergent in a lake","wat","It encourages algae and harms fish."],["Gas leaking from old refrigerators (CFCs)","air","CFCs damage the ozone layer."]];
 QLab.kit.sorter(api,{items:chal?B:A,cats,hint:"Ask where the pollutant ends up first: in the air, in water or on land.",done:()=>chal?api.solved():(api.award('did'),api.ready())})},
why:["<span class=\"word\">Pollution</span> is the addition of harmful substances to the environment.", "<b>Air:</b> smoke, vehicle fumes, CFCs. <b>Water:</b> sewage, oil, detergents, hot water. <b>Land:</b> plastics, pesticides, garbage.", "Pollutants move: fertiliser from land runs into rivers; smoke falls as acid rain. Everything is connected.", "Reduce, reuse and recycle. Public transport, cleaner fuels, treating sewage and avoiding single-use plastic all help."],
check:[{q:"Which is an air pollutant?",options:["Sewage", "Vehicle exhaust", "Plastic bag", "Oil spill"],answer:1,why:"Exhaust gases go into the air.",hint:"Gases."},
 {q:"Plastic bags mostly cause…",options:["Air pollution", "Water pollution", "Land pollution only", "No pollution"],answer:2,why:"They litter land (and later water too).",hint:"Dumped."},
 {q:"Which helps reduce pollution?",options:["Burning waste", "Using public transport", "Dumping oil", "Using more plastic"],answer:1,why:"Fewer vehicles, less exhaust.",hint:"Share rides."}],
challenge:{text:"Sort <b>five more causes</b> into air, water or land pollution.",win:"Hot water and detergent: water. Dust and CFCs: air. Pesticides: land."},
real:["Cities use CNG buses and metros to cut air pollution.", "Sewage treatment plants clean river water.", "Many states ban single-use plastic bags."],
words:{"Pollution": "Harmful substances added to the environment.", "Pollutant": "The substance that pollutes.", "Ozone layer": "A layer high above that shields us from UV rays.", "Biodegradable": "Able to be broken down by living things."}
});
