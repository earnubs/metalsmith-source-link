'use strict';

const test = require('tape');
const plugin = require('../index');
const Metalsmith = require('metalsmith');

test('with config', t => {
  let metalsmith = Metalsmith('test/fixtures/a');

  t.plan(2);

  metalsmith.use(
    plugin('https://github.com/foo/bar/')
  )
  .use((files, metalsmith, done) => {
    Object.keys(files).forEach(file => {
      t.equal(
        files[file].sourceURL,
        'https://github.com/foo/bar/test/fixtures/a/src/test.md'
      );
    })

    done();
  })
  .build(err => {
    t.error(err, 'no build errors');
    t.end();
  });
});

test('with metadata', t => {
  let metalsmith = Metalsmith('test/fixtures/b');

  t.plan(2);

  metalsmith.metadata({
    site: {
      srcHostURL: 'https://github.com/foo/bar/'
    }
  })
  .use(plugin())
  .use((files, metalsmith, done) => {
    Object.keys(files).forEach(file => {
      t.equal(
        files[file].sourceURL,
        'https://github.com/foo/bar/test/fixtures/b/src/test.md'
      );
    })

    done();
  })
  .build(err => {
    t.error(err, 'no build errors');
    t.end();
  });
});

test('without either config nor metadata', t => {
  let metalsmith = Metalsmith('test/fixtures/c');

  t.plan(2);

  metalsmith
    .use(plugin())
    .build(err => {
      t.error(!(err), 'has build error');
      t.equal(
        err.message,
        'metalsmith-source-link: source repo URL not set',
        'has correct error message'
      );
      t.end();
    })
});
