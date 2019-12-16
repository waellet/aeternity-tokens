# aeternity-tokens

This package providing an easy way to create extendable fungible tokens in Sophia by using a simple API.

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
npm install @waellet/aeternity-tokens
```

## Usage

### Javascript

```javascript
const aeternityTokens = require('@waellet/aeternity-tokens');
var newToken = aeternityTokens.newToken([]);
```

### TypeScript
```typescript
import * as aeternityTokens from '@waellet/aeternity-tokens';
console.log(aeternityTokens.newToken([]))
```