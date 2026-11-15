from pathlib import Path
import json, re, base64
root=Path.cwd(); source=root/'clasor-design-system'
t=json.loads((source/'tokens.json').read_text(encoding='utf8'))
t['$description']='Clasor design system 0.2.0. Visual foundations revised from sample.webp on 2026-10-31. Reference colors sampled; layout dimensions optically inferred. RTL and IRANYekan retained.'
brand=['#F8F5FE','#F0E9FD','#E2D4FA','#CEB9F4','#B294ED','#9E7AE7','#8C66E0','#8056CB','#6D43B5','#56348E','#352055']
for k,v in zip(['50','100','200','300','400','500','600','700','800','900','950'],brand):t['color']['brand'][k]['$value']=v
neutrals={'0':'#FFFFFF','25':'#FCFCFC','50':'#F8F8F8','100':'#F1F1F3','200':'#EBECF0','300':'#DBDCE1','400':'#A1A1AA','500':'#73717C','600':'#5D5B65','700':'#44424C','800':'#2D2B33','900':'#1D1C22','950':'#111015'}
for k,v in neutrals.items():t['color']['neutral'][k]['$value']=v
semantic={'success':('#EFF9F4','#236746','#CEE9DC'),'warning':('#FFF8EB','#80561C','#F3DFB6'),'danger':('#FFF2F3','#AC3349','#F3D3DA'),'info':('#F0F6FE','#345F94','#D4E4F6')}
for k,values in semantic.items():
 for name,value in zip(['surface','text','border'],values):t['color']['semantic'][k][name]['$value']=value
for k,v in {'primary':'700','hover':'800','pressed':'900'}.items():t['color']['action'][k]['$value']='{color.brand.'+v+'}'
for n in [20,24,32]:t['radius'][str(n)]={'$value':{'value':n,'unit':'px'},'$type':'dimension'}
t['size']['control']['medium']['$value']['value']=36
t['size']['control']['large']['$value']['value']=44
t['font']['lineHeight']['body']['$value']=1.8
t['font']['lineHeight']['label']['$value']=1.5
t['font']['lineHeight']['heading']['$value']=1.5
t['border']['control']['$value']='#918D99'
t['border']['subtle']['$value']='#E9E9ED'
t['color']['surface']['outer']={'$value':'{color.neutral.200}','$type':'color'}
t['layout']['contentMax']['$value']['value']=1280
(source/'tokens.json').write_text(json.dumps(t,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
# Keep human-readable catalogue descriptions tied to the new token source.
p=root/'components/design-system/foundations-catalogue.tsx'
s=p.read_text(encoding='utf8').replace('رنگ اصلی کلاسور، کد 7446B2','رنگ اصلی کلاسور، کد 8C66E0').replace('#7446B2','#8C66E0')
s=s.replace('نسخه ۰.۱.۰','نسخه ۰.۲.۰').replace('کتابخانه طراحی ۰.۱.۰','کتابخانه طراحی ۰.۲.۰')
s=s.replace('رنگ، نقطه شروع<br /> هویت <em>کلاسور.</em>','یک زبان روشن<br /> برای <em>کلاسور.</em>')
s=s.replace('از بنفشِ هویت تا رنگ‌هایی که معنا را منتقل می‌کنند.','سطوح سفید، بنفش روشن و جزئیات سبک‌تر بر اساس تصویر مرجع.')
s=s.replace('چهار مقدار برای شکل‌دادن به اجزای رابط','از گوشه‌های کنترل تا قاب اصلی، با شعاع‌های مشخص')
s=s.replace('"12": "کارت‌ها و قاب‌ها", "16": "سطح‌های برجسته"','"12": "گروه‌های داخلی", "16": "کارت‌ها", "20": "گفت‌وگوها", "24": "قاب اصلی", "32": "نمایش‌های بزرگ"')
s=s.replace('32 / 40 / 48','32 / 36 / 44').replace('فاصله خطوط بدنه ۱٫۹، برچسب ۱٫۶ و عنوان ۱٫۵۵','فاصله خطوط بدنه ۱٫۸، برچسب ۱٫۵ و عنوان ۱٫۵')
s=s.replace('padding: 18, key: "comfortable"','padding: 14, key: "comfortable"').replace('padding: 12, key: "compact"','padding: 10, key: "compact"')
s=s.replace('ارتفاع کنترل داخلی ۳۶ پیکسل است','ارتفاع کنترل داخلی ۳۲ پیکسل است')
s=s.replace('"--sidebar-width": "246px"','"--sidebar-width": "232px"')
p.write_text(s,encoding='utf8')
p=root/'components/design-system/catalogue-sidebar.tsx';s=p.read_text(encoding='utf8').replace('>۰.۱</span>','>۰.۲</span>');p.write_text(s,encoding='utf8')
p=root/'components/design-system/sample.tsx';s=p.read_text(encoding='utf8').replace('<section className=','<section data-slot="ds-sample" className=');p.write_text(s,encoding='utf8')
# Theme mappings, kept semantic rather than hard-coded into each component.
p=root/'lib/design-system/theme.css';s=p.read_text(encoding='utf8')
s=s.replace('--row-padding: 18px','--row-padding: 14px').replace('--row-padding: 12px','--row-padding: 10px').replace('--control-height: 36px','--control-height: 32px')
s=s.replace('0 8px 24px #241e2d0d, 0 2px 6px #241e2d08','0 4px 16px #1d1c2208, 0 1px 3px #1d1c2206')
s=s.replace('0 24px 70px #241e2d22','0 20px 60px #1d1c221a').replace('0 10px 30px #241e2d30','0 8px 28px #1d1c2220')
s=s.replace('--overlay-backdrop: #241e2d55','--overlay-backdrop: #1d1c2247').replace('--icon-size: 20px','--icon-size: 18px').replace('--icon-stroke: 1.7','--icon-stroke: 1.5')
s=s.replace('--radius: var(--clasor-radius-8);','--radius: var(--clasor-radius-8);\n  --surface-outer: var(--clasor-color-surface-outer);\n  --brand-display: var(--clasor-color-brand-600);')
s=s.replace('--sidebar-accent: var(--clasor-color-brand-100)','--sidebar-accent: var(--clasor-color-neutral-50)')
p.write_text(s,encoding='utf8')
p=root/'app/globals.css';s=p.read_text(encoding='utf8').replace('--radius-lg: var(--clasor-radius-12)','--radius-lg: var(--clasor-radius-16)').replace('--radius-xl: var(--clasor-radius-16)','--radius-xl: var(--clasor-radius-20)')
s=s.replace('@import "../lib/design-system/theme.css";','@import "../lib/design-system/theme.css";\n@import "../lib/design-system/reference-style.css";')
p.write_text(s,encoding='utf8')
# Static design-only export mirrors the same visual direction.
p=source/'design-system.css';s=p.read_text(encoding='utf8')
mapping={'#7446b2':'#8056cb','#603695':'#6d43b5','#4d2b78':'#56348e','#f7f3fc':'#f8f5fe','#eee5f8':'#f0e9fd','#deccef':'#e2d4fa','#de ccef':'#e2d4fa','#241e2d':'#1d1c22','#645a70':'#5d5b65','#f6f5f8':'#f8f8f8','#fbfafc':'#fcfcfc','#ded9e5':'#e9e9ed','#8f849c':'#918d99'}
for a,b in mapping.items():s=s.replace(a,b)
p.write_text(s,encoding='utf8')
p=source/'index.html';s=p.read_text(encoding='utf8')
for a,b in zip(['#F7F3FC','#EEE5F8','#DECCEF','#C6A9E2','#AC82D2','#9061C3','#7446B2','#603695','#4D2B78','#3B235A','#27153D'],brand):s=s.replace(a,b)
s=s.replace('v0.1','v0.2').replace('مرجع <code>#8C66E0','مرجع <code>#8C66E0')
s=s.replace('بنفش فعلی محصول حفظ شده؛','بنفش روشن تصویر مرجع مبناست؛').replace('حفظ بنفش برند','بنفش روشن مرجع')
s=s.replace('ارتفاع کنترل‌ها: ۳۲، ۴۰ و ۴۸','ارتفاع کنترل‌ها: ۳۲، ۳۶ و ۴۴')
s=s.replace('2026-10-23','2026-10-31').replace('۲۰۲۶/۱۰/۲۳','۲۰۲۶/۱۰/۳۱')
p.write_text(s,encoding='utf8')
p=source/'preview.js';s=p.read_text(encoding='utf8').replace('#7446B2','#8056CB').replace('#645A70','#5D5B65').replace('#8F849C','#918D99')
p.write_text(s,encoding='utf8')
# Portable raw tokens are rebuilt in sync with the React generator.
decl=[]
def walk(d,path=[]):
 for k,v in d.items():
  if k.startswith('$'):continue
  if '$value' not in v:walk(v,path+[k]);continue
  val=v['$value']
  if isinstance(val,dict):val=str(val['value'])+val['unit']
  elif isinstance(val,list):val=', '.join(val)
  elif isinstance(val,str) and val.startswith('{'):val='var(--'+val[1:-1].replace('.','-')+')'
  decl.append('  --'+'-'.join(path+[k])+': '+str(val)+';')
walk(t);(source/'tokens.css').write_text('/* Clasor DS 0.2 visual reference */\n:root {\n'+'\n'.join(decl)+'\n}\n',encoding='utf8')
print('Updated visual foundations, catalogue descriptions and static source.')

