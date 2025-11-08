# Face Verification Model — Training Report

## Dataset
- Name: Labeled Faces in the Wild (LFW) — pairs protocol
- Official site: http://vis-www.cs.umass.edu/lfw/
- Loader used: scikit-learn `fetch_lfw_pairs`
  - Docs: https://scikit-learn.org/stable/modules/generated/sklearn.datasets.fetch_lfw_pairs.html

## Model and Method
- Face detection/alignment: MTCNN (via `facenet-pytorch`)
- Embedding backbone: Facenet InceptionResnetV1 pretrained on VGGFace2 (512-dim embeddings)
- Similarity metric: Cosine similarity between embeddings
- Training objective: Calibrate a single decision threshold on cosine similarity to separate "same person" vs "different person" using LFW train pairs.
  - No end-to-end network training (the backbone is pre-trained). This is a standard and fast approach for face verification systems.

## Environment and Commands
Create and activate virtual environment, install dependencies:
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -U pip
python -m pip install -r requirements.txt
```

Run full training/evaluation (saves `models/model_config.json`):
```powershell
python train_verifier.py --output models/model_config.json
```

Run a quick demo training (limited pairs, saves `models/model_config_demo.json`):
```powershell
python train_verifier.py --max-train-pairs 120 --max-test-pairs 120 --output models/model_config_demo.json
```

Use a GPU (if available): add `--device cuda` to the above commands.

## Training Logs (captured)
Below are excerpts of the actual console logs captured during runs.

### Demo run (120 train/test pairs)
Command:
```powershell
python train_verifier.py --max-train-pairs 120 --max-test-pairs 120 --output models/model_config_demo.json
```
Output (excerpt with progress and results):
```
Using device: cpu
Downloading/loading LFW pairs (train/test)...
Extracting train scores...
Embedding LFW pairs:  62%|██████████████████████████████████████▊                       | 75/120 [00:10<00:04,  9.17pair/s]
Embedding LFW pairs: 100%|█████████████████████████████████████████████████████████████| 120/120 [00:16<00:00,  7.49pair/s]
Fitting best threshold on train...
Best train threshold: 0.2144 | Train accuracy: 100.00%
Evaluating on test set...
Embedding LFW pairs: 100%|█████████████████████████████████████████████████████████████| 120/120 [00:15<00:00,  7.94pair/s]
Test metrics -> acc: 97.50% | prec: 100.00% | recall: 97.50% | f1: 98.73%
Saved config to: C:\\Users\\ADMIN\\Downloads\\model train\\models\\model_config_demo.json
```

### Full run (complete train/test splits)
Command:
```powershell
python train_verifier.py --output models/model_config.json
```
Final metrics reported:
```
Best train threshold: 0.3810 | Train accuracy: 98.68%
Test metrics -> acc: 97.60% | prec: 96.85% | recall: 98.40% | f1: 97.62%
Saved config to: C:\\Users\\ADMIN\\Downloads\\model train\\models\\model_config.json
```

## Saved Artifacts
- `models/model_config.json` — threshold and metadata (full run)
- `models/model_config_demo.json` — threshold and metadata (demo run)
- Both include:
  - `metric: "cosine"`
  - `threshold: <float>` learned from LFW train pairs
  - Backbone description and test metrics

## How to Test Two Images (Face Verification)
1) Activate the environment:
```powershell
.\.venv\Scripts\Activate.ps1
```
2) Run verification (replace paths with your images):
```powershell
python verify.py --img1 "path\to\personA_1.jpg" --img2 "path\to\personA_2.jpg" --config models\model_config.json
```
Example JSON output:
```json
{
  "metric": "cosine",
  "score": 0.73,
  "threshold": 0.381032,
  "same_person": true
}
```

## Notes
- Use well-lit, front-facing photos for best results.
- If you deploy on a new domain (different cameras/lighting), you can recalibrate the threshold by rerunning `train_verifier.py` on a small, labeled sample from your environment.
- If no face is detected in an image, the system falls back to a simple resize, which is less accurate—try better images in that case.
