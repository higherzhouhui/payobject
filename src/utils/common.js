import { countries } from '@/api/login'
import { Local } from '@/utils/index'

export const getFlagIcon = (coinCode, areaList) => {
    let icon = ''
    const thelist = Local("areaList") || areaList || []
    const mlist = thelist.filter(item => { return item.coinCode == coinCode || item.name === coinCode || item.enName == coinCode})
    if (mlist.length) {
        icon += 'flag-icon-' + mlist[0].code.toLocaleLowerCase()
    }
    return icon
  }

  export const getCountryName = (code) => {
    let icon = code
    const lang = Local('lang')
    const getName = (thelist) => {
        const mlist = thelist.filter(item => { return item.coinCode == code || item.areaCode == code || item.code == code})
        if (mlist.length) {
            if (lang == 'en') {
              icon = mlist[0].enName
            } else {
              icon = mlist[0].name
            }
        }
    }
    try {
      let list = Local("areaList");
      if (list && list.length) {
         getName(list)
         return `${icon}(${code})`
      }
      countries().then(res => {
        list = res.data;
        Local("areaList", res.data);
        getName(list)
        return `${icon}(${code})`
      });
    } catch (error) {
        console.log(error)
        return ''
    }
  }

  export const pjDownUrl = (url) => {
    if (url) {
      return `/api/file/downLoad?url=${url}`
    }
    return ''
  }