import re

with open('src/components/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove import
content = re.sub(r'import\s+\{\s*SignInButton,\s*SignUpButton,\s*UserButton,\s*useAuth\s*\}\s*from\s*\"@clerk/nextjs\";?', '', content)

# 2. Remove const { isSignedIn } = useAuth();
content = re.sub(r'const\s*\{\s*isSignedIn\s*\}\s*=\s*useAuth\(\);?', '', content)

# 3. Replace the desktop auth block with empty string
desktop_pattern = r'\{!isSignedIn \? \(\s*<>\s*<SignInButton[^>]*>.*?</SignInButton>\s*<SignUpButton[^>]*>.*?</SignUpButton>\s*</>\s*\)\s*:\s*\(\s*<UserButton />\s*\)'
content = re.sub(desktop_pattern, '', content, flags=re.DOTALL)

# 4. Replace the mobile auth block with empty string
mobile_pattern = r'\{!isSignedIn \? \(\s*<>\s*<SignInButton>.*?</SignInButton>\s*<SignUpButton>.*?</SignUpButton>\s*</>\s*\)\s*:\s*\(\s*<div[^>]*>\s*<UserButton />\s*</div>\s*\)'
content = re.sub(mobile_pattern, '', content, flags=re.DOTALL)

with open('src/components/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
