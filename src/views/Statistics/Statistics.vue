<template>
  <div>
    <div class="statisheader">
      <div class="today">
        <div class="content">
          <p>今日发布</p>
          <span>0</span>
        </div>
        <i class="el-icon-finished"></i>
      </div>
      <div class="original">
        <div class="content">
          <p>原创文章</p>
          <span>0</span>
        </div>
        <i class="el-icon-document"></i>
      </div>
      <div class="newmessage">
        <div class="content">
          <p>新留言</p>
          <span>2</span>
        </div>
        <i class="el-icon-bell"></i>
      </div>
      <div class="news">
        <div class="content">
          <p>新消息</p>
          <span>3</span>
        </div>
        <i class="el-icon-chat-dot-round"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    // 获取全部文章
    getAllarticle() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          this.articles = res.data;
          // console.log(this.articles);
          this.articles.map(item => {
            item.date = this.$dayjs(item.date).format(
              "YYYY年MM月DD日HH时mm分ss秒"
            );
            item.star = Number(item.star);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getAllarticle();
  },
  watch: {},
  computed: {
    today() {}
  }
};
</script>

<style scoped lang='scss'>
.statisheader {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  div {
    position: relative;
    flex: 1;
  }
  .today {
    background-color: rgb(79, 194, 79);
  }
  .original {
    background-color: rgb(207, 155, 164);
  }
  .newmessage {
    background-color: rgb(158, 94, 158);
  }
  .news {
    background-color: rgb(136, 221, 136);
  }
  .content {
    width: 85px;
    text-align: center;
    margin: 0 auto;
    color: white;
    line-height: 20px;
    p {
      margin-top: 10px;
    }
  }
  i {
    position: absolute;
    top: 22px;
    right: 40px;
    color: white;
  }
}
</style>