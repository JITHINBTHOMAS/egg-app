// preload/index.js
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  minimize: () => ipcRenderer.send('minimize-window'),
  close: () => ipcRenderer.send('close-window'),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI, // Spread existing electronAPI utilities
      ...api,         // Add our custom APIs
    });
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = { ...electronAPI, ...api };
  window.api = api;
}