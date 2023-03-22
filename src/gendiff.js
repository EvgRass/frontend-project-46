import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const getFileData = (filepath) => {
    const extname = path.extname(filepath);
    const data = fs.readFileSync(filepath, 'utf-8');
    switch (extname) {
      case '.json':
        return JSON.parse(data);
      default:
        throw new Error(`Unknown file extension: ${extname}`);
    }
  };

  const obj1 = getFileData(filepath1);
  const obj2 = getFileData(filepath2);
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const diff = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return `  + ${key}: ${JSON.stringify(obj2[key])}`;
    }
    if (!_.has(obj2, key)) {
      return `  - ${key}: ${JSON.stringify(obj1[key])}`;
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return `    ${key}: ${JSON.stringify(obj1[key])}`;
    }
    return [
      `  - ${key}: ${JSON.stringify(obj1[key])}`,
      `  + ${key}: ${JSON.stringify(obj2[key])}`,
    ];
  });

  return `{\n${_.flatten(diff).join('\n')}\n}`;
};

export default genDiff;
