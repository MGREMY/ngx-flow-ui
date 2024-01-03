/** @format */

import { IComponentProperties } from '@ngx-flow-ui/lib/components/icomponent.properties';
import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';

export type buttonPill = 'disable' | 'enable';
export type buttonMode = 'label' | 'svg' | 'label+svg';

export class NgxFlowUiBadgeProperties implements IComponentProperties {
  private static instance: NgxFlowUiBadgeProperties;

  private constructor() {}

  public static getInstance(): NgxFlowUiBadgeProperties {
    if (!NgxFlowUiBadgeProperties.instance) {
      NgxFlowUiBadgeProperties.instance = new NgxFlowUiBadgeProperties();
    }

    return NgxFlowUiBadgeProperties.instance;
  }

  BaseClass = 'me-2';

  FillColorClass: Record<properties.FillClass, Record<properties.Color, string>> = {
    solid: {
      blue: ' bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-800',
      red: ' bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-800',
      green: ' bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-800',
      yellow: ' bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-800',
    },
    outline: {
      blue: ' bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-800',
      red: ' bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-800',
      green: ' bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-800',
      yellow: ' bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-800',
    },
  };

  SizeClass: Record<properties.Size, string> = {
    xs: ' text-xs',
    sm: ' text-sm',
    md: ' text-base',
    lg: ' text-lg',
    xl: ' text-xl',
  };

  BorderColorClass: Record<properties.Color, string> = {
    blue: ' border border-blue-400',
    red: ' border border-red-400',
    green: ' border border-green-400',
    yellow: ' border border-yellow-400',
  };

  PillClass: Record<buttonPill, string> = {
    enable: ' rounded-full',
    disable: ' rounded',
  };

  ModeClass: Record<buttonMode, string> = {
    label: ' px-2.5 py-0.5 font-medium',
    svg: ' inline-flex items-center justify-center w-6 h-6 font-semibold',
    'label+svg': ' px-2.5 py-0.5 inline-flex items-center font-medium',
  };
}
