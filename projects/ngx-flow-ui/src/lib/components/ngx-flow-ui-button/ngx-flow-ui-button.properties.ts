/** @format */

import { IComponentProperties, IDisablableProperties } from '@ngx-flow-ui/lib/components/icomponent.properties';
import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';

export type buttonMode = 'label' | 'svg' | 'label+svg';

export class NgxFlowUiButtonProperties implements IComponentProperties, IDisablableProperties {
  private static instance: NgxFlowUiButtonProperties;

  private constructor() {}

  public static getInstance(): NgxFlowUiButtonProperties {
    if (!NgxFlowUiButtonProperties.instance) {
      NgxFlowUiButtonProperties.instance = new NgxFlowUiButtonProperties();
    }

    return NgxFlowUiButtonProperties.instance;
  }

  BaseClass = 'm-1 font-medium enabled:focus:ring-2 enabled:focus:outline-none disabled:cursor-not-allowed';

  FillColorClass: Record<properties.FillClass, Record<properties.Color, string>> = {
    solid: {
      blue: ' text-white bg-blue-700 enabled:hover:bg-blue-800 enabled:focus:ring-blue-300 enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 enabled:dark:focus:ring-blue-800',
      red: ' text-white bg-red-700 enabled:hover:bg-red-800 enabled:focus:ring-red-300 enabled:dark:bg-red-600 enabled:dark:hover:bg-red-700 enabled:dark:focus:ring-red-800',
      green:
        ' text-white bg-green-700 enabled:hover:bg-green-800 enabled:focus:ring-green-300 enabled:dark:bg-green-600 enabled:dark:hover:bg-green-700 enabled:dark:focus:ring-green-800',
      yellow:
        ' text-white bg-yellow-400 enabled:hover:bg-yellow-500 enabled:focus:ring-yellow-300 enabled:dark:bg-yellow-900 enabled:dark:focus:ring-yellow-900',
    },
    outline: {
      blue: ' text-blue-700 enabled:hover:text-white enabled:hover:bg-blue-800 enabled:focus:ring-blue-300 enabled:dark:focus:ring-blue-800',
      red: ' text-red-700 enabled:hover:text-white enabled:hover:bg-red-800 enabled:focus:ring-red-300 enabled:dark:focus:ring-red-800',
      green:
        ' text-green-700 enabled:hover:text-white enabled:hover:bg-green-800 enabled:focus:ring-green-300 enabled:dark:focus:ring-green-800',
      yellow:
        ' text-yellow-400 enabled:hover:text-white enabled:hover:bg-yellow-500 enabled:focus:ring-yellow-300 enabled:dark:focus:ring-yellow-900',
    },
  };

  SizeClass: Record<properties.Size, string> = {
    xs: ' text-xs',
    sm: ' text-sm',
    md: ' text-base',
    lg: ' text-lg',
    xl: ' text-xl',
  };

  BorderFillColorClass: Record<properties.FillClass, Record<properties.Color, string>> = {
    solid: {
      blue: '',
      red: '',
      green: '',
      yellow: '',
    },
    outline: {
      blue: ' border border-blue-700 disabled:border-blue-400',
      red: ' border border-red-700 disabled:border-red-400',
      green: ' border border-green-700 disabled:border-green-400',
      yellow: ' border border-yellow-400 disabled:border-yellow-300',
    },
  };

  DisabledFillColorClass: Record<properties.FillClass, Record<properties.Color, string>> = {
    solid: {
      blue: ' disabled:bg-blue-400 disabled:dark:bg-blue-500',
      red: ' disabled:bg-red-400 disabled:dark:bg-red-500',
      green: ' disabled:bg-green-400 disabled:dark:bg-green-500',
      yellow: ' disabled:bg-yellow-300 disabled:dark:bg-yellow-600',
    },
    outline: {
      blue: ' disabled:text-blue-400 disabled:dark:text-blue-500',
      red: ' disabled:text-red-400 disabled:dark:text-red-500',
      green: ' disabled:text-green-400 disabled:dark:text-green-500',
      yellow: ' disabled:text-yellow-300 disabled:dark:text-yellow-600',
    },
  };

  ModeClass: Record<buttonMode, string> = {
    label: ' px-3 py-2 rounded-lg',
    svg: ' p-2 inline-flex items-center text-center rounded-full',
    'label+svg': ' px-3 py-2 inline-flex items-center text-center rounded-lg',
  };
}
