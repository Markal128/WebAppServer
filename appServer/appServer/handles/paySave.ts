
function handle(args: any, req: any, res: any, endcb: any) {
    endcb({ msg: "SUCCESS", code: 100 });
}

(module).exports = {
    "handle" : handle
};
