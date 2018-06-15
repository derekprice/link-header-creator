'use strict';

module.exports = function createLinkHeader(
  protocol = "https",
  host,
  pathname,
  totalResults,
  page,
  perPage
) {
  // Creating Link response header
  if (!protocol || !host || !pathname || !totalResults || !page || !perPage) {
    return "Please make sure that you are passing valid values for each parameter.";
  } else {
    // Page calculations
    var first = 1
    var previous = page - 1
    var next = page + 1
    var last = Math.ceil(totalResults / perPage)

    //Preparing empty header
    var linkHeader = ""

    var uriPrefix = '<' + protocol + '://' + host + pathname

    // If not first page
    if (page !== first) {
      var firstLink = uriBuilder(perPage, first) + '>; rel="first"'
      var previousLink = uriBuilder(perPage, previous) + '>; rel="previous"'
      linkHeader += uriPrefix + firstLink + ', ' + uriPrefix + previousLink
    }

    // If not last page
    if (page !== last) {
      if(linkHeader.length > 0) {
        linkHeader += ', '
      }
      var nextLink = uriBuilder(perPage, next) + '>; rel="next"'
      var lastLink = uriBuilder(perPage, last) + '>; rel="last"'
      linkHeader += uriPrefix + nextLink + ', ' + uriPrefix + lastLink
    }

    return linkHeader;
  }
}

function uriBuilder(perPage, page) {
  var uri = '?per_page=' + perPage + '&page=' + page
  return uri
}
