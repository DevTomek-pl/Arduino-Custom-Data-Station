import {Component, Element, h, Method, Prop, State, Watch} from '@stencil/core';
import Chart from 'chart.js';

@Component({
    tag: 'time-series-chart',
})
export class TimeSeriesChart {

    @Prop() header: string;
    @Prop() label: string;
    @Prop() color: string;
    @Prop() xAxisLabel: string;
    @Prop() yAxisLabel: string;
    @Prop() size: number;

    @State() data: { x: string[], y: number[] } = {x: [], y: []};

    @Element() el: HTMLElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    chart: Chart;

    componentDidLoad() {
        this.canvas = this.el.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        const chartConfig: any = {
            type: 'line',
            data: {
                labels: this.data.x,
                datasets: [{
                    label: this.label,
                    backgroundColor: this.color,
                    borderColor: this.color,
                    fill: false,
                    data: this.data.y,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: this.header
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: this.xAxisLabel
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: this.yAxisLabel
                        }
                    }]
                }
            }
        };

        this.chart = new Chart(this.context, chartConfig);
    }

    @Watch('header')
    watchHeaderHandler(header: string) {
        this.chart.options.title.text = header;
    }

    @Method()
    async addValue(value: number) {
        // update X values
        this.data.x = [...this.data.x, TimeSeriesChart.getCurrentTime()];
        if (this.data.x.length > this.size) {
            this.data.x.shift();
        }
        this.chart.data.labels = this.data.x;

        // update Y values
        this.data.y = [...this.data.y, value];
        if (this.data.y.length > this.size) {
            this.data.y.shift();
        }
        this.chart.data.datasets.forEach((dataset: any) => {
            dataset.data = this.data.y;
        });

        // display new data
        this.chart.update();
    }

    private static getCurrentTime() {
        let currentDate = new Date();
        return ((currentDate.getHours() < 10) ? "0" : "") + currentDate.getHours() + ":" + ((currentDate.getMinutes() < 10) ? "0" : "") + currentDate.getMinutes() + ":" + ((currentDate.getSeconds() < 10) ? "0" : "") + currentDate.getSeconds();
    }

    protected render() {
        return (
            <div class='chart-container'>
                <canvas width='400' height='100'>Canvas are not supported</canvas>
            </div>
        );
    }

}
