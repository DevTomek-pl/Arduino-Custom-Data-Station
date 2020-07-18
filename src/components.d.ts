/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppHome {
    }
    interface AppRoot {
    }
    interface TimeSeriesChart {
        "addValue": (value: number) => Promise<void>;
        "color": string;
        "header": string;
        "label": string;
        "size": number;
        "xAxisLabel": string;
        "yAxisLabel": string;
    }
}
declare global {
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLTimeSeriesChartElement extends Components.TimeSeriesChart, HTMLStencilElement {
    }
    var HTMLTimeSeriesChartElement: {
        prototype: HTMLTimeSeriesChartElement;
        new (): HTMLTimeSeriesChartElement;
    };
    interface HTMLElementTagNameMap {
        "app-home": HTMLAppHomeElement;
        "app-root": HTMLAppRootElement;
        "time-series-chart": HTMLTimeSeriesChartElement;
    }
}
declare namespace LocalJSX {
    interface AppHome {
    }
    interface AppRoot {
    }
    interface TimeSeriesChart {
        "color"?: string;
        "header"?: string;
        "label"?: string;
        "size"?: number;
        "xAxisLabel"?: string;
        "yAxisLabel"?: string;
    }
    interface IntrinsicElements {
        "app-home": AppHome;
        "app-root": AppRoot;
        "time-series-chart": TimeSeriesChart;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "time-series-chart": LocalJSX.TimeSeriesChart & JSXBase.HTMLAttributes<HTMLTimeSeriesChartElement>;
        }
    }
}
