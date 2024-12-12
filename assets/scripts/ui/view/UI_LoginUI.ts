import { _decorator } from "cc";
import { BaseUI } from "../../framework/base/BaseUI";
import { EViewName, IViewData } from "../../framework/manager/UIManager";

const { ccclass, menu, property } = _decorator;

//快速修复错误，会在EViewName中添加对应的UI枚举
const VIEW_DATA: IViewData = {
  viewName: EViewName.UI_LoginUI,
  resDirs: ["Prefab/UI/LoginUI"],
  prefabUrl: "Prefab/UI/LoginUI", // ui界面prefab的位置
};

@ccclass("UI_LoginUI")
@menu("UIScript//UI_LoginUI")
export default class UI_LoginUI extends BaseUI {

	//初始化UI
	public async initUI(data: Record<string, unknown>) {
			
	}

	//界面显示开始
	protected onOpenStart() {
			
	}

	//界面显示完成
	protected onOpenEnd() {
			
	}

	//界面关闭开始
	protected onCloseStart() {
			
	}

	//界面关闭完成
	protected onCloseEnd() {
			
	}

  public getViewData(): IViewData {
    return VIEW_DATA;
  }
}

// 必须注册UI 加载必要资源使用
GFM.UIMgr.registUI(VIEW_DATA, UI_LoginUI);