<template>
  <div>
    <Backtop>
      <router-view></router-view>
    </Backtop>
  </div>
</template>
<script>
import Backtop from "../src/components/Backtop/Backtop";
export default {
  components: {
    Backtop
  }
};
</script>

<style lang="scss">
@import "../src/styles/common";
body {
  margin: 0;
  padding: 0;
}
.flex{
  display: flex;
}
.textcenter{
  text-align: center;
}
</style>
