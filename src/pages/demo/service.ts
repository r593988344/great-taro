import Request from '@/utils/request';

export const demo = params =>
  Request({
    url: '/api/apimock-v2/eecd7a1c8a9331b83d6dad3716460b20/shop/goodsLists',
    method: 'GET',
    params,
  });
