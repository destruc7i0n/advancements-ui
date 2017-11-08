const {app, BrowserWindow} = require('electron')
const path = require('path')

let win

function createWindow () {
  win = new BrowserWindow({
    icon: path.join(__dirname, 'build', 'icon.ico'),
    show: false,
    backgroundColor: '#eee',
    webPreferences: {
      zoomFactor: 0.75,
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
