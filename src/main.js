const { ItemView, Menu, Notice, Plugin, TFile } = require('obsidian')

const VIEW_TYPE_SVG_EDITOR = 'svg-editor-view'
const DEFAULT_SETTINGS = {
  language: 'zh',
}

const I18N = {
  zh: {
    openActiveCommand: '在 SVG 编辑器中打开当前文件',
    openFileMenu: '在 SVG 编辑器中打开',
    ready: '就绪',
    undo: '撤销',
    redo: '重做',
    save: '保存',
    reload: '重载',
    wrapOn: '换行：开',
    wrapOff: '换行：关',
    languageToggle: 'English',
    source: '源码',
    layers: '图层',
    canvas: '画布',
    inspector: '属性',
    noOpenFile: '没有打开 SVG 文件',
    saved: 'SVG 已保存',
    savedStatus: '已保存',
    reloadedStatus: '已重载',
    unsavedStatus: '未保存',
    parseError: 'SVG 无法解析，请检查源码中的标签或属性是否完整。',
    emptyLayers: '没有可用的 SVG 图层树。',
    inspectorEmpty: '在画布中点击一个元素，即可编辑它的常用 SVG 属性。',
    duplicate: '复制',
    delete: '删除',
    moveUp: '上移',
    moveDown: '下移',
    moveUpLayer: '上移一层',
    moveDownLayer: '下移一层',
    bringToFront: '置于顶层',
    sendToBack: '置于底层',
    copyId: '复制 ID',
    addText: '文本',
    addRect: '矩形',
    addCircle: '圆形',
    backupCreated: '已创建备份',
    inheritedStyleHint: '来自计算样式；编辑后会写入内联属性',
    emptyValue: '(空)',
    element: '元素',
    visualBounds: '视觉边界',
    computedStyle: '计算样式',
    type: '类型',
    children: '子元素',
    note: '备注',
    groupSizeNote: '组尺寸来自子元素',
    pathData: '路径数据',
    status: '状态',
    unavailable: '不可用',
    noComputedStyle: '没有可用的计算样式',
    textLabel: '文本 text',
    editText: '编辑文本',
    noElementId: '当前元素没有 ID',
    copiedId: '已复制 ID',
    chars: '字符',
    fileNotFound: 'SVG 文件未找到',
    insertedText: '已插入文本',
    insertedRect: '已插入矩形',
    insertedCircle: '已插入圆形',
    defaultText: '文本',
    attributeLabels: {
      fill: '填充 fill',
      stroke: '描边 stroke',
      'stroke-width': '描边粗细 stroke-width',
      opacity: '透明度 opacity',
      transform: '变换 transform',
      x: '横坐标 x',
      y: '纵坐标 y',
      width: '宽度 width',
      height: '高度 height',
      rx: '圆角 X rx',
      ry: '圆角 Y ry',
      cx: '圆心 X cx',
      cy: '圆心 Y cy',
      r: '半径 r',
      x1: '起点 X x1',
      y1: '起点 Y y1',
      x2: '终点 X x2',
      y2: '终点 Y y2',
      'font-size': '字号 font-size',
      'font-family': '字体 font-family',
      'font-weight': '字重 font-weight',
      d: '路径 d',
    },
  },
  en: {
    openActiveCommand: 'Open current file in SVG Editor',
    openFileMenu: 'Open in SVG Editor',
    ready: 'Ready',
    undo: 'Undo',
    redo: 'Redo',
    save: 'Save',
    reload: 'Reload',
    wrapOn: 'Wrap: On',
    wrapOff: 'Wrap: Off',
    languageToggle: '中文',
    source: 'Source',
    layers: 'Layers',
    canvas: 'Canvas',
    inspector: 'Inspector',
    noOpenFile: 'No SVG file is open',
    saved: 'SVG saved',
    savedStatus: 'Saved',
    reloadedStatus: 'Reloaded',
    unsavedStatus: 'Unsaved',
    parseError: 'SVG could not be parsed. Check whether the source markup and attributes are complete.',
    emptyLayers: 'No SVG layer tree is available.',
    inspectorEmpty: 'Click an element on the canvas to edit its common SVG attributes.',
    duplicate: 'Duplicate',
    delete: 'Delete',
    moveUp: 'Move up',
    moveDown: 'Move down',
    moveUpLayer: 'Move up one layer',
    moveDownLayer: 'Move down one layer',
    bringToFront: 'Bring to front',
    sendToBack: 'Send to back',
    copyId: 'Copy ID',
    addText: 'Text',
    addRect: 'Rect',
    addCircle: 'Circle',
    backupCreated: 'Created backup',
    inheritedStyleHint: 'From computed style; edits will be written inline',
    emptyValue: '(empty)',
    element: 'Element',
    visualBounds: 'Visual bounds',
    computedStyle: 'Computed style',
    type: 'Type',
    children: 'Children',
    note: 'Note',
    groupSizeNote: 'Group size comes from child elements',
    pathData: 'Path data',
    status: 'Status',
    unavailable: 'Unavailable',
    noComputedStyle: 'No computed style available',
    textLabel: 'Text',
    editText: 'Edit text',
    noElementId: 'Current element has no ID',
    copiedId: 'Copied ID',
    chars: 'chars',
    fileNotFound: 'SVG file not found',
    insertedText: 'Inserted text',
    insertedRect: 'Inserted rectangle',
    insertedCircle: 'Inserted circle',
    defaultText: 'Text',
    attributeLabels: {
      fill: 'Fill',
      stroke: 'Stroke',
      'stroke-width': 'Stroke width',
      opacity: 'Opacity',
      transform: 'Transform',
      x: 'X',
      y: 'Y',
      width: 'Width',
      height: 'Height',
      rx: 'Corner X rx',
      ry: 'Corner Y ry',
      cx: 'Center X cx',
      cy: 'Center Y cy',
      r: 'Radius r',
      x1: 'Start X x1',
      y1: 'Start Y y1',
      x2: 'End X x2',
      y2: 'End Y y2',
      'font-size': 'Font size',
      'font-family': 'Font family',
      'font-weight': 'Font weight',
      d: 'Path d',
    },
  },
}

module.exports = class SvgEditorPlugin extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
    this.registerView(VIEW_TYPE_SVG_EDITOR, (leaf) => new SvgEditorView(leaf, this))

    this.addCommand({
      id: 'open-active-svg-editor',
      name: this.t('openActiveCommand'),
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile()
        const canOpen = file instanceof TFile && file.extension.toLowerCase() === 'svg'
        if (checking) return canOpen
        this.openSvgFile(file)
      },
    })

    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        if (!(file instanceof TFile) || file.extension.toLowerCase() !== 'svg') return
        menu.addItem((item) => {
          item
            .setTitle(this.t('openFileMenu'))
            .setIcon('image')
            .onClick(() => this.openSvgFile(file))
        })
      })
    )
  }

  async openSvgFile(file) {
    const leaf = this.app.workspace.getLeaf(false)
    await leaf.setViewState({
      type: VIEW_TYPE_SVG_EDITOR,
      active: true,
      state: { file: file.path },
    })
    this.app.workspace.setActiveLeaf(leaf, { focus: true })
  }

  t(key) {
    const language = this.settings?.language || DEFAULT_SETTINGS.language
    return I18N[language]?.[key] || I18N.zh[key] || key
  }

  attributeLabel(name) {
    const language = this.settings?.language || DEFAULT_SETTINGS.language
    return I18N[language]?.attributeLabels?.[name] || I18N.zh.attributeLabels[name] || name
  }

  async toggleLanguage() {
    this.settings.language = this.settings.language === 'zh' ? 'en' : 'zh'
    await this.saveData(this.settings)
  }
}

class SvgEditorView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf)
    this.plugin = plugin
    this.file = null
    this.data = ''
    this.previewTimer = null
    this.dirty = false
    this.selectedPath = null
    this.selectedPaths = []
    this.renderedSvg = null
    this.dragState = null
    this.resizeState = null
    this.skipNextClick = false
    this.inlineTextEditor = null
    this.undoStack = []
    this.redoStack = []
    this.historyLimit = 50
    this.sourceHistoryTimer = null
    this.sourceHistorySnapshot = ''
  }

  t(key) {
    return this.plugin.t(key)
  }

  getViewType() {
    return VIEW_TYPE_SVG_EDITOR
  }

  getDisplayText() {
    return this.file ? this.file.basename : 'SVG Editor'
  }

  getIcon() {
    return 'image'
  }

  async setState(state, result) {
    await super.setState(state, result)
    if (state && state.file) await this.loadFileByPath(state.file)
  }

  getState() {
    return {
      file: this.file ? this.file.path : null,
    }
  }

  async onOpen() {
    const root = this.containerEl.children[1]
    root.empty()
    root.addClass('svg-editor-view')

    const toolbar = root.createDiv({ cls: 'svg-editor-toolbar' })
    this.statusEl = toolbar.createDiv({ cls: 'svg-editor-status', text: this.t('ready') })

    const actions = toolbar.createDiv({ cls: 'svg-editor-actions' })
    this.undoButton = actions.createEl('button', { text: this.t('undo') })
    this.redoButton = actions.createEl('button', { text: this.t('redo') })
    this.saveButton = actions.createEl('button', { text: this.t('save') })
    this.reloadButton = actions.createEl('button', { text: this.t('reload') })
    this.addTextButton = actions.createEl('button', { text: this.t('addText') })
    this.addRectButton = actions.createEl('button', { text: this.t('addRect') })
    this.addCircleButton = actions.createEl('button', { text: this.t('addCircle') })
    this.languageButton = actions.createEl('button', { text: this.t('languageToggle') })
    this.wrapToggle = actions.createEl('button', { text: this.t('wrapOff') })

    const body = root.createDiv({ cls: 'svg-editor-body' })
    const sourcePane = body.createDiv({ cls: 'svg-editor-pane svg-editor-source-pane' })
    const layersPane = body.createDiv({ cls: 'svg-editor-pane svg-editor-layers-pane' })
    const canvasPane = body.createDiv({ cls: 'svg-editor-pane svg-editor-canvas-pane' })
    const inspectorPane = body.createDiv({ cls: 'svg-editor-pane svg-editor-inspector-pane' })

    sourcePane.createDiv({ cls: 'svg-editor-pane-title', text: this.t('source') })
    layersPane.createDiv({ cls: 'svg-editor-pane-title', text: this.t('layers') })
    canvasPane.createDiv({ cls: 'svg-editor-pane-title', text: this.t('canvas') })
    inspectorPane.createDiv({ cls: 'svg-editor-pane-title', text: this.t('inspector') })

    this.textarea = sourcePane.createEl('textarea', {
      cls: 'svg-editor-source',
      attr: {
        spellcheck: 'false',
        autocapitalize: 'off',
        autocomplete: 'off',
      },
    })

    this.layers = layersPane.createDiv({ cls: 'svg-editor-layers' })
    this.preview = canvasPane.createDiv({ cls: 'svg-editor-preview' })
    this.inspector = inspectorPane.createDiv({ cls: 'svg-editor-inspector' })
    this.textarea.value = this.data

    this.textarea.addEventListener('input', () => {
      this.queueSourceHistory()
      this.data = this.textarea.value
      this.dirty = true
      this.selectedPath = null
      this.selectedPaths = []
      this.renderLayers(null)
      this.renderInspector(null)
      this.schedulePreview()
    })

    this.undoButton.addEventListener('click', () => this.undo())
    this.redoButton.addEventListener('click', () => this.redo())
    this.saveButton.addEventListener('click', () => this.saveFile())
    this.reloadButton.addEventListener('click', () => this.reloadFile())
    this.addTextButton.addEventListener('click', () => this.insertElement('text'))
    this.addRectButton.addEventListener('click', () => this.insertElement('rect'))
    this.addCircleButton.addEventListener('click', () => this.insertElement('circle'))
    this.languageButton.addEventListener('click', () => this.switchLanguage())

    this.wrapToggle.addEventListener('click', () => {
      this.textarea.toggleClass('is-wrapped', !this.textarea.hasClass('is-wrapped'))
      const wrapped = this.textarea.hasClass('is-wrapped')
      this.wrapToggle.setText(wrapped ? this.t('wrapOn') : this.t('wrapOff'))
    })

    root.addEventListener('keydown', (event) => this.handleKeydown(event))

    this.render()
    this.updateHistoryButtons()
  }

  async switchLanguage() {
    if (this.textarea) this.data = this.textarea.value
    await this.plugin.toggleLanguage()
    this.closeInlineTextEditor(true)
    await this.onOpen()
  }

  async loadFileByPath(path) {
    const file = this.app.vault.getAbstractFileByPath(path)
    if (!(file instanceof TFile)) {
      new Notice(`${this.t('fileNotFound')}: ${path}`)
      return
    }

    this.file = file
    this.data = await this.app.vault.read(file)
    this.dirty = false
    this.selectedPath = null
    this.selectedPaths = []
    this.undoStack = []
    this.redoStack = []
    this.sourceHistorySnapshot = this.data
    if (this.textarea) this.textarea.value = this.data
    this.render()
    this.updateHistoryButtons()
  }

  async saveFile() {
    if (!this.file) {
      new Notice(this.t('noOpenFile'))
      return
    }

    this.flushSourceHistory()
    await this.ensureBackupFile()
    await this.app.vault.modify(this.file, this.data)
    this.dirty = false
    new Notice(this.t('saved'))
    this.setStatus(`${this.t('savedStatus')} · ${this.describeSvg(this.data)}`)
  }

  async reloadFile() {
    if (!this.file) return
    this.data = await this.app.vault.read(this.file)
    this.dirty = false
    this.selectedPath = null
    this.selectedPaths = []
    this.undoStack = []
    this.redoStack = []
    this.sourceHistorySnapshot = this.data
    if (this.textarea) this.textarea.value = this.data
    this.render()
    this.renderInspector(null)
    this.updateHistoryButtons()
    this.setStatus(`${this.t('reloadedStatus')} · ${this.describeSvg(this.data)}`)
  }

  render() {
    if (!this.preview) return
    const prefix = this.dirty ? `${this.t('unsavedStatus')} · ` : ''
    this.setStatus(prefix + this.describeSvg(this.data))
    this.preview.empty()
    this.renderedSvg = null

    const doc = this.parseSvgDocument()
    if (!doc) {
      this.preview.createDiv({
        cls: 'svg-editor-error',
        text: this.t('parseError'),
      })
      this.renderLayers(null)
      return
    }

    const importedSvg = document.importNode(doc.documentElement, true)
    this.renderedSvg = importedSvg
    this.renderLayers(doc.documentElement)
    this.preview.appendChild(importedSvg)
    this.addHitOverlays(importedSvg)
    this.bindPreviewSelection(importedSvg)
    this.markSelectedElement(importedSvg, this.selectedPath)
    this.renderInspector(this.getSelectedElement(), this.getRenderedSelectedElement())
  }

  schedulePreview() {
    window.clearTimeout(this.previewTimer)
    this.previewTimer = window.setTimeout(() => this.render(), 150)
  }

  setStatus(text) {
    if (this.statusEl) this.statusEl.setText(text)
  }

  pushHistory(snapshot = this.data) {
    if (!snapshot || snapshot === this.data && this.undoStack[this.undoStack.length - 1] === snapshot) return
    if (this.undoStack[this.undoStack.length - 1] === snapshot) return

    this.undoStack.push(snapshot)
    if (this.undoStack.length > this.historyLimit) this.undoStack.shift()
    this.redoStack = []
    this.updateHistoryButtons()
  }

  queueSourceHistory() {
    if (!this.sourceHistorySnapshot) this.sourceHistorySnapshot = this.data

    window.clearTimeout(this.sourceHistoryTimer)
    this.sourceHistoryTimer = window.setTimeout(() => {
      if (this.sourceHistorySnapshot && this.sourceHistorySnapshot !== this.data) {
        this.pushHistory(this.sourceHistorySnapshot)
      }
      this.sourceHistorySnapshot = this.data
    }, 600)
  }

  flushSourceHistory() {
    window.clearTimeout(this.sourceHistoryTimer)
    if (this.sourceHistorySnapshot && this.sourceHistorySnapshot !== this.data) {
      this.pushHistory(this.sourceHistorySnapshot)
    }
    this.sourceHistorySnapshot = this.data
  }

  applyHistorySnapshot(snapshot) {
    this.data = snapshot
    this.dirty = true
    this.selectedPath = null
    this.selectedPaths = []
    this.sourceHistorySnapshot = snapshot
    if (this.textarea) this.textarea.value = this.data
    this.render()
    this.renderInspector(null)
    this.updateHistoryButtons()
  }

  undo() {
    if (!this.undoStack.length) return
    const previous = this.undoStack.pop()
    this.redoStack.push(this.data)
    this.applyHistorySnapshot(previous)
  }

  redo() {
    if (!this.redoStack.length) return
    const next = this.redoStack.pop()
    this.undoStack.push(this.data)
    this.applyHistorySnapshot(next)
  }

  updateHistoryButtons() {
    if (this.undoButton) this.undoButton.disabled = this.undoStack.length === 0
    if (this.redoButton) this.redoButton.disabled = this.redoStack.length === 0
  }

  handleKeydown(event) {
    const mod = event.ctrlKey || event.metaKey
    const key = event.key.toLowerCase()

    if (mod && key === 's') {
      event.preventDefault()
      this.saveFile()
      return
    }

    if (mod && key === 'z') {
      event.preventDefault()
      if (event.shiftKey) this.redo()
      else this.undo()
      return
    }

    if (mod && key === 'y') {
      event.preventDefault()
      this.redo()
      return
    }

    if (this.isTypingTarget(event.target)) return

    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (!this.selectedPath) return
      event.preventDefault()
      this.deleteSelectedElement()
      return
    }

    if (mod && key === 'd') {
      if (!this.selectedPath) return
      event.preventDefault()
      this.duplicateSelectedElement()
      return
    }

    const arrows = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    }

    if (event.key in arrows && this.selectedPath) {
      event.preventDefault()
      const [dx, dy] = arrows[event.key]
      const step = event.shiftKey ? 10 : 1
      this.nudgeSelectedElement(dx * step, dy * step)
    }
  }

  isTypingTarget(target) {
    if (!(target instanceof HTMLElement)) return false
    const tag = target.tagName.toLowerCase()
    return tag === 'input' || tag === 'textarea' || target.isContentEditable
  }

  openElementMenu(event) {
    if (!this.selectedPath) return

    const menu = new Menu()
    menu.addItem((item) => item.setTitle(this.t('duplicate')).setIcon('copy').onClick(() => this.duplicateSelectedElement()))
    menu.addItem((item) => item.setTitle(this.t('delete')).setIcon('trash').onClick(() => this.deleteSelectedElement()))
    menu.addSeparator()
    menu.addItem((item) => item.setTitle(this.t('moveUpLayer')).setIcon('arrow-up').onClick(() => this.moveSelectedElement(-1)))
    menu.addItem((item) => item.setTitle(this.t('moveDownLayer')).setIcon('arrow-down').onClick(() => this.moveSelectedElement(1)))
    menu.addItem((item) => item.setTitle(this.t('bringToFront')).setIcon('bring-to-front').onClick(() => this.moveSelectedElementToEdge(1)))
    menu.addItem((item) => item.setTitle(this.t('sendToBack')).setIcon('send-to-back').onClick(() => this.moveSelectedElementToEdge(-1)))
    menu.addSeparator()
    menu.addItem((item) => item.setTitle(this.t('copyId')).setIcon('clipboard-copy').onClick(() => this.copySelectedId()))
    menu.showAtMouseEvent(event)
  }

  async ensureBackupFile() {
    if (!this.file) return

    const backupPath = `${this.file.path}.bak`
    if (this.app.vault.getAbstractFileByPath(backupPath)) return

    const original = await this.app.vault.read(this.file)
    await this.app.vault.create(backupPath, original)
    new Notice(`${this.t('backupCreated')}: ${backupPath}`)
  }

  describeSvg(svg) {
    const viewBox = svg.match(/\bviewBox\s*=\s*["']([^"']+)["']/i)?.[1]
    const width = svg.match(/\bwidth\s*=\s*["']([^"']+)["']/i)?.[1]
    const height = svg.match(/\bheight\s*=\s*["']([^"']+)["']/i)?.[1]
    const size = `${svg.length.toLocaleString()} ${this.t('chars')}`
    if (viewBox) return `viewBox ${viewBox} · ${size}`
    if (width || height) return `${width || '?'} x ${height || '?'} · ${size}`
    return size
  }

  parseSvgDocument() {
    const parser = new DOMParser()
    const doc = parser.parseFromString(this.data, 'image/svg+xml')
    if (doc.querySelector('parsererror')) return null
    if (!doc.documentElement || doc.documentElement.tagName.toLowerCase() !== 'svg') return null
    return doc
  }

  bindPreviewSelection(svg) {
    svg.addEventListener('click', (event) => {
      if (this.skipNextClick) {
        this.skipNextClick = false
        return
      }
      const target = this.getEventTargetElement(event.target)
      if (!(target instanceof SVGElement) || target.tagName.toLowerCase() === 'svg') {
        this.clearSelection()
        this.renderInspector(null)
        return
      }

      event.preventDefault()
      event.stopPropagation()

      const path = this.getElementPath(target)
      if (event.shiftKey || event.ctrlKey || event.metaKey || !this.isPathSelected(path)) {
        this.selectFromEvent(path, event)
      }
      this.markSelectedElement(svg, this.selectedPath)
      this.markSelectedLayer()
      this.renderInspector(this.getSelectedElement(), target)

      if (event.detail === 2) {
        const textTarget = this.getEditableTextElement(target)
        if (textTarget) this.editTextElement(textTarget)
      }
    })

    svg.addEventListener('dblclick', (event) => {
      const target = this.getEventTargetElement(event.target)
      const textTarget = this.getEditableTextElement(target)
      if (!textTarget) return

      event.preventDefault()
      event.stopPropagation()

      this.setSingleSelection(this.getElementPath(textTarget))
      this.markSelectedElement(svg, this.selectedPath)
      this.markSelectedLayer()
      this.editTextElement(textTarget)
    }, true)

    svg.addEventListener('contextmenu', (event) => {
      const target = this.getEventTargetElement(event.target)
      if (!(target instanceof SVGElement) || target.tagName.toLowerCase() === 'svg') return

      event.preventDefault()
      event.stopPropagation()

      const path = this.getElementPath(target)
      if (!this.isPathSelected(path)) this.setSingleSelection(path)
      else this.selectedPath = path
      this.markSelectedElement(svg, this.selectedPath)
      this.markSelectedLayer()
      this.renderInspector(this.getSelectedElement(), target)
      this.openElementMenu(event)
    })

    svg.addEventListener('pointerdown', (event) => {
      if (this.inlineTextEditor) this.closeInlineTextEditor(true)

      const resizeHandle = event.target instanceof SVGElement ? event.target.getAttribute('data-editor-resize-handle') : ''
      if (resizeHandle) {
        this.startResize(svg, event, resizeHandle)
        return
      }

      const target = this.getEventTargetElement(event.target)
      if (!(target instanceof SVGElement) || target.tagName.toLowerCase() === 'svg') return
      if (event.button !== 0) return

      event.preventDefault()
      event.stopPropagation()

      const path = this.getElementPath(target)
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        this.selectFromEvent(path, event)
        this.markSelectedElement(svg, this.selectedPath)
        this.markSelectedLayer()
        this.renderInspector(this.getSelectedElement(), this.getRenderedSelectedElement())
        return
      }

      if (!this.isPathSelected(path)) this.setSingleSelection(path)
      else this.selectedPath = path
      this.markSelectedElement(svg, this.selectedPath)
      this.markSelectedLayer()

      const point = this.getSvgPoint(svg, event)
      const paths = this.selectedPaths.length ? this.selectedPaths.map((selected) => [...selected]) : [[...this.selectedPath]]
      this.dragState = {
        paths,
        elements: paths
          .map((selectedPath) => {
            const element = this.findElementByPath(svg, selectedPath)
            return element ? { path: selectedPath, element, originalTransform: element.getAttribute('transform') || '' } : null
          })
          .filter(Boolean),
        startX: point.x,
        startY: point.y,
        dx: 0,
        dy: 0,
        didDrag: false,
      }

      const captureTarget = event.target
      if (captureTarget && typeof captureTarget.setPointerCapture === 'function') {
        captureTarget.setPointerCapture(event.pointerId)
      }
    })

    svg.addEventListener('pointermove', (event) => {
      if (this.resizeState) {
        this.updateResizePreview(svg, event)
        return
      }

      if (!this.dragState) return

      event.preventDefault()
      const point = this.getSvgPoint(svg, event)
      const dx = point.x - this.dragState.startX
      const dy = point.y - this.dragState.startY

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) this.dragState.didDrag = true
      this.dragState.dx = dx
      this.dragState.dy = dy

      for (const item of this.dragState.elements) {
        item.element.setAttribute('transform', this.composeTranslatedTransform(item.originalTransform, dx, dy))
      }
      this.renderInspector(this.getSelectedElement(), this.getRenderedSelectedElement())
    })

    svg.addEventListener('pointerup', (event) => {
      if (this.resizeState) {
        this.finishResize(event)
        return
      }
      this.finishDrag(event)
    })

    svg.addEventListener('pointercancel', (event) => {
      if (this.resizeState) {
        this.finishResize(event)
        return
      }
      this.finishDrag(event)
    })
  }

  addHitOverlays(svg) {
    const overlayLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    overlayLayer.classList.add('svg-editor-hit-overlays')

    const candidates = Array.from(svg.querySelectorAll('path,line,polyline,polygon'))
      .filter((element) => !element.closest('.svg-editor-hit-overlays') && !element.closest('.svg-editor-selection-controls'))

    for (const element of candidates) {
      const path = this.getElementPath(element)
      const overlay = element.cloneNode(false)
      overlay.removeAttribute('id')
      overlay.removeAttribute('class')
      overlay.setAttribute('data-editor-target-path', path.join('.'))
      overlay.setAttribute('fill', 'none')
      overlay.setAttribute('stroke', 'transparent')
      overlay.setAttribute('stroke-width', String(Math.max(12, Number(element.getAttribute('stroke-width')) || 0)))
      overlay.setAttribute('stroke-linecap', 'round')
      overlay.setAttribute('stroke-linejoin', 'round')
      overlay.setAttribute('pointer-events', 'stroke')
      overlayLayer.appendChild(overlay)
    }

    if (overlayLayer.children.length) svg.appendChild(overlayLayer)
  }

  getEventTargetElement(target) {
    if (!(target instanceof SVGElement)) return null

    const targetPath = target.getAttribute('data-editor-target-path')
    if (targetPath && this.renderedSvg) {
      const path = targetPath.split('.').filter(Boolean).map((part) => Number(part))
      return this.findElementByPath(this.renderedSvg, path)
    }

    return target
  }

  finishDrag(event) {
    if (!this.dragState) return

    const state = this.dragState
    this.dragState = null

    const captureTarget = event?.target
    if (captureTarget && typeof captureTarget.releasePointerCapture === 'function') {
      try {
        captureTarget.releasePointerCapture(event.pointerId)
      } catch {
        // Pointer capture may already be released by the browser.
      }
    }

    if (!state.didDrag) {
      this.renderInspector(this.getSelectedElement(), this.getRenderedSelectedElement())
      return
    }
    this.skipNextClick = true

    this.updateElementsByPaths(state.elements, (selected, item) => {
      selected.setAttribute('transform', this.composeTranslatedTransform(item.originalTransform, state.dx, state.dy))
    })
  }

  getSvgPoint(svg, event) {
    const point = svg.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY

    const matrix = svg.getScreenCTM()
    if (!matrix) return { x: event.clientX, y: event.clientY }

    const transformed = point.matrixTransform(matrix.inverse())
    return { x: transformed.x, y: transformed.y }
  }

  getLocalPoint(element, event, inverseMatrix) {
    const svg = element.ownerSVGElement || this.renderedSvg
    if (!svg) return { x: event.clientX, y: event.clientY }

    const point = svg.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY

    if (inverseMatrix) {
      const transformed = point.matrixTransform(inverseMatrix)
      return { x: transformed.x, y: transformed.y }
    }

    const matrix = element.getCTM()
    if (!matrix) return this.getSvgPoint(svg, event)

    const transformed = point.matrixTransform(matrix.inverse())
    return { x: transformed.x, y: transformed.y }
  }

  clampScale(value) {
    if (!Number.isFinite(value)) return 1
    const sign = value < 0 ? -1 : 1
    return sign * Math.max(0.05, Math.min(20, Math.abs(value)))
  }

  composeTranslatedTransform(originalTransform, dx, dy) {
    const trimmed = (originalTransform || '').trim()
    const mergeable = trimmed.match(/^(.*?)(?:\s*translate\(\s*([-+]?\d*\.?\d+)(?:[,\s]+([-+]?\d*\.?\d+))?\s*\)\s*)$/)

    if (mergeable) {
      const prefix = mergeable[1].trim()
      const x = this.formatNumber((Number(mergeable[2]) || 0) + dx)
      const y = this.formatNumber((Number(mergeable[3]) || 0) + dy)
      const translate = `translate(${x} ${y})`
      return prefix ? `${prefix} ${translate}` : translate
    }

    const x = this.formatNumber(dx)
    const y = this.formatNumber(dy)
    const translate = `translate(${x} ${y})`
    return trimmed ? `${trimmed} ${translate}` : translate
  }

  composeScaledTransform(originalTransform, originX, originY, sx, sy) {
    const trimmed = (originalTransform || '').trim()
    const transform = `translate(${this.formatNumber(originX)} ${this.formatNumber(originY)}) scale(${this.formatNumber(sx)} ${this.formatNumber(sy)}) translate(${this.formatNumber(-originX)} ${this.formatNumber(-originY)})`
    return trimmed ? `${trimmed} ${transform}` : transform
  }

  clearSelection() {
    this.selectedPath = null
    this.selectedPaths = []
    if (this.renderedSvg) this.markSelectedElement(this.renderedSvg, null)
    this.markSelectedLayer()
  }

  pathKey(path) {
    return Array.isArray(path) ? path.join('.') : ''
  }

  samePath(a, b) {
    return this.pathKey(a) === this.pathKey(b)
  }

  setSingleSelection(path) {
    this.selectedPath = path
    this.selectedPaths = path ? [path] : []
  }

  toggleSelection(path) {
    const key = this.pathKey(path)
    const index = this.selectedPaths.findIndex((selected) => this.pathKey(selected) === key)
    if (index >= 0) {
      this.selectedPaths.splice(index, 1)
      this.selectedPath = this.selectedPaths[this.selectedPaths.length - 1] || null
    } else {
      this.selectedPaths.push(path)
      this.selectedPath = path
    }
  }

  isPathSelected(path) {
    const key = this.pathKey(path)
    return this.selectedPaths.some((selected) => this.pathKey(selected) === key)
  }

  selectFromEvent(path, event) {
    if (event.shiftKey || event.ctrlKey || event.metaKey) this.toggleSelection(path)
    else this.setSingleSelection(path)
  }

  getElementPath(element) {
    const path = []
    let current = element

    while (current && current instanceof SVGElement && current.tagName.toLowerCase() !== 'svg') {
      const parent = current.parentElement
      if (!parent) break
      const children = Array.from(parent.children).filter((child) => !this.isEditorOverlay(child))
      path.unshift(children.indexOf(current))
      current = parent
    }

    return path
  }

  findElementByPath(root, path) {
    let current = root
    for (const index of path || []) {
      const children = Array.from(current.children).filter((child) => !this.isEditorOverlay(child))
      current = children[index]
      if (!current) return null
    }
    return current
  }

  isEditorOverlay(element) {
    return element.classList.contains('svg-editor-hit-overlays') || element.classList.contains('svg-editor-selection-controls')
  }

  markSelectedElement(svg, path) {
    svg.querySelectorAll('.svg-editor-selected-element').forEach((element) => {
      element.classList.remove('svg-editor-selected-element')
    })
    svg.querySelectorAll('.svg-editor-selection-controls').forEach((element) => element.remove())

    const paths = this.selectedPaths.length ? this.selectedPaths : path ? [path] : []
    for (const selectedPath of paths) {
      const selected = this.findElementByPath(svg, selectedPath)
      if (selected) selected.classList.add('svg-editor-selected-element')
    }

    if (paths.length === 1) this.renderResizeControls(svg, paths[0])
  }

  renderResizeControls(svg, path) {
    const selected = this.findElementByPath(svg, path)
    if (!selected || selected.tagName.toLowerCase() === 'svg') return
    const box = this.getElementSvgBounds(selected)
    if (!box) return

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    group.classList.add('svg-editor-selection-controls')
    group.setAttribute('data-editor-target-path', path.join('.'))

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', String(box.x))
    rect.setAttribute('y', String(box.y))
    rect.setAttribute('width', String(box.width))
    rect.setAttribute('height', String(box.height))
    rect.classList.add('svg-editor-selection-box')
    group.appendChild(rect)

    const handles = [
      ['nw', box.x, box.y],
      ['ne', box.x + box.width, box.y],
      ['sw', box.x, box.y + box.height],
      ['se', box.x + box.width, box.y + box.height],
    ]

    for (const [handle, x, y] of handles) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', String(x))
      circle.setAttribute('cy', String(y))
      circle.setAttribute('r', '6')
      circle.setAttribute('data-editor-resize-handle', handle)
      circle.classList.add('svg-editor-resize-handle', `is-${handle}`)
      group.appendChild(circle)
    }

    svg.appendChild(group)
  }

  getElementSvgBounds(element) {
    const svg = element.ownerSVGElement || this.renderedSvg
    if (!svg || typeof element.getBBox !== 'function') return null

    let bbox
    try {
      bbox = element.getBBox()
    } catch {
      return null
    }

    const matrix = element.getCTM()
    const rootMatrix = svg.getScreenCTM()
    if (!matrix || !rootMatrix) return null

    const toSvg = rootMatrix.inverse().multiply(matrix)
    const points = [
      [bbox.x, bbox.y],
      [bbox.x + bbox.width, bbox.y],
      [bbox.x, bbox.y + bbox.height],
      [bbox.x + bbox.width, bbox.y + bbox.height],
    ].map(([x, y]) => {
      const point = svg.createSVGPoint()
      point.x = x
      point.y = y
      return point.matrixTransform(toSvg)
    })

    const xs = points.map((point) => point.x)
    const ys = points.map((point) => point.y)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)

    if (![minX, maxX, minY, maxY].every((value) => Number.isFinite(value))) return null
    return {
      x: minX,
      y: minY,
      width: Math.max(1, maxX - minX),
      height: Math.max(1, maxY - minY),
    }
  }

  startResize(svg, event, handle) {
    if (!this.selectedPath || this.selectedPaths.length !== 1) return
    const element = this.getRenderedSelectedElement()
    if (!element || typeof element.getBBox !== 'function') return

    let box
    try {
      box = element.getBBox()
    } catch {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const matrix = element.getCTM()
    const inverseMatrix = matrix ? matrix.inverse() : null
    const start = this.getLocalPoint(element, event, inverseMatrix)
    const origin = {
      x: handle.includes('w') ? box.x + box.width : box.x,
      y: handle.includes('n') ? box.y + box.height : box.y,
    }

    this.resizeState = {
      path: [...this.selectedPath],
      element,
      handle,
      startX: start.x,
      startY: start.y,
      originX: origin.x,
      originY: origin.y,
      originalTransform: element.getAttribute('transform') || '',
      nextTransform: element.getAttribute('transform') || '',
      inverseMatrix,
      didResize: false,
    }

    const captureTarget = event.target
    if (captureTarget && typeof captureTarget.setPointerCapture === 'function') {
      captureTarget.setPointerCapture(event.pointerId)
    }
  }

  updateResizePreview(svg, event) {
    if (!this.resizeState) return
    event.preventDefault()

    const state = this.resizeState
    const point = this.getLocalPoint(state.element, event, state.inverseMatrix)
    const sxBase = state.startX - state.originX
    const syBase = state.startY - state.originY
    if (Math.abs(sxBase) < 0.01 || Math.abs(syBase) < 0.01) return

    let sx = (point.x - state.originX) / sxBase
    let sy = (point.y - state.originY) / syBase
    if (event.shiftKey) {
      const uniform = Math.max(Math.abs(sx), Math.abs(sy))
      sx = Math.sign(sx || 1) * uniform
      sy = Math.sign(sy || 1) * uniform
    }

    sx = this.clampScale(sx)
    sy = this.clampScale(sy)
    if (Math.abs(sx - 1) > 0.01 || Math.abs(sy - 1) > 0.01) state.didResize = true

    state.nextTransform = this.composeScaledTransform(state.originalTransform, state.originX, state.originY, sx, sy)
    state.element.setAttribute('transform', state.nextTransform)
    const controls = svg.querySelector('.svg-editor-selection-controls')
    if (controls) controls.setAttribute('transform', state.nextTransform)
    this.renderInspector(this.getSelectedElement(), state.element)
  }

  finishResize(event) {
    if (!this.resizeState) return
    const state = this.resizeState
    this.resizeState = null

    const captureTarget = event?.target
    if (captureTarget && typeof captureTarget.releasePointerCapture === 'function') {
      try {
        captureTarget.releasePointerCapture(event.pointerId)
      } catch {
        // Pointer capture may already be released by the browser.
      }
    }

    if (!state.didResize) {
      this.renderInspector(this.getSelectedElement(), this.getRenderedSelectedElement())
      return
    }

    this.skipNextClick = true
    this.updateSelectedElement((selected) => {
      selected.setAttribute('transform', state.nextTransform)
    })
  }

  renderLayers(svg) {
    if (!this.layers) return
    this.layers.empty()

    if (!svg) {
      this.layers.createDiv({
        cls: 'svg-editor-layers-empty',
        text: this.t('emptyLayers'),
      })
      return
    }

    this.createLayerRow(svg, [], 0)
    this.markSelectedLayer()
  }

  createLayerRow(element, path, depth) {
    const row = this.layers.createDiv({ cls: 'svg-editor-layer-row' })
    row.dataset.path = path.join('.')
    row.style.paddingLeft = `${8 + depth * 14}px`

    const tag = element.tagName.toLowerCase()
    row.createSpan({ cls: 'svg-editor-layer-tag', text: tag })

    const label = this.getLayerLabel(element)
    if (label) row.createSpan({ cls: 'svg-editor-layer-label', text: label })

    row.addEventListener('click', (event) => {
      if (tag === 'svg') {
        this.clearSelection()
        this.markSelectedLayer()
        this.renderInspector(null)
        return
      }

      this.selectFromEvent(path, event)
      this.markSelectedElement(this.renderedSvg, this.selectedPath)
      this.markSelectedLayer()
      this.renderInspector(this.getSelectedElement(), this.getRenderedSelectedElement())
    })

    row.addEventListener('contextmenu', (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (tag === 'svg') return
      if (!this.isPathSelected(path)) this.setSingleSelection(path)
      else this.selectedPath = path
      this.markSelectedElement(this.renderedSvg, this.selectedPath)
      this.markSelectedLayer()
      this.renderInspector(this.getSelectedElement(), this.getRenderedSelectedElement())
      this.openElementMenu(event)
    })

    Array.from(element.children)
      .filter((child) => child instanceof SVGElement)
      .forEach((child, index) => this.createLayerRow(child, [...path, index], depth + 1))
  }

  getLayerLabel(element) {
    const id = element.getAttribute('id')
    if (id) return `#${id}`

    const className = element.getAttribute('class')
    if (className) return `.${className}`

    const tag = element.tagName.toLowerCase()
    if (tag === 'text' || tag === 'tspan') return this.truncate((element.textContent || '').trim(), 24)

    return ''
  }

  markSelectedLayer() {
    if (!this.layers) return
    const selectedKeys = new Set(this.selectedPaths.map((path) => this.pathKey(path)))

    this.layers.querySelectorAll('.svg-editor-layer-row').forEach((row) => {
      row.classList.toggle('is-selected', selectedKeys.has(row.dataset.path || ''))
    })
  }

  getSelectedElement() {
    if (!this.selectedPath) return null
    const doc = this.parseSvgDocument()
    if (!doc) return null
    return this.findElementByPath(doc.documentElement, this.selectedPath)
  }

  getRenderedSelectedElement() {
    if (!this.selectedPath || !this.renderedSvg) return null
    return this.findElementByPath(this.renderedSvg, this.selectedPath)
  }

  getRenderedElementByPath(path) {
    if (!path || !this.renderedSvg) return null
    return this.findElementByPath(this.renderedSvg, path)
  }

  renderInspector(element, renderedElement) {
    if (!this.inspector) return
    this.inspector.empty()

    if (!element) {
      this.inspector.createDiv({
        cls: 'svg-editor-inspector-empty',
        text: this.t('inspectorEmpty'),
      })
      return
    }

    const header = this.inspector.createDiv({ cls: 'svg-editor-inspector-header' })
    header.createSpan({ cls: 'svg-editor-inspector-tag', text: `<${element.tagName.toLowerCase()}>` })

    const id = element.getAttribute('id')
    const className = element.getAttribute('class')
    if (id) header.createSpan({ cls: 'svg-editor-inspector-meta', text: `#${id}` })
    if (className) header.createSpan({ cls: 'svg-editor-inspector-meta', text: `.${className}` })

    this.renderElementActions()
    this.renderElementSummary(element)
    this.renderVisualBounds(renderedElement)
    this.renderComputedStyle(renderedElement)

    const attributes = this.getEditableAttributes(element)
    for (const name of attributes) this.createAttributeField(element, name, renderedElement)

    if (this.isTextLikeElement(element)) this.createTextField(element)
  }

  renderElementActions() {
    const actions = this.inspector.createDiv({ cls: 'svg-editor-element-actions' })

    this.createActionButton(actions, this.t('moveUp'), () => this.moveSelectedElement(-1))
    this.createActionButton(actions, this.t('moveDown'), () => this.moveSelectedElement(1))
    this.createActionButton(actions, this.t('duplicate'), () => this.duplicateSelectedElement())
    this.createActionButton(actions, this.t('delete'), () => this.deleteSelectedElement(), 'is-danger')
  }

  createActionButton(parent, label, onClick, extraClass) {
    const button = parent.createEl('button', {
      cls: extraClass ? `svg-editor-action-button ${extraClass}` : 'svg-editor-action-button',
      text: label,
    })
    button.addEventListener('click', onClick)
    return button
  }

  createAttributeField(element, name, renderedElement) {
    const row = this.inspector.createDiv({ cls: 'svg-editor-field' })
    row.createEl('label', { text: this.getAttributeLabel(name) })
    const controls = row.createDiv({ cls: 'svg-editor-field-controls' })
    const attributeValue = element.getAttribute(name) || ''
    const computedValue = this.getComputedAttributeValue(renderedElement, name)
    const displayValue = attributeValue || computedValue || ''
    const isInherited = !attributeValue && Boolean(computedValue)

    if ((name === 'fill' || name === 'stroke') && this.isEditableColor(displayValue)) {
      const colorInput = controls.createEl('input', {
        cls: 'svg-editor-color-input',
        type: 'color',
      })
      colorInput.value = this.toHexColor(displayValue)
      colorInput.addEventListener('input', () => {
        input.value = colorInput.value
        this.updateSelectedElement((selected) => this.setElementValue(selected, name, colorInput.value))
      })
    }

    const input = row.createEl('input', {
      cls: 'svg-editor-text-input',
      attr: {
        value: displayValue,
        placeholder: this.t('emptyValue'),
      },
    })
    controls.appendChild(input)

    if (isInherited) {
      row.createDiv({
        cls: 'svg-editor-field-hint',
        text: this.t('inheritedStyleHint'),
      })
    }

    input.addEventListener('change', () => {
      this.updateSelectedElement((selected) => {
        const value = input.value.trim()
        this.setElementValue(selected, name, value)
      })
    })
  }

  setElementValue(element, name, value) {
    if (this.isCssBackedAttribute(name)) {
      if (value) {
        element.style.setProperty(name, value)
      } else {
        element.style.removeProperty(name)
        element.removeAttribute(name)
      }
      return
    }

    if (value) element.setAttribute(name, value)
    else element.removeAttribute(name)
  }

  isCssBackedAttribute(name) {
    return new Set([
      'fill',
      'stroke',
      'stroke-width',
      'opacity',
      'font-size',
      'font-family',
      'font-weight',
    ]).has(name)
  }

  getComputedAttributeValue(element, name) {
    if (!element || typeof window.getComputedStyle !== 'function') return ''

    const styleName = this.getCssPropertyName(name)
    if (!styleName) return ''

    const value = window.getComputedStyle(element).getPropertyValue(styleName).trim()
    if (!value || value === 'none' || value === 'normal') return ''

    return value
  }

  getCssPropertyName(attributeName) {
    const supported = new Set([
      'fill',
      'stroke',
      'stroke-width',
      'opacity',
      'font-size',
      'font-family',
      'font-weight',
    ])
    return supported.has(attributeName) ? attributeName : ''
  }

  isEditableColor(value) {
    return this.toHexColor(value) !== ''
  }

  toHexColor(value) {
    if (!value) return ''
    const trimmed = value.trim()
    if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed
    if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
      return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`
    }

    const match = trimmed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
    if (!match) return ''

    const [, r, g, b] = match
    return `#${[r, g, b]
      .map((part) => Math.max(0, Math.min(255, Number(part))).toString(16).padStart(2, '0'))
      .join('')}`
  }

  renderElementSummary(element) {
    const tag = element.tagName.toLowerCase()
    const rows = [
      [this.t('type'), tag],
      [this.t('children'), String(element.children.length)],
    ]

    if (tag === 'g') rows.push([this.t('note'), this.t('groupSizeNote')])
    if (tag === 'path') rows.push([this.t('pathData'), this.truncate(element.getAttribute('d') || '', 42)])
    if (element.hasAttribute('transform')) {
      rows.push(['transform', this.truncate(element.getAttribute('transform') || '', 42)])
    }

    this.createInfoSection(this.t('element'), rows)
  }

  renderVisualBounds(renderedElement) {
    const bounds = this.getVisualBounds(renderedElement)
    if (!bounds) {
      this.createInfoSection(this.t('visualBounds'), [[this.t('status'), this.t('unavailable')]])
      return
    }

    this.createInfoSection(this.t('visualBounds'), [
      ['x', this.formatNumber(bounds.x)],
      ['y', this.formatNumber(bounds.y)],
      ['width', this.formatNumber(bounds.width)],
      ['height', this.formatNumber(bounds.height)],
    ])
  }

  renderComputedStyle(renderedElement) {
    if (!renderedElement || typeof window.getComputedStyle !== 'function') {
      this.createInfoSection(this.t('computedStyle'), [[this.t('status'), this.t('unavailable')]])
      return
    }

    const style = window.getComputedStyle(renderedElement)
    const rows = ['fill', 'stroke', 'stroke-width', 'opacity', 'font-size', 'font-family', 'font-weight']
      .map((name) => [name, this.truncate((style.getPropertyValue(name) || '').trim(), 42)])
      .filter(([, value]) => value && value !== 'normal')

    this.createInfoSection(this.t('computedStyle'), rows.length ? rows : [[this.t('status'), this.t('noComputedStyle')]])
  }

  getAttributeLabel(name) {
    return this.plugin.attributeLabel(name)
  }

  createInfoSection(title, rows) {
    const section = this.inspector.createDiv({ cls: 'svg-editor-info-section' })
    section.createDiv({ cls: 'svg-editor-info-title', text: title })

    for (const [name, value] of rows) {
      const row = section.createDiv({ cls: 'svg-editor-info-row' })
      row.createSpan({ cls: 'svg-editor-info-name', text: name })
      row.createSpan({ cls: 'svg-editor-info-value', text: value || this.t('emptyValue') })
    }
  }

  getVisualBounds(element) {
    if (!element || typeof element.getBBox !== 'function') return null

    try {
      const box = element.getBBox()
      return {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      }
    } catch {
      return null
    }
  }

  getEditableAttributes(element) {
    const tag = element.tagName.toLowerCase()
    const common = ['fill', 'stroke', 'stroke-width', 'opacity', 'transform']

    if (tag === 'rect' || tag === 'image') return [...common, 'x', 'y', 'width', 'height', 'rx', 'ry']
    if (tag === 'circle') return [...common, 'cx', 'cy', 'r']
    if (tag === 'ellipse') return [...common, 'cx', 'cy', 'rx', 'ry']
    if (tag === 'line') return [...common, 'x1', 'y1', 'x2', 'y2']
    if (tag === 'text' || tag === 'tspan') return [...common, 'x', 'y', 'font-size', 'font-family', 'font-weight']
    if (tag === 'path') return [...common, 'd']
    return common
  }

  formatNumber(value) {
    if (!Number.isFinite(value)) return ''
    return String(Math.round(value * 100) / 100)
  }

  truncate(value, maxLength) {
    if (!value) return ''
    return value.length > maxLength ? `${value.slice(0, maxLength - 1)}...` : value
  }

  createTextField(element) {
    const row = this.inspector.createDiv({ cls: 'svg-editor-field svg-editor-field-wide' })
    row.createEl('label', { text: this.t('textLabel') })
    const editButton = row.createEl('button', { cls: 'svg-editor-action-button', text: this.t('editText') })
    editButton.addEventListener('click', () => this.editSelectedText())
    const input = row.createEl('textarea', {
      attr: { rows: '3' },
    })
    input.value = element.textContent || ''

    input.addEventListener('change', () => {
      this.updateSelectedElement((selected) => {
        selected.textContent = input.value
      })
    })
  }

  getEditableTextElement(element) {
    let current = element
    while (current && current instanceof SVGElement) {
      if (this.isTextLikeElement(current)) return current
      if (current.tagName.toLowerCase() === 'svg') return null
      current = current.parentElement
    }
    return null
  }

  editSelectedText() {
    const element = this.getSelectedElement()
    if (!element || !this.isTextLikeElement(element)) return
    this.editTextElement(this.getRenderedSelectedElement() || element)
  }

  editTextElement(element) {
    const renderedElement = element && element.isConnected ? element : this.getRenderedSelectedElement()
    const sourceElement = this.getSelectedElement()
    if (!renderedElement || !sourceElement) return

    this.startInlineTextEdit(renderedElement, sourceElement.textContent || '')
  }

  startInlineTextEdit(renderedElement, currentText) {
    this.closeInlineTextEditor(false)

    const elementRect = renderedElement.getBoundingClientRect()
    const previewRect = this.preview.getBoundingClientRect()
    const computed = window.getComputedStyle(renderedElement)

    const editor = this.preview.createEl('textarea', {
      cls: 'svg-editor-inline-text-editor',
      attr: { rows: '1', spellcheck: 'false' },
    })
    editor.value = currentText

    const left = elementRect.left - previewRect.left + this.preview.scrollLeft
    const top = elementRect.top - previewRect.top + this.preview.scrollTop
    editor.style.left = `${Math.max(8, left - 6)}px`
    editor.style.top = `${Math.max(8, top - 6)}px`
    editor.style.width = `${Math.max(140, elementRect.width + 24)}px`
    editor.style.height = `${Math.max(36, elementRect.height + 18)}px`
    editor.style.fontFamily = computed.fontFamily
    editor.style.fontSize = computed.fontSize
    editor.style.fontWeight = computed.fontWeight
    editor.style.color = computed.fill || computed.color
    editor.style.textAlign = computed.textAnchor === 'middle' ? 'center' : computed.textAnchor === 'end' ? 'right' : 'left'

    let closed = false
    const outsidePointerDown = (event) => {
      if (event.target === editor || editor.contains(event.target)) return
      close(true)
    }

    const close = (commit) => {
      if (closed) return
      closed = true
      const nextText = editor.value
      document.removeEventListener('pointerdown', outsidePointerDown, true)
      editor.remove()
      this.inlineTextEditor = null
      if (commit && nextText !== currentText) {
        this.updateSelectedElement((selected) => {
          selected.textContent = nextText
        })
      } else {
        this.renderInspector(this.getSelectedElement(), this.getRenderedSelectedElement())
      }
    }

    editor.addEventListener('pointerdown', (event) => event.stopPropagation())
    editor.addEventListener('click', (event) => event.stopPropagation())
    editor.addEventListener('dblclick', (event) => event.stopPropagation())
    editor.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close(false)
      }
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        close(true)
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        close(true)
      }
    })
    editor.addEventListener('blur', () => close(true))

    this.inlineTextEditor = { editor, close }
    document.addEventListener('pointerdown', outsidePointerDown, true)
    window.setTimeout(() => {
      editor.focus()
      editor.select()
    }, 0)
  }

  closeInlineTextEditor(commit) {
    if (this.inlineTextEditor) this.inlineTextEditor.close(commit)
  }

  isTextLikeElement(element) {
    const tag = element.tagName.toLowerCase()
    return tag === 'text' || tag === 'tspan' || tag === 'textpath'
  }

  insertElement(type) {
    const before = this.data
    const doc = this.parseSvgDocument()
    if (!doc) return

    const root = doc.documentElement
    const metrics = this.getSvgMetrics(root)
    const centerX = metrics.x + metrics.width / 2
    const centerY = metrics.y + metrics.height / 2
    const element = doc.createElementNS('http://www.w3.org/2000/svg', type)

    if (type === 'text') {
      element.setAttribute('x', this.formatNumber(centerX))
      element.setAttribute('y', this.formatNumber(centerY))
      element.setAttribute('fill', '#111827')
      element.setAttribute('font-size', '32')
      element.setAttribute('font-family', 'Arial, sans-serif')
      element.textContent = this.t('defaultText')
    } else if (type === 'rect') {
      element.setAttribute('x', this.formatNumber(centerX - 60))
      element.setAttribute('y', this.formatNumber(centerY - 40))
      element.setAttribute('width', '120')
      element.setAttribute('height', '80')
      element.setAttribute('fill', 'none')
      element.setAttribute('stroke', '#2563eb')
      element.setAttribute('stroke-width', '2')
      element.setAttribute('pointer-events', 'all')
    } else if (type === 'circle') {
      element.setAttribute('cx', this.formatNumber(centerX))
      element.setAttribute('cy', this.formatNumber(centerY))
      element.setAttribute('r', '48')
      element.setAttribute('fill', 'none')
      element.setAttribute('stroke', '#2563eb')
      element.setAttribute('stroke-width', '2')
      element.setAttribute('pointer-events', 'all')
    } else {
      return
    }

    const nextIndex = root.children.length
    root.appendChild(element)
    const next = new XMLSerializer().serializeToString(root)
    if (next === before) return

    this.pushHistory(before)
    this.data = next
    this.dirty = true
    this.sourceHistorySnapshot = this.data
    this.setSingleSelection([nextIndex])
    if (this.textarea) this.textarea.value = this.data
    this.render()

    const noticeKey = type === 'text' ? 'insertedText' : type === 'rect' ? 'insertedRect' : 'insertedCircle'
    new Notice(this.t(noticeKey))
  }

  getSvgMetrics(root) {
    const viewBox = root.getAttribute('viewBox')
    if (viewBox) {
      const parts = viewBox.split(/[\s,]+/).map((part) => Number(part)).filter((part) => Number.isFinite(part))
      if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
        return { x: parts[0], y: parts[1], width: parts[2], height: parts[3] }
      }
    }

    const width = Number.parseFloat(root.getAttribute('width') || '')
    const height = Number.parseFloat(root.getAttribute('height') || '')
    return {
      x: 0,
      y: 0,
      width: Number.isFinite(width) && width > 0 ? width : 800,
      height: Number.isFinite(height) && height > 0 ? height : 450,
    }
  }

  updateSelectedElement(mutator) {
    if (!this.selectedPath) return
    const before = this.data
    const doc = this.parseSvgDocument()
    if (!doc) return

    const selected = this.findElementByPath(doc.documentElement, this.selectedPath)
    if (!selected) return

    mutator(selected)

    const next = new XMLSerializer().serializeToString(doc.documentElement)
    if (next === before) return

    this.pushHistory(before)
    this.data = next
    this.dirty = true
    this.sourceHistorySnapshot = this.data
    if (this.textarea) this.textarea.value = this.data
    this.render()
  }

  updateElementsByPaths(items, mutator) {
    if (!items || !items.length) return
    const before = this.data
    const doc = this.parseSvgDocument()
    if (!doc) return

    for (const item of items) {
      const selected = this.findElementByPath(doc.documentElement, item.path)
      if (selected) mutator(selected, item)
    }

    const next = new XMLSerializer().serializeToString(doc.documentElement)
    if (next === before) return

    this.pushHistory(before)
    this.data = next
    this.dirty = true
    this.sourceHistorySnapshot = this.data
    if (this.textarea) this.textarea.value = this.data
    this.render()
  }

  updateSelectedDocument(mutator) {
    if (!this.selectedPath) return
    const before = this.data
    const doc = this.parseSvgDocument()
    if (!doc) return

    const selected = this.findElementByPath(doc.documentElement, this.selectedPath)
    if (!selected) return

    mutator(doc, selected)

    const next = new XMLSerializer().serializeToString(doc.documentElement)
    if (next === before) return

    this.pushHistory(before)
    this.data = next
    this.dirty = true
    this.sourceHistorySnapshot = this.data
    if (this.textarea) this.textarea.value = this.data
    this.render()
  }

  duplicateSelectedElement() {
    this.updateSelectedDocument((doc, selected) => {
      const parent = selected.parentElement
      if (!parent) return

      const clone = selected.cloneNode(true)
      this.assignDuplicateIds(clone)
      parent.insertBefore(clone, selected.nextSibling)

      const nextPath = [...this.selectedPath]
      nextPath[nextPath.length - 1] += 1
      this.setSingleSelection(nextPath)
    })
  }

  deleteSelectedElement() {
    this.updateSelectedDocument((doc, selected) => {
      const parent = selected.parentElement
      if (!parent) return

      parent.removeChild(selected)
      this.setSingleSelection(null)
    })
  }

  moveSelectedElement(direction) {
    this.updateSelectedDocument((doc, selected) => {
      const parent = selected.parentElement
      if (!parent) return

      const siblings = Array.from(parent.children)
      const index = siblings.indexOf(selected)
      const targetIndex = index + direction
      if (targetIndex < 0 || targetIndex >= siblings.length) return

      if (direction < 0) {
        parent.insertBefore(selected, siblings[targetIndex])
      } else {
        parent.insertBefore(selected, siblings[targetIndex].nextSibling)
      }

      const nextPath = [...this.selectedPath]
      nextPath[nextPath.length - 1] = targetIndex
      this.setSingleSelection(nextPath)
    })
  }

  moveSelectedElementToEdge(direction) {
    this.updateSelectedDocument((doc, selected) => {
      const parent = selected.parentElement
      if (!parent) return

      const siblings = Array.from(parent.children)
      const index = siblings.indexOf(selected)
      if (index < 0) return

      if (direction < 0) {
        if (index === 0) return
        parent.insertBefore(selected, siblings[0])
        const nextPath = [...this.selectedPath]
        nextPath[nextPath.length - 1] = 0
        this.setSingleSelection(nextPath)
      } else {
        if (index === siblings.length - 1) return
        parent.appendChild(selected)
        const nextPath = [...this.selectedPath]
        nextPath[nextPath.length - 1] = siblings.length - 1
        this.setSingleSelection(nextPath)
      }
    })
  }

  nudgeSelectedElement(dx, dy) {
    if (this.selectedPaths.length > 1) {
      const items = this.selectedPaths.map((path) => {
        const element = this.getRenderedElementByPath(path)
        return { path, originalTransform: element?.getAttribute('transform') || '' }
      })
      this.updateElementsByPaths(items, (selected, item) => {
        selected.setAttribute('transform', this.composeTranslatedTransform(item.originalTransform, dx, dy))
      })
      return
    }

    this.updateSelectedElement((selected) => {
      const originalTransform = selected.getAttribute('transform') || ''
      selected.setAttribute('transform', this.composeTranslatedTransform(originalTransform, dx, dy))
    })
  }

  async copySelectedId() {
    const selected = this.getSelectedElement()
    if (!selected) return

    const id = selected.getAttribute('id')
    if (!id) {
      new Notice(this.t('noElementId'))
      return
    }

    await navigator.clipboard.writeText(id)
    new Notice(`${this.t('copiedId')}: ${id}`)
  }

  assignDuplicateIds(element) {
    if (!(element instanceof Element)) return

    if (element.hasAttribute('id')) {
      element.setAttribute('id', `${element.getAttribute('id')}_copy`)
    }

    element.querySelectorAll('[id]').forEach((child) => {
      child.setAttribute('id', `${child.getAttribute('id')}_copy`)
    })
  }
}
