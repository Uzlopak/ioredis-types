
    interface Redis extends EventEmitter, Commander, Commands {
        Promise: typeof Promise;
        status: string;
        connect(callback?: () => void): Promise<void>;
        disconnect(): void;
        duplicate(): Redis;

        send_command(command: string, ...args: ValueType[]): Promise<any>;
    }