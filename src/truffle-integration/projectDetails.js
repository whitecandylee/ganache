const fs = require("fs");
const path = require("path");
const TruffleConfig = require("truffle-config");

function get(projectFile) {
  const configFileDirectory = path.dirname(projectFile);
  const name = path.basename(configFileDirectory);
  if (!fs.existsSync(projectFile)) {
    return {
      name,
      configFile: projectFile,
      error: "project-does-not-exist"
    };
  }
  else if (path.basename(projectFile).match(/^truffle(-config)?.js$/) === null) {
    return {
      name,
      configFile: projectFile,
      error: "invalid-project-file"
    };
  }
  else {
    let config = new TruffleConfig(configFileDirectory, configFileDirectory, "ganache");
    const output = require(projectFile);
    config.merge(output);

    let contracts = [];

    return { name, configFile: projectFile, config, contracts };
  }
}

module.exports = {
  get
}
