<!-- Header -->
<template>
    <div class="header">
        <el-dropdown @command="handleCommand">
            <i class="el-icon-setting icon" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='c'>查看</el-dropdown-item>
            <el-dropdown-item command='x'>新增</el-dropdown-item>
            <el-dropdown-item command='t'>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span style="color:#eee; font-size:16px;" v-text="username"></span>
    </div>
</template>

<script>
export default {
data() {
return {
    username : ''
}
},
computed : {

},
methods : {
    handleCommand(command){
        // console.log(command)
        if(command=='t'){
            this.$confirm('此操作将退出程序, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    localStorage.removeItem('token')
                    this.$router.push('/login')
                    this.$message({
                        type: 'success',
                        message: '已退出!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
            });
            
        }else{
            console.log('你点击了'+command)
        }
        
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {
    this.$api.getInfo({}).then(res=>{
        this.username = res.username
    })
}
}
</script>
<style lang='scss' scoped>

</style>