import re
with open('src/components/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will just replace WhatsApp\s*</Button>\s*} with WhatsApp\s*</Button>
content = re.sub(r'WhatsApp\n\s*</Button>\n\s*}', 'WhatsApp\n            </Button>', content)
content = re.sub(r'Chat on WhatsApp\n\s*</Button>\n\s*}', 'Chat on WhatsApp\n            </Button>', content)

with open('src/components/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
