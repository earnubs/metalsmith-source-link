# metalsmith-source-link [![Build Status](https://travis-ci.org/earnubs/metalsmith-source-link.svg?branch=master)](https://travis-ci.org/earnubs/metalsmith-source-link)

Plugin to add a link to your content src on github (or elsewhere) from the template.


## Installation

```
$ npm install metalsmith-source-link --save
```

## Usage

```js
var Metalsmith = require('metalsmith');
var sourcelink = require('metalsmith-source-link');

Metalsmith
.use(sourcelink('https://github.com/earnubs/field-notes/tree/master/'))
```

Each file then has a `sourceURL` property which can be used in templates like so:

```html
<a href="{{ sourceURL }}">See the source for this file on Github.</a>
```

## Licence

MIT
