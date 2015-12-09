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

    export function parseHashKey(key: any): string {
        return "";
    }

    export function parseHashValue(key: string, value: any): any {
        if (key.startWith("$n")) {          // 整数
            return parseInt(key.substring(2));
        } else if (key.startWith("$s")) {   // 字符串
            return key.substring(2);
        } else if (key.startWith("$o")) {   // 对象
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