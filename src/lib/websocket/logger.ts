/* eslint-disable no-unused-vars */
export type LogParams = null | any;

export const DefaultLogger = {
  trace: (..._params: LogParams): void => {
    // console.log(_params);
  },
  info: (...params: LogParams): void => {
    console.info(params);
  },
  error: (...params: LogParams): void => {
    console.error(params);
  },
};

export type DefaultLogger = typeof DefaultLogger;
