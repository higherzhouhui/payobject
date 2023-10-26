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
import { Locol } from "@/utils/index";

export default {
    name: 'homeIndex',
    data() {
        return {
        }
    },
    created() {
        getAccountKyc().then(rt=>{
            Locol('accountKyc', rt.data)
            if(rt.data && rt.data.kyc && rt.data.kyc.kycStatus) {
                Locol('isSMZ',  true)
            }
        })
    },
    components: { LeftBar, HeaderBar },
    methods: {

    }
}
</script>
<style scoped lang="scss">
.container {
    padding: 88px 0;
    display: flex;
    min-height: calc(100vh - 88px);
    box-sizing: border-box;
    width: 100%;

    .content {
        width: calc(100% - 280px);
    }

    .index_content {
        margin: 0 0 0 280px;
        box-sizing: border-box;
        padding: 40px;
        background: #fff;
        width: 100%;

    }
}
</style>
