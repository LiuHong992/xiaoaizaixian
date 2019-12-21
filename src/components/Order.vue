<template>
  <div>
    <el-card class="box-card">
      <el-table class="el__table" :data="orderData" style="width: 100%;">
        <el-table-column prop="num" label="Order_No" width="300"></el-table-column>
        <el-table-column prop="price" label="Price" width="180">
          <template slot-scope="scope">
            ￥{{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.status === 0">pendding</el-tag>
            <el-tag type="success" v-if="scope.row.status === 1">success</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderData: []
      // statuss:[]
    };
  },
  components: {},
  methods: {
    getOrder() {
      this.$axios
        .req("/orderData")
        .then(res => {
          this.orderData = res.data;
          // console.log(this.orderData[0].status);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getOrder();
  },
  watch: {},
  computed: {
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
</style>