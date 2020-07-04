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
          label="广告图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" :title="scope.row.title" style="height:100px;">
          </template>
        </el-table-column>
        <el-table-column
          prop="saleNum"
          label="成交额/元"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rank"
          label="点击量/次"
          width="180">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="delAd(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="update(scope.row._id)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑 -->
      <el-drawer
      :before-close="cancelForm"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="updateAd" label-position='left'>
            <el-row :gutter="20" align='middle' type="flex" justify="center">
                <el-col :span="22">
                  <el-form-item label="活动名称">
                    <el-input v-model="updateAd.qfAd" class="goodname"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" align='middle' type="flex" justify="center">
                <el-col :span="22">
                  <el-form-item class="goodline" label="广告图片">
                    <el-input class="pricenum" v-model="updateAd.img"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" justify="center">
                <el-col :span="22">
                  <el-form-item class="saleNum" label="广告标题">
                      <el-input class="pricenum" v-model="updateAd.title"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
          </el-form>
          
          <el-row class="demo-drawer__footer" :gutter="20" type="flex" justify="center">
            <el-col :span="22">
              <el-button @click="cancelForm">取 消</el-button>
              <el-button type="primary" @click="submitData" :loading="loading">{{ loading ? '提交中 ...' : '修 改' }}</el-button>
            </el-col>
          </el-row>
        </div>
      </el-drawer>
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
        tableData : [],
        updateAd : {
          qfAd : '',
          img : '',
          title : '',
          id : ''
        },
        loading : false,
        dialog : false
      };
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
        this.$api.getBanner().then(res=>{
          res.map((ele)=>{
            ele.rank = parseInt(Math.random()*10000).toString().replace(/(?=(?!\b)(\d{3})+$)/g,",")
            ele.saleNum = parseInt(Math.random()*100000).toString().replace(/(?=(?!\b)(\d{3})+$)/g,",")
          })
          this.tableData = res
        })
      },
      submitForm() {
        let data = {
            img : this.ruleForm.img,
            title : this.ruleForm.title,
            qfAd : this.ruleForm.qfAd
        }
        // console.log(data)
        this.$api.addBanner(data).then(()=>{
          this.$message({
              type: 'success',
              message: '添加成功!'
            });
          this.$api.getBanner().then(res=>{
          this.tableData = res
          this.ruleForm = {
            img : '',
            title : '',
            qfAd : ''
          }
        })
        })
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      delAd(data){
        // console.log(data)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.delBanner({id:data._id}).then(()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.init()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      cancelForm() {
        this.loading = false;
        this.dialog = false;
      },
      update(id){
        this.dialog=true
        // console.log(id)
        this.updateAd.id = id
      },
      submitData(){
        for(let key in this.updateAd){
          if(this.update[key]==''){
            this.$message({
              message: '亲，信息不全哦！',
              type: 'warning'
            })
            return
          }
        }
        this.$api.updateBanner(this.updateAd).then(res=>{
          if(res==undefined){
            this.$message({
              message: '恭喜你，修改成功！',
              type: 'success'
            })
            this.init()

            this.updateAd = {
              img : '',
              title : '',
              id : '',
              qfAd : ''
            }
          }else{
            this.$message.error('错了哦，服务器迷路了！')
          }
        })
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