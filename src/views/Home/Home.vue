<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <img class="logoImg" src="@/assets/logo.png" title="云租客后台管理系统" alt="云租客后台管理系统">
      <span class="cloud-tenant">云租客后台管理系统</span>
      <el-button @click="logout">退出</el-button>
    </el-header>

    <!-- 侧边栏及中间内容区域 -->
    <Sidebar></Sidebar>
  </el-container>
</template>
<script>
import dayjs from "dayjs";
import Sidebar from "@/components/Sidebar/Sidebar";
export default {
  name: "Home",
  components: {
    Sidebar,
  },
  methods: {
    // 退出登录的回调
    logout() {
      // 在退出的时候判断是否存在上次的时间，存在的话移除，设置最新的时间，下次登录直接读取即可
      if (localStorage.getItem("loginTime")) {
        // 退出时如果已存在上次的时间，移除设置这次退出的时间，设置最新的时间
        localStorage.removeItem("loginTime");
      }
      localStorage.setItem("loginTime", dayjs().format("YYYY-MM-DD HH:mm:ss"));
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="less" scoped>
.el-container {
  background-color: #eaedf1;

  /* logo样式 */
  .logoImg {
    width: 100px;
    height: 100px;
  }

  /* 顶部背景、文字和按钮的样式 */
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2295ff;
    height: 80px !important;

    .cloud-tenant {
      font-size: 30px;
      color: #eee;
    }

    .el-button {
      font-size: 16px;
      color: #2295ff;
      font-weight: 700;
    }
  }
}
</style>