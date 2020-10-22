import { DynamicModule, Module, Global, Provider, Type } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import {
  AlicloudOssAsyncConfig,
  AlicloudOssConfig,
  AlicloudOssConfigFactory,
} from './interfaces/alicloud-oss-config.interface';
import { ALICLOUD_OSS_MODULE_CONFIG, ALICLOUD_OSS_MODULE_ID } from './alicloud-oss.constant';
import { AlicloudOssService } from './alicloud-oss.service';

@Global()
@Module({
  providers: [AlicloudOssService],
  exports: [AlicloudOssService],
})
export class AlicloudOssModule {
  public static withConfig(config: AlicloudOssConfig): DynamicModule {
    return {
      module: AlicloudOssModule,
      providers: [{ provide: ALICLOUD_OSS_MODULE_CONFIG, useValue: config }],
    };
  }

  public static withConfigAsync(config: AlicloudOssAsyncConfig): DynamicModule {
    const asyncProviders = this.createAsyncProviders(config);
    return {
      module: AlicloudOssModule,
      imports: config.imports,
      providers: [
        ...asyncProviders,
        {
          provide: ALICLOUD_OSS_MODULE_ID,
          useValue: uuid(),
        },
        AlicloudOssService,
      ],
      exports: [asyncProviders[0], AlicloudOssService],
    };
  }

  private static createAsyncProviders(options: AlicloudOssAsyncConfig): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<AlicloudOssConfigFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: AlicloudOssAsyncConfig): Provider {
    if (options.useFactory) {
      return {
        provide: ALICLOUD_OSS_MODULE_CONFIG,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = [(options.useClass || options.useExisting) as Type<AlicloudOssConfigFactory>];
    return {
      provide: ALICLOUD_OSS_MODULE_CONFIG,
      useFactory: async (optionsFactory: AlicloudOssConfigFactory) => await optionsFactory.createAlicloudOssConfig(),
      inject,
    };
  }
}
