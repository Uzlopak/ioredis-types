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
interface Commands {
        /** 
         * Append a value to a key
         *
         * @see https://redis.io/commands/append
         * @since  2.0.0
         */
        append(key: KeyType, value: string, callback: Callback<number>): void;
        append(key: KeyType, value: string): Promise<number>;
    
        /** 
         * Authenticate to the server
         *
         * @see https://redis.io/commands/auth
         * @since  1.0.0
         */
        auth(password: string, callback: Callback<any>): void;
        auth(password: string): Promise<any>;
    
        /** 
         * Asynchronously rewrite the append-only file
         *
         * @see https://redis.io/commands/bgrewriteaof
         * @since  1.0.0
         */
        bgrewriteaof( callback: Callback<string>): void;
        bgrewriteaof(): Promise<string>;
    
        /** 
         * Asynchronously save the dataset to disk
         *
         * @see https://redis.io/commands/bgsave
         * @since  1.0.0
         */
        bgsave(schedule?: "SCHEDULE", callback: Callback<string>): void;
        bgsave(schedule?: "SCHEDULE"): Promise<string>;
    
        /** 
         * Count set bits in a string
         *
         * @see https://redis.io/commands/bitcount
         * @since  2.6.0
         */
        bitcount(key: KeyType, startEnd?: integer,integer, callback: Callback<any>): void;
        bitcount(key: KeyType, startEnd?: integer,integer): Promise<any>;
    
        /** 
         * Perform arbitrary bitfield integer operations on strings
         *
         * @see https://redis.io/commands/bitfield
         * @since  3.2.0
         */
        bitfield(key: KeyType, typeOffset?: type,integer, typeOffsetValue?: type,integer,integer, typeOffsetIncrement?: type,integer,integer, callback: Callback<any>): void;
        bitfield(key: KeyType, typeOffset?: type,integer, typeOffsetValue?: type,integer,integer, typeOffsetIncrement?: type,integer,integer): Promise<any>;
    
        /** 
         * Perform bitwise operations between strings
         *
         * @see https://redis.io/commands/bitop
         * @since  2.6.0
         */
        bitop(operation: string, destkey: KeyType, key: KeyType, callback: Callback<any>): void;
        bitop(operation: string, destkey: KeyType, key: KeyType): Promise<any>;
    
        /** 
         * Find first bit set or clear in a string
         *
         * @see https://redis.io/commands/bitpos
         * @since  2.8.7
         */
        bitpos(key: KeyType, bit: number, start?: number, end?: number, callback: Callback<any>): void;
        bitpos(key: KeyType, bit: number, start?: number, end?: number): Promise<any>;
    
        /** 
         * Remove and get the first element in a list, or block until one is available
         *
         * @see https://redis.io/commands/blpop
         * @since  2.0.0
         */
        blpop(key: KeyType, timeout: number, callback: Callback<any[]>): void;
        blpop(key: KeyType, timeout: number): Promise<any[]>;
    
        /** 
         * Remove and get the last element in a list, or block until one is available
         *
         * @see https://redis.io/commands/brpop
         * @since  2.0.0
         */
        brpop(key: KeyType, timeout: number, callback: Callback<any[]>): void;
        brpop(key: KeyType, timeout: number): Promise<any[]>;
    
        /** 
         * Pop an element from a list, push it to another list and return it; or block until one is available
         *
         * @see https://redis.io/commands/brpoplpush
         * @since  2.2.0
         */
        brpoplpush(source: KeyType, destination: KeyType, timeout: number, callback: Callback<string>): void;
        brpoplpush(source: KeyType, destination: KeyType, timeout: number): Promise<string>;
    
        /** 
         * Remove and return the member with the lowest score from one or more sorted sets, or block until one is available
         *
         * @see https://redis.io/commands/bzpopmin
         * @since  5.0.0
         */
        bzpopmin(key: KeyType, timeout: number, callback: Callback<any[]>): void;
        bzpopmin(key: KeyType, timeout: number): Promise<any[]>;
    
        /** 
         * Remove and return the member with the highest score from one or more sorted sets, or block until one is available
         *
         * @see https://redis.io/commands/bzpopmax
         * @since  5.0.0
         */
        bzpopmax(key: KeyType, timeout: number, callback: Callback<any[]>): void;
        bzpopmax(key: KeyType, timeout: number): Promise<any[]>;
    
        /** 
         * Get array of Redis command details
         *
         * @see https://redis.io/commands/command
         * @since  2.8.13
         */
        command( callback: Callback<any[]>): void;
        command(): Promise<any[]>;
    
        /** 
         * Return the number of keys in the selected database
         *
         * @see https://redis.io/commands/dbsize
         * @since  1.0.0
         */
        dbsize( callback: Callback<any>): void;
        dbsize(): Promise<any>;
    
        /** 
         * Decrement the integer value of a key by one
         *
         * @see https://redis.io/commands/decr
         * @since  1.0.0
         */
        decr(key: KeyType, callback: Callback<number>): void;
        decr(key: KeyType): Promise<number>;
    
        /** 
         * Decrement the integer value of a key by the given number
         *
         * @see https://redis.io/commands/decrby
         * @since  1.0.0
         */
        decrby(key: KeyType, decrement: number, callback: Callback<number>): void;
        decrby(key: KeyType, decrement: number): Promise<number>;
    
        /** 
         * Delete a key
         *
         * @see https://redis.io/commands/del
         * @since  1.0.0
         */
        del(key: KeyType, callback: Callback<number>): void;
        del(key: KeyType): Promise<number>;
    
        /** 
         * Discard all commands issued after MULTI
         *
         * @see https://redis.io/commands/discard
         * @since  2.0.0
         */
        discard( callback: Callback<string>): void;
        discard(): Promise<string>;
    
        /** 
         * Return a serialized version of the value stored at the specified key.
         *
         * @see https://redis.io/commands/dump
         * @since  2.6.0
         */
        dump(key: KeyType, callback: Callback<string>): void;
        dump(key: KeyType): Promise<string>;
    
        /** 
         * Echo the given string
         *
         * @see https://redis.io/commands/echo
         * @since  1.0.0
         */
        echo(message: string, callback: Callback<any>): void;
        echo(message: string): Promise<any>;
    
        /** 
         * Execute a Lua script server side
         *
         * @see https://redis.io/commands/eval
         * @since  2.6.0
         */
        eval(script: string, numkeys: number, key: KeyType, arg: string, callback: Callback<any>): void;
        eval(script: string, numkeys: number, key: KeyType, arg: string): Promise<any>;
    
        /** 
         * Execute a Lua script server side
         *
         * @see https://redis.io/commands/evalsha
         * @since  2.6.0
         */
        evalsha(sha1: string, numkeys: number, key: KeyType, arg: string, callback: Callback<any>): void;
        evalsha(sha1: string, numkeys: number, key: KeyType, arg: string): Promise<any>;
    
        /** 
         * Execute all commands issued after MULTI
         *
         * @see https://redis.io/commands/exec
         * @since  1.2.0
         */
        exec( callback: Callback<any[]>): void;
        exec(): Promise<any[]>;
    
        /** 
         * Determine if a key exists
         *
         * @see https://redis.io/commands/exists
         * @since  1.0.0
         */
        exists(key: KeyType, callback: Callback<any>): void;
        exists(key: KeyType): Promise<any>;
    
        /** 
         * Set a key's time to live in seconds
         *
         * @see https://redis.io/commands/expire
         * @since  1.0.0
         */
        expire(key: KeyType, seconds: number, callback: Callback<any>): void;
        expire(key: KeyType, seconds: number): Promise<any>;
    
        /** 
         * Set the expiration for a key as a UNIX timestamp
         *
         * @see https://redis.io/commands/expireat
         * @since  1.2.0
         */
        expireat(key: KeyType, timestamp: number, callback: Callback<any>): void;
        expireat(key: KeyType, timestamp: number): Promise<any>;
    
        /** 
         * Remove all keys from all databases
         *
         * @see https://redis.io/commands/flushall
         * @since  1.0.0
         */
        flushall(async?: "ASYNC", callback: Callback<any>): void;
        flushall(async?: "ASYNC"): Promise<any>;
    
        /** 
         * Remove all keys from the current database
         *
         * @see https://redis.io/commands/flushdb
         * @since  1.0.0
         */
        flushdb(async?: "ASYNC", callback: Callback<any>): void;
        flushdb(async?: "ASYNC"): Promise<any>;
    
        /** 
         * Add one or more geospatial items in the geospatial index represented using a sorted set
         *
         * @see https://redis.io/commands/geoadd
         * @since  3.2.0
         */
        geoadd(key: KeyType, longitudeLatitudeMember: double,double,string, callback: Callback<any>): void;
        geoadd(key: KeyType, longitudeLatitudeMember: double,double,string): Promise<any>;
    
        /** 
         * Returns members of a geospatial index as standard geohash strings
         *
         * @see https://redis.io/commands/geohash
         * @since  3.2.0
         */
        geohash(key: KeyType, member: string, callback: Callback<any>): void;
        geohash(key: KeyType, member: string): Promise<any>;
    
        /** 
         * Returns longitude and latitude of members of a geospatial index
         *
         * @see https://redis.io/commands/geopos
         * @since  3.2.0
         */
        geopos(key: KeyType, member: string, callback: Callback<any>): void;
        geopos(key: KeyType, member: string): Promise<any>;
    
        /** 
         * Returns the distance between two members of a geospatial index
         *
         * @see https://redis.io/commands/geodist
         * @since  3.2.0
         */
        geodist(key: KeyType, member1: string, member2: string, unit?: "m" | "km" | "ft" | "mi", callback: Callback<any>): void;
        geodist(key: KeyType, member1: string, member2: string, unit?: "m" | "km" | "ft" | "mi"): Promise<any>;
    
        /** 
         * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point
         *
         * @see https://redis.io/commands/georadius
         * @since  3.2.0
         */
        georadius(key: KeyType, longitude: number, latitude: number, radius: number, unit: "m" | "km" | "ft" | "mi", withcoord?: "WITHCOORD", withdist?: "WITHDIST", withhash?: "WITHHASH", count?: number, order?: "ASC" | "DESC", key?: KeyType, key?: KeyType, callback: Callback<any>): void;
        georadius(key: KeyType, longitude: number, latitude: number, radius: number, unit: "m" | "km" | "ft" | "mi", withcoord?: "WITHCOORD", withdist?: "WITHDIST", withhash?: "WITHHASH", count?: number, order?: "ASC" | "DESC", key?: KeyType, key?: KeyType): Promise<any>;
    
        /** 
         * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member
         *
         * @see https://redis.io/commands/georadiusbymember
         * @since  3.2.0
         */
        georadiusbymember(key: KeyType, member: string, radius: number, unit: "m" | "km" | "ft" | "mi", withcoord?: "WITHCOORD", withdist?: "WITHDIST", withhash?: "WITHHASH", count?: number, order?: "ASC" | "DESC", key?: KeyType, key?: KeyType, callback: Callback<any>): void;
        georadiusbymember(key: KeyType, member: string, radius: number, unit: "m" | "km" | "ft" | "mi", withcoord?: "WITHCOORD", withdist?: "WITHDIST", withhash?: "WITHHASH", count?: number, order?: "ASC" | "DESC", key?: KeyType, key?: KeyType): Promise<any>;
    
        /** 
         * Get the value of a key
         *
         * @see https://redis.io/commands/get
         * @since  1.0.0
         */
        get(key: KeyType, callback: Callback<string>): void;
        get(key: KeyType): Promise<string>;
    
        /** 
         * Returns the bit value at offset in the string value stored at key
         *
         * @see https://redis.io/commands/getbit
         * @since  2.2.0
         */
        getbit(key: KeyType, offset: number, callback: Callback<number>): void;
        getbit(key: KeyType, offset: number): Promise<number>;
    
        /** 
         * Get a substring of the string stored at a key
         *
         * @see https://redis.io/commands/getrange
         * @since  2.4.0
         */
        getrange(key: KeyType, start: number, end: number, callback: Callback<any>): void;
        getrange(key: KeyType, start: number, end: number): Promise<any>;
    
        /** 
         * Set the string value of a key and return its old value
         *
         * @see https://redis.io/commands/getset
         * @since  1.0.0
         */
        getset(key: KeyType, value: string, callback: Callback<string>): void;
        getset(key: KeyType, value: string): Promise<string>;
    
        /** 
         * Delete one or more hash fields
         *
         * @see https://redis.io/commands/hdel
         * @since  2.0.0
         */
        hdel(key: KeyType, field: string, callback: Callback<number>): void;
        hdel(key: KeyType, field: string): Promise<number>;
    
        /** 
         * switch Redis protocol
         *
         * @see https://redis.io/commands/hello
         * @since  6.0.0
         */
        hello(protover: number, usernamePassword?: string,string, clientname?: string, callback: Callback<any[]>): void;
        hello(protover: number, usernamePassword?: string,string, clientname?: string): Promise<any[]>;
    
        /** 
         * Determine if a hash field exists
         *
         * @see https://redis.io/commands/hexists
         * @since  2.0.0
         */
        hexists(key: KeyType, field: string, callback: Callback<any>): void;
        hexists(key: KeyType, field: string): Promise<any>;
    
        /** 
         * Get the value of a hash field
         *
         * @see https://redis.io/commands/hget
         * @since  2.0.0
         */
        hget(key: KeyType, field: string, callback: Callback<string>): void;
        hget(key: KeyType, field: string): Promise<string>;
    
        /** 
         * Get all the fields and values in a hash
         *
         * @see https://redis.io/commands/hgetall
         * @since  2.0.0
         */
        hgetall(key: KeyType, callback: Callback<any[]>): void;
        hgetall(key: KeyType): Promise<any[]>;
    
        /** 
         * Increment the integer value of a hash field by the given number
         *
         * @see https://redis.io/commands/hincrby
         * @since  2.0.0
         */
        hincrby(key: KeyType, field: string, increment: number, callback: Callback<number>): void;
        hincrby(key: KeyType, field: string, increment: number): Promise<number>;
    
        /** 
         * Increment the float value of a hash field by the given amount
         *
         * @see https://redis.io/commands/hincrbyfloat
         * @since  2.6.0
         */
        hincrbyfloat(key: KeyType, field: string, increment: number, callback: Callback<string>): void;
        hincrbyfloat(key: KeyType, field: string, increment: number): Promise<string>;
    
        /** 
         * Get all the fields in a hash
         *
         * @see https://redis.io/commands/hkeys
         * @since  2.0.0
         */
        hkeys(key: KeyType, callback: Callback<any[]>): void;
        hkeys(key: KeyType): Promise<any[]>;
    
        /** 
         * Get the number of fields in a hash
         *
         * @see https://redis.io/commands/hlen
         * @since  2.0.0
         */
        hlen(key: KeyType, callback: Callback<number>): void;
        hlen(key: KeyType): Promise<number>;
    
        /** 
         * Get the values of all the given hash fields
         *
         * @see https://redis.io/commands/hmget
         * @since  2.0.0
         */
        hmget(key: KeyType, field: string, callback: Callback<any[]>): void;
        hmget(key: KeyType, field: string): Promise<any[]>;
    
        /** 
         * Set multiple hash fields to multiple values
         *
         * @see https://redis.io/commands/hmset
         * @since  2.0.0
         */
        hmset(key: KeyType, fieldValue: string,string, callback: Callback<any>): void;
        hmset(key: KeyType, fieldValue: string,string): Promise<any>;
    
        /** 
         * Set the string value of a hash field
         *
         * @see https://redis.io/commands/hset
         * @since  2.0.0
         */
        hset(key: KeyType, fieldValue: string,string, callback: Callback<number>): void;
        hset(key: KeyType, fieldValue: string,string): Promise<number>;
    
        /** 
         * Set the value of a hash field, only if the field does not exist
         *
         * @see https://redis.io/commands/hsetnx
         * @since  2.0.0
         */
        hsetnx(key: KeyType, field: string, value: string, callback: Callback<any>): void;
        hsetnx(key: KeyType, field: string, value: string): Promise<any>;
    
        /** 
         * Get the length of the value of a hash field
         *
         * @see https://redis.io/commands/hstrlen
         * @since  3.2.0
         */
        hstrlen(key: KeyType, field: string, callback: Callback<number>): void;
        hstrlen(key: KeyType, field: string): Promise<number>;
    
        /** 
         * Get all the values in a hash
         *
         * @see https://redis.io/commands/hvals
         * @since  2.0.0
         */
        hvals(key: KeyType, callback: Callback<any[]>): void;
        hvals(key: KeyType): Promise<any[]>;
    
        /** 
         * Increment the integer value of a key by one
         *
         * @see https://redis.io/commands/incr
         * @since  1.0.0
         */
        incr(key: KeyType, callback: Callback<number>): void;
        incr(key: KeyType): Promise<number>;
    
        /** 
         * Increment the integer value of a key by the given amount
         *
         * @see https://redis.io/commands/incrby
         * @since  1.0.0
         */
        incrby(key: KeyType, increment: number, callback: Callback<number>): void;
        incrby(key: KeyType, increment: number): Promise<number>;
    
        /** 
         * Increment the float value of a key by the given amount
         *
         * @see https://redis.io/commands/incrbyfloat
         * @since  2.6.0
         */
        incrbyfloat(key: KeyType, increment: number, callback: Callback<string>): void;
        incrbyfloat(key: KeyType, increment: number): Promise<string>;
    
        /** 
         * Get information and statistics about the server
         *
         * @see https://redis.io/commands/info
         * @since  1.0.0
         */
        info(section?: string, callback: Callback<string>): void;
        info(section?: string): Promise<string>;
    
        /** 
         * Display some computer art and the Redis version
         *
         * @see https://redis.io/commands/lolwut
         * @since  5.0.0
         */
        lolwut(version?: number, callback: Callback<any>): void;
        lolwut(version?: number): Promise<any>;
    
        /** 
         * Find all keys matching the given pattern
         *
         * @see https://redis.io/commands/keys
         * @since  1.0.0
         */
        keys(pattern: string, callback: Callback<any[]>): void;
        keys(pattern: string): Promise<any[]>;
    
        /** 
         * Get the UNIX time stamp of the last successful save to disk
         *
         * @see https://redis.io/commands/lastsave
         * @since  1.0.0
         */
        lastsave( callback: Callback<number>): void;
        lastsave(): Promise<number>;
    
        /** 
         * Get an element from a list by its index
         *
         * @see https://redis.io/commands/lindex
         * @since  1.0.0
         */
        lindex(key: KeyType, index: number, callback: Callback<string>): void;
        lindex(key: KeyType, index: number): Promise<string>;
    
        /** 
         * Insert an element before or after another element in a list
         *
         * @see https://redis.io/commands/linsert
         * @since  2.2.0
         */
        linsert(key: KeyType, where: "BEFORE" | "AFTER", pivot: string, element: string, callback: Callback<number>): void;
        linsert(key: KeyType, where: "BEFORE" | "AFTER", pivot: string, element: string): Promise<number>;
    
        /** 
         * Get the length of a list
         *
         * @see https://redis.io/commands/llen
         * @since  1.0.0
         */
        llen(key: KeyType, callback: Callback<number>): void;
        llen(key: KeyType): Promise<number>;
    
        /** 
         * Remove and get the first element in a list
         *
         * @see https://redis.io/commands/lpop
         * @since  1.0.0
         */
        lpop(key: KeyType, callback: Callback<string>): void;
        lpop(key: KeyType): Promise<string>;
    
        /** 
         * Prepend one or multiple elements to a list
         *
         * @see https://redis.io/commands/lpush
         * @since  1.0.0
         */
        lpush(key: KeyType, element: string, callback: Callback<number>): void;
        lpush(key: KeyType, element: string): Promise<number>;
    
        /** 
         * Prepend an element to a list, only if the list exists
         *
         * @see https://redis.io/commands/lpushx
         * @since  2.2.0
         */
        lpushx(key: KeyType, element: string, callback: Callback<number>): void;
        lpushx(key: KeyType, element: string): Promise<number>;
    
        /** 
         * Get a range of elements from a list
         *
         * @see https://redis.io/commands/lrange
         * @since  1.0.0
         */
        lrange(key: KeyType, start: number, stop: number, callback: Callback<any[]>): void;
        lrange(key: KeyType, start: number, stop: number): Promise<any[]>;
    
        /** 
         * Remove elements from a list
         *
         * @see https://redis.io/commands/lrem
         * @since  1.0.0
         */
        lrem(key: KeyType, count: number, element: string, callback: Callback<number>): void;
        lrem(key: KeyType, count: number, element: string): Promise<number>;
    
        /** 
         * Set the value of an element in a list by its index
         *
         * @see https://redis.io/commands/lset
         * @since  1.0.0
         */
        lset(key: KeyType, index: number, element: string, callback: Callback<any>): void;
        lset(key: KeyType, index: number, element: string): Promise<any>;
    
        /** 
         * Trim a list to the specified range
         *
         * @see https://redis.io/commands/ltrim
         * @since  1.0.0
         */
        ltrim(key: KeyType, start: number, stop: number, callback: Callback<any>): void;
        ltrim(key: KeyType, start: number, stop: number): Promise<any>;
    
        /** 
         * Get the values of all the given keys
         *
         * @see https://redis.io/commands/mget
         * @since  1.0.0
         */
        mget(key: KeyType, callback: Callback<any[]>): void;
        mget(key: KeyType): Promise<any[]>;
    
        /** 
         * Atomically transfer a key from a Redis instance to another one.
         *
         * @see https://redis.io/commands/migrate
         * @since  2.6.0
         */
        migrate(host: string, port: string, key: "key" | "", destinationDb: number, timeout: number, copy?: "COPY", replace?: "REPLACE", password?: string, key?: KeyType, callback: Callback<string>): void;
        migrate(host: string, port: string, key: "key" | "", destinationDb: number, timeout: number, copy?: "COPY", replace?: "REPLACE", password?: string, key?: KeyType): Promise<string>;
    
        /** 
         * Listen for all requests received by the server in real time
         *
         * @see https://redis.io/commands/monitor
         * @since  1.0.0
         */
        monitor( callback: Callback<any>): void;
        monitor(): Promise<any>;
    
        /** 
         * Move a key to another database
         *
         * @see https://redis.io/commands/move
         * @since  1.0.0
         */
        move(key: KeyType, db: number, callback: Callback<any>): void;
        move(key: KeyType, db: number): Promise<any>;
    
        /** 
         * Set multiple keys to multiple values
         *
         * @see https://redis.io/commands/mset
         * @since  1.0.1
         */
        mset(keyValue: key,string, callback: Callback<string>): void;
        mset(keyValue: key,string): Promise<string>;
    
        /** 
         * Set multiple keys to multiple values, only if none of the keys exist
         *
         * @see https://redis.io/commands/msetnx
         * @since  1.0.1
         */
        msetnx(keyValue: key,string, callback: Callback<any>): void;
        msetnx(keyValue: key,string): Promise<any>;
    
        /** 
         * Mark the start of a transaction block
         *
         * @see https://redis.io/commands/multi
         * @since  1.2.0
         */
        multi( callback: Callback<string>): void;
        multi(): Promise<string>;
    
        /** 
         * Inspect the internals of Redis objects
         *
         * @see https://redis.io/commands/object
         * @since  2.2.3
         */
        object(subcommand: string, arguments?: string, callback: Callback<any>): void;
        object(subcommand: string, arguments?: string): Promise<any>;
    
        /** 
         * Remove the expiration from a key
         *
         * @see https://redis.io/commands/persist
         * @since  2.2.0
         */
        persist(key: KeyType, callback: Callback<any>): void;
        persist(key: KeyType): Promise<any>;
    
        /** 
         * Set a key's time to live in milliseconds
         *
         * @see https://redis.io/commands/pexpire
         * @since  2.6.0
         */
        pexpire(key: KeyType, milliseconds: number, callback: Callback<any>): void;
        pexpire(key: KeyType, milliseconds: number): Promise<any>;
    
        /** 
         * Set the expiration for a key as a UNIX timestamp specified in milliseconds
         *
         * @see https://redis.io/commands/pexpireat
         * @since  2.6.0
         */
        pexpireat(key: KeyType, millisecondsTimestamp: number, callback: Callback<any>): void;
        pexpireat(key: KeyType, millisecondsTimestamp: number): Promise<any>;
    
        /** 
         * Adds the specified elements to the specified HyperLogLog.
         *
         * @see https://redis.io/commands/pfadd
         * @since  2.8.9
         */
        pfadd(key: KeyType, element: string, callback: Callback<any>): void;
        pfadd(key: KeyType, element: string): Promise<any>;
    
        /** 
         * Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
         *
         * @see https://redis.io/commands/pfcount
         * @since  2.8.9
         */
        pfcount(key: KeyType, callback: Callback<any>): void;
        pfcount(key: KeyType): Promise<any>;
    
        /** 
         * Merge N different HyperLogLogs into a single one.
         *
         * @see https://redis.io/commands/pfmerge
         * @since  2.8.9
         */
        pfmerge(destkey: KeyType, sourcekey: KeyType, callback: Callback<string>): void;
        pfmerge(destkey: KeyType, sourcekey: KeyType): Promise<string>;
    
        /** 
         * Ping the server
         *
         * @see https://redis.io/commands/ping
         * @since  1.0.0
         */
        ping(message?: string, callback: Callback<any>): void;
        ping(message?: string): Promise<any>;
    
        /** 
         * Set the value and expiration in milliseconds of a key
         *
         * @see https://redis.io/commands/psetex
         * @since  2.6.0
         */
        psetex(key: KeyType, milliseconds: number, value: string, callback: Callback<any>): void;
        psetex(key: KeyType, milliseconds: number, value: string): Promise<any>;
    
        /** 
         * Listen for messages published to channels matching the given patterns
         *
         * @see https://redis.io/commands/psubscribe
         * @since  2.0.0
         */
        psubscribe(pattern: pattern, callback: Callback<any>): void;
        psubscribe(pattern: pattern): Promise<any>;
    
        /** 
         * Inspect the state of the Pub/Sub subsystem
         *
         * @see https://redis.io/commands/pubsub
         * @since  2.8.0
         */
        pubsub(subcommand: string, argument?: string, callback: Callback<any[]>): void;
        pubsub(subcommand: string, argument?: string): Promise<any[]>;
    
        /** 
         * Get the time to live for a key in milliseconds
         *
         * @see https://redis.io/commands/pttl
         * @since  2.6.0
         */
        pttl(key: KeyType, callback: Callback<number>): void;
        pttl(key: KeyType): Promise<number>;
    
        /** 
         * Post a message to a channel
         *
         * @see https://redis.io/commands/publish
         * @since  2.0.0
         */
        publish(channel: string, message: string, callback: Callback<number>): void;
        publish(channel: string, message: string): Promise<number>;
    
        /** 
         * Stop listening for messages posted to channels matching the given patterns
         *
         * @see https://redis.io/commands/punsubscribe
         * @since  2.0.0
         */
        punsubscribe(pattern?: string, callback: Callback<any>): void;
        punsubscribe(pattern?: string): Promise<any>;
    
        /** 
         * Close the connection
         *
         * @see https://redis.io/commands/quit
         * @since  1.0.0
         */
        quit( callback: Callback<string>): void;
        quit(): Promise<string>;
    
        /** 
         * Return a random key from the keyspace
         *
         * @see https://redis.io/commands/randomkey
         * @since  1.0.0
         */
        randomkey( callback: Callback<string>): void;
        randomkey(): Promise<string>;
    
        /** 
         * Enables read queries for a connection to a cluster replica node
         *
         * @see https://redis.io/commands/readonly
         * @since  3.0.0
         */
        readonly( callback: Callback<any>): void;
        readonly(): Promise<any>;
    
        /** 
         * Disables read queries for a connection to a cluster replica node
         *
         * @see https://redis.io/commands/readwrite
         * @since  3.0.0
         */
        readwrite( callback: Callback<any>): void;
        readwrite(): Promise<any>;
    
        /** 
         * Rename a key
         *
         * @see https://redis.io/commands/rename
         * @since  1.0.0
         */
        rename(key: KeyType, newkey: KeyType, callback: Callback<any>): void;
        rename(key: KeyType, newkey: KeyType): Promise<any>;
    
        /** 
         * Rename a key, only if the new key does not exist
         *
         * @see https://redis.io/commands/renamenx
         * @since  1.0.0
         */
        renamenx(key: KeyType, newkey: KeyType, callback: Callback<any>): void;
        renamenx(key: KeyType, newkey: KeyType): Promise<any>;
    
        /** 
         * Create a key using the provided serialized value, previously obtained using DUMP.
         *
         * @see https://redis.io/commands/restore
         * @since  2.6.0
         */
        restore(key: KeyType, ttl: number, serializedValue: string, replace?: "REPLACE", absttl?: "ABSTTL", seconds?: number, frequency?: number, callback: Callback<string>): void;
        restore(key: KeyType, ttl: number, serializedValue: string, replace?: "REPLACE", absttl?: "ABSTTL", seconds?: number, frequency?: number): Promise<string>;
    
        /** 
         * Return the role of the instance in the context of replication
         *
         * @see https://redis.io/commands/role
         * @since  2.8.12
         */
        role( callback: Callback<any[]>): void;
        role(): Promise<any[]>;
    
        /** 
         * Remove and get the last element in a list
         *
         * @see https://redis.io/commands/rpop
         * @since  1.0.0
         */
        rpop(key: KeyType, callback: Callback<string>): void;
        rpop(key: KeyType): Promise<string>;
    
        /** 
         * Remove the last element in a list, prepend it to another list and return it
         *
         * @see https://redis.io/commands/rpoplpush
         * @since  1.2.0
         */
        rpoplpush(source: KeyType, destination: KeyType, callback: Callback<string>): void;
        rpoplpush(source: KeyType, destination: KeyType): Promise<string>;
    
        /** 
         * Append one or multiple elements to a list
         *
         * @see https://redis.io/commands/rpush
         * @since  1.0.0
         */
        rpush(key: KeyType, element: string, callback: Callback<number>): void;
        rpush(key: KeyType, element: string): Promise<number>;
    
        /** 
         * Append an element to a list, only if the list exists
         *
         * @see https://redis.io/commands/rpushx
         * @since  2.2.0
         */
        rpushx(key: KeyType, element: string, callback: Callback<number>): void;
        rpushx(key: KeyType, element: string): Promise<number>;
    
        /** 
         * Add one or more members to a set
         *
         * @see https://redis.io/commands/sadd
         * @since  1.0.0
         */
        sadd(key: KeyType, member: string, callback: Callback<number>): void;
        sadd(key: KeyType, member: string): Promise<number>;
    
        /** 
         * Synchronously save the dataset to disk
         *
         * @see https://redis.io/commands/save
         * @since  1.0.0
         */
        save( callback: Callback<string>): void;
        save(): Promise<string>;
    
        /** 
         * Get the number of members in a set
         *
         * @see https://redis.io/commands/scard
         * @since  1.0.0
         */
        scard(key: KeyType, callback: Callback<number>): void;
        scard(key: KeyType): Promise<number>;
    
        /** 
         * Subtract multiple sets
         *
         * @see https://redis.io/commands/sdiff
         * @since  1.0.0
         */
        sdiff(key: KeyType, callback: Callback<any[]>): void;
        sdiff(key: KeyType): Promise<any[]>;
    
        /** 
         * Subtract multiple sets and store the resulting set in a key
         *
         * @see https://redis.io/commands/sdiffstore
         * @since  1.0.0
         */
        sdiffstore(destination: KeyType, key: KeyType, callback: Callback<number>): void;
        sdiffstore(destination: KeyType, key: KeyType): Promise<number>;
    
        /** 
         * Change the selected database for the current connection
         *
         * @see https://redis.io/commands/select
         * @since  1.0.0
         */
        select(index: number, callback: Callback<any>): void;
        select(index: number): Promise<any>;
    
        /** 
         * Set the string value of a key
         *
         * @see https://redis.io/commands/set
         * @since  1.0.0
         */
        set(key: KeyType, value: string, expiration?: "EX seconds" | "PX milliseconds", condition?: "NX" | "XX", keepttl?: "KEEPTTL", callback: Callback<string>): void;
        set(key: KeyType, value: string, expiration?: "EX seconds" | "PX milliseconds", condition?: "NX" | "XX", keepttl?: "KEEPTTL"): Promise<string>;
    
        /** 
         * Sets or clears the bit at offset in the string value stored at key
         *
         * @see https://redis.io/commands/setbit
         * @since  2.2.0
         */
        setbit(key: KeyType, offset: number, value: number, callback: Callback<number>): void;
        setbit(key: KeyType, offset: number, value: number): Promise<number>;
    
        /** 
         * Set the value and expiration of a key
         *
         * @see https://redis.io/commands/setex
         * @since  2.0.0
         */
        setex(key: KeyType, seconds: number, value: string, callback: Callback<any>): void;
        setex(key: KeyType, seconds: number, value: string): Promise<any>;
    
        /** 
         * Set the value of a key, only if the key does not exist
         *
         * @see https://redis.io/commands/setnx
         * @since  1.0.0
         */
        setnx(key: KeyType, value: string, callback: Callback<any>): void;
        setnx(key: KeyType, value: string): Promise<any>;
    
        /** 
         * Overwrite part of a string at key starting at the specified offset
         *
         * @see https://redis.io/commands/setrange
         * @since  2.2.0
         */
        setrange(key: KeyType, offset: number, value: string, callback: Callback<number>): void;
        setrange(key: KeyType, offset: number, value: string): Promise<number>;
    
        /** 
         * Synchronously save the dataset to disk and then shut down the server
         *
         * @see https://redis.io/commands/shutdown
         * @since  1.0.0
         */
        shutdown(saveMode?: "NOSAVE" | "SAVE", callback: Callback<any>): void;
        shutdown(saveMode?: "NOSAVE" | "SAVE"): Promise<any>;
    
        /** 
         * Intersect multiple sets
         *
         * @see https://redis.io/commands/sinter
         * @since  1.0.0
         */
        sinter(key: KeyType, callback: Callback<any[]>): void;
        sinter(key: KeyType): Promise<any[]>;
    
        /** 
         * Intersect multiple sets and store the resulting set in a key
         *
         * @see https://redis.io/commands/sinterstore
         * @since  1.0.0
         */
        sinterstore(destination: KeyType, key: KeyType, callback: Callback<number>): void;
        sinterstore(destination: KeyType, key: KeyType): Promise<number>;
    
        /** 
         * Determine if a given value is a member of a set
         *
         * @see https://redis.io/commands/sismember
         * @since  1.0.0
         */
        sismember(key: KeyType, member: string, callback: Callback<any>): void;
        sismember(key: KeyType, member: string): Promise<any>;
    
        /** 
         * Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.
         *
         * @see https://redis.io/commands/slaveof
         * @since  1.0.0
         */
        slaveof(host: string, port: string, callback: Callback<any>): void;
        slaveof(host: string, port: string): Promise<any>;
    
        /** 
         * Make the server a replica of another instance, or promote it as master.
         *
         * @see https://redis.io/commands/replicaof
         * @since  5.0.0
         */
        replicaof(host: string, port: string, callback: Callback<any>): void;
        replicaof(host: string, port: string): Promise<any>;
    
        /** 
         * Manages the Redis slow queries log
         *
         * @see https://redis.io/commands/slowlog
         * @since  2.2.12
         */
        slowlog(subcommand: string, argument?: string, callback: Callback<any>): void;
        slowlog(subcommand: string, argument?: string): Promise<any>;
    
        /** 
         * Get all the members in a set
         *
         * @see https://redis.io/commands/smembers
         * @since  1.0.0
         */
        smembers(key: KeyType, callback: Callback<any[]>): void;
        smembers(key: KeyType): Promise<any[]>;
    
        /** 
         * Move a member from one set to another
         *
         * @see https://redis.io/commands/smove
         * @since  1.0.0
         */
        smove(source: KeyType, destination: KeyType, member: string, callback: Callback<any>): void;
        smove(source: KeyType, destination: KeyType, member: string): Promise<any>;
    
        /** 
         * Sort the elements in a list, set or sorted set
         *
         * @see https://redis.io/commands/sort
         * @since  1.0.0
         */
        sort(key: KeyType, pattern?: string, offsetCount?: integer,integer, pattern?: string, order?: "ASC" | "DESC", sorting?: "ALPHA", destination?: KeyType, callback: Callback<any[]>): void;
        sort(key: KeyType, pattern?: string, offsetCount?: integer,integer, pattern?: string, order?: "ASC" | "DESC", sorting?: "ALPHA", destination?: KeyType): Promise<any[]>;
    
        /** 
         * Remove and return one or multiple random members from a set
         *
         * @see https://redis.io/commands/spop
         * @since  1.0.0
         */
        spop(key: KeyType, count?: number, callback: Callback<string>): void;
        spop(key: KeyType, count?: number): Promise<string>;
    
        /** 
         * Get one or multiple random members from a set
         *
         * @see https://redis.io/commands/srandmember
         * @since  1.0.0
         */
        srandmember(key: KeyType, count?: number, callback: Callback<string>): void;
        srandmember(key: KeyType, count?: number): Promise<string>;
    
        /** 
         * Remove one or more members from a set
         *
         * @see https://redis.io/commands/srem
         * @since  1.0.0
         */
        srem(key: KeyType, member: string, callback: Callback<number>): void;
        srem(key: KeyType, member: string): Promise<number>;
    
        /** 
         * Run algorithms (currently LCS) against strings
         *
         * @see https://redis.io/commands/stralgo
         * @since  6.0.0
         */
        stralgo(algorithm: "LCS", algoSpecificArgument: string, callback: Callback<any>): void;
        stralgo(algorithm: "LCS", algoSpecificArgument: string): Promise<any>;
    
        /** 
         * Get the length of the value stored in a key
         *
         * @see https://redis.io/commands/strlen
         * @since  2.2.0
         */
        strlen(key: KeyType, callback: Callback<number>): void;
        strlen(key: KeyType): Promise<number>;
    
        /** 
         * Listen for messages published to the given channels
         *
         * @see https://redis.io/commands/subscribe
         * @since  2.0.0
         */
        subscribe(channel: string, callback: Callback<any>): void;
        subscribe(channel: string): Promise<any>;
    
        /** 
         * Add multiple sets
         *
         * @see https://redis.io/commands/sunion
         * @since  1.0.0
         */
        sunion(key: KeyType, callback: Callback<any[]>): void;
        sunion(key: KeyType): Promise<any[]>;
    
        /** 
         * Add multiple sets and store the resulting set in a key
         *
         * @see https://redis.io/commands/sunionstore
         * @since  1.0.0
         */
        sunionstore(destination: KeyType, key: KeyType, callback: Callback<number>): void;
        sunionstore(destination: KeyType, key: KeyType): Promise<number>;
    
        /** 
         * Swaps two Redis databases
         *
         * @see https://redis.io/commands/swapdb
         * @since  4.0.0
         */
        swapdb(index1: number, index2: number, callback: Callback<string>): void;
        swapdb(index1: number, index2: number): Promise<string>;
    
        /** 
         * Internal command used for replication
         *
         * @see https://redis.io/commands/sync
         * @since  1.0.0
         */
        sync( callback: Callback<any>): void;
        sync(): Promise<any>;
    
        /** 
         * Internal command used for replication
         *
         * @see https://redis.io/commands/psync
         * @since  2.8.0
         */
        psync(replicationid: number, offset: number, callback: Callback<any>): void;
        psync(replicationid: number, offset: number): Promise<any>;
    
        /** 
         * Return the current server time
         *
         * @see https://redis.io/commands/time
         * @since  2.6.0
         */
        time( callback: Callback<any>): void;
        time(): Promise<any>;
    
        /** 
         * Alters the last access time of a key(s). Returns the number of existing keys specified.
         *
         * @see https://redis.io/commands/touch
         * @since  3.2.1
         */
        touch(key: KeyType, callback: Callback<number>): void;
        touch(key: KeyType): Promise<number>;
    
        /** 
         * Get the time to live for a key
         *
         * @see https://redis.io/commands/ttl
         * @since  1.0.0
         */
        ttl(key: KeyType, callback: Callback<number>): void;
        ttl(key: KeyType): Promise<number>;
    
        /** 
         * Determine the type stored at key
         *
         * @see https://redis.io/commands/type
         * @since  1.0.0
         */
        type(key: KeyType, callback: Callback<string>): void;
        type(key: KeyType): Promise<string>;
    
        /** 
         * Stop listening for messages posted to the given channels
         *
         * @see https://redis.io/commands/unsubscribe
         * @since  2.0.0
         */
        unsubscribe(channel?: string, callback: Callback<any>): void;
        unsubscribe(channel?: string): Promise<any>;
    
        /** 
         * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
         *
         * @see https://redis.io/commands/unlink
         * @since  4.0.0
         */
        unlink(key: KeyType, callback: Callback<number>): void;
        unlink(key: KeyType): Promise<number>;
    
        /** 
         * Forget about all watched keys
         *
         * @see https://redis.io/commands/unwatch
         * @since  2.2.0
         */
        unwatch( callback: Callback<string>): void;
        unwatch(): Promise<string>;
    
        /** 
         * Wait for the synchronous replication of all the write commands sent in the context of the current connection
         *
         * @see https://redis.io/commands/wait
         * @since  3.0.0
         */
        wait(numreplicas: number, timeout: number, callback: Callback<number>): void;
        wait(numreplicas: number, timeout: number): Promise<number>;
    
        /** 
         * Watch the given keys to determine execution of the MULTI/EXEC block
         *
         * @see https://redis.io/commands/watch
         * @since  2.2.0
         */
        watch(key: KeyType, callback: Callback<string>): void;
        watch(key: KeyType): Promise<string>;
    
        /** 
         * Add one or more members to a sorted set, or update its score if it already exists
         *
         * @see https://redis.io/commands/zadd
         * @since  1.2.0
         */
        zadd(key: KeyType, condition?: "NX" | "XX", change?: "CH", increment?: "INCR", scoreMember: double,string, callback: Callback<any>): void;
        zadd(key: KeyType, condition?: "NX" | "XX", change?: "CH", increment?: "INCR", scoreMember: double,string): Promise<any>;
    
        /** 
         * Get the number of members in a sorted set
         *
         * @see https://redis.io/commands/zcard
         * @since  1.2.0
         */
        zcard(key: KeyType, callback: Callback<number>): void;
        zcard(key: KeyType): Promise<number>;
    
        /** 
         * Count the members in a sorted set with scores within the given values
         *
         * @see https://redis.io/commands/zcount
         * @since  2.0.0
         */
        zcount(key: KeyType, min: number, max: number, callback: Callback<number>): void;
        zcount(key: KeyType, min: number, max: number): Promise<number>;
    
        /** 
         * Increment the score of a member in a sorted set
         *
         * @see https://redis.io/commands/zincrby
         * @since  1.2.0
         */
        zincrby(key: KeyType, increment: number, member: string, callback: Callback<string>): void;
        zincrby(key: KeyType, increment: number, member: string): Promise<string>;
    
        /** 
         * Intersect multiple sorted sets and store the resulting sorted set in a new key
         *
         * @see https://redis.io/commands/zinterstore
         * @since  2.0.0
         */
        zinterstore(destination: KeyType, numkeys: number, key: KeyType, weight?: number, aggregate?: "SUM" | "MIN" | "MAX", callback: Callback<number>): void;
        zinterstore(destination: KeyType, numkeys: number, key: KeyType, weight?: number, aggregate?: "SUM" | "MIN" | "MAX"): Promise<number>;
    
        /** 
         * Count the number of members in a sorted set between a given lexicographical range
         *
         * @see https://redis.io/commands/zlexcount
         * @since  2.8.9
         */
        zlexcount(key: KeyType, min: string, max: string, callback: Callback<number>): void;
        zlexcount(key: KeyType, min: string, max: string): Promise<number>;
    
        /** 
         * Remove and return members with the highest scores in a sorted set
         *
         * @see https://redis.io/commands/zpopmax
         * @since  5.0.0
         */
        zpopmax(key: KeyType, count?: number, callback: Callback<any[]>): void;
        zpopmax(key: KeyType, count?: number): Promise<any[]>;
    
        /** 
         * Remove and return members with the lowest scores in a sorted set
         *
         * @see https://redis.io/commands/zpopmin
         * @since  5.0.0
         */
        zpopmin(key: KeyType, count?: number, callback: Callback<any[]>): void;
        zpopmin(key: KeyType, count?: number): Promise<any[]>;
    
        /** 
         * Return a range of members in a sorted set, by index
         *
         * @see https://redis.io/commands/zrange
         * @since  1.2.0
         */
        zrange(key: KeyType, start: number, stop: number, withscores?: "WITHSCORES", callback: Callback<any[]>): void;
        zrange(key: KeyType, start: number, stop: number, withscores?: "WITHSCORES"): Promise<any[]>;
    
        /** 
         * Return a range of members in a sorted set, by lexicographical range
         *
         * @see https://redis.io/commands/zrangebylex
         * @since  2.8.9
         */
        zrangebylex(key: KeyType, min: string, max: string, offsetCount?: integer,integer, callback: Callback<any[]>): void;
        zrangebylex(key: KeyType, min: string, max: string, offsetCount?: integer,integer): Promise<any[]>;
    
        /** 
         * Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.
         *
         * @see https://redis.io/commands/zrevrangebylex
         * @since  2.8.9
         */
        zrevrangebylex(key: KeyType, max: string, min: string, offsetCount?: integer,integer, callback: Callback<any[]>): void;
        zrevrangebylex(key: KeyType, max: string, min: string, offsetCount?: integer,integer): Promise<any[]>;
    
        /** 
         * Return a range of members in a sorted set, by score
         *
         * @see https://redis.io/commands/zrangebyscore
         * @since  1.0.5
         */
        zrangebyscore(key: KeyType, min: number, max: number, withscores?: "WITHSCORES", offsetCount?: integer,integer, callback: Callback<any[]>): void;
        zrangebyscore(key: KeyType, min: number, max: number, withscores?: "WITHSCORES", offsetCount?: integer,integer): Promise<any[]>;
    
        /** 
         * Determine the index of a member in a sorted set
         *
         * @see https://redis.io/commands/zrank
         * @since  2.0.0
         */
        zrank(key: KeyType, member: string, callback: Callback<number>): void;
        zrank(key: KeyType, member: string): Promise<number>;
    
        /** 
         * Remove one or more members from a sorted set
         *
         * @see https://redis.io/commands/zrem
         * @since  1.2.0
         */
        zrem(key: KeyType, member: string, callback: Callback<any>): void;
        zrem(key: KeyType, member: string): Promise<any>;
    
        /** 
         * Remove all members in a sorted set between the given lexicographical range
         *
         * @see https://redis.io/commands/zremrangebylex
         * @since  2.8.9
         */
        zremrangebylex(key: KeyType, min: string, max: string, callback: Callback<number>): void;
        zremrangebylex(key: KeyType, min: string, max: string): Promise<number>;
    
        /** 
         * Remove all members in a sorted set within the given indexes
         *
         * @see https://redis.io/commands/zremrangebyrank
         * @since  2.0.0
         */
        zremrangebyrank(key: KeyType, start: number, stop: number, callback: Callback<number>): void;
        zremrangebyrank(key: KeyType, start: number, stop: number): Promise<number>;
    
        /** 
         * Remove all members in a sorted set within the given scores
         *
         * @see https://redis.io/commands/zremrangebyscore
         * @since  1.2.0
         */
        zremrangebyscore(key: KeyType, min: number, max: number, callback: Callback<number>): void;
        zremrangebyscore(key: KeyType, min: number, max: number): Promise<number>;
    
        /** 
         * Return a range of members in a sorted set, by index, with scores ordered from high to low
         *
         * @see https://redis.io/commands/zrevrange
         * @since  1.2.0
         */
        zrevrange(key: KeyType, start: number, stop: number, withscores?: "WITHSCORES", callback: Callback<any[]>): void;
        zrevrange(key: KeyType, start: number, stop: number, withscores?: "WITHSCORES"): Promise<any[]>;
    
        /** 
         * Return a range of members in a sorted set, by score, with scores ordered from high to low
         *
         * @see https://redis.io/commands/zrevrangebyscore
         * @since  2.2.0
         */
        zrevrangebyscore(key: KeyType, max: number, min: number, withscores?: "WITHSCORES", offsetCount?: integer,integer, callback: Callback<any[]>): void;
        zrevrangebyscore(key: KeyType, max: number, min: number, withscores?: "WITHSCORES", offsetCount?: integer,integer): Promise<any[]>;
    
        /** 
         * Determine the index of a member in a sorted set, with scores ordered from high to low
         *
         * @see https://redis.io/commands/zrevrank
         * @since  2.0.0
         */
        zrevrank(key: KeyType, member: string, callback: Callback<number>): void;
        zrevrank(key: KeyType, member: string): Promise<number>;
    
        /** 
         * Get the score associated with the given member in a sorted set
         *
         * @see https://redis.io/commands/zscore
         * @since  1.2.0
         */
        zscore(key: KeyType, member: string, callback: Callback<string>): void;
        zscore(key: KeyType, member: string): Promise<string>;
    
        /** 
         * Add multiple sorted sets and store the resulting sorted set in a new key
         *
         * @see https://redis.io/commands/zunionstore
         * @since  2.0.0
         */
        zunionstore(destination: KeyType, numkeys: number, key: KeyType, weight?: number, aggregate?: "SUM" | "MIN" | "MAX", callback: Callback<number>): void;
        zunionstore(destination: KeyType, numkeys: number, key: KeyType, weight?: number, aggregate?: "SUM" | "MIN" | "MAX"): Promise<number>;
    
        /** 
         * Incrementally iterate the keys space
         *
         * @see https://redis.io/commands/scan
         * @since  2.8.0
         */
        scan(cursor: number, pattern?: string, count?: number, type?: string, callback: Callback<any>): void;
        scan(cursor: number, pattern?: string, count?: number, type?: string): Promise<any>;
    
        /** 
         * Incrementally iterate Set elements
         *
         * @see https://redis.io/commands/sscan
         * @since  2.8.0
         */
        sscan(key: KeyType, cursor: number, pattern?: string, count?: number, callback: Callback<any>): void;
        sscan(key: KeyType, cursor: number, pattern?: string, count?: number): Promise<any>;
    
        /** 
         * Incrementally iterate hash fields and associated values
         *
         * @see https://redis.io/commands/hscan
         * @since  2.8.0
         */
        hscan(key: KeyType, cursor: number, pattern?: string, count?: number, callback: Callback<any>): void;
        hscan(key: KeyType, cursor: number, pattern?: string, count?: number): Promise<any>;
    
        /** 
         * Incrementally iterate sorted sets elements and associated scores
         *
         * @see https://redis.io/commands/zscan
         * @since  2.8.0
         */
        zscan(key: KeyType, cursor: number, pattern?: string, count?: number, callback: Callback<any>): void;
        zscan(key: KeyType, cursor: number, pattern?: string, count?: number): Promise<any>;
    
        /** 
         * Get information on streams and consumer groups
         *
         * @see https://redis.io/commands/xinfo
         * @since  5.0.0
         */
        xinfo(keyGroupname?: key,string, key?: KeyType, key?: KeyType, help?: "HELP", callback: Callback<any>): void;
        xinfo(keyGroupname?: key,string, key?: KeyType, key?: KeyType, help?: "HELP"): Promise<any>;
    
        /** 
         * Appends a new entry to a stream
         *
         * @see https://redis.io/commands/xadd
         * @since  5.0.0
         */
        xadd(key: KeyType, id: string, fieldValue: string,string, callback: Callback<any>): void;
        xadd(key: KeyType, id: string, fieldValue: string,string): Promise<any>;
    
        /** 
         * Trims the stream to (approximately if '~' is passed) a certain size
         *
         * @see https://redis.io/commands/xtrim
         * @since  5.0.0
         */
        xtrim(key: KeyType, strategy: "MAXLEN", approx?: "~", count: number, callback: Callback<any>): void;
        xtrim(key: KeyType, strategy: "MAXLEN", approx?: "~", count: number): Promise<any>;
    
        /** 
         * Removes the specified entries from the stream. Returns the number of items actually deleted, that may be different from the number of IDs passed in case certain IDs do not exist.
         *
         * @see https://redis.io/commands/xdel
         * @since  5.0.0
         */
        xdel(key: KeyType, id: string, callback: Callback<number>): void;
        xdel(key: KeyType, id: string): Promise<number>;
    
        /** 
         * Return a range of elements in a stream, with IDs matching the specified IDs interval
         *
         * @see https://redis.io/commands/xrange
         * @since  5.0.0
         */
        xrange(key: KeyType, start: string, end: string, count?: number, callback: Callback<any>): void;
        xrange(key: KeyType, start: string, end: string, count?: number): Promise<any>;
    
        /** 
         * Return a range of elements in a stream, with IDs matching the specified IDs interval, in reverse order (from greater to smaller IDs) compared to XRANGE
         *
         * @see https://redis.io/commands/xrevrange
         * @since  5.0.0
         */
        xrevrange(key: KeyType, end: string, start: string, count?: number, callback: Callback<any>): void;
        xrevrange(key: KeyType, end: string, start: string, count?: number): Promise<any>;
    
        /** 
         * Return the number of entires in a stream
         *
         * @see https://redis.io/commands/xlen
         * @since  5.0.0
         */
        xlen(key: KeyType, callback: Callback<number>): void;
        xlen(key: KeyType): Promise<number>;
    
        /** 
         * Return never seen elements in multiple streams, with IDs greater than the ones reported by the caller for each stream. Can block.
         *
         * @see https://redis.io/commands/xread
         * @since  5.0.0
         */
        xread(count?: number, milliseconds?: number, streams: "STREAMS", key: KeyType, id: string, callback: Callback<any>): void;
        xread(count?: number, milliseconds?: number, streams: "STREAMS", key: KeyType, id: string): Promise<any>;
    
        /** 
         * Create, destroy, and manage consumer groups.
         *
         * @see https://redis.io/commands/xgroup
         * @since  5.0.0
         */
        xgroup(keyGroupnameIdOr-$?: key,string,string, keyGroupnameIdOr-$?: key,string,string, keyGroupname?: key,string, keyGroupnameConsumername?: key,string,string, callback: Callback<any>): void;
        xgroup(keyGroupnameIdOr-$?: key,string,string, keyGroupnameIdOr-$?: key,string,string, keyGroupname?: key,string, keyGroupnameConsumername?: key,string,string): Promise<any>;
    
        /** 
         * Return new entries from a stream using a consumer group, or access the history of the pending entries for a given consumer. Can block.
         *
         * @see https://redis.io/commands/xreadgroup
         * @since  5.0.0
         */
        xreadgroup(groupConsumer: string,string, count?: number, milliseconds?: number, noack?: "NOACK", streams: "STREAMS", key: KeyType, id: string, callback: Callback<any>): void;
        xreadgroup(groupConsumer: string,string, count?: number, milliseconds?: number, noack?: "NOACK", streams: "STREAMS", key: KeyType, id: string): Promise<any>;
    
        /** 
         * Marks a pending message as correctly processed, effectively removing it from the pending entries list of the consumer group. Return value of the command is the number of messages successfully acknowledged, that is, the IDs we were actually able to resolve in the PEL.
         *
         * @see https://redis.io/commands/xack
         * @since  5.0.0
         */
        xack(key: KeyType, group: string, id: string, callback: Callback<any>): void;
        xack(key: KeyType, group: string, id: string): Promise<any>;
    
        /** 
         * Changes (or acquires) ownership of a message in a consumer group, as if the message was delivered to the specified consumer.
         *
         * @see https://redis.io/commands/xclaim
         * @since  5.0.0
         */
        xclaim(key: KeyType, group: string, consumer: string, minIdleTime: string, id: string, ms?: number, msUnixTime?: number, count?: number, force?: any, justid?: any, callback: Callback<any>): void;
        xclaim(key: KeyType, group: string, consumer: string, minIdleTime: string, id: string, ms?: number, msUnixTime?: number, count?: number, force?: any, justid?: any): Promise<any>;
    
        /** 
         * Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged.
         *
         * @see https://redis.io/commands/xpending
         * @since  5.0.0
         */
        xpending(key: KeyType, group: string, startEndCount?: string,string,integer, consumer?: string, callback: Callback<any>): void;
        xpending(key: KeyType, group: string, startEndCount?: string,string,integer, consumer?: string): Promise<any>;
    }
    interface Redis extends EventEmitter, Commander, Commands {
        Promise: typeof Promise;
        status: string;
        connect(callback?: () => void): Promise<void>;
        disconnect(): void;
        duplicate(): Redis;

        send_command(command: string, ...args: ValueType[]): Promise<any>;
    }
    interface NodeConfiguration {
        host?: string;
        port?: number;
    }

    type ClusterNode = string | number | NodeConfiguration;

    type NodeRole = 'master' | 'slave' | 'all';

    type CallbackFunction<T = any> = (err?: NodeJS.ErrnoException | null, result?: T) => void;

    type Ok = 'OK';

    interface Cluster extends EventEmitter, Commander, Commands {
        connect(callback: () => void): Promise<void>;
        disconnect(): void;
        nodes(role?: NodeRole): Redis[];
    }

    interface ClusterStatic extends EventEmitter {
        new (nodes: ClusterNode[], options?: ClusterOptions): Cluster;
    }

    interface RedisOptions {
        port?: number;
        host?: string;
        /**
         * 4 (IPv4) or 6 (IPv6), Defaults to 4.
         */
        family?: number;
        /**
         * Local domain socket path. If set the port, host and family will be ignored.
         */
        path?: string;
        /**
         * TCP KeepAlive on the socket with a X ms delay before start. Set to a non-number value to disable keepAlive.
         */
        keepAlive?: number;
        connectionName?: string;
        /**
         * If set, client will send AUTH command with the value of this option when connected.
         */
        password?: string;
        /**
         * Database index to use.
         */
        db?: number;
        /**
         * When a connection is established to the Redis server, the server might still be loading
         * the database from disk. While loading, the server not respond to any commands.
         * To work around this, when this option is true, ioredis will check the status of the Redis server,
         * and when the Redis server is able to process commands, a ready event will be emitted.
         */
        enableReadyCheck?: boolean;
        keyPrefix?: string;
        /**
         * When the return value isn't a number, ioredis will stop trying to reconnect.
         * Fixed in: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/15858
         */
        retryStrategy?(times: number): number | void | null;
        /**
         * By default, all pending commands will be flushed with an error every
         * 20 retry attempts. That makes sure commands won't wait forever when
         * the connection is down. You can change this behavior by setting
         * `maxRetriesPerRequest`.
         *
         * Set maxRetriesPerRequest to `null` to disable this behavior, and
         * every command will wait forever until the connection is alive again
         * (which is the default behavior before ioredis v4).
         */
        maxRetriesPerRequest?: number | null;
        /**
         * 1/true means reconnect, 2 means reconnect and resend failed command. Returning false will ignore
         * the error and do nothing.
         */
        reconnectOnError?(error: Error): boolean | 1 | 2;
        /**
         * By default, if there is no active connection to the Redis server, commands are added to a queue
         * and are executed once the connection is "ready" (when enableReadyCheck is true, "ready" means
         * the Redis server has loaded the database from disk, otherwise means the connection to the Redis
         * server has been established). If this option is false, when execute the command when the connection
         * isn't ready, an error will be returned.
         */
        enableOfflineQueue?: boolean;
        /**
         * The milliseconds before a timeout occurs during the initial connection to the Redis server.
         * default: 10000.
         */
        connectTimeout?: number;
        /**
         * After reconnected, if the previous connection was in the subscriber mode, client will auto re-subscribe these channels.
         * default: true.
         */
        autoResubscribe?: boolean;
        /**
         * If true, client will resend unfulfilled commands(e.g. block commands) in the previous connection when reconnected.
         * default: true.
         */
        autoResendUnfulfilledCommands?: boolean;
        lazyConnect?: boolean;
        tls?: ConnectionOptions;
        /**
         * default: "master".
         */
        role?: 'master' | 'slave';
        /**
         * default: null.
         */
        name?: string;
        sentinelPassword?: string;
        sentinels?: Array<{ host: string; port: number }>;
        /**
         * If `sentinelRetryStrategy` returns a valid delay time, ioredis will try to reconnect from scratch.
         * default: function(times) { return Math.min(times * 10, 1000); }
         */
        sentinelRetryStrategy?(times: number): number | void | null;
        /**
         * Can be used to prefer a particular slave or set of slaves based on priority.
         */
        preferredSlaves?: PreferredSlaves;
        /**
         * Whether to support the `tls` option when connecting to Redis via sentinel mode.
         * default: false.
         */
        enableTLSForSentinelMode?: boolean;
        sentinelTLS?: SecureContextOptions;
        /**
         * NAT map for sentinel connector.
         * default: null.
         */
        natMap?: NatMap;
        /**
         * Update the given `sentinels` list with new IP addresses when communicating with existing sentinels.
         * default: true.
         */
        updateSentinels?: boolean;
        /**
         * Enable READONLY mode for the connection. Only available for cluster mode.
         * default: false.
         */
        readOnly?: boolean;
        /**
         * If you are using the hiredis parser, it's highly recommended to enable this option.
         * Create another instance with dropBufferSupport disabled for other commands that you want to return binary instead of string
         */
        dropBufferSupport?: boolean;
        /**
         * Whether to show a friendly error stack. Will decrease the performance significantly.
         */
        showFriendlyErrorStack?: boolean;
    }

    interface AddressFromResponse {
        port: string;
        ip: string;
        flags?: string;
    }

    type PreferredSlaves =
        | ((slaves: AddressFromResponse[]) => AddressFromResponse | null)
        | Array<{ port: string; ip: string; prio?: number }>
        | { port: string; ip: string; prio?: number };

    type SecureVersion = 'TLSv1.3' | 'TLSv1.2' | 'TLSv1.1' | 'TLSv1';

    interface SecureContextOptions {
        pfx?: string | Buffer | Array<string | Buffer | object>;
        key?: string | Buffer | Array<Buffer | object>;
        passphrase?: string;
        cert?: string | Buffer | Array<string | Buffer>;
        ca?: string | Buffer | Array<string | Buffer>;
        ciphers?: string;
        honorCipherOrder?: boolean;
        ecdhCurve?: string;
        clientCertEngine?: string;
        crl?: string | Buffer | Array<string | Buffer>;
        dhparam?: string | Buffer;
        secureOptions?: number; // Value is a numeric bitmask of the `SSL_OP_*` options
        secureProtocol?: string; // SSL Method, e.g. SSLv23_method
        sessionIdContext?: string;
        /**
         * Optionally set the maximum TLS version to allow. One
         * of `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`. Cannot be specified along with the
         * `secureProtocol` option, use one or the other.
         * **Default:** `'TLSv1.3'`, unless changed using CLI options. Using
         * `--tls-max-v1.2` sets the default to `'TLSv1.2'`. Using `--tls-max-v1.3` sets the default to
         * `'TLSv1.3'`. If multiple of the options are provided, the highest maximum is used.
         */
        maxVersion?: SecureVersion;
        /**
         * Optionally set the minimum TLS version to allow. One
         * of `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`. Cannot be specified along with the
         * `secureProtocol` option, use one or the other.  It is not recommended to use
         * less than TLSv1.2, but it may be required for interoperability.
         * **Default:** `'TLSv1.2'`, unless changed using CLI options. Using
         * `--tls-v1.0` sets the default to `'TLSv1'`. Using `--tls-v1.1` sets the default to
         * `'TLSv1.1'`. Using `--tls-min-v1.3` sets the default to
         * 'TLSv1.3'. If multiple of the options are provided, the lowest minimum is used.
         */
        minVersion?: SecureVersion;
    }

    interface ScanStreamOption {
        match?: string;
        count?: number;
    }

    type DNSLookupFunction = (
        hostname: string,
        callback: (err: NodeJS.ErrnoException, address: string, family: number) => void,
    ) => void;
    interface NatMap {
        [key: string]: { host: string; port: number };
    }

    interface ClusterOptions {
        clusterRetryStrategy?(times: number, reason?: Error): number | null;
        enableOfflineQueue?: boolean;
        enableReadyCheck?: boolean;
        scaleReads?: string;
        maxRedirections?: number;
        retryDelayOnFailover?: number;
        retryDelayOnClusterDown?: number;
        retryDelayOnTryAgain?: number;
        slotsRefreshTimeout?: number;
        slotsRefreshInterval?: number;
        redisOptions?: RedisOptions;
        lazyConnect?: boolean;
        dnsLookup?: DNSLookupFunction;
        natMap?: NatMap;
    }

    interface MultiOptions {
        pipeline: boolean;
    }
}
