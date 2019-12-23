<template>
  <div>
    <!-- 模糊搜索 -->
    <input class="serchipt" type="text" placeholder="请搜索" v-model="keywords" />
    <!-- 分页显示的数据 -->
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
    <!-- 分页组件 -->
    <pagings :tableData="tableData" :paging="obj"></pagings>
  </div>
</template>

<script>
import pagings from "../../components/Pagings/Pagings";
export default {
  data() {
    return {
      // 分页展示数据
      tableData: [],
      // 分页原数据
      yarr: [],
      // 搜索框关键词
      keywords: "",
      // 修改框的状态，默认为false
      dialogFormVisible: false,
      // 表单框宽度
      formLabelWidth: "120px",
      // 用于接收要修改的数据的空对象
      form: {},
      // 分页中每页最大条数和当前页（对象），需要传到子组件pagings中
      obj: {
        pagesize: 10,
        currentPage: 1
      }
    };
  },
  components: {
    pagings
  },
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
    // 模糊搜索框关键词监听
    keywords(val) {
      this.paging.currentPage = 1;
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
    // 分页展示出来的数据（计算属性，实时变化）
    tableData0() {
      if (this.keywords === "") {
        return this.tableData.slice(
          this.obj.pagesize * (this.obj.currentPage - 1),
          this.obj.pagesize * this.obj.currentPage
        );
      } else
        return this.tableData.slice(
          this.obj.pagesize * (this.obj.currentPage - 1),
          this.obj.pagesize * this.obj.currentPage
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