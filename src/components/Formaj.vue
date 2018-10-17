<template>
    <div class="formaj">
        <transition :name="transition">
            <form class="form" v-if="!isSending && !isSubmitted" :action="action" :method="method" @submit.prevent="doSubmit">
                <slot></slot>
            </form>
        </transition>
        <transition :name="transition">
            <div class="loader" v-if="isSending">
                <slot name="loader">
                    <h2>Please wait</h2>
                </slot>
            </div>
        </transition>
        <transition :name="transition">
            <div v-if="!isSending && isSubmitted"  class="response">
                <slot name="response">
                    <div v-html="response.data"></div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        method: {type: String, default: 'post'},
        action: {type: String, default: ''},
        transition: {type: String, default:'formaj'}
    },
    data(){
        return {
            isSending: false,
            isSubmitted: false,
            isError: false,
            response: ''
        }
    },
    methods: {
        async doSubmit(e){
            let formData = new FormData(e.target)
            this.isSending=true
            let res=await axios.post(this.action, formData)
            this.response=res
            this.isSubmitted=true
            this.isSending=false
            setTimeout(()=>this.isSubmitted=false, 2000)
        }
    }
}
</script>

<style lang="scss">
.formaj {
    position: relative;
    .form, .loader, .response{
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    }

.formaj-enter-active, .formaj-leave-active {
  transform: translate(0);
  opacity: 1;
  transition: all .5s;
}
.formaj-enter, .formaj-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(100px);
  opacity: 0
}
</style>
