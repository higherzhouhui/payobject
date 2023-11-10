<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'HomeIndex',
    data() {
        return {

        }
    },
   
}
</script>
<style scoped lang="scss">
.container{
    min-height: calc(100vh - 321px);
    margin-top: 88px;
    width: 100%;
    padding: 5rem 0;
    background: #384d78;
    color: #fff;
}
</style>
