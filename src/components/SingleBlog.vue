<template>
  <el-container>
    <!-- 头部 -->
    <BlogHeader></BlogHeader>
    <el-container>
      <!-- 左侧边栏 -->
      <Aside></Aside>
      <el-container>
        <!-- 内容 -->
        <el-main max-width="820px" :key="Key">
          <h3 v-rainbow>{{article.title}}</h3>
          <span>{{article.c_time}}</span>
          <span>阅读数：{{article.click_time}}</span>
          <div class="label">
            标签：
            <span>{{article.label}}</span>
            <span>桌面美化</span>
          </div>
          <hr>
          <article v-html="article.content"></article>
        </el-main>
      </el-container>
    </el-container>
    <!-- 底部 -->
    <el-footer height="150px" class="footer">Footer</el-footer>
  </el-container>
  
</template>

<script>
import Aside from "@/components/Aside";
import BlogHeader from "@/components/BlogHeader";
import {getArticleDetails} from "@/api/article"
export default {
  name: "single-blog",
  components: {
    Aside,
    BlogHeader
  },
  data() {
    return {
      id:this.$route.params.id,
      article: {},
      Key: ''
    };
  },
  created() {
    this.getArtcile();
  },
  watch:{
    $route(to,from){
      this.orderId = to.query.orderId;
      return this.getData();
    }
  },
  methods: {
    getArtcile() {
      const param = {
        id:this.id
      }
      getArticleDetails(param).then(res => {
        this.article = res.data
        console.log(res.data)
      
      })
    }
  },
  //局部自定义指令
    directives: {
      rainbow: {
        //自定义元素
        bind(el, binding, vnode) {
          // el:元素
          el.style.color =
            "#" +
            Math.random(80)
              .toString(16)
              .slice(2, 8); //随机颜色
        }
      }
    }

}
</script>

<style scoped>
.el-main{
  background: rgba(249,242,232,0.9);
  margin: 20px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
}
span {
  font-size: 14px;
  color: #58595a;
  margin-right: 15px;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
}
/* 标签 */
div {
  font-size: 14px;
  color: #58595a;
  font-family: "Hiragino Sans GB", Arial;
  display: inline-block;
}
h2{
  margin-bottom: 5px;
}
.label span {
  padding: 1px 8px;
  margin-right: 5px;
  border-radius: 12px;
  border: 1px silver solid;
}
article{
  font-size: 14px;
  color: #252525;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
}
.label span:hover {
  border: 1px #f06d56 solid;
  color: #f06d56;
}
a {
  text-decoration: none;
  padding: 6px;
}

.footer {
  background-color: rgba(248, 247, 236, 0.863);
  opacity: 0.8;
  text-align: center;
  line-height: 150px;
  color: rgb(12, 55, 141);
}
</style>
