<template>
    <div class="container">
        <div class="content">
            <LeftBar />
            <HeaderBar />
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
      
    },
    components: { LeftBar, HeaderBar },
    methods: {

    }
}
</script>
<style scoped lang="scss">
.container {
    padding: $adminHeaderHeight 0 0 0;
    display: flex;
    min-height: calc(100vh - 108px);
    width: 100%;
    @media screen and (max-width: 800px) {
        padding: 0;
        .content {
            width: 100%!important;
        }
        .index_content {
            margin: 0!important;
            min-height: calc(100vh - 124px)!important;
            padding: 1.5rem 6px!important;
        }
    }
    .content {
        width: calc(100% - $leftSideWidth);
    }

    .index_content {
        margin: 0 0 0 $leftSideWidth;
        padding: 1.5rem;
        background: $bgColor;
        width: 100%;
        min-height: calc(100vh - $adminHeaderHeight);
    }
}
</style>
