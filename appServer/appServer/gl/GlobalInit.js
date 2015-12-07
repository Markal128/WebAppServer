var pathNodeJS = require("path");
var fsNodeJS = require("fs");
var sysModule = require("module");
var oldWrapperFunc = sysModule.wrap;
// 设置文件目录路径
var appBaseDir = pathNodeJS.dirname(__dirname);
var appGLDir = pathNodeJS.dirname(__dirname) + "/gl/";
var appHandlesDir = pathNodeJS.dirname(__dirname) + "/handles/";
var appCfgsDir = pathNodeJS.dirname(__dirname) + "/cfgs/";
/**
 * 需要替换的头文件的内容
 * @param content
 * @returns {}
 */
function wrapperGlFile(content) {
    return "(function (exports, require, module, __filename, __dirname) {var autorequire = global[\"autorequire\"];" + content + "\n});";
}
function readArrayFromFilePath(filePath, fileList, ext) {
    var dirList = fsNodeJS.readdirSync(filePath);
    dirList.forEach(function (fileName) {
        var fullPath = filePath + "/" + fileName;
        if (fsNodeJS.statSync(fullPath).isDirectory()) {
            readArrayFromFilePath(fullPath, fileList, ".js");
        }
        else {
            if (pathNodeJS.extname(fullPath) === ext) {
                fileList.push(fullPath);
            }
        }
    });
}
function publishGlobal() {
    if (autorequire.gl) {
        var allGl = autorequire.gl;
        for (var key in allGl) {
            global[key] = allGl[key];
        }
    }
}
/**
 * 替换gl文件目录下所有的文件的头文件内容
 * @returns {}
 */
function replaceGlDir() {
    sysModule.wrap = function (script) { return wrapperGlFile(script); };
    var glAllFiles = [];
    readArrayFromFilePath(appBaseDir, glAllFiles, ".js");
    glAllFiles.forEach(function (item) {
        require(item);
    });
    publishGlobal();
    sysModule.wrap = oldWrapperFunc;
}
global["autorequire"] = {};
global["appBaseDir"] = appBaseDir;
global["appGLDir"] = appGLDir;
global["appHandlesDir"] = appHandlesDir;
global["appCfgsDir"] = appCfgsDir;
function beforeAllProcess() {
    // 调用gl替换函数
    replaceGlDir();
}
function afterAllProcess() {
}
// 流程前准备
beforeAllProcess();
// 流程后
afterAllProcess();
//# sourceMappingURL=GlobalInit.js.map