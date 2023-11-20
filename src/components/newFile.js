/* __placeholder__ */
export default (await import('vue')).defineComponent({
name: 'NormalFooter',
props: {
msg: String
},
data() {
return {
links: [
{ name: '首页', url: '/index' },
{ name: '关于我们', url: '/about' },
{ name: '登录', url: '/user/login' },
{ name: '新闻', url: '/blog' },
{ name: '注册', url: '/user/register' },
{ name: '隐私&政策', url: '/privacy' },
],
},
        ;
},
methods: {
to(path) {
this.$router.push(path);
}
},
});
