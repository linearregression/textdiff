var fs = require('fs'),
	a = JSON.parse(fs.readFileSync('package.json')),
	b = a.version.split('.')

b[2] = process.argv[2]
a.version = b.join('.')
fs.writeFileSync('package.json', JSON.stringify(a, null, "  "))