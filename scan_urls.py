import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all full URLs starting with http
pattern = r'https?://[^\s"\'<>]+'
matches = re.findall(pattern, content)

unique_urls = sorted(set(matches))
print(f"Total unique URLs found: {len(unique_urls)}")
for url in unique_urls:
    print(url)
