/** @format */

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';

export interface IComponentProperties {
  BaseClass: string;

  FillColorClass: Record<properties.FillClass, Record<properties.Color, string>>;

  SizeClass: Record<properties.Size, string>;

  BorderFillColorClass: Record<properties.FillClass, Record<properties.Color, string>>;
}

export interface IDisablableProperties {
  DisabledFillColorClass: Record<properties.FillClass, Record<properties.Color, string>>;
}
