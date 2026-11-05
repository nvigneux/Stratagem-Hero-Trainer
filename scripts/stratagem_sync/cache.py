"""Regenerate the service worker manifest and deterministic cache version."""
from sync import ROOT, cache_assets

if __name__ == '__main__':
    cache_assets(ROOT)
