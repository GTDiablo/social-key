# Introduction
A very simple but effective old school validation key generator.

# Install
```
npm install social-key --save
```

# Usage

```javascript
import { Key } from 'social-key'

// Key generator with built in pattern
var key_generator = new Key();

// Key generator with custom pattern
var key_generator = new Key('abc-123');

// Key generator with custom rule
var key_generator = Key.create_key_generator([3,4,3], 1030);

// Generate Key
var my_key = key_generator.generate_key();

// Validate key
key_generator.is_valid(my_key);
```
