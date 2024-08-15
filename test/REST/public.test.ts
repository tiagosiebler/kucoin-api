import { SpotClient } from '../../src/index.js';

describe('REST PUBLIC', () => {
  const rest = new SpotClient();

  describe('public endpoints', () => {
    it('should succeed making a GET request', async () => {
      const res = await rest.getTickers();
      expect(res).toMatchObject(expect.any(Array));
    });

    it('should return orderbook data', async () => {
      const res = await rest.getFullOrderBook({
        symbol: 'BTCUSDT',
      });

      // console.log(JSON.stringify(res, null, 2));
      expect(res.data.asks).toMatchObject(expect.any(Array));
      expect(res.data.bids).toMatchObject(expect.any(Array));
      expect(res.data.time).toEqual(expect.any(String));
      expect(res.data.sequence).toEqual(expect.any(String));
    });
  });
});
