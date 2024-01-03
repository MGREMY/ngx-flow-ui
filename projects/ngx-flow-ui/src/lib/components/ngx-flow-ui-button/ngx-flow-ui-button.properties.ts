/** @format */

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';

export const buttonBaseClass = {
  default: 'group flex h-min w-fit items-center justify-center p-0.5 text-center font-medium focus:z-10',
};

export const buttonFillColorClass: Record<properties.FillClass, Record<properties.Color, string>> = {
  solid: {
    default: '',
    light: '',
    dark: '',
    alternative: '',
  },
  outline: {
    default: '',
    light: '',
    dark: '',
    alternative: '',
  },
};

export const buttonSizeClass: Record<properties.Size, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};
