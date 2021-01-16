"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AlicloudOssModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicloudOssModule = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const alicloud_oss_constant_1 = require("./alicloud-oss.constant");
const alicloud_oss_service_1 = require("./alicloud-oss.service");
let AlicloudOssModule = AlicloudOssModule_1 = class AlicloudOssModule {
    static withConfig(config) {
        return {
            module: AlicloudOssModule_1,
            providers: [{ provide: alicloud_oss_constant_1.ALICLOUD_OSS_MODULE_CONFIG, useValue: config }],
        };
    }
    static withConfigAsync(config) {
        const asyncProviders = this.createAsyncProviders(config);
        return {
            module: AlicloudOssModule_1,
            imports: config.imports,
            providers: [
                ...asyncProviders,
                {
                    provide: alicloud_oss_constant_1.ALICLOUD_OSS_MODULE_ID,
                    useValue: uuid_1.v4(),
                },
                alicloud_oss_service_1.AlicloudOssService,
            ],
            exports: [asyncProviders[0], alicloud_oss_service_1.AlicloudOssService],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: alicloud_oss_constant_1.ALICLOUD_OSS_MODULE_CONFIG,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [(options.useClass || options.useExisting)];
        return {
            provide: alicloud_oss_constant_1.ALICLOUD_OSS_MODULE_CONFIG,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createAlicloudOssConfig(); }),
            inject,
        };
    }
};
AlicloudOssModule = AlicloudOssModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [alicloud_oss_service_1.AlicloudOssService],
        exports: [alicloud_oss_service_1.AlicloudOssService],
    })
], AlicloudOssModule);
exports.AlicloudOssModule = AlicloudOssModule;
