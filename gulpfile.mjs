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
function setNpmProxy(done) {
  execSync('npm config set registry https://registry.npmjs.org')
  done()
}

function npmPublish(done) {
  execSync('npm version patch')
  // execSync('npm version patch --no-git-tag-version')
  execSync('npm publish')
  done()
}

function recoverNpmProxy(done) {
  execSync('npm config set registry https://registry.npmmirror.com')
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

export const publish = series(setNpmProxy, npmPublish, recoverNpmProxy)

export const deploy = series(valid, format, test, changelog, build)
