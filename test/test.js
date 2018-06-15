'use strict';

var expect = require('chai').expect;
var createLinkHeader = require('../app')

describe('#createLinkHeader', function() {
  var protocol = "https";
  var host = "website.com";
  var pathname = "/api/v1/";
  var page = 1;
  var perPage = 10;
  var totalResults = 100;

  var errorMessage = 'Please make sure that you are passing valid values for each parameter.';

  it('should successfully return the proper Link header if all parameters are present and valid', function(done) {
    var result = createLinkHeader(protocol, host, pathname, totalResults, 2, perPage);
    expect(result).to.equal("<https://website.com/api/v1/?per_page=10&page=1>; rel=\"first\", <https://website.com/api/v1/?per_page=10&page=1>; rel=\"previous\", <https://website.com/api/v1/?per_page=10&page=3>; rel=\"next\", <https://website.com/api/v1/?per_page=10&page=10>; rel=\"last\"")
    done();
  });

  it('should only return a subset of links if on first page', function(done) {
    var result = createLinkHeader(protocol, host, pathname, totalResults, 1, perPage);
    expect(result).to.equal("<https://website.com/api/v1/?per_page=10&page=2>; rel=\"next\", <https://website.com/api/v1/?per_page=10&page=10>; rel=\"last\"")
    done();
  });

  it('should only return a subest of links if on last page', function(done) {
    var result = createLinkHeader(protocol, host, pathname, totalResults, 10, perPage)
    expect(result).to.equal("<https://website.com/api/v1/?per_page=10&page=1>; rel=\"first\", <https://website.com/api/v1/?per_page=10&page=9>; rel=\"previous\"")
    done();
  });

  it('should throw an error if protocol is missing', function(done) {
    var result = createLinkHeader(null, host, pathname, totalResults, page, perPage);
    expect(result).to.equal(errorMessage);
    done();
  });

  it('should throw an error if host is missing', function(done) {
    var result = createLinkHeader(protocol, null, pathname, totalResults, page, perPage);
    expect(result).to.equal(errorMessage);
    done();
  });

  it('should throw an error if pathname is missing', function(done) {
    var result = createLinkHeader(protocol, host, null, totalResults, page, perPage);
    expect(result).to.equal(errorMessage);
    done();
  });

  it('should throw an error if page is missing', function(done) {
    var result = createLinkHeader(protocol, host, pathname, null, page, perPage);
    expect(result).to.equal(errorMessage);
    done();
  });

  it('should throw an error if perPage is missing', function(done) {
    var result = createLinkHeader(protocol, host, pathname, totalResults, null, perPage);
    expect(result).to.equal(errorMessage);
    done();
  });

  it('should throw an error if totalResults is missing', function(done) {
    var result = createLinkHeader(protocol, host, pathname, totalResults, page, null);
    expect(result).to.equal(errorMessage);
    done();
  });
})
