"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Say = void 0;
const base_1 = __importDefault(require("./base"));
class Say extends base_1.default {
    constructor() {
        super('Say');
        this.addAttribute('voice', 'Polly.Joanna');
    }
}
exports.Say = Say;
exports.default = Say;
//# sourceMappingURL=say%20copy.js.map