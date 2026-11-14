// QUAD catalog: shared by index.html and quest.html. Update video ids and premiere times here only.
var D = id => "https://drive.google.com/file/d/" + id + "/view";
var YT = id => "https://www.youtube.com/watch?v=" + id;
// Important-question videos (at = goes public, IST)
var IQ = [
 {s:"Maths",c:1,n:"Real Numbers",id:"aBNZhkaaPWM",th:"m1",q:"8 must-do questions"},
 {s:"Maths",c:2,n:"Polynomials",id:"UdB7RuEAjW0",th:"m2",q:"8 must-do questions"},
 {s:"Maths",c:3,n:"Pair of Linear Equations",id:"d13fv7BGvdc",th:"m3",q:"10 must-do questions"},
 {s:"Maths",c:4,n:"Quadratic Equations",id:"DSlCOJ0l9jI",th:"m4",q:"10 must-do questions + MCQ tricks"},
 {s:"Maths",c:5,n:"Arithmetic Progressions",id:"5ZTkXgz6f78",th:"m5",q:"10 must-do questions + MCQ tricks"},
 {s:"Maths",c:6,n:"Triangles",id:"IKxXfup-GYI",th:"m6",q:"8 must-do questions + MCQ tricks"},
 {s:"Maths",c:7,n:"Coordinate Geometry",id:"MYfxqBicem0",th:"m7",q:"8 must-do questions + MCQ tricks"},
 {s:"Maths",c:8,n:"Introduction to Trigonometry",id:"c7cVAsI5Huk",th:"m8",q:"8 must-do questions",at:"2026-11-05T17:00:00+05:30"},
 {s:"Maths",c:9,n:"Some Applications of Trigonometry",id:"SeTmHlYHsNs",th:"m9",q:"6 must-do questions"},
 {s:"Maths",c:10,n:"Circles",id:"c7JSK02pCyo",q:"8 must-do questions"},
 {s:"Maths",c:11,n:"Areas Related to Circles",id:"kCdWLUltkY4",q:"6 must-do questions"},
 {s:"Maths",c:12,n:"Surface Areas and Volumes",id:"FQ_3ayD-nVc",q:"10 must-do questions"},
 {s:"Maths",c:13,n:"Statistics",id:"P0wTpyeOs-A",q:"10 must-do questions"},
 {s:"Maths",c:14,n:"Probability",id:"18FpEzQFjG4",q:"10 must-do questions"},
 {s:"Science",c:1,n:"Chemical Reactions and Equations",id:"NFgXgUhtMDI",th:"s1",q:"10 must-do questions + MCQ tricks"},
 {s:"Science",c:2,n:"Acids, Bases and Salts",id:"Rf4k6uxFFOM",th:"s2",q:"7 must-do questions + MCQ tricks",hold:1},
 {s:"Science",c:3,n:"Metals and Non-metals",id:"masmd3I48iY",q:"7 must-do questions + MCQ tricks"},
 {s:"Science",c:4,n:"Carbon and its Compounds",id:"2-nwRNJr1Lc",q:"7 must-do questions + MCQ tricks"},
 {s:"Science",c:5,n:"Life Processes",id:"60YEG6vC5JM",q:"7 must-do questions + MCQ tricks"},
 {s:"Science",c:6,n:"Control and Coordination",id:"BaXOil6vcyE",q:"7 must-do questions + MCQ tricks"},
];
var CH = {
 Maths:[["Real Numbers","1QLFRWBBIvvyel26x0hdGOQDJNWUXbAEu","1BMGclmmC4eXLKstP7GlIjfb4qdkb_hF2"],["Polynomials","1Zbitj9HnHpAr-K5EIOuM0NGtPDQ6s0S7"],["Pair of Linear Equations in Two Variables","1S2T-3Spieod0LkGq4VKfOCVTfM2i7058"],
  ["Quadratic Equations","1LU6WnTrKskLXQyFz9T3V0s0iIry9erIk","11aZl3GNICLokMPdlWZgo8wpkL2ducWtB"],["Arithmetic Progressions","1qNnJAFu9AJzBLpYi_Y7A7xHANaUCEszF","1gMp6ZeaoNTtHE8OwUysBwIiASCVBtbMX"],
  ["Triangles","1YLx58UWUuveBQ7mai303dxeHAx6GbOg1","1ACElInqKYWDB0rzCw0xQIvKcXlGU8aqK"],["Coordinate Geometry","1r1Hx0JTNCY_s7aU1-GVjo9SWYTs7Pdt2","1HcNMx8EOPvNN9jFqiGiU2dTlCgAEYTEM"],
  ["Introduction to Trigonometry","18sOIrYwVdjfSSv3byMuqP0irsXJtWNgK","1vEHbS9oaF8_8JEzWrrun1ARHiO1mGkua"],["Some Applications of Trigonometry","1nwUtyM_iNXhJYeZp0LIlRsx0ZKiGVBcG","1PgIejmyF98PURko5YcvewtXWB_5-vkIG"],
  ["Circles","17VWNG6nZei0-cfLsMz8Uqp2l47CwK7un"],["Areas Related to Circles","1XG68ESzNdAAukwU1BsVwf_Ck5Ygl1iKO"],["Surface Areas and Volumes","12RkOu9L2H11OCKx5_9vPeMvNvq6GOTnD"],
  ["Statistics","1fy_CT_9LDbCCJTY0_YUSoSTF_wXVqEJH"],["Probability","1nSOENfAqpif2Yqu13D1EO5nP16u1l6WQ"]],
 Science:[["Chemical Reactions and Equations","1hHS1kmo9NYLE8RLFcSnf65YOACiCYD9X",null,"1vQWWr6p_mhzvyV_JBZYR4xdpVcyVnh-X"],["Acids, Bases and Salts","1am7tBGd4gkAK1UcOpZwdILuaToqCh1qA"],["Metals and Non-metals","155wux42oq1BoqNcE3Dy03rkMtpV2hA-p"],
  ["Carbon and its Compounds","1zWI9UJd1UP46ec-EQkI5zcYdXnHNxDEB"],["Life Processes","1Roml5lJx3C3whgli9ADeKdzd0NJBXhGa"],["Control and Coordination","1slAw1xUUE3ltgI1TNIr2jeAY60JfO_n_"],
  ["How do Organisms Reproduce?","1OGGVNIEUTkRqfwMTIq7aQgwT9knEWid_"],["Heredity","1OzApm7LZoSTR48O-7bayHa9Jq3steAmG"],["Light: Reflection and Refraction","1OQcrfgPN2fSEmdqFMYvCIZwQJHHprs0V"],
  ["The Human Eye and the Colourful World","1ZSTVF7n086wwL_wHx6o3QCpx029UPeml"],["Electricity","13ovx5xMWdb5Z1g41_pbK2bG2IAvvaEeK"],["Magnetic Effects of Electric Current","10iZqF72X2B6NAFZ4ZzBP0Ff0bC3oGEPV"],["Our Environment","14eu-0H-2WQcx0jPei_swQoKpNhBDhDO3"]]
};
// More video types per chapter, added one by one as they are made. Only types listed here appear on the site.
// type: "r10" = 10-minute revision, "full" = full chapter (detailed), "c5" = chapter in 5 minutes.
// For "full" videos, ts maps each NCERT topic id (see quest/data/<key>.json "topics") to its start second, so Quest topics open at the right moment.
var MORE = [
 // {s:"Maths",c:12,type:"full",id:"VIDEOID",at:"2026-11-20T17:00:00+05:30",ts:{sa:60,vol:900}},
];
var VTYPE = {iq:["Must-do questions",1], r10:["10-min revision",2], full:["Full chapter",3], c5:["Chapter in 5 min",4]};
// card thumbnail: local thumbs/<th>.jpg when set, else the YouTube thumbnail
var TH = v => v.th ? "thumbs/" + v.th + ".jpg" : "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
var isLiveV = v => v && !v.hold && (!v.at || Date.parse(v.at) <= Date.now());
// every video for one chapter, in a fixed order: [{type,label,id,th,at,hold,ts}]
function vidsFor(s, c) {
  var out = [], iq = IQ.find(v => v.s === s && v.c === c);
  if (iq) out.push(Object.assign({type: "iq", label: iq.q.replace(/\s*\+.*$/, "")}, iq));
  MORE.filter(v => v.s === s && v.c === c).forEach(v => out.push(Object.assign({label: VTYPE[v.type][0], th: iq ? iq.th : ""}, v)));
  return out.sort((a, b) => VTYPE[a.type][1] - VTYPE[b.type][1]);
}
// Complete Chapter Guides (Drive PDF ids, shared "anyone with the link" at launch). Key = m<chapter> / s<chapter>.
var GUIDE = {m1:"1GfYx6q3W1z1ckr4YbwoeK_voTe3hF7Dq",m2:"1gY6LQVZQZZSR5v5yI8I4muGT2eGn9CXg",m3:"1Q3-rRGxXTTVpwcd860HEUbVD-dWkn6D2",m4:"1acUTO1fhZ4k4g0PcBV0zz7XQfuS9Ojxn",m5:"11pVdBBmfKkZQuyqux7xhg5bmTFU84BdW",m6:"1y_jzkVWeB8cNACQmJu3KcYGrPcmNM_uZ",m7:"14JwgcQVKGTmJf90kpjn2_aJmk6L_w3UE",m8:"1zv1ThW2ry-4YhPFZi0pKNUb1ByTyDsS4",m9:"11C3khXgpEQmR6r65amVtYmdYbclypKkA",m10:"1r3D6xRzGCagMG7LA-mPfC2Tq1oHOD1He",m11:"1ZhJCW_2dwtn5XpUS0h7_MsC0tx55GRQw",m12:"1NY6BrSYgHd-1of7SJjivfruTcd1sYdk5",m13:"1i6D3diye1u_Rd1AU_-IreFH7epbgiH8t",m14:"1vqtoyNJ8MLUpPz1lIJNLLdTZMkZCEKbm",s1:"16HU4aCCU_mGydz8_r-WZYr5KPAwENVk1",s2:"10zJeAUAmx22QS2es90dR8k4bnYcQK3IF",s3:"1fsK13aTGbu07gB34P-aXmeNIZPgdx33S",s4:"1X8OOP5FTZ1OjVklN6eD0ecYN5E7ZDe6m",s5:"1GvFocd0sA6-6aBco9JUj58xm5qZbGIoN",s6:"12Py3RRVEbiqrQ30COTpv2RqN3ZdKedfV",s7:"1jmrcNB3DpuLzh1fLIx5scue4p9uJWHTD",s8:"1_OhJVuF7JEZaG9NX7_gHlB4cTFj4d4JD",s9:"1akwf7SBtFQSeQ3V1gsKLS_fsLiB6q17w",s10:"13rNdUJ-H_ZYzaNaIRVx3pk4Vm_kqlEvB",s11:"1zKLSMRgTwpW4sNfv2omkByGUX6Y4n4PB",s12:"1kIlw5BOTJ0wdWOIMWUOk7xZph5qg6x9G",s13:"1PX4rRRyt6ltNEarbJbRVAbhdxS28n2KE"};

// Free weekly live classes on the QUAD YouTube channel, 7-8 pm IST (Maths Sundays from 15 Nov, Science Saturdays from 21 Nov 2026).
// Source of truth: Drive sheet "QUAD Live doubt hours — schedule". Key = m<chapter> / s<chapter>, value = class date (IST).
// After a class, put its recording's YouTube id in LIVE_REC (e.g. LIVE_REC.m1="VIDEOID") and the chapter shows "Live class recording".
var LIVE_URL = "https://www.youtube.com/@QuadAcademyOSH/live";
var LIVES = {
 m1:"2026-11-15", m7:"2026-11-15", m2:"2026-11-22", m3:"2026-11-22", m8:"2026-11-29", m9:"2026-11-29",
 m4:"2026-12-06", m5:"2026-12-13", m6:"2026-12-20", m10:"2026-12-27", m11:"2026-12-27", m12:"2027-01-03", m13:"2027-01-03", m14:"2027-01-10",
 s1:"2026-11-21", s2:"2026-11-21", s3:"2026-11-28", s4:"2026-11-28", s5:"2026-12-05", s6:"2026-12-12", s7:"2026-12-12", s8:"2026-12-19", s13:"2026-12-19",
 s9:"2026-12-26", s10:"2027-01-02", s12:"2027-01-02", s11:"2027-01-09"
};
var LIVE_REC = {};
