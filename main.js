import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { PROJECTS } from './projects.js';

gsap.registerPlugin(ScrollTrigger, Flip);

const PROJECTS_BY_ID = Object.fromEntries(PROJECTS.map(p => [p.id, p]));

const WORKBENCH_DATA = {
  web: {
    title: 'ระบบ ERP ปฏิบัติการองค์กรและระบบรายงานภาคสนาม',
    text: 'พัฒนา TTS Company Ops Hub v2.0 PRO ที่รวม 16 โมดูลของบริษัทไว้ในที่เดียว (คลัง S/N, บอท LINE คู่, HR คำนวณ OT/สลิปเงินเดือน, ถอดแบบ BOQ) และระบบ Foresee Field Operations v2.0 สำหรับทีมช่างเทคนิค',
    pills: ['TTS Ops Hub (16 โมดูล)', 'Foresee Field Ops v2.0', 'Dual LINE OA Bots', 'Supabase RLS & Realtime']
  },
  auto: {
    title: 'ระบบมอนิเตอร์สถานะกล้องดับ & ค่าความหน่วงสัญญาณ (Ping & GIS)',
    text: 'ฟังก์ชันไฮไลต์เด่นใน TTS Ops Hub ที่ตรวจสอบสถานะออนไลน์และค่า Ping (ms) ของกล้องวงจรปิดและตู้ควบคุม NVR/Switch 505 จุด ครอบคลุม 14 สภ. อัตโนมัติทุก 2 นาที พร้อมแจ้งเตือนหน้าเว็บเมื่อกล้องดับและเชื่อมพิกัดแผนที่ดาวเทียม GIS',
    pills: ['505 Devices Monitored', '14 Police Stations (สภ.)', 'Real-time Ping (1-14ms)', 'Satellite GIS Map']
  },
  iot: {
    title: 'การพัฒนาเกม 2D ด้วย Python (Pygame) และระบบตรรกะโปรแกรม',
    text: 'สร้างเกมแอ็กชัน 2D ด้านข้าง Shadow Must Die ด้วยภาษา Python และ Pygame ครบทั้งระบบการเคลื่อนไหว กระโดด ยิงกระสุน ตรวจจับการชน (Hitbox) ระบบพลังชีวิต และระบบคะแนน',
    pills: ['Shadow Must Die (Pygame)', 'Python 2D Game Loop', 'Sprite & Hitbox System', 'Action Mechanics']
  },
  motion: {
    title: 'งาน 3D และ 2D Motion Graphics (Cinema 4D & After Effects)',
    text: 'สร้างสรรค์ผลงาน 3D และ 2D Motion Graphics ในช่อง YouTube: Zeroexter Desing (@zeroexterdesing44) ทั้งงานออกแบบ 3D Intro, Kinetic Typography และการจัดแสงเงาตามจังหวะเสียงดนตรี',
    pills: ['Zeroexter Desing (3D/2D)', 'Cinema 4D & After Effects', 'Audio-Reactive Motion', 'Intro & Kinetic Typography']
  }
};

// ==========================================================================
// 1. Render Visual Project Gallery Cards (All 6 Real Projects with Images)
// ==========================================================================
function renderProjectGallery() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  container.innerHTML = PROJECTS.map(p => `
    <article class="gallery-card" data-category="${p.category}" data-project-id="${p.id}" tabindex="0" role="button" aria-label="ดูรายละเอียด ${p.title}">
      <div class="gallery-thumb">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
      </div>
      <div class="gallery-body">
        <span class="gallery-cat">${p.categoryName}</span>
        <h3 class="gallery-title">${p.title}</h3>
        <p class="gallery-sub">${p.subtitle}</p>
        <p class="gallery-desc">${p.summary}</p>
        <div class="gallery-footer">
          <div class="tag-group">
            ${p.tags.slice(0, 2).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <span class="open-detail-label">ดูรูปและข้อมูล</span>
        </div>
      </div>
    </article>
  `).join('');
}

// ==========================================================================
// 2. GSAP Choreographed Animations
// ==========================================================================
function initGSAPAnimations() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // 2.1 Hero Entrance Timeline
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.75 }
    });

    heroTl
      .from('#heroHeadline', { y: 32, opacity: 0 })
      .from('#heroDesc', { y: 20, opacity: 0 }, '-=0.5')
      .from('#heroCta .btn', { y: 16, opacity: 0, stagger: 0.1 }, '-=0.45')
      .from('.fact-box', { y: 16, opacity: 0, stagger: 0.1 }, '-=0.45')
      .from('#heroWorkbench', { x: 28, opacity: 0, duration: 0.8 }, '-=0.6');

    // 2.2 Animated Number Counters in Hero (gracefully animates to target)
    document.querySelectorAll('.count-num').forEach(el => {
      const target = parseInt(el.dataset.target || el.textContent || '0', 10);
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        delay: 0.2,
        onUpdate: () => {
          el.textContent = Math.round(counter.val).toLocaleString();
        }
      });
    });

    // 2.3 Section Headers Scroll Reveal
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header.children, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // 2.4 Flagship Case Studies Scroll Reveal
    gsap.utils.toArray('.flagship-item').forEach((card) => {
      gsap.from(card, {
        y: 44,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      const img = card.querySelector('.media-frame img');
      if (img) {
        gsap.fromTo(img,
          { scale: 1.04, yPercent: -2 },
          {
            scale: 1,
            yPercent: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });

    // 2.5 Gallery Cards Staggered Batch Reveal
    ScrollTrigger.batch('.gallery-card', {
      start: 'top 88%',
      onEnter: batch => {
        gsap.fromTo(batch,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', overwrite: true }
        );
      },
      once: true
    });

    // 2.6 Capabilities & Story Reveal
    gsap.from('.cap-card', {
      y: 32,
      opacity: 0,
      duration: 0.65,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cap-grid',
        start: 'top 85%'
      }
    });

    gsap.from('.milestone-entry', {
      x: 24,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.milestone-box',
        start: 'top 85%'
      }
    });

    // 2.7 Interactive 3D Tilt on Cards
    const interactiveCards = document.querySelectorAll('.flagship-item, .gallery-card, .cap-card, #heroWorkbench');
    interactiveCards.forEach(card => {
      const xTo = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' });
      const yTo = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const normX = (relX / rect.width) - 0.5;
        const normY = (relY / rect.height) - 0.5;

        card.style.setProperty('--mouse-x', `${relX}px`);
        card.style.setProperty('--mouse-y', `${relY}px`);

        gsap.set(card, { transformPerspective: 1000 });
        xTo(normX * 4);
        yTo(-normY * 4);
      });

      card.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
      });
    });
  });
}

// ==========================================================================
// 3. Hero Workbench Switcher (Fixed Progress Bar Bug - Always Runs Smoothly)
// ==========================================================================
function initWorkbench() {
  const tabs = Array.from(document.querySelectorAll('.wb-tab'));
  const titleEl = document.getElementById('wbTitle');
  const textEl = document.getElementById('wbText');
  const pillsEl = document.getElementById('wbPills');
  const stage = document.getElementById('wbStage');
  const card = document.getElementById('heroWorkbench');

  if (!tabs.length || !titleEl) return;

  let currentIdx = 0;
  let autoTimer = null;
  let isUserInteracting = false;
  const AUTO_INTERVAL = 8000;

  function activateTab(index) {
    currentIdx = index;
    const tab = tabs[index];
    const key = tab.dataset.tab;
    const data = WORKBENCH_DATA[key];
    if (!data) return;

    tabs.forEach((t, i) => {
      const active = i === index;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    if (stage) {
      gsap.fromTo(stage, 
        { opacity: 0.7, y: 3 }, 
        { opacity: 1, y: 0, duration: 0.18, ease: 'power1.out', overwrite: 'auto' }
      );
    }
    titleEl.textContent = data.title;
    textEl.textContent = data.text;
    pillsEl.innerHTML = data.pills.map(p => '<span class="pill">' + p + '</span>').join('');
  }

  function startAutoCycle() {
    stopAutoCycle();
    autoTimer = setInterval(() => {
      if (!isUserInteracting) {
        activateTab((currentIdx + 1) % tabs.length);
      }
    }, AUTO_INTERVAL);
  }

  function stopAutoCycle() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      isUserInteracting = true;
      activateTab(idx);
      stopAutoCycle();
      setTimeout(() => {
        isUserInteracting = false;
        startAutoCycle();
      }, 15000);
    });
  });

  if (card) {
    card.addEventListener('mouseenter', () => {
      isUserInteracting = true;
    });
    card.addEventListener('mouseleave', () => {
      isUserInteracting = false;
    });
  }

  activateTab(0);
  startAutoCycle();
}

// ==========================================================================
// 4. Project Gallery Filtering with GSAP Flip Layout Animation
// ==========================================================================
function initGalleryFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = gsap.utils.toArray('.gallery-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const state = Flip.getState(cards);

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? 'flex' : 'none';
      });

      Flip.from(state, {
        duration: 0.5,
        scale: true,
        ease: 'power3.inOut',
        stagger: 0.03,
        onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35 }),
        onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.25 })
      });
    });
  });
}

// ==========================================================================
// 5. Project Detail Modal (<dialog>) with Ping Highlight & YouTube Player
// ==========================================================================
async function closeTopLayer(dialog) {
  if (!dialog.open || dialog.hasAttribute('data-closing')) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    dialog.setAttribute('data-closing', '');
    const animations = dialog.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map(a => a.finished)),
        new Promise(r => setTimeout(r, 2000))
      ]);
    }
    if (!dialog.hasAttribute('data-closing')) return;
    dialog.removeAttribute('data-closing');
  }
  dialog.close();
}

function initProjectDialog() {
  const dialog = document.getElementById('projectDialog');
  const closeBtn = document.getElementById('dialogCloseBtn');
  const catEl = document.getElementById('dialogCat');
  const imgEl = document.getElementById('dialogImage');
  const thumbsEl = document.getElementById('dialogThumbs');
  const pingEl = document.getElementById('dialogPingHighlight');
  const videosEl = document.getElementById('dialogVideos');
  const titleEl = document.getElementById('dialogTitle');
  const subtitleEl = document.getElementById('dialogSubtitle');
  const descEl = document.getElementById('dialogDesc');
  const highlightsEl = document.getElementById('dialogHighlights');
  const tagsEl = document.getElementById('dialogTags');

  if (!dialog) return;

  function openProject(projectId) {
    const data = PROJECTS_BY_ID[projectId];
    if (!data) return;

    catEl.textContent = data.categoryName;
    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    descEl.textContent = data.summary;
    imgEl.src = data.image;
    imgEl.alt = data.title;

    // Render gallery thumbnails
    const images = data.gallery && data.gallery.length > 1 ? data.gallery : [];
    thumbsEl.innerHTML = images.map((src, idx) => `
      <button type="button" class="dialog-thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${src}" title="รูปที่ ${idx + 1}">
        <img src="${src}" alt="${data.title} view ${idx + 1}" />
      </button>
    `).join('');

    thumbsEl.querySelectorAll('.dialog-thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        thumbsEl.querySelectorAll('.dialog-thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gsap.fromTo(imgEl, { opacity: 0.3 }, { opacity: 1, duration: 0.25 });
        imgEl.src = btn.dataset.src;
      });
    });

    // 1. RENDER CCTV PING TELEMETRY HIGHLIGHT (รูป 4 Fix)
    if (pingEl) {
      if (data.pingHighlight) {
        pingEl.hidden = false;
        const h = data.pingHighlight;
        pingEl.innerHTML = `
          <div class="ping-highlight-header">
            <span class="ping-highlight-title">
              <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#22c55e; box-shadow:0 0 8px #22c55e;"></span>
              ${h.title}
            </span>
            <span class="ping-highlight-badge">มอนิเตอร์สดทุก 2 นาที</span>
          </div>

          <div class="ping-stats-grid">
            ${h.stats.map(s => `
              <div class="ping-stat-card ${s.statusClass}">
                <div class="ping-stat-count">${s.count}</div>
                <div class="ping-stat-label">${s.label}</div>
              </div>
            `).join('')}
          </div>

          <div class="ping-highlight-details">
            <div><strong>ขอบเขตอุปกรณ์:</strong> ${h.deviceCount} ครอบคลุม ${h.coverage}</div>
            <div><strong>รอบตรวจเช็ค:</strong> ${h.interval}</div>
            <div><strong>เงื่อนไขการแจ้งเตือน:</strong> ${h.alertRule}</div>
          </div>

          <div>
            <button type="button" class="ping-view-btn" id="btnViewPingImg">
              🔍 ดูภาพหน้าจอระบบ Ping กล้องและค่า Latency แบบเต็มจอ
            </button>
          </div>
        `;

        // Add click listener to switch main image to pingImage
        const btnViewPing = pingEl.querySelector('#btnViewPingImg');
        if (btnViewPing && h.pingImage) {
          btnViewPing.addEventListener('click', () => {
            imgEl.src = h.pingImage;
            gsap.fromTo(imgEl, { opacity: 0.2, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.35 });
            thumbsEl.querySelectorAll('.dialog-thumb-btn').forEach(b => {
              b.classList.toggle('active', b.dataset.src === h.pingImage);
            });
            imgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          });
        }
      } else {
        pingEl.hidden = true;
        pingEl.innerHTML = '';
      }
    }

    // 2. RENDER YOUTUBE VIDEO CARDS & INLINE PLAYER (รูป 5 Fix)
    if (videosEl) {
      if (data.videos && data.videos.length > 0) {
        videosEl.hidden = false;
        videosEl.innerHTML = `
          <h4>
            <svg style="width:20px; height:20px; fill:#ff0000;" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            ตัวอย่างวิดีโอผลงาน (คลิกที่ปกเพื่อเล่นวิดีโอได้ทันที)
          </h4>
          <div class="video-grid">
            ${data.videos.map((v, i) => `
              <div class="video-card" data-video-index="${i}">
                <div class="video-player-wrap" data-embed-url="${v.embedUrl}" data-title="${v.title}">
                  <img src="${v.thumbnail}" alt="${v.title}" class="video-thumb-img" loading="lazy" />
                  <div class="video-play-overlay">
                    <div class="video-play-button">
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                <div class="video-card-footer">
                  <span class="video-card-title">${v.title}</span>
                  <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="video-ext-link">เปิดดูบน YouTube ↗</a>
                </div>
              </div>
            `).join('')}
          </div>
          ${data.channelUrl ? `
            <div style="margin-top: 14px;">
              <a href="${data.channelUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                ดูผลงานทั้งหมดในช่อง YouTube (@zeroexterdesing44) ↗
              </a>
            </div>
          ` : ''}
        `;

        // Click handler to mount YouTube iframe player inline!
        videosEl.querySelectorAll('.video-player-wrap').forEach(wrap => {
          wrap.addEventListener('click', () => {
            const embedUrl = wrap.dataset.embedUrl;
            const title = wrap.dataset.title;
            wrap.innerHTML = `
              <iframe
                src="${embedUrl}"
                title="${title}"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            `;
            wrap.style.cursor = 'default';
          });
        });
      } else {
        videosEl.hidden = true;
        videosEl.innerHTML = '';
      }
    }

    highlightsEl.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
    tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

    dialog.showModal();
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-id]');
    if (trigger) {
      openProject(trigger.dataset.projectId);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const trigger = e.target.closest('.gallery-card[data-project-id]');
      if (trigger) {
        e.preventDefault();
        openProject(trigger.dataset.projectId);
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeTopLayer(dialog));
  }

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeTopLayer(dialog);
  });

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (isDialogContent) return;
      closeTopLayer(dialog);
    });
  }
}

// ==========================================================================
// 6. Header Mobile Menu & Scroll Spy
// ==========================================================================
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('open');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 160;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { passive: true });
}


// 6. One-Click Copy to Clipboard Handler with fallback
async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Fallback to execCommand below
    }
  }
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    textArea.remove();
    return successful;
  } catch (err) {
    textArea.remove();
    return false;
  }
}

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const val = btn.dataset.copy;
      if (!val) return;
      const success = await copyToClipboard(val);
      if (success) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>คัดลอกแล้ว!</span>
        `;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove('copied');
        }, 2200);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjectGallery();
  initWorkbench();
  initGalleryFilter();
  initProjectDialog();
  initNavigation();
  initCopyButtons();
  initGSAPAnimations();
});
