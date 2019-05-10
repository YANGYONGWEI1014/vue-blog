<template>
  <el-aside width="20%">
    <div class="card">信息</div>
    <div class="card1">
      <div>
        <embed
          wmode="transparent"
          src="http://chabudai.sakura.ne.jp/blogparts/honehoneclock/honehone_clock_tr.swf"
          quality="high"
          width="100%"
          height="70"
          name="honehoneclock"
          align="center"
          allowscriptaccess="always"
          type="application/x-shockwave-flash"
          pluginspage="http://www.macromedia.com/go/getflashplayer"
        >
      </div>
      <Calendar :sundayStart="true"></Calendar>
    </div>
    <div class="card">分类</div>
    <div class="card">
      <p class="title">热门文章</p>
      <div v-for="article in article" class="orderby">
        <router-link v-bind:to="'/article/' + article.id" >{{article.title}}</router-link>
        <span>阅读数：{{article.click_time}}</span>
      </div>
    </div>
  </el-aside>
</template>

<script>
import Calendar from "vue-calendar-component";
import { getArticleList } from "@/api/article";
export default {
  components: {
    Calendar
  },
  data() {
    return {
      article: []
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      const param = {
        click: 1
      };
      getArticleList(param).then(res => {
        this.article = res.data.data.slice(0, 8);
        console.log(res.data);
      });
    }
  }
};
</script>
<style>
/* 侧边栏 */
.card {
  /* border-radius: 5px; */
  margin: 20px auto;
  box-sizing: border-box;
  background: rgb(184, 181, 181);
}
.wh_content[data-v-2ebcbc83]{
    padding-right: 0;
    box-sizing: border-box;
}

.card1 div:nth-child(1) {
  background-color: rgb(184, 181, 181);
}
.card1 div:nth-child(3) div,
.card1 div:nth-child(2) div {
  height: 35px;
  width: 35px;
}
/*今天*/
.wh_content_item .wh_isToday[data-v-2ebcbc83] {
  background-color: rgb(139, 175, 241);
}
/*日历点击*/
.wh_content_item .wh_chose_day[data-v-2ebcbc83] {
  background-color: transparent;
}
/*日历划过*/
.wh_item_date[data-v-2ebcbc83]:hover {
  background-color: rgb(111, 223, 223);
  border-radius: 100%;
}

/*排行*/
.orderby {
  box-sizing: border-box;
  margin: 5px 10px 0 10px;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
}
.title {
  background: #e1ecec;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  margin-bottom: 0;
}
.orderby a {
  text-decoration: none;
  font-size: 10px;
  color: #f1831c;
  height: 25px;
  line-height: 25px;
  top: 5px;
}
.orderby a:hover {
  color: rgb(26, 112, 224);
}
.orderby span {
  font-size: 10px;
  color: #6b6969;
  height: 25px;
  line-height: 25px;
  top: 5px;
  float: right;
}
</style>
