const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
module.exports = {
  /**
   * Liste et retourne les répertoires présents dans le dossier précisé en paramètre
   * @param string chemin dossier parent
   */
  getDirectories: source =>
    readdirSync(source)
      .map(name => join(source, name))
      .filter(isDirectory)
      .map(folderPath => folderPath.replace(/^.*[\\\/]/, '')) // eslint-disable-line no-useless-escape
};
