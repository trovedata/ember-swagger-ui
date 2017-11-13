/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-swagger-ui',

  included: function(app) {
    this._super.included(app);

    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    app.import(path.join('vendor', 'DroidSans.ttf'), { destDir: 'fonts' });
    app.import(path.join('vendor', 'DroidSans-Bold.ttf'), { destDir: 'fonts' });

    app.import(path.join('vendor', 'explorer_icons.png'), { destDir: 'images' });
    app.import(path.join('vendor', 'throbber.gif'), { destDir: 'images' });
    app.import(path.join('vendor', 'logo_small.png'), { destDir: 'images' });

    // app.import(path.join('vendor', 'reset.css'));
    app.import(path.join('vendor', 'screen.css'));

    app.import(path.join('vendor', 'marked.js'));
    app.import(path.join('vendor', 'jquery-migrate.min.js'));
    app.import(path.join('vendor', 'jquery.ba-bbq.min.js'));
    app.import(path.join('vendor', 'jquery.slideto.min.js'));
    app.import(path.join('vendor', 'jquery.wiggle.min.js'));
    app.import(path.join('vendor', 'lodash.min.js'));
    app.import(path.join('vendor', 'handlebars-4.0.5.js'));
    app.import(path.join('vendor', 'object-assign-pollyfill.js'));
    app.import(path.join('vendor', 'backbone-min.js'));
    app.import(path.join('vendor', 'highlight.9.1.0.pack.js'), { exports: { 'hljs': ['default']}});
    app.import(path.join('vendor', 'highlight.9.1.0.pack_extended.js'));
    app.import(path.join('vendor', 'jsoneditor.min.js'));
    app.import(path.join('vendor', 'swagger-oauth.js'));
    app.import(path.join('vendor', 'swagger-ui.js'));

    app.import(path.join('vendor', 'o2c.html'), { destDir: '/' });
  },

  treeForVendor: function() {
    var vendorTree = this._super.treeForVendor.apply(this, arguments);
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(new Funnel(path.join(path.dirname(require.resolve('swagger-ui')), 'lib'), {
      files: [
        'marked.js',
        'jquery.ba-bbq.min.js',
        'jquery.slideto.min.js',
        'jquery.wiggle.min.js',
        'lodash.min.js',
        'handlebars-4.0.5.js',
        'object-assign-pollyfill.js',
        'backbone-min.js',
        'highlight.9.1.0.pack.js',
        'highlight.9.1.0.pack_extended.js',
        'jsoneditor.min.js',
        'swagger-oauth.js'
      ]
    }));

    trees.push(new Funnel(path.join(path.dirname(require.resolve('swagger-ui')), 'fonts'), {
      files: [
        'DroidSans.ttf',
        'DroidSans-Bold.ttf'
      ]
    }));

    trees.push(new Funnel(path.join(path.dirname(require.resolve('swagger-ui')), 'images'), {
      files: [
        'explorer_icons.png',
        'throbber.gif',
        'logo_small.png'
      ]
    }));

    trees.push(new Funnel(path.join(path.dirname(require.resolve('swagger-ui')), 'css'), {
      files: [
        // 'reset.css',
        'screen.css'
      ]
    }));

    trees.push(new Funnel(path.dirname(require.resolve('swagger-ui')), {
      files: [
        'swagger-ui.js',
        'o2c.html'
      ]
    }));

    trees.push(new Funnel(path.dirname(require.resolve('jquery-migrate')), {
      files: ['jquery-migrate.min.js']
    }));

    return mergeTrees(trees);
  }
};
