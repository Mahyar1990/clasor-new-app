from pathlib import Path
import json,base64,re,zipfile
r=Path.cwd();s=r/'clasor-design-system'
p=s/'components.json';d=json.loads(p.read_text(encoding='utf8'));d['version']='0.2.0';d['brand']={'reference':'#8C66E0','primaryAction':'#8056CB','method':'Reference sample.webp; approximate sampled pixels. Darker action foreground pairing preserves white text contrast.'};d['visualReference']={'file':'sample.webp','date':'2026-10-31','outer':'#EBECF0','canvas':'#F8F8F8','card':'#FFFFFF','cardRadius':16,'dialogRadius':20,'frameRadius':24,'controls':[32,36,44],'touchTarget':44};p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
# Standalone source no longer claims brand shade 600 is the button background.
p=s/'index.html';h=p.read_text(encoding='utf8').replace('متن سفید روی رنگ اصلی','متن سفید روی رنگ اقدام').replace('نسخه مفهومی ۰.۱','نسخه مفهومی ۰.۲')
p.write_text(h,encoding='utf8')
h=h.replace('<link rel="stylesheet" href="reference-overrides.css">','').replace('<link rel="stylesheet" href="design-system.css">','<link rel="stylesheet" href="design-system.css"><link rel="stylesheet" href="reference-overrides.css">')
p.write_text(h,encoding='utf8')
css=(s/'design-system.css').read_text(encoding='utf8')+'\n'+(s/'reference-overrides.css').read_text(encoding='utf8')
for font in ['IRANYekanRegular.ttf','IRANYekanMedium.ttf','IRANYekanBold.ttf']:
 css=css.replace('assets/'+font,'data:font/ttf;base64,'+base64.b64encode((s/'assets'/font).read_bytes()).decode())
standalone=h.replace('<link rel="stylesheet" href="design-system.css">','<style>'+css+'</style>').replace('<link rel="stylesheet" href="reference-overrides.css">','').replace('<script src="preview.js"></script>','<script>'+(s/'preview.js').read_text(encoding='utf8')+'</script>')
(s/'clasor-design-system.html').write_text(standalone,encoding='utf8')
# Contrast and linked source validation, distinct from browser evidence.
t=json.loads((s/'tokens.json').read_text(encoding='utf8'))
def lum(c):
 a=[int(c[i:i+2],16)/255 for i in (1,3,5)];a=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in a];return sum(x*y for x,y in zip(a,[.2126,.7152,.0722]))
pairs=[('action-white','#8056CB','#FFFFFF',4.5),('secondary-white','#5D5B65','#FFFFFF',4.5),('input-border','#918D99','#FFFFFF',3)]
for k,v in t['color']['semantic'].items():pairs.append((k,v['text']['$value'],v['surface']['$value'],4.5))
results=[]
for name,a,b,limit in pairs:
 vals=sorted([lum(a),lum(b)]);ratio=(vals[1]+.05)/(vals[0]+.05);results.append({'pair':name,'ratio':round(ratio,2),'threshold':limit,'pass':ratio>=limit})
assert all(x['pass'] for x in results)
ids=re.findall(r'\bid="([^"]+)"',h);assert len(ids)==len(set(ids))
validation={'version':'0.2.0','date':'2026-10-31','contrast':results,'htmlDuplicateIds':0,'reactVerification':'lint, production build and 23 existing logic tests passed; browser checked at 360/390/768/1440, no document overflow; controls 32/36/44 and dialog radius20 measured.','staticExportVerification':'rebuilt with embedded fonts and JS; no browser visual pass claimed for standalone export.','evidence':'.codex/qa-reference-style'}
(s/'validation.json').write_text(json.dumps(validation,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(s/'REFERENCE_STYLE.md').write_text((r/'lib/design-system/REFERENCE_STYLE.md').read_text(encoding='utf8'),encoding='utf8')
guide=s/'DESIGN_SYSTEM.md';guide.write_text(guide.read_text(encoding='utf8').replace('../lib/design-system/REFERENCE_STYLE.md','REFERENCE_STYLE.md'),encoding='utf8')
out=r/'.codex/exports';out.mkdir(exist_ok=True)
with zipfile.ZipFile(out/'clasor-design-system-v0.2.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in s.rglob('*'):
  if p.is_file():z.write(p,Path('clasor-design-system')/p.relative_to(s))
print(json.dumps({'contrast':results,'export':str(out/'clasor-design-system-v0.2.zip')}))

