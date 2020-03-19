<template>

</template>

<script>
    export default {
        name: "resetGo",
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
