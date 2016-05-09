'use strict';

const path = require('path');
const url = require('url');

/**
 * Metalsmith source link plugin.
 * Add a link to the source of your content on github, or github like web-based
 * source hosting service.
 *
 * @argument {String} baseURL base url of repo on web, for example
 * http://github.com/user/repo/tree/master
 */

module.exports = function(baseURL) {

  return function(files, metalsmith, done) {
    let metadata = metalsmith.metadata();
    let sourceHostURL = false;

    if (!baseURL) {
      if (metadata.site && metadata.site.srcHostURL) {
        baseURL = metadata.site.srcHostURL;
      } else {
        done(new Error('metalsmith-source-link: source repo URL not set'));
      }
    }

    Object.keys(files).forEach(file => {
      let srcPath = path.relative(path.resolve('.'), metalsmith.source());
      let filePath = path.join(srcPath, file);

      files[file].sourceURL = url.resolve(baseURL, filePath);
    });

    done();
  };
};
