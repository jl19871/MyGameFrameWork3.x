import { Asset, JsonAsset, Prefab, SpriteAtlas, SpriteFrame, assetManager, isValid, log, resources, sp } from "cc";

/**
 * 资源管理器, 加载目录支持引用计数, 注意不可父子目录混用
 *
 * @export
 * @class ResManager
 */
export default class ResManager {

    private loadedResDirMap: Map<string, number> = null;
    private spineCache: Map<string, sp.SkeletonData> = null //存储已创建的spine

    private loadedSpriteFrames: Map<string, Array<string>> = null;

    public async setup() {
        this.loadedResDirMap = new Map();
        this.spineCache = new Map();
        this.loadedSpriteFrames = new Map();
        // GFM.LogMgr.log("AssetManager setup");
    }

    public release() {
        this.clearSpine();
    }
    /**
     * 加载资源, 目录数组
     *
     * @param paths
     * @param [progressCallback]
     * @returns {*}
     * @memberof AssetManager
     */
    public async loadDirs(paths: string[], progressCallback?: (percent: number) => void): Promise<void> {
        if (!paths || paths.length <= 0) {
            return;
        }
        // GFM.LogMgr.log('begin load:', paths);
        const pathLen = paths.length;
        for (let index = 0; index < pathLen; index++) {
            const path = paths[index];
            await this.loadDir(path, (percent) => {
                percent = percent / pathLen + index / pathLen;
                progressCallback && progressCallback(percent);
            });
        }
    }

    /**
     * 加载单个目录
     *
     * @param path
     * @param [progressCallback]
     * @returns {*}
     * @memberof AssetManager
     */
    public async loadDir(path: string, progressCallback?: (percent: number) => void): Promise<void> {
        let refNum = this.loadedResDirMap.get(path) || 0;
        if (refNum > 0) {
            this.loadedResDirMap.set(path, ++refNum);
            // GFM.LogMgr.log(`AssetManager already loaded: ${path}`);
            return;
        }
        this.loadedResDirMap.set(path, ++refNum);
        let self = this;
        await new Promise((callback) => {
            let array = path.split("/");
            let assetType: typeof Asset = null;
            switch (array[0]) {
                case "Prefab":
                    assetType = Prefab;
                    break;
                case "Texture":
                    if (path.indexOf("Atlas") != -1)
                        assetType = SpriteAtlas;
                    else
                        assetType = SpriteFrame;
                    break;
                case "Spine":
                    assetType = sp.SkeletonData;
                    break;
                case "Json":
                    assetType = JsonAsset;
                    break;
                default:
                    // GFM.LogMgr.log(" load RES  noTYPE  = " + path);
                    break;
            }
            if (assetType != null) {
                resources.loadDir(path, assetType, (finish, total, item) => {
                    progressCallback && progressCallback(finish / total);
                }, (err, assets) => {
                    if (assetType == SpriteFrame) {
                        let paths = [];
                        assets.forEach(asset => {
                            paths.push(asset.name);
                        });
                        self.loadedSpriteFrames.set(path, paths);
                    }
                    callback(err);
                });
                // GFM.LogMgr.log(`AssetManager loadDir: ${path}  type =  ${array[0]}`);
            }
            else {
                resources.loadDir(path, (finish, total, item) => {
                    progressCallback && progressCallback(finish / total);
                }, callback);
            }
        });
    }

    /**
     * 释放目录数组
     *
     * @param paths
     * @memberof AssetManager
     */
    public releaseDirs(paths: string[]): void {
        paths.forEach((path) => this.releaseDir(path));
    }

    /**
      * 释放单个目录
      *
      * @param path
      * @returns {*}
      * @memberof AssetManager
      */
    public releaseDir(path: string): void {
        let refNum = this.loadedResDirMap.get(path);
        if (refNum === null && refNum === undefined) {
            return;
        }
        this.loadedResDirMap.set(path, --refNum);
        if (refNum > 0) {
            return;
        }

        let paths = this.loadedSpriteFrames.get(path);
        if (paths) {
            paths.forEach(_path => {
                let aa = path + "/" + _path;
                let res = resources.get<SpriteFrame>(aa, SpriteFrame);
                if (res) {
                    assetManager.releaseAsset(res);
                }
            });
            this.loadedSpriteFrames.delete(path);
        }
        else {
            let res = resources.get(path);
            if (res) {
                assetManager.releaseAsset(res);
            }
        }

        // GFM.LogMgr.log(`AssetManager releaseDir: ${path}`);
    }

    /**
     * 目录是否已加载, 判断引用计数是否大于 0
     *
     * @param path
     * @returns {*}
     * @memberof AssetManager
     */
    public isDirLoaded(path: string): boolean {
        return this.loadedResDirMap.get(path) > 0;
    }

    public dumpDirMap() {
        const data = [];
        this.loadedResDirMap.forEach((v, k) => {
            v !== 0 && data.push({ dir: k, refNum: v });
        });
        console.table(data);
    }

    // ============================ 预加载spine ===============================
    public preloadSpine(url: string, callback?: Function) {
        log("preloadSpine " + url + " start")
        console.time("加载spine资源 : " + url);
        return new Promise((reovle, reject) => {
            resources.load(url, sp.SkeletonData, (error, skeletonData: sp.SkeletonData) => {
                if (error) {
                    reject(error);
                } else {
                    reovle(skeletonData);
                    if (!this.spineCache[url] && skeletonData) {
                        this.spineCache[url] = skeletonData;
                        skeletonData.addRef()
                    }
                    console.timeEnd("加载spine资源 : " + url)
                    if (callback) {
                        callback();
                    }
                }
            });
        });
    }

    //释放Spine
    public clearSpine(url?: string) {
        if (url && this.spineCache[url]) {
            this.spineCache[url].decRef()
            this.spineCache[url] = null
        } else {
            for (const key in this.spineCache) {
                this.spineCache[key].decRef()
                this.spineCache[key] = null
            }
        }
    }

    public showSpine(url: string, spine: sp.Skeleton, callback?: Function) {
        let callFunc = () => {
            log("showSpine url:" + url)
            if (isValid(spine)) {
                spine.skeletonData = this.spineCache[url];
            }
            if (callback) {
                callback()
            }
        }
        if (this.spineCache[url]) {
            callFunc()
        } else {
            this.preloadSpine(url, () => {
                if (this.spineCache[url]) {
                    callFunc()
                }
            })
        }
    }

    public async showSpineSync(url: string, spine: sp.Skeleton) {
        if (this.spineCache[url] == undefined) {
            await this.preloadSpine(url);
        }
        if (this.spineCache[url] && isValid(spine)) {
            spine.skeletonData = this.spineCache[url];
        }
    }
}
