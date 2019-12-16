'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
describe('Should import default token contract', () => {
  it('should return contract', () => {
    var result = index.getBasicTokenContract();
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

  it('should create swappable token', () => {
    var result = index.newToken(['swappable']);
    console.log(result)
    expect(result).to.be.a('string')
  })
  
});