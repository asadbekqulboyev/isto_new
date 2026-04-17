import os
import re

def find_and_repair_links():
    root_dir = r"d:\Zakazlar\Website\Eldor\iso_full\JuHVL2PbIJHe.ae"
    index_html = os.path.join(root_dir, "index.html")
    
    if not os.path.exists(index_html):
        print("index.html not found.")
        return

    # 1. Build a map of filename -> relative_path
    file_map = {}
    search_dirs = ["wp-content", "wp-includes", "assets"]
    
    for s_dir in search_dirs:
        full_s_dir = os.path.join(root_dir, s_dir)
        if not os.path.exists(full_s_dir):
            continue
            
        for root, dirs, files in os.walk(full_s_dir):
            for file in files:
                rel_path = os.path.relpath(os.path.join(root, file), root_dir).replace("\\", "/")
                # Store the first occurrence (or prioritize assets over wp-content if needed)
                if file not in file_map or "assets" in rel_path:
                    file_map[file] = rel_path

    # 2. Read index.html
    with open(index_html, "r", encoding="utf-8") as f:
        content = f.read()

    # 3. Find all potential asset paths
    # This regex looks for src="..." or href="..." or data-lazy-src="..."
    asset_pattern = r'(src|href|data-lazy-src|srcset)="([^"]+)"'
    
    def replace_path(match):
        attr = match.group(1)
        original_path = match.group(2)
        
        # Skip external links and data URIs
        if original_path.startswith("http") or original_path.startswith("data:"):
            return match.group(0)
            
        # Check if the path exists locally
        local_path = os.path.join(root_dir, original_path.replace("/", os.sep))
        if os.path.exists(local_path):
            return match.group(0)
            
        # If not, try to find the filename in our map
        filename = os.path.basename(original_path)
        if filename in file_map:
            new_rel_path = file_map[filename]
            print(f"Repairing: {original_path} -> {new_rel_path}")
            return f'{attr}="{new_rel_path}"'
            
        return match.group(0)

    new_content = re.sub(asset_pattern, replace_path, content)

    # 4. Save index.html
    if new_content != content:
        with open(index_html, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Successfully repaired index.html paths.")
    else:
        print("No paths needed repair or no matches found.")

if __name__ == "__main__":
    find_and_repair_links()
