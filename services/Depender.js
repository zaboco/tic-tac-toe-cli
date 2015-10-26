'use strict'

const Pimple = require('pimple'),
  _ = require('lodash')

module.exports = class Depender {
  constructor(implementationsRegistry) {
    this.container = new Pimple()
    this.implementationsRegistry = {}
    _.each(implementationsRegistry, (implementations, serviceKey) => {
      this.register(serviceKey, implementations)
    })
  }

  register(serviceKey, implementations) {
    this.implementationsRegistry[serviceKey] = implementations || {}
    this._defineGetter(serviceKey)
  }

  _defineGetter(serviceKey) {
    Object.defineProperty(this, serviceKey, {
      get: () => this.get(serviceKey)
    })
  }

  choose(serviceKey, implementationKey) {
    let serviceImplementations = this._retrieveImplementationsFor(serviceKey)
    let actualImplementation = serviceImplementations[implementationKey]
    if (actualImplementation == null) {
      throw Error(`There is not ${implementationKey} implementation for ${serviceKey}`)
    }
    this.container.set(serviceKey, actualImplementation)
    return this
  }

  get(serviceKey) {
    return this.container.get(serviceKey)
  }

  set(key, value) {
    this.container.set(key, value)
    this._defineGetter(key)
  }

  _retrieveImplementationsFor(serviceKey) {
    return this.implementationsRegistry[serviceKey] || {}
  }
}
