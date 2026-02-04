import { isDeepObjectMatch } from '../../src/lib/websocket/WsStore.js';

describe('WsStore', () => {
  describe('isDeepObjectMatch()', () => {
    it('should match two equal strings', () => {
      expect(
        isDeepObjectMatch('/market/ticker:BTC-USDT', '/market/ticker:BTC-USDT'),
      ).toBeTruthy();
      expect(
        isDeepObjectMatch('/market/ticker:BTC-USDT', '/market/ticker:ETH-USDT'),
      ).toBeFalsy();
    });

    it('should match simple topic objects', () => {
      const topic1 = {
        topic: '/market/ticker:BTC-USDT',
      };
      const topic2 = {
        topic: '/market/ticker:BTC-USDT',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should match topic objects with payload, even if keys are differently ordered', () => {
      const topic1 = {
        topic: 'kline',
        payload: {
          tradeType: 'SPOT',
          symbol: 'BTC-USDT',
          interval: '1min',
        },
      };
      const topic2 = {
        payload: {
          tradeType: 'SPOT',
          symbol: 'BTC-USDT',
          interval: '1min',
        },
        topic: 'kline',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should match nested payload objects', () => {
      const topic1 = {
        topic: 'orderAll',
        payload: {
          tradeType: 'SPOT',
        },
      };
      const topic2 = {
        topic: 'orderAll',
        payload: {
          tradeType: 'SPOT',
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should NOT match topics with different payload values', () => {
      const topic1 = {
        topic: 'kline',
        payload: {
          tradeType: 'SPOT',
          symbol: 'BTC-USDT',
          interval: '1min',
        },
      };
      const topic2 = {
        topic: 'kline',
        payload: {
          tradeType: 'SPOT',
          symbol: 'ETH-USDT',
          interval: '1min',
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match topics with nested payload differences', () => {
      const topic1 = {
        topic: 'kline',
        payload: {
          tradeType: 'SPOT',
          symbol: 'BTC-USDT',
          interval: '1min',
        },
      };
      const topic2 = {
        topic: 'kline',
        payload: {
          tradeType: 'SPOT',
          symbol: 'BTC-USDT',
          interval: '5min',
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match topics with different tradeType', () => {
      const topic1 = {
        topic: 'orderAll',
        payload: {
          tradeType: 'SPOT',
        },
      };
      const topic2 = {
        topic: 'orderAll',
        payload: {
          tradeType: 'FUTURES',
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (missing payload property)', () => {
      const topic1 = {
        topic: 'kline',
        payload: {
          tradeType: 'SPOT',
          symbol: 'BTC-USDT',
          interval: '1min',
        },
      };
      const topic2 = {
        topic: 'kline',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (missing nested property)', () => {
      const topic1 = {
        topic: 'kline',
        payload: {
          tradeType: 'SPOT',
          symbol: 'BTC-USDT',
          interval: '1min',
        },
      };
      const topic2 = {
        topic: 'kline',
        payload: {
          tradeType: 'SPOT',
          symbol: 'BTC-USDT',
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match string to object', () => {
      expect(
        isDeepObjectMatch('/market/ticker:BTC-USDT', {
          topic: '/market/ticker:BTC-USDT',
        }),
      ).toBeFalsy();
    });
  });
});
