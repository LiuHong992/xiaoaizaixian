<template>
  <div>
    <!-- 内容层分页组件（element-ui） -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paging.currentPage"
      :page-sizes="[10, 20, 30, 40,60,80,100]"
      :page-size="paging.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    tableData: {
      type: Array,
      defalut: () => []
    },
    paging:{
      type: Object,
      defalut: () => {}
    }
  },
  components: {},
  methods: {
    // 以下两个方法为分页组件内置方法
    handleSizeChange(val) {
      // this.pagesize = val;
      // this.$parent.paging.currentPage = 1
      this.$parent.obj.pagesize=val
      // console.log(`每页 ${val} 条`);
      // console.log(this.pagesize);
      // this.pageChange();
      // console.log(this.arr);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // this.currentPage = Number(val);
      this.$parent.obj.currentPage=val
      // this.currentPage = Number(val)
    }
    // 页面加载的数据条数改变后对页面重新渲染（自定义方法）
    // pageChange() {
    //   this.newList = [];
    //   for (let i = 0; i < this.tableData.length; i += this.pagesize) {
    //     this.newList.push(this.tableData.slice(i, i + this.pagesize));
    //   }
    // console.log(this.arr)
    // }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>