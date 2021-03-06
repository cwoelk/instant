var on = require('sendevent')
  , parse = require('./url')
  , find = require('./find')

var token

on('/instant/events', function(ev) {
  if (ev.token) {
    if (!token) token = ev.token
    if (token != ev.token) return location.reload()
  }

  // resolve the URL
  var url = parse(ev.url)

  // reload the page
  if (url.href == location.href) {
    location.reload()
    return
  }

  // look for a stylesheet
  var el = find('link', 'href', url)
  if (el) return el.href = url.pathname + '?v=' + new Date().getTime()

  // look for a script
  el = find('script', 'src', url)
  if (el) location.reload()
})
