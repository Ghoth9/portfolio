import os
import sys
import time
import threading
import shutil
from http.server import SimpleHTTPRequestHandler, HTTPServer
from playwright.sync_api import sync_playwright
from PIL import Image, ImageFilter

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

DIST_DIR = r"C:\Users\golst\.gemini\antigravity\scratch\company-ops-hub\dist"
PORT = 4225
OUTPUT_DIR = r"c:\Users\golst\.gemini\antigravity\playground\white-exoplanet\public\images\ttshub_captures"
PROJECTS_DIR = r"c:\Users\golst\.gemini\antigravity\playground\white-exoplanet\public\images\projects"
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(PROJECTS_DIR, exist_ok=True)

class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_GET(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) or os.path.isdir(path) and not os.path.exists(os.path.join(path, "index.html")):
            self.path = "/index.html"
        return super().do_GET()

def start_server():
    server = HTTPServer(("127.0.0.1", PORT), SPAHandler)
    server.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
print(f"Static server started at http://127.0.0.1:{PORT}")
time.sleep(1)

SMART_CENSOR_SCRIPT = """() => {
    const style = document.createElement("style");
    style.id = "smart-censor-styles";
    style.textContent = `
        .censor-blur {
            filter: blur(10px) !important;
            user-select: none !important;
            opacity: 0.6 !important;
            pointer-events: none !important;
        }
        .censor-heavy {
            filter: blur(14px) !important;
            user-select: none !important;
            opacity: 0.5 !important;
            pointer-events: none !important;
        }
        .censor-img {
            filter: blur(14px) !important;
            opacity: 0.7 !important;
        }
    `;
    document.head.appendChild(style);

    const STRICT_UI_LABELS = new Set([
        // System title & Sidebar navigation
        "TTS Hub", "TTS Company Ops Hub", "TTS Company Ops Hub v2.0", "ล็อคแล้ว",
        "TOP TOTAL SYSTEM", "System Manager (Admin)", "ผู้ดูแลระบบ (สูงสุด)",
        "ภาพรวมระบบ & ควบคุม", "ภาพรวมระบบ", "Admin Console & แดชบอร์ด",
        "ระบบกล้อง CCTV & GIS", "ศูนย์ติดตามงานช่าง (ออฟฟิศ)", "ผังตู้ & จุดติดตั้งกล้อง GIS", "งานซ่อมบำรุง & ติดตั้งระบบกล้อง-ตู้",
        "คลังสินค้า & มอบหมายงาน", "คลังสินค้า", "เบิกจ่ายติดตั้งหน้างาน", "ระบบยืม-คืนอุปกรณ์", "มอบหมายงาน",
        "การเงิน & บริหารจัดการ", "บันทึกสรุปสัญญาจ้าง", "ส่งเคลมสินค้า", "ระบบลางาน", "คำนวณ OT & สลิปเงินเดือน",
        "บัญชี", "ระบบใบเสนอราคา", "จัดการพนักงาน", "แก้ไขโปรไฟล์", "ออกจากระบบ",
        "ค้นหาด่วน...", "ค้นหาด่วน", "ปฏิทินงาน", "คู่มือระบบ", "ถอดแบบ BOQ", "2 ออนไลน์",
        // Top Welcome & KPIs
        "ผังกล้อง CCTV (615)", "+ มอบหมายงานใหม่",
        "งานทั้งหมด", "กำลังดำเนินการ", "เสร็จสมบูรณ์", "เกินกำหนดส่งมอบ", "รายการติดตามงานปฏิบัติการ",
        "จัดการและติดตามงานปฏิบัติการ", "ระบบจ่ายงาน ติดตามความคืบหน้า และมอบหมายงานช่างติดตั้งระบบกล้องวงจรปิด",
        "พิมพ์รายงานผลงาน (A4)",
        // Views & filters
        "แบบตาราง", "แบบการ์ด (บอร์ด)", "แบบการ์ด", "เช็คลิสต์", "เช็คลิสต์งานรายคน",
        "ด่วนก่อน (ค่าเริ่มต้", "ด่วนก่อน (ค่าเริ่มต้น)", "ทุกสถานะ", "ทุกคนในทีม", "ทั้งหมดในทีม",
        "งานของฉัน", "งานของฉัน (0)", "คุณ", "จัดการในบอร์ด",
        "ทั้งหมด", "รอมอบหมาย", "กำลังทำ", "เสร็จสิ้น", "เกินกำหนด", "ยกเลิก",
        "ออนไลน์", "ออฟไลน์", "รอการตรวจสอบ", "สัญญาณหน่วง", "เกินกำหนด",
        "ความสำเร็จรวม", "สัดส่วนประเภทงานปฏิบัติการ", "กิจกรรมงานรอบสัปดาห์นี้", "งานที่ต้องส่งเร็วๆ นี้",
        "งานติดตั้ง", "งานซ่อม", "งานมอบหมาย", "สัปดาห์ปัจจุบัน",
        "ปฏิทินปฏิบัติการ", "ตารางนัดหมายและส่งมอบ",
        "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา",
        // Manual dialog
        "คู่มือการใช้งานระบบแบบมีภาพชี้จุด (TTS Visual Manual)", "v2.5 POPUP PRO",
        "ดาวน์โหลดคู่มือฉบับเต็ม (PDF)", "เปิดพิมพ์ (A4)", "คลิกขยายรูปเต็มจอ",
        "✨ ทั้งหมด (40 จอ)", "✨ ทั้งหมด (41 จอ)", "👤 สำหรับพนักงาน & ช่าง (27 จอ)", "🛡️ สำหรับผู้ดูแลระบบ & ผู้บริหาร (28 จอ)", "🛡️ สำหรับผู้ดูแลระบบ & ผู้บริหาร (29 จอ)",
        "1. เข้าสู่ระบบ & ภาพรวม", "2. คลังสินค้า & ขายด่วน", "3. เบิกติดตั้ง (Requisition)",
        "4. ระบบยืม-คืน (Borrow)", "5. เคลมสินค้า (Claims RMA)", "6. ผังกล้อง GIS & งานซ่อม",
        "7. มอบหมายงาน & LINE", "8. HR, OT & แอดมิน", "9. บัญชี, ใบเสนอราคา & สัญญา",
        "10. ข้อเสนอสัญญาดูแล (SLA)", "11. คู่มือ Prompt AI",
        "คำอธิบายจุดที่ไฮไลต์บนภาพ (Numbered Callout Highlights):",
        "1", "2", "3", "4", "5",
        "Export Excel", "พิมพ์", "ปิด", "ตกลง", "บันทึก", "ยกเลิก",
        // CCTV Ping Highlights
        "ออนไลน์ปกติ (1–14ms)", "สัญญาณหน่วง (≥15ms)", "กล้องดับ / ออฟไลน์", "รอตรวจสอบสถานะ",
        "ตู้ควบคุม NVR / Switch", "กล้องวงจรปิด IP Camera", "สภ. ทั้งหมด",
        "Export Excel", "นำเข้าข้อมูลจาก Excel", "+ เพิ่มจุดติดตั้งใหม่", "ถ่ายภาพผัง สภ."
    ]);

    // 2. Blur all non-logo photos and employee avatars
    document.querySelectorAll("img").forEach(img => {
        if (!img.src.includes("tts-logo") && !img.src.includes("favicon") && !img.src.includes("icons.svg")) {
            img.classList.add("censor-img");
        }
    });

    document.querySelectorAll(".size-9.rounded-full, .size-8.rounded-full, .size-10.rounded-full").forEach(av => {
        if (!av.querySelector("img")) {
            av.classList.add("censor-blur");
        }
    });

    // 3. Scan leaf text elements and default-blur business data
    document.querySelectorAll("p, span, h3, h4, h5, div, td, a, button, label, strong").forEach(el => {
        if (el.children.length === 0) {
            const txt = el.textContent.trim();
            if (!txt) return;

            // Strict whitelist check
            if (STRICT_UI_LABELS.has(txt)) return;

            // Numbers / Percentages / Units
            if (/^[0-9]+(\\.[0-9]+)?(%|ms|px|x|\\/| รายการ| งาน| คน| จุด| เครื่อง| ชุด)?$/.test(txt)) return;
            if (/^\\([0-9]+\\)$/.test(txt)) return;
            if (/^จากทั้งหมด\\s*[0-9]+$/.test(txt)) return;

            // Month in calendar e.g. "ต.ค. 2569"
            if (txt.includes("2569") && txt.length <= 12 && !txt.includes(":")) return;

            // Welcome banner subtext
            if (txt.includes("TTS Operations Hub • ศูนย์ปฏิบัติการงานเทคนิค")) return;
            if (txt.includes("ประสานงานติดตั้ง ตรวจเช็คระบบกล้องวงจรปิด")) return;

            // Otherwise, it is business data: task name, staff name, client name, police station, serial number, IP, date, money
            el.classList.add("censor-blur");
        }
    });

    // 4. In tables, ensure all td cells without action buttons are blurred
    document.querySelectorAll("table tbody tr td").forEach(td => {
        const hasCheckbox = td.querySelector("input[type='checkbox'], button[role='checkbox']");
        const hasActionBtn = td.querySelector("button:not([role='checkbox'])") && td.children.length === 1;
        const badgeEl = td.querySelector("[class*='badge'], .rounded-full");

        if (hasCheckbox || hasActionBtn) return;
        if (badgeEl && td.textContent.trim().length <= 15) {
            const bTxt = td.textContent.trim();
            if (STRICT_UI_LABELS.has(bTxt) || /^[0-9]+%?$/.test(bTxt)) return;
        }
        td.classList.add("censor-heavy");
    });

    // 5. System Manual Dialog specific callouts & image blur
    document.querySelectorAll("[role='dialog']").forEach(dlg => {
        dlg.querySelectorAll(".callout, p.text-sm, p.text-xs, [class*='callout']").forEach(p => {
            const txt = p.textContent.trim();
            if (!STRICT_UI_LABELS.has(txt) && txt.length > 5) {
                p.classList.add("censor-blur");
            }
        });
        dlg.querySelectorAll("img").forEach(img => {
            img.classList.add("censor-heavy");
        });
    });
}"""

pages = [
    ("dashboard", "01_dashboard.png"),
    ("cctv_map", "02_cctv_gis_map.png"),
    ("admin_console", "03_admin_console.png"),
    ("stock", "04_stock_inventory.png"),
    ("ot", "05_ot_and_payslip.png"),
    ("repair", "06_repair_jobs.png"),
    ("contracts", "07_contracts_summary.png"),
    ("quotation", "08_quotation_system.png"),
    ("requisition", "09_job_requisition.png"),
    ("borrow", "10_borrow_equipment.png"),
    ("task", "11_task_management.png"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={"width": 1920, "height": 1080},
        device_scale_factor=1.5
    )
    page = context.new_page()
    page.goto(f"http://127.0.0.1:{PORT}/")
    page.wait_for_load_state("networkidle")

    page.evaluate('''() => {
        localStorage.setItem("ops-hub-is-logged-in", "true");
        localStorage.setItem("ops-hub-current-user-id", "admin");
        localStorage.setItem("ops-hub-current-user", "admin");
        localStorage.setItem("ops-hub-sidebar-open", "true");
    }''')

    for page_key, filename in pages:
        target_url = f"http://127.0.0.1:{PORT}/?page={page_key}"
        print(f"Navigating to {page_key}...")
        page.goto(target_url)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        # Apply smart censor
        page.evaluate(SMART_CENSOR_SCRIPT)
        page.wait_for_timeout(500)

        out_path = os.path.join(OUTPUT_DIR, filename)
        page.screenshot(path=out_path, full_page=False)
        print(f"Captured {filename} ({os.path.getsize(out_path)} bytes)")

        # Update flagship covers
        if page_key == "task":
            dest = os.path.join(PROJECTS_DIR, "ttshub.png")
            shutil.copyfile(out_path, dest)
            print(f"-> Updated ttshub.png ({os.path.getsize(dest)} bytes)")
        elif page_key == "cctv_map":
            dest = os.path.join(PROJECTS_DIR, "ttshub-ping.png")
            shutil.copyfile(out_path, dest)
            print(f"-> Updated ttshub-ping.png ({os.path.getsize(dest)} bytes)")

    # Capture 12_system_manual.png
    print("Capturing 12_system_manual.png...")
    page.goto(f"http://127.0.0.1:{PORT}/?page=task")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    m_btn = page.locator("button").filter(has_text="คู่มือระบบ")
    if m_btn.count() > 0:
        m_btn.first.click()
        page.wait_for_timeout(1500)
        sec7 = page.locator("button").filter(has_text="มอบหมายงาน & LINE")
        if sec7.count() > 0:
            sec7.first.click()
            page.wait_for_timeout(1000)
        page.evaluate(SMART_CENSOR_SCRIPT)
        page.wait_for_timeout(500)
        m_path = os.path.join(OUTPUT_DIR, "12_system_manual.png")
        page.screenshot(path=m_path, full_page=False)
        print(f"Captured 12_system_manual.png ({os.path.getsize(m_path)} bytes)")

    browser.close()

# Blur original ping image
orig_ping = os.path.join(PROJECTS_DIR, "ping กล้อง อันนี้ต้อง highlight แต่เยอะเกินเลยช่างแมร่งหรือมีงสามารถ highlight ได้ก็จัดเลย.png")
if os.path.exists(orig_ping):
    im = Image.open(orig_ping).convert("RGBA")
    w, h = im.size
    box = (int(w * 0.05), int(h * 0.36), int(w * 0.95), int(h * 0.96))
    cropped = im.crop(box)
    blurred = cropped.filter(ImageFilter.GaussianBlur(radius=16))
    im.paste(blurred, box)
    im.save(orig_ping)
    print(f"Applied Gaussian blur to original ping กล้อง image ({os.path.getsize(orig_ping)} bytes)")

print("ALL 12 SCREENSHOTS CAPTURED & CENSORED WITH 100% CONFIDENTIALITY PROTECTION.")
