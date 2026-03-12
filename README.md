# react-native-nitro-mecab

A Mecab react native package built with Nitro for Android and iOS.

Web support soon?

[![Version](https://img.shields.io/npm/v/@kuzulabz/react-native-nitro-mecab.svg)](https://www.npmjs.com/package/@kuzulabz/react-native-nitro-mecab)
[![Downloads](https://img.shields.io/npm/dm/@kuzulabz/react-native-nitro-mecab.svg)](https://www.npmjs.com/package/@kuzulabz/react-native-nitro-mecab)
[![License](https://img.shields.io/npm/l/@kuzulabz/react-native-nitro-mecab.svg)](https://github.com/KuzuLabz/react-native-nitro-mecab/LICENSE)

## Requirements

- React Native v0.76.0 or higher
- Node 18.0.0 or higher

## Installation

```bash
bun add @kuzulabz/react-native-nitro-mecab react-native-nitro-modules
```

## Usage
Checkout the [documentation site](https://kuzulabz.com/docs/react-native/mecab) for the full API.

```ts
import { Mecab } from '@kuzulabz/react-native-nitro-mecab';

// 1. Initialize
await Mecab.initialize('file:///path/to/dict/directory', 'ipadic');

// 2. Parse!
// Tokenize
const tokens = Mecab.tokenize(text);
tokens[0].surface

// Segment
const words = Mecab.wakati(text);
```

## Credits

Using [shogo82148's fork](https://github.com/shogo82148/mecab) of Mecab.

Bootstrapped with [create-nitro-module](https://github.com/patrickkabwe/create-nitro-module).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.