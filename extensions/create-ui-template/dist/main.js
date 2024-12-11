"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const UITemplate_1 = __importDefault(require("./core/UITemplate"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLG1FQUEyQztBQUMzQzs7O0dBR0c7QUFDVSxRQUFBLE9BQU8sR0FBNEM7SUFDNUQ7OztPQUdHO0lBQ0gsT0FBTztJQUNQLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYztRQUNoQixJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDMUIsTUFBTSxFQUFFLDRCQUE0QjtnQkFDcEMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO2FBQ2xCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUNELE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksWUFBWSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLFNBQVMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzRixJQUFJLFNBQVMsR0FBRyxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsSUFBSSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksU0FBUyxLQUFLLFdBQVcsRUFBRTtZQUMzQixvQkFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNwQzthQUNJO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUMxQixNQUFNLEVBQUUsNEJBQTRCO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7YUFDbEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0osQ0FBQztBQUVGOzs7R0FHRztBQUNILFNBQWdCLElBQUk7QUFDcEIsQ0FBQztBQURELG9CQUNDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsTUFBTTtBQUN0QixDQUFDO0FBREQsd0JBQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiY29uc29sZVwiO1xuXG5cbmltcG9ydCB1aVRlbXBsYXRlIGZyb20gJy4vY29yZS9VSVRlbXBsYXRlJztcbi8qKlxuICogQGVuIFJlZ2lzdHJhdGlvbiBtZXRob2QgZm9yIHRoZSBtYWluIHByb2Nlc3Mgb2YgRXh0ZW5zaW9uXG4gKiBAemgg5Li65omp5bGV55qE5Li76L+b56iL55qE5rOo5YaM5pa55rOVXG4gKi9cbmV4cG9ydCBjb25zdCBtZXRob2RzOiB7IFtrZXk6IHN0cmluZ106ICguLi5hbnk6IGFueSkgPT4gYW55IH0gPSB7XG4gICAgLyoqXG4gICAgICogQGVuIEEgbWV0aG9kIHRoYXQgY2FuIGJlIHRyaWdnZXJlZCBieSBtZXNzYWdlXG4gICAgICogQHpoIOmAmui/hyBtZXNzYWdlIOinpuWPkeeahOaWueazlVxuICAgICAqL1xuICAgIHNob3dMb2coKSB7XG4gICAgfSxcblxuICAgIGFzeW5jIGNyZWF0ZVRlbXBsYXRlKCkge1xuICAgICAgICBsZXQgY3VyU2VsZWN0ZWRzID0gRWRpdG9yLlNlbGVjdGlvbi5nZXRTZWxlY3RlZCgnYXNzZXQnKTtcbiAgICAgICAgaWYgKGN1clNlbGVjdGVkcy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgRWRpdG9yLkRpYWxvZy53YXJuKFwiV2FybmluZ1wiLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiAnUGxlYXNlIHNlbGVjdCBhIFVJIHByZWZhYiEnLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFsnT0snXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncXVlcnktcmVhZHknKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkVVVpZCA9IGN1clNlbGVjdGVkc1swXTtcbiAgICAgICAgbGV0IGFzc2V0SW5mbyA9IGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3F1ZXJ5LWFzc2V0LWluZm8nLCBzZWxlY3RlZFVVaWQpO1xuICAgICAgICBsZXQgYXNzZXRUeXBlID0gYXNzZXRJbmZvPy50eXBlO1xuICAgICAgICBjb25zb2xlLmxvZygnQXNzZXQgVHlwZTonLCBhc3NldFR5cGUpO1xuICAgICAgICBpZiAoYXNzZXRUeXBlID09PSBcImNjLlByZWZhYlwiKSB7XG4gICAgICAgICAgICB1aVRlbXBsYXRlLmRlYWxQcmVmYWIoYXNzZXRJbmZvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEVkaXRvci5EaWFsb2cud2FybihcIldhcm5pbmdcIiwge1xuICAgICAgICAgICAgICAgIGRldGFpbDogJ1BsZWFzZSBzZWxlY3QgYSBVSSBwcmVmYWIhJyxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbJ09LJ11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldHRpbmdzKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnU2V0dGluZ3MnKTtcbiAgICAgICAgRWRpdG9yLlBhbmVsLm9wZW4oJ2NyZWF0ZS11aS10ZW1wbGF0ZScpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQGVuIE1ldGhvZCBUcmlnZ2VyZWQgb24gRXh0ZW5zaW9uIFN0YXJ0dXBcbiAqIEB6aCDmianlsZXlkK/liqjml7bop6blj5HnmoTmlrnms5VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWQoKSB7XG59XG5cbi8qKlxuICogQGVuIE1ldGhvZCB0cmlnZ2VyZWQgd2hlbiB1bmluc3RhbGxpbmcgdGhlIGV4dGVuc2lvblxuICogQHpoIOWNuOi9veaJqeWxleaXtuinpuWPkeeahOaWueazlVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5sb2FkKCkge1xufVxuIl19