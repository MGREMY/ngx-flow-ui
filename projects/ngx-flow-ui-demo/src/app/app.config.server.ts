import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { NgxFlowUiService } from '../../../ngx-flow-ui/src/public-api';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), NgxFlowUiService],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
