# SVG Canvas Editor

Edit SVG files directly inside Obsidian.

SVG Canvas Editor adds a visual SVG workspace to your vault, with source editing, live preview, layers, canvas selection, an inspector, undo/redo, and simple element operations.

## Features

- Open `.svg` files from the Obsidian file menu.
- Edit SVG source with live preview.
- Collapse the source pane when you want more room for visual editing.
- Select elements on the canvas or from the layer tree.
- Edit common attributes such as fill, stroke, opacity, size, position, and text.
- Switch the editor UI between Chinese and English.
- Resize a selected element directly on the canvas.
- Select multiple elements and drag them together.
- Pan around large SVGs with canvas scrollbars when the image is wider or taller than the viewport.
- Insert basic text, rectangle, and circle elements.
- Double-click text to edit it inline on the canvas.
- Drag SVG elements on the canvas.
- Duplicate, delete, reorder, bring to front, and send to back.
- Use undo, redo, and save shortcuts during an editing session.
- Create a one-time `.svg.bak` backup before the first save.

## Usage

Right-click an `.svg` file in Obsidian and choose **Open in SVG Canvas Editor**.

The editor has four main areas:

- **Source**: edit the raw SVG markup.
- **Layers**: select SVG elements from the document tree.
- **Canvas**: preview, select, drag, and edit elements visually.
- **Inspector**: edit attributes for the selected element.

Use the source toggle in the toolbar to hide or show the Source pane. When the Source pane is hidden, the canvas receives more horizontal space. Large SVGs can be inspected with horizontal and vertical scrollbars.

## File Access

This plugin only reads and writes SVG files selected by the user inside the Obsidian vault.

When saving an SVG file, the plugin may create one backup file next to the SVG:

```text
example.svg.bak
```

The backup is created only if it does not already exist. The plugin does not read or write files outside the vault.

The plugin stores local editor preferences, such as the UI language and whether the Source pane is collapsed, in the plugin's Obsidian data file.

## Network Access And Privacy

SVG Canvas Editor does not make network requests and does not collect, transmit, or store user data outside the vault.

All editing happens locally inside Obsidian. SVG content stays in the user's vault unless the user syncs or publishes the vault through their own tools.

The Copy ID command writes the selected element ID to the system clipboard only when the user explicitly chooses that command.

## Development

```bash
npm install
npm run lint
npm run build
npm run release:prepare
npm run release:check
```

Build output for release:

- `main.js`
- `manifest.json`
- `styles.css`

`npm run release:prepare` copies those files into `release/<version>` based on `manifest.json`.

For local testing, copy those files into an Obsidian vault plugin folder.

## Release

Create a GitHub release whose tag matches `manifest.json` version and attach:

- `main.js`
- `manifest.json`
- `styles.css`

Before submitting to the Obsidian community plugin directory, run:

```bash
npm run release:check
```

This command runs linting, builds `main.js`, prepares `release/<version>`, and verifies that the release assets match the root build output.

## License

MIT
