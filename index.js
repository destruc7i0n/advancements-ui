const {app, BrowserWindow, BrowserView} = require('electron')
const localShortcut = require('electron-localshortcut')
const path = require('path')
const open = require('open')

let win, view

function createWindow () {
  win = new BrowserWindow({
    title: 'Advancements',
    icon: path.join(__dirname, 'build', 'icon.ico'),
    show: false,
    backgroundColor: '#eee',
    webPreferences: {
      experimentalFeatures: true
    }
  })
  win.setMenu(null)
  win.maximize()

  // only show when ready
  win.once('ready-to-show', () => {
    win.show()
  })

  // init browserview
  view = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      experimentalFeatures: true,
      nativeWindowOpen: false // currently broken 1.8.1... https://github.com/electron/electron/issues/10707
    }
  })

  win.setBrowserView(view)
  view.setBounds(
    Object.assign({}, win.getContentBounds(), {x: 0, y: 0})
  )

  // load into browserview
  view.webContents.loadURL('https://advancements.thedestruc7i0n.ca')

  // view.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  view.webContents.on('new-window', function (event, url) {
    event.preventDefault()
    // only open on links that aren't the login
    if (url !== 'about:blank') {
      open(url)
    }
  })
}

app.on('ready', () => {
  const isMacOS = process.platform === 'darwin'
  createWindow()

  // handle devtools in browserview
  const devTools = () => {
    view.webContents.toggleDevTools()
  }

  localShortcut.register(view, isMacOS ? 'Cmd+Alt+I' : 'Ctrl+Shift+I', devTools);
	localShortcut.register(view, 'F12', devTools)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

// fix scaling
app.commandLine.appendSwitch('high-dpi-support', 1)
app.commandLine.appendSwitch('force-device-scale-factor', 1)
