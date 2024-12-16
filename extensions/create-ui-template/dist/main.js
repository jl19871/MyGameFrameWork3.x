"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
/*
 * @Author: JL
 * @Date: 2024-12-11 17:06:53
 */
const UITemplate_1 = __importDefault(require("./core/UITemplate"));
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    /**
     * @en A method that can be triggered by message
     * @zh 通过 message 触发的方法
     */
    showLog() {
    },
    async createTemplate() {
        let curSelecteds = Editor.Selection.getSelected('asset');
        if (curSelecteds.length <= 0) {
            Editor.Dialog.warn("Warning", {
                detail: 'Please select a UI prefab!',
                buttons: ['OK']
            });
            return;
        }
        await Editor.Message.request('asset-db', 'query-ready');
        let selectedUUid = curSelecteds[0];
        let assetInfo = await Editor.Message.request('asset-db', 'query-asset-info', selectedUUid);
        let assetType = assetInfo === null || assetInfo === void 0 ? void 0 : assetInfo.type;
        console.log('Asset Type:', assetType);
        if (assetType === "cc.Prefab") {
            UITemplate_1.default.dealPrefab(assetInfo);
        }
        else {
            Editor.Dialog.warn("Warning", {
                detail: 'Please select a UI prefab!',
                buttons: ['OK']
            });
        }
    },
    settings() {
        console.log('Settings');
        Editor.Panel.open('create-ui-template');
    },
    async chooseDirectory(_path) {
        const currentDir = path_1.default.join(Editor.Project.path, _path);
        console.log('当前目录路径:', currentDir);
        let result = await electron_1.dialog.showOpenDialogSync({
            title: '选择UI输出路径',
            defaultPath: currentDir,
            properties: ['openDirectory'] // 与旧接口类似的目录选择属性
        });
        if (result) {
            console.log('选择的目录:', result[0]);
            let relativePath = path_1.default.relative(Editor.Project.path, result[0]);
            return relativePath; // 返回选择的目录路径
        }
        else {
            console.log('用户取消了选择');
            return null;
        }
    }
};
/**
 * @en Method Triggered on Extension Startup
 * @zh 扩展启动时触发的方法
 */
function load() {
}
exports.load = load;
/**
 * @en Method triggered when uninstalling the extension
 * @zh 卸载扩展时触发的方法
 */
function unload() {
}
exports.unload = unload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7R0FHRztBQUNILG1FQUEyQztBQUMzQyx1Q0FBa0M7QUFDbEMsZ0RBQXdCO0FBQ3hCOzs7R0FHRztBQUNVLFFBQUEsT0FBTyxHQUE0QztJQUM1RDs7O09BR0c7SUFDSCxPQUFPO0lBQ1AsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjO1FBQ2hCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUMxQixNQUFNLEVBQUUsNEJBQTRCO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWO1FBQ0QsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzNGLElBQUksU0FBUyxHQUFHLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxJQUFJLENBQUM7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEMsSUFBSSxTQUFTLEtBQUssV0FBVyxFQUFFO1lBQzNCLG9CQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BDO2FBQ0k7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzFCLE1BQU0sRUFBRSw0QkFBNEI7Z0JBQ3BDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQzthQUNsQixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQWE7UUFDL0IsTUFBTSxVQUFVLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVuQyxJQUFJLE1BQU0sR0FBRyxNQUFNLGlCQUFNLENBQUMsa0JBQWtCLENBQUM7WUFDekMsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUFFLFVBQVU7WUFDdkIsVUFBVSxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsZ0JBQWdCO1NBQ2pELENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxFQUFFO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxZQUFZLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRSxPQUFPLFlBQVksQ0FBQyxDQUFDLFlBQVk7U0FDcEM7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7Q0FDSixDQUFDO0FBRUY7OztHQUdHO0FBQ0gsU0FBZ0IsSUFBSTtBQUNwQixDQUFDO0FBREQsb0JBQ0M7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixNQUFNO0FBQ3RCLENBQUM7QUFERCx3QkFDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBKTFxuICogQERhdGU6IDIwMjQtMTItMTEgMTc6MDY6NTNcbiAqL1xuaW1wb3J0IHVpVGVtcGxhdGUgZnJvbSAnLi9jb3JlL1VJVGVtcGxhdGUnO1xuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG4vKipcbiAqIEBlbiBSZWdpc3RyYXRpb24gbWV0aG9kIGZvciB0aGUgbWFpbiBwcm9jZXNzIG9mIEV4dGVuc2lvblxuICogQHpoIOS4uuaJqeWxleeahOS4u+i/m+eoi+eahOazqOWGjOaWueazlVxuICovXG5leHBvcnQgY29uc3QgbWV0aG9kczogeyBba2V5OiBzdHJpbmddOiAoLi4uYW55OiBhbnkpID0+IGFueSB9ID0ge1xuICAgIC8qKlxuICAgICAqIEBlbiBBIG1ldGhvZCB0aGF0IGNhbiBiZSB0cmlnZ2VyZWQgYnkgbWVzc2FnZVxuICAgICAqIEB6aCDpgJrov4cgbWVzc2FnZSDop6blj5HnmoTmlrnms5VcbiAgICAgKi9cbiAgICBzaG93TG9nKCkge1xuICAgIH0sXG5cbiAgICBhc3luYyBjcmVhdGVUZW1wbGF0ZSgpIHtcbiAgICAgICAgbGV0IGN1clNlbGVjdGVkcyA9IEVkaXRvci5TZWxlY3Rpb24uZ2V0U2VsZWN0ZWQoJ2Fzc2V0Jyk7XG4gICAgICAgIGlmIChjdXJTZWxlY3RlZHMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIEVkaXRvci5EaWFsb2cud2FybihcIldhcm5pbmdcIiwge1xuICAgICAgICAgICAgICAgIGRldGFpbDogJ1BsZWFzZSBzZWxlY3QgYSBVSSBwcmVmYWIhJyxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbJ09LJ11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3F1ZXJ5LXJlYWR5Jyk7XG4gICAgICAgIGxldCBzZWxlY3RlZFVVaWQgPSBjdXJTZWxlY3RlZHNbMF07XG4gICAgICAgIGxldCBhc3NldEluZm8gPSBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdhc3NldC1kYicsICdxdWVyeS1hc3NldC1pbmZvJywgc2VsZWN0ZWRVVWlkKTtcbiAgICAgICAgbGV0IGFzc2V0VHlwZSA9IGFzc2V0SW5mbz8udHlwZTtcbiAgICAgICAgY29uc29sZS5sb2coJ0Fzc2V0IFR5cGU6JywgYXNzZXRUeXBlKTtcbiAgICAgICAgaWYgKGFzc2V0VHlwZSA9PT0gXCJjYy5QcmVmYWJcIikge1xuICAgICAgICAgICAgdWlUZW1wbGF0ZS5kZWFsUHJlZmFiKGFzc2V0SW5mbyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBFZGl0b3IuRGlhbG9nLndhcm4oXCJXYXJuaW5nXCIsIHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6ICdQbGVhc2Ugc2VsZWN0IGEgVUkgcHJlZmFiIScsXG4gICAgICAgICAgICAgICAgYnV0dG9uczogWydPSyddXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXR0aW5ncygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NldHRpbmdzJyk7XG4gICAgICAgIEVkaXRvci5QYW5lbC5vcGVuKCdjcmVhdGUtdWktdGVtcGxhdGUnKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgY2hvb3NlRGlyZWN0b3J5KF9wYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY3VycmVudERpciA9IHBhdGguam9pbihFZGl0b3IuUHJvamVjdC5wYXRoLCBfcGF0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCflvZPliY3nm67lvZXot6/lvoQ6JywgY3VycmVudERpcik7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGRpYWxvZy5zaG93T3BlbkRpYWxvZ1N5bmMoe1xuICAgICAgICAgICAgdGl0bGU6ICfpgInmi6lVSei+k+WHuui3r+W+hCcsXG4gICAgICAgICAgICBkZWZhdWx0UGF0aDogY3VycmVudERpciwgLy8g6K6+572u6buY6K6k6Lev5b6EXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbJ29wZW5EaXJlY3RvcnknXSAvLyDkuI7ml6fmjqXlj6PnsbvkvLznmoTnm67lvZXpgInmi6nlsZ7mgKdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+mAieaLqeeahOebruW9lTonLCByZXN1bHRbMF0pO1xuICAgICAgICAgICAgbGV0IHJlbGF0aXZlUGF0aCA9IHBhdGgucmVsYXRpdmUoRWRpdG9yLlByb2plY3QucGF0aCwgcmVzdWx0WzBdKTtcbiAgICAgICAgICAgIHJldHVybiByZWxhdGl2ZVBhdGg7IC8vIOi/lOWbnumAieaLqeeahOebruW9lei3r+W+hFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+WPlua2iOS6humAieaLqScpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIEBlbiBNZXRob2QgVHJpZ2dlcmVkIG9uIEV4dGVuc2lvbiBTdGFydHVwXG4gKiBAemgg5omp5bGV5ZCv5Yqo5pe26Kem5Y+R55qE5pa55rOVXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkKCkge1xufVxuXG4vKipcbiAqIEBlbiBNZXRob2QgdHJpZ2dlcmVkIHdoZW4gdW5pbnN0YWxsaW5nIHRoZSBleHRlbnNpb25cbiAqIEB6aCDljbjovb3mianlsZXml7bop6blj5HnmoTmlrnms5VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVubG9hZCgpIHtcbn1cbiJdfQ==