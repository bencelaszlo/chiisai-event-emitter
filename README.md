# Chiisai Event Emitter

A minimal and performant event emitter library for Node.JS.

---

# chiisai-event-emitter

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Install

```bash
npm install chiisai-event-emitter
```

## Usage

### Subscribe to an Event

```ts
import { EventEmitter } from 'chiisai-event-emitter';

const eventEmitter = new EventEmitter();

eventEmitter.subscribe('event', () => console.log('event-handler called!'));

eventEmitter.emit('event')
// event-handler called!
```

### Unsubscibe

```ts
const unsubscibe = eventEmitter.subscribe('event', () => console.log('event-handler called!'));
unsubscribe();

eventEmitter.emit('event')
// (nothing happened)
```

[build-img]:https://github.com/bencelaszlo/chiisai-event-emitter/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/bencelaszlo/chiisai-event-emitter/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/chiisai-event-emitter
[downloads-url]:https://www.npmtrends.com/chiisai-event-emitter
[npm-img]:https://img.shields.io/npm/v/chiisai-event-emitter
[npm-url]:https://www.npmjs.com/package/chiisai-event-emitter
[issues-img]:https://img.shields.io/github/issues/bencelaszlo/chiisai-event-emitter
[issues-url]:https://github.com/bencelaszlo/chiisai-event-emitter/issues
[codecov-img]:https://codecov.io/gh/bencelaszlo/chiisai-event-emitter/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/bencelaszlo/chiisai-event-emitter
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
