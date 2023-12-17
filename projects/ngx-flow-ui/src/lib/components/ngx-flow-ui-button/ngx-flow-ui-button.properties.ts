/** @format */

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';

export const buttonBaseClass = {
  default:
    'group flex h-min w-fit items-center justify-center p-0.5 text-center font-medium focus:z-10 ',
};

export const buttonFillColorClass: Record<
  properties.Colors,
  Record<properties.FillClass, string>
> = {
  info: {
    outline: '',
    solid: '',
  },
  success: {
    outline: '',
    solid: '',
  },
  failure: {
    outline: '',
    solid: '',
  },
  warning: {
    outline: '',
    solid: '',
  },
};

export const buttonSizeClass: Record<properties.Size, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};
