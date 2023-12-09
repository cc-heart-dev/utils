import { execSync } from 'child_process'
import * as gulp from 'gulp'

const { series } = gulp.default

function valid(done) {
  execSync('npm run eslint')
  done()
}

function format(done) {
  execSync('npm run prettier')
  done()
}

function test(done) {
  execSync('npm run test')
  done()
}


function build(done) {
  execSync('npm run prebuild')
  execSync('npm run build')
  execSync('npm run doc')
  done()
}

function changelog(done) {
  execSync('npm run changelog')
  done()
}

export const deploy = series(valid, format, test, changelog, build)
