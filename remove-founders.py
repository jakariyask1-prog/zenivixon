import re

with open('src/components/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to replace
pattern = r'<span className="text-\[10px\] font-bold tracking-\[0\.2em\] uppercase text-slate-500 dark:text-slate-400 mb-6 block font-heading">\s*GET IN TOUCH\s*</span>\s*<div className="space-y-6">.*?<a href="mailto:sazibhossain9142@gmail\.com"[^>]*>.*?</a>\s*</div>'

replacement = """<span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-6 block font-heading">
                  GET IN TOUCH
                </span>
                <a href={mailto:} className="inline-flex items-center gap-2 mt-2 text-slate-700 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  {COMPANY_INFO.channels.email}
                </a>
              </div>"""

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/components/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
