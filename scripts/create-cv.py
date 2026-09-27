"""Generate the public English CV from verified portfolio and original CV content."""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/cv/Alvin-Malik-Ibrahim-Fullstack-Developer-CV.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
ink = colors.HexColor("#1C1B18")
muted = colors.HexColor("#56534D")
accent = colors.HexColor("#93451B")
styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=23, leading=28, textColor=ink, spaceAfter=5),
    "role": ParagraphStyle("role", fontName="Helvetica", fontSize=12, leading=16, textColor=accent, spaceAfter=8),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9, leading=12.6, textColor=ink, spaceAfter=5),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8.5, leading=12, textColor=muted, spaceAfter=8),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=accent, spaceBefore=12, spaceAfter=6, keepWithNext=True),
    "job": ParagraphStyle("job", fontName="Helvetica-Bold", fontSize=9.5, leading=13, textColor=ink, spaceAfter=3, keepWithNext=True),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9, leading=12.3, textColor=ink, leftIndent=9, firstLineIndent=-7, spaceAfter=3),
}
story = []
def p(text, style="body"):
    story.append(Paragraph(text, styles[style]))
def bullet(text):
    p("- " + text, "bullet")

p("Alvin Malik Ibrahim", "name")
p("Full-stack Developer | Web &amp; Mobile Applications", "role")
p('Indonesia (GMT+7) | <link href="mailto:alvinmalikibrahim20@gmail.com">alvinmalikibrahim20@gmail.com</link><br/>'
  '<link href="https://alvinmalik.my.id">alvinmalik.my.id</link> | '
  '<link href="https://linkedin.com/in/alvin-malik-ibrahim">linkedin.com/in/alvin-malik-ibrahim</link>', "contact")
story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#D8D4CB")))
p("PROFILE", "section")
p("Developer with web development experience since 2019, including auction frontends, finance administration tools, and ERP integration. Works across web and mobile applications, API integration, bug fixing, and ongoing maintenance.")
p("CORE SKILLS", "section")
p("<b>Backend &amp; data:</b> Laravel, PHP, REST APIs, API integration, MySQL, SQL Server, PostgreSQL<br/>"
  "<b>Web &amp; mobile:</b> Vue.js, Nuxt, JavaScript, Flutter, Dart, WordPress<br/>"
  "<b>Supporting tools:</b> Git, Odoo, Go, Katalon, technical SEO, Google Analytics")
p("PROFESSIONAL EXPERIENCE", "section")
p("PT Tunas Rent | Programmer Staff | April 2024 - Present", "job")
bullet("Maintain and enhance the Nuxt auction website and contribute to its transition to a shared Flutter frontend for web, Android, and iOS.")
bullet("Build and maintain Vue admin modules supporting auction operations and finance workflows.")
bullet("Refactor integration with the company ERP, connecting auction and financial records.")
bullet("Work on buyer accounts, live bidding interfaces, vehicle grading, partner reporting, and migration of parts of the admin system to Odoo.")
story.append(Spacer(1, 5))
p("PT Pacific Cipta Nusantara | Engineer &amp; Logistic | March - May 2023", "job")
p("Earlier engineering and logistics role.", "body")
story.append(Spacer(1, 3))
p("PT Racer Robot Indonesia | Web Developer &amp; Digital Marketing | August 2019 - March 2023", "job")
bullet("Designed, developed, and maintained company, robotics community, competition, and e-learning websites.")
bullet("Created landing pages for Facebook campaigns and supported websites through technical SEO and Google Analytics.")
bullet("Supported IYRA robotics events and teacher training activities.")
story.append(Spacer(1, 5))
p("BPPT | Security Internship | January - March 2018", "job")
p("Internship focused on hacking and security.", "body")
p("EDUCATION &amp; TRAINING", "section")
p("<b>Universitas Pamulang</b> | Bachelor's degree in Informatics Engineering | 2020 - 2024<br/>"
  "<b>SMK Negeri 6 Tangerang Selatan</b> | Computer &amp; Network Engineering | 2016 - 2019<br/>"
  "<b>Enigma Camp</b> | Go backend development training")
p("SELECTED WORK", "section")
p('<link href="https://alvinmalik.my.id/work/tunas-auction/">Tunas Auction: web &amp; mobile frontend</link> | '
  '<link href="https://alvinmalik.my.id/work/finance-operations/">Finance operations &amp; ERP integration</link><br/>'
  'Case studies describe personal contributions; company source code and private operational data are not shared.')

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=42, leftMargin=42,
    topMargin=35, bottomMargin=32, title="Alvin Malik Ibrahim - Full-stack Developer CV",
    author="Alvin Malik Ibrahim")
doc.build(story)
print(OUTPUT)
