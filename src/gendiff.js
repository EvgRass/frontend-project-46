import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const getFileData = (filepath) => {
    const fullPath = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }

    const extname = path.extname(fullPath);
    const data = fs.readFileSync(fullPath, 'utf-8');
    switch (extname) {
      case '.json':
        return JSON.parse(data);
      default:
        throw new Error(`Unknown file extension: ${extname}`);
    }
  };

  const obj1 = getFileData(filepath1);
  const obj2 = getFileData(filepath2);
  const keys = Object.keys({ ...obj1, ...obj2 });

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
