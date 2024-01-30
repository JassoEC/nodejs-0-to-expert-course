"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAge = void 0;
const getAge = (birthDate) => {
    if (!birthDate)
        throw new Error('birthDate is required');
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
};
exports.getAge = getAge;
