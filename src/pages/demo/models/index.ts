import { Reducer } from 'redux';
import { Effect, Model } from 'dva';
import { demo } from '../service';

export interface StateType {
  demoState: string;
}

interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    demoEffect: Effect;
  };
  reducers: {
    demoSave: Reducer;
  };
}

const model: Model & ModelType = {
  namespace: 'demo',
  state: {
    demoState: '自定义state',
  },
  effects: {
    *demoEffect({ payload }, { call, put }) {
      const res = yield call(demo, payload);
      console.log(res);
      if (res.code === 0) {
        yield put({
          type: 'demoSave',
          payload: {
            topData: res.data, // 模拟
          },
        });
      }
    },
  },
  reducers: {
    demoSave(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default model;
