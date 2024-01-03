/** @format */

import { IComponentProperties } from 'ngx-flow-ui/lib/components/icomponent.properties';
import * as properties from 'ngx-flow-ui/lib/components/ngx-flow-ui.properties';

export class NgxFlowUiButtonProperties implements IComponentProperties {
  private static instance: IComponentProperties;

  private constructor() {}

  public static getInstance(): IComponentProperties {
    if (!NgxFlowUiButtonProperties.instance) {
      NgxFlowUiButtonProperties.instance = new NgxFlowUiButtonProperties();
    }

    return NgxFlowUiButtonProperties.instance;
  }

  BaseClass = {
    default: 'group flex h-min w-fit items-center justify-center p-0.5 text-center font-medium focus:z-10',
  };

  FillColorClass: Record<properties.FillClass, Record<properties.Color, string>> = {
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

  SizeClass: Record<properties.Size, string> = {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
  };
}
