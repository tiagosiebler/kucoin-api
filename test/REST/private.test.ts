import { SpotClient } from '../../src/index.js';

describe('REST PRIVATE', () => {
  const account = {
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
    passphrase: process.env.API_PASSPHRASE,
  };

  const rest = new SpotClient({
    apiKey: account.key,
    apiSecret: account.secret,
    apiPassphrase: account.passphrase,
  });

  it('should have credentials to test with', () => {
    expect(account.key).toBeDefined();
    expect(account.secret).toBeDefined();
    expect(account.passphrase).toBeDefined();
  });

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getTickers();
      expect(res.data).toMatchObject(expect.any(Array));
    });
  });

  describe('private endpoints', () => {
    describe('GET requests', () => {
      test('without params', async () => {
        const res = await rest.getBalances();
        // console.log('res without', res);
        expect(res).toMatchObject({
          details: expect.any(Object),
          total: expect.any(Object),
        });
      });

      test('with params', async () => {
        const res = await rest.getBalances({ currency: 'USDT' });
        // console.log('res with', res);
        expect(res).toMatchObject({
          details: expect.any(Object),
          total: expect.any(Object),
        });
      });
    });

    describe('POST requests', () => {
      test('with params as request body', async () => {
        try {
          const res = await rest.updateMarginLeverageV3({
            leverage: '1',
            symbol: 'BTC-USDT',
          });

          console.log('res "${expect.getState().currentTestName}"', res);
          expect(res).toMatchObject({
            whatever: true,
          });
        } catch (e: any) {
          console.log('err "${expect.getState().currentTestName}"', e);
          const authSuccessMatchError = 'Invalid sub_account_from';
          if (e.body.message !== authSuccessMatchError) {
            console.error(
              `Request failed for test: "${expect.getState().currentTestName}"`,
              e,
            );
          }
          expect(e.body.message).toStrictEqual(authSuccessMatchError);
        }
      });
    });
  });
});
