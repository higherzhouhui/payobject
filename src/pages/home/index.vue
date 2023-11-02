<template>
    <div class="container">
        <HeaderBar />
        <div class="content">
            <LeftBar />
            <div class="index_content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import LeftBar from '@/layer/leftBars.vue'
import HeaderBar from '@/layer/headerBar.vue'
import {getAccountKyc} from '@/api/user'
import { Local } from "@/utils/index";

export default {
    name: 'homeIndex',
    data() {
        return {
        }
    },
    created() {
        // getAccountKyc().then(rt=>{
        //     const userInfo = this.$store.state.userInfo
        //     try {
        //         Object.keys(rt.data).map(key => {
        //             userInfo[key] = rt.data[key]
        //         })
        //         this.$store.commit('SET_USERINFO', userInfo)
        //     } catch {
        //         if(rt.data && rt.data.kyc && rt.data.kyc.kycStatus) {
        //             Local('isSMZ',  true)
        //         }
        //     }
        // })
    },
    components: { LeftBar, HeaderBar },
    methods: {

    }
}
</script>
<style scoped lang="scss">
.container {
    padding: 88px 0 20px 0;
    display: flex;
    min-height: calc(100vh - 108px);
    box-sizing: border-box;
    width: 100%;

    .content {
        width: calc(100% - 220px);
    }

    .index_content {
        margin: 0 0 0 220px;
        box-sizing: border-box;
        padding: 20px;
        background: #fff;
        width: 100%;

    }
}
</style>
