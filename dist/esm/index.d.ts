export declare class BufferedLogger {
    private buffer;
    private bufferSize;
    private isWorker;
    private worker;
    private customFlush;
    constructor({ bufferSize, isWorker, customFlush, }: {
        bufferSize?: number;
        isWorker?: boolean;
        customFlush?: (buffer: string[]) => void;
    });
    log(message: string): void;
    flush(): void;
    dispose(): void;
}
