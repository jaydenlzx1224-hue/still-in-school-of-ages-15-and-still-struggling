(function(){
var grid=document.getElementById('grid');
for(var i=0;i<100;i++){grid.appendChild(document.createElement('span'));}
var dots=grid.children,timers=[];
function show(n){
  timers.forEach(clearTimeout);timers=[];
  for(var i=0;i<100;i++){dots[i].classList.remove('on');}
  for(let i=0;i<n;i++){timers.push(setTimeout(function(){dots[i].classList.add('on');},i*14));}
}
var tabs=document.querySelectorAll('#dotTabs button');
tabs.forEach(function(b){b.addEventListener('click',function(){
  tabs.forEach(function(x){x.setAttribute('aria-pressed',x===b);});
  document.getElementById('big').textContent=b.dataset.n;
  document.getElementById('cap').textContent=b.dataset.t;
  document.getElementById('src').textContent=b.dataset.s;
  show(+b.dataset.n);
});});
show(46);
var fills=document.querySelectorAll('.fill');
function grow(){fills.forEach(function(f){f.style.width=f.dataset.w+'%';});}
try{var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){grow();io.disconnect();}});io.observe(document.querySelector('.bars'));}catch(x){grow();}
var Q=[
{q:'What age group does PISA test?',o:['10-year-olds','15-year-olds','18-year-olds'],a:1,f:'PISA tests 15-year-olds in reading, maths and science.'},
{q:'Which SDG is about quality education?',o:['SDG 2','SDG 8','SDG 4'],a:2,f:'SDG 4 aims for inclusive and equitable quality education.'},
{q:'In PISA, what does Level 2 mean?',o:['The top score','The baseline level of proficiency','A failing grade for the whole school'],a:1,f:'Level 2 is the baseline. Students below it are called low performers.'},
{q:'What was Malaysia’s PISA reading score in 2022?',o:['388','415','476'],a:0,f:'It fell from 415 in 2018 to 388 in 2022.'},
{q:'Which group had a larger share of low performers in Malaysia in 2022?',o:['Girls','They were equal','Boys'],a:2,f:'Boys made up a larger share in maths and reading.'},
{q:'The World Bank’s “learning poverty” measure is about children of what age?',o:['10','15','18'],a:0,f:'Learning poverty is the share of 10-year-olds who cannot read and understand a short text.'},
{q:'SDG 4 Target 4.1 asks for children to finish school with what?',o:['Good attendance records','Relevant learning outcomes','Private tutoring'],a:1,f:'The target is about real learning, not only being in school.'},
{q:'Which cause is linked to students having no device or quiet place to study?',o:['School closures','Strong foundations','Early catch-up'],a:0,f:'Online learning during closures was hardest for students without devices or internet.'},
{q:'When is the cheapest time to fix a reading problem?',o:['At age 15','Early, as soon as it appears','After the exams'],a:1,f:'Early screening and small-group help stop gaps growing.'},
{q:'About how many years of learning did ISIS Malaysia estimate was lost in maths?',o:['0.5 years','3 years','1.6 years'],a:2,f:'The estimate was about 1.6 years in maths, 1.4 in reading and 1.1 in science.'}];
var qz=document.getElementById('quiz'),i=0,score=0;
function render(){
  if(i>=Q.length){qz.innerHTML='<h3>You scored '+score+' out of '+Q.length+'</h3><button class="next" id="again">Try again</button>';
    document.getElementById('again').onclick=function(){i=0;score=0;render();};return;}
  var q=Q[i];qz.innerHTML='<h3>'+(i+1)+'. '+q.q+'</h3><div class="opts"></div><p class="fb" aria-live="polite"></p>';
  var box=qz.querySelector('.opts');
  q.o.forEach(function(t,k){var b=document.createElement('button');b.className='opt';b.textContent=t;
    b.onclick=function(){
      var all=box.children;for(var j=0;j<all.length;j++){all[j].disabled=true;}
      all[q.a].classList.add('right');if(k!==q.a){b.classList.add('wrong');}else{score++;}
      qz.querySelector('.fb').textContent=(k===q.a?'Correct. ':'Not quite. ')+q.f;
      var n=document.createElement('button');n.className='next';n.textContent=i<Q.length-1?'Next question':'See score';
      n.onclick=function(){i++;render();};qz.appendChild(n);};
    box.appendChild(b);});
}
render();

var SK=['#e8b98f','#c68a5e','#f1c9a5'],HR=['#2b1d14','#4a2f1c','#1a1a1a'];
function P(x,y,k,sk,sh,hr,rot){return '<g transform="translate('+x+' '+y+') scale('+k+') rotate('+(rot||0)+')"><rect x="-27" y="-70" width="54" height="72" rx="20" fill="'+sh+'"/><rect x="-7" y="-84" width="14" height="16" fill="'+sk+'"/><circle cx="0" cy="-102" r="22" fill="'+sk+'"/><path d="M-23 -104 a23 23 0 0 1 46 0 q-12 -13 -23 -10 q-12 -2 -23 10z" fill="'+hr+'"/><circle cx="-8" cy="-100" r="2.3" fill="#2b2118"/><circle cx="8" cy="-100" r="2.3" fill="#2b2118"/><path d="M-7 -90 q7 6 14 0" stroke="#7a3b2e" stroke-width="2" fill="none"/></g>';}
function DK(x,w){return '<rect x="'+x+'" y="150" width="'+w+'" height="10" rx="3" fill="url(#wd)"/><rect x="'+(x+10)+'" y="160" width="6" height="50" fill="#7a4d26"/><rect x="'+(x+w-16)+'" y="160" width="6" height="50" fill="#7a4d26"/>';}
function BK(x,y){return '<path d="M'+x+' '+y+' l36 -8 v20 l-36 8z" fill="#fff"/><path d="M'+(x+72)+' '+y+' l-36 -8 v20 l36 8z" fill="#f1ece0"/><path d="M'+(x+6)+' '+(y+2)+' l26 -5 M'+(x+6)+' '+(y+8)+' l26 -5 M'+(x+66)+' '+(y+2)+' l-26 -5 M'+(x+66)+' '+(y+8)+' l-26 -5" stroke="#9aa5b8" stroke-width="1.5"/>';}
var DF='<defs><linearGradient id="wl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6eedc"/><stop offset="1" stop-color="#e0d0af"/></linearGradient><linearGradient id="wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c58e55"/><stop offset="1" stop-color="#8f5d30"/></linearGradient><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ecbee"/><stop offset="1" stop-color="#f7e8c4"/></linearGradient><linearGradient id="nt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141b36"/><stop offset="1" stop-color="#2c3763"/></linearGradient><radialGradient id="gl"><stop offset="0" stop-color="#bfe3ff"/><stop offset="1" stop-color="#4a8fd8"/></radialGradient></defs>';
var WALL='<rect width="720" height="210" fill="url(#wl)"/><rect y="168" width="720" height="42" fill="#b98c5a"/><rect y="166" width="720" height="4" fill="#a37646"/>';
var WIN=function(x){return '<rect x="'+x+'" y="26" width="90" height="82" rx="3" fill="#fff"/><rect x="'+(x+5)+'" y="31" width="80" height="72" fill="#a9d8f2"/><path d="M'+(x+45)+' 31v72M'+(x+5)+' 67h80" stroke="#fff" stroke-width="4"/><circle cx="'+(x+22)+'" cy="50" r="9" fill="#fff6c9"/>';};
function G(x,y,k){return '<g transform="translate('+x+' '+y+') scale('+k+')" fill="none" stroke="#2b2118" stroke-width="2"><circle cx="-8" cy="-100" r="7"/><circle cx="8" cy="-100" r="7"/><path d="M-1 -100h2"/></g>';}
function AR(x1,y1,x2,y2,sh,sk){return '<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="'+sh+'" stroke-width="15" stroke-linecap="round"/><circle cx="'+x2+'" cy="'+y2+'" r="7" fill="'+sk+'"/>';}
var SH=function(x,y,r){return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+r+'" ry="7" fill="#000" opacity=".14"/>';};
var ART={
'causes-foundations':WALL+WIN(570)+'<rect x="186" y="20" width="182" height="102" rx="4" fill="#8a5a2b"/><rect x="192" y="26" width="170" height="90" fill="#2f4a3f"/><text x="277" y="85" font-size="42" font-family="Georgia,serif" fill="#fff" text-anchor="middle">A B C</text><rect x="196" y="118" width="60" height="4" fill="#eee"/>'+DK(380,150)+'<rect x="392" y="130" width="20" height="20" rx="2" fill="#e5533d"/><rect x="414" y="136" width="14" height="14" rx="2" fill="#2f5bd1"/>'+P(455,152,1,SK[0],'#d94f5c',HR[0])+BK(436,141),
'causes-closures':'<rect width="720" height="210" fill="url(#nt)"/><rect x="70" y="30" width="90" height="82" rx="3" fill="#0e1430"/><circle cx="115" cy="62" r="14" fill="#fff6c9"/><circle cx="121" cy="58" r="12" fill="#141b36"/><circle cx="100" cy="92" r="1.8" fill="#fff"/><circle cx="140" cy="48" r="1.8" fill="#fff"/><rect y="170" width="720" height="40" fill="#1b2140"/>'+P(300,152,1,SK[1],'#5b7bd6',HR[1])+DK(245,255)+'<path d="M370 150l100 0 8 6h-116z" fill="#9aa3b8"/><rect x="378" y="96" width="92" height="56" rx="4" fill="#2b3350"/><rect x="383" y="101" width="82" height="46" fill="url(#gl)"/><path d="M405 128a22 22 0 0 1 38 0M413 135a12 12 0 0 1 22 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M418 112l12 12m0-12l-12 12" stroke="#ff4a5a" stroke-width="5" stroke-linecap="round" transform="translate(6 -2)"/><path d="M490 150v-40l22 -16" stroke="#aaa" stroke-width="4" fill="none"/><path d="M498 86l34 4 -10 18z" fill="#ffd36b"/><circle cx="522" cy="130" r="42" fill="#ffd36b" opacity=".12"/>',
'causes-gap':'<rect width="720" height="210" fill="url(#sky)"/><circle cx="560" cy="54" r="26" fill="#fff3b0"/><ellipse cx="150" cy="150" rx="210" ry="60" fill="#79b05a"/><ellipse cx="560" cy="160" rx="230" ry="62" fill="#6aa14b"/><rect y="162" width="720" height="48" fill="#5f9440"/><path d="M330 210 L350 166 L400 166 L450 210z" fill="#c8a36a"/><rect x="290" y="104" width="160" height="64" fill="#e1bd86"/><path d="M278 106 L370 70 L462 106z" fill="#7d8a94"/><rect x="355" y="132" width="30" height="36" fill="#7a4d26"/><rect x="305" y="120" width="30" height="24" fill="#8ec3e6"/><rect x="405" y="120" width="30" height="24" fill="#8ec3e6"/><path d="M470 168V84" stroke="#555" stroke-width="3"/><path d="M470 84h28v16h-28z" fill="#d94f5c"/><path d="M236 168c-4-34 2-58 12-80" stroke="#7a5230" stroke-width="7" fill="none"/><path d="M248 88c-26-6-40 6-46 16m46-16c22-12 40-4 48 8m-48-8c-8-16-26-22-40-18m40 18c12-18 30-22 42-14" stroke="#3f8a3f" stroke-width="7" fill="none" stroke-linecap="round"/>'+P(330,196,.36,SK[1],'#e5533d',HR[2])+P(362,198,.32,SK[0],'#2f5bd1',HR[0])+P(396,196,.34,SK[2],'#f0b429',HR[1]),
'causes-engagement':WALL+'<circle cx="262" cy="56" r="26" fill="#fff" stroke="#8a6a3a" stroke-width="5"/><path d="M262 56v-16M262 56l12 8" stroke="#333" stroke-width="3" stroke-linecap="round"/>'+WIN(530)+'<rect x="90" y="24" width="120" height="84" rx="4" fill="#2f4a3f"/><path d="M104 56h60M104 76h80" stroke="#cfe2d6" stroke-width="3"/>'+DK(330,170)+'<rect x="345" y="140" width="40" height="10" rx="2" fill="#2f5bd1"/><rect x="415" y="147" width="30" height="3" fill="#f0b429"/>'+P(430,154,1,SK[2],'#6b7a99',HR[2],-9)+'<circle cx="410" cy="76" r="10" fill="'+SK[2]+'" /><g transform="translate(470 40)"><rect width="74" height="34" rx="14" fill="#fff" stroke="#c9d1df" stroke-width="2"/><circle cx="22" cy="17" r="4" fill="#8a94a8"/><circle cx="37" cy="17" r="4" fill="#8a94a8"/><circle cx="52" cy="17" r="4" fill="#8a94a8"/></g>',
'solutions-early':'<rect width="720" height="210" fill="url(#wl)"/><rect y="168" width="720" height="42" fill="#b98c5a"/><circle cx="230" cy="70" r="60" fill="#ffe7a8" opacity=".5"/>'+DK(230,280)+P(300,152,1.06,SK[1],'#2f5bd1',HR[0])+P(455,152,.78,SK[2],'#f0b429',HR[1])+BK(342,141)+'<g transform="translate(250 34)"><rect width="110" height="36" rx="16" fill="#fff" stroke="#c9d1df" stroke-width="2"/><text x="55" y="25" font-size="19" font-family="Georgia,serif" text-anchor="middle" fill="#333">A is for…</text></g><circle cx="505" cy="118" r="14" fill="none" stroke="#2f5bd1" stroke-width="4"/><path d="M515 128l14 14" stroke="#2f5bd1" stroke-width="5" stroke-linecap="round"/>',
'solutions-teachers':WALL+'<rect x="196" y="20" width="330" height="106" rx="5" fill="#8a97a8"/><rect x="202" y="26" width="318" height="94" fill="#fff"/><rect x="240" y="90" width="34" height="22" fill="#e5533d"/><rect x="288" y="74" width="34" height="38" fill="#f0b429"/><rect x="336" y="56" width="34" height="56" fill="#2f5bd1"/><rect x="384" y="38" width="34" height="74" fill="#3f9a5f"/><path d="M232 64 L420 32" stroke="#14213d" stroke-width="3" stroke-dasharray="6 5"/><path d="M420 32 l-12 0 l6 -10z" fill="#14213d" transform="rotate(20 420 32)"/><path d="M450 40h50M450 58h40M450 76h46" stroke="#9aa5b8" stroke-width="4" stroke-linecap="round"/>'+P(180,172,1.1,SK[0],'#7a4fd1',HR[1])+'<path d="M204 118 L232 90" stroke="'+SK[0]+'" stroke-width="10" stroke-linecap="round"/><circle cx="300" cy="200" r="16" fill="#3a4666"/><rect x="278" y="208" width="44" height="14" fill="#3a4666"/><circle cx="380" cy="198" r="16" fill="#4a3a30"/><rect x="358" y="206" width="44" height="14" fill="#4a3a30"/><circle cx="460" cy="200" r="16" fill="#2b2b3d"/><rect x="438" y="208" width="44" height="14" fill="#2b2b3d"/><circle cx="540" cy="198" r="16" fill="#5a4636"/><rect x="518" y="206" width="44" height="14" fill="#5a4636"/>',
'solutions-access':WALL+'<rect x="186" y="34" width="170" height="8" fill="#8f5d30"/><rect x="186" y="84" width="170" height="8" fill="#8f5d30"/><rect x="186" y="134" width="170" height="8" fill="#8f5d30"/><rect x="190" y="8" width="14" height="26" fill="#e5533d"/><rect x="206" y="12" width="12" height="22" fill="#2f5bd1"/><rect x="220" y="6" width="16" height="28" fill="#3f9a5f"/><rect x="238" y="14" width="12" height="20" fill="#f0b429"/><rect x="252" y="8" width="14" height="26" fill="#7a4fd1"/><rect x="200" y="56" width="16" height="28" fill="#2f5bd1"/><rect x="218" y="60" width="12" height="24" fill="#e5533d"/><rect x="232" y="54" width="18" height="30" fill="#f0b429"/><rect x="252" y="58" width="14" height="26" fill="#3f9a5f"/><rect x="296" y="62" width="14" height="22" fill="#7a4fd1"/><rect x="204" y="108" width="16" height="26" fill="#3f9a5f"/><rect x="222" y="104" width="14" height="30" fill="#e5533d"/><rect x="238" y="110" width="12" height="24" fill="#2f5bd1"/>'+DK(370,150)+'<rect x="380" y="138" width="90" height="12" rx="4" fill="#9aa3b8"/><circle cx="410" cy="132" r="14" fill="#fff" stroke="#ddd" stroke-width="2"/><circle cx="444" cy="130" r="13" fill="#d94f3d"/><path d="M444 118q3 -8 9 -8" stroke="#3f9a5f" stroke-width="3" fill="none"/><rect x="480" y="112" width="40" height="38" rx="3" fill="#8bb8e8" opacity=".5" stroke="#bcd" stroke-width="2"/><rect x="490" y="96" width="46" height="56" rx="6" fill="#2b3350"/><rect x="494" y="101" width="38" height="46" rx="3" fill="url(#gl)"/>',
'solutions-boys':WALL+'<rect x="215" y="26" width="120" height="70" rx="4" fill="#fff" stroke="#c9b48a" stroke-width="4"/><path d="M230 46h90M230 62h70M230 78h80" stroke="#9aa5b8" stroke-width="4" stroke-linecap="round"/><circle cx="470" cy="38" r="22" fill="#ffd54a" opacity=".25"/><circle cx="470" cy="38" r="14" fill="#ffd54a"/><path d="M470 14v-7M470 62v7M446 38h-7M494 38h7M453 21l-5 -5M487 21l5 -5" stroke="#ffd54a" stroke-width="4" stroke-linecap="round"/><rect x="464" y="52" width="12" height="7" fill="#8a94a8"/>'+SH(380,205,150)+DK(262,270)+SH(330,170,44)+SH(458,170,40)+P(330,152,1.1,SK[1],'#2f5bd1',HR[0])+G(330,152,1.1)+'<path d="M312 96q18 12 36 0v10q-18 8 -36 0z" fill="#2b1d14" opacity=".55"/>'+P(458,152,.95,SK[2],'#3f9a5f',HR[2])+'<path d="M450 90v18M466 90v18" stroke="#fff" stroke-width="2.5"/>'+BK(352,141)+AR(356,96,380,140,'#2f5bd1',SK[1])+AR(438,98,424,138,'#3f9a5f',SK[2])+'<path d="M426 138l22 -12" stroke="#f0b429" stroke-width="4" stroke-linecap="round"/><rect x="498" y="120" width="26" height="30" rx="8" fill="#e5533d"/><rect x="503" y="126" width="16" height="6" rx="3" fill="#b83a28"/><g transform="translate(526 40)"><circle r="20" fill="#3f9a5f"/><path d="M-9 1l7 7 13 -15" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>'
};
function art(k){return ART[k]?'<svg class="art" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration">'+DF+ART[k]+'</svg>':'';}
var D={
causes:[
{id:'foundations',e:'🏫',t:'Weak foundations',lead:'Reading is the door to every other subject. If it does not open early, everything behind it gets harder.',
 p:'A 15-year-old’s PISA result reflects ten years of learning. Students who are moved up a year without mastering basic reading and number skills carry that gap with them. Textbooks in later years assume those skills are already there, so the gap quietly grows.',
 b:['Gaps compound: weak reading makes maths word problems and science texts harder too.','Catch-up help is rare once a student is in secondary school.','Struggling students often hide it by staying quiet, so teachers may not notice.'],
 s:'Malaysia’s PISA reading score fell from 415 in 2018 to 388 in 2022.'},
{id:'closures',e:'💻',t:'School closures',lead:'When classrooms closed, learning moved online, but not every student could follow it.',
 p:'The pandemic closed schools around the world for long stretches. Students with a device, steady internet and a quiet place to study could keep up. Many others fell behind, and lessons are hard to recover once they are lost.',
 b:['Shared phones, weak signal and noisy homes made online lessons difficult.','Younger students and those who needed teacher support lost the most.','Malaysia was one of the countries with the largest score declines in PISA 2022, according to ISIS Malaysia.'],
 s:'ISIS Malaysia estimates about 1.6 years of learning lost in maths.'},
{id:'gap',e:'🌾',t:'The income and rural gap',lead:'Two students can sit in the same kind of classroom and still get very different chances.',
 p:'Students from poorer families, and those in remote areas, often have fewer books at home, less internet access and little chance of paid tutoring. Their schools can also struggle to attract and keep experienced teachers.',
 b:['Tutoring and extra classes cost money that some families do not have.','Long journeys to school and family work duties reduce study time.','Poverty is strongly linked to low scores in PISA results.'],
 s:'In 2022, about 8 in 10 Malaysian students from the poorest quarter were low performers in maths.'},
{id:'engagement',e:'🎧',t:'Disengagement',lead:'A student who feels lost stops trying, and a student who stops trying falls further behind.',
 p:'When lessons are too hard to follow, some students switch off, skip class or hide behind distractions. In Malaysia, boys make up a larger share of the lowest performers, which suggests that motivation and support matter as much as ability.',
 b:['Falling behind can feel embarrassing, so students stop asking for help.','Exam-focused teaching can leave little room for understanding.','Without a link between school and future jobs, learning can feel pointless.'],
 s:'In 2022, 63% of boys were low performers in maths and 66% in reading.'}],
solutions:[
{id:'early',e:'🔎',t:'Catch up early',lead:'The cheapest time to fix a reading problem is the moment it appears.',
 p:'Simple reading checks in primary school can show which children are falling behind. Small-group help, extra reading time and catch-up classes can close gaps before they become secondary school problems.',
 b:['Screen every child for reading and number skills in the early years.','Give short, regular small-group sessions instead of one long remedial class.','Track progress so help stops only when the gap has closed.'],
 s:'SDG 4 Target 4.1 asks for relevant learning outcomes, not only attendance.',w:'Ask your school whether it runs reading support, and volunteer as a reading buddy.'},
{id:'teachers',e:'🧑‍🏫',t:'Support teachers',lead:'Quality education needs quality teaching, and teachers need time and training to give it.',
 p:'Teachers do better work with clear lesson plans, coaching from experienced colleagues and manageable workloads. Less paperwork leaves more time to explain, check understanding and help struggling students.',
 b:['Train teachers in how to teach reading and maths, not only the subject content.','Reduce admin tasks that take time away from students.','Send strong teachers and extra resources to the schools that need them most.'],
 s:'SDG 4 includes a target on increasing the supply of qualified teachers.',w:'Thank a teacher, give honest feedback and take part in school improvement projects.'},
{id:'access',e:'🍎',t:'Close access gaps',lead:'A hungry student with no books or internet cannot compete on equal terms.',
 p:'School meals, loaned devices, library access and free tutoring help students from poorer families keep up. Reaching rural schools with books and a reliable connection narrows the gap with city students.',
 b:['Provide meals and learning materials so poverty does not decide results.','Lend devices and improve internet in rural schools.','Open community libraries and study spaces after school hours.'],
 s:'Students from the poorest quarter were far more likely to be low performers in 2022.',w:'Donate books, join a community library drive or run a peer-tutoring group.'},
{id:'boys',e:'🤝',t:'Reach struggling boys',lead:'The data shows boys are falling behind more, so they need targeted support.',
 p:'Mentoring, reading programmes with topics boys enjoy and activities that connect learning to real life can rebuild interest. Teachers and parents also need to spot early warning signs such as skipping class and silence in lessons.',
 b:['Use mentors and role models who show that learning matters.','Choose books, projects and examples that connect to students’ interests.','Treat disengagement as a signal to help, not only to punish.'],
 s:'In 2022, boys were a larger share of low performers in both maths and reading.',w:'Start a reading club or study group that welcomes students who feel left out.'}]};
function card(k,x){return '<button class="c" data-k="'+k+'-'+x.id+'"><div class="ic">'+x.e+'</div><h3>'+x.t+'</h3><p>'+x.lead+'</p><span class="go">Open →</span></button>';}
['causes','solutions'].forEach(function(k){document.getElementById(k).innerHTML=D[k].map(function(x){return card(k,x);}).join('');});
var screen=document.getElementById('screen'),body=document.getElementById('sBody'),lastBtn=null;
function find(key){var p=key.split('-'),list=D[p[0]];if(!list)return null;for(var i=0;i<list.length;i++){if(p[0]+'-'+list[i].id===key)return {k:p[0],i:i,x:list[i]};}return null;}
function open(key){
  var r=find(key);if(!r){close();return;}
  var fix=r.k==='solutions',x=r.x,n=D[r.k][(r.i+1)%D[r.k].length];
  body.innerHTML='<div class="banner '+(fix?'fix':'cause')+'">'+(art(key)||'<span>'+x.e+'</span>')+'<img class="photo" src="images/'+key+'.jpg" alt="" onerror="this.remove()"></div>'+
   '<p class="tag'+(fix?' fix':'')+'">'+(fix?'How to change it':'Why it happens')+'</p><h1 id="sTitle">'+x.t+'</h1><p class="lead">'+x.lead+'</p>'+
   '<h3>What is going on</h3><p>'+x.p+'</p><ul>'+x.b.map(function(t){return '<li>'+t+'</li>';}).join('')+'</ul>'+
   '<div class="statbox'+(fix?' fix':'')+'"><strong>Evidence:</strong> '+x.s+'</div>'+
   (fix?'<h3>What you can do</h3><p>'+x.w+'</p>':'')+
   '<div class="pager"><button class="back" id="nextBtn">Next: '+n.t+' →</button></div>';
  document.getElementById('nextBtn').onclick=function(){location.hash=r.k+'-'+n.id;};
  screen.hidden=false;screen.classList.remove('show');void screen.offsetWidth;screen.classList.add('show');
  screen.scrollTop=0;document.body.style.overflow='hidden';document.getElementById('back').focus();
}
function close(){screen.hidden=true;document.body.style.overflow='';if(lastBtn){lastBtn.focus();}}
document.addEventListener('click',function(e){var c=e.target.closest('.c');if(c){lastBtn=c;location.hash=c.dataset.k;}});
document.getElementById('back').onclick=function(){if(location.hash){history.length>1?history.back():(location.hash='');}else{close();}};
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!screen.hidden){location.hash='';}});
function route(){var h=location.hash.slice(1);if(h){open(h);}else{close();}}
window.addEventListener('hashchange',route);route();
})();
