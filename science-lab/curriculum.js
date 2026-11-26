/* Where each experiment fits in major school curricula. Names checked against official or board pages (Nov 2026). */
QLab.CURR=(()=>{
const B=[['CBSE','CBSE (NCERT)'],['NIOS','NIOS'],['ICSE','ICSE (CISCE)'],['IGCSE','Cambridge IGCSE'],['NGSS','US NGSS']];
const C={
 states:{CBSE:'Class 9 · Matter in Our Surroundings',NIOS:'Secondary Science · Matter in our surroundings',IGCSE:'Chemistry 0620 · 1 States of matter',NGSS:'MS-PS1-4 · Particle motion, temperature and state'},
 mixtures:{CBSE:'Class 9 · Is Matter Around Us Pure?',IGCSE:'Chemistry 0620 · 12 Experimental techniques and chemical analysis'},
 atoms:{CBSE:'Class 9 · Structure of the Atom',NIOS:'Secondary Science · Atomic structure',IGCSE:'Chemistry 0620 · 2 Atoms, elements and compounds',NGSS:'MS-PS1-1 · Atomic composition of matter'},
 moles:{CBSE:'Class 9 · Atoms and Molecules',NIOS:'Secondary Science · Atoms and molecules',ICSE:'Class 10 · Mole Concept and Stoichiometry',IGCSE:'Chemistry 0620 · 3 Stoichiometry'},
 reactions:{CBSE:'Class 10 · Chemical Reactions and Equations',NIOS:'Secondary Science · Chemical reactions and equations',IGCSE:'Chemistry 0620 · 6 Chemical reactions',NGSS:'MS-PS1-2 · Substances before and after reacting'},
 combustion:{IGCSE:'Chemistry 0620 · 6 Chemical reactions',NGSS:'MS-PS1-2 · Substances before and after reacting'},
 acids:{CBSE:'Class 10 · Acids, Bases and Salts',NIOS:'Secondary Science · Acids, bases and salts',ICSE:'Class 10 · Study of Acids, Bases and Salts',IGCSE:'Chemistry 0620 · 7 Acids, bases and salts'},
 metals:{CBSE:'Class 10 · Metals and Non-metals',NIOS:'Secondary Science · Metals and non-metals',ICSE:'Class 10 · Metallurgy',IGCSE:'Chemistry 0620 · 9 Metals'},
 carbon:{CBSE:'Class 10 · Carbon and its Compounds',NIOS:'Secondary Science · Carbon and its compounds',ICSE:'Class 10 · Organic Chemistry',IGCSE:'Chemistry 0620 · 11 Organic chemistry'},
 bonding:{CBSE:'Class 10 · Metals and Non-metals (ionic bonding)',NIOS:'Secondary Science · Chemical bonding',ICSE:'Class 10 · Chemical Bonding',IGCSE:'Chemistry 0620 · 2 Atoms, elements and compounds'},
 gases:{CBSE:'Class 9 · Matter in Our Surroundings',IGCSE:'Chemistry 0620 · 1 States of matter'},
 electric:{CBSE:'Class 10 · Electricity',NIOS:'Secondary Science · Electrical energy'},
 change:{IGCSE:'Chemistry 0620 · 6 Chemical reactions',NGSS:'MS-PS1-2 · Substances before and after reacting'},
 rust:{CBSE:'Class 10 · Chemical Reactions and Equations (corrosion)',IGCSE:'Chemistry 0620 · 9 Metals',NGSS:'MS-PS1-2 · Substances before and after reacting'},
 light:{CBSE:'Class 10 · Light: Reflection and Refraction',NIOS:'Secondary Science · Light energy',ICSE:'Class 10 · Light',IGCSE:'Physics 0625 · 3 Waves',NGSS:'MS-PS4-2 · Waves and materials'},
 magnetism:{CBSE:'Class 10 · Magnetic Effects of Electric Current',NIOS:'Secondary Science · Magnetic effect of electric current',ICSE:'Class 10 · Electromagnetism',IGCSE:'Physics 0625 · 4 Electricity and magnetism',NGSS:'MS-PS2-3 · Electric and magnetic forces'},
 photo:{CBSE:'Class 10 · Life Processes',NIOS:'Secondary Science · Life processes I',ICSE:'Class 10 · Photosynthesis',IGCSE:'Biology 0610 · 6 Plant nutrition and transport',NGSS:'MS-LS1-6 · Photosynthesis'},
 resp:{CBSE:'Class 10 · Life Processes',NIOS:'Secondary Science · Life processes I',ICSE:'Class 10 · Respiration',IGCSE:'Biology 0610 · 12 Respiration',NGSS:'MS-LS1-7 · Matter and energy in organisms'},
 coord:{CBSE:'Class 10 · Control and Coordination',NIOS:'Secondary Science · Control and coordination',ICSE:'Class 10 · Nervous system',IGCSE:'Biology 0610 · 14 Coordination and response',NGSS:'MS-LS1-8 · Sensory receptors'},
 heredity:{CBSE:'Class 10 · Heredity',NIOS:'Secondary Science · Heredity',ICSE:'Class 10 · Genetics',IGCSE:'Biology 0610 · 16 Inheritance',NGSS:'MS-LS3-2 · Inheritance and variation'},
 ecosystem:{CBSE:'Class 10 · Our Environment',NIOS:'Secondary Science · Natural environment',ICSE:'Class 9/10 · Ecosystems',IGCSE:'Biology 0610 · 18 Organisms and their environment',NGSS:'MS-LS2-3 · Energy flow in ecosystems'},
 water:{CBSE:'Class 7 · Water: A Precious Resource',NIOS:'Secondary Science · Air and water',ICSE:'Class 9 · Water',IGCSE:'Chemistry 0620 · 14 Air and water',CLS:'MS-ESS2-4 · Water cycle'},
 digest:{CBSE:'Class 10 · Life Processes',NIOS:'Secondary Science · Life processes I',ICSE:'Class 9 · Nutrition and digestion',IGCSE:'Biology 0610 · 5 Nutrition in humans',CLS:'MS-LS1-3 · Body systems'},
 blood:{CBSE:'Class 10 · Life Processes',NIOS:'Secondary Science · Life processes I',ICSE:'Class 10 · Circulatory system',IGCSE:'Biology 0610 · 9 Transport in animals',CLS:'MS-LS1-3 · Body systems'},
 repro:{CBSE:'Class 10 · How do Organisms Reproduce?',NIOS:'Secondary Science · Reproduction',ICSE:'Class 10 · Reproduction',IGCSE:'Biology 0610 · 16 Reproduction in plants',CLS:'MS-LS1-4 · Plant reproduction'}
};
const M={c10_water:'water',c10_digest:'digest',c10_blood:'blood',c10_flowerrep:'repro',c10_mirror:'light',c10_refract:'light',c10_lens:'light',c10_circuit:'electric',c10_joule:'electric',c10_magfield:'magnetism',c10_motor:'magnetism',c10_induct:'magnetism',c10_photo:'photo',c10_respire:'resp',c10_reflex:'coord',c10_tropism:'coord',c10_mendel:'heredity',c10_foodchain:'ecosystem',c8_states:'states',c8_heatcurve:'states',c8_evap:'states',c8_dissolve:'mixtures',c8_solubility:'mixtures',c9_separate:'mixtures',c9_chromato:'mixtures',c9_colloid:'mixtures',
 c9_buildatom:'atoms',c9_rutherford:'atoms',c9_isotopes:'atoms',c9_mole:'moles',c9_mass:'moles',c9_compound:'moles',
 c10_balance:'reactions',c10_types:'reactions',c10_oxid:'reactions',c8_firetriangle:'combustion',c8_flame:'combustion',c10_burn:'combustion',
 c10_indicators:'acids',c10_titration:'acids',c10_salts:'acids',c10_metalacid:'metals',c10_displace:'metals',c10_series:'metals',c8_metalreact:'metals',
 c10_ethanol:'carbon',c10_soap:'carbon',c10_molecule:'bonding',c10_ionic:'bonding',c10_gas:'gases',ohm:'electric',c8_conduct:'metals',c8_sortchange:'change',c8_rusting:'rust'};
return{boards:B,concepts:C,of:id=>C[M[id]]||null}})();
