# coerce-property

Utility decorator functions for coercing Angular component `@Inputs` into specific types.

Used by [Angular CDK](https://material.angular.io/cdk/categories) coercions.

## Support

Support Angular >=15.

## Installation

```sh
# Do not forget to check if Angular CDK is installed
npm i -S @angular/cdk

# And install this package
npm i -S coerce-property
```

## Coercions

- `@coerce` - decorator factory

  - `@coerceBoolean`- coerces a data-bound value (typically a string) to a boolean

    For example:

    ```html
    <app-component disabled></app-component>
    ```

    ```ts
    @Input()
    @coerceBoolean
    disabled: boolean; // true
    ```

  - `@coerceArray`- wraps the provided value in an array, unless the provided value is an array

    For example:

    ```html
    <app-component items="item"></app-component>
    ```

    ```ts
    @Input()
    @coerceArray
    items: string[]; // ['item']
    ```

  - `@coercePixel` - coerces a value to a CSS pixel value

    For example:

    ```html
    <app-component [width]="200"></app-component>
    ```

    ```ts
    @Input()
    @coercePixel
    width: string; // '200px'
    ```

  - `@coerceElement` - coerces an ElementRef or an Element into an element

  - `@coerceNumber` - coerces a data-bound value (typically a string) to a number

    For example:

    ```html
    <app-component age="19"></app-component>
    ```

    ```ts
    @Input()
    @coerceNumber
    age: number; // 19
    ```

## Usage

```ts
import { Component, Input } from "@angular/core";
import { coerceBoolean } from "coerce-property";

@Component({
  selector: "app-component",
  template: ``,
})
export class SampleComponent {
  @Input()
  @coerceBoolean
  disabled: boolean;
}
```

You can use:

```html
<app-sample [disabled]="true"></app-sample>
```

and

```html
<app-sample disabled></app-sample>
```

## How does it work

```ts
import { Component, Input } from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

@Component({
  selector: "app-component",
  template: ``,
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
