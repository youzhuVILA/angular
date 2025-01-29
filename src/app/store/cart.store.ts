/**
 * 创建购物车状态管理模块
 * 使用NgRx实现集中式状态管理，便于跨组件共享数据和维护状态一致性
 */
import { createAction, createReducer, on } from '@ngrx/store';

// 定义购物车状态接口
export interface CartState {
  items: any[];        // 商品列表
  loading: boolean;     // 加载状态
  error: string | null; // 错误信息
}

// 初始化状态
const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

// 创建Action（状态修改触发器）
export const loadCart = createAction('[Cart] Load Cart'); // 开始加载购物车
export const loadCartSuccess = createAction(              // 加载成功
  '[Cart] Load Cart Success',
  (items: any[]) => ({ items })
);
export const loadCartFailure = createAction(              // 加载失败
  '[Cart] Load Cart Failure',
  (error: string) => ({ error })
);

// 创建Reducer（状态处理函数）
export const cartReducer = createReducer(
  initialState,
  on(loadCart, (state) => ({ ...state, loading: true })), // 开始加载时设置loading状态
  on(loadCartSuccess, (state, { items }) => ({            // 加载成功更新商品列表
    ...state,
    loading: false,
    items
  })),
  on(loadCartFailure, (state, { error }) => ({             // 加载失败记录错误信息
    ...state,
    loading: false,
    error
  }))
); 