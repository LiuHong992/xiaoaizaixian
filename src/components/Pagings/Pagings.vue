<template>
  <div>
    <!-- 分页+模糊搜索 -->
    <input class="serchipt" type="text" placeholder="请搜索" v-model="keywords" />
    <div class="block">
      <el-table :data="tableData0" style="width: 100%">
        <el-table-column prop="NAME" label="名称"></el-table-column>
        <el-table-column prop="GOODS_SERIAL_NUMBER" label="商品编号"></el-table-column>
        <el-table-column prop="ORI_PRICE" label="原价"></el-table-column>
        <el-table-column prop="PRESENT_PRICE" label="现价"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="change(scope.row)" type="primary" icon="el-icon-edit">修改</el-button>
            <el-dialog title :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="form.NAME" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="原价" :label-width="formLabelWidth">
                  <el-input v-model="form.ORI_PRICE" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="现价" :label-width="formLabelWidth">
                  <el-input v-model="form.PRESENT_PRICE" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-button class="delbtn" @click="del(scope.row)" type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 内容层分页组件（element-ui） -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40,60,80,100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // newList: [],
      yarr: [],
      pagesize: 10,
      currentPage: 1,
      keywords: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {}
    };
  },
  components: {},
  methods: {
    // 获取表格数据
    getTable() {
      this.$axios
        .req("/tableData")
        .then(res => {
          this.tableData = res.data;
          this.yarr = res.data;
          // this.pageChange();
          // console.log(this.newList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 以下两个方法为分页组件内置方法
    handleSizeChange(val) {
      this.pagesize = val;
      // console.log(`每页 ${val} 条`);
      // console.log(this.pagesize);
      // this.pageChange();
      // console.log(this.arr);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = Number(val);
      // this.currentPage = Number(val)
    },
    // 页面加载的数据条数改变后对页面重新渲染（自定义方法）
    // pageChange() {
    //   this.newList = [];
    //   for (let i = 0; i < this.tableData.length; i += this.pagesize) {
    //     this.newList.push(this.tableData.slice(i, i + this.pagesize));
    //   }
    // console.log(this.arr)
    // }

    // 删除操作
    del(item0) {
      this.tableData = this.tableData.filter(item => {
        return item !== item0;
      });
      this.yarr = this.yarr.filter(item => {
        return item !== item0;
      });
    },
    // 修改操作
    change(item) {
      this.dialogFormVisible = true;
      this.form = item;
      // console.log(item);
    }
  },
  mounted() {
    this.getTable();
  },
  watch: {
    keywords(val) {
      this.currentPage = 1;
      this.tableData = [];
      this.tableData = this.yarr.filter(item => {
        return JSON.stringify(
          item.NAME +
            item.GOODS_SERIAL_NUMBER +
            item.ORI_PRICE +
            item.PRESENT_PRICE
        ).includes(val);
      });
      //   this.pageChange();
    }
  },
  computed: {
    tableData0() {
      if (this.keywords === "") {
        return this.tableData.slice(
          this.pagesize * (this.currentPage - 1),
          this.pagesize * this.currentPage
        );
      } else
        return this.tableData.slice(
          this.pagesize * (this.currentPage - 1),
          this.pagesize * this.currentPage
        );
    }
  }
};
</script>

<style scoped lang='scss'>
.serchipt {
  width: 210px;
  height: 30px;
}
.block {
  margin-top: 20px;
  .delbtn {
    margin-left: 10px;
  }
}
</style>