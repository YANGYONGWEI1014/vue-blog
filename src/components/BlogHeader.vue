<template>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple"  @click = "index()" ><img src="../assets/img/logo.png"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple-light" @click = "index()"><img src="../assets/img/home.png"></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple"  @click = "list()"><img src="../assets/img/about.png"></div></el-col>
        </el-row>
      </el-header>
    </el-container>
</template>

<script>
export default {
    
data() {
    name:"blog-header"
      return {
      
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      index(){
        this.$router.push({path: '/index'});
      },
      list(){
        this.$router.push({path: '/list'});
      },
    }
  };
</script>
  //  样式
<style>

.el-header{
  border-bottom: 1px rgb(136, 135, 133) solid;
}
.el-row {
  width: 100%;
  line-height: 50px;
  text-align: center;
}
.el-col{
  cursor:pointer;
  border-radius: 2px;
}
.el-col:first-of-type img{
  height: 60px;
}
.el-col:nth-child(2) img{
  height: 35px;
  margin-bottom:-18px;
}
.el-col:last-of-type img{
  margin-bottom:-20px;
}
</style>
