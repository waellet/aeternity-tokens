'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
describe('Should import default token contract', () => {
  it('should return contract', () => {
    var result = index.getBasicTokenContract();
    expect(result).to.be.a('string')
  });

  it('should create allowances token', () => {
    var result = index.createAllowancesToken();
    console.log(result)
    expect(result).to.be.a('string')
  })
});