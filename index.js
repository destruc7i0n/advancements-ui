const {app, BrowserWindow} = require('electron')
const path = require('path')
const open = require('open')

// enable simple debug commands
require('electron-debug')({ enabled: true })

let win

function createWindow () {
  win = new BrowserWindow({
    icon: path.join(__dirname, 'build', 'icon.ico'),
    show: false,
    backgroundColor: '#eee',
    webPreferences: {
      zoomFactor: 0.9,
      experimentalFeatures: true
    }
  })
  win.setMenu(null)
  win.maximize()
  win.show()
  win.loadURL('https://advancements.thedestruc7i0n.ca')
  // win.openDevTools()
  win.on('closed', () => {
    win = null
  })

  win.webContents.on('new-window', function (event, url) {
    event.preventDefault()
    open(url)
  })
}

app.on('ready', createWindow)

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
