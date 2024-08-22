"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityFactory = void 0;
const Utility_1 = require("./Utility");
class UtilityFactory {
    static createUtility() {
        return new Utility_1.Utility();
    }
}
exports.UtilityFactory = UtilityFactory;
