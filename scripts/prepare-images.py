"""
Génère les visuels optimisés du site à partir des originaux de `assets/originals/`.

Aucun visuel n'est inventé : chaque fichier produit est soit l'original
ré-encodé, soit un recadrage d'une photographie réelle, soit une
recoloration du logo calligraphique (même tracé, autre couleur).

Usage : npm run images   (nécessite Python 3 + Pillow)
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "originals"
OUT = ROOT / "src" / "assets" / "images"
PUBLIC = ROOT / "public" / "images"
APP = ROOT / "src" / "app"

OFF_WHITE = (247, 245, 242)
INK = (9, 9, 9)


def save_jpeg(img: Image.Image, path: Path, quality: int = 88) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {path.relative_to(ROOT)}  {img.size[0]}x{img.size[1]}")


def recolor(logo: Image.Image, rgb: tuple[int, int, int]) -> Image.Image:
    """Même calligraphie, couleur unie : on conserve uniquement le canal alpha."""
    alpha = logo.getchannel("A")
    solid = Image.new("RGBA", logo.size, rgb + (255,))
    solid.putalpha(alpha)
    return solid


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

    print("Logo")
    logo = Image.open(SRC / "logo-fadiye.png").convert("RGBA")
    logo = logo.crop(logo.getbbox())
    width = 1400
    logo = logo.resize((width, round(logo.height * width / logo.width)), Image.LANCZOS)
    brand = OUT / "brand"
    brand.mkdir(parents=True, exist_ok=True)
    for name, rgb in {"logo-fadiye-red.png": (200, 16, 37), "logo-fadiye-black.png": INK, "logo-fadiye-white.png": (255, 255, 255)}.items():
        recolor(logo, rgb).save(brand / name, optimize=True)
        print(f"  {(brand / name).relative_to(ROOT)}  {logo.size[0]}x{logo.size[1]}")

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
    mark = recolor(logo, INK)
    mark = mark.resize((520, round(mark.height * 520 / mark.width)), Image.LANCZOS)
    og.paste(mark, (60, (630 - mark.height) // 2), mark)
    save_jpeg(og, PUBLIC / "og" / "fadiye-og.jpg", 86)


if __name__ == "__main__":
    main()
