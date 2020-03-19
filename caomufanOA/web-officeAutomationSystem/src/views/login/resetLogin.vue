<template>
  <div></div>
</template>

<script>
    export default {
        name: "resetLogin",
        mounted(){
            this.getQuery()

        },
        methods:{
            getQuery(){
                console.log(this.$route.query)
                this.sendLoginCode(this.$route.query)
            },
            // 发送给父页面
            sendLoginCode(code) {
                // alert(code.toString())
                window.parent.postMessage({
                    type: "sendCode",
                    data: code
                }, '*');
            },
        }
    }
</script>

<style scoped>

</style>
