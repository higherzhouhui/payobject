<template>
    <div class="link_path_container">
        <div class="flex flex_align_center flex_jc_sb">
            <div class="flex flex_align_center">
                <span v-if="showHome" class="pointer" @click="toHome">{{ $t('home') }}</span>
                <div v-for="(item, index) in linkList" :key="index" class="flex flex_align_center">
                    <img v-if="showHome" src="@/assets/images/home/user/xiegang.png" alt="">
                    <span>{{ $t(item) }}</span>
                    <img v-if="!showHome && (index != (linkList.length - 1))" src="@/assets/images/home/user/xiegang.png" alt="">
                </div>
            </div>
            <div>
                <slot name="right"></slot>
            </div>
           
        </div>
       
    </div>
</template>
<script>

export default {
    name: 'linkPath',
    props: {
        linkList: {
            default: []
        },
        showHome: {
            default: true
        }
    },
    data() {
        return {}
    },
    methods: {
        toHome() {
            this.$router.push('/home/index')
        }
    },
}
</script>
<style lang="scss" scoped>
.link_path_container {
    position: relative;
    padding: 12px 22px;
    color: #606266;
    font-size: 14px;
    background: #F4F4F4;
    border-radius: 4px;
    .flex{
        // width: 100%;
    }
    span {
     font-weight: bold;   
    }
    img {
        margin: 0 8px;
        width: 16px;
        height: 16px;
    }
}
</style>
