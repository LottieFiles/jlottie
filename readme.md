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

## Performance

Below are results of some performance tests comparing jlottie with [lottie-player](https://github.com/airbnb/lottie-web/blob/master/build/player/lottie.js).

### Single animation
In this test 11 Lottie animations were selected from the Lottiefiles public animations repository, and their runtime performance and memory utilization was recorded using Chrome's analysis tools. The performance figures were prorated to 1 second durations, which allows for direct comparison, as per the table below.

*All figures other than memory is in milliseconds.*
<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th>Scripting</th>
      <th>Rendering</th>
      <th>Painting</th>
      <th>System</th>
      <th>Idle</th>
      <th>Memory (MB)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan=2>Best</td>
      <td>jlottie</td>
      <td>41</td>
      <td>11</td>
      <td>5</td>
      <td>14</td>
      <td>928</td>
      <td>1.9</td>
    </tr>
    <tr>
      <td>lottie-player</td>
      <td>122</td>
      <td>28</td>
      <td>10</td>
      <td>37</td>
      <td>801</td>
      <td>4</td>
    </tr>
    <tr>
      <td rowspan=2>Average</td>
      <td>jlottie</td>
      <td>70</td>
      <td>29</td>
      <td>8</td>
      <td>23</td>
      <td>872</td>
      <td>3.4</td>
    </tr>
    <tr>
      <td>lottie-player</td>
      <td>91</td>
      <td>36</td>
      <td>11</td>
      <td>31</td>
      <td>831</td>
      <td>6.2</td>
    </tr>
    <tr>
      <td rowspan=2>Worst</td>
      <td>jlottie</td>
      <td>124</td>
      <td>35</td>
      <td>11</td>
      <td>24</td>
      <td>805</td>
      <td>8</td>
    </tr>
    <tr>
      <td>lottie-player</td>
      <td>84</td>
      <td>41</td>
      <td>9</td>
      <td>25</td>
      <td>840</td>
      <td>4.7</td>
    </tr>

  </tbody>
</table>

### Stress test

In this test a total of 35 Lottie animations, whose features are fully supported by jlottie, were chosen at random from the Lottiefiles public animations repository. These animations were then rendered in one page at the same time, and performance and memory utilization analyzed using Chrome tools.

The test pages used for this test are [here for jlottie](https://lottiefiles.github.io/jlottie/examples/general_jlottie2.html) and [here for lottie-player](https://lottiefiles.github.io/jlottie/examples/general_lottie2.html).

During this test, it was discovered that during the 5-6 seconds of Chrome's performance testing all 35 animations noticeably skipped frames when lottie-player was rendering them. Conversely, jlottie is designed not to skip any frames, and therefore no jitter could be discerned on any of the animations even during the Chrome performance analysis.

*All figures other than memory is in milliseconds.*
<table>
  <thead>
    <tr>
      <th></th>
      <th>Scripting</th>
      <th>Rendering</th>
      <th>Painting</th>
      <th>System</th>
      <th>Idle</th>
      <th>Memory (MB)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>jlottie</td>
      <td>515</td>
      <td>269</td>
      <td>36</td>
      <td>62</td>
      <td>115</td>
      <td>73.7</td>
    </tr>
    <tr>
      <td>lottie-player</td>
      <td>564</td>
      <td>205</td>
      <td>19</td>
      <td>45</td>
      <td>166</td>
      <td>183</td>
    </tr>
  </tbody>
</table>

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
