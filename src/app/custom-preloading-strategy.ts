/**
 * 自定义路由预加载策略
 * 根据路由配置中的data.preload属性决定是否预加载模块
 * 
 * 使用说明：
 * 1. 在路由配置中添加data: { preload: true } 来标记需要预加载的路由
 * 2. 在AppRoutingModule中配置preloadingStrategy为本策略
 */
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
    /**
     * 自定义预加载策略实现
     * @param route 当前路由配置对象
     * @param load 模块加载器函数
     * @returns 可观察对象，用于控制预加载流程
     */
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // 检查路由配置中是否包含预加载标记
        // 使用方括号语法访问data属性以兼容TypeScript严格模式
        return route.data && route.data['preload'] ? load() : of(null);
    }
} 