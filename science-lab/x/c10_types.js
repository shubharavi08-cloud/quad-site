QLab.register({
id:'c10_types',code:'10-C1',title:'Types of reactions: combination, decomposition, displacement',grade:10,subject:'Chemistry',emoji:'🔬',
hook:{title:'Thousands of reactions, but only a few patterns.',text:'Join the patterns. Learn to look at an equation and say which type it is.'},
prior:'You can read a balanced equation.',
guess:{q:'2Mg + O₂ → 2MgO: two substances join to make ONE product. This is a…',options:['Decomposition','Combination reaction','Displacement','Double displacement'],answer:1,hint:'Combine means join.',after:'Sort more reactions.'},
build(api){
 const chal=!!api.challenge;
 const cats=[['comb','Combination'],['dec','Decomposition'],['dis','Displacement'],['dbl','Double displacement']];
 const A=[['2Mg + O₂ → 2MgO','comb','Two join to make one.'],['CaCO₃ → CaO + CO₂ (heat)','dec','One breaks into two or more.'],['Fe + CuSO₄ → FeSO₄ + Cu','dis','A more reactive metal pushes out a less reactive one.'],['Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl','dbl','Two compounds swap partners.'],['CaO + H₂O → Ca(OH)₂','comb','Two join to make one.'],['Zn + H₂SO₄ → ZnSO₄ + H₂','dis','Zinc replaces hydrogen.']];
 const B=[['2H₂O → 2H₂ + O₂ (electricity)','dec','One breaks into simpler substances.'],['AgNO₃ + NaCl → AgCl + NaNO₃','dbl','Partners swap and a white solid forms.'],['2Na + Cl₂ → 2NaCl','comb','Two elements join.'],['Zn + CuSO₄ → ZnSO₄ + Cu','dis','Zinc is more reactive than copper.']];
 QLab.kit.sorter(api,{items:chal?B:A,cats,hint:'Count how many substances are on each side and how they change partners.',done:()=>chal?api.solved():(api.award('did'),api.ready())})},
why:['<b>Combination</b>: A + B → AB. Two or more substances make one product.','<b>Decomposition</b>: AB → A + B. One substance breaks into simpler ones, often by heat, light or electricity.','<b>Displacement</b>: A + BC → AC + B. A more reactive element pushes out a less reactive one.','<b>Double displacement</b>: AB + CD → AD + CB. Two compounds swap partners, often forming a solid (precipitate).'],
check:[{q:'CaCO₃ → CaO + CO₂ is a…',options:['Combination','Decomposition','Displacement','Double displacement'],answer:1,why:'One compound breaks into two.',hint:'One on the left.'},
 {q:'Which is a displacement reaction?',options:['Fe + CuSO₄ → FeSO₄ + Cu','2Mg + O₂ → 2MgO','AgNO₃ + NaCl → AgCl + NaNO₃','2H₂O → 2H₂ + O₂'],answer:0,why:'Iron replaces copper.',hint:'A single element pushing another out.'},
 {q:'Which reaction type often forms a precipitate?',options:['Combination','Decomposition','Double displacement','None'],answer:2,why:'Partners swap and an insoluble product can form.',hint:'AgCl was white and solid.'}],
challenge:{text:'Four new reactions. Name the <b>type</b> of each.',win:'You can classify reactions by their pattern.'},
real:['Quicklime plus water (combination) is used to whitewash walls.','Heating limestone (decomposition) makes cement.','Iron displacing copper is how copper is made from blue sulphate solution.'],
words:{Combination:'Two or more join into one.',Decomposition:'One breaks into several.',Displacement:'One element replaces another.',Precipitate:'An insoluble solid formed in a solution.'}
});
