# Obsidian Community Plugin Submission

Use this note when opening the pull request to `obsidianmd/obsidian-releases`.

## Repository

```text
https://github.com/sunxiaoqiqi/svg-editor
```

## Plugin Entry

Add this object to `community-plugins.json`:

```json
{
  "id": "svg-editor",
  "name": "SVG Editor",
  "author": "suntinglu777",
  "description": "Edit SVG files in Obsidian with source, layers, canvas, and inspector panes.",
  "repo": "sunxiaoqiqi/svg-editor"
}
```

## Required Release Assets

Create a GitHub release named `0.1.0` or `v0.1.0` and attach:

- `main.js`
- `manifest.json`
- `styles.css`

## Local Checks

Run before creating the release:

```bash
npm install
npm run release:check
```

## Manual Checks

- Open an `.svg` file from the file menu.
- Select elements on the canvas and in the layer tree.
- Collapse and expand the Source pane.
- Confirm large SVGs can be inspected with canvas scrollbars.
- Edit fill, stroke, opacity, and text.
- Double-click text and edit it inline.
- Drag a text, rect, and path element.
- Use duplicate, delete, reorder, bring to front, and send to back.
- Use `Ctrl+Z`, `Ctrl+Y`, and `Ctrl+S`.
- Confirm `.svg.bak` is created only when missing.
