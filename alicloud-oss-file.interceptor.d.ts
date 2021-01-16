import { NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { PutObjectOptions } from 'ali-oss';
export declare function AlicloudOssFileInterceptor(fieldName: string, localOptions?: MulterOptions, fileOptions?: {
    bucket?: string;
    folder?: string;
}, ossOptions?: Partial<PutObjectOptions>): Type<NestInterceptor>;
