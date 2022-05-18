<template>
  <el-main>
    <bread-crumb :navData="navData"></bread-crumb>
  </el-main>
</template>
<script>
export default {
  name: "lease",
  data() {
    return {
      navData: ["房源信息", "租赁房源"],
    };
  },
};
</script>
<style lang="less" scoped>
</style>