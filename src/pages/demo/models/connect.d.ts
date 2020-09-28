import { AnyAction, Dispatch } from 'redux';
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
}
