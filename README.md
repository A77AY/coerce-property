# coerce-property

Utility decorator functions for coercing Angular component `@Inputs` into specific types.

Uses [Angular CDK](https://material.angular.io/cdk/categories) coercions.

## Installation

```sh
# NPM
npm i coerce-property

# Yarn
yarn add coerce-property
```

## Coercions

-   `coerce` - decorator factory
    -   `coerceBoolean`
    -   `coerceArray`
    -   `coercePixel`
    -   `coerceElement`
    -   `coerceNumber`

## Usage

```ts
import { Component, Input } from "@angular/core";
import { coerceBoolean } from "coerce-property";

@Component({
    selector: "app-sample",
    template: ``
})
export class SampleComponent {
    @Input()
    @coerceBoolean
    disabled;
}
```

You can use `<app-sample [disabled]="true"></app-sample>` and `<app-sample disabled></app-sample>`.

### How does it work

```ts
import { Component, Input } from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

@Component({
    selector: "app-sample",
    template: ``
})
export class SampleComponent {
    private _dsiabled: boolean;
    @Input()
    get disabled() {
        return this._dsiabled;
    }
    set disabled(disabled) {
        this._disabled = coerceBooleanProperty(disabled);
    }
}

// @angular/cdk/coercion/boolean-property.ts

export function coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== "false";
}
```
