import os

file_path = r"d:\Zakazlar\Website\Eldor\iso_full\JuHVL2PbIJHe.ae\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Corrupted path patterns
replacements = [
    ("./index.htmlwp-content/", "wp-content/"),
    ("index.htmlwp-content/", "wp-content/"),
    ("./index.htmlwp-includes/", "wp-includes/"),
    ("index.htmlwp-includes/", "wp-includes/"),
    ("./index.htmlwp-json/", "wp-json/"),
    ("index.htmlwp-json/", "wp-json/"),
    ("href=\"/\"", "href=\"./index.html\""),
]

original_len = len(content)
for old, new in replacements:
    content = content.replace(old, new)

if len(content) != original_len:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Repaired index.html. Applied {original_len - len(content)} reduction in characters (approx).")
else:
    print("No corrupted paths found to repair.")
