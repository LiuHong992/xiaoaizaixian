<template>
  <div>
    <div class="reg">
      <Registers></Registers>
    </div>
  </div>
</template>

<script>
import Registers from "../../components/Registers";
export default {
  data() {
    return {};
  },
  components: {
    Registers
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.reg {
  position: absolute;
  width: 100%;
  height: 100%;
  // height: 1000px;
  background: url("../../assets/images/bg.jpg") no-repeat;
  background-size: cover;
}
</style>