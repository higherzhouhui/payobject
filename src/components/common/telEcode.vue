<template>
    <div class="code_time baseColor" :class="!timer && 'pointer'" @click="djs">
        {{ timer ? (times + 's') : $t('sendyzm') }}
    </div>
</template>
<script>
export default {
    props: {
        time: {
            default: 60
        },
        txt: {
            default: 'sendyzm'
        } 
    },
    data() {
        return {
            times: 60,
            timer: null
        }
    },
    created() {
        this.times = this.time
    },
    methods: {
        djs() {
            if(this.timer) return
            this.times--
            this.timer = setInterval(()=>{
                this.times--;
                if(this.times == 0) {
                    this.clearTime()
                    this.times = this.time
                }
            }, 1000)
        },
        clearTime() {
            clearInterval(this.timer)
            this.timer = null
         }
    },
    beforeDestroy() {
        this.clearTime()
    }
}
</script>