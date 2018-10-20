const fs = require('fs');
const path = require('path');

const imports = {};

module.exports = {
  importer(fn) {
    let rp = path.dirname(fn).substr(path.dirname(fn).lastIndexOf('/') + 1);
    fs
      .readdirSync(path.dirname(fn))
      .filter(f => f.indexOf('.') != 0 && f != path.basename(fn) && f.slice(-3) === '.js')
      .forEach(f => {
        imports[f.slice(0, -3)] = require(`../${rp}/${f}`)
      });
    return imports;
  }
}

module.exports.progress = {
  start(name, count) {
    console.log('\x1b[36m%s\x1b[0m', `\nImporting ${count} ${name}:\n`);
  },
  update(name) {
    process.stdout.cursorTo(1);
    console.log('\x1b[2m%s\x1b[0m', `\u2714 ${name}\n`);
  },
  end(name) {
    console.log('\x1b[32m%s\x1b[0m', `Imported ${name} successfully!\n`);
  }
}
