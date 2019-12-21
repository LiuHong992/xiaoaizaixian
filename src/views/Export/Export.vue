<template>
  <div>
    <pagings></pagings>

    <download-excel
      class="export-excel-wrapper"
      :before-finish="finishDownload"
      :data="jsondata"
      :fields="json_fields"
      name
    >
      <el-button type="warning" icon="el-icon-download" circle></el-button>
    </download-excel>
  </div>
</template>

<script>
import pagings from "../../components/Pagings";
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
    getTable() {
      this.$axios
        .req("/tableData")
        .then(res => {
          this.jsondata = Array.from(res.data);
          // this.yarr = res.data;
          // this.pageChange();
          // console.log(this.jsondata[0].PRESENT_PRICE);
          // console.log(this.jsondata[0].PRESENT_PRICE);
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
}
</style>