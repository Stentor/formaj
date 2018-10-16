<template>
    <form :action="action" :method="method">
        <slot></slot>
    </form>
</template>

<script>
export default {
    props: {
        method: {type: String, default: 'post'},
        action: {type: String, default: ''}
    },
    data(){
        return {
            
        }
    }
}
</script>

<style>

</style>
