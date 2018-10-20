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
