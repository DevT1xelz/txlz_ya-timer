// Печатающийся текст — меняй фразы под себя
const lines = [
  "stream starting soon...",
  "stay for the stream",
  "stay for the vibe",
];
const el = document.getElementById("typed");
let li = 0, ci = 0, del = false;

function tick(){
  const full = lines[li];
  ci += del ? -1 : 1;
  el.textContent = full.slice(0, ci);
  let wait = del ? 25 : 55;
  if (!del && ci === full.length){ del = true; wait = 1800; }
  else if (del && ci === 0){ del = false; li = (li+1)%lines.length; wait = 400; }
  setTimeout(tick, wait);
}
tick();

// ---- Таймер на 2 минуты ----
const DURATION = 2 * 60 * 1000;
const timerEl = document.getElementById("timer");
let endAt = 0, timerId = null;

function startTimer(){
  clearInterval(timerId);
  timerEl.classList.remove("done");
  endAt = Date.now() + DURATION;
  render();
  timerId = setInterval(render, 250);
}
function render(){
  const left = Math.max(0, endAt - Date.now());
  const sec = Math.ceil(left / 1000);
  timerEl.textContent =
    String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(sec % 60).padStart(2, "0");
  if (left === 0){ clearInterval(timerId); timerEl.classList.add("done"); }
}

startTimer(); // сброс при каждой загрузке страницы

// OBS: сброс, когда сцена с источником становится активной
window.addEventListener("obsSourceActiveChanged", e => { if (e.detail && e.detail.active) startTimer(); });
window.addEventListener("obsSourceVisibleChanged", e => { if (e.detail && e.detail.visible) startTimer(); });
