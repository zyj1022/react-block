import { types } from "mobx-state-tree"
import { fetchData } from 'flarej/lib/utils/fetchConfig';
import Notification from '../utils/notification';

export const UserInfo = types.model('UserInfo', {
  pin: types.maybe(types.string),
  name: types.maybe(types.string),
})

export const CommonStore = types.model("CommonStore", {
    userInfo: types.maybe(UserInfo),
    settingPannel: false,
    topBarColorIndex: types.maybe(types.number),
    sideColorIndex: types.maybe(types.number),
    topBarColor: '#222b3c',
    theme: types.maybe(types.string),
  })
  .views(self => {
    return {
      get isDemo() {
        return self.userInfo.pin && self.userInfo.pin.trim().toLowerCase() === 'jd_653e751552511';
      }
    }
  })
  .actions(self => {
    return {
      setSettingPannel(value) {
        self.settingPannel = value
      },
      setTopBarColor(value) {
        self.topBarColorIndex = value;
      },
      setSideColor(value) {
        self.sideColorIndex = value;
      },
      setTheme(value) {
        self.theme = value;
      },
      getCurrentUserInfo() {
        return fetchData(`${__HOST}/common/getCurrentUserInfo`,
          self.setCurrentUserInfo,
          null, { method: 'post' }).catch((ex) => {
          Notification.error({
            description: '获取用户信息异常:' + ex,
            duration: null
          });
        });
      },
      setCurrentUserInfo(result) {
        if (result.success) {
          self.userInfo = result.data;
        } else {
          Notification.error({
            description: '获取用户信息错误:' + result.message,
            duration: null
          });
        }
      }
    }
  });

export const Category = types.model("Category", {
  value: '0',
  label: ''
});

export const Brand = types.model("Category", {
  value: '0',
  label: ''
});
