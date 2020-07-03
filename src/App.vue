<template>
  <div class="app">
    <router-view name="login" v-if="$route.path=='/login'"></router-view>
    <Main v-else></Main>
  </div>
</template>

<script>
    export default {
        components :{
            Main : ()=>import('@/components/common/layout/Main.vue')
        },
        mounted(){
            // console.log(this.$route)
        }
    }
</script>

<style lang='scss'>
body{
  background-color: #F0F2F5;
}

html,body{
    width: 100%;
    height: 100%;
}
.app{
    width: 100%;
    height: 100%;
}
html,body,ul,li,ol,dl,dd,dt,p,h1,h2,h3,h4,h5,h6,form,fieldset,legend,img,input{
    margin:0;
    padding:0;
}
h1,h2,h3,h4,h5,h6{
    font-size:16px;
    font-weight: normal;
}
ul,ol,li{
    list-style:none;
}
a,u{
    text-decoration: none;
}
b,strong{
    font-weight: normal;
}
em,i{
    font-style:normal;
}
img{
    border:0;
    display:block;
    /*清除图片下面的大于3px的间距*/
}
input{
    outline:none;
}
.clear_fix:after{
    content:".";
    clear:both;
    display:block;
    height:0;
    overflow:hidden;
    visibility: hidden;
}
.clear_fix{
    zoom:1;
}
</style>
