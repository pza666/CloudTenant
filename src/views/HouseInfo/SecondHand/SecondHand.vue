<template>
  <el-main>
    <!-- 顶部面包屑 -->
    <bread-crumb :navData="navData"></bread-crumb>
    <!-- 卡片视图区域 -->
    <el-card class="secondhandBody">
      开发中，敬请期待......
    </el-card>
  </el-main>
</template>
<script>
export default {
  name: "secondhand",
  data() {
    return {
      navData: ["房源信息", "二手房源"],
    };
  },
};
</script>
<style lang="less" scoped>
.secondhandBody {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  height: 600px;
}
</style>