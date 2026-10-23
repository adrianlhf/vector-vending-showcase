from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.deps'))
from PIL import Image, ImageOps
root = Path(__file__).resolve().parents[1]
for original, output, width in [('peanut-cake.jpg', 'hero.webp', 1600), ('cake.jpg', 'story.webp', 1000), ('paya-lebar-installation.jpg', 'paya-lebar.webp', 1600)]:
    image = ImageOps.exif_transpose(Image.open(root / 'source-assets' / original)).convert('RGB')
    image.thumbnail((width, width * 2), Image.Resampling.LANCZOS)
    image.save(root / 'docs' / 'assets' / output, 'WEBP', quality=84, method=6, exif=b'')
    print(output, image.size, (root / 'docs' / 'assets' / output).stat().st_size)
