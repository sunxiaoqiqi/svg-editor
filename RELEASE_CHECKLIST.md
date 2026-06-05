# Release Checklist

Use this checklist before publishing a GitHub release or submitting to the Obsidian community plugin directory.

## Local Checks

- [ ] `npm install`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run release:check`
- [ ] Confirm `manifest.json` version matches `package.json`.
- [ ] Confirm release assets include `main.js`, `manifest.json`, and `styles.css`.

## Manual Smoke Test

- [ ] Open an `.svg` file from the file menu.
- [ ] Select elements on the canvas and in the layer tree.
- [ ] Edit `fill`, `stroke`, text, and opacity from the inspector.
- [ ] Double-click text and edit it inline.
- [ ] Drag a text, rect, and path element.
- [ ] Shift-click or Ctrl-click multiple elements, then drag them together.
- [ ] Resize one selected text, rect, and circle with canvas handles.
- [ ] Insert a text, rectangle, and circle element.
- [ ] Select a thin path such as `svg_72`.
- [ ] Use duplicate, delete, up/down, front/back commands.
- [ ] Use `Ctrl+Z`, `Ctrl+Y`, and `Ctrl+S`.
- [ ] Save and confirm `.svg.bak` is created only when missing.

## Obsidian Submission

- [ ] GitHub repository is public.
- [ ] Repository URL is finalized for the community plugin PR: `sunxiaoqiqi/svg-editor`.
- [ ] Repository root contains `manifest.json`, `README.md`, `LICENSE`, and `versions.json`.
- [ ] README documents file access, backup behavior, network behavior, and privacy.
- [ ] GitHub release tag matches `manifest.json` version.
- [ ] GitHub release uploads `main.js`, `manifest.json`, and `styles.css` as assets.
- [ ] Plugin id `svg-editor` is still unique in the community plugin directory.
- [ ] Open PR to `obsidianmd/obsidian-releases`.

Suggested `community-plugins.json` entry:

```json
{
  "id": "svg-editor",
  "name": "SVG Editor",
  "author": "suntinglu777",
  "description": "Edit SVG files in Obsidian with source, layers, canvas, and inspector panes.",
  "repo": "sunxiaoqiqi/svg-editor"
}
```
