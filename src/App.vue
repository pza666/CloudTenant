<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'App'
  }
</script>
<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }

  .el-card {
    margin: 20px;
  }

  .el-table {
    margin: 20px 0;
  }

  /* 分页器样式 */
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #fdbd09 !important;
  }

  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background: #2295ff !important;
    color: #fff !important;
  }
</style>