import pathNodeJS = require("path");
import fsNodeJS = require("fs");
var sysModule = require("module");
var oldWrapperFunc = sysModule.wrap;

// 设置文件目录路径
const appBaseDir = pathNodeJS.dirname(__dirname);
const appAppDir = pathNodeJS.dirname(__dirname) + "/app/";
const appCfgsDir = pathNodeJS.dirname(__dirname) + "/cfgs/";
const appGLDir = pathNodeJS.dirname(__dirname) + "/gl/";
const appHandlesDir = pathNodeJS.dirname(__dirname) + "/handles/";


/**
 * 需要替换的头文件的内容
 * @param content 
 * @returns {} 
 */
function wrapperGlFile(content: string) {
    return `(function (exports, require, module, __filename, __dirname) {var autorequire = global["autorequire"];${content}
});`;
}

function readArrayFromFilePath(filePath: string, fileList: string[], ext: string) {
    const dirList = fsNodeJS.readdirSync(filePath);
    dirList.forEach((fileName) => {
        var fullPath = filePath + "/" + fileName;
        if (fsNodeJS.statSync(fullPath).isDirectory()) {
            readArrayFromFilePath(fullPath, fileList, ".js");
        } else {
            if (pathNodeJS.extname(fullPath) === ext) {
                fileList.push(fullPath);
            }
        }
    });
}

function publishGlobal() {
    if (autorequire.gl) {
        const allGl = autorequire.gl;
        for (let key in allGl) {
            global[key] = allGl[key];
        }
    }
}

/**
 * 替换gl文件目录下所有的文件的头文件内容
 * @returns {} 
 */
function replaceGlDir() {
    const glAllFiles = [];
    readArrayFromFilePath(appGLDir, glAllFiles, ".js");
    glAllFiles.forEach((item) => {
        require(item);
    });
    publishGlobal();
    
}

function replaceFilePathDir(filepath: string) {
    const allFiles = [];
    readArrayFromFilePath(filepath, allFiles, ".js");
    allFiles.forEach((item) => {
        require(item);
    });
}

global["autorequire"] = {};
global["appBaseDir"] = appBaseDir;
global["appAppDir"] = appAppDir;
global["appGLDir"] = appGLDir;
global["appHandlesDir"] = appHandlesDir;
global["appCfgsDir"] = appCfgsDir;


function beforeAllProcess() {
    sysModule.wrap = (script: string) => wrapperGlFile(script);
    // 调用gl替换函数
    replaceGlDir();
    
    // app 目录
    replaceFilePathDir(appAppDir);

    // handles 目录
    replaceFilePathDir(appHandlesDir);
}

function afterAllProcess() {
    sysModule.wrap = oldWrapperFunc;
}

// 流程前准备
beforeAllProcess();


// 流程后
afterAllProcess();


