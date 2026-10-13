/**
 * Coconut Breaker Oracle - Pure Vanilla JS
 * Probabilities:
 * - Clean Split (Blessed): 50%
 * - Rotten (Cursed): 35%
 * - Chocolate (Jackpot): 15%
 */

// --- Synthesized Web Audio Manager ---
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.08);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);

    // Crack high snap
    const snap = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snap.type = 'sawtooth';
    snap.frequency.setValueAtTime(800, t);
    snap.frequency.exponentialRampToValueAtTime(140, t + 0.04);
    snapGain.gain.setValueAtTime(0.18, t);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    snap.connect(snapGain);
    snapGain.connect(this.ctx.destination);
    snap.start(t);
    snap.stop(t + 0.04);
  }

  playBlessed() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Harmonic celestial chime
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    chords.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = t + i * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.6);
    });
  }

  playRotten() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Dissonant descending wobble
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.linearRampToValueAtTime(110, t + 0.4);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.45);

    // Stink squish noise
    const squish = this.ctx.createOscillator();
    const squishGain = this.ctx.createGain();
    squish.type = 'triangle';
    squish.frequency.setValueAtTime(140, t + 0.1);
    squish.frequency.exponentialRampToValueAtTime(60, t + 0.35);
    squishGain.gain.setValueAtTime(0.25, t + 0.1);
    squishGain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
    squish.connect(squishGain);
    squishGain.connect(this.ctx.destination);
    squish.start(t + 0.1);
    squish.stop(t + 0.35);
  }

  playJackpot() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Fanfare celebratory melody
    const melody = [
      { f: 440.0, d: 0.1 },  // A4
      { f: 554.37, d: 0.1 }, // C#5
      { f: 659.25, d: 0.1 }, // E5
      { f: 880.0, d: 0.35 }  // A5
    ];
    let offset = 0;
    melody.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = t + offset;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, startTime);

      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + note.d);

      offset += note.d * 0.85;
    });
  }
}

// --- Particle Visuals (Sparkles, Flies/Smoke, Confetti/Coins) ---
class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawnTapShards(x, y) {
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 6 + 3,
        color: Math.random() > 0.5 ? '#78350f' : '#fde68a',
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        gravity: 0.25,
        type: 'shard'
      });
    }
  }

  spawnBlessedVFX(cx, cy) {
    // Golden sparkles and glowing light motes
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 9 + 4,
        color: ['#fef08a', '#facc15', '#ffffff', '#eab308'][Math.floor(Math.random() * 4)],
        alpha: 1,
        rotation: 0,
        vRot: 0.1,
        gravity: 0.15,
        type: 'star'
      });
    }
  }

  spawnRottenVFX(cx, cy) {
    // Gray-green bursts and fly motes
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: Math.random() * 12 + 6,
        color: ['#4d7c0f', '#84cc16', '#64748b', '#334155'][Math.floor(Math.random() * 4)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.1,
        gravity: -0.05, // Float up like gas
        type: 'smoke'
      });
    }
  }

  spawnJackpotVFX(cx, cy) {
    // Confetti burst + raining gold coins
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 10 + 4;
      const isCoin = Math.random() > 0.5;
      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        size: isCoin ? Math.random() * 10 + 8 : Math.random() * 8 + 4,
        color: isCoin ? '#fbbf24' : ['#f97316', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'][Math.floor(Math.random() * 5)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.3,
        gravity: 0.22,
        type: isCoin ? 'coin' : 'confetti'
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.alpha -= (p.type === 'smoke' ? 0.012 : 0.016);

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      if (p.type === 'coin') {
        this.ctx.fillStyle = '#f59e0b';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = '#d97706';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      } else if (p.type === 'star') {
        this.ctx.fillStyle = p.color;
        this.drawStar(0, 0, 4, p.size, p.size / 2);
      } else if (p.type === 'smoke') {
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Shard or confetti rect
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }

  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

// --- Main Oracle App Controller ---
class CoconutOracle {
  constructor() {
    this.sound = new SoundManager();
    this.particles = new ParticleEngine(document.getElementById('particleCanvas'));

    // Taps required to crack (randomly between 1 and 4 for great tactile pacing)
    this.requiredTaps = 3;
    this.currentTaps = 0;
    this.isBreaking = false;
    this.totalSmashed = parseInt(localStorage.getItem('oracle_smashed_count') || '0', 10);

    // DOM Elements
    this.stageArena = document.getElementById('stageArena');
    this.stageResult = document.getElementById('stageResult');
    this.dilemmaInput = document.getElementById('dilemmaInput');
    this.coconutActor = document.getElementById('coconutActor');
    this.meterFill = document.getElementById('meterFill');
    this.meterLabel = document.getElementById('meterLabel');
    this.tapHint = document.getElementById('tapHint');
    this.damageFloats = document.getElementById('damageFloats');
    this.soundToggleBtn = document.getElementById('soundToggleBtn');
    this.totalSmashedCount = document.getElementById('totalSmashedCount');
    this.smashAnotherBtn = document.getElementById('smashAnotherBtn');

    // Crack layers
    this.crack1 = document.getElementById('crackLevel1');
    this.crack2 = document.getElementById('crackLevel2');
    this.crack3 = document.getElementById('crackLevel3');

    // Result DOM
    this.resultDilemmaQuote = document.getElementById('resultDilemmaQuote');
    this.outcomeBadge = document.getElementById('outcomeBadge');
    this.outcomeTypeIcon = document.getElementById('outcomeTypeIcon');
    this.outcomeTypeTitle = document.getElementById('outcomeTypeTitle');
    this.outcomeRarity = document.getElementById('outcomeRarity');
    this.outcomeShowcase = document.getElementById('outcomeShowcase');
    this.outcomeHeadline = document.getElementById('outcomeHeadline');
    this.outcomeProphecy = document.getElementById('outcomeProphecy');
    this.outcomeMessageCard = document.getElementById('outcomeMessageCard');

    this.init();
  }

  init() {
    this.totalSmashedCount.textContent = this.totalSmashed;
    this.resetNutForTap();
    this.bindEvents();
    this.setupAmbientLeaves();
  }

  resetNutForTap() {
    // Choose random hits to crack this instance (1 to 4 hits)
    this.requiredTaps = Math.floor(Math.random() * 4) + 1;
    this.currentTaps = 0;
    this.isBreaking = false;

    this.meterFill.style.width = '0%';
    this.meterLabel.textContent = `Tap to strike! (${this.requiredTaps} hits needed)`;
    document.getElementById('tapsLeft').textContent = `${this.requiredTaps}`;

    this.crack1.setAttribute('opacity', '0');
    this.crack2.setAttribute('opacity', '0');
    this.crack3.setAttribute('opacity', '0');

    this.coconutActor.classList.remove('hit');
  }

  bindEvents() {
    // Coconut Tap / Click
    this.coconutActor.addEventListener('pointerdown', (e) => {
      this.handleTap(e);
    });

    // Space key strike support
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && document.activeElement !== this.dilemmaInput) {
        e.preventDefault();
        if (this.stageArena.style.display !== 'none') {
          this.handleTap(null);
        }
      }
    });

    // Prompt chip quick picks
    document.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.dilemmaInput.value = btn.getAttribute('data-preset');
        this.dilemmaInput.focus();
      });
    });

    // Sound toggle
    this.soundToggleBtn.addEventListener('click', () => {
      this.sound.enabled = !this.sound.enabled;
      this.soundToggleBtn.textContent = this.sound.enabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    });

    // Smash another button reset
    this.smashAnotherBtn.addEventListener('click', () => {
      this.resetEverything();
    });
  }

  handleTap(e) {
    if (this.isBreaking) return;

    this.currentTaps++;
    this.sound.playTap();

    // Trigger visual shake
    this.coconutActor.classList.remove('hit');
    void this.coconutActor.offsetWidth;
    this.coconutActor.classList.add('hit');

    // Float hit feedback text
    const rect = this.coconutActor.getBoundingClientRect();
    const clickX = e ? e.clientX : (rect.left + rect.width / 2);
    const clickY = e ? e.clientY : (rect.top + rect.height / 2);

    this.spawnTapFeedback(clickX, clickY);
    this.particles.spawnTapShards(clickX, clickY);

    // Update progress meter & cracks
    const ratio = Math.min(1, this.currentTaps / this.requiredTaps);
    this.meterFill.style.width = `${ratio * 100}%`;
    const remaining = this.requiredTaps - this.currentTaps;

    if (remaining > 0) {
      this.meterLabel.textContent = `Cracking... (${remaining} hit${remaining === 1 ? '' : 's'} remaining)`;
    } else {
      this.meterLabel.textContent = `SHELL SPLITTING!`;
    }

    if (ratio >= 0.3) this.crack1.setAttribute('opacity', '1');
    if (ratio >= 0.65) this.crack2.setAttribute('opacity', '1');
    if (ratio >= 0.9) this.crack3.setAttribute('opacity', '1');

    // Finished hits -> Break!
    if (this.currentTaps >= this.requiredTaps) {
      this.breakCoconut(clickX, clickY);
    }
  }

  spawnTapFeedback(x, y) {
    const floatEl = document.createElement('div');
    floatEl.className = 'float-tap-msg';
    const hitWords = ['CRACK!', 'SMASH!', 'WHACK!', 'BAM!'];
    floatEl.textContent = hitWords[Math.floor(Math.random() * hitWords.length)];

    const containerRect = this.damageFloats.getBoundingClientRect();
    floatEl.style.left = `${x - containerRect.left + (Math.random() * 20 - 10)}px`;
    floatEl.style.top = `${y - containerRect.top + (Math.random() * 14 - 7)}px`;

    this.damageFloats.appendChild(floatEl);
    setTimeout(() => floatEl.remove(), 800);
  }

  // --- Random Outcome Resolution ---
  pickRandomOutcome() {
    // 50% Blessed, 35% Rotten, 15% Chocolate
    const roll = Math.random() * 100;
    if (roll < 50) {
      return 'blessed';
    } else if (roll < 85) {
      return 'rotten';
    } else {
      return 'chocolate';
    }
  }

  breakCoconut(cx, cy) {
    this.isBreaking = true;
    const outcome = this.pickRandomOutcome();

    // Persist stats
    this.totalSmashed++;
    this.totalSmashedCount.textContent = this.totalSmashed;
    localStorage.setItem('oracle_smashed_count', this.totalSmashed);

    // Audio and VFX per outcome
    if (outcome === 'blessed') {
      this.sound.playBlessed();
      this.particles.spawnBlessedVFX(cx, cy);
    } else if (outcome === 'rotten') {
      this.sound.playRotten();
      this.particles.spawnRottenVFX(cx, cy);
    } else {
      this.sound.playJackpot();
      this.particles.spawnJackpotVFX(cx, cy);
    }

    // Smooth transition to Result Screen
    setTimeout(() => {
      this.showResultScreen(outcome);
    }, 450);
  }

  showResultScreen(outcome) {
    // Fetch user dilemma or assign default
    const userQuery = this.dilemmaInput.value.trim() || "What does my future hold?";
    this.resultDilemmaQuote.textContent = userQuery;

    // Remove existing theme classes
    this.outcomeBadge.className = 'outcome-badge-pill';
    this.outcomeMessageCard.className = 'outcome-message-card';

    if (outcome === 'blessed') {
      // Clean Split (Blessed) - 50%
      this.outcomeBadge.classList.add('theme-blessed');
      this.outcomeMessageCard.classList.add('theme-blessed');
      this.outcomeTypeIcon.textContent = '✨';
      this.outcomeTypeTitle.textContent = 'Clean Split (Blessed)';
      this.outcomeRarity.textContent = '50% Blessed';

      this.outcomeHeadline.textContent = 'Blessed!';
      this.outcomeProphecy.textContent = 'The universe says GO FOR IT.';

      // SVG Two perfect halves with glowing white flesh & golden sparkles
      this.outcomeShowcase.innerHTML = `
        <div class="blessed-aurora"></div>
        <div class="blessed-halves">
          <svg class="coconut-half left-half" viewBox="0 0 110 160">
            <defs>
              <radialGradient id="meatGlowL" cx="40%" cy="50%" r="60%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="70%" stop-color="#f8fafc"/>
                <stop offset="100%" stop-color="#cbd5e1"/>
              </radialGradient>
            </defs>
            <path d="M100 10 C30 10, 10 60, 10 110 C10 150, 40 155, 100 155 Z" fill="#5c381e"/>
            <path d="M96 18 C38 18, 20 62, 20 108 C20 144, 46 148, 96 148 Z" fill="url(#meatGlowL)"/>
            <path d="M96 30 C55 30, 40 68, 40 108 C40 134, 58 138, 96 138 Z" fill="#e0f2fe" opacity="0.65"/>
          </svg>

          <svg class="coconut-half right-half" viewBox="0 0 110 160">
            <defs>
              <radialGradient id="meatGlowR" cx="60%" cy="50%" r="60%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="70%" stop-color="#f8fafc"/>
                <stop offset="100%" stop-color="#cbd5e1"/>
              </radialGradient>
            </defs>
            <path d="M10 10 C80 10, 100 60, 100 110 C100 150, 70 155, 10 155 Z" fill="#5c381e"/>
            <path d="M14 18 C72 18, 90 62, 90 108 C90 144, 64 148, 14 148 Z" fill="url(#meatGlowR)"/>
            <path d="M14 30 C55 30, 70 68, 70 108 C70 134, 52 138, 14 138 Z" fill="#e0f2fe" opacity="0.65"/>
          </svg>
        </div>
      `;
    } else if (outcome === 'rotten') {
      // Rotten (Cursed) - 35%
      this.outcomeBadge.classList.add('theme-rotten');
      this.outcomeMessageCard.classList.add('theme-rotten');
      this.outcomeTypeIcon.textContent = '🪰';
      this.outcomeTypeTitle.textContent = 'Rotten (Cursed)';
      this.outcomeRarity.textContent = '35% Cursed';

      this.outcomeHeadline.textContent = 'Cursed!';
      this.outcomeProphecy.textContent = 'Rotten omens. Rethink this.';

      // Gray-green burst, buzzing flies & stink cloud
      this.outcomeShowcase.innerHTML = `
        <div class="rotten-showcase">
          <div class="stink-cloud">💨 🤢 💨</div>
          <span class="fly fly1">🪰</span>
          <span class="fly fly2">🪰</span>
          <span class="fly fly3">🪰</span>
          <svg class="rotten-nut" viewBox="0 0 160 180">
            <defs>
              <radialGradient id="rottenGrad" cx="40%" cy="40%" r="65%">
                <stop offset="0%" stop-color="#65a30d"/>
                <stop offset="50%" stop-color="#365314"/>
                <stop offset="100%" stop-color="#142008"/>
              </radialGradient>
            </defs>
            <path d="M80 15 C130 15, 150 60, 150 115 C150 165, 120 172, 80 172 C40 172, 10 165, 10 115 C10 60, 30 15, 80 15 Z" fill="url(#rottenGrad)"/>
            <!-- Oozing fissure -->
            <path d="M75 50 Q95 90 70 130" stroke="#a3e635" stroke-width="6" fill="none" stroke-linecap="round"/>
            <circle cx="85" cy="85" r="7" fill="#4d7c0f"/>
            <circle cx="68" cy="115" r="9" fill="#1e293b"/>
          </svg>
        </div>
      `;
    } else {
      // Chocolate (Jackpot) - 15%
      this.outcomeBadge.classList.add('theme-chocolate');
      this.outcomeMessageCard.classList.add('theme-chocolate');
      this.outcomeTypeIcon.textContent = '🍫';
      this.outcomeTypeTitle.textContent = 'Chocolate (Jackpot)';
      this.outcomeRarity.textContent = '15% Jackpot';

      this.outcomeHeadline.textContent = 'JACKPOT!';
      this.outcomeProphecy.textContent = 'Chocolate inside. Extremely lucky.';

      // Splits to reveal melted chocolate & coins
      this.outcomeShowcase.innerHTML = `
        <div class="chocolate-showcase">
          <div class="choco-halves">
            <svg class="choco-half left" viewBox="0 0 110 160">
              <path d="M100 10 C30 10, 10 60, 10 110 C10 150, 40 155, 100 155 Z" fill="#381b0d"/>
              <!-- Melted rich chocolate layer -->
              <path d="M96 18 C38 18, 20 62, 20 108 C20 144, 46 148, 96 148 Z" fill="#713f12"/>
              <path d="M96 28 Q50 40 60 90 Q65 140 96 142 Z" fill="#451a03"/>
            </svg>
            <div class="choco-drip">🍫🪙</div>
            <svg class="choco-half right" viewBox="0 0 110 160">
              <path d="M10 10 C80 10, 100 60, 100 110 C100 150, 70 155, 10 155 Z" fill="#381b0d"/>
              <path d="M14 18 C72 18, 90 62, 90 108 C90 144, 64 148, 14 148 Z" fill="#713f12"/>
              <path d="M14 28 Q60 40 50 90 Q45 140 14 142 Z" fill="#451a03"/>
            </svg>
          </div>
        </div>
      `;
    }

    // Switch view
    this.stageArena.style.display = 'none';
    this.stageResult.style.display = 'flex';
  }

  resetEverything() {
    this.stageResult.style.display = 'none';
    this.stageArena.style.display = 'flex';
    this.dilemmaInput.value = '';
    this.resetNutForTap();
    this.dilemmaInput.focus();
  }

  setupAmbientLeaves() {
    const container = document.getElementById('leavesContainer');
    const leafIcons = ['🍃', '🌿', '🥥', '✨', '🌴'];
    for (let i = 0; i < 12; i++) {
      const leaf = document.createElement('span');
      leaf.className = 'leaf-particle';
      leaf.textContent = leafIcons[Math.floor(Math.random() * leafIcons.length)];
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.animationDuration = `${Math.random() * 8 + 8}s`;
      leaf.style.animationDelay = `${Math.random() * 6}s`;
      container.appendChild(leaf);
    }
  }
}

// Launch Oracle
window.addEventListener('DOMContentLoaded', () => {
  window.oracle = new CoconutOracle();
});
