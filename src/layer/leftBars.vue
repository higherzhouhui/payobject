<template>
    <el-menu @select="select" class="el-menu-vertical-demo" :default-active="path">
        <el-menu-item index="/home/index">
            <img class="icon" src="@/assets/images/home/home.png" alt="">
            <span slot="title">{{ $t('home') }}</span>
        </el-menu-item>
        <el-menu-item index="/home/account">
            <img class="icon" src="@/assets/images/home/zhanghu.png" alt="">
            <span slot="title">{{ $t('myaccount') }}</span>
        </el-menu-item>
        <el-submenu index="3">
            <template slot="title">
                <img class="icon" src="@/assets/images/home/zjgl.png" alt="">
                <span slot="title">{{ $t('zjgl') }}</span>
            </template>
            <el-menu-item index="/home/collection">
                <img class="icon" src="@/assets/images/home/sk_icon.png" alt="">
                <span slot="title">{{ $t('chongzhi') }}</span>
            </el-menu-item>
            <el-menu-item index="/home/transfer">
                <img class="icon" src="@/assets/images/home/hk_icon.png" alt="">
                <span slot="title">{{ $t('hh') }}</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <img class="icon" src="@/assets/images/home/txgl.png" alt="">
                <span slot="title">{{ $t('txgl') }}</span>
            </template>
            <el-menu-item index="/home/withdraw">
                <img class="icon" src="@/assets/images/home/tx_icon.png" alt="">
                <span slot="title">{{ $t('tx') }}</span>
            </el-menu-item>
            <el-menu-item index="/home/withdrawAccountManage">
                <img class="icon" src="@/assets/images/home/txzhgl_icon.png" alt="">
                <span slot="title">{{ $t('txzhgl') }}</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">
                <img class="icon" src="@/assets/images/home/zzgl.png" alt="">
                <span slot="title">{{ $t('zzgl') }}</span>
            </template>
            <el-menu-item index="/home/transfers">
                <img class="icon" src="@/assets/images/home/zz_icon.png" alt="">
                <span slot="title">{{ $t('zz') }}</span>
            </el-menu-item>
            <el-menu-item index="/home/transferAccountManagement">
                <img class="icon" src="@/assets/images/home/zzzhgl.png" alt="">
                <span slot="title">{{ $t('zzzhgl') }}</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="6">
            <template slot="title">
                <img class="icon" src="@/assets/images/home/jycx.png" alt="">
                <span slot="title">{{ $t('jycx') }}</span>
            </template>
            <el-menu-item index="/home/transactionDetails">
                <img class="icon" src="@/assets/images/home/jymx_icon.png" alt="">
                <span slot="title">{{ $t('jymx') }}</span>
            </el-menu-item>
            <el-menu-item index="/home/fundingDetails">
                <img class="icon" src="@/assets/images/home/zjmx_icon.png" alt="">
                <span slot="title">{{ $t('zjmx') }}</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="7">
            <template slot="title">
                <img class="icon" src="@/assets/images/home/grzx.png" alt="">
                <span slot="title">{{ $t('grzx') }}</span>
            </template>
            <el-menu-item index="/home/user">
                <img class="icon" src="@/assets/images/home/aqsz_icon.png" alt="">
                <span slot="title">{{ $t('aqsz') }}</span>
            </el-menu-item>
        </el-submenu>



    </el-menu>
</template>
<script>
export default {
    name: "leftBar",
    computed: {
        path() {
            return this.$store.state.path
        }
    },
    methods: {
        select(path) {
            console.log(path)
            if (this.path == path) return
            this.$router.push(path)
        }
    }
}
</script>
<style scoped lang="scss">
    .el-menu-vertical-demo {
    position: fixed;
    height: calc(100vh - 88px);
    padding: 16px 0;
    box-sizing: border-box;
    width: 280px;
    overflow-y: auto;
    background: #F2F6FF;
    border-right: unset;

    .icon {
        margin-right: 8px;
        width: 18px;
        height: 18px;
    }

}
</style>