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

  BaseClass = 'group flex h-min w-fit items-center justify-center p-0.5 text-center font-medium focus:z-10';

  FillColorClass: Record<properties.FillClass, Record<properties.Color, string>> = {
    solid: {
      blue: '',
      red: '',
      green: '',
      yellow: '',
    },
    outline: {
      blue: '',
      red: '',
      green: '',
      yellow: '',
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
