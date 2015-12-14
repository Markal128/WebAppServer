module autorequire.gl.collections {

    export interface IDataFormat {
        formatToString(): string;
        print(): string;
    }

    export interface IMap<K, V> {
        get(key: K): V;
        put(key: K, value: V): V;
        remove(key: K): V;
        keys(): K[];
        values(): V[];
        forEach(): boolean;
        containsKey(key: V): boolean;
        clear(): void;
        size(): number;
        isEmpty(): boolean;
    }

    

    function generateAutoHash(obj: any) {
        const hashValue = obj.__hash__;
        if (hashValue) {
            return;
        }
        
        Object.defineProperty(obj, "__hash__", {
            value: `$o__hash__${++global["__hashgen__"]}`
        });
    }

    export function parseHashKey(key: any): string {
        if(DummyUtil.isNumber(key)) {
            return "$n" + key;
        } else if(DummyUtil.isString(key)) {
            return "$s" + key;
        } else if(DummyUtil.isUndefined(key)) {
            return "$undefined";
        } else if(DummyUtil.isNull(key)) {
            return "$null";
        } else {
            if (DummyUtil.isFunction(key.hashKey)) {
                return "$o" + key.hashKey();
            } else {
                generateAutoHash(key);
                return key.__hash__;
            }
        }
    }

    export function parseMapKey(key: string, value: any): any {
        if (key.startWith("$n")) {          // 整数
            return parseInt(key.substring(2));
        } else if (key.startWith("$s")) {   // 字符串
            return key.substring(2);
        } else if (key.startWith("$o")) {   // 对象
            return value;
        }
    }

    export function parseMapValue(khash: string, value: any): any {
        if (khash.startWith("$o")) {
            return value.value;
        } else {
            return value;
        }
    }

    export class HashMap<K, V> implements IMap<K, V>, IDataFormat {
        
        private table: { [key: string]: any };
        private nElements: number;

        constructor() {
            this.table = {};
            this.nElements = 0;
        }

        get(key: K): V {
            return this.get(key);
        }

        put(key: K, value: V): V {
            if (DummyUtil.isUndefined(key) && DummyUtil.isUndefined(value)) {
                return undefined;
            }
            let ret: V;

            return ret;
        }

        remove(key: K): V {
            return this.get(key);
        }

        keys(): K[] {
            return [];
        }

        values(): V[] {
            return [];
        }

        forEach(): boolean {
            return true;
        }

        containsKey(key: V): boolean {
            return true;
        }

        clear(): void {
            
        }

        size(): number {
            return 1;
        }

        isEmpty(): boolean {
            return true;
        }

        formatToString(): string {
            return "";
        }

        print(): string {
            return "";
        }
    }
}

var collections = autorequire.gl.collections;