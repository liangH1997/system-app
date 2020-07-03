<!-- Login -->
<template>
<div class="login">
    <div class="logo">
        <img src="../img/01.png" alt="">
    </div>
    <div class="box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop='username' autocomplete="off">
                <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="pass" autocomplete="off">
                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
data() {
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空!'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
      };
      return {
        ruleForm: {
          pass: '',
          username: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: checkUser, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapActions('user',['getname']),
      submitForm() {
        if(this.ruleForm.username==''||this.ruleForm.pass==''){
          return
        }else{
          let data = {
              username : this.ruleForm.username,
              password : this.ruleForm.pass
            }
            this.$api.toLogin(data).then(res=>{
              // console.log(res)
              localStorage.setItem('token',res.token)
              this.$router.push('/')
              this.getname(res.username)
            })
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
.login{
    height: 100%;
    width: 100%;
    background-color: #21252B;
    .logo{
        width: 300px;
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translateX(-50%);
        img{
            width: 100%;
        }
    }
    .box{
        width: 400px;
        height: 200px;
        border: 1px solid 1px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; 
        .demo-ruleForm{
            color: white; 
            .el-form-item--small{
                color: white; 
                font-size: 26px;
                .el-form-item__label{
                  color: #ffffff;
                }
                .el-form-item__content{
                  color: white;
                    .el-input--small{
                      &>input[password]{
                        height: 60px;
                      }
                        .el-input__inner{
                          height: 60px;
                          line-height: 60px;
                        }
                    }
                }
            }
        }
        
    }
}
</style>