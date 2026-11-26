QLab.register({
id:'c10_disease',code:'10-B12',title:"Health: what causes disease?",grade:10,subject:'Biology',emoji:'🦠',
hook:{title:"Why can antibiotics cure typhoid but not a cold?",text:"Different diseases are caused by different germs. Match each disease with its cause."},
prior:"You know that germs can make us ill and that doctors give medicines.",
guess:{q:"Antibiotics work against…",options:["Viruses", "Bacteria", "Both equally", "Nothing"],answer:1,hint:"They do not work against colds or flu.",after:"Sort the diseases."},
build(api){
 const chal=!!api.challenge;
 const cats=[["bac", "Bacteria"],["vir", "Virus"],["pro", "Protozoa"],["fun", "Fungi"]];
 const A=[["Cholera","bac","Caused by a bacterium in dirty water."],["Typhoid","bac","A bacterium spread by dirty food and water."],["Tuberculosis","bac","A bacterium that infects the lungs."],["Influenza (flu)","vir","A virus spread by droplets."],["Polio","vir","A virus prevented by vaccines."],["Dengue","vir","A virus spread by the Aedes mosquito."],["Malaria","pro","A protozoan (Plasmodium) spread by the Anopheles mosquito."],["Ringworm","fun","A fungus on the skin. Not a worm!"]];
 const B=[["Measles","vir","A virus prevented by the MMR vaccine."],["Amoebic dysentery","pro","Caused by the protozoan Entamoeba."],["Athlete's foot","fun","A fungus between the toes."],["Tetanus","bac","A bacterium entering through a deep wound."],["COVID-19","vir","A coronavirus."]];
 QLab.kit.sorter(api,{items:chal?B:A,cats,hint:"Recall: antibiotics kill bacteria. Mosquito-borne malaria is a protozoan. Ringworm is a fungus.",done:()=>chal?api.solved():(api.award('did'),api.ready())})},
why:["Disease-causing organisms (<span class=\"word\">pathogens</span>) include bacteria, viruses, protozoa and fungi.", "<b>Bacteria:</b> cholera, typhoid, TB, tetanus. <b>Virus:</b> flu, polio, dengue, measles. <b>Protozoa:</b> malaria. <b>Fungi:</b> ringworm.", "Antibiotics kill bacteria but not viruses. <b>Vaccines</b> teach the body to defeat a pathogen before it makes you ill.", "Prevention: clean water, hygiene, good food, mosquito control, vaccination and rest."],
check:[{q:"Malaria is caused by a…",options:["Bacterium", "Virus", "Protozoan", "Fungus"],answer:2,why:"Plasmodium is a protozoan carried by Anopheles.",hint:"Mosquito."},
 {q:"A vaccine…",options:["Cures all diseases", "Prepares the body to fight a germ", "Kills mosquitoes", "Is an antibiotic"],answer:1,why:"It trains the immune system.",hint:"Prevention."},
 {q:"Antibiotics do NOT work on…",options:["Typhoid", "Cholera", "Flu", "TB"],answer:2,why:"Flu is a virus.",hint:"Virus."}],
challenge:{text:"Sort <b>five more diseases</b> by their cause.",win:"Measles and COVID-19 viruses, amoebic dysentery protozoan, athlete's foot fungus, tetanus bacterium."},
real:["Polio has almost vanished in India because of vaccines.", "Washing hands with soap stops the spread of many diseases.", "Draining stagnant water stops mosquito breeding."],
words:{"Pathogen": "A germ that causes disease.", "Vaccine": "A preparation that gives immunity.", "Antibiotic": "A medicine that kills bacteria.", "Immunity": "The body's ability to fight disease."}
});
