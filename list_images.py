import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all isto.ae URLs (images from uploads and themes)
pattern = r'https://isto\.ae/(wp-content/[^\s"\'<>]+\.(?:jpg|jpeg|png|svg|webp|gif))'
matches = re.findall(pattern, content)

unique_urls = sorted(set(matches))
print(f"Total unique image URLs: {len(unique_urls)}")
for url in unique_urls:
    print(url)
