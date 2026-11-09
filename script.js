'use strict';
const app = document.querySelector('#app');
const STORAGE = 'human-manual-v2';
const axes = [['E','I','함께 충전','혼자 충전'],['S','N','구체적인 경험','새로운 가능성'],['T','F','논리와 기준','마음과 관계'],['J','P','미리 계획','유연한 흐름']];
const questions = [
  [
    "🔋",
    "귀가 후 잔여 배터리",
    "친구들과 신나게 놀고 집에 도착! 그런데 단톡방에 “2차는 영상통화?”가 떴어요.",
    0,
    "콜! 현관에서도 수다 엔진은 돌아가요.",
    "잠깐 들어가서 오늘의 명장면을 더 나눌래요.",
    "재밌었지만 통화는 내일! 혼자 여운을 즐겨요.",
    "오늘의 대화 영업 종료. 조용히 충전 모드로!"
  ],
  [
    "👋",
    "어색함 연결 테스트",
    "친구 따라 간 모임. 친구가 잠깐 나가자 모르는 사람들만 남았어요. 나는?",
    0,
    "“다들 어떻게 오셨어요?” 새 대화방을 열어요.",
    "옆 사람에게 가볍게 말을 걸어봐요.",
    "대화를 들으며 할 말이 떠오를 때 참여해요.",
    "천천히 분위기를 익혀요. 잠깐의 침묵도 괜찮아요."
  ],
  [
    "🛋️",
    "주말 충전기 선택",
    "이번 주말, 딱 하나의 무료 이용권을 쓸 수 있다면?",
    0,
    "사람들과 하루 종일 어울리는 동네 축제!",
    "친구와 카페에서 길게 이야기하는 오후!",
    "좋아하는 사람과 짧게 산책한 뒤 혼자 쉬기!",
    "방해 금지 방에서 나만의 취미 풀코스!"
  ],
  [
    "💭",
    "생각 정리 프로그램",
    "머릿속에 생각 탭이 27개 열렸어요. 가장 익숙한 정리 방법은?",
    0,
    "친구에게 전화해요. 말하다 보면 탭이 닫혀요.",
    "누군가와 이야기를 주고받으며 정리해요.",
    "혼자 메모한 다음 정리된 생각을 나눠요.",
    "산책하며 혼자 정리해요. 내 머릿속 회의부터!"
  ],
  [
    "🍳",
    "레시피 해석 모드",
    "처음 보는 요리의 레시피에 “재료는 적당히”라고 적혀 있어요. 나는?",
    1,
    "적당히가 몇 그램이죠? 계량된 레시피를 찾아요.",
    "완성 사진과 실제 조리 영상을 참고해요.",
    "이 조합이 맛있는 원리를 먼저 생각해봐요.",
    "재료 조합에서 영감이! 나만의 버전이 떠올라요."
  ],
  [
    "🏠",
    "공간 탐색 센서",
    "처음 간 카페에 구석방 하나가 있어요. 가장 먼저 눈에 들어오는 것은?",
    1,
    "의자 촉감, 조명 밝기, 커피 향이요.",
    "가구 배치와 소품의 작은 디테일이요.",
    "공간 전체가 전하는 분위기와 콘셉트요.",
    "이 방이 영화에 나온다면? 혼자 설정을 시작해요."
  ],
  [
    "🐙",
    "만약에 수신 장치",
    "친구가 뜬금없이 “문어가 카페를 열면 어떨까?”라고 해요. 첫 생각은?",
    1,
    "팔이 여덟 개니까 커피는 정말 빨리 만들겠네.",
    "수중 카페인가? 컵이랑 기계는 어떻게 쓰지?",
    "문어 사장님이라니, 가게 콘셉트가 떠올라요.",
    "고래 단골에 해파리 조명까지! 세계관이 열려요."
  ],
  [
    "🎬",
    "영화 감상 저장소",
    "영화의 마지막 장면에 빨간 우산 하나가 남았어요. 친구가 소감을 묻는다면?",
    1,
    "그 장면의 색감과 촬영이 정말 좋았다고 해요.",
    "앞 장면의 사건들과 연결해 줄거리를 정리해요.",
    "우산이 어떤 마음을 상징하는지 이야기해요.",
    "다른 결말의 가능성까지 상상해서 나눠요."
  ],
  [
    "🍞",
    "위로 기능 실행",
    "친구가 “속상해서 빵을 세 개나 샀어”라고 해요. 자연스럽게 먼저 나오는 말은?",
    2,
    "“무슨 일이었어? 같이 해결할 방법을 찾아보자.”",
    "“어떤 상황이었는지 말해줘. 같이 정리해보자.”",
    "“많이 속상했구나. 무슨 일 있었어?”",
    "“일단 마음부터 챙기자. 내가 들어줄게.”"
  ],
  [
    "⚖️",
    "의견 충돌 처리",
    "친구들과 여행 숙소를 고르는데 가성비파와 분위기파로 갈렸어요. 나는?",
    2,
    "가격과 위치에 같은 기준을 적용해 비교해요.",
    "각 숙소의 장단점을 정리해 합리적인 안을 찾아요.",
    "각자 그 숙소를 원하는 이유를 먼저 들어봐요.",
    "누구도 서운하지 않을 절충안을 함께 찾아요."
  ],
  [
    "🎁",
    "선물 선택 알고리즘",
    "친구 선물을 고르는 중! 장바구니에 마지막으로 남을 물건은?",
    2,
    "친구의 불편을 해결해줄 실용적인 아이템.",
    "사용 습관에 잘 맞고 품질도 좋은 아이템.",
    "친구가 좋아한다고 스치듯 말했던 물건.",
    "둘만의 추억을 담아 마음을 전할 수 있는 물건."
  ],
  [
    "🧁",
    "솔직함 출력 설정",
    "친구가 첫 베이킹 작품을 건네며 “다음에는 더 잘 만들고 싶어!”라고 해요.",
    2,
    "온도와 굽는 시간을 구체적으로 같이 점검해요.",
    "잘된 점과 바꿔볼 점을 차례대로 이야기해요.",
    "노력을 알아주고 제안해도 괜찮을지 물어봐요.",
    "만들면서 어땠는지 듣고 응원부터 전해요."
  ],
  [
    "🧳",
    "출발 전 작동 점검",
    "내일 여행을 떠나요. 오늘 밤 내 휴대폰 화면에는?",
    3,
    "시간별 일정표, 예약 내역, 준비물 체크리스트!",
    "꼭 갈 곳과 이동 시간을 정리한 메모.",
    "가고 싶은 곳 몇 개 저장. 순서는 내일의 나에게!",
    "지도 한 장. 도착해서 끌리는 곳으로 갈래요."
  ],
  [
    "📦",
    "마감 엔진 시동",
    "일주일 뒤 친구의 깜짝 파티! 장식 준비를 맡았어요. 어떻게 진행할까요?",
    3,
    "구매부터 설치까지 날짜를 나누고 바로 시작해요.",
    "필요한 걸 미리 준비하고 점검할 여유를 남겨요.",
    "큰 방향만 잡고 아이디어에 맞춰 유연하게 만들어요.",
    "재료를 펼쳐놓고 그때그때 떠오르는 대로 완성해요."
  ],
  [
    "🌦️",
    "예상 밖 업데이트",
    "기대하던 맛집 앞에 “오늘 쉽니다”라는 종이가 붙어 있어요. 다음 행동은?",
    3,
    "이럴 때를 위해 저장한 두 번째 후보로 가요.",
    "주변 식당을 비교하고 새 동선을 정해요.",
    "걷다가 괜찮아 보이는 곳에 들어가요.",
    "오늘은 우연 맛집 찾기! 발길 따라 탐험해요."
  ],
  [
    "🎟️",
    "자유 시간 운영 체제",
    "오후 일정이 갑자기 취소됐어요. 뜻밖의 자유 시간 4시간, 나는?",
    3,
    "하고 싶던 일을 골라 순서와 시간을 정해요.",
    "하나만 정하고 나머지 시간은 여유롭게 써요.",
    "그때그때 하고 싶은 일을 골라 움직여요.",
    "빈 시간이 선물! 아무것도 정하지 않고 즐겨요."
  ]
];
const types = {
 ISTJ:['📐','든든한 설계자','약속을 소중히 여기고 차근차근 일상을 완성해요.','신뢰성 기본 탑재','익숙하고 정돈된 공간에서 쉬기','변경 사항은 미리, 요청은 구체적으로 알려주세요.'],
 ISFJ:['🧸','다정한 수호자','작은 필요를 알아채고 조용히 마음을 보태요.','세심함 상시 작동','익숙한 사람과 편안한 시간을 보내기','당연하게 여기기보다 고마움을 말해주세요.'],
 INFJ:['🌙','고요한 길잡이','사람의 마음과 그 너머의 의미를 깊이 들여다봐요.','의미 탐색 모드','혼자 생각하거나 마음이 통하는 대화하기','속마음을 말할 때 판단 없이 들어주세요.'],
 INTJ:['🔭','차분한 전략가','멀리 내다보고 나만의 방법으로 길을 만들어요.','장기 계획 탑재','방해 없이 관심사를 탐구하기','혼자 생각할 시간과 명확한 목적을 주세요.'],
 ISTP:['🔧','담백한 해결사','직접 해보며 원리를 이해하고 문제를 풀어요.','실전 대응 모드','손으로 무언가 하거나 자유롭게 쉬기','방법을 강요하기보다 시도할 여지를 주세요.'],
 ISFP:['🎨','포근한 감각가','나만의 취향으로 일상의 작은 아름다움을 발견해요.','취향 감지 센서','좋아하는 음악과 풍경 즐기기','취향을 존중하고 선택할 시간을 주세요.'],
 INFP:['🌷','다정한 몽상가','소중한 가치와 상상력으로 나다운 세계를 가꿔요.','진심 감지 모드','마음에 드는 이야기와 창작에 잠기기','마음을 정리할 여유와 진솔한 대화를 주세요.'],
 INTP:['🧩','호기심 탐구자','당연한 것에도 질문하며 새로운 연결을 찾아요.','왜요? 무한 생성','궁금한 주제를 자유롭게 파고들기','결론을 재촉하기보다 생각을 함께 탐색해주세요.'],
 ESTP:['🛹','경쾌한 도전자','눈앞의 기회를 포착하고 행동으로 가능성을 열어요.','순간 대응 가속','움직이고 새로운 경험 즐기기','핵심부터 말하고 직접 해볼 기회를 주세요.'],
 ESFP:['🪩','햇살 분위기 메이커','지금 이 순간의 즐거움을 사람들과 나눠요.','즐거움 확산 기능','좋아하는 사람과 즐거운 활동하기','함께 즐기되 쉬고 싶은 순간도 존중해주세요.'],
 ENFP:['🎈','반짝이는 탐험가','사람과 가능성 사이에서 새로운 즐거움을 발견해요.','아이디어 자동 생성','새로운 사람과 영감을 주고받기','아이디어를 먼저 들어주고 다음 한 걸음을 같이 정해주세요.'],
 ENTP:['⚡','유쾌한 발명가','익숙한 생각을 뒤집고 색다른 가능성을 실험해요.','관점 전환 버튼','재미있는 토론과 새로운 시도하기','질문을 반대로 받아들이기보다 함께 탐구해주세요.'],
 ESTJ:['🧭','든든한 추진자','필요한 일을 정리하고 함께 목표를 향해 움직여요.','실행력 기본 탑재','할 일을 마치고 마음 편히 쉬기','역할과 일정을 분명히 나누면 편안해요.'],
 ESFJ:['🫖','따뜻한 연결자','서로의 안부를 챙기며 편안한 관계를 만들어요.','안부 알림 기능','익숙한 사람들과 정을 나누기','작은 배려에 대한 반응과 고마움을 표현해주세요.'],
 ENFJ:['🌻','다정한 응원단장','사람의 가능성을 발견하고 함께 성장하도록 도와요.','응원 출력 최대','마음이 통하는 만남과 나를 돌보는 시간','다른 사람을 챙기는 만큼 본인 마음도 물어봐주세요.'],
 ENTJ:['🚀','대담한 개척자','큰 그림을 그리고 필요한 변화를 이끌어가요.','목표 추진 엔진','새로운 목표를 구상하고 성취 즐기기','의견을 구체적으로 나누고 서로의 속도를 확인해주세요.']
};
let answers = [], index = 0, tieAnswers = {}, pendingTies = [], result = null;
let friend = null;
function readResult(value) {try {const r=JSON.parse(decodeURIComponent(value));return r&&Array.isArray(r.s)&&r.s.length===4&&r.s.every(n=>Number.isInteger(n)&&Math.abs(n)<=12)&&Array.isArray(r.t)&&r.t.length===4&&r.t.every(n=>n===-1||n===1)?r:null;}catch{return null;}}
function getStored(){try{const value=JSON.parse(localStorage.getItem(STORAGE));if(!value||typeof value!=='object'||Array.isArray(value))return {};const savedAnswers=Array.isArray(value.answers)?value.answers.slice(0,16).map(v=>Number.isInteger(v)&&v>=0&&v<4?v:null):[];const firstMissing=Array.from({length:16},(_,i)=>i).find(i=>savedAnswers[i]==null);const savedIndex=Number.isInteger(value.index)?Math.max(0,Math.min(value.index,15)):0;return {answers:savedAnswers,index:firstMissing===undefined?savedIndex:Math.min(savedIndex,firstMissing),result:readResult(encodeURIComponent(JSON.stringify(value.result)))};}catch{return {};}}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify({answers,index,tieAnswers,result}));}catch{}}
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('visible'),3000);}
function render(html){const isHome=html.includes('class="landing"');app.innerHTML=html;const homeButton=document.querySelector('#go-home');homeButton.hidden=isHome;document.querySelector('.brand').onclick=(event)=>{event.preventDefault();if(!isHome)save();startScreen();};homeButton.onclick=()=>{save();startScreen();};window.scrollTo(0,0);const heading=app.querySelector('h1,h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}
function typeOf(r){return axes.map((a,i)=>a[r.s[i]>0?0:r.s[i]<0?1:r.t[i]>0?0:1]).join('');}
function startScreen(){const stored=getStored();render(`<section class="landing"><div class="landing-intro"><span class="landing-label"><span></span> 나를 발견하는 16개의 순간</span><h1>당신에게도<br><em>설명서</em>가<br>필요하니까.</h1><p class="landing-description">어떤 순간에 반짝이고, 어떻게 충전하는지.<br>미처 몰랐던 나의 작동 방식을 만나보세요.</p><div class="landing-cta"><button class="primary" id="start">나의 설명서 펼쳐보기 <span>↗</span></button><p class="cta-caption">약 4–5분이면, 나를 조금 더 알게 돼요.</p></div>${Array.isArray(stored.answers)&&stored.answers.length?'<button class="link-button" id="resume">저장된 검사 이어하기</button>':''}${stored.result&&readResult(encodeURIComponent(JSON.stringify(stored.result)))?'<button class="link-button" id="saved">내 결과 다시 보기</button>':''}${friend?`<div class="compare"><b>${types[typeOf(friend)][0]} 친구의 설명서가 도착했어요</b><p>내 검사를 마치면 두 사람의 설명서를 비교해드려요.</p></div>`:''}</div><div class="manual-scene"><span class="scene-note">세상에 하나뿐인 나, 사용 전 읽어주세요.</span><div class="manual-back" aria-hidden="true"></div><article class="manual-cover" aria-label="결과 설명서 미리보기"><div class="cover-top"><span>PERSONAL EDITION</span><span>NO. 001</span></div><div class="cover-title">인간<br>사용 설명서<span>A LITTLE GUIDE TO YOU</span></div><div class="cover-portrait"><img class="manual-portrait" src="manual-portrait.svg" alt="부드러운 세이지색의 미소 짓는 충전 로봇" width="360" height="220"></div><div class="cover-spec"><span>품명</span><b>세상에 하나뿐인 당신</b><span>특징</span><b>알아갈수록 다정한 사람</b><span>주의</span><b>충분한 휴식과 애정 필요</b></div><div class="cover-bottom"><span>HANDLE WITH LOVE</span><span class="barcode" aria-hidden="true"></span></div></article><span class="scene-sticker">MADE OF<br><b>나다움</b><span>ORIGINAL YOU</span></span></div></section><section class="landing-bottom" aria-label="검사 안내"><div class="landing-facts"><div><span class="fact-number">16<span>+</span></span><span>일상 속 작은 질문</span></div><div><span class="fact-number">4–5 <small>min</small></span><span>나에게 집중하는 시간</span></div><div><span class="fact-number">Just you.</span><span>가입 없이 가볍게</span></div></div><div class="landing-features"><span>설명서에 담기는 것들</span><p>🔋 나만의 충전법 <i>·</i> 💬 편안한 소통법 <i>·</i> 🌱 나다운 강점</p></div></section><p class="landing-notice">기본 16문항 · 동점 시 추가 질문 최대 4개 · 답변은 현재 브라우저에만 저장돼요.</p>`);document.querySelector('#start').onclick=()=>{answers=[];index=0;tieAnswers={};result=null;save();questionScreen();};document.querySelector('#resume')?.addEventListener('click',()=>{answers=stored.answers.slice(0,16).map(v=>Number.isInteger(v)&&v>=0&&v<4?v:null);index=Math.min(Math.max(Number(stored.index)||0,0),15);tieAnswers={};questionScreen();});document.querySelector('#saved')?.addEventListener('click',()=>{result=stored.result;resultScreen();});}
function scores(){return axes.map((_,a)=>questions.reduce((sum,q,i)=>sum+(q[3]===a?[3,1,-1,-3][answers[i]]:0),0));}
function questionScreen(){const q=questions[index];const chapter=['에너지의 방향','세상을 읽는 방법','마음을 정하는 기준','일상의 리듬'][q[3]];render(`<section class="question-shell"><header class="journey-header"><span>MY PERSONAL MANUAL</span><span>나를 알아가는 중 <b>${Math.round(index/16*100)}%</b></span></header><div class="progress" role="progressbar" aria-label="검사 진행률" aria-valuemin="0" aria-valuemax="16" aria-valuenow="${index}"><div style="width:${index/16*100}%"></div></div><div class="question-layout"><aside class="chapter-note"><span class="chapter-index">0${q[3]+1} <i>/ 04</i></span><p>CHAPTER</p><h2>${chapter}</h2><span class="chapter-line"></span><p class="chapter-copy">작은 선택 하나에도<br>당신다운 모습이 담겨 있어요.</p><span class="chapter-doodle" aria-hidden="true">${q[0]}</span></aside><section class="paper question"><div class="question-top"><span>${q[1]}</span><b>QUESTION ${String(index+1).padStart(2,'0')} <span>/ 16</span></b></div><h1>${q[2]}</h1><p class="question-hint">정답은 없어요. 평소의 나와 가까운 답을 골라주세요.</p><div class="answers" role="group" aria-label="답변 선택">${q.slice(4).map((a,i)=>`<button class="answer ${answers[index]===i?'selected':''}" aria-pressed="${answers[index]===i}" data-answer="${i}"><span class="answer-number">0${i+1}</span><span class="answer-copy">${a}</span><span class="answer-check" aria-hidden="true"></span></button>`).join('')}</div><div class="navigation"><button class="secondary" id="prev" ${index===0?'disabled':''}>← 이전 질문</button><span class="auto-next-hint">선택하면 다음으로 넘어가요 →</span></div><p class="question-save">답변은 자동으로 저장돼요. 잠시 쉬어가도 괜찮아요.</p></section></div></section>`);app.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{answers[index]=Number(b.dataset.answer);tieAnswers={};if(index<15){index++;save();questionScreen();}else{save();pendingTies=scores().map((n,i)=>n===0?i:-1).filter(i=>i!==-1);tieScreen();}});document.querySelector('#prev').onclick=()=>{if(index>0){index--;save();questionScreen();}};}

const ties=[["재미있는 일이 생겼어요. 더 끌리는 축하 방식은?","친구를 만나 이야기하며 기쁨을 키워요.","혼자 좋아하는 것을 즐기며 기쁨을 음미해요."],["“하늘을 나는 우산” 설명서를 펼쳤어요. 먼저 읽고 싶은 쪽은?","작동 순서와 실제 사용 예시.","비행 원리와 새로운 활용 가능성."],["친구의 고민에 답장을 쓰는 중. 더 먼저 챙기는 것은?","상황을 풀어줄 타당한 근거와 해결 방향.","친구가 느낄 마음과 이해받는 느낌."],["내일 하루를 선물받았어요. 더 마음 편한 초대장은?","시간과 장소가 미리 정해진 초대장.","만나서 함께 정하자는 열린 초대장."]];
function tieScreen(){const a=pendingTies.find(a=>tieAnswers[a]==null);if(a===undefined){result={s:scores(),t:axes.map((_,i)=>tieAnswers[i]||1)};save();resultScreen();return;}const q=ties[a];const step=pendingTies.indexOf(a);render(`<section class="question-shell"><header class="journey-header"><span>ONE MORE LITTLE STEP</span><span>추가 질문 <b>${step+1} / ${pendingTies.length}</b></span></header><div class="progress" role="progressbar" aria-label="추가 질문 진행률" aria-valuemin="0" aria-valuemax="${pendingTies.length}" aria-valuenow="${step}"><div style="width:${step/pendingTies.length*100}%"></div></div><div class="question-layout"><aside class="chapter-note"><span class="chapter-index">＋ <i>DETAIL</i></span><p>A LITTLE CLOSER</p><h2>조금 더,<br>당신답게</h2><span class="chapter-line"></span><p class="chapter-copy">두 가지 모습이 모두 있는 당신.<br>지금의 마음을 조금 더 들려주세요.</p><span class="chapter-doodle" aria-hidden="true">🌿</span></aside><section class="paper question tie-question"><div class="question-top"><span>마지막 세부 조정 중</span><b>EXTRA 0${step+1}</b></div><h1>${q[0]}</h1><p class="question-hint">두 성향이 비슷하게 나왔어요.<br>지금 조금 더 마음이 가는 쪽을 골라주세요.</p><div class="answers" role="group" aria-label="추가 답변 선택">${q.slice(1).map((v,i)=>`<button class="answer ${tieAnswers[a]===(i===0?1:-1)?'selected':''}" aria-pressed="${tieAnswers[a]===(i===0?1:-1)}" data-tie="${i}"><span class="answer-number">0${i+1}</span><span class="answer-copy">${v}</span><span class="answer-check" aria-hidden="true"></span></button>`).join('')}</div><div class="navigation"><button class="secondary" id="tie-prev">← ${step===0?'이전 질문':'이전 추가 질문'}</button><span class="auto-next-hint">선택하면 다음으로 넘어가요 →</span></div><p class="question-save">어느 쪽을 골라도 당신의 소중한 모습이에요.</p></section></div></section>`);app.querySelectorAll('[data-tie]').forEach(b=>b.onclick=()=>{tieAnswers[a]=Number(b.dataset.tie)===0?1:-1;save();tieScreen();});document.querySelector('#tie-prev').onclick=()=>{if(step===0){index=15;questionScreen();}else{delete tieAnswers[pendingTies[step-1]];delete tieAnswers[a];save();tieScreen();}};}
function comparison(){const other=typeOf(friend),mine=typeOf(result);const same=axes.map((_,i)=>i).filter(i=>mine[i]===other[i]);const different=axes.map((_,i)=>i).filter(i=>mine[i]!==other[i]);const tips=['만남을 정할 때 함께할 시간과 혼자 쉴 시간을 모두 남겨두세요.','이야기할 때 구체적인 예시와 전체적인 의미를 함께 나눠보세요.','고민을 들을 때 “공감이 필요해, 해결책이 필요해?”라고 물어보세요.','꼭 정할 일정과 자유롭게 둘 시간을 구분해보세요.'];return `<section class="compare"><h3>${types[other][0]} ${types[other][1]} × ${types[mine][0]} ${types[mine][1]}</h3><p><b>닮은 점</b><br>${same.length?same.map(i=>axes[i][mine[i]===axes[i][0]?2:3]).join(' · ')+'에서 비슷한 편안함을 느낄 수 있어요.':'서로 다른 방식으로 일상을 풍성하게 만들 수 있어요.'}</p><p><b>함께 해볼 작은 배려</b><br>${different.length?different.map(i=>tips[i]).join('<br>'):'방식이 비슷해도 오늘의 컨디션은 다를 수 있어요. 원하는 휴식과 대화를 서로 물어봐주세요.'}</p><p class="muted">유형이 같아도 개인의 경험과 선호는 달라요.</p></section>`;}
function resultScreen(){const code=typeOf(result),r=types[code];render(`<article class="paper"><header class="result-heading"><div class="eyebrow">당신만을 위한 인간 사용 설명서</div><span class="result-emoji" aria-hidden="true">${r[0]}</span><div class="serial">MODEL · ${code}</div><h1>${r[1]}</h1><p class="muted">${r[2]}</p><div class="specs"><span>${code[0]==='I'?'혼자 충전':'함께 충전'}</span><span>${r[3]}</span><span>${code[3]==='J'?'계획 모드':'유연 모드'}</span></div></header><p class="section-label">QUICK GUIDE / 빠른 사용 안내</p><div class="info-grid"><section class="info"><h3>🔋 이렇게 충전해요</h3><p>${r[4]}</p></section><section class="info"><h3>💬 이렇게 말해주세요</h3><p>${r[5]}</p></section></div><details><summary>✨ 기본 탑재된 나의 강점</summary><p>${r[2]} ${r[3]} 덕분에 나만의 방식으로 주변에 기여해요.</p></details><details><summary>🫧 과부하 조건과 회복 안내</summary><p>${code[0]==='I'?'쉬는 시간 없이 만남이 이어질 때':'나눌 사람 없이 혼자 고민을 오래 안고 있을 때'} 지칠 수 있어요. 잠시 속도를 낮추고 ${r[4]}부터 시도해보세요.</p></details><details><summary>🌱 나를 위한 작은 실험</summary><p>${code[3]==='J'?'이번 주에는 계획하지 않은 작은 즐거움을 하나 남겨보세요.':'오늘 하고 싶은 일 하나를 정하고 시작할 시간을 적어보세요.'} 내게 잘 맞는지 가볍게 관찰하면 충분해요.</p></details><details><summary>📊 이번 답변에서 나타난 성향</summary>${axes.map((a,i)=>{const n=result.s[i],pct=Math.round((n+12)/24*100);return `<div class="axis"><div class="axis-label"><span>${a[0]} · ${a[2]}</span><span>${a[1]} · ${a[3]}</span></div><div class="axis-track"><div style="width:${pct}%"></div></div><small>${n===0?'두 성향이 균형을 이뤄요. 추가 질문으로 기본 유형을 정했어요.':Math.abs(n)<=4?'양쪽 성향을 함께 사용하며, '+a[n>0?2:3]+' 쪽에 약간 가까워요.':a[n>0?2:3]+' 쪽 응답이 더 많았어요.'}</small></div>`;}).join('')}<p>막대는 왼쪽 성향에 대한 응답의 상대적 기울기이며, 성격의 정확도나 확률이 아닙니다.</p></details>${friend?comparison():''}<div class="actions"><button class="primary" id="share">↗ 결과 공유하기</button><button class="secondary" id="download">↓ 카드 이미지 저장</button></div><button class="link-button" id="restart">다시 하기</button><p class="notice">사람은 16가지 틀보다 훨씬 다채로워요.<br>이 설명서는 나를 이해하는 가벼운 힌트로 사용해주세요.</p></article>`);document.querySelector('#restart').onclick=()=>{if(confirm('현재 결과를 지우고 새로 검사할까요?')){answers=[];index=0;tieAnswers={};result=null;save();startScreen();}};document.querySelector('#share').onclick=share;document.querySelector('#download').onclick=downloadCard;}
function shareURL(){return location.href.split('#')[0]+'#result='+encodeURIComponent(JSON.stringify(result));}
async function share(){const url=shareURL(),r=types[typeOf(result)];if(location.protocol==='file:'){toast('로컬 파일에서는 공유 링크 대신 결과 카드를 저장해 보내주세요.');return;}try{if(navigator.share){await navigator.share({title:'인간 사용 설명서',text:`나의 유형은 ${r[1]}! 당신의 설명서도 만나보세요.`,url});}else if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(url);toast('결과 링크를 복사했어요. 친구에게 보내보세요!');}else{window.prompt('아래 결과 링크를 복사해 친구에게 보내주세요.',url);}}catch(e){if(e.name!=='AbortError')window.prompt('아래 결과 링크를 복사해 친구에게 보내주세요.',url);}}
function downloadCard(){const r=types[typeOf(result)],canvas=document.createElement('canvas');canvas.width=900;canvas.height=1080;const c=canvas.getContext('2d');c.fillStyle='#f7f3e9';c.fillRect(0,0,900,1080);c.fillStyle='#fffdf7';c.fillRect(50,50,800,980);c.strokeStyle='#dedfd0';c.strokeRect(50,50,800,980);c.textAlign='center';c.fillStyle='#4c6652';c.font='22px sans-serif';c.fillText('HUMAN USER MANUAL',450,130);c.font='100px sans-serif';c.fillText(r[0],450,290);c.font='22px sans-serif';c.fillText('MODEL · '+typeOf(result),450,360);c.fillStyle='#373e36';c.font='bold 46px sans-serif';c.fillText(r[1],450,435);c.font='23px sans-serif';c.fillText(r[3]+' · '+(typeOf(result)[0]==='I'?'혼자 충전':'함께 충전'),450,490);function wrapped(text,y){c.font='25px sans-serif';const chars=[...text];let line='';for(const char of chars){if(c.measureText(line+char).width>660){c.fillText(line,450,y);y+=40;line='';}line+=char;}c.fillText(line,450,y);return y+40;}wrapped(r[2],565);c.fillStyle='#4c6652';c.font='bold 25px sans-serif';c.fillText('나의 충전 방법',450,710);wrapped(r[4],760);c.fillStyle='#74796b';c.font='20px sans-serif';c.fillText('사람마다 작동 방식은 다르니까요.',450,920);c.font='17px sans-serif';c.fillText('인간 사용 설명서 · 자기 이해를 위한 재미용 테스트',450,970);canvas.toBlob(blob=>{if(!blob){toast('이미지 생성에 실패했어요. 다시 시도해주세요.');return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`인간사용설명서-${typeOf(result)}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('설명서 카드를 저장했어요.');},'image/png');}
const hash=new URLSearchParams(location.hash.slice(1));friend=readResult(hash.get('result')||'');startScreen();
