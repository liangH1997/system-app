<!-- Good -->
<template>
  <!-- <div class="good"> -->
        <el-main class="good">
          <!-- 表单 -->
          <div class="submit">
              <el-form ref="form" 
              :model="goodForm" 
              label-width="80px" 
              label-position='left'
              size="mini"
              inline>
                <el-row :gutter="20" align='middle'>
                  <el-col :span="8">
                    <el-form-item label="商品名称">
                      <el-input v-model="goodForm.name" class="goodname"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item class="goodline" label="商品图片">
                      <el-input class="pricenum" v-model="goodForm.img"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item class="goodline" label="商品类型">
                      <el-select v-model="goodForm.cate" placeholder="请选择">
                          <el-option
                          v-for="item in cates"
                          :key="item._id"
                          :label="item.cate_zh"
                          :value="item.cate">
                          </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" align='middle'>
                  <el-col :span="8">
                    <el-form-item class="saleNum" label="商品描述">
                        <el-input class="pricenum" v-model="goodForm.desc"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item class="goodprice" label="价格">
                        <el-input validate-event class="pricenum" v-model="goodForm.price"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item class="goodreduce" label="是否热销" label-width="110px">
                        <el-radio v-model="goodForm.hot" :label="true">是</el-radio>
                        <el-radio v-model="goodForm.hot" :label="false">否</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" align='middle'>
                  <el-form-item class="btn" size="small">
                      <el-button type="primary" @click="onSubmit">添加</el-button>
                      <el-button @click="clearAll">清空</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
          </div>
          <!-- 导航 -->
          <div class="mynav">
            <el-menu 
            :default-active="activeIndex" 
            class="el-menu-demo"
            mode="horizontal" 
            @select="handleSelect"
            >
                <el-menu-item index="1">全部</el-menu-item>
                <el-menu-item index="2">销售中</el-menu-item>
                <el-menu-item index="3">已售罄</el-menu-item>
                <el-menu-item index="4">仓库中</el-menu-item>
            </el-menu>    
          </div>
          <!-- 选项卡 -->
          <div class="choice">
              <el-row :gutter="20">
                <el-col :span="3"><div class="grid-content bg-purple">请选择品类:</div></el-col>
                <el-col :span="7">
                  <el-select v-model="cate" placeholder="请选择">
                    <el-option
                      v-for="item in cates"
                      :key="item._id"
                      :label="item.cate_zh"
                      :value="item.cate">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
          </div>
          <!-- 表格 -->
          <el-table class="mytable" 
          :data="tableData" 
          @selection-change="handleSelectionChange" 
          tooltip-effect="dark"
          :default-sort = "{prop: 'date', order: 'descending'}"
          @select='changeCheck'
          @select-all='checkAll'
          >
            <el-table-column type="selection" width="45" ></el-table-column>
            <el-table-column
              label="商品名"
              prop="name" 
              width="250"
              >
              <template slot-scope='scope'>
                <el-image
                style="width: 80px; height: 80px;vertical-align: middle;"
                :src="scope.row.img"
                fit="cover">
                </el-image>
                <span style="vertical-align: middle;padding-left:10px;" v-text="scope.row.name"></span>
              </template>
            </el-table-column>
            <el-table-column 
            prop="price" 
            label="价格(元)" 
            width="120"
            sortable
            ></el-table-column>
            <el-table-column 
            prop="rank" 
            label="访问量"
            sortable
            ></el-table-column>
            <el-table-column 
            prop="alsoNum" 
            label="库存"
            sortable
            ></el-table-column>
            <el-table-column 
            prop="saleNum" 
            label="销量"
            sortable
            ></el-table-column>
            <el-table-column 
            prop="kind" 
            label="品类"
            ></el-table-column>
            <el-table-column 
            prop="time" 
            label="创建时间"
            sortable
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="90">
                <template slot-scope="scope">
                    <el-button @click="myClick(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" @click="updataInfo(scope.row)" size="small">修改</el-button>
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
            <el-form :model="updata" label-position='left'>
              <el-row :gutter="20" align='middle' type="flex" justify="center">
                  <el-col :span="22">
                    <el-form-item label="商品名称">
                      <el-input v-model="updata.name" class="goodname"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20" align='middle' type="flex" justify="center">
                  <el-col :span="22">
                    <el-form-item class="goodline" label="商品图片">
                      <el-input class="pricenum" v-model="updata.img"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20" align='middle' type="flex" justify="center">
                  <el-col :span="22">
                    <el-form-item class="goodline" label="商品类型">
                      <el-select v-model="updata.cate" placeholder="请选择">
                          <el-option
                          v-for="item in cates"
                          :key="item._id"
                          :label="item.cate_zh"
                          :value="item.cate">
                          </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter='20' class="hot" id="hot" type="flex" justify="center">
                  <el-col :span="22 " align='center'>
                    <el-form-item class="goodreduce" label="是否热销" label-width="80px">
                      <div>
                        <el-radio v-model="updata.hot" :label="true">是</el-radio>
                        <el-radio v-model="updata.hot" :label="false">否</el-radio>
                      </div>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" justify="center">
                  <el-col :span="22">
                    <el-form-item class="saleNum" label="商品描述">
                        <el-input class="pricenum" v-model="updata.desc"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" justify="center">
                  <el-col :span="22">
                    <el-form-item class="goodprice" label="价格">
                        <el-input validate-event class="pricenum" v-model="updata.price"></el-input>
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
        <!-- 分页 -->
        <div class="pageBox">
          <el-checkbox v-model="allChecked">当页全选</el-checkbox>
          <el-button plain>下架</el-button>
          <el-button plain>删除</el-button>
          <el-button plain>改分组</el-button>
          <el-button plain>批量设置</el-button>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="300"
            :current-page='page'
            @prev-click='prevClick'
            @next-click='nextClick'
            @current-change = 'pageChange'
            >
          </el-pagination>
        </div>
      </el-main>
  <!-- </div> -->
</template>

<script>
export default {
  name:'good',
  data() {
    return {
      tableData: [],
      goodForm: {
          name: '',
          img:'',
          desc: '',
          price: '',
          cate: '',
          hot:true
      },
      options: [
      {
        value: '选项1',
        label: '黄金糕'
      }, 
      {
        value: '选项2',
        label: '双皮奶'
      }, 
      {
        value: '选项3',
        label: '蚵仔煎'
      }, 
      {
        value: '选项4',
        label: '龙须面'
      },
      {
        value: '选项5',
        label: '北京烤鸭'
      }],
      cates: [],
      cate:'',
      value: '',
      multipleSelection: [],
      activeIndex:"1",
      allChecked :true,
      page : 1,
      dialog : false,
      updata : {
        name: '',
        img:'',
        desc: '',
        price: '',
        cate: '',
        hot:true,
        id : ''
      },
      loading: false,
    }
  },
  watch : {
    cate :function(){
      console.log('变了')
      this.page = 1
      this.getAllGoods()
    }
  },
  methods: {
      onSubmit() {
        // console.log('submit!');
        for(let key in this.goodForm){
          if(this.goodForm[key]==''){
            this.$message({
              message: '亲，信息不全哦！',
              type: 'warning'
            })
            return
          }
        }
        let data = {
          img: this.goodForm.img,   // 图片
          name: this.goodForm.name,  // 商品名称
          desc: this.goodForm.desc,  // 商品描述
          price: parseInt(this.goodForm.price), // 价格
          cate: this.goodForm.cate,  // 品类
          hot: this.goodForm.hot,  // 是否推荐
        }
        this.$api.addGood(data).then(res=>{
          if(res==undefined){
            this.$message({
              message: '恭喜你，添加成功！',
              type: 'success'
            })
            this.goodForm.name=''
            this.goodForm.img=''
            this.goodForm.desc=''
            this.goodForm.price=''
            this.goodForm.cate=''
            this.goodForm.hot=true
          }else{
            this.$message.error('错了哦，服务器迷路了！')
          }
        })
      },
      clearAll(){
        this.goodForm.name=''
        this.goodForm.img=''
        this.goodForm.desc=''
        this.goodForm.price=''
        this.goodForm.cate=''
        this.goodForm.hot=true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 删除
      myClick(row) {
        let params = {
          id : row._id
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteCart(params).then(()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAllGoods()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
      },
      handleSelect(){

      },
      getAllGoods(){
        let params = {
          page: this.page,
          cate : this.cate,
          hot : false
        }
        this.$api.getList(params).then((res)=>{
          // console.log(res)
          res.map((ele)=>{
            ele.saleNum = Math.round(Math.random()*1000)
            ele.alsoNum = Math.round(Math.random()*1000)
            ele.rank = Math.round(Math.random()*1000)
            ele.time = new Date(ele.create_time).toLocaleDateString()
            switch (ele.cate){
              case 'digital':
                ele.kind="手机数码"
                break
              case 'office':
                ele.kind="电脑办公"
                break
              case 'electrical':
                ele.kind="家用电器"
                break
              case 'beauty':
                ele.kind="美妆护肤"
                break
              case 'clean':
                ele.kind="个人清洁"
                break
              case 'car':
                ele.kind="汽车生活"
                break
              case 'clothe':
                ele.kind="男装女装"
                break
              case 'maternal':
                ele.kind="母婴儿童"
                break
              case 'book':
                ele.kind="图书音像"
                break
              case 'sport':
                ele.kind="户外运动"
                break
              case 'fresh':
                ele.kind="食品生鲜"
                break
              case 'drink':
                ele.kind="饮料酒水"
                break
              case 'gem':
                ele.kind="钟表珠宝"
                break
              case 'music':
                ele.kind="玩具乐器"
                break
              case 'pet':
                ele.kind="宠物生活"
                break
            }
          })
          this.tableData = res

        })
      },
      getCates(){
        this.$api.getAllCates({}).then(res=>{
          // console.log(res)
          res.unshift({cate:'',cate_zh:'全部品类'})
          this.cates = res
        })
      },
      nextClick(){
        this.page++
        // console.log(this.page)
        this.getAllGoods()
      },
      prevClick(){
        this.page--
        // console.log(this.page)
        this.getAllGoods()
      },
      pageChange(index){
        // console.log(index)
        this.page=index
        this.getAllGoods()
      },
      changeCheck(selection, row){
        if(selection.length==10){
          console.log(row)
        }
      },
      checkAll(selection){
        console.log(selection)

      },
      cancelForm() {
        this.loading = false;
        this.dialog = false;
      },
      updataInfo(row){
        this.dialog=true
        console.log(row)
        this.updata.id = row._id
      },
      submitData(){
        for(let key in this.updata){
          if(this.updata[key]==''){
            this.$message({
              message: '亲，信息不全哦！',
              type: 'warning'
            })
            return
          }
        }
        // console.log(this.updata.id)
        let data = {
          img: this.updata.img,   // 图片
          name: this.updata.name,  // 商品名称
          desc: this.updata.desc,  // 商品描述
          price: parseInt(this.updata.price), // 价格
          cate: this.updata.cate,  // 品类
          hot: this.updata.hot,  // 是否推荐
          id : this.updata.id
        }
        this.$api.addGood(data).then(res=>{
          if(res==undefined){
            this.$message({
              message: '恭喜你，修改成功！',
              type: 'success'
            })
            this.getAllGoods()

            this.loading = false;
            this.dialog = false;

            this.updata.name=''
            this.updata.img=''
            this.updata.desc=''
            this.updata.price=''
            this.updata.cate=''
            this.updata.hot=true
            this.updata.id = ''
          }else{
            this.$message.error('错了哦，服务器迷路了！')
          }
        })
      }
  },
  mounted (){
    this.getAllGoods()
    this.getCates()
  }
}
</script>
<style lang='scss' scoped>
.good {
  .submit{
      min-height: 160px;
      background-color: white;
      border-radius: 20px;
      border: 1px solid #cccccc;
      padding: 20px;
      margin-bottom: 30px;
      .el-col{
        .el-form-item{
          margin-top: 10px;
          .el-form-item__label{
            text-align: left;
          }
        }
      }
      .btn{
          margin-left: 82px;
      }
  }
  .mynav{
      border-radius: 20px 20px 0 0;
      border: 1px solid #cccccc;
      border-bottom: none;
      overflow: hidden;
  }
  .mytable{
      border-radius: 0 0 20px 20px;
      border: 1px solid #cccccc;
      border-top: none;
      overflow: hidden;
      
  }
  .choice{
    height: 60px;
    line-height: 60px;
    background-color: white;
    border:1px solid #cccccc;
    padding-left: 10px;
    &>label{
      margin-right: 20px;
    }
  }
  .el-drawer__container{
    .el-drawer__title{
      margin: 0;
    }
    .demo-drawer__content{
      padding: 20px;
      .hot{
        .el-form-item_label{
            text-align: left;
          }
        padding-top: 30px;
          
        .el-form-item__content{
            margin: 0;
            .el-radio{
              margin-right: 15px;
            }
          }
        }    
      .demo-drawer__footer{
        margin-top: 60px;
        button{
          padding: 10px 36px;
        }
      }
    }
  }
  
  .pageBox{
    margin-top: 15px;
    padding:0 14px;
    height: 80px;
    border: 1px solid #cccccc;
    border-radius: 20px;
    background-color: white;
    line-height: 80px;
    &>label{
      margin-right: 10px;
    }
    .el-pagination{
      float: right;
      padding-top: 25px;
    }
  }
}

</style>