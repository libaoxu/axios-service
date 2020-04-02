// eslint-disable-next-line no-undef
const version = __VERSION__

const module = {
  name: 'base-module-template',
  version
}

class A {
  getInfo (...args) {
    console.log(...args)
  }
}

Object.keys(module).some(v => v === 0)

Object.assign({ ...module })

export {
  version
}

export default module
