"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUuid = void 0;
const uuid_1 = require("uuid");
const getUuid = () => {
    return (0, uuid_1.v4)();
};
exports.getUuid = getUuid;
