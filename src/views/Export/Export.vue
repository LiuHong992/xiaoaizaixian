<template>
  <div>
    <!-- 模糊搜索 -->
    <input class="serchipt" type="text" placeholder="请搜索" v-model="keywords" />
    <!-- 分页展示的数据 -->
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
    <pagings :tableData="jsondata" :paging="obj"></pagings>
    <!-- 导出excel（csv+xls格式） -->
    <div class="flex">
      <download-excel
        class="export-excel-wrapper"
        :before-finish="finishDownload"
        :data="tableData0"
        :fields="json_fields"
        name="商品表格.xls"
        type="xls"
      >
        <el-button type="warning" icon="el-icon-download" circle></el-button>
      </download-excel>
      <download-excel
        class="export-excel-wrapper"
        :before-finish="finishDownload"
        :data="tableData0"
        :fields="json_fields"
        name="商品表格.csv"
        type="csv"
      >
        <el-button type="primary" icon="el-icon-download" circle></el-button>
      </download-excel>
    </div>
  </div>
</template>

<script>
import pagings from "../../components/Pagings/Pagings";
export default {
  data() {
    return {
      // 用来规定导出的excel文档的相关字段的规则
      json_fields: {
        // "Complete name": "name", //常规字段
        // Telephone: "phone.mobile", //支持嵌套属性
        // "Telephone 2": {
        //   field: "phone.landline",
        //   //自定义回调函数
        //   callback: value => {
        //     return `Landline Phone - ${value}`;
        //   }
        // }
        名称: "NAME",
        商品编号: "GOODS_SERIAL_NUMBER",
        原价: "ORI_PRICE",
        现价: "PRESENT_PRICE"
      },
      // 页面展示的分页数据
      jsondata: [],
      // 导出的excel格式（推荐为gb2312或者utf-8）
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " GB18030 "
          }
        ]
      ],
      // 获取到的原表格数据（以下变量为Paging页面相同数据（注：应该有更佳的解决方案））
      yarr: [],
      keywords: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {},
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
          this.jsondata = res.data;
          this.yarr = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    finishDownload() {
      this.$message({
        message: "文件导出成功",
        type: "success"
      });
    },
    // 删除操作
    del(item0) {
      this.jsondata = this.jsondata.filter(item => {
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
      this.obj.currentPage = 1;
      this.jsondata = [];
      this.jsondata = this.yarr.filter(item => {
        return JSON.stringify(
          item.NAME +
            item.GOODS_SERIAL_NUMBER +
            item.ORI_PRICE +
            item.PRESENT_PRICE
        ).includes(val);
      });
    }
  },
  computed: {
    tableData0() {
      if (this.keywords === "") {
        return this.jsondata.slice(
          this.obj.pagesize * (this.obj.currentPage - 1),
          this.obj.pagesize * this.obj.currentPage
        );
      } else
        return this.jsondata.slice(
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
.export-excel-wrapper {
  margin-top: 20px;
  margin-left: 20px;
}
</style>