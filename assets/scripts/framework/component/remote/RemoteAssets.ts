import { _decorator, Component } from "cc";

/*
 * @Author: JL
 * @Date: 2024-03-26 10:24:08
 */
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass
@executeInEditMode
export default class RemoteAsset extends Component {

  /**
   * 加载
   * @param url 资源地址
   */
  public async load(url?: string): Promise<LoadResult> {
    return { url, loaded: false, interrupted: false, component: this };
  }

  /**
   * 设置资源
   * @param asset 资源
   */
  public set(asset?: any) {

  }
}

type LoadResult = {
  url: string;
  loaded: boolean;
  interrupted: boolean;
  component: any;
};
