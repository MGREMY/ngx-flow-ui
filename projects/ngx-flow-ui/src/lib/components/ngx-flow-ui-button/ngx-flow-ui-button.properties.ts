/** @format */

import { IComponentProperties } from '@ngx-flow-ui/lib/components/icomponent.properties';
import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';

export type buttonMode = 'label' | 'svg' | 'label+svg';

export class NgxFlowUiButtonProperties implements IComponentProperties {
  private static instance: NgxFlowUiButtonProperties;

  private constructor() {}

  public static getInstance(): NgxFlowUiButtonProperties {
    if (!NgxFlowUiButtonProperties.instance) {
      NgxFlowUiButtonProperties.instance = new NgxFlowUiButtonProperties();
    }

    return NgxFlowUiButtonProperties.instance;
  }

  BaseClass = 'me-2 font-medium focus:ring-4 focus:outline-none';

  FillColorClass: Record<properties.FillClass, Record<properties.Color, string>> = {
    solid: {
      blue: ' text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
      red: ' text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
      green:
        ' text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
      yellow:
        ' text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:bg-yellow-900 dark:focus:ring-yellow-900',
    },
    outline: {
      blue: ' text-blue-700 hover:text-white hover:bg-blue-800 focus:ring-blue-300 dark:focus:ring-blue-800',
      red: ' text-red-700 hover:text-white hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800',
      green: ' text-green-700 hover:text-white hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800',
      yellow: ' text-yellow-400 hover:text-white hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900',
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
    blue: ' border border-blue-700',
    red: ' border border-red-700',
    green: ' border border-green-700',
    yellow: ' border border-yellow-400',
  };

  ModeClass: Record<buttonMode, string> = {
    label: ' px-3 py-2 mb-2 rounded-lg',
    svg: ' p-2 inline-flex items-center text-center rounded-full',
    'label+svg': ' px-3 py-2 inline-flex items-center text-center rounded-lg',
  };
}
