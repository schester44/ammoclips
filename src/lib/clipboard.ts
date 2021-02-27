import { BrowserWindow, clipboard, ipcMain, nativeImage } from 'electron';
import { v4 } from 'uuid';
import db from '../db';

type ClipType = 'image' | 'html' | 'code' | 'text';

class Clip {
  id: string;

  label: string;

  contents: string;

  type: string;

  constructor({
    label,
    contents,
    type,
  }: {
    label: string;
    contents: string;
    type: ClipType;
  }) {
    this.id = v4();
    this.label = label;
    this.contents = contents;
    this.type = type;

    return this;
  }

  stringify() {
    return JSON.stringify(this);
  }
}

let watcherInt: NodeJS.Timeout;

// eslint-disable-next-line import/prefer-default-export
export function startMonitoringClipboard(bw: BrowserWindow) {
  let previousText = clipboard.readText();

  ipcMain.on('DELETE_CLIP', (_: any, { clip }: { clip: Clip }) => {
    console.log('DELETE THE CLIP WITH ID', clip.id);
    db.get('clips').remove({ id: clip.id }).write();
  });

  ipcMain.on('REFRESH_CLIPS', () => {
    const clips = db.get('clips').value();

    bw.webContents.send('REFRESH_CLIPS', { clips });
  });

  ipcMain.on('WRITE_CLIP', (_, { clip }: { clip: Clip }) => {
    bw.minimize();
    if (clip.type === 'image') {
      clipboard.writeImage(nativeImage.createFromDataURL(clip.contents));
    } else if (clip.type === 'html') {
      clipboard.writeHTML(clip.contents);
    } else {
      clipboard.writeText(clip.contents);
    }
  });

  const processClip = ({
    label,
    contents,
    type,
  }: {
    label: string;
    contents: string;
    type: ClipType;
  }) => {
    const clip = new Clip({ label, contents, type });

    db.get('clips').filter({ label: clip.label }).write();
    db.get('clips').unshift(clip).write();

    bw.webContents.send('SEND_CLIP', { clip });
  };

  if (watcherInt) {
    window.clearInterval(watcherInt);
  }

  watcherInt = setInterval(() => {
    const formats = clipboard.availableFormats();

    let label = clipboard.readText();
    let contents = label;
    let type: ClipType = 'text';

    if (formats.includes('image/html')) {
      type = 'html';
      contents = clipboard.readHTML();
    }

    if (formats.includes('image/png')) {
      const image = clipboard.readImage();

      label = 'image.png';
      type = 'image';
      contents = image.toDataURL();
    }

    if (formats.includes('vscode-editor-data')) {
      type = 'code';
    }

    if (previousText && previousText !== label && label.length) {
      processClip({ label, type, contents });
      previousText = label;
    }
  }, 500);
}
