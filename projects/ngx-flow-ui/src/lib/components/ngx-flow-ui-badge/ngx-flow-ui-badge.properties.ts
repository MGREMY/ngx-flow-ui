/** @format */

import { IComponentProperties } from 'ngx-flow-ui/lib/components/icomponent.properties';
import * as properties from 'ngx-flow-ui/lib/components/ngx-flow-ui.properties';

export class NgxFlowUiBadgeProperties implements IComponentProperties {
  private static instance: IComponentProperties;

  private constructor() {}

  public static getInstance(): IComponentProperties {
    if (!NgxFlowUiBadgeProperties.instance) {
      NgxFlowUiBadgeProperties.instance = new NgxFlowUiBadgeProperties();
    }

    return NgxFlowUiBadgeProperties.instance;
  }

  BaseClass = {
    default: 'font-medium me-2 px-2.5 py-0.5 rounded',
  };

  FillColorClass: Record<properties.FillClass, Record<properties.Color, string>> = {
    solid: {
      default: ' bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300',
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
    sm: ' text-sm',
    md: '',
    lg: '',
    xl: '',
  };
}
