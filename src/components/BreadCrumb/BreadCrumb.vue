<template>
  <!-- 主题内容的面包屑，根据父组件动态传值来决定顶部面包屑显示什么 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in navData" :key="item">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: "BreadCrumb",
  props: ["navData"],
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  font-size: 18px;
  margin: 16px 0 16px 20px;
}
</style>