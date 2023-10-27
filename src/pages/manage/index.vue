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
import LeftBar from '@/layer/leftBarsManage.vue'
import HeaderBar from '@/layer/headerBarManage.vue'
export default {
    name: 'manageIndex',
    data() {
        return {
        }
    },
    components: { LeftBar, HeaderBar },
    methods: {

    }
}
</script>
<style scoped lang="scss">
.container {
    padding: 184px 0;
    display: flex;
    min-height: calc(100vh - 184px);
    box-sizing: border-box;
    width: 100%;

    .content {
        width: calc(100% - 280px);
    }

    .index_content {
        margin: 0 0 0 280px;
        box-sizing: border-box;
        padding: 22px;
        background: #fff;
        width: 100%;

    }
}
</style>
