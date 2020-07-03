<!-- aside -->
<template>
<div class="aside">
    <el-aside width="200px" style="background-color: #21252B;">
        <h1><img src="@/img/01.png" alt=""></h1>
        <el-menu 
        :default-openeds="['1','2','3']"
        class="el-menu-vertical-demo"
        background-color="#21252B"
        text-color="#eee"
        active-text-color="#409EFF"
        >
          <el-submenu index="1">
            <template slot="title">
                <router-link to="/1-1" tag="span">
                    <i class="el-icon-notebook-2 icon"></i>概况
                </router-link>
            </template>
            <!-- <template slot="title">分组一</template> -->
            <router-link to="/1-1" tag="span">
                    <el-menu-item index="1-1">首页</el-menu-item>
            </router-link>
            <el-submenu index="1-2">
              <template slot="title">简介</template>
              <el-menu-item index="1-2-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-school icon"></i>店铺
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-submenu>
          <router-link to="/3" tag="span">
            <el-menu-item index="3">
                <i class="el-icon-shopping-bag-1 icon"></i>
                <span slot="title">商品管理</span>
            </el-menu-item>
          </router-link>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-data-analysis icon "></i>订单
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-female icon" ></i>客户
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
          <router-link to="/6" tag="span">
            <el-menu-item index="6">
                <i class="el-icon-loading icon"></i>
                <span slot="title">广告中心</span>
            </el-menu-item>
          </router-link>
        </el-menu>
    </el-aside>
</div>
</template>

<script>
export default {
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
.aside{
    h1{
        color: white;
        text-align: center;
        line-height: 60px;
        height: 60px;
        border-bottom: 1px solid #1A1E22;
        &>img{
            width: 70%;
            vertical-align: middle;
            display: inline-block;
        }
    }
    .el-aside {
        color: #333;
        height: 100%;
        overflow: auto;
        ul{
            .icon{
            color: #66B1FF;
            }
        }
    }
}
</style>