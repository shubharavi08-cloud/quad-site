QLab.register({
id:'c10_cell',code:'10-B11',title:"The cell: plant and animal cells",grade:10,subject:'Biology',emoji:'🔬',
hook:{title:"Plants and animals are made of tiny cells. Are the cells alike?",text:"Both have a nucleus and a membrane, but some parts are special. Sort the cell parts."},
prior:"You know that living things are made of cells, too small to see without a microscope.",
guess:{q:"Which part is found in plant cells but NOT in animal cells?",options:["Nucleus", "Cell wall", "Mitochondria", "Cell membrane"],answer:1,hint:"It gives the plant cell a fixed, rectangular shape.",after:"Sort the parts."},
build(api){
 const chal=!!api.challenge;
 const cats=[["ani", "Animal cell only"],["pla", "Plant cell only"],["bot", "Both"]];
 const A=[["Cell wall","pla","A tough wall of cellulose outside the membrane. Plants only."],["Chloroplast","pla","Contains chlorophyll for photosynthesis. Plants only."],["Large central vacuole","pla","A big sap-filled vacuole keeps plant cells firm."],["Nucleus","bot","Controls the cell and holds the genes."],["Mitochondria","bot","Release energy by respiration, in both."],["Cell membrane","bot","Controls what enters and leaves, in both."],["Cytoplasm","bot","The jelly where reactions happen, in both."],["Centrioles","ani","Found in animal cells, helping them divide. Higher plants lack them."]];
 const B=[["Ribosomes","bot","Make proteins in all cells."],["Lysosomes","ani","Bags of digestive enzymes, typical of animal cells."],["Starch grains","pla","Plants store food as starch."],["Glycogen granules","ani","Animals store food as glycogen."],["Endoplasmic reticulum","bot","A network of membranes in both."]];
 QLab.kit.sorter(api,{items:chal?B:A,cats,hint:"Think: plants make their own food and need a strong wall. Animals do not.",done:()=>chal?api.solved():(api.award('did'),api.ready())})},
why:["All living things are made of <span class=\"word\">cells</span>. Plant and animal cells share a nucleus, cytoplasm, cell membrane, mitochondria and ribosomes.", "<b>Only plant cells</b> have a cell wall, chloroplasts and a large central vacuole.", "<b>Only animal cells</b> have centrioles and store food as glycogen; plants store starch.", "The <b>nucleus</b> is the control centre; <b>mitochondria</b> are the powerhouses; chloroplasts are the food factories."],
check:[{q:"Which part makes food in a plant cell?",options:["Mitochondria", "Chloroplast", "Nucleus", "Vacuole"],answer:1,why:"Chloroplasts do photosynthesis.",hint:"Green."},
 {q:"The control centre of a cell is the…",options:["Ribosome", "Nucleus", "Membrane", "Cell wall"],answer:1,why:"It holds the genes.",hint:"Brain of the cell."},
 {q:"Which is found in BOTH plant and animal cells?",options:["Cell wall", "Chloroplast", "Mitochondria", "Large vacuole"],answer:2,why:"Both release energy by respiration.",hint:"Powerhouse."}],
challenge:{text:"Sort <b>five more cell parts</b>: plant only, animal only or both.",win:"Ribosomes in both, lysosomes animal, starch grains plant, glycogen animal, ER in both."},
real:["A microscope slide of onion peel shows plant cell walls.", "Cheek cells show an animal cell without a wall.", "Red blood cells have no nucleus when mature."],
words:{"Cell": "The basic unit of life.", "Nucleus": "Control centre of the cell.", "Chloroplast": "Green part where photosynthesis happens.", "Cell wall": "Rigid outer layer of plant cells."}
});
