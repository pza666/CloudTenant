<template>
  <el-main>
    <!-- 顶部面包屑 -->
    <bread-crumb :navData="navData"></bread-crumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 顶部搜索用户模块 -->
      <el-row :gutter="36">
        <el-col :span="10">
          <el-input placeholder="请输入要查询的用户名" clearable v-model="username">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 中间表格数据 -->
      <el-table :data="userData" border style="width: 100%">
        <el-table-column align="center" label="#" type="index"></el-table-column>
        <el-table-column align="center" label="手机号" prop="phone"></el-table-column>
        <el-table-column align="center" label="用户名" prop="nickname"></el-table-column>
        <el-table-column align="center" label="用户ID" prop="openid"></el-table-column>
        <el-table-column align="center" label="微信号" prop="weixin"></el-table-column>
        <el-table-column align="center" label="头像" prop="avatarUrl"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scoped">
            <el-tooltip effect="dark" content="修改信息" placement="top">
              <el-button icon="el-icon-edit" size="mini" type="primary" @click="addOrEdit('修改管理员',scoped.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button icon="el-icon-delete" size="mini" type="danger" @click="deleteAdmin(scoped.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页器 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :hide-on-single-page="SorH" background :current-page="pageNum" :page-sizes="[5, 20, 25, 30]" :page-size="pageSize"
        layout="->, total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </el-main>
</template>
<script>
import { userInfo } from "@/axios/userApi.js";
export default {
  name: "UserInfo",
  data() {
    return {
      navData: ["用户管理", "用户列表"],
      username: "", // 要查询的用户名
      userData: [], // 表格数据对象
      total: 10, // 数据总条目
      pageNum: 1, // 当前页码值
      pageSize: 5, // 当前页面显示的数据条数
    };
  },
  computed: {
    // 计算页面数据如果不足一页以上的时候隐藏分页器
    SorH() {
      return this.pageSize >= this.total ? true : false;
    },
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户数据的回调
    async getUserInfo() {
      const { data } = await userInfo(this.pageNum, this.pageSize);
      let { data: userData, status, total } = data;
      if (status !== 200) {
        return this.$message({
          type: "error",
          message: "获取用户信息数据失败！",
        });
      }
      this.userData = userData;
      this.total = total;
      this.$message({
        type: "success",
        message: "成功获取用户信息！",
      });
    },
    // 查询用户名的回调
    handleSearch() {},
    // 页码值发生改变调用该回调
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getUserInfo();
    },
    // 页面显示条目个数发生改变调用该回调
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getUserInfo();
    },
  },
};
</script>
<style lang="less" scoped></style>