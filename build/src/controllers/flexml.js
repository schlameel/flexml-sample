"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const response_1 = require("../models/response");
const say_1 = require("../models/say");
const gather_1 = __importDefault(require("../models/gather"));
class FlexMLCtrl {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const text = req.params.text;
                const dataUri = { text };
                res.status(200).json({ dataUri });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const phoneNumber = req.body['From'];
                const name = yield this.lookupPhoneNumber(phoneNumber);
                const response = new response_1.Response();
                const gather = new gather_1.default();
                gather.addAttribute('action', `${req.originalUrl}/joke`);
                gather.addAttribute('method', 'post');
                gather.addAttribute('numDigits', '1');
                gather.addAttribute('finishOnKey', '9');
                gather.addAttribute('validDigits', '9');
                const sayFirst = new say_1.Say();
                sayFirst.value = `Hello and thank you for calling,, you are calling from ${this.phoneNumberToNiceText(phoneNumber)}`;
                const saySecond = new say_1.Say();
                saySecond.value = `Your name is ${name}`;
                gather.children = [sayFirst, saySecond];
                response.children = [gather];
                res.status(200).send(response.toXml());
            }
            catch (error) {
                if (typeof error === 'string') {
                    res.status(500).json({ error: error });
                }
                else if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'unknown' });
                }
            }
        });
        this.joke = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = new response_1.Response();
                const say = new say_1.Say();
                say.value =
                    'A horse walks into a bar. the bartender says,, why the long face?';
                response.children = [say];
                res.status(200).send(response.toXml());
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
        this.lookupPhoneNumber = (phoneNumber) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const baseUrl = 'https://api.carrierx.com/core/v2/lookup/dids/';
            const queryParams = '?cnam=true';
            const unknownName = 'unknown name';
            const accessToken = process.env.ACCESS_TOKEN;
            if (accessToken === undefined) {
                return unknownName;
            }
            try {
                const options = {
                    url: baseUrl + phoneNumber + queryParams,
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
                const response = yield (0, axios_1.default)(options);
                const data = response.data;
                if (!Object.prototype.hasOwnProperty.call(data, 'details')) {
                    return unknownName;
                }
                if (!Object.prototype.hasOwnProperty.call(data.details, 'cnam')) {
                    return unknownName;
                }
                if (!Object.prototype.hasOwnProperty.call((_a = data.details) === null || _a === void 0 ? void 0 : _a.cnam, 'name')) {
                    return unknownName;
                }
                return (_c = (_b = data.details) === null || _b === void 0 ? void 0 : _b.cnam) === null || _c === void 0 ? void 0 : _c.name;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                else {
                    console.error(error);
                }
                return unknownName;
            }
        });
    }
    phoneNumberToNiceText(phoneNumber) {
        if (phoneNumber.length !== 11) {
            return phoneNumber;
        }
        const pause = ',,';
        return (this.numberToWords(phoneNumber[0]) +
            pause +
            this.numberToWords(phoneNumber.substring(1, 4)) +
            pause +
            this.numberToWords(phoneNumber.substring(4, 7)) +
            pause +
            this.numberToWords(phoneNumber.substring(7)));
    }
    numberToWords(number) {
        let words = '';
        for (const digit of number) {
            switch (digit) {
                case '0':
                    words += ' zero';
                    break;
                case '1':
                    words += ' one';
                    break;
                case '2':
                    words += ' two';
                    break;
                case '3':
                    words += ' three';
                    break;
                case '4':
                    words += ' four';
                    break;
                case '5':
                    words += ' five';
                    break;
                case '6':
                    words += ' six';
                    break;
                case '7':
                    words += ' seven';
                    break;
                case '8':
                    words += ' eight';
                    break;
                case '9':
                    words += ' nine';
                    break;
                default:
                    break;
            }
        }
        return words;
    }
}
exports.default = FlexMLCtrl;
//# sourceMappingURL=flexml.js.map