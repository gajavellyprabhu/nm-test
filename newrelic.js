'use strict'

exports.config = {
  app_name: ['my-nextjs-app'],  // 👈 Name shown in New Relic dashboard
  license_key: process.env.NEW_RELIC_LICENSE_KEY, // 👈 Use env variable
  logging: {
    level: 'info' // 'trace' for debugging, 'info' for normal
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
}
