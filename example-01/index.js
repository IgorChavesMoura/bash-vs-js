const { existsSync, mkdirSync, rmSync } = require('fs');
const { execSync } = require('child_process');

const FOLDER_AMOUNT = 4;

const getDirName = (index) => index >= 3 ? `js-0${index}` : `mjs-0${index}`;

const rmDir = (folderName) => {

    rmSync(`./${folderName}`, { recursive: true });

};

const makeDirAndReturnName = (folderName) => {

    if(existsSync(folderName)) {

        rmDir(folderName);

    }

    mkdirSync(folderName);

    return folderName;

};

const initPackage = folderName => {

    execSync(`npm init -y --scope @IgorChavesMoura --silent > /dev/null`, { cwd: `./${folderName}` });

    return folderName;



};

const printPackageNameAndVersion = folderName => {

    const { name, version } = require(`./${folderName}/package.json`);

    console.log({ n: name, v: version });

    return folderName;

};

[...Array(FOLDER_AMOUNT).keys()]
    .map(index => makeDirAndReturnName(getDirName(index + 1)))
    .map(folderName => initPackage(folderName))
    .map(folderName => printPackageNameAndVersion(folderName))
    .map(folderName => rmDir(folderName));

