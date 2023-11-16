import { countries } from '@/api/login'
import { Local } from '@/utils/index'
export const getFlagIcon = (coinCode) => {
    let icon = ''
    const getIcon = (thelist) => {
        const mlist = thelist.filter(item => { return item.coinCode == coinCode || item.name === coinCode || item.enName == coinCode})
        if (mlist.length) {
            icon += 'flag-icon-' + mlist[0].code.toLocaleLowerCase()
        }
    }
    try {
      let list = Local("areaList");
      if (list && list.length) {
         getIcon(list)
         return icon
      }
      countries().then(res => {
        list = res.data;
        Local("areaList", res.data);
        getIcon(list)
        return icon
      });
    } catch (error) {
        console.log(error)
        return ''
    }
  }