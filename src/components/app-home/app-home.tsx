import {Component, h, Listen, State} from '@stencil/core';
import {PredefinedColors} from "@ionic/core";
import {Sensor} from "../../shared/Sensor";
import {WebSerial} from "../../shared/WebSerial"

@Component({
    tag: 'app-home',
})
export class AppHome {

    @State() labelText: string;
    @State() labelColor: PredefinedColors;

    @State() isConnected: boolean = false;
    @State() sensor: Sensor = new Sensor('---', 0, 0);

    private webSerial: WebSerial = new WebSerial();

    componentWillLoad() {
        this.webSerial.isWebSerialApiSupported()
            ? this.updateLabel('WebSerial API is supported. Plug in your Arduino device and click the "Connect" button.', 'success')
            : this.updateLabel('WebSerial API is not supported. Please enable the #enable-experimental-web-platform-features flag in chrome://flags', 'danger')
    }

    @Listen('serialConnectionEstablishedEvent', {target: 'document'})
    serialConnectedEventListener(event) {
        this.isConnected = event.detail.isConnectionEstablished;
    }

    @Listen('serialNewDataAvailableEvent', {target: 'document'})
    serialNewDataAvailableEventListener(event) {
        let array = event.detail.split('|');
        this.sensor = new Sensor(array[0], Number(array[1]), Number(array[2]));
    }

    @Listen('serialLogEvent', {target: 'document'})
    serialLogEventListener(event) {
        this.updateLabel(event.detail.message, (event.detail.logLevel === WebSerial.LogLevel.INFO) ? 'success' : 'danger');
        event.detail.logLevel === WebSerial.LogLevel.INFO ? console.log(event.detail.message) : console.error(event.detail.message);
    }

    updateLabel(text: string, color: PredefinedColors) {
        this.labelText = text;
        this.labelColor = color;
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Arduino Custom Data Station</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">

                <ion-item color={this.labelColor}>
                    <ion-label class="ion-text-center ion-text-wrap">{this.labelText}</ion-label>
                </ion-item>

                <ion-item>
                    <ion-label>Device ID:</ion-label>
                    <ion-badge slot="end">{this.sensor.deviceId}</ion-badge>
                </ion-item>

                <ion-item>
                    <ion-label>Temperature:</ion-label>
                    <ion-badge slot="end">{this.sensor.temperature}&deg;C</ion-badge>
                </ion-item>

                <ion-item>
                    <ion-label>Humidity:</ion-label>
                    <ion-badge slot="end">{this.sensor.humidity}%</ion-badge>
                </ion-item>

                <ion-row>
                    <ion-col class="ion-text-center">
                        <ion-button color="primary" disabled={this.isConnected || !this.webSerial.isWebSerialApiSupported()} onClick={() => this.webSerial.start(115200)}>Connect</ion-button>
                        <ion-button color="primary" disabled={!this.isConnected} onClick={() => this.webSerial.close()}>Close</ion-button>
                    </ion-col>
                </ion-row>

            </ion-content>
        ];
    }
}
