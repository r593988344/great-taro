import React, { useEffect, useCallback } from 'react';
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

const Demo: React.FC<IProps> = props => {
  const { dispatch, demoState } = props;

  const fetchData = useCallback(async () => {
    await dispatch({
      type: 'demo/demoEffect',
      payload: {},
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <View className='account-page'>Taro demo页面 {demoState}</View>;
};

export default connect(({ demo }: ConnectState) => ({
  ...demo,
}))(Demo);
