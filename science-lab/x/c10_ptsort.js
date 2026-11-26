QLab.register({
id:'c10_ptsort',code:'10-C8',title:"Periodic table: metals, non-metals and metalloids",grade:10,subject:'Chemistry',emoji:'🧪',
hook:{title:"The periodic table has more than a hundred elements. Is there a quick way to know their type?",text:"Elements fall into three types by their properties. Sort them and see the pattern."},
prior:"You know that elements are arranged in a periodic table.",
guess:{q:"Which element is a non-metal?",options:["Iron", "Sodium", "Sulphur", "Copper"],answer:2,hint:"Non-metals are usually dull and brittle.",after:"Sort the elements."},
build(api){
 const chal=!!api.challenge;
 const cats=[["met", "Metal"],["non", "Non-metal"],["mtl", "Metalloid"]];
 const A=[["Sodium","met","Soft, shiny metal, conducts electricity."],["Iron","met","Strong, magnetic metal."],["Sulphur","non","Yellow, brittle solid; does not conduct."],["Oxygen","non","A gas that supports burning."],["Silicon","mtl","Looks metallic but is brittle; a semiconductor."],["Copper","met","Good conductor, used in wires."],["Carbon","non","Non-metal (graphite is an unusual conducting form)."],["Boron","mtl","A metalloid with some metal and some non-metal properties."]];
 const B=[["Aluminium","met","A light metal."],["Neon","non","A noble gas."],["Germanium","mtl","A semiconductor like silicon."],["Chlorine","non","A yellow-green gas."],["Zinc","met","A bluish-white metal."]];
 QLab.kit.sorter(api,{items:chal?B:A,cats,hint:"Metals are shiny and conduct. Non-metals are dull and brittle. Metalloids lie in between.",done:()=>chal?api.solved():(api.award('did'),api.ready())})},
why:["<b>Metals</b> are shiny, malleable, ductile and conduct heat and electricity. They are on the left and centre of the table.", "<b>Non-metals</b> are dull, brittle and poor conductors. They are on the right (and hydrogen).", "<b>Metalloids</b> (boron, silicon, germanium, arsenic, antimony) sit along the staircase line and have mixed properties. Silicon chips use them.", "<span class=\"word\">Periodic law:</span> properties repeat in a pattern as atomic number rises, so the table groups similar elements in columns."],
check:[{q:"Which is a metalloid?",options:["Copper", "Silicon", "Oxygen", "Sodium"],answer:1,why:"Silicon is a semiconductor.",hint:"Computer chips."},
 {q:"Which type conducts electricity best?",options:["Non-metals", "Metals", "Noble gases", "Insulators"],answer:1,why:"Free electrons carry current.",hint:"Wires."},
 {q:"Elements in the same column of the table have…",options:["Similar properties", "The same mass", "No relation", "Different families"],answer:0,why:"The column number is the group.",hint:"A family."}],
challenge:{text:"Sort <b>five more elements</b>.",win:"Aluminium and zinc are metals, neon and chlorine non-metals, germanium a metalloid."},
real:["Silicon and germanium make computer chips.", "Copper wires carry electricity in your home.", "Neon lights glow because of a noble gas."],
words:{"Metal": "A shiny element that conducts and can be hammered.", "Non-metal": "A dull, brittle element, a poor conductor.", "Metalloid": "An element with mixed metal and non-metal properties.", "Periodic table": "A chart of elements in order of atomic number."}
});
