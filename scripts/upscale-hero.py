"""
Agrandit l'image du hero par super-résolution (réseau EDSR ×4, OpenCV).

Les visuels d'ambiance reçus étaient de petite taille (500 px de large) :
EDSR reconstruit des contours nets là où un simple redimensionnement
produirait du flou et du tramage. Le résultat est commité dans
src/assets/images/ambiance/ ; ce script n'est utile que pour remplacer
l'image source.

Prérequis (hors dépendances du site) :
  pip install opencv-contrib-python-headless
  curl -LO https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x4.pb

Usage :
  python3 scripts/upscale-hero.py assets/originals/hero-oeillet.webp EDSR_x4.pb
"""

import sys
from pathlib import Path

import cv2
from cv2 import dnn_superres

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "images" / "ambiance" / "hero-oeillet.jpg"


def main() -> None:
    source, model = sys.argv[1], sys.argv[2]
    image = cv2.imread(source)
    engine = dnn_superres.DnnSuperResImpl_create()
    engine.readModel(model)
    engine.setModel("edsr", 4)
    result = engine.upsample(image)
    cv2.imwrite(str(OUT), result, [cv2.IMWRITE_JPEG_QUALITY, 86, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
    print(f"{OUT.relative_to(ROOT)}  {result.shape[1]}x{result.shape[0]}")


if __name__ == "__main__":
    main()
