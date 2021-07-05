# jlottie

**jlottie** is a Lottie player written in javascript with an aim to have the smallest possible file size. jlottie is
suitable as a general purpose lottie player, though implements a subset of the features in the core player - this
approach leads to a tiny footprint and great performance.

At only 9kb when gzipped, jlottie is perfect as a lightweight addition to any webapp where not all of the lottie featues
are necessary - common use cases include animated icons and micro animations. A list of all of the playback features is
available [here](docs/features.html), and there's a test page available [here](https://lottiefiles.github.io/jlottie).

jlottie's performance is achieved by compiling the Lottie source into a scene graph, which is subsequently used to play
the animation. This forgoes any need to perform real-time computations during playback. jlottie is suitable for use when
there are many animations playing on a single page.

- **jlottie player is best used for animated icons and micro animations**
- **jlottie player is vastly smaller in size compared to other Lottie players (9kb)**
- **jlottie player is suitable for use if there are many animations playing on a single page**
- **jlottie player is highly performant**

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
  path: '<LOTTIE_URL>',
});
```

## API

### Methods

### `jlottie.loadAnimation(configObject)`

Takes in an object with format as follows as parameter

```js
{
  container: document.getElementById('my-animation'), // html dom element to hook animation to
  loop: true, // loop toggle
  autoplay: true, // autoplay
  path: '<LOTTIE_URL>', // path to hosted lottie file
}
```

#### Returns

Type: `Null`

### `jlottie.pause(elementId)`

Pause animation. Takes in the Dom element Id as parameter.

#### Returns

Type: `Null`

### `jlottie.play(elementId)`

Play animation. Takes in the Dom element Id as parameter.

#### Returns

Type: `Null`

### `jlottie.stop(elementId)`

Stop animation. Takes in the Dom element Id as parameter.

#### Returns

Type: `Null`

### `jlottie.destroy(elementId)`

Destroy animation. Takes in the Dom element Id as parameter.

#### Returns

Type: `Null`

### `jlottie.goToAndStop(frame,elementId)`

Go to specified frame and stop. Takes in a frame number and Dom element Id as parameter.

#### Returns

Type: `Null`

## Development

### Building

##### 1. Install dependencies.

```sh
yarn install
```

##### 2. Dev mode.

```sh
yarn dev
```

Automatically build and preview while developing. This runs `rollup` in watch mode and spins up a server at port 10000
to preview and test the builds.

##### 3. Production builds.

```sh
yarn build
```

This creates ESM, CJS and UMD builds in the `dist` directory.

### Testing

1. Install packages

```sh
yarn install
```

2. Run test command.

```sh
yarn test
```

This will generate snapshots in the `__snapshots__` directory and warn of mismatches with `lottie-web` renderer as the
comparison baseline.

## Contributing

See [how to contribute](contributing.md) to this project.

## FAQ

Why doesnt my Lottie animation work on the jlottie player?

The jlottie player does not support as many features of Adobe After Effects as other players out there as it was built
to be smaller in size and highly performant, and therefore might not support certain settings,effects or features that
were used when creating the animation. please do drop feedback to us and by popular demand we may make accomdations as
needed. You can submit your feed back here. [Click here](https://lottiefiles.canny.io/jlottie)

What features/effects of After Effects does this player support?

Please have a look at this documentation [Click here](docs/features.html)

Where can i raise issues?

Please use github issues to highlight any bugs.

Where can i drop feedback?

You may [Click here](https://lottiefiles.canny.io/jlottie) and submit your feedback

## License

MIT License © LottieFiles.com
