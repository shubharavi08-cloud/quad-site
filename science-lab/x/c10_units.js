QLab.register({
id:'c10_units',code:'10-P11',title:"Measurement: SI units",grade:10,subject:'Physics',emoji:'📏',
hook:{title:"A pencil is 15 cm. A race takes 12 s. How do scientists everywhere agree on measuring?",text:"They use the SI system. Each kind of quantity has one base unit. Match the measurement to its base unit."},
prior:"You know that we measure length, mass and time.",
guess:{q:"The SI base unit of mass is the…",options:["gram", "kilogram", "tonne", "pound"],answer:1,hint:"It has the prefix kilo already.",after:"Match the units."},
build(api){
 const chal=!!api.challenge;
 const cats=[["m", "metre (m)"],["kg", "kilogram (kg)"],["s", "second (s)"],["K", "kelvin (K)"]];
 const A=[["How long a room is","m","Length is measured in metres."],["Weight (mass) of a bag of rice","kg","Mass is measured in kilograms."],["How long a race lasts","s","Time is measured in seconds."],["Temperature (SI unit)","K","Temperature has the unit kelvin."],["Distance between two cities","m","Metres; we often use km (1000 m)."],["Mass of a person","kg","Kilograms."],["Time of one heartbeat","s","Seconds."],["Height of a tree","m","Metres."]];
 const B=[["Width of a notebook","m","Metres (or cm)."],["Mass of a pencil","kg","Kilograms (about 0.005 kg)."],["Time of a school period","s","Seconds (2400 s for 40 minutes)."],["Temperature of a melting ice cube","K","273 K."],["Thickness of a coin","m","Metres (a small fraction)."]];
 QLab.kit.sorter(api,{items:chal?B:A,cats,hint:"Length: metre. Mass: kilogram. Time: second. Temperature: kelvin.",done:()=>chal?api.solved():(api.award('did'),api.ready())})},
why:["The <span class=\"word\">SI system</span> is the international way to measure. Seven base units; the first four are metre (length), kilogram (mass), second (time) and kelvin (temperature).", "Prefixes make units bigger or smaller: kilo = 1000, centi = 1/100, milli = 1/1000.", "Measurements need a number and a unit. \"5\" means nothing; \"5 m\" does.", "Always read an instrument at eye level and check for zero error."],
check:[{q:"1 kilometre equals…",options:["10 m", "100 m", "1000 m", "10 000 m"],answer:2,why:"Kilo means 1000.",hint:"Prefix."},
 {q:"The SI unit of time is the…",options:["minute", "second", "hour", "day"],answer:1,why:"The second.",hint:"Base unit."},
 {q:"0 °C is about…",options:["0 K", "100 K", "273 K", "373 K"],answer:2,why:"Add 273 to Celsius.",hint:"Kelvin."}],
challenge:{text:"Match <b>five more measurements</b> to their SI base unit.",win:"Metre for lengths, kilogram for mass, second for time, kelvin for temperature."},
real:["Every country uses SI for science and trade.", "Doctors measure medicine in milligrams, a thousandth of a gram.", "A thermometer in India shows °C, but scientists convert to K."],
words:{"SI unit": "The international standard unit of measurement.", "Base unit": "A unit not made from others (metre, kilogram, second, kelvin).", "Prefix": "A word part that scales a unit (kilo, milli).", "Quantity": "Something that can be measured."}
});
