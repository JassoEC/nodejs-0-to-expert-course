import { emailTemplate } from '../../src/js-foundation/01-template';

describe('Test in the file 01-template.test.js', () => {
  test('email template should contain a greeting', () => {
    expect(emailTemplate).toContain('Thanks')
  });

  test('email template should contain a name', () => {
    expect(emailTemplate).toContain('{{name}}')
  });
});