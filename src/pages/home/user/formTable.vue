<template>
    <div>
        <FormOne/>
        <FormTwo class="mt30"/>
    </div>
</template>
<script>
import FormOne from './tables/form1.vue'
import FormTwo from './tables/form2.vue'
export default {
    name: "formTable",
    components: {FormOne, FormTwo}
}
</script>

