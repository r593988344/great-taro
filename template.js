/* eslint-disable import/no-commonjs */
/**
 * pages模版快速生成脚本,执行命令 npm run temp `文件名`
 */

const fs = require('fs');

const prettier = require('prettier');

const prettierConfig = Object.assign(JSON.parse(fs.readFileSync(`./.prettierrc`, 'utf8')), {
  parser: 'babel',
});

const dirName = process.argv[2];

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run temp test');
  process.exit(0);
}

// 页面模版
const indexTep = `import React, { useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { connect } from 'react-redux';

import { StateType } from './models';
import { ConnectProps, ConnectState } from './models/connect';

import './index.scss';

interface OwnProps {
  // 父组件要传的prop放这
  value: number;
}

type IProps = StateType & ConnectProps & OwnProps;

const ${titleCase(dirName)}: React.FC<IProps> = props => {
  const { dispatch, demoState } = props;

  const fetchData = useCallback(async () => {
    await dispatch({
      type: '${dirName}/demoEffect',
      payload: {},
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <View className='${dirName}-page'>Taro demo页面 {demoState}</View>;
};

export default connect(({ demo }: ConnectState) => ({
  ...demo,
}))(${titleCase(dirName)});`;

// scss文件模版
const scssTep = `.${dirName}-page {}`;

// service页面模版
const serviceTep = `export const demo = (params) => Request({ url: '/url', method: 'GET', params });
`;

// index.config模板
const indexConfig = `export default {
  navigationBarTitleText: '${dirName}'
};
`;

// model文件模版
const modelTep = `import { Reducer } from 'redux';
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
  namespace: '${dirName}',
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
`;

const connectTmp = `import { AnyAction, Dispatch } from 'redux';
import { StateType as demoState } from './index';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
}

export interface ConnectProps {
  dispatch: Dispatch<AnyAction>;
}

export interface ConnectState {
  loading: Loading;
  demo: demoState;
}`;

try {
  fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
  fs.mkdirSync(`./src/pages/${dirName}/models`); // mkdir $1
} catch (e) {
  console.log(`${dirName}目录已存在，生成失败`);
  process.exit(0);
}
fs.writeFileSync(`./src/pages/${dirName}/index.tsx`, prettier.format(indexTep, prettierConfig));
fs.writeFileSync(`./src/pages/${dirName}/index.scss`, scssTep);
fs.writeFileSync(
  `./src/pages/${dirName}/index.config.ts`,
  prettier.format(indexConfig, prettierConfig),
);
fs.writeFileSync(
  `./src/pages/${dirName}/models/index.ts`,
  prettier.format(modelTep, prettierConfig),
);
fs.writeFileSync(`./src/pages/${dirName}/service.ts`, prettier.format(serviceTep, prettierConfig));
fs.writeFileSync(
  `./src/pages/${dirName}/models/connect.d.ts`,
  prettier.format(connectTmp, prettierConfig),
);

const modelsIndexTep1 = `common,
  ${dirName}Model,`;

const modelsIndexTep2 = `import ${dirName}Model from '@/pages/${dirName}/models';
import common from './common';`;

// models 入口文件
const modelsIndex = fs.readFileSync(`./src/models/index.ts`, 'utf8');
if (!modelsIndex.includes(`${dirName}Model`)) {
  const _newModelsIndex = modelsIndex.replace(/common,/, modelsIndexTep1);
  const newModelsIndex = _newModelsIndex.replace("import common from './common';", modelsIndexTep2);
  fs.writeFileSync('./src/models/index.ts', prettier.format(newModelsIndex, prettierConfig));
}

console.log(`模版${dirName}已创建 enjoy`);

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

process.exit(0);
