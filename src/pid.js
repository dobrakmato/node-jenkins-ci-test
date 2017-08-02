import fs from "fs";

let _createdPid = '';

const pidPath = function (path) {
    return __dirname + path;
};

/**
 * @param {string} path
 */
const pidCreate = (path) => {
    _createdPid = pidPath(path);
    fs.writeFileSync(_createdPid, String(process.pid));
};

const pidDelete = () => {
    fs.unlinkSync(_createdPid);
};

export default {
    create: pidCreate,
    delete: pidDelete
};