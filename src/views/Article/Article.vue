<template>
  <el-main>
    <bread-crumb :navData="navData"></bread-crumb>
  </el-main>
</template>
<script>
export default {
  name: "article",
  data() {
    return {
      navData: ["房源审核", "房源发布"],
    };
  },
};
</script>
<style lang="less" scoped>
</style>