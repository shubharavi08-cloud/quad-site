QLab.register({
id:'c10_energysrc',code:'10-P10',title:"Sources of energy: renewable or not?",grade:10,subject:'Physics',emoji:'☀️',
hook:{title:"Coal took millions of years to form. The Sun shines every day. Which will last?",text:"Some energy sources run out. Others are renewed by nature. Sort them."},
prior:"You know that we use fuels, electricity and sunlight.",
guess:{q:"Which of these will NOT run out in human history?",options:["Coal", "Petrol", "Sunlight", "Natural gas"],answer:2,hint:"It is renewed every day.",after:"Sort the sources."},
build(api){
 const chal=!!api.challenge;
 const cats=[["ren", "Renewable"],["non", "Non-renewable"]];
 const A=[["Solar energy","ren","Sunlight is renewed every day."],["Wind energy","ren","Wind is always blowing somewhere."],["Coal","non","Takes millions of years to form."],["Petrol","non","Made from crude oil, formed over millions of years."],["Hydro (flowing water)","ren","Rain refills the rivers."],["Natural gas","non","A fossil fuel, limited stock."],["Biogas from cow dung","ren","Waste keeps being produced."],["Uranium","non","Mined, limited supply."]];
 const B=[["Tidal energy","ren","Tides come twice a day."],["Geothermal energy","ren","Heat from inside the Earth."],["Diesel","non","A fossil fuel from crude oil."],["Kerosene","non","Also from crude oil."],["Ocean waves","ren","Wind and sea keep making waves."]];
 QLab.kit.sorter(api,{items:chal?B:A,cats,hint:"Ask: will nature make more of it within our lifetime?",done:()=>chal?api.solved():(api.award('did'),api.ready())})},
why:["<span class=\"word\">Renewable</span> sources are replaced by nature: solar, wind, hydro, tidal, geothermal, biogas.", "<span class=\"word\">Non-renewable</span> sources are limited: coal, petroleum, natural gas (fossil fuels) and uranium.", "Burning fossil fuels releases CO₂, causing global warming and air pollution.", "India aims to raise solar and wind power. Saving energy at home also helps."],
check:[{q:"Which is a fossil fuel?",options:["Wind", "Coal", "Sunlight", "Tide"],answer:1,why:"Coal formed from ancient plants.",hint:"Black rock."},
 {q:"Biogas is made from…",options:["Coal", "Animal and plant waste", "Uranium", "Sunlight"],answer:1,why:"Bacteria break waste down to give methane.",hint:"Gobar gas."},
 {q:"A disadvantage of fossil fuels is that they…",options:["Never run out", "Cause pollution and will run out", "Are free", "Are renewable"],answer:1,why:"Limited and polluting.",hint:"CO₂."}],
challenge:{text:"Sort <b>five more energy sources</b>.",win:"Tidal, geothermal and waves are renewable. Diesel and kerosene are not."},
real:["Rooftop solar panels cut electricity bills.", "Wind farms stand along the coasts of Tamil Nadu and Gujarat.", "Gobar gas plants give cooking fuel in villages."],
words:{"Renewable": "Replaced by nature quickly.", "Non-renewable": "Limited, takes millions of years to form.", "Fossil fuel": "Coal, oil and gas from ancient living things.", "Biogas": "Methane made from waste."}
});
