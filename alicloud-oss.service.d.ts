import { Logger } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { AlicloudOssConfig, UploadedFileMetadata } from './interfaces';
export declare class AlicloudOssService {
    private readonly config;
    private clients;
    private defaultClient;
    logger: Logger;
    constructor(config: AlicloudOssConfig);
    upload(file: UploadedFileMetadata, options?: OSS.PutObjectOptions): Promise<string | Error>;
    downloadUrl(path: string, options?: OSS.SignatureUrlOptions): Promise<string | Error>;
}
