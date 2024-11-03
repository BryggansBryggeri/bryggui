# BryggUI

Web interface for BryggIO, for communication with a [`BryggIO`](https://github.com/BryggansBryggeri/bryggio) instance.

## Run
Modify the settings in `src/nats_setup.ts` to point to a running `BryggIO` instance.
Then run:
```
npm run install
npm run dev
```

## Build
To install on rbpi:
```
npm run build
```
Then copy the resulting `dist` directory to the directory hosted by the server, e.g., `/var/www/html`
