import {
  coerceBooleanProperty,
  coerceArray as coerceArrayProperty,
  coerceCssPixelValue,
  coerceElement as coerceElementProperty,
  coerceNumberProperty,
} from "@angular/cdk/coercion";

import { coerce } from "./coerce";

export const coerceBoolean = coerce(coerceBooleanProperty);
export const coerceArray = coerce(coerceArrayProperty);
export const coercePixel = coerce(coerceCssPixelValue);
export const coerceElement = coerce(coerceElementProperty);
export const coerceNumber = coerce(coerceNumberProperty);
