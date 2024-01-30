"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMakePerson = void 0;
const buildMakePerson = ({ getUuid, getAge }) => {
    return ({ name, birthDate }) => {
        return {
            id: getUuid(),
            name,
            birthDate,
            age: getAge(birthDate)
        };
    };
};
exports.buildMakePerson = buildMakePerson;
