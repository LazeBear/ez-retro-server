const app = require('../../src/app');

describe('\'cards\' service', () => {
  it('registered the service', () => {
    const service = app.service('cards');
    expect(service).toBeTruthy();
  });
});
