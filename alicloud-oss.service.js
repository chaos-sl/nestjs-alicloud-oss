"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicloudOssService = void 0;
const common_1 = require("@nestjs/common");
const OSS = require("ali-oss");
const alicloud_oss_constant_1 = require("./alicloud-oss.constant");
let AlicloudOssService = class AlicloudOssService {
    constructor(config) {
        this.config = config;
        this.clients = {};
        this.clients[config.options.bucket] = new OSS(config.options);
        this.defaultClient = this.clients[config.options.bucket];
        common_1.Logger.log('Alicloud OSS module initialized!', 'AlicloudOssModule');
    }
    upload(file, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (file.bucket && !this.clients[file.bucket]) {
                    const config = Object.assign(Object.assign({}, this.config.options), { bucket: file.bucket });
                    this.clients[file.bucket] = new OSS(config);
                }
                const client = file.bucket ? this.clients[file.bucket] : this.defaultClient;
                const filename = (_a = file.customName) !== null && _a !== void 0 ? _a : file.originalname;
                const path = file.folder ? `${file.folder}/${filename}` : filename;
                const uploadResponse = yield client.put(path, file.buffer, options);
                file.url = uploadResponse.url;
                common_1.Logger.log(`Object "${filename}" uploaded successfully`, 'AlicloudOssModule');
                return file.url;
            }
            catch (err) {
                return new Error(err);
            }
        });
    }
    downloadUrl(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.defaultClient.get(path);
            if (result.res.status === 200) {
                return this.defaultClient.signatureUrl(path, options);
            }
            return new Error('Object not exist');
        });
    }
};
AlicloudOssService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(alicloud_oss_constant_1.ALICLOUD_OSS_MODULE_CONFIG)),
    __metadata("design:paramtypes", [Object])
], AlicloudOssService);
exports.AlicloudOssService = AlicloudOssService;
