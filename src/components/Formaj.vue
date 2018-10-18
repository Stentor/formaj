<template>
    <div class="formaj">
        <transition v-bind="transitionAttrs">
            <form class="form" v-if="!isSending && !isSubmitted" :action="action" :method="method" @submit.prevent="doSubmit">
                <slot></slot>
            </form>
        </transition>
        <transition v-bind="transitionAttrs">
            <div class="loader" v-if="isSending">
                <slot name="loader">
                    <h2>Please wait</h2>
                </slot>
            </div>
        </transition>
        <transition v-bind="transitionAttrs">
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
    inheritAttrs: false,
    props: {
        method: {type: String, default: 'post'},
        action: {type: String, default: ''}
    },
    data(){
        return {
            isSending: false,
            isSubmitted: false,
            isError: false,
            response: ''
        }
    },
    computed: {
         transitionAttrs(){
            const allowed= [
                'transition',
                'enter-class',
                'enter-active-class',
                'enter-to-class',
                'leave-class',
                'leave-active-class',
                'leave-to-class'
            ]

            let filtered = Object.keys(this.$attrs)
                .filter(key => allowed.includes(key))
                .reduce((obj, key) => {
                    if(key=='transition'){
                        obj['name'] = this.$attrs[key]
                    }
                    else {
                        obj[key] = this.$attrs[key]
                    }
                    return obj
                }, {})

            if(!filtered.name)
            {
                filtered={ name: "formaj" }
            }
            return filtered
        }
    },
    methods: {
        doSubmit(e){
            let formData = new FormData(e.target)
            this.isSending=true
            axios.post(this.action, formData)
                .then(res => {
                    this.response=res
                    this.isSubmitted=true
                    this.isSending=false
                    setTimeout(()=>this.isSubmitted=false, 2000)
                })
        }
    },
    mounted(){
        console.log(this.transitionAttrs)
    }
}
</script>

<style scoped>
.formaj {
    position: relative;
}

.formaj .loader, .formaj .response {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.formaj-enter-active, .formaj-leave-active {
  transform: translate(0);
  opacity: 1;
  transition: all .5s;
}

.formaj-enter, .formaj-leave-to {
  transform: translate(100px);
  opacity: 0
}
</style>
