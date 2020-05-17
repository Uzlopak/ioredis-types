// Type definitions for ioredis 4.16
// Project: https://github.com/luin/ioredis
// Definitions by: York Yao <https://github.com/plantain-00>
//                 Christopher Eck <https://github.com/chrisleck>
//                 Yoga Aliarham <https://github.com/aliarham11>
//                 Ebrahim <https://github.com/br8h>
//                 Shahar Mor <https://github.com/shaharmor>
//                 Whemoon Jang <https://github.com/palindrom615>
//                 Francis Gulotta <https://github.com/reconbot>
//                 Dmitry Motovilov <https://github.com/funthing>
//                 Oleg Repin <https://github.com/iamolegga>
//                 Ting-Wai To <https://github.com/tingwai-to>
//                 Alex Petty <https://github.com/pettyalex>
//                 Simon Schick <https://github.com/SimonSchick>
//                 Tianlin <https://github.com/tianlinle>
//                 Demian Rodriguez <https://github.com/demian85>
//                 Andrew Lavers <https://github.com/alavers>
//                 Claudiu Ceia <https://github.com/ClaudiuCeia>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

/* =================== USAGE ===================
    import * as Redis from "ioredis";
    const redis = new Redis();
 =============================================== */

/// <reference types="node" />

import { ConnectionOptions } from 'tls';
import { Readable } from 'stream';
import { EventEmitter } from 'events';

interface RedisStatic {
    new (port?: number, host?: string, options?: IORedis.RedisOptions): IORedis.Redis;
    new (host?: string, options?: IORedis.RedisOptions): IORedis.Redis;
    new (options?: IORedis.RedisOptions): IORedis.Redis;
    (port?: number, host?: string, options?: IORedis.RedisOptions): IORedis.Redis;
    (host?: string, options?: IORedis.RedisOptions): IORedis.Redis;
    (options?: IORedis.RedisOptions): IORedis.Redis;
    Cluster: IORedis.ClusterStatic;
    Command: typeof Command;
}

declare var IORedis: RedisStatic;
export = IORedis;

declare class Commander {
    getBuiltinCommands(): string[];
    createBuiltinCommand(commandName: string): {};
    defineCommand(
        name: string,
        definition: {
            numberOfKeys?: number;
            lua?: string;
        },
    ): void;
    sendCommand(): void;
}

interface CommandOptions {
    replyEncoding?: string | null;
    errorStack?: string;
    keyPrefix?: string;
}

declare class Command {
    isCustomCommand: boolean;
    args: IORedis.ValueType[];
    getSlot(): number | null;
    getKeys(): Array<string | Buffer>;
    constructor(
        name: string,
        args: IORedis.ValueType[],
        opts?: CommandOptions,
        callback?: (err: null, result: any) => void,
    );
    static setArgumentTransformer(name: string, fn: (args: IORedis.ValueType[]) => IORedis.ValueType[]): void;
    static setReplyTransformer(name: string, fn: (result: any) => any): void;
}

// For backwards compatibility
type _Command = typeof Command;

declare namespace IORedis {
    type BooleanResponse = 1 | 0;
    type Callback<T> = (err: Error | null, res: T) => void;
    type KeyType = string | Buffer;
    type ValueType = string | Buffer | number | any[];

    interface OverloadedCommand<T, U> {
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, arg4: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, cb: Callback<U>): void;
        (arg1: T | T[], cb: Callback<U>): void;
        (cb: Callback<U>): void;
        (...args: T[]): Promise<U>;
        (arg1: T[]): Promise<U>;
    }

    interface OverloadedListCommand<T, U> {
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, arg4: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, cb: Callback<U>): void;
        (arg1: T | T[], cb: Callback<U>): void;
        (...args: T[]): Promise<U>;
        (arg1: T[]): Promise<U>;
    }

    interface OverloadedBlockingListCommand<T, U> {
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T, timeout: number, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, timeout: number, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, arg4: T, timeout: number, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, timeout: number, cb: Callback<U>): void;
        (arg1: T, arg2: T, timeout: number, cb: Callback<U>): void;
        (arg1: T, timeout: number, cb: Callback<U>): void;
        (arg1: Array<T | number>, cb: Callback<U>): void;
        (...args: Array<T | number>): Promise<U>;
        (arg1: Array<T | number>): Promise<U>;
    }

    interface OverloadedSubCommand<T, U> {
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, arg4: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, cb: Callback<U>): void;
        (arg1: T, arg2: T | T[], cb: Callback<U>): void;
        (arg1: T | T[], cb: Callback<U>): void;
        (...args: T[]): Promise<U>;
        (arg1: T[]): Promise<U>;
    }

    interface OverloadedKeyCommand<T, U> {
        (key: KeyType, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T, cb: Callback<U>): void;
        (key: KeyType, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, cb: Callback<U>): void;
        (key: KeyType, arg1: T, arg2: T, arg3: T, arg4: T, cb: Callback<U>): void;
        (key: KeyType, arg1: T, arg2: T, arg3: T, cb: Callback<U>): void;
        (key: KeyType, arg1: T, arg2: T, cb: Callback<U>): void;
        (key: KeyType, arg1: T | T[], cb: Callback<U>): void;
        (key: KeyType, ...args: T[]): Promise<U>;
        (key: KeyType, arg1: T[]): Promise<U>;
    }

    interface OverloadedHashCommand<T, U> {
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, arg3: T, arg4: T, cb: Callback<U>): void;
        (arg1: T, arg2: T, cb: Callback<U>): void;
        (data: T[] | { [key: string]: T }, cb: Callback<U>): void;
        (data: T[] | { [key: string]: T }): Promise<U>;
        (...args: T[]): Promise<U>;
    }

    interface OverloadedKeyedHashCommand<T, U> {
        (key: KeyType, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T, cb: Callback<U>): void;
        (key: KeyType, arg1: T, arg2: T, arg3: T, arg4: T, cb: Callback<U>): void;
        (key: KeyType, arg1: T, arg2: T, cb: Callback<U>): void;
        (key: KeyType, data: T[] | { [key: string]: T }, cb: Callback<U>): void;
        (key: KeyType, data: T[] | { [key: string]: T }): Promise<U>;
        (key: KeyType, ...args: T[]): Promise<U>;
    }

    interface OverloadedEvalCommand<T, U> {
        (script: string, numKeys: number, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T, cb: Callback<U>): void;
        (script: string, numKeys: number, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, cb: Callback<U>): void;
        (script: string, numKeys: number, arg1: T, arg2: T, arg3: T, arg4: T, cb: Callback<U>): void;
        (script: string, numKeys: number, arg1: T, arg2: T, arg3: T, cb: Callback<U>): void;
        (script: string, numKeys: number, arg1: T, arg2: T, cb: Callback<U>): void;
        (script: string, numKeys: number, arg1: T | T[], cb: Callback<U>): void;
        (script: string, numKeys: number, ...args: T[]): Promise<U>;
        (script: string, numKeys: number, arg1: T[]): Promise<U>;
        // This overload exists specifically to retain compatibility to `redlock`
        // All arguments are by default flattened, declaring all possible permuatations
        // would be unreasonable (and probably impossible)
        (args: ValueType[], callback?: Callback<any>): any;
    }

    interface OverloadedScanCommand<T, U> {
        (key: string, cursor: number, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T, cb: Callback<U>): void;
        (key: string, cursor: number, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, cb: Callback<U>): void;
        (key: string, cursor: number, arg1: T, arg2: T, arg3: T, arg4: T, cb: Callback<U>): void;
        (key: string, cursor: number, arg1: T, arg2: T, arg3: T, cb: Callback<U>): void;
        (key: string, cursor: number, arg1: T, arg2: T, cb: Callback<U>): void;
        (key: string, cursor: number, arg1: T | T[], cb: Callback<U>): void;
        (key: string, cursor: number, cb: Callback<U>): void;
        (key: string, cursor: number, ...args: T[]): Promise<U>;
        (key: string, cursor: number, arg1: T[]): Promise<U>;
    }

    type Command = _Command;
