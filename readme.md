# jlottie

![screencast](https://i.imgur.com/miLzIkJ.gif)

**jlottie** is a Lottie player written in javascript with an emphasis on minimizing the overall memory footprint,
processor demand, and file size of the player.

jlottie has been engineered to address the performance and bulkiness issues of existing Lottie players for the web.
jlottie also guarantees that no frames are dropped in a Lottie animation during playback, no matter how old the host
hardware is. Performance

jlottie's performance is achieved by compiling the Lottie source into a scene graph, which is subsequently used to play
the animation. This forgoes any need to perform real-time computations during playback. The compilation process also
optimizes the sequencing of all the transformations that make up a Lottie animation. For animations of average
complexity, jlottie consumes as little as half the CPU resources as the current Lottie web player. As complexity
increases, this efficiency also increases.

The most recent version of jlottie is over 80% smaller than the vanilla version of the current Lottie player for the
web. This reduction is achieved primarily through the use of polymorphic functions applied across congruent data sets
that are used for various purposes. Even when jlottie reaches 90+% of feature parity with the current Lottie web player,
its size is expected to be less than half that of its alternatives.

One of the problems with the current Lottie web player is that it skips frames when the host computer or device cannot
meet the processing throughput. Animations playing on this player starts visibly tearing when 20 or more averagely
complex Lottie animations are loaded simultaneously. Conversely, jlottie never drops a frame during playback, no matter
how many Lottie animations are loaded. This means that the CPU demand is proportionate to the number Lottie animations
playing simultaneously. Even so, with 20 concurrent Lottie animations loaded on an average computer, jlottie manages to
outperform the current web Lottie player whilst maintaining frame rates and avoiding jitter.

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

## License

MIT License © LottieFiles.com
