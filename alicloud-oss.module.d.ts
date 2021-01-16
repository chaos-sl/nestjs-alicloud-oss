import { DynamicModule } from '@nestjs/common';
import { AlicloudOssAsyncConfig, AlicloudOssConfig } from './interfaces/alicloud-oss-config.interface';
export declare class AlicloudOssModule {
    static withConfig(config: AlicloudOssConfig): DynamicModule;
    static withConfigAsync(config: AlicloudOssAsyncConfig): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
