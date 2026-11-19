/**
 * LINSA VINOD - PORTFOLIO INTERACTIVITY
 * Particle Canvas, Terminal Simulation, Project Filtering, Modals & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- 1. THEME TOGGLE (DARK / LIGHT) ---
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  
  const savedTheme = localStorage.getItem('lv-theme') || 'dark';
  htmlEl.classList.remove('dark', 'light');
  htmlEl.classList.add(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = htmlEl.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      htmlEl.classList.remove('dark', 'light');
      htmlEl.classList.add(newTheme);
      localStorage.setItem('lv-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // --- 2. MOBILE NAVIGATION MENU ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // --- 3. DYNAMIC INTERACTIVE NETWORK CANVAS ---
  const canvas = document.getElementById('network-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 45;
    const maxDistance = 140;

    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.75;
        this.vy = (Math.random() - 0.5) * 0.75;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateNetwork() {
      ctx.clearRect(0, 0, width, height);

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = 1 - dist / maxDistance;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect with mouse if nearby
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 160) {
            const mAlpha = 1 - mDist / 160;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${mAlpha * 0.5})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateNetwork);
    }

    animateNetwork();
  }

  // --- 4. TERMINAL LIVE REPLAY SIMULATION ---
  const replayBtn = document.getElementById('btn-replay-terminal');
  const terminalBody = document.getElementById('terminal-output');

  const simulationLines = [
    { text: '$ ./netguard --interface eth0 --detect-anomalies', class: 't-prompt-cmd' },
    { text: '[+] Initializing libpcap raw socket on eth0...', class: 't-dim' },
    { text: '[+] Packet filters active: ARP, IPv4, TCP, UDP, ICMP', class: 't-dim' },
    { text: '[+] Loading Scikit-learn Isolation Forest model (contamination=0.01)...', class: 't-dim' },
    { text: '[INFO] Extracting per-flow window metrics: SYN_ratio, byte_rate, entropy', class: 't-info' },
    { text: '[STREAM] 192.168.1.45:443 <-> 10.0.0.12:52134 [TCP-ESTABLISHED] Normal', class: 't-success' },
    { text: '[ALERT] Port scan pattern flagged from 172.16.4.88 (Target Ports: 1-1024)', class: 't-warn' },
    { text: '[CRITICAL] SYN Flood detected! Isolation Forest Anomaly Score: -0.841 [FLAGGED]', class: 't-danger' },
    { text: '[DB] Event logged to PostgreSQL & FastAPI REST stream triggered •••', class: 't-accent' },
    { text: '$ _', class: 't-cursor' }
  ];

  function runTerminalSimulation() {
    if (!terminalBody) return;
    terminalBody.innerHTML = '';

    simulationLines.forEach((line, index) => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = 't-line';

        if (line.class === 't-prompt-cmd') {
          div.innerHTML = `<span class="t-prompt">$</span> <span class="t-cmd">./netguard --interface eth0 --detect-anomalies</span>`;
        } else if (line.class === 't-cursor') {
          div.innerHTML = `<span class="t-prompt">$</span> <span class="t-cmd cursor-blink">_</span>`;
        } else {
          div.className = `t-line ${line.class}`;
          div.textContent = line.text;
        }

        terminalBody.appendChild(div);
      }, index * 260);
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', runTerminalSimulation);
  }

  // --- 5. PROJECT FILTERING ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. ONE-CLICK COPY BUTTONS & TOAST NOTIFICATION ---
  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied to clipboard: ${text}`);
        });
      } else {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast(`Copied: ${text}`);
      }
    });
  });

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check-circle" style="width:16px;height:16px;color:#06b6d4;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // --- 7. CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `✓ Thank you, ${name}! Generating email link to send to <strong>linsavinod.mec@gmail.com</strong>...`;
      
      const mailtoUrl = `mailto:linsavinod.mec@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
      
      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
        showToast("Opening email client with your message...");
      }, 1000);
    });
  }
});

// --- 8. PROJECT MODAL DEEP DIVE DATA ---
const projectData = {
  netguard: {
    title: "NetGuard — Network Packet Analyzer & Anomaly Detector",
    role: "Full Stack & Systems Developer (Team Size: 2, Ongoing)",
    tags: ["C", "Linux", "Libpcap", "Python", "Scikit-learn", "Pandas", "Bash", "Wireshark"],
    overview: "NetGuard is a high-throughput network intelligence system built directly in C leveraging libpcap. It intercepts network traffic at the data link layer, decodes OSI layer headers (Ethernet, ARP, IPv4, TCP, UDP), and continuously generates statistical summaries of active IP sessions.",
    highlights: [
      "Low-level C capture engine operating in promiscuous mode with zero-copy packet rings.",
      "Dissecting complex flag combinations (SYN, ACK, FIN, RST, URG) to measure anomalous flow ratios.",
      "Per-flow window feature engineering: bytes-per-second, packet rate, entropy, and inter-arrival duration.",
      "Machine learning integration: Scikit-learn Isolation Forest unsupervised model classifying stealthy SYN floods, slow-rate port scans, and DDoS traffic.",
      "Cross-validation with Wireshark PCAP trace exports for protocol veracity."
    ],
    repo: "https://github.com/Linsavinod/NetSheild"
  },
  dashboard: {
    title: "Network Anomaly Detection Dashboard",
    role: "Full-Stack Developer (Solo Project, 1 Week)",
    tags: ["Python", "Scikit-learn", "FastAPI", "React", "PostgreSQL", "REST APIs"],
    overview: "A reactive full-stack telemetry and anomaly detection platform that consumes network data feeds, runs real-time inferences through a Scikit-learn classifier, and streams alerts directly to a web dashboard.",
    highlights: [
      "High-performance asynchronous REST API built with FastAPI.",
      "Supervised Scikit-learn classification model rigorously measured with precision, recall, and ROC-AUC curves.",
      "Real-time React dashboard with dynamic graphs illustrating normal vs anomalous throughput.",
      "Persistent historical audit logs and incident metadata stored in PostgreSQL.",
      "Configurable alert thresholds and instant visual incident notifications."
    ],
    repo: "https://github.com/Linsavinod"
  },
  studyguide: {
    title: "Study Guide Builder",
    role: "Backend Developer (Team Size: 4, 2 Months)",
    tags: ["Generative AI", "JavaScript", "HTML5", "CSS3", "Prompt Engineering"],
    overview: "An AI-powered educational revision application designed to condense verbose academic chapters, research papers, and textbooks into structured, high-yield study guides.",
    highlights: [
      "Engineered backend document parsing pipelines to process and sanitize multi-format academic texts.",
      "Designed prompt architectures with Generative AI models to extract key definitions, formulas, and conceptual questions.",
      "Created an intuitive frontend with interactive accordion sections, flashcard summaries, and chapter quizzes.",
      "Collaborated with a 4-member team using Git version control and milestone-driven sprints."
    ],
    repo: "https://github.com/Linsavinod"
  }
};

window.openProjectModal = function(key) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');
  const project = projectData[key];
  if (!project || !modal || !content) return;

  content.innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:0.4rem;color:#06b6d4;">${project.title}</h3>
    <div style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#a855f7;margin-bottom:1rem;">${project.role}</div>
    <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.5rem;">
      ${project.tags.map(t => `<span class="tag" style="background:rgba(6,182,212,0.1);color:#06b6d4;border-color:rgba(6,182,212,0.25);">${t}</span>`).join('')}
    </div>
    <div style="margin-bottom:1.25rem;color:var(--text-secondary);line-height:1.6;">
      <h4 style="color:var(--text-primary);margin-bottom:0.5rem;font-size:1.1rem;">Architectural Overview</h4>
      <p>${project.overview}</p>
    </div>
    <div style="margin-bottom:1.5rem;">
      <h4 style="color:var(--text-primary);margin-bottom:0.5rem;font-size:1.1rem;">Technical Achievements</h4>
      <ul style="padding-left:1.2rem;color:var(--text-secondary);font-size:0.92rem;line-height:1.7;">
        ${project.highlights.map(h => `<li style="margin-bottom:0.4rem;">${h}</li>`).join('')}
      </ul>
    </div>
    <div style="display:flex;gap:1rem;margin-top:1.5rem;padding-top:1.2rem;border-top:1px solid var(--border-subtle);">
      <a href="${project.repo}" target="_blank" class="btn btn-primary btn-sm"><i data-lucide="github"></i> View Repository</a>
      <button class="btn btn-outline btn-sm" onclick="closeProjectModal()">Close</button>
    </div>
  `;

  modal.classList.add('open');
  if (window.lucide) window.lucide.createIcons();
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('open');
};

window.closeResumeModal = function() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.remove('open');
    window.location.hash = '';
  }
};

window.addEventListener('click', (e) => {
  const projModal = document.getElementById('project-modal');
  const resumeModal = document.getElementById('resume-modal');
  if (e.target === projModal) closeProjectModal();
  if (e.target === resumeModal) closeResumeModal();
});
