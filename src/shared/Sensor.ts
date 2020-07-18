export class Sensor {

    readonly deviceId: string;
    readonly temperature: number;
    readonly humidity: number;

    constructor(deviceId: string, temperature: number, humidity: number) {
        this.deviceId = deviceId;
        this.temperature = temperature;
        this.humidity = humidity;
    }

}