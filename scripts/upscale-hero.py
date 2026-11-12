"""
Prépare l'animation du hero à partir du GIF d'origine, en pleine qualité.

1. extrait chaque image du GIF ;
2. l'agrandit ×4 par super-résolution (réseau EDSR, OpenCV) : contours nets
   au lieu du flou et du tramage d'un simple redimensionnement ;
3. encode la séquence en vidéo MP4 (H.264) et WebM (VP9), au format et à la
   cadence d'origine, en 2000 px (ordinateur) et 1000 px (mobile) ;
4. enregistre la première image comme image fixe (affiche de la vidéo et
   repli si les animations sont désactivées).

Prérequis (hors dépendances du site) :
  pip install opencv-contrib-python-headless pillow
  curl -LO https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x4.pb
  ffmpeg

Usage :
  python3 scripts/upscale-hero.py assets/originals/hero-oeillet.gif EDSR_x4.pb
"""

import subprocess
import sys
import tempfile
from pathlib import Path

import cv2
from cv2 import dnn_superres
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
STILL = ROOT / "src" / "assets" / "images" / "ambiance" / "hero-oeillet.jpg"
MEDIA = ROOT / "public" / "media"


def main() -> None:
    source, model = Path(sys.argv[1]), sys.argv[2]
    engine = dnn_superres.DnnSuperResImpl_create()
    engine.readModel(model)
    engine.setModel("edsr", 4)

    gif = Image.open(source)
    durations = []
    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp)
        for index in range(gif.n_frames):
            gif.seek(index)
            durations.append(gif.info.get("duration", 100))
            frame = work / f"in{index:03d}.png"
            gif.convert("RGB").save(frame)
            upscaled = engine.upsample(cv2.imread(str(frame)))
            cv2.imwrite(str(work / f"sr{index:03d}.png"), upscaled)
            print(f"  image {index + 1}/{gif.n_frames}")

        fps = 1000 / (sum(durations) / len(durations))
        MEDIA.mkdir(parents=True, exist_ok=True)
        pattern = str(work / "sr%03d.png")
        base = ["ffmpeg", "-loglevel", "error", "-y", "-framerate", f"{fps:.4f}", "-i", pattern]
        subprocess.run(
            [*base, "-c:v", "libx264", "-preset", "veryslow", "-crf", "21", "-tune", "animation", "-pix_fmt", "yuv420p",
             "-movflags", "+faststart", "-an", str(MEDIA / "hero-oeillet.mp4")],
            check=True,
        )
        subprocess.run(
            [*base, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "24", "-row-mt", "1", "-pix_fmt", "yuv420p",
             "-an", str(MEDIA / "hero-oeillet.webm")],
            check=True,
        )
        small = ["-vf", "scale=1000:-2:flags=lanczos"]
        subprocess.run(
            [*base, *small, "-c:v", "libx264", "-preset", "veryslow", "-crf", "21", "-tune", "animation",
             "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", str(MEDIA / "hero-oeillet-1000.mp4")],
            check=True,
        )
        subprocess.run(
            [*base, *small, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "28", "-row-mt", "1", "-pix_fmt", "yuv420p",
             "-an", str(MEDIA / "hero-oeillet-1000.webm")],
            check=True,
        )
        Image.open(work / "sr000.png").convert("RGB").save(STILL, "JPEG", quality=88, optimize=True, progressive=True)

    print(f"  {fps:.2f} images/s — public/media/hero-oeillet.mp4, .webm et {STILL.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
