# aeternity-tokens

This package providing an easy way to create extendable [AEX-9 fungible tokens](https://github.com/mradkov/AEXs/blob/master/AEXS/aex-9.md) in Sophia by using a simple API.

## Build 
```sh
npm run build
```

## Test 
```sh
npm run test
```

## Installation

```sh
npm install aeternity-tokens
```

## Usage

### Javascript

```javascript
const aeternityTokens = require('aeternity-tokens');
var newToken = aeternityTokens.newToken([]);
```

### TypeScript
```typescript
import * as aeternityTokens from 'aeternity-tokens';
console.log(aeternityTokens.newToken([]))
```

Supported extensions
- allowances
- mintable
- burnable
- swappable

Example use:

```typescript
import * as aeternityTokens from 'aeternity-tokens';

const tokenAllowances = aeternityTokens.newToken(['allowances']);
const tokenMintable = aeternityTokens.newToken(['mintable']);
const tokenBurnable = aeternityTokens.newToken(['burnable']);
const tokenSwappable = aeternityTokens.newToken(['burnable', 'swappable']);
...
const tokenMintableBurnable = aeternityTokens.newToken(['mintable', 'burnable']);
...
const tokenMintableBurnableAllowances = aeternityTokens.newToken(['mintable', 'burnable', 'allowances']);
```