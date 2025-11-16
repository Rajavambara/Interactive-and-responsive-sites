/* ---------- Carousel ---------- */
const track = document.getElementById('track');
const imgs = Array.from(track.querySelectorAll('img'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;
let autoplayId;

function updateCarousel(){
  const w = track.clientWidth;
  track.style.transform = `translateX(-${index * w}px)`;
}
window.addEventListener('resize', updateCarousel);

nextBtn.addEventListener('click', () => { index = (index+1) % imgs.length; updateCarousel(); resetAutoplay(); });
prevBtn.addEventListener('click', () => { index = (index-1 + imgs.length) % imgs.length; updateCarousel(); resetAutoplay(); });

function autoplay(){
  autoplayId = setInterval(() => { index = (index+1) % imgs.length; updateCarousel(); }, 3000);
}
function resetAutoplay(){ clearInterval(autoplayId); autoplay(); }
document.getElementById('carousel').addEventListener('mouseenter', () => clearInterval(autoplayId));
document.getElementById('carousel').addEventListener('mouseleave', () => autoplay());
autoplay();
updateCarousel();

/* ---------- Quiz ---------- */
const quizData = [
  { q:"Which tag creates a CSS rule?", a:["<script>","<style>","<link>"], correct:1 },
  { q:"What does 'responsive' primarily mean?", a:["Scales across devices","Faster JavaScript","More colors"], correct:0 },
  { q:"Which JS method fetches from an API?", a:["console.log","fetch","addEventListener"], correct:1 }
];

let qIndex = 0, scoreCount = 0;
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtnQ = document.getElementById('nextQ');
const scoreEl = document.getElementById('score');

function renderQuestion(){
  const item = quizData[qIndex];
  questionEl.innerHTML = `<strong>Q${qIndex+1}.</strong> ${item.q}`;
  answersEl.innerHTML = item.a.map((ans, i) =>
    `<button class="answer-btn" data-i="${i}">${ans}</button>`
  ).join('');
  scoreEl.textContent = `Score: ${scoreCount}/${quizData.length}`;
  Array.from(answersEl.children).forEach(btn => btn.addEventListener('click', onAnswer));
}
function onAnswer(e){
  const chosen = parseInt(e.currentTarget.dataset.i,10);
  e.currentTarget.style.borderColor = chosen === quizData[qIndex].correct ? 'green' : 'red';
  if(chosen === quizData[qIndex].correct) scoreCount++;
  Array.from(answersEl.children).forEach(b=>b.disabled=true);
  scoreEl.textContent = `Score: ${scoreCount}/${quizData.length}`;
}
nextBtnQ.addEventListener('click', () => {
  qIndex++;
  if(qIndex >= quizData.length){
    questionEl.innerHTML = `<strong>Done!</strong> You scored ${scoreCount} / ${quizData.length}`;
    answersEl.innerHTML = '';
    nextBtnQ.disabled = true;
    return;
  }
  renderQuestion();
});
renderQuestion();

/* ---------- Fetch API example ---------- */
const fetchBtn = document.getElementById('fetchJoke');
const jokeOut = document.getElementById('jokeOutput');
fetchBtn.addEventListener('click', async () => {
  jokeOut.textContent = 'Loading...';
  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    if(!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    jokeOut.textContent = `${data.setup} — ${data.punchline}`;
  } catch (err) {
    jokeOut.textContent = 'Could not fetch joke. Try again.';
    console.error(err);
  }
});
