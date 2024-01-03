/** @format */

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';

export interface IComponentProperties {
  BaseClass: { default: string };

  FillColorClass: Record<properties.FillClass, Record<properties.Color, string>>;

  SizeClass: Record<properties.Size, string>;
}
