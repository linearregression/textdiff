var grunt = require('grunt')
grunt.loadNpmTasks('grunt-browserify')
grunt.loadNpmTasks('grunt-contrib-watch')


grunt.initConfig({
  browserify: {
    js: {
      src: 'textdiff.js',
      dest: './dist/textdiff.js',
      options: {
        browserifyOptions: {
          standalone: 'textdiff'
        }
      },
    }
  },
  watch: {
    browserify: {
      files: ['./*.js']
    }
  }
})


grunt.registerTask('default', ['browserify', 'watch'])
