"""Generate the local, fictional one-page PDF used by the document preview."""
from pathlib import Path
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

target = Path(__file__).resolve().parents[1] / "public/sample-content/research-report.pdf"
target.parent.mkdir(parents=True, exist_ok=True)
pdf = canvas.Canvas(str(target), pagesize=(595, 842), invariant=1)
pdf.setTitle("Clasor - Fictional user research report")
pdf.setAuthor("Clasor sample workspace")
pdf.setFillColor(HexColor("#7446B2"))
pdf.rect(0, 770, 595, 72, fill=1, stroke=0)
pdf.setFillColor(HexColor("#FFFFFF"))
pdf.setFont("Helvetica-Bold", 14)
pdf.drawString(48, 801, "CLASOR / SAMPLE DOCUMENT")
pdf.setFillColor(HexColor("#241E2D"))
pdf.setFont("Helvetica-Bold", 28)
pdf.drawString(48, 708, "User research notes")
pdf.setFont("Helvetica", 12)
pdf.setFillColor(HexColor("#645A70"))
pdf.drawString(48, 680, "A fictional report for testing the reading experience.")
sections = [
    ("01 / Finding documents", ["People need a clear place to begin.", "Search, folder paths and recent changes should be easy to read."]),
    ("02 / Understanding context", ["A document and its versions are different concepts.", "Approval status does not determine who can read a document."]),
    ("03 / Continuing work", ["Returning to a list should preserve the current search and filters.", "Empty lists and failed requests should explain what to do next."]),
]
y = 616
for title, lines in sections:
    pdf.setStrokeColor(HexColor("#DED9E5"))
    pdf.line(48, y + 24, 547, y + 24)
    pdf.setFillColor(HexColor("#7446B2"))
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(48, y, title)
    pdf.setFillColor(HexColor("#352D3F"))
    pdf.setFont("Helvetica", 12)
    for index, line in enumerate(lines):
        pdf.drawString(48, y - 32 - index * 22, line)
    y -= 148
pdf.setFont("Helvetica", 10)
pdf.setFillColor(HexColor("#645A70"))
pdf.drawString(48, 66, "All content is fictional. No user or customer information is included.")
pdf.drawRightString(547, 42, "1 / 1")
pdf.save()
print(target)
