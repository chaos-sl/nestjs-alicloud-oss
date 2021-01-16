import { ModuleMetadata, Type } from '@nestjs/common';
import { Options } from 'ali-oss';
export interface AlicloudOssConfig {
    options: Options;
}
export interface AlicloudOssConfigFactory {
    createAlicloudOssConfig(): Promise<AlicloudOssAsyncConfig> | AlicloudOssAsyncConfig;
}
export interface AlicloudOssAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    useExisting?: Type<AlicloudOssConfigFactory>;
    useClass?: Type<AlicloudOssConfigFactory>;
    useFactory?: (...args: any[]) => Promise<AlicloudOssConfig> | AlicloudOssConfig;
    inject?: any[];
}
