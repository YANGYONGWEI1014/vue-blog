<template>
    <!-- 左侧边栏 -->
    <el-aside width="200px">    
        <el-col :span="13">  
          <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
            <el-menu-item index="1" @click = "article">
                <i class="el-icon-menu"></i>
                <span slot="title">文章管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click = "classlist">
                <i class="el-icon-menu"></i>
                <span slot="title">分类管理</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">每日一签</span>
            </el-menu-item>
            <el-menu-item index="4"disabled>
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
    </el-aside>
</template>

<script>
export default {
  data(){
    name:"sidebar"
    return{
      
    };
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },
    article(){
        this.$router.push({path: '/list'});
        // location.reload();
    },
    classlist(){
        this.$router.push({path: '/class'});
    }
  }

}
</script>

<style sopsed>
 .el-aside {
    color: rgb(12, 12, 12);
    text-align: center;
    line-height: 200px;
    background-color: rgb(226, 225, 225);
    opacity: 0.7;
  }
 .el-col {
    width: 200px;
 }
 .el-menu-vertical-demo{
   margin-left: -50px;
   padding: 0px;
 }
</style>
