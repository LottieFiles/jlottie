# jlottie

> **jlottie** is a lottie player written in javascript with an emphasis on minimizing the overall memory footprint,
> processor demand, and file size of the player.

## Demo

![screencast](https://i.imgur.com/miLzIkJ.gif)

## Installation

#### In HTML:

- Import from CDN.

```html
<script src="https://unpkg.com/@lottiefiles/jlottie@latest/dist/jlottie.js" type="module"></script>
```

#### In Javascript or TypeScript:

1. Install package using npm or yarn.

```shell
npm install --save @lottiefiles/jlottie
```

2. Import package in your code.

```javascript
import jlottie from '@lottiefiles/jlottie';
```
OR
```javascript
const jlottie = require('@lottiefiles/jlottie');
```

## Usage

### Load an animation

```html
<div id="my-animation"></div>
```

```js
jlottie.loadAnimation({
  container: document.getElementById('my-animation'),
  loop: true,
  autoplay: true,
  path: "<LOTTIE_URL>",
});
```

## API

### Properties

| Property     | Attribute    | Description       | Type      | Default     |
| ------------ | ------------ | ----------------- | --------- | ----------- |
| `example`    | `example`    | example           | `example` | `example`   |
| `background` | `background` | Background color. | `string`  | `undefined` |

### Methods

### `sampleMethod() => Promise<any>`

Description of method

#### Returns

Type: `Promise<any>`

### Events

The following events are exposed and can be listened to via `addEventListener` calls.

| Name   | Description               |
| ------ | ------------------------- |
| `load` | Animation data is loaded. |

## Development

### Testing

1. Install packages

```sh
yarn install
```

2. Run test command.

```sh
yarn test
```
This will generate snapshots in the `__snapshots__` directory and warn of mismatches with `lottie-web` renderer as the comparison baseline.

## Contributing

See [how to contribute](contributing.md) to this project.

## License

MIT License © LottieFiles.com
