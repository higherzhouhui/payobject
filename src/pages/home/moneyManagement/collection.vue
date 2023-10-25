<template>
    <div class="user_moneymanagement_collection_contianer">
        <LinkPath :linkList="linkList" />
        <Trans/>
    </div>
</template>
<script>
import LinkPath from '@/components/common/linkPath.vue'
import Trans from './trans.vue'
export default {
    name: 'userMoneyManagementCollection',
    components: { LinkPath, Trans },
    computed: {
        userInfo() {
            return this.$store.state.user.userInfo
        }
    },
    data() {
        return {
            tableData: [],
            options: [],
            type: '1',
            dialogVisible2: false,
            linkList: ['zjgl', 'chongzhi'],
            form: {
                name: ''
            }
        }
    },
    methods: {
        handleClick() {

        }
    }
}
</script>
<style scoped lang="scss">
.user_moneymanagement_collection_contianer {
    .content {
        margin-top: 40px;
        padding: 24px;
        border-radius: 4px;
        border: 1px solid var(--unnamed, #DCDFE6);
        background: #FFF;
        box-shadow: 0px 0px 10px 0px rgba(52, 118, 255, 0.25);
    }
}
</style>
