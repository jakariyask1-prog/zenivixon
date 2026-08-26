import re

with open('src/components/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('href={mailto:}', 'href={mailto:}')

with open('src/components/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
