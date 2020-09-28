import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';
import interceptors from './interceptors';

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

interface OptionsType {
  method: 'GET' | 'POST' | 'PUT';
  params: any;
  url: string;
  noLoading?: boolean;
}

export default (
  options: OptionsType = { method: 'GET', params: {}, url: '', noLoading: false },
) => {
  if (!options.noLoading) {
    Taro.showLoading({
      title: '加载中',
    });
  }
  if (!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 URL=${options.url} 】PARAM=${JSON.stringify(
        options.params,
      )}`,
    );
  }
  for (const key in options.params) {
    if (
      options.params.hasOwnProperty(key) &&
      (options.params[key] === undefined || options.params[key] == null)
    ) {
      delete options.params[key];
    }
  }

  const getUrl = url => {
    let fullPath = baseUrl + url;
    if (/^https?:\/\//.test(url)) {
      fullPath = url;
    }
    return fullPath;
  };

  return Taro.request({
    url: getUrl(options.url),
    data: {
      ...options.params,
    },
    header: {
      // 'X-Token': Taro.getStorageSync('token'),
      'Content-Type': 'application/json',
    },
    // @ts-ignore
    method: options.method.toUpperCase(),
  }).then(res => {
    setTimeout(() => {
      Taro.hideLoading();
    }, 100);
    if (!noConsole) {
      console.log(
        `${new Date().toLocaleString('zh', { hour12: false })}【${options.url} 】【返回】`,
        res,
      );
    }
    return res;
  });
};
