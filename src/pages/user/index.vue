<template>
    <div class="container">
        <router-view></router-view>
        <!-- <footer>{{ $t('footer') }}</footer> -->
    </div>
</template>
<script>
export default {
    name: 'userIndex',
    data() {
        return {

        }
    },
   
}
</script>
<style scoped lang="scss">
.container{
    position: absolute;
    left: 0;
    height: 0;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/user/bg.png');
}
footer{
    padding: 0 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 48px;
    width: 100%;
    text-align: center;
    color: #303133;
    font-size: 14px;
}
</style>
