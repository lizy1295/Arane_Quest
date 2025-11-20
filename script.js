// ----- Character cards click handler -----
const characterCards = document.querySelectorAll('.char-card');

const charInfo = document.getElementById('char-info');
const charName = document.getElementById('char-name');
const charDesc = document.getElementById('char-desc');

characterCards.forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('h3').textContent;
    let description = '';

    switch (name) {
      case 'VI':
        description = 'A fierce, loyal fighter from Zaun who protects those she loves.';
        break;
      case 'JINX':
        description = 'A chaotic and creative troublemaker who loves mayhem.';
        break;
      case 'EKKO':
        description = 'A time-bending genius who fights for Zaun’s future.';
        break;
      case 'CAITLYN':
        description = 'The sharp-eyed sheriff of Piltover.';
        break;
      case 'JAYCE':
        description = 'A brilliant inventor who dreams of progress.';
        break;
      case 'VIKTOR':
        description = 'A visionary scientist with a hunger for evolution.';
        break;
      case 'MEL':
        description = 'A powerful political mind from Piltover’s elite.';
        break;
      case 'SILCO':
        description = 'A ruthless leader seeking Zaun’s independence.';
        break;
      case 'HEIMERDINGER':
        description = 'A wise Yordle scientist with centuries of experience.';
        break;
      case 'SEVIKA':
        description = 'A hardened enforcer loyal to Silco, with a mechanical arm.';
        break;
    }

    if (charName) charName.textContent = name;
    // set role if available
    const charRoleEl = document.getElementById('char-role');
    if (charRoleEl) charRoleEl.textContent = card.dataset.role || '';
    if (charDesc) charDesc.textContent = description;
    // show info panel using the .visible class and update aria
    if (charInfo) {
      charInfo.classList.add('visible');
      charInfo.setAttribute('aria-hidden', 'false');
    }
  });
});

// close button for the char info panel
const charClose = document.querySelector('#char-info .close-btn');
if (charClose) {
  charClose.addEventListener('click', () => {
    if (charInfo) {
      charInfo.classList.remove('visible');
      charInfo.setAttribute('aria-hidden', 'true');
    }
  });
}

// --- Quiz section ---

const questionBox = document.getElementById('question-box');
// NOTE: HTML uses id="option-box" (singular) — keep script in sync
const optionsBox = document.getElementById('option-box');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const scoreDisplay = document.getElementById('score');

// Quiz data
const quizData = [
  {
    question: "1. How do you deal with problems?",
    options: {
      Vi: "Face them head-on, no hesitation.",
      Jinx: "Blow them up, literally or figuratively.",
      Caitlyn: "Think it through and plan a strategy.",
      Viktor: "Invent something to fix it.",
      Jayce: "Use innovation and charisma to solve it.",
    }
  },
  {
    question: "2. What's your biggest weakness?",
    options: {
      Vi: "My temper sometimes gets the better of me.",
      Jinx: "I lose control when emotions take over.",
      Caitlyn: "Overthinking and perfectionism.",
      Viktor: "Neglecting my health for my work.",
      Jayce: "Being too ambitious too fast.",
    }
  },
  {
    question: "3. What motivates you most?",
    options: {
      Vi: "Protecting the people I care about.",
      Jinx: "Proving myself after being misunderstood.",
      Caitlyn: "Justice and fairness.",
      Viktor: "Creating something to improve humanity.",
      Jayce: "Leaving a legacy that lasts forever.",
    }
  },
  {
    question: "4. What’s your ideal weekend activity?",
    options: {
      Vi: "Training or helping others stay strong.",
      Jinx: "Causing harmless chaos and laughing about it.",
      Caitlyn: "Relaxing with tea and a good mystery novel.",
      Viktor: "Working on my latest invention.",
      Jayce: "Networking or working on a new project.",
    }
  },
  {
    question: "5. How do your friends describe you?",
    options: {
      Vi: "Loyal and fierce.",
      Jinx: "Wild but lovable.",
      Caitlyn: "Smart and dependable.",
      Viktor: "Quiet genius.",
      Jayce: "Charming leader.",
    }
  },
  {
    question: "6. What environment do you feel most comfortable in?",
    options: {
      Vi: "The streets — that’s where I belong.",
      Jinx: "Anywhere loud, colorful, and unpredictable.",
      Caitlyn: "A calm, well-organized space.",
      Viktor: "A quiet lab full of tools.",
      Jayce: "A clean, high-tech workspace.",
    }
  },
  {
    question: "7. How do you express emotions?",
    options: {
      Vi: "Through action, not words.",
      Jinx: "Through chaos and creativity.",
      Caitlyn: "Through calm reasoning.",
      Viktor: "Through my work and inventions.",
      Jayce: "Through passionate speeches.",
    }
  },
  {
    question: "8. What kind of friend are you?",
    options: {
      Vi: "The protector.",
      Jinx: "The unpredictable one.",
      Caitlyn: "The logical peacekeeper.",
      Viktor: "The wise listener.",
      Jayce: "The motivator.",
    }
  },
  {
    question: "9. Pick a color that speaks to you:",
    options: {
      Vi: "Red — power and passion.",
      Jinx: "Blue — chaos and fun.",
      Caitlyn: "Purple — elegance and clarity.",
      Viktor: "Silver — intellect and innovation.",
      Jayce: "Gold — ambition and light.",
    }
  },
  {
    question: "10. What’s your greatest strength?",
    options: {
      Vi: "Courage and heart.",
      Jinx: "Creativity and unpredictability.",
      Caitlyn: "Logic and discipline.",
      Viktor: "Vision and intelligence.",
      Jayce: "Charisma and innovation.",
    }
  }
];
// 2. State
let currentQuestion = 0;
let scores = { Vi: 0, Jinx: 0, Caitlyn: 0, Viktor: 0, Jayce: 0 };
let selected = null;

// 3. Load a question into the DOM
function loadQuestion() {
  const q = quizData[currentQuestion];
  if (!questionBox || !optionsBox) return;
  questionBox.textContent = q.question;
  optionsBox.innerHTML = '';

  for (let character in q.options) {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = q.options[character];
    btn.addEventListener('click', () => {
      selected = character;
      document.querySelectorAll('.option-btn').forEach(b => b.style.background = '');
      btn.style.background = '#0f3608ff';
      btn.style.fontSize = '2.1rem';
    });
    optionsBox.appendChild(btn);
  }
}

// 4. Next button handler
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (!selected) return; // require an answer
    scores[selected] = (scores[selected] || 0) + 1;
    selected = null;
    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
}

// 5. Show final result
function showResult() {
  if (questionBox) questionBox.style.display = 'none';
  if (optionsBox) optionsBox.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';
  if (resultBox) resultBox.classList.remove('hidden');

  // Determine highest score
  const winner = Object.keys(scores).reduce((a, b) => (scores[a] >= scores[b] ? a : b));
  if (scoreDisplay) scoreDisplay.textContent = `You are closest to: ${winner}`;
}

// Start quiz
if (quizData.length > 0) loadQuestion();

// Restart quiz: reset state and show first question
function restartQuiz() {
  currentQuestion = 0;
  scores = { Vi: 0, Jinx: 0, Caitlyn: 0, Viktor: 0, Jayce: 0 };
  selected = null;
  if (questionBox) questionBox.style.display = '';
  if (optionsBox) optionsBox.style.display = '';
  if (nextBtn) nextBtn.style.display = '';
  if (resultBox) resultBox.classList.add('hidden');
  if (scoreDisplay) scoreDisplay.textContent = '';
  loadQuestion();
}

const retryBtn = document.getElementById('retry-btn');
if (retryBtn) retryBtn.addEventListener('click', restartQuiz);
