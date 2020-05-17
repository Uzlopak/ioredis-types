
import * as fs from "fs";

const packageJson = JSON.parse(fs.readFileSync(`./ioredis/package.json`, 'utf8'));

packageJson["scripts"]["build-declarations"] = "rm -rf built && tsc --declaration";

fs.writeFileSync(`./ioredis/package.json`, JSON.stringify(packageJson, undefined, 2));


const tsconfigJson = JSON.parse(fs.readFileSync(`./ioredis/tsconfig.json`, 'utf8'));

tsconfigJson["compilerOptions"]["allowJs"] = false;

fs.writeFileSync(`./ioredis/tsconfig.json`, JSON.stringify(tsconfigJson, undefined, 2));

