<template>
  <div>
    <pagings></pagings>

    <div class="flex">
      <download-excel
        class="export-excel-wrapper"
        :before-finish="finishDownload"
        :data="jsondata"
        :fields="json_fields"
        name="商品表格.xls"
        type="xls"
      >
        <el-button type="warning" icon="el-icon-download" circle></el-button>
      </download-excel>
      <download-excel
        class="export-excel-wrapper"
        :before-finish="finishDownload"
        :data="jsondata"
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
      jsondata: [],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
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
    }
  },
  mounted() {
    this.getTable();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.export-excel-wrapper {
  margin-top: 20px;
  margin-left: 20px;
}
</style>