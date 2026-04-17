import re
import os

def repair_index_html(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Repair broken data URIs in img src
    # Searching for the broken pattern that starts with 'src="data:image/svg+xml' and ends with '%3E%3C/svg%3E"'
    
    pattern = r'src="data:image/svg\+xml,%3Csvg%20xmlns=[\s\S]*?%3E%3C/svg%3E"'
    
    def replacement(match):
        # Extract dimensions if possible, otherwise use a generic 1x1
        dimensions = re.search(r"viewBox='0%200%20(\d+)%20(\d+)'", match.group(0))
        if dimensions:
            w, h = dimensions.groups()
            return f'src="data:image/svg+xml,%3Csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20viewBox=\'0%200%20{w}%20{h}\'%3E%3C/svg%3E"'
        return 'src="data:image/svg+xml,%3Csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20viewBox=\'0%200%201%201\'%3E%3C/svg%3E"'

    new_content = re.sub(pattern, replacement, content)
    
    # Fix corrupted WhatsApp style attribute if not already fixed
    # path style="fill: url(" wp-content/uploads/index.html");" fill="url(" #htwaicona-chat")"
    whatsapp_pattern = r'style="fill: url\(" wp-content/uploads/index.html"\);"\s+fill="url\(" #htwaicona-chat"\)"'
    whatsapp_replacement = r'style="fill: url(#htwaicona-chat);" fill="url(#htwaicona-chat)"'
    new_content = re.sub(whatsapp_pattern, whatsapp_replacement, new_content)

    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Repaired index.html")
    else:
        print("No repairs needed or pattern mismatch.")

if __name__ == "__main__":
    target = r"d:\Zakazlar\Website\Eldor\iso_full\JuHVL2PbIJHe.ae\index.html"
    repair_index_html(target)
