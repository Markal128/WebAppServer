import pathNodeJS = require("path");
import fsNodeJS = require("fs");
var sysModule = require("module");
var oldWrapperFunc = sysModule.wrap;

// 设置文件目录路径
const appBaseDir = pathNodeJS.dirname(__dirname);
const appGLDir = pathNodeJS.dirname(__dirname) + "/gl/";
const appHandlesDir = pathNodeJS.dirname(__dirname) + "/handles/";
const appCfgsDir = pathNodeJS.dirname(__dirname) + "/cfgs/";

/**
 * 需要替换的头文件的内容
 * @param content 
 * @returns {} 
 */
function wrapperGlFile(content: string) {
    return `(function (exports, require, module, __filename, __dirname) {var app = global["app"];${content}
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
    if (app.gl) {
        const allGl = app.gl;
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
    sysModule.wrap = (script: string) => wrapperGlFile(script);
    const glAllFiles = [];
    readArrayFromFilePath(appGLDir, glAllFiles, ".js");
    glAllFiles.forEach((item) => {
        require(item);
    });
    publishGlobal();
    sysModule.wrap = oldWrapperFunc;
}

global["app"] = {};
global["appBaseDir"] = appBaseDir;
global["appGLDir"] = appGLDir;
global["appHandlesDir"] = appHandlesDir;
global["appCfgsDir"] = appCfgsDir;

// 调用gl替换函数
replaceGlDir();