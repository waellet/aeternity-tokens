'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
describe('Should import default token contract', () => {
  it('should return contract', () => {
    var result = index.getBasicTokenContract();
    expect(result).to.be.a('string')
  });

  it('should create basic token', () => {
    var result = index.newToken([]);
    expect(result).to.be.a('string')
  });

  it('should create allowances token', () => {
    var result = index.newToken(['allowances']);
    expect(result).to.be.a('string')
  })

  it('should create mintable token', () => {
    var result = index.newToken(['mintable']);
    expect(result).to.be.a('string')
  })

  it('should create burnable token', () => {
    var result = index.newToken(['burnable']);
    expect(result).to.be.a('string')
  })

  it('should create burnable + swappable token', () => {
    var result = index.newToken(['burnable', 'swappable']);
    expect(result).to.be.a('string')
  })

  it('should create allowances + burnable + swappable token', () => {
    var result = index.newToken(['allowances', 'burnable', 'swappable']);
    expect(result).to.be.a('string')
  })

});