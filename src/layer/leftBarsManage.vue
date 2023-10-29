<template>
    <div class="left_bar_container">
        <div class="top_info flex flex_align_center">
            <img class="avatar pointer" src="@/assets/images/home/user.png" alt="">
            <div>
                <div class="name">{{Local('userInfo').username}}</div>
                <div class="des">管理员</div>
            </div>

        </div>
        <el-menu @select="select" class="el-menu-vertical-demo" :default-active="path">
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
            <el-menu-item index="/manage/transactionDetails">
                <img class="icon" src="@/assets/images/manage/ddgl.png" alt="">
                <span slot="title">{{ $t('ddgl') }}</span>
            </el-menu-item>
            <el-menu-item index="/manage/exchange">
                <img class="icon" src="@/assets/images/manage/hlgl.png" alt="">
                <span slot="title">{{ $t('hlgl') }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import { Local } from "@/utils/index"
export default {
    name: "leftBarManage",
    data() {
        return {
            Local: Local
        }
    },
    computed: {
        path() {
            return this.$store.state.user.path
        }
    },
    methods: {
        select(path) {
            console.log(path)
            if (this.path == path) return
            console.log(this.path, '---', path)
            this.$router.push(path)
        }
    }
}
</script>
<style scoped lang="scss">
.left_bar_container {
    position: fixed;
    height: calc(100vh - 88px);
    z-index: 990;
    box-shadow: 4px 4px 10px 0px rgba(52, 118, 255, 0.25);

    background: #fff;
    border-radius: 0 20px 0 0;
    top: 88px;

    .top_info {
        padding: 52px 12px 36px;
        height: 136px;
        box-sizing: border-box;

        .avatar {
            margin-right: 8px;
            width: 48px;
            height: 48px;
        }

        .name {
            font-size: 16px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #303133;
        }

        .des {
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #909399;
        }
    }
}

.el-menu-vertical-demo {
    height: 100%;
    padding: 16px 0;
    box-sizing: border-box;
    width: 280px;
    overflow-y: auto;
    border-right: unset;

    .icon {
        margin-right: 8px;
        width: 18px;
        height: 18px;
    }

}
</style>