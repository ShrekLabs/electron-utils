# @ShrekLabs/electron-utils

## Install

```bash
# install peer-deps with
npm i electron
# install the library with
npm i @shreklabs/electron-utils
```

If you want to use electron features like Win, you'll probably need to install and enable `@electron/remote`:

```bash
npm i @electron/remote
```

```typescript
// In the main process
const remoteMain = require("@electron/remote/main");

remoteMain.initialize();
```

## Useful links

- [Docs](https://shreklabs.github.io/electron-utils/modules.html).
- [NPM package](https://www.npmjs.com/package/@shreklabs/electron-utils).
