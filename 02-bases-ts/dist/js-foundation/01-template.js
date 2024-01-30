"use strict";
/**
 * Cada archivo de JS es un módulo
 * Debe enterderse un módulo como un objeto encapsulado
 * Explicitamente se debe exportar lo que se quiere que sea público
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
exports.emailTemplate = `
<div>
  <h1>Hi, {{name}}</h1>
  <p>Thanks for joining our community.</p>
  <p>Best regards</p>
</div>
`;
