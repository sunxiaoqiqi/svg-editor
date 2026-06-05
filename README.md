# SVG Editor for Obsidian

SVG Editor is an Obsidian plugin for editing `.svg` files inside a vault. It provides source editing, live preview, a layer tree, canvas selection, an inspector panel, undo/redo, and simple SVG element operations.

## Features

- Open `.svg` files from the file menu.
- Edit SVG source and preview changes.
- Select elements from the canvas or layer tree.
- Edit common attributes such as fill, stroke, opacity, size, position, and text.
- Drag elements on the canvas.
- Duplicate, delete, reorder, bring to front, and send to back.
- Undo and redo changes in the current editing session.
- Create a `.bak` backup before the first save.

## File Access

This plugin reads and writes SVG files selected by the user inside the Obsidian vault.

When saving an SVG file, the plugin may create one backup file next to the SVG:

```text
example.svg.bak
```

The backup is created only if it does not already exist. The plugin does not read or write files outside the vault.

## Network Access

This plugin does not make network requests and does not collect or transmit user data.

## Privacy

All editing happens locally inside Obsidian. SVG content stays in the user's vault unless the user syncs or publishes the vault through their own tools.

## Development

```bash
npm install
npm run lint
npm run build
npm run release:check
```

Build output:

- `main.js`
- `manifest.json`
- `styles.css`

Copy those files into your Obsidian vault plugin folder for local testing.

## Release

Create a GitHub release whose tag matches `manifest.json` version, then attach:

- `main.js`
- `manifest.json`
- `styles.css`

Before submitting to the Obsidian community plugin directory, run:

```bash
npm run release:check
```

## License

MIT
