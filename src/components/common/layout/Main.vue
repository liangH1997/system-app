<!-- Main -->
<template>
<div class="main">
  <el-container style="height:100%; border: 1px solid #eee; ">
        <Aside></Aside>

        <el-container>
            <el-header text-color="#fff" style="text-align: right; font-size: 12px; background:#21252B;">
                <Header></Header>
            </el-header>
            
            <router-view></router-view>

        </el-container>
    </el-container>
</div>
</template>

<script>
export default {
  components :{
    Aside : ()=>import('@/components/common/layout/Aside.vue'),
    Header : ()=>import('@/components/common/layout/Header.vue')
  },
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style lang='scss' scoped>
.main{
    overflow: hidden;
    height: 100%;
    .el-header {
        color: #333;
        line-height: 60px;
        .icon{
            color: #66B1FF;
            font-size: 18px;
        }
    }
}
</style>