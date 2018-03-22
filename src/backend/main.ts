import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let window: BrowserWindow;
function createWindow(): void {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegrationInWorker: true
        }
    });
    window.loadURL(url.format({
        // Relative from 'app/backend/main.js'
        pathname: path.join(__dirname, '..', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    window.on('closed', () => {
        window = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});
