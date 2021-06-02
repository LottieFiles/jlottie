<<<<<<< HEAD
# Jlottie

**Jlottie** is a lottie player written in javascript with an emphasis on minimizing the overall memory footprint, processor demand, and file size of the player.

## Demo

![screencast](https://i.imgur.com/miLzIkJ.gif)

## Installation

#### In HTML, import from CDN or from the local Installation:

##### Lottie Player:

- Import from CDN.

```html
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/jlottie-player.js"></script>
```

- Import from local node_modules directory.

```html
<script src="/node_modules/@lottiefiles/lottie-player/dist/jlottie-player.js"></script>
```

#### In Javascript or TypeScript:

1. Install package using npm or yarn.

```shell
npm install --save @lottiefiles/jlottie-player
```

2. Import package in your code.

```javascript
import "@lottiefiles/jlottie-player";
```

## Usage

### Lottie-Player

Add the element `lottie-player` and set the `src` property to a URL pointing to a valid Bodymovin JSON.

```html
<lottie-player
  autoplay
  controls
  loop
  mode="normal"
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style="width: 320px"
>
</lottie-player>
```

You may set and load animations programatically as well.

```html
sample html here
```

```js
js to load player programtically here.
```

## Properties

| Property     | Attribute    | Description       | Type      | Default     |
| ------------ | ------------ | ----------------- | --------- | ----------- |
| `example`    | `example`    | example           | `example` | `example`   |
| `background` | `background` | Background color. | `string`  | `undefined` |

## Methods

### `sampleMethod() => Promise<any>`

Description of method

#### Returns

Type: `Promise<any>`

## Events

The following events are exposed and can be listened to via `addEventListener` calls.

| Name   | Description               |
| ------ | ------------------------- |
| `load` | Animation data is loaded. |

## Testing

CD into tests folder

```
cd tests
```

Install packages

```
yarn install
```

Run serve command and leave the terminal running. This hosts a node server with both players loaded up.
The Url format is _http://localhost:8000/?src=test_files/11.json_
Path to the test files should be provided in relation to the public folder. Feel free to use this command to run the index.html test file in public folder to visually compare hernans player and jlottie player. Do note that the player js file being loaded is the file inside of the public folder. Hot reloading is not enabled so after making changes to the library, please manually copy the file over to the public folder.

```
yarn serve
```

Run test command.
Screenshots will be pushed up to git however if they are missing please note that the first run of the command will generate all the screenshots from hernans player. The second consecutive command will compare screenshots and run the validation test.

```
yarn test
```

## Contributing

See [how to contribute](contributing.md) to this project.

## License

MIT License © LottieFiles.com
=======
# Jlottie

> **Jlottie** is a Lottie player written in Javascript with an emphasis on minimizing the overall memory footprint,
> processor demand, and file size of the player.

[![npm](https://img.shields.io/npm/v/@lottiefiles/lottie-player.svg)](https://www.npmjs.com/package/@lottiefiles/lottie-player)
[![webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@lottiefiles/lottie-player)

## Installation

- Import from CDN.

```html
<script src="https://unpkg.com/@lottiefiles/jlottie@1.0.0/dist/lottie-player.js"></script>
```

- Node

```sh
yarn add @lottiefiles/jlottie
```

## Contributing

See [how to contribute](contributing.md) to this project.
>>>>>>> cfc1524234fd888a2c09475d9071c75b87e1946f
