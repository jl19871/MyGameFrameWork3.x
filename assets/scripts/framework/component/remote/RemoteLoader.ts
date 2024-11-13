/*
 * @Author: JL
 * @Date: 2024-03-26 10:26:30
 */

import { assetManager, ImageAsset, log, Texture2D } from "cc";

export default class RemoteLoader {

  /**
   * 加载纹理
   * @param url 资源地址
   * @param callback 加载回调
   */
  public static loadTexture(url: string, callback?: (error: Error, texture: Texture2D) => void) {
    return new Promise<Texture2D>(res => {
      assetManager.loadRemote(url, (error: Error, image: ImageAsset) => {
        if (error || !(image instanceof ImageAsset)) {
          callback && callback(error, null);
          res(null);
        } else {
          let texture = new Texture2D();
          texture.image = image;
          callback && callback(null, texture);
          res(texture);
        }
      });
    });
  }

}
