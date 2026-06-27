import os

search_paths = [
    r"C:\Users\Prajwal\Pictures",
    r"C:\Users\Prajwal\Desktop",
    r"C:\Users\Prajwal\Downloads",
    r"C:\Users\Prajwal\3D Objects"
]

extensions = (".png", ".jpg", ".jpeg", ".webp", ".glb", ".gltf", ".obj", ".fbx")
search_terms = ["photo", "3d", "prajwal", "me", "avatar", "profile", "image", "pic"]

for path in search_paths:
    if not os.path.exists(path):
        continue
    print(f"Searching in: {path}")
    try:
        for root, dirs, files in os.walk(path):
            # Do not go too deep into directories
            if root.count(os.sep) - path.count(os.sep) > 2:
                continue
            for f in files:
                f_lower = f.lower()
                if f_lower.endswith(extensions):
                    # Check if any search term is in file name
                    if any(term in f_lower for term in search_terms) or "67c759" in f_lower:
                        print(f"Found match: {os.path.join(root, f)} (size: {os.path.getsize(os.path.join(root, f))} bytes)")
    except Exception as e:
        print(f"Error reading {path}: {e}")
