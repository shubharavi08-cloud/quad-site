QLab.register({
id:'c10_classify',code:'10-B10',title:"Classifying animals: five vertebrate groups",grade:10,subject:'Biology',emoji:'🐾',
hook:{title:"A whale lives in water. A bat flies. Are they fish and birds?",text:"Scientists group living things by shared features, not by where they live. Sort each animal into its group."},
prior:"You know many animals by name.",
guess:{q:"A whale lives in the sea, but it feeds its babies milk and breathes air. It is a…",options:["Fish", "Mammal", "Reptile", "Amphibian"],answer:1,hint:"Look at the features, not the habitat.",after:"Sort the animals."},
build(api){
 const chal=!!api.challenge;
 const cats=[["mam", "Mammal"],["bird", "Bird"],["rep", "Reptile"],["amp", "Amphibian"],["fish", "Fish"]];
 const A=[["Dog","mam","Hair, warm-blooded, feeds milk to its young."],["Parrot","bird","Feathers, wings, lays hard-shelled eggs."],["Snake","rep","Dry scaly skin, lays leathery eggs on land."],["Frog","amp","Moist skin, starts life in water and later lives on land too."],["Rohu","fish","Gills and fins, lives only in water."],["Whale","mam","Lives in water, but breathes air with lungs and feeds milk."],["Bat","mam","It flies, but it has hair and feeds its young milk."],["Penguin","bird","It cannot fly, but it has feathers and lays eggs."]];
 const B=[["Dolphin","mam","Breathes air, feeds milk."],["Lizard","rep","Scaly dry skin."],["Toad","amp","Moist skin, lays eggs in water."],["Eagle","bird","Feathers and a beak."],["Shark","fish","Gills and fins. It is a fish, not a mammal."]];
 QLab.kit.sorter(api,{items:chal?B:A,cats,hint:"Look at skin, breathing, and how the young are born, not at where it lives.",done:()=>chal?api.solved():(api.award('did'),api.ready())})},
why:["Animals with a backbone are <span class=\"word\">vertebrates</span>. There are five groups: fish, amphibians, reptiles, birds and mammals.", "<b>Fish</b>: gills, fins, scales. <b>Amphibians</b>: moist skin, water and land. <b>Reptiles</b>: dry scaly skin. <b>Birds</b>: feathers, wings. <b>Mammals</b>: hair and milk for the young.", "Groups are decided by features, not habitat. A whale lives in water but is a mammal. A bat flies but is a mammal.", "This is <span class=\"word\">classification</span>: it helps us study millions of species in order."],
check:[{q:"Which group has feathers?",options:["Mammals", "Reptiles", "Birds", "Fish"],answer:2,why:"Only birds have feathers.",hint:"Parrot."},
 {q:"A whale is a mammal because it…",options:["Lives in the sea", "Is big", "Breathes air and feeds milk", "Has fins"],answer:2,why:"Mammal features: lungs, milk, hair.",hint:"Not habitat."},
 {q:"Which animal can live on land and in water and has moist skin?",options:["Snake", "Frog", "Eagle", "Shark"],answer:1,why:"Frogs are amphibians.",hint:"Amphi = both."}],
challenge:{text:"Sort <b>five more animals</b>. Watch out for the tricky ones.",win:"Dolphin mammal, lizard reptile, toad amphibian, eagle bird, shark fish."},
real:["Vets and forest officers identify animals by these groups.", "Zoos arrange animals by groups.", "Wildlife laws protect species in each group."],
words:{"Vertebrate": "An animal with a backbone.", "Mammal": "A warm-blooded animal with hair that feeds its young milk.", "Amphibian": "An animal that lives on land and in water, with moist skin.", "Classification": "Grouping living things by their features."}
});
