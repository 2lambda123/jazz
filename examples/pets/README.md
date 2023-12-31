# Jazz Rate-My-Pet List Example

Live version: https://example-pets.jazz.tools

## Installing & running the example locally

Start by checking out just the example app to a folder:

```bash
npx degit gardencmp/jazz/examples/pets jazz-example-pets
cd jazz-example-pets
```

(This ensures that you have the example app without git history or our multi-package monorepo)

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

## Structure

TODO

## Walkthrough

### Main parts

TODO

### Helpers

TODO

## Questions / problems / feedback

If you have feedback, let us know on [Discord](https://discord.gg/utDMjHYg42) or open an issue or PR to fix something that seems wrong.


## Configuration: sync server

By default, the example app uses [Jazz Global Mesh](https://jazz.tools/mesh) (`wss://sync.jazz.tools`) - so cross-device use, invites and collaboration should just work.

You can also run a local sync server by running `npx cojson-simple-sync` and adding the query param `?sync=ws://localhost:4200` to the URL of the example app (for example: `http://localhost:5173/?sync=ws://localhost:4200`), or by setting the `sync` parameter of the `<WithJazz>` provider component in [./src/0_main.tsx](./src/0_main.tsx).
