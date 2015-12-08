module autorequire.gl.collections {

    export interface IDataFormat {
        formatToString(): string;
        print(): string;
    }

    export interface IMap<K, V> {
        get(key: K): V;
        put(key: K, value: V): void;
        remove(key: K): V;
        keys(): K[];
        values(): V[];
        forEach(): boolean;
        containsKey(key: V): boolean;
        clear(): void;
        size(): number;
        isEmpty(): boolean;
    }

    export class HashMap<K, V> implements IMap<K, V>, IDataFormat {

        get(key: K): V {
            return this.get(key);
        }

        put(key: K, value: V): void {
            
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