
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
