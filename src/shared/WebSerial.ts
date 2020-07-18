/*****************************************************
 * WebSerial API (TypeScript)
 * Version: 1.0.0
 * Author: DevTomek
 * Website: https://devtomek.pl
 *****************************************************/
export class WebSerial {

    private port: any;
    private buffer: number[] = [];
    private isConnectionEstablished: boolean = false;

    /**
     * Method used to check that the current system supports the WebSerial API.
     */
    isWebSerialApiSupported(): boolean {
        return 'serial' in navigator;
    }

    /**
     * Start serial communication.
     *
     * @param baudrate the baudrate value (e.g. 9600, 115200)
     */
    async start(baudrate: number) {
        if (!this.isWebSerialApiSupported) {
            WebSerial.log('WebSerial API is not supported.', WebSerial.LogLevel.ERROR);
            return;
        }
        if (this.isConnectionEstablished) {
            WebSerial.log('Connection already established. Please close the current connection and try again.', WebSerial.LogLevel.ERROR);
            return;
        }
        try {
            this.port = await (window as any).navigator.serial.requestPort();
            if (navigator.userAgent.indexOf("OPR/") != -1) {
                await this.port.open({baudrate: baudrate});
            } else {
                await this.port.open({baudRate: baudrate});
            }
            this.emitSerialConnectionEstablishedEvent(true);
            await this.startRead();
        } catch (error) {
            this.close();
            WebSerial.log(error.message, WebSerial.LogLevel.ERROR)
        }
    }

    /**
     * Close serial communication.
     */
    close() {
        this.port && this.port.close();
        this.emitSerialConnectionEstablishedEvent(false);
    }

    private async startRead() {
        while (this.port.readable) {
            const reader = this.port.readable.getReader();
            const decoder = new TextDecoder();

            WebSerial.log('Started reading data from the device.', WebSerial.LogLevel.INFO)
            while (this.isConnectionEstablished) {
                await this.processData(reader, decoder);
            }

            await reader.cancel();
            this.close();
            WebSerial.log('Serial connection closed.', WebSerial.LogLevel.INFO)
        }
    }

    private async processData(reader, decoder) {
        try {
            let {value, done} = await reader.read();

            if (done) {
                WebSerial.log(done, WebSerial.LogLevel.INFO)
                return;
            }

            this.buffer = [...this.buffer, ...value]

            if (value[value.length - 1] === 10) {
                let decodedValue = decoder.decode(Uint8Array.from(this.buffer));
                document.dispatchEvent(new CustomEvent('serialNewDataAvailableEvent', {detail: decodedValue}));
                this.buffer = [];
            }

        } catch (error) {
            WebSerial.log(error.message, WebSerial.LogLevel.ERROR);
            this.close();
            return;
        }
    }

    private emitSerialConnectionEstablishedEvent(isConnectionEstablished: boolean) {
        this.isConnectionEstablished = isConnectionEstablished
        document.dispatchEvent(new CustomEvent('serialConnectionEstablishedEvent', {detail: {'isConnectionEstablished': isConnectionEstablished}}));
    }

    private static log(message: string, logLevel: WebSerial.LogLevel) {
        document.dispatchEvent(new CustomEvent('serialLogEvent', {detail: {'message': message, 'logLevel': logLevel}}));
    }

}

export namespace WebSerial {
    export enum LogLevel {
        INFO = 'INFO',
        ERROR = 'ERROR'
    }
}
