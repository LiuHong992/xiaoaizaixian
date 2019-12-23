<template>
  <div>
    <!-- 统计路由的头部 -->
    <div class="statisheader">
      <div class="today">
        <div class="content">
          <p>今日发布</p>
          <span v-if="this.releasedtoday">{{this.releasedtoday.length}}</span>
          <span v-else>**</span>
        </div>
        <i class="el-icon-finished"></i>
      </div>
      <div class="original">
        <div class="content">
          <p>原创文章</p>
          <span v-if="this.originalarticle">{{this.originalarticle.length}}</span>
          <span v-else>**</span>
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
    <!-- 图表的显示页面 -->
    <div v-if="this.articlet.length > 0">
      <div class="pie flex">
        <!-- 按类目进行划分的饼状图 -->
        <el-card class="pie-item">
          <ve-pie :data="categories"></ve-pie>
        </el-card>
        <!-- 按来源进行划分的饼状图 -->
        <el-card class="pie-item">
          <ve-pie :data="sources" :settings="chartSettings"></ve-pie>
        </el-card>
      </div>
      <!-- 按发布日期进行划分的瀑布图 -->
      <el-card class="pie-item">
        <ve-waterfall :data="waterfall"></ve-waterfall>
      </el-card>
    </div>
    <!-- 无文章数据显示页面 -->
    <div v-else>
      <el-card class="pie-item">暂无图表数据</el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 通过接口获取到的相关文章的数据
      articlet: [],
      // 原创文章处数据
      originalarticle: [],
      // 今日发布处数据
      releasedtoday: [],
      // 按类目进行划分的饼图数据
      categories: {
        columns: ["类型", "数量"],
        rows: []
      },
      // 按来源进行划分的饼图数据
      sources: {
        columns: ["来源", "数量"],
        rows: []
      },
      chartSettings: {
        roseType: "radius"
      },
      // 按日期进行划分的瀑布图数据
      waterfall: {
        columns: ["日期", "数量"],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    // 获取全部文章
    getAllarticle() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          this.articlet = res.data;
          // 筛选今日发布篇数
          let a = this.$dayjs().format("YYYY-MM-DD");
          a = this.$dayjs(a).valueOf();
          this.releasedtoday = this.articlet.filter(item => {
            return (
              this.$dayjs(item.date).valueOf() >= a &&
              this.$dayjs(item.date).valueOf() <= this.$dayjs().valueOf()
            );
          });
          // 获取文章的同时将时间格式化为年月日的格式
          this.articlet.map(item => {
            item.date = this.$dayjs(item.date).format("YYYY年MM月DD日");
          });
          this.getFirst();
          this.getSecond();
          this.getWaterfall();

          // 筛选原创文章篇数
          this.originalarticle = this.articlet.filter(item => {
            return item.source === "原创";
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 第一个饼状图数据获取（原理与模糊搜索相近（JSON.stringify()的运用），利用两次对全部文章这个数组的遍历，第一次遍历是为了
    // 将不同类型的文章遍历出来，第二次遍历则是将相同文章的篇数遍历出来）
    getFirst() {
      this.articlet.map(item => {
        if (!JSON.stringify(this.categories.rows).includes(item.category)) {
          let num = 0;
          this.articlet.map(item0 => {
            if (item0.category === item.category) {
              // 文章相同则让定义的文章数量的变量+1
              num++;
            }
          });
          this.categories.rows.push({
            数量: num,
            类型: item.category
          });
        }
      });
    },
    // 第二个饼状图数据获取
    getSecond() {
      this.articlet.map(item => {
        if (!JSON.stringify(this.sources.rows).includes(item.source)) {
          let num = 0;
          this.articlet.map(item0 => {
            if (item0.source === item.source) {
              // 文章相同则让定义的文章数量的变量+1
              num++;
            }
          });
          this.sources.rows.push({
            数量: num,
            来源: item.source
          });
        }
      });
    },
    // 第三个瀑布图
    getWaterfall() {
      this.articlet.map(item => {
        if (!JSON.stringify(this.waterfall.rows).includes(item.date)) {
          let num = 0;
          this.articlet.map(item0 => {
            // console.log(item0.date);
            if (item0.date === item.date) {
              // 文章相同则让定义的文章数量的变量+1
              num++;
            }
          });
          this.waterfall.rows.push({
            数量: num,
            日期: item.date
          });
        }
      });
    }
  },
  mounted() {
    // 进入统计页面对所有文章信息进行获取
    this.getAllarticle();
  },
  watch: {},
  computed: {}
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
.pie {
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  .pie-item {
    width: 40%;
  }
}
.pie-item {
  margin-top: 20px;
}
</style>