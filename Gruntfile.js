module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'public/**/*.js'],
      options: {
        jshintrc: true
      }
    },
    jsbeautifier: {
      files: ["<%= jshint.files %>"],
      options: {
        js: {
          indentSize: 2
        }
      }
    },
    watch: {
      express: {
        files: ['./**/*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      },
      codestyleAndLint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jsbeautifier', 'jshint']
      },
      styles: {
        files: ['public/**/*.scss'],
        tasks: ['sass']
      }
    },
    browserify: {
      bundleOptions: {
        debug: true
      },
      dev: {
        options: {
            transform: [
              ["babelify", {
                  "presets": ["es2015"]
              }],
              ["html2js-browserify", {
                  "collapseWhitespace": true
              }],
              "envify"
            ],
            browserifyOptions: {
                paths: ['app'],
                debug: true
            },
            watch: true,
            keepAlive: true
        },
        files: {
            './public/dist/vendor.js': ['./public/app/app.js']
        }
      },
      dist: {
          options: {
              transform: [
                ["babelify", {
                    "presets": ["es2015"]
                }],
                ["html2js-browserify", {
                    "minify": true,
                    "collapseWhitespace": true
                }],
                "envify"
              ],
              browserifyOptions: {
                  paths: ['public/app'],
                  debug: true
              },
              plugin: [
                ['minifyify', {
                    "no-map": true
                }]
              ]
          },
          files: {
              'public/dist/vendor.js': ['public/app/app.js']
          }
      }
    },
    env: {
      dev: {
        NODE_ENV: "development",
        API_URL: "http://localhost:5000/"
      },
      prod: {
        NODE_ENV: "production",
        API_URL: "production api url here :)"
      }
    },
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'public/dist/style.css': 'public/scss/style.scss'
        }
      }
    },
    express: {
      dev: {
        options: {
          script: './index.js',
          port: 5000
        }
      },
      prod: {
        options: {
          script: './api.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'test/AdRestApi.test.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express:dev', 'sass', 'env:dev', 'browserify']);
  grunt.registerTask('deploy', ['sass:dist', 'env:prod', 'browserify:dist']);
  grunt.registerTask('test', ['express:test']);
};
