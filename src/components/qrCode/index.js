import index from './index.vue'
// This is the point
const QRcode = {
    install: function(Vue){
        Vue.component('QRcode',index);
    }
}
// Export components
export default QRcode