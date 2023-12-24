import { LoadURLOptions } from "electron";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { BrowserWindow } = require("@electron/remote");

let currentOpenedWindows = 0;

/**
 * A wrapper for electron's `BrowserWindow`
 * @category Electron/Win
 */
export class Win {
  private loading: boolean;

  private win: typeof BrowserWindow | null;

  private onWindowClosed = () => {
    console.log("CLOSED");
    this.win = null;
  };

  private onDestroy = () => {
    if (this.win) {
      try {
        this.win.destroy();
        this.onWindowClosed();
      } catch (error) {
        console.log("VOT ETO PROSTO PIZDOS NAHUI! ZVONITE OBEME BLYAT!", error);
      }
    }

    // This is needed for the beforeunload event
    return "somebody once told me the world is gonna roll me";
  };

  public constructor({ width = 1920, height = 1080, show = false, node = false } = {}) {
    this.win = new BrowserWindow({
      show,
      width,
      height,
      webPreferences: {
        nodeIntegration: node,
        webSecurity: false,
      },
    });

    this.loading = false;

    window.addEventListener("beforeunload", this.onDestroy);

    this.win.on("closed", this.onWindowClosed);

    currentOpenedWindows += 1;
    console.log("new window", currentOpenedWindows);
  }

  public show() {
    if (!this.win) return;

    this.win.maximize();
    this.win.show();
  }

  public hide() {
    if (!this.win) return;

    this.win.hide();
  }

  public close() {
    if (!this.win) return;

    this.win.close();
    this.win = null;
    currentOpenedWindows -= 1;
    console.log("close window", currentOpenedWindows);
  }

  public destroy() {
    if (!this.win) return;

    this.win.destroy();
    this.win = null;
    currentOpenedWindows -= 1;
    console.log("destroy window", currentOpenedWindows);
  }

  public async loadURL(url: string, options?: LoadURLOptions) {
    if (!this.win) return;
    if (this.loading) throw new Error("ALREADY LOADING URL");

    try {
      this.loading = true;
      await this.win.loadURL(url, options);
    } catch (error) {
      console.log("Не получилось загрузить это говно....", url, options);
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  get webContents() {
    return this.win?.webContents;
  }

  public execute(code: string) {
    if (!this.win) throw new Error(`Can't execute ${code}`);
    return this.win.webContents.executeJavaScript(code, true);
  }

  public execFn(code: string) {
    if (!this.win) throw new Error(`Can't execFn ${code}`);
    return this.execute(`;(() => { ${code} })()`);
  }

  public tryFn(code: string, errValue = "undefined") {
    if (!this.win) throw new Error(`Can't tryFn ${code}`);
    return this.execFn(`
      try {
        return (() => { ${code} })()
      } catch (err) {
        console.log(${JSON.stringify(code)})
        console.log(err)
        return ${JSON.stringify(errValue)}
      }
    `);
  }
}
