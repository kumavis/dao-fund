var fs = require('fs')

var data = require('./trace.json')
var out = JSON.stringify(JSON.parse(data.vmTrace), null, 2)
fs.writeFileSync('./out.json', out)