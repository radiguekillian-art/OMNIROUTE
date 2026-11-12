"""
Génère les visuels optimisés du site à partir des originaux de `assets/originals/`.

Aucun visuel n'est inventé : chaque fichier produit est soit l'original
ré-encodé, soit un recadrage d'une photographie réelle. Le logo garde ses
couleurs d'origine. L'animation du hero (GIF) est convertie en vidéo
MP4/WebM, beaucoup plus légère (nécessite ffmpeg).

Usage : npm run images   (nécessite Python 3 + Pillow)
"""

import shutil
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "originals"
OUT = ROOT / "src" / "assets" / "images"
PUBLIC = ROOT / "public" / "images"
APP = ROOT / "src" / "app"

OFF_WHITE = (247, 245, 242)


def save_jpeg(img: Image.Image, path: Path, quality: int = 88) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {path.relative_to(ROOT)}  {img.size[0]}x{img.size[1]}")


def main() -> None:
    print("Produit — Cardigan FADIYE")
    face = Image.open(SRC / "cardigan-face.png").convert("RGB")
    product_dir = OUT / "products" / "cardigan-fadiye"
    save_jpeg(face, product_dir / "face.jpg", 90)

    # Recadrages de détails depuis le packshot réel (résolution native, sans agrandissement).
    crops = {
        "broderie.jpg": (450, 250, 930, 850),  # broderie calligraphique rouge
        "fermoirs.jpg": (380, 250, 700, 650),  # fermoirs métalliques + col côtelé
        "maille.jpg": (280, 694, 600, 1094),  # maille, bas côtelé et boutons
    }
    for name, box in crops.items():
        save_jpeg(face.crop(box), product_dir / name, 90)

    bouton = Image.open(SRC / "bouton-signature.png").convert("RGB")
    save_jpeg(bouton, product_dir / "bouton-signature.jpg", 88)

    etiquette = Image.open(SRC / "etiquette.png").convert("RGB")
    save_jpeg(etiquette, product_dir / "etiquette.jpg", 88)

    print("Logo (couleurs d'origine, aucune recoloration)")
    logo = Image.open(SRC / "logo-fadiye.png").convert("RGBA")
    logo = logo.crop(logo.getbbox())
    width = 1400
    # Redimensionnement en alpha prémultiplié : pas de liseré sur les bords.
    logo = logo.convert("RGBa").resize((width, round(logo.height * width / logo.width)), Image.LANCZOS).convert("RGBA")
    brand = OUT / "brand"
    brand.mkdir(parents=True, exist_ok=True)
    logo.save(brand / "logo-fadiye.png", optimize=True)
    print(f"  {(brand / 'logo-fadiye.png').relative_to(ROOT)}  {logo.size[0]}x{logo.size[1]}")

    print("Icônes (lys de l'étiquette tissée)")
    lys = etiquette.crop((1198, 168, 1628, 598))
    for size, name in ((512, "icon.png"), (180, "apple-icon.png")):
        lys.resize((size, size), Image.LANCZOS).save(APP / name, optimize=True)
        print(f"  src/app/{name}  {size}x{size}")

    print("Image de partage (Open Graph)")
    og = Image.new("RGB", (1200, 630), OFF_WHITE)
    garment = face.resize((round(face.width * 600 / face.height), 600), Image.LANCZOS)
    panel = Image.new("RGB", (560, 630), (249, 249, 249))
    panel.paste(garment, ((560 - garment.width) // 2, 15))
    og.paste(panel, (640, 0))
    mark = logo.convert("RGBa").resize((520, round(logo.height * 520 / logo.width)), Image.LANCZOS).convert("RGBA")
    og.paste(mark, (60, (630 - mark.height) // 2), mark)
    save_jpeg(og, PUBLIC / "og" / "fadiye-og.jpg", 86)

    print("Animation du hero (GIF → vidéo)")
    gif = SRC / "hero-lys.gif"
    media = ROOT / "public" / "media"
    media.mkdir(parents=True, exist_ok=True)
    scale = "scale=1000:-2:flags=lanczos"
    commands = [
        ["-vf", f"{scale},format=yuv420p", "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-movflags", "+faststart", "-an", str(media / "hero-lys.mp4")],
        ["-vf", f"{scale},format=yuv420p", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "32", "-row-mt", "1", "-an", str(media / "hero-lys.webm")],
        ["-vf", f"select=eq(n\\,0),{scale}", "-frames:v", "1", "-q:v", "3", str(media / "hero-lys-poster.jpg")],
        ["-vf", f"select=eq(n\\,104),{scale}", "-frames:v", "1", "-q:v", "3", str(media / "hero-lys-still.jpg")],
    ]
    if shutil.which("ffmpeg"):
        for args in commands:
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(gif), *args], check=True)
            print(f"  {Path(args[-1]).relative_to(ROOT)}")
    else:
        print("  ffmpeg introuvable : vidéo non régénérée")


if __name__ == "__main__":
    main()
