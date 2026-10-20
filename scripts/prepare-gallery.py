#!/usr/bin/env python3
"""Prepare the approved showcase selection. Requires Pillow: uv run --with pillow."""
import argparse
import json
from pathlib import Path

from PIL import Image, ImageOps

# Stable IDs follow the sorted original filenames; omitted files stay private.
GROUPS = {
    'rooms': [5, 6, 7, 9, 36, 37, 38, 39, 40, 41, 43, 44],
    'common-areas': [12, 25, 29, 31, 46],
    'dining': [2, 8, 13, 14, 15, 17, 27, 33, 35],
    'bathrooms': [1, 10, 11, 16, 42],
    'outdoors': [21, 23, 26, 28, 30],
}
TITLES = {
    1: 'Shower with seating and grab bars', 2: 'Kitchen with white cabinetry',
    5: 'Bedroom with window and television', 6: 'Bedroom window view',
    7: 'Bedroom with seating', 8: 'Dining beside the windows',
    9: 'Bedroom entry view', 10: 'Bathroom with vanity and support rails',
    11: 'Bathroom and shower area', 12: 'Fresh flowers at home',
    13: 'A meal at the table', 14: 'Plated meal with vegetables',
    15: 'Dining table set for a meal', 16: 'Bathroom entrance and vanity',
    17: 'A view of the dining area', 21: 'Deck with seating and planters',
    23: 'Deck walkway beside the home', 24: 'Hallway to the shared living area',
    25: 'Flowers and interior details', 26: 'Deck seating and flowers',
    27: 'Meal beside the window', 28: 'Deck and exterior doors',
    29: 'Shared lounge with reclining seating', 30: 'Outdoor container garden',
    31: 'Shared lounge television area', 33: 'A colorful plated meal',
    35: 'Meal with vegetables and sides', 36: 'Bedroom with dresser and ceiling light',
    37: 'Bedroom window and dresser', 38: 'Bedroom with double-door closet',
    39: 'A wide view of the bedroom', 40: 'Twin-bed room',
    41: 'Bedroom with armchair and two windows', 42: 'Bathroom with support rails',
    43: 'Bedroom with bedside table and armchair', 44: 'Bedroom seating and television',
    46: 'Television and media cabinet',
}
DESCRIPTIONS = {
    'rooms': 'A closer look at the bedrooms and their furnishings.',
    'common-areas': 'Shared spaces and the little details around the home.',
    'dining': 'A look at the kitchen, dining spaces, and meals.',
    'bathrooms': 'Bathroom layouts and the fixtures shown in the home.',
    'outdoors': 'Outdoor spaces, seating, and greenery around the home.',
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    files = sorted(args.source.glob('*.jpeg'))
    if len(files) != 48:
        raise SystemExit('Expected the reviewed set of 48 JPEGs; review the selection before converting a different set.')
    output = root / 'public/images/gallery'
    output.mkdir(parents=True, exist_ok=True)
    entries = []
    original_bytes = 0
    for category, ids in GROUPS.items():
        for number in ids:
            source = files[number - 1]
            stem = f'golden-days-{number:02d}'
            with Image.open(source) as original:
                image = ImageOps.exif_transpose(original).convert('RGB')
                image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
                image.save(output / f'{stem}.webp', 'WEBP', quality=82, method=6)
                width, height = image.size
                image.thumbnail((640, 640), Image.Resampling.LANCZOS)
                image.save(output / f'{stem}-thumb.webp', 'WEBP', quality=78, method=6)
            original_bytes += source.stat().st_size
            entries.append({
                'id': stem, 'title': TITLES[number], 'description': DESCRIPTIONS[category],
                'category': category, 'image': f'{stem}.webp',
                'thumbnail': f'{stem}-thumb.webp', 'width': width, 'height': height,
            })
    manifest = root / 'src/data/gallery.json'
    manifest.parent.mkdir(parents=True, exist_ok=True)
    manifest.write_text(json.dumps(entries, indent=2) + '\n')
    retained = {entry[key] for entry in entries for key in ('image', 'thumbnail')}
    for obsolete in output.glob('golden-days-*.webp'):
        if obsolete.name not in retained:
            obsolete.unlink()
    generated_bytes = sum((output / entry[key]).stat().st_size for entry in entries for key in ('image', 'thumbnail'))
    print(json.dumps({'photos': len(entries), 'webp_files': len(entries) * 2,
                      'selected_original_bytes': original_bytes, 'generated_bytes': generated_bytes,
                      'categories': {key: len(value) for key, value in GROUPS.items()}}, indent=2))


if __name__ == '__main__':
    main()
