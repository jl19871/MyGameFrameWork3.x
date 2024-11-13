import { _decorator, assetManager, isValid, Sprite, SpriteFrame, Texture2D, Node, PrivateNode, UITransform, CCObject } from "cc";
import RemoteAsset from "./RemoteAssets";
import RemoteLoader from "./RemoteLoader";
import { DEV, EDITOR } from "cc/env";

const { ccclass, property, executeInEditMode, menu, requireComponent } = _decorator;

@ccclass
@executeInEditMode
@requireComponent(Sprite)
@menu('UI组件/Remote/RemoteTexture')
export default class RemoteTexture extends RemoteAsset {

  protected _sprite: Sprite = null;
  @property(Sprite)
  public get sprite() {
    return this._sprite;
  }
  public set sprite(value) {
    this._sprite = value;
    this.onPropertyUpdated();
  }

  protected _url: string = '';
  @property({ tooltip: DEV && '远程资源地址' })
  public get url() {
    return this._url;
  }
  public set url(value) {
    if (this.sprite.spriteFrame && this._url === value) {
      return;
    }
    this._url = value;
    this.onPropertyUpdated();
  }

  @property({ tooltip: DEV && '加载失败后的重试次数' })
  protected retryTimes: number = 0;

  protected _previewInEditor: boolean = true;
  @property({ tooltip: DEV && '在编辑器内预览' })
  public get previewInEditor() {
    return this._previewInEditor;
  }
  public set previewInEditor(value) {
    this._previewInEditor = value;
    this.onPropertyUpdated();
  }

  protected _showPreviewNode: boolean = false;
  @property({
    tooltip: DEV && '展示预览节点（该节点不会被保存，无需手动删除）',
    visible() {
      return this['_previewInEditor'];
    }
  })
  public get showPreviewNode() {
    return this._showPreviewNode;
  }
  public set showPreviewNode(value) {
    this._showPreviewNode = value;
    this.onPropertyUpdated();
  }

  /**
   * 当前使用的纹理
   */
  protected texture: Texture2D = null;

  /**
   * 最后一个请求 ID（用来处理短时间内的重复加载，仅保留最后一个请求）
   */
  protected lastRequestId: number = 0;

  /**
   * 生命周期：加载
   */
  protected onLoad() {
    this.init();
  }
  /**
   * 生命周期：销毁
   */
  protected onDestroy() {
    this.release();
    this._url = "";
  }

  /**
   * 编辑器回调：重置
   */
  public resetInEditor() {
    this.init();
  }

  /**
   * 初始化
   */
  protected init() {
    if (!isValid(this._sprite)) {
      this._sprite = this.getComponent(Sprite);
    }
    this.onPropertyUpdated();
  }

  /**
   * 释放
   */
  protected release() {
    // 解除纹理的引用
    if (isValid(this.texture, true)) {
      if (this.texture['remote']) {
        this.texture.decRef();
        this.texture = null;
      }
    }
  }

  /**
   * 属性更新回调
   */
  public onPropertyUpdated() {
    if (EDITOR) {
      this.updatePreview();
    } else {
      this.load(this._url);
    }
  }

  /**
   * 加载
   * @param url 资源地址
   */
  public async load(url: string = this._url): Promise<LoadResult> {
    this._url = url;
    // 组件
    if (!isValid(this._sprite)) {
      GFM.LogMgr.warn('[RemoteTexture]', 'load', '->', '缺少 Sprite 组件');
      return { url, loaded: false, interrupted: false, component: this };
    }
    // 置空
    if (!url || url === '') {
      this.set(null);
      return { url, loaded: false, interrupted: false, component: this };
    }
    // 增加请求 ID 并记录当前的 ID
    const curRequestId = ++this.lastRequestId;
    // 开始加载
    let texture: Texture2D = null,
      loadCount = 0;
    const maxLoadTimes = this.retryTimes + 1;
    while (!texture && loadCount < maxLoadTimes) {
      loadCount++;
      texture = await RemoteLoader.loadTexture(url);

      if (texture == null) {
        return { url, loaded: false, interrupted: true, component: this };
      }
      if (!isValid(this.node, true)) {
        assetManager.releaseAsset(texture);
        return;
      }
      // 当前加载请求是否已被覆盖
      if (this.lastRequestId !== curRequestId) {
        if (texture) {
          texture.addRef().decRef();
          texture = null;
        }
        return { url, loaded: false, interrupted: true, component: this };
      }
    }
    // 加载失败？
    if (!texture) {
      GFM.LogMgr.warn('[RemoteTexture]', 'load', '->', '资源加载失败', url);
      return { url, loaded: false, interrupted: false, component: this };
    }
    // 加载成功
    texture['remote'] = true;
    this.set(texture);
    return { url, loaded: true, interrupted: false, component: this };
  }

  /**
   * 设置
   * @param texture 纹理
   */
  public set(texture: Texture2D) {
    try {
      // 释放旧的资源引用
      this.release();
    } catch (error) {

    }

    // 替换资源
    if (texture) {
      let spriteFrame = new SpriteFrame();;
      spriteFrame.texture = texture;
      spriteFrame.packable = false;
      this._sprite.spriteFrame = spriteFrame;
      texture.addRef();
    } else {
      this._sprite.spriteFrame = null;
    }
    this.texture = texture;
    this.node.emit('sprite:sprite-frame-updated', this._sprite, texture);
  }

  /**
   * 更新编辑器预览
   */
  protected async updatePreview() {
    if (!EDITOR || !this._sprite) {
      return;
    }
    const actualSprite = this._sprite,
      actualNode = actualSprite.node;
    // 移除旧的预览节点
    actualNode.children.forEach(node => {
      if (node.name === 'PREVIEW_NODE')
        node.removeFromParent();
    });
    // 是否开启预览
    if (!this._previewInEditor) {
      return;
    }
    // 链接是否有效
    if (!this._url || this._url === '') {
      return;
    }
    // 生成临时预览节点
    let previewNode: Node = null;
    if (this._showPreviewNode) {
      previewNode = new Node('PREVIEW_NODE');
    } else {
      previewNode = new PrivateNode('PREVIEW_NODE');
    }
    previewNode['_objFlags'] |= CCObject['Flags'].HideInHierarchy;
    previewNode['_objFlags'] |= CCObject['Flags'].DontSave;
    previewNode['_objFlags'] |= CCObject['Flags'].LockedInEditor;

    previewNode.parent = (actualNode);
    let transform = previewNode.addComponent(UITransform);
    let contentSize = actualNode.getComponent(UITransform)?.contentSize;
    transform.setContentSize(contentSize);
    // 加载资源
    const texture = await RemoteLoader.loadTexture(this._url);
    if (!isValid(previewNode) || !texture) {
      previewNode.removeFromParent();
      return;
    }
    // 设置资源
    const previewSprite = previewNode.addComponent(Sprite);
    previewSprite.type = actualSprite.type;
    previewSprite.sizeMode = actualSprite.sizeMode;
    previewSprite.trim = actualSprite.trim;
    let spriteFrame = new SpriteFrame();
    spriteFrame.texture = texture;
    previewSprite.spriteFrame = spriteFrame;
    // tips
    if (this._showPreviewNode) {
      GFM.LogMgr.log('[RemoteTexture]', 'Preview', '->', '预览节点（PREVIEW_NODE）不会被保存，无需手动删除');
    }
  }

}

interface LoadResult {
  url: string;
  loaded: boolean;
  interrupted: boolean;
  component: RemoteTexture;
};
