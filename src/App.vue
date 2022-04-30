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
</style>