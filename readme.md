[![](https://img.shields.io/npm/v/multiple-select-js)](https://www.npmjs.com/package/multiple-select-js)
[![](https://img.shields.io/npm/dt/multiple-select-js)](https://www.npmjs.com/package/multiple-select-js)
[![](https://img.shields.io/jsdelivr/npm/hm/multiple-select-js)](https://www.npmjs.com/package/multiple-select-js)
[![](https://img.shields.io/github/size/ibnujakaria/multiple-select-js/dist/js/multiple-select.js)]()
[![](https://img.shields.io/github/release-date/ibnujakaria/multiple-select-js)](https://github.com/ibnujakaria/multiple-select-js/)
[![](https://img.shields.io/npm/l/multiple-select-js)](https://www.npmjs.com/package/multiple-select-js)

# Multiple Select 

A simple javascript library for multiple select component that supports Bootstrap 4 natively.

## Installation

You can install `multiple-select-js` in 3 options:

### Using NPM

```bash
npm i multiple-select-js
```

And then, simply import it using `es6` syntax.

```js
import MultipleSelect from 'multiple-select-js'
```

### Using CDN
```html
<!-- Bootstrap 4 -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<!-- Multiple Select JS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/multiple-select-js/dist/css/multiple-select.css">
<script src="https://cdn.jsdelivr.net/npm/multiple-select-js/dist/js/multiple-select.js"></script>
```

### Manually Download
```html
<link href="/dist/css/multiple-select.css" rel="stylesheet">
<script src="/dist/js/multiple-select.js"></script>
```

## Basic Usage

For single select.
```html
<div class="form-group">
  <label for="select-language">Single Select</label>
  <select id="select-language">
    <option value="php">PHP</option>
    <option value="javascript">Javascript</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
  </select>
</div>
```

```js
new MultipleSelect('#select-language', {
  placeholder: 'Select Language'
})
```

For Multiple select you can simply add `multiple` attribute to the `select` tag.

```html
<div class="form-group">
  <label for="select-language">Multiple Select</label>
  <select id="select-multiple-language" multiple>
    <option value="php">PHP</option>
    <option value="javascript">Javascript</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
  </select>
</div>
```

```js
new MultipleSelect('#select-multiple-language', {
  placeholder: 'Select Language'
})
```
## Documentation

Go to [this link](https://ibnujakaria.github.io/multiple-select-js) for the complete documentation.

## License

The Multiple Select Js library is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
