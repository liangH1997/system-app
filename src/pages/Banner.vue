<!-- Banner -->
<template>
<el-main class='banner'>
    <div class="form">
        <h1>添加广告位</h1>
        <el-form 
        :model="ruleForm" 
        status-icon 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm"
        label-position="top"
        >
            <el-form-item label="活动" prop="qfAd">
                <el-input type="text" v-model="ruleForm.qfAd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="img">
                <el-input type="text" v-model="ruleForm.img" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model.number="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="qfAd"
          label="活动名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" :title="scope.row.title" style="height:100px;">
          </template>
        </el-table-column>
      </el-table>
    </div>
</el-main>
</template>

<script>
export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('标题不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入活动名称'));
        } else {
          if (this.ruleForm.img !== '') {
            this.$refs.ruleForm.validateField('img');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入图片路径'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          qfAd: '',
          img: '',
          title: ''
        },
        rules: {
          qfAd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          img: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          title: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        tableData : []
      };
    },
    mounted(){
      this.$api.getBanner().then(res=>{
        this.tableData = res
      })
    },
    methods: {
      submitForm() {
        let data = {
            img : this.ruleForm.img,
            title : this.ruleForm.title,
            qfAd : this.ruleForm.qfAd
        }
        console.log(data)
        this.$api.addBanner(data)
        this.$api.getBanner().then(res=>{
          this.tableData = res
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang='scss'>
.banner{
    .form{
      h1{
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      border: 1px solid #cccccc;
      border-radius: 20px;
      margin-top: 20px;
      // width: 400px;
      padding: 20px;
      padding-left: 40px;
      background: #ffffff url('../img/bg.png')  center right no-repeat;
      background-size: 50%;
      input{
        width: 400px;
      }
    }
    .table{
      border: 1px solid #cccccc;
      border-radius: 20px;
      // width: 400px;
      padding: 20px;
      background-color: white;
      margin-top: 50px;
    }
}

</style>