export const PROJECTS = [
  {
    id: 'tts-ops-hub',
    featured: true,
    category: 'web',
    categoryName: 'Enterprise ERP & Operations Hub (16 Modules)',
    year: '2026',
    image: '/images/projects/ttshub.png',
    gallery: [
      '/images/projects/ttshub.png',
      '/images/ttshub_captures/11_task_management.png',
      '/images/ttshub_captures/12_system_manual.png',
      '/images/projects/ttshub-ping.png',
      '/images/ttshub_captures/01_dashboard.png',
      '/images/ttshub_captures/02_cctv_gis_map.png',
      '/images/ttshub_captures/03_admin_console.png',
      '/images/ttshub_captures/04_stock_inventory.png',
      '/images/ttshub_captures/05_ot_and_payslip.png',
      '/images/ttshub_captures/06_repair_jobs.png',
      '/images/ttshub_captures/07_contracts_summary.png',
      '/images/ttshub_captures/08_quotation_system.png',
      '/images/ttshub_captures/09_job_requisition.png',
      '/images/ttshub_captures/10_borrow_equipment.png'
    ],
    title: 'TTS Company Ops Hub v2.0 PRO',
    subtitle: 'ระบบบริหารจัดการงานปฏิบัติการองค์กรครบวงจร 16 โมดูล (บจก. ท้อป โทเทิล ซิสเทม)',
    summary: 'ระบบศูนย์กลางปฏิบัติการองค์กรขนาดใหญ่ ครอบคลุม 16 โมดูลหลัก ตั้งแต่งานช่าง กล้องวงจรปิด GIS คลังสินค้า S/N สัญญาจ้าง ไปจนถึงระบบบัญชี HR คำนวณ OT และส่งสลิปเงินเดือนผ่าน LINE บอทคู่',
    tags: ['16 Enterprise Modules', 'Supabase PostgreSQL (RLS)', 'Dual LINE Bots & LIFF', 'GIS & BOQ Engine'],
    pingHighlight: {
      title: '⭐ ฟังก์ชันไฮไลต์เด่น: ระบบมอนิเตอร์สถานะกล้องดับ & ค่าความหน่วงสัญญาณ (Ping & Latency)',
      deviceCount: '505 อุปกรณ์ (NVR, Switch และกล้อง IP)',
      coverage: '14 สภ. จังหวัดพระนครศรีอยุธยา',
      interval: 'เช็คอัตโนมัติทุก 2 นาที',
      alertRule: 'แจ้งเตือนบนหน้าเว็บและ LINE อัตโนมัติเมื่ออุปกรณ์ขาดการติดต่อครบ 3 รอบ (5 นาที)',
      stats: [
        { label: 'ออนไลน์ปกติ (1–14ms)', count: '239 จุด', statusClass: 'status-green' },
        { label: 'สัญญาณหน่วง (≥15ms)', count: '1 จุด', statusClass: 'status-yellow' },
        { label: 'กล้องดับ / ออฟไลน์', count: '35 จุด', statusClass: 'status-red' },
        { label: 'รอตรวจสอบสถานะ', count: '230 จุด', statusClass: 'status-gray' }
      ],
      pingImage: '/images/projects/ttshub-ping.png'
    },
    highlights: [
      'ครอบคลุม 16 โมดูลในระบบเดียว: Admin Console & แถบประกาศวิ่งสด (Live Notice Ticker), ค้นหาด่วน (Ctrl+K) และเครื่องมือถอดแบบคำนวณต้นทุน BOQ',
      'ระบบบอทแจ้งเตือน LINE แยก 2 บัญชี (TTS Notice 1 แจ้งซ่อม/ส่งสลิปส่วนตัว 1-on-1 และ TTS Notice 2 สำหรับกลุ่มงานช่าง) พร้อมปุ่มดึง LINE User ID ผูกบัญชีอัตโนมัติใน 30 วินาที',
      'บริหารคลังสินค้าคุมเลข Serial Number (S/N) รายชิ้น, เบิกจ่ายหน้างาน, สลับอุปกรณ์เสียหน้างาน (Swap S/N), ระบบยืม-คืนเครื่องมือ และติดตามงานส่งเคลมศูนย์ (RMA)',
      'ระบบ HR ซิงค์เวลาสแกนนิ้ว, ยื่นและอนุมัติใบลาออนไลน์, คำนวณ OT อัตโนมัติ (1.5x / 2x / 3x) ด้วยสายอนุมัติ 2 ขั้นตอน และออกสลิปเงินเดือนล็อคสิทธิ์ด้วย Supabase RLS',
      'ระบบการเงินและโครงการครบวงจร: บัญชีเงินสดย่อย (Petty Cash), ออกใบเสนอราคาพร้อมคำนวณกำไรขั้นต้น (Margin %), และบันทึกสัญญาจ้างพร้อมแจ้งเตือนรอบตรวจเช็ค PM'
    ]
  },
  {
    id: 'ttshub-cctv-ping',
    featured: true,
    category: 'automation',
    categoryName: 'Network Telemetry & GIS Monitoring (TTS Hub Highlight)',
    year: '2026',
    image: '/images/projects/ttshub-ping.png',
    gallery: [
      '/images/projects/ttshub-ping.png',
      '/images/ttshub_captures/02_cctv_gis_map.png',
      '/images/projects/ttshub.png',
      '/images/ttshub_captures/03_admin_console.png'
    ],
    title: 'ระบบมอนิเตอร์สถานะกล้องดับ & ค่าความหน่วงสัญญาณ (Ping & Latency)',
    subtitle: 'ฟังก์ชันไฮไลต์เด่นใน TTS Ops Hub — ตรวจเช็คกล้องและอุปกรณ์เครือข่าย 505 จุด ครอบคลุม 14 สภ.',
    summary: 'ระบบตรวจสอบสถานะออนไลน์และค่าความหน่วงสัญญาณ (Ping & Latency) ของกล้องวงจรปิดและตู้ควบคุม NVR/Switch ทั้งหมด 505 อุปกรณ์ อัตโนมัติทุก 2 นาที พร้อมแจ้งเตือนบนหน้าเว็บและเชื่อมโยงพิกัดแผนที่ดาวเทียม GIS',
    tags: ['505 Devices Monitored', 'Real-time Ping (1-14ms)', '14 Police Stations (สภ.)', 'CCTV GIS Map'],
    pingHighlight: {
      title: '⭐ ข้อมูลการทำงานจริงของระบบ Ping กล้องและเครือข่าย (จากหน้างานจริง 505 จุด)',
      deviceCount: '505 อุปกรณ์',
      coverage: '14 สภ. จังหวัดพระนครศรีอยุธยา',
      interval: 'เช็คอัตโนมัติทุก 2 นาที',
      alertRule: 'แจ้งเตือนบนหน้าเว็บและส่ง LINE อัตโนมัติเมื่ออุปกรณ์ขาดการติดต่อครบ 3 รอบ (5 นาที)',
      stats: [
        { label: 'ออนไลน์ปกติ (1–14ms)', count: '239 จุด', statusClass: 'status-green' },
        { label: 'สัญญาณหน่วง (≥15ms)', count: '1 จุด', statusClass: 'status-yellow' },
        { label: 'กล้องดับ / ออฟไลน์', count: '35 จุด', statusClass: 'status-red' },
        { label: 'รอตรวจสอบสถานะ', count: '230 จุด', statusClass: 'status-gray' }
      ],
      pingImage: '/images/projects/ttshub-ping.png'
    },
    highlights: [
      'ตรวจสอบสถานะอุปกรณ์ทั้งหมด 505 จุด (แยกเป็น NVR/Switch และกล้องวงจรปิด) ครอบคลุมโครงการใน 14 สภ. ทุกๆ 2 นาทีโดยอัตโนมัติ',
      'จำแนกสถานะละเอียดแบบเรียลไทม์: ออนไลน์ปกติ (1–14ms), สัญญาณหน่วง (≥15ms), ขาดการติดต่อ (ออฟไลน์) และรอการตรวจสอบ',
      'ระบบแจ้งเตือนความเสถียร: แจ้งเตือนหน้าเว็บและ LINE อัตโนมัติเมื่อกล้องหรือตู้ควบคุมขาดการติดต่อต่อเนื่องครบ 3 รอบตรวจ (5 นาที) เพื่อให้ช่างเข้าตรวจสอบได้ทันที',
      'เชื่อมโยงพิกัดแผนที่ดาวเทียม GIS: ปักหมุดตำแหน่งกล้องและตู้คอนโทรลตามพิกัดจริง พร้อมแสดงสถานะอุปกรณ์แบบสีบนแผนที่และคลิกดูข้อมูลอุปกรณ์ได้ทันที',
      'รองรับการค้นหาและกรองข้อมูลตาม สภ., ชื่อจุดติดตั้ง, หมายเลขตู้, เลข IP Address และเลข Serial Number (S/N) ของอุปกรณ์'
    ]
  },
  {
    id: 'foresee-field-ops',
    featured: true,
    category: 'web',
    categoryName: 'Field Operations & Real-Time Sync',
    year: '2026',
    image: '/images/projects/foresee.png',
    gallery: [
      '/images/projects/foresee.png'
    ],
    title: 'Foresee Field Operations & Task Management v2.0',
    subtitle: 'ระบบบริหารจัดการงานภาคสนามและรายงานผลปฏิบัติงานแบบ Real-Time (Foresee Technology)',
    summary: 'แพลตฟอร์มบริหารจัดการงานซ่อมบำรุงและรายงานผลช่างเทคนิคภาคสนาม ออกแบบให้ใช้งานผ่าน LINE LIFF v2 พร้อมส่งการ์ดรายงาน Flex Message เข้ากลุ่มอัตโนมัติ และซิงค์ข้อมูลเข้าแดชบอร์ดผู้บริหารด้วย Supabase Realtime แบบ 0-Latency',
    tags: ['LINE LIFF v2', 'Tailwind CSS', 'HTML5 Canvas Compression', 'Supabase Realtime'],
    highlights: [
      'พัฒนาสถาปัตยกรรม Modular ES6+ & Vite ร่วมกับ Tailwind CSS ออกแบบ UI ให้ช่างเทคนิคเปิดใช้งานผ่าน LINE LIFF ได้อย่างลื่นไหล',
      'ระบบรายงานผลงานอัตโนมัติผ่าน Dynamic LINE Flex Message สร้างการ์ดแสดงสถานะงาน ข้อมูลลูกค้า และรูปภาพส่งเข้ากลุ่มงานทันทีที่บันทึกสำเร็จ',
      'ระบบบีบอัดรูปถ่ายหน้างานด้วย HTML5 Canvas ฝั่ง Client ลดขนาดไฟล์ภาพลงกว่า 80% ก่อนอัปโหลด ช่วยประหยัดแบนด์วิธและส่งงานได้แม้สัญญาณมือถือต่ำ',
      'หน้าต่าง Interactive Lightbox รองรับการซูมดูรูปงานติดตั้งได้สูงสุด 2.2 เท่า พร้อมแอนิเมชันเปิดปิดที่นุ่มนวล',
      'เชื่อมต่อฐานข้อมูล Supabase PostgreSQL 15 อัปเดตสถานะงานบนแดชบอร์ดศูนย์บัญชาการแบบ Real-time 0-Latency ผ่าน WebSockets พร้อมสถาปัตยกรรม Dual-Write Sync กับ Google Apps Script'
    ]
  },
  {
    id: 'motion-zeroexter',
    featured: true,
    category: 'motion',
    categoryName: '3D / 2D Motion Graphics & YouTube Showcase',
    year: 'Archive',
    image: '/images/projects/zeroexter-desing.png',
    gallery: [
      '/images/projects/zeroexter-desing.png'
    ],
    channelUrl: 'https://www.youtube.com/@zeroexterdesing44',
    videos: [
      {
        id: 'swH3hVRdmJE',
        title: 'ตัวอย่างผลงาน Motion Graphics #1',
        url: 'https://www.youtube.com/watch?v=swH3hVRdmJE',
        embedUrl: 'https://www.youtube-nocookie.com/embed/swH3hVRdmJE?autoplay=1',
        thumbnail: 'https://img.youtube.com/vi/swH3hVRdmJE/hqdefault.jpg'
      },
      {
        id: 'AL5hE4slh-U',
        title: 'ตัวอย่างผลงาน Motion Graphics #2',
        url: 'https://youtu.be/AL5hE4slh-U?si=FhwrGLEe5OvWxHSY',
        embedUrl: 'https://www.youtube-nocookie.com/embed/AL5hE4slh-U?autoplay=1',
        thumbnail: 'https://img.youtube.com/vi/AL5hE4slh-U/hqdefault.jpg'
      }
    ],
    title: 'Zeroexter Desing — 3D / 2D Motion Graphics',
    subtitle: 'ผลงานสร้างสรรค์ 3D/2D Intro และ Kinetic Typography บนช่อง YouTube (@zeroexterdesing44)',
    summary: 'ผลงานการออกแบบโมชันกราฟิกทั้งรูปแบบ 3D และ 2D ด้วยโปรแกรม Cinema 4D และ Adobe After Effects เน้นการเคลื่อนไหวเข้าจังหวะบีตดนตรี การจัดแสงเงา และเอฟเฟกต์ตัวอักษร (มีตัวอย่างวิดีโอให้กดดูพร้อมเล่นเป็น Player ได้ทันที และยังมีผลงานอื่นๆ อีกมากในช่อง)',
    tags: ['Cinema 4D', 'After Effects', '3D/2D Intro', '@zeroexterdesing44'],
    highlights: [
      'สร้างสรรค์ผลงาน 3D และ 2D Motion Graphics ครบกระบวนการ ตั้งแต่ปั้นโมเดล จัดแสง ตั้งค่ามุมกล้องใน Cinema 4D ไปจนถึงการทำ Compositing & VFX ใน After Effects',
      'ออกแบบแอนิเมชันให้เคลื่อนไหวสอดประสานกับจังหวะเสียงดนตรี (Audio-Reactive & Beat Matching)',
      'ตัวอย่างวิดีโอที่นำมาแสดงเป็นเพียงส่วนหนึ่งของผลงานในช่อง YouTube @zeroexterdesing44'
    ]
  },
  {
    id: 'shadow-must-die',
    featured: false,
    category: 'iot',
    categoryName: 'Python Game Development (Pygame)',
    year: 'Archive',
    image: '/images/projects/shadow-must-die.png',
    gallery: [
      '/images/projects/shadow-must-die.png'
    ],
    title: 'Shadow Must Die — 2D Action Game (Pygame)',
    subtitle: 'เกมแอ็กชัน 2D พัฒนาด้วยภาษา Python และ Pygame พร้อมระบบควบคุม อนิเมชั่น และการคำนวณการชน',
    summary: 'โปรเจกต์พัฒนาเกมแอ็กชันมุมมองด้านข้าง 2D Side-scrolling ด้วยภาษา Python และไลบรารี Pygame มีระบบควบคุมการเคลื่อนไหว กระโดด ยิงกระสุน ตรวจจับ Hitbox ศัตรู และหลอดเลือด',
    tags: ['Python', 'Pygame', '2D Game Loop', 'Sprite & Hitbox'],
    highlights: [
      'เขียนระบบควบคุมตัวละครหลัก (LEFT/RIGHT เคลื่อนที่, UP กระโดด, SPACE ยิงกระสุนโจมตี) พร้อมระบบคำนวณการชน (Collision Detection)',
      'ออกแบบระบบระดับความยาก (Level & Speed scaling), การเก็บคะแนน (Score / Hiscore) และระบบพลังชีวิต (Lives)',
      'จัดการการเรนเดอร์ฉากหลังป่าหลายเลเยอร์ (Background Rendering) และอนิเมชั่นของตัวละครรวมถึงศัตรู (Goblin) ด้วย Pygame'
    ]
  },
  {
    id: 'osu-mania-profile',
    featured: false,
    category: 'motion',
    categoryName: 'Competitive Rhythm Gaming Profile',
    year: 'Profile',
    image: '/images/projects/osumania.png',
    gallery: [
      '/images/projects/osumania.png'
    ],
    title: 'osu!mania — Competitive Rhythm Gaming (GHOTH9)',
    subtitle: 'สถิติการเล่นเกมจับจังหวะความเร็วสูง osu!mania (อันดับ #124 ประเทศไทย / Peak Top 2,000 ของโลก)',
    summary: 'โปรไฟล์และสถิติการแข่งขันในเกม osu!mania (ชื่อผู้เล่น GHOTH9) ที่สะท้อนถึงการฝึกฝนปฏิกิริยาตอบสนอง สมาธิ และความแม่นยำระดับเสี้ยววินาที',
    tags: ['Rank #124 Thailand', '11,030 PP', '38,446 Plays', '96.32% Accuracy'],
    highlights: [
      'อันดับ #124 ของประเทศไทย (National Ranking #124) และอันดับโลก #4,759 (เคยขึ้นสูงสุดระดับ Peak Top 2,000 Global)',
      'สะสมคะแนน Performance Points รวม 11,030 pp พร้อมความแม่นยำเฉลี่ยสูงถึง 96.32%',
      'สถิติจำนวนรอบการเล่นสะสมมากกว่า 38,446 รอบ (Play Count 38,446) และ Max Combo สูงสุด 5,500x'
    ]
  }
];
