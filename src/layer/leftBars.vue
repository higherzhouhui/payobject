<template>
    <div class="el-menu-vertical-demo">
        <div class="logo">
            <img alt="logo" class="logoImg" src="@/assets/images/index/logo.png" @click="routerTo('/index')" />
            <img alt="menu" class="menuImg" src="@/assets/images/home/menu.png" @click="toggleMenuShow"/>
        </div>
        <el-menu @select="select" :class="showMenu ? 'showMenu' : 'hideMenu'" :default-active="path" v-if="$store.state.userInfo.admin">
            <el-menu-item index="/manage/index">
                <!-- <img class="icon" src="@/assets/images/home/home.png" alt=""> -->
                <svg-icon iconClass="house-solid" className="icon-svg" />
                <span slot="title">{{ $t('kztai') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/kyc">
                <!-- <img class="icon" src="@/assets/images/home/grzx.png" alt=""> -->
                <svg-icon iconClass="address-card-regular" className="icon-svg" />
                <span slot="title">{{ $t('shgl') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/deposit">
                <!-- <img class="icon" src="@/assets/images/home/hk_icon.png" alt=""> -->
                <svg-icon iconClass="coins-solid" className="icon-svg" />
                <span slot="title">{{ $t('rjlist') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/withdraw">
                <!-- <img class="icon" src="@/assets/images/home/txzhgl_icon.png" alt=""> -->
                <svg-icon iconClass="sack-dollar-solid" className="icon-svg" />
                <span slot="title">{{ $t('cjlist') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/convert">
                <!-- <img class="icon" src="@/assets/images/home/hk_icon.png" alt=""> -->
                <svg-icon iconClass="circle-dollar-to-slot-solid" className="icon-svg" />
                <span slot="title">{{ $t('duihuanls') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/bill">
                <!-- <img class="icon" src="@/assets/images/home/jymx_icon.png" alt=""> -->
                <svg-icon iconClass="clipboard-list-solid" className="icon-svg" />
                <span slot="title">{{ $t('jymx') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/exchange">
                <!-- <img class="icon" src="@/assets/images/manage/hlgl.png" alt=""> -->
                <svg-icon iconClass="percent-solid" className="icon-svg" />
                <span slot="title">{{ $t('skzhhl') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/blog">
                <!-- <img class="icon" src="@/assets/images/home/zz_icon.png" alt=""> -->
                <svg-icon iconClass="rectangle-ad-solid" className="icon-svg" />
                <span slot="title">{{ $t('newslist') }}</span>
            </el-menu-item>
        </el-menu>
        <el-menu @select="select" :default-active="path" :class="showMenu ? 'showMenu' : 'hideMenu'" v-if="!$store.state.userInfo.admin && $store.state.userInfo.userStatus">
            <el-menu-item index="/admin/dashboard">
                <!-- <img class="icon" src="@/assets/images/home/home.png" alt=""> -->
                <svg-icon iconClass="house-solid" className="icon-svg" />
                <span slot="title">{{ $t('kztai') }}</span> 
            </el-menu-item>
            <el-submenu index="31">
                <template slot="title">
                    <!-- <img class="icon" src="@/assets/images/home/zjgl.png" alt="zjgl"> -->
                    <svg-icon iconClass="coins-solid" className="icon-svg" />
                    <span slot="title">{{ $t('zjgl') }}</span>
                </template>
                <el-menu-item index="/admin/deposit/index">
                    <!-- <img class="icon" src="@/assets/images/home/sk_icon.png" alt=""> -->
                    <svg-icon iconClass="bolt-solid" className="icon-svg" />
                    <span slot="title">{{ $t('chongzhi') }}</span>
                </el-menu-item>
                <el-menu-item index="/admin/deposit/list">
                    <!-- <img class="icon" src="@/assets/images/home/hk_icon.png" alt=""> -->
                    <svg-icon iconClass="file-invoice-dollar-solid" className="icon-svg" />
                    <span slot="title">{{ $t('hh') }}</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="/admin/withdraw/index">
                <template slot="title">
                    <!-- <img class="icon" src="@/assets/images/home/txgl.png" alt=""> -->
                    <svg-icon iconClass="paper-plane-solid" className="icon-svg" />
                    <span slot="title">{{ $t('txgl') }}</span>
                </template>
                <el-menu-item index="/admin/withdraw/index">
                    <!-- <img class="icon" src="@/assets/images/home/tx_icon.png" alt=""> -->
                    <svg-icon iconClass="money-bill-transfer-solid" className="icon-svg" />
                    <span slot="title">{{ $t('tx') }}</span>
                </el-menu-item>
                <el-menu-item index="/admin/withdraw/list">
                    <!-- <img class="icon" src="@/assets/images/home/txzhgl_icon.png" alt=""> -->
                    <svg-icon iconClass="money-check-dollar-solid" className="icon-svg" />
                    <span slot="title">{{ $t('txzhgl') }}</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="/admin/convert/index">
                <template slot="title">
                    <!-- <img class="icon" src="@/assets/images/home/txgl.png" alt=""> -->
                    <svg-icon iconClass="circle-dollar-to-slot-solid" className="icon-svg" />
                    <span slot="title">{{ $t('dhgl') }}</span>
                </template>
                <el-menu-item index="/admin/convert/index">
                    <!-- <img class="icon" src="@/assets/images/home/tx_icon.png" alt=""> -->
                    <svg-icon iconClass="arrow-right-arrow-left-solid" className="icon-svg" />
                    <span slot="title">{{ $t('duihuan') }}</span>
                </el-menu-item>
                <el-menu-item index="/admin/convert/list">
                    <!-- <img class="icon" src="@/assets/images/home/txzhgl_icon.png" alt=""> -->
                    <svg-icon iconClass="list-solid" className="icon-svg" />
                    <span slot="title">{{ $t('duihuanls') }}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/record/exchangelist">
                <!-- <img class="icon" src="@/assets/images/home/zjmx_icon.png" alt=""> -->
                <svg-icon iconClass="clipboard-list-solid" className="icon-svg" />
                <span slot="title">{{ $t('jyjl') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/exchange/list">
                <!-- <img class="icon" src="@/assets/images/home/zzzhgl.png" alt=""> -->
                <svg-icon iconClass="building" className="icon-svg" />
                <span slot="title">{{ $t('yhkgl') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/address/list">
                <!-- <img class="icon" src="@/assets/images/home/zzzhgl.png" alt=""> -->
                <svg-icon iconClass="bitcoin" className="icon-svg" />
                <span slot="title">{{ $t('addressMange') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/kycverification">
                <!-- <img class="icon" src="@/assets/images/home/grzx.png" alt=""> -->
                <svg-icon iconClass="user-check-solid" className="icon-svg" />
                <span slot="title">{{ $t('kycyz') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/referfriends">
                <!-- <img class="icon" src="@/assets/images/home/jycx.png" alt=""> -->
                <svg-icon iconClass="user-group-solid" className="icon-svg" />
                <span slot="title">{{ $t('tjgpy') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/safe">
                <svg-icon iconClass="gear-solid" className="icon-svg" />
                <span slot="title">{{ $t('safe') }}</span>
            </el-menu-item>
        </el-menu>
        <el-menu @select="select" :default-active="path" :class="showMenu ? 'showMenu' : 'hideMenu'" v-if="!$store.state.userInfo.admin && !$store.state.userInfo.userStatus">
            <el-menu-item index="/admin/kycverification">
                <!-- <img class="icon" src="@/assets/images/home/grzx.png" alt=""> -->
                <svg-icon iconClass="user-check-solid" className="icon-svg" />
                <span slot="title">{{ $t('kycyz') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/safe">
                <svg-icon iconClass="gear-solid" className="icon-svg" />
                <span slot="title">{{ $t('safe') }}</span>
            </el-menu-item>
        </el-menu>
        <div class="footer">
            <a href="https://www.facebook.com/profile.php?id=61552592069646" target="_blank">
                <svg-icon iconClass="facebook" className="footer-icon" />
              </a>
             <a href="https://twitter.com/PayReliance" target="_blank">
              <svg-icon iconClass="twitter" className="footer-icon" />
             </a>
             <a href="https://www.instagram.com/payreliance/" target="_blank">
              <svg-icon iconClass="instagram" className="footer-icon" />
             </a>
        </div>
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
            showMenu: false,
        }
    },
    methods: {
        select(path) {
            if (this.path == path) {
                console.log(this.path, path)
                return
            }
            this.$router.push(path)
            this.showMenu = false
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
            max-height: auto!important;
            animation: none!important;  
        }
        .hideMenu {
            max-height: auto!important;
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
        animation: expand 0.5s ease-in-out forwards;  
    }
    .hideMenu {
        animation: expandscale 0.5s ease-in-out forwards;  
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
        border-right: none;
        height: calc(100vh - 112px);
        overflow-y: auto;
        @media screen and (max-width: 800px) {
            position: absolute;
            height: auto;
            overflow-y: hidden;
            width: 100%;
        }
    }
    .icon {
        margin-right: 8px;
        width: 18px;
        height: 18px;
    }
    .icon-svg {
        font-size: 16px;
        margin-right: 8px;
        color: #9c9797;
        min-width: 16px;
    }
    .footer {
        height: 50px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        @media screen and (max-width: 800px) {
            display: none;
        }
        .footer-icon {
            font-size: 25px;
            color: #fff;
            &:hover {
                color: $baseColor;
            }
        }
    }
}
::v-deep .el-submenu__title:hover {
    background: #20304c;
    color: #fff;
}
</style>