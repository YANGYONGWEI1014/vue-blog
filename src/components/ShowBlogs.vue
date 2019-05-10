<template>
  <!-- :column 加到theme后面设置背景和内边距 -->
  <el-container>
    <BlogHeader></BlogHeader>
    <el-container>
      <!-- 左侧边栏 -->
      <Aside></Aside>
      <el-container>
        <!-- 内容 -->
        <el-main id="show-blogs">
          <form :model="search" :inline="true">
            <input
              v-model="search.title"
              class="searchtitle"
              onkeypress="if(event.keyCode == 13) return false;"
            >
            <el-button
              class="but"
              type="primary"
              size="small"
              @click="handleClick(search)"
              icon="el-icon-search"
            >搜索</el-button>
          </form>
          <div v-for="article in article" class="single-blog">
            <router-link v-bind:to="'/article/' + article.id">
              <h4 v-rainbow>{{article.title}}</h4>
            </router-link>
            <article v-html="snippet(article.content)"></article>
            <span>
              <i class="el-icon-time el-icon--left"></i>
              {{article.c_time}}
            </span>
            <span>
              <i class="el-icon-view el-icon--left"></i>
              浏览：{{article.click_time}}
            </span>
          </div>
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
import { getArticleList } from "@/api/article";
export default {
  components: {
    Aside,
    BlogHeader
  },
  data() {
    return {
      article: [],
      search: {
        title: null
      },
      input: ""
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    snippet(value) {
      return value.slice(0, 80) + "...";
    },
    //搜索
    handleClick(search) {
      const param = {
        status: 1,
        title: search.title
      };
      getArticleList(param).then(res => {
        this.article = res.data.data.slice(1, 10);
        console.log(res.data);
      });
    },
    //列表
    getArticle() {
      const param = {
        status: 1
      };
      getArticleList(param).then(res => {
        this.article = res.data.data.slice(0, 10);
        console.log(res.data);
      });
    }
  }
};
</script>

<style>
.single-blog {
  padding: 5px 0 15px 20px;
  margin: 20px auto;
  box-sizing: border-box;
  border-radius: 5px;
  color: #303133;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background: rgba(249, 242, 232, 0.7);
}
.single-blog:hover {
  border-bottom: 1px solid rgb(46, 153, 224);
}
.single-blog h4 {
  margin: 8px -2px 0px -2px;
}
.single-blog article {
  font-size: 12px;
}
.single-blog span {
  font-size: 12px;
  color: #626364;
  height: 20px;
  line-height: 20px;
  top: 5px;
  text-align: center;
  position: relative;
  font-family: "Hiragino Sans GB", Arial;
}

#show-blogs a {
  text-decoration: none;
  font-family: "Hiragino Sans GB", Arial;
}
.searchtitle {
  padding: 5px;
  height: 36px;
  width: 28%;
  background: none;
  border-radius: 5px;
  border: 1px #b4b5b6 solid;
  box-sizing: border-box;
  margin-left: 71%;
  outline-style: none; /* 取消选中状态的边框颜色 */
}
.searchtitle:focus {
  border: 1px solid rgb(46, 153, 224);
}
.but {
  height: 36px;
  background: none;
  border: none;
  color: #303133;
  margin-left: -75px;
  border-radius: none;
  border-left: 1px #b4b5b6 solid;
}
.but:hover,
.but:focus {
  border-left: 1px #b4b5b6 solid;
  color: #303133;
  background: none;
}
.el-footer {
  text-align: right;
}
.footer {
  border: 1px #ccc solid;
  opacity: 0.8;
  text-align: center;
  line-height: 150px;
}
</style>
