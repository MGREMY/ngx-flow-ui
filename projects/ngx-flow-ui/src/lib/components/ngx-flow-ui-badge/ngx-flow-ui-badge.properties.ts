/** @format */

import { IComponentProperties } from '@ngx-flow-ui/lib/components/icomponent.properties';
import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';

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
    default: '',
  };

  FillColorClass: Record<
    properties.FillClass,
    Record<properties.Color, string>
  > = {
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
