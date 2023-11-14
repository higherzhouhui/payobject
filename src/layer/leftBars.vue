<template>
    <div class="el-menu-vertical-demo">
        <div class="logo">
            <img alt="logo" class="logoImg" src="@/assets/images/index/logo.png" @click="routerTo('/index')" />
            <img alt="menu" class="menuImg" src="@/assets/images/home/menu.png" @click="toggleMenuShow"/>
        </div>

        <el-menu @select="select" :class="showMenu ? 'showMenu' : 'hideMenu'" :default-active="path" v-if="$store.state.userInfo.admin">
            <el-menu-item index="/manage/index">
                <img class="icon" src="@/assets/images/home/home.png" alt="">
                <span slot="title">{{ $t('home') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/kfc">
                <img class="icon" src="@/assets/images/manage/shgl.png" alt="">
                <span slot="title">{{ $t('shgl') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/deposit">
                <img class="icon" src="@/assets/images/manage/ddgl.png" alt="">
                <span slot="title">{{ $t('入金列表') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/withdraw">
                <img class="icon" src="@/assets/images/manage/ddgl.png" alt="">
                <span slot="title">{{ $t('出金列表') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/bill">
                <img class="icon" src="@/assets/images/manage/ddgl.png" alt="">
                <span slot="title">{{ $t('交易明细') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/change">
                <img class="icon" src="@/assets/images/manage/ddgl.png" alt="">
                <span slot="title">{{ $t('兑换明细') }}</span>
            </el-menu-item>
            <!-- <el-menu-item index="/manage/transactionDetails">
                <img class="icon" src="@/assets/images/manage/ddgl.png" alt="">
                <span slot="title">{{ $t('ddgl') }}</span>
            </el-menu-item> -->
            <el-menu-item index="/manage/exchange">
                <img class="icon" src="@/assets/images/manage/hlgl.png" alt="">
                <span slot="title">{{ $t('hlgl') }}</span>
            </el-menu-item>
        </el-menu>

        <el-menu @select="select" :default-active="path" :class="showMenu ? 'showMenu' : 'hideMenu'" v-else>
            <el-menu-item index="/admin/dashboard">
                <img class="icon" src="@/assets/images/home/home.png" alt="">
                <span slot="title">{{ $t('home') }}</span>
            </el-menu-item>
            <el-submenu index="31">
                <template slot="title">
                    <img class="icon" src="@/assets/images/home/zjgl.png" alt="zjgl">
                    <span slot="title">{{ $t('zjgl') }}</span>
                </template>
                <el-menu-item index="/admin/deposit/index">
                    <img class="icon" src="@/assets/images/home/sk_icon.png" alt="">
                    <span slot="title">{{ $t('chongzhi') }}</span>
                </el-menu-item>
                <el-menu-item index="/admin/deposit/list">
                    <img class="icon" src="@/assets/images/home/hk_icon.png" alt="">
                    <span slot="title">{{ $t('hh') }}</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <img class="icon" src="@/assets/images/home/txgl.png" alt="">
                    <span slot="title">{{ $t('txgl') }}</span>
                </template>
                <el-menu-item index="/admin/withdraw/index">
                    <img class="icon" src="@/assets/images/home/tx_icon.png" alt="">
                    <span slot="title">{{ $t('tx') }}</span>
                </el-menu-item>
                <el-menu-item index="/admin/withdraw/list">
                    <img class="icon" src="@/assets/images/home/txzhgl_icon.png" alt="">
                    <span slot="title">{{ $t('txzhgl') }}</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <img class="icon" src="@/assets/images/home/zzgl.png" alt="">
                    <span slot="title">{{ $t('zzgl') }}</span>
                </template>
                <el-menu-item index="/admin/exchange/index">
                    <img class="icon" src="@/assets/images/home/zz_icon.png" alt="">
                    <span slot="title">{{ $t('zz') }}</span>
                </el-menu-item>
                <el-menu-item index="/admin/exchange/list">
                    <img class="icon" src="@/assets/images/home/zzzhgl.png" alt="">
                    <span slot="title">{{ $t('zzzhgl') }}</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <img class="icon" src="@/assets/images/home/aqsz_icon.png" alt="">
                    <span slot="title">{{ $t('jycx') }}</span>
                </template>
                <el-menu-item index="/admin/record/transactionlist">
                    <img class="icon" src="@/assets/images/home/jymx_icon.png" alt="">
                    <span slot="title">{{ $t('jymx') }}</span>
                </el-menu-item>
                <el-menu-item index="/admin/record/exchangelist">
                    <img class="icon" src="@/assets/images/home/zjmx_icon.png" alt="">
                    <span slot="title">{{ $t('zjmx') }}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/kycverification">
                <img class="icon" src="@/assets/images/home/grzx.png" alt="">
                <span slot="title">{{ $t('KYC认证') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/referfriends">
                <img class="icon" src="@/assets/images/home/jycx.png" alt="">
                <span slot="title">{{ $t('推荐好友') }}</span>
            </el-menu-item>
            <!-- <el-menu-item index="/home/account">
                <img class="icon" src="@/assets/images/home/zhanghu.png" alt="">
                <span slot="title">{{ $t('myaccount') }}</span>
            </el-menu-item>
            <el-submenu index="7">
                <template slot="title">
                    <img class="icon" src="@/assets/images/home/grzx.png" alt="">
                    <span slot="title">{{ $t('grzx') }}</span>
                </template>
                <el-menu-item index="/home/user">
                    <img class="icon" src="@/assets/images/home/aqsz_icon.png" alt="">
                    <span slot="title">{{ $t('aqsz') }}</span>
                </el-menu-item>
            </el-submenu> -->
        </el-menu>

    </div>
</template>
<script>
export default {
    name: "leftBar",
    computed: {
        path() {
            return this.$store.state.path
        }
    },
    data() {
        return {
            showMenu: true,
        }
    },
    methods: {
        select(path) {
            console.log(path)
            if (this.path == path) return
            this.$router.push(path)
        },
        toggleMenuShow() {
            this.showMenu = !this.showMenu
        },
        routerTo(path) {
            this.$router.push(path)
        }
    }
}
</script>
<style scoped lang="scss">
.el-menu-vertical-demo {
    position: fixed;
    height: 100vh;
    width: $leftSideWidth;
    background: #20304c;
    z-index: 1001;
    top: 0;
    @media screen and (max-width: 800px) {
        width: 100vw;
        position: relative;
        height: auto;
        .logo {
            padding: 0 1rem;
            justify-content: space-between!important;
            .menuImg {
                display: block!important;
            }
        }
    }
    @media screen and (min-width: 800px) {
        .showMenu {
            height: auto!important;
            animation: none!important;  
        }
        .hideMenu {
            height: auto!important;
            animation: none!important;
        }
    }
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 62px;
        border-bottom: 1px solid #8b8a8a;

    }
    @keyframes expand {  
        0% {  
            max-height: 0;  
        } 
        100% {  
            max-height: 1000px;  
        }  
    }
    @keyframes expandscale {  
        0% {  
            max-height: 1000px;  
        }  
        100% {  
            max-height: 0;  
        }  
    }
    .showMenu {
        animation: expand 1s ease-in-out forwards;  
    }
    .hideMenu {
        animation: expandscale 1s ease-in-out forwards;  
    }
    .logoImg {
        height: 40px;
        object-fit: contain;
        cursor: pointer;
    }
    .menuImg {
        width: 30px;
        object-fit: contain;
        cursor: pointer;
        display: none;
    }
    .el-menu {
        background: #20304c;
        overflow: hidden;
    }
    .icon {
        margin-right: 8px;
        width: 18px;
        height: 18px;
    }

}
::v-deep .el-submenu__title:hover {
    background: #20304c;
    color: #fff;
}
</style>