<template>
  <el-main>
    <!-- 顶部面包屑 -->
    <bread-crumb :navData="navData"></bread-crumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 顶部搜索用户模块 -->
      <el-row :gutter="36">
        <el-col :span="10">
          <el-input placeholder="请输入想查询的二手房源" clearable v-model="housename" @clear="clearInput">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 中间表格数据 -->
      <el-table :data="houseData" border style="width: 100%">
        <el-table-column align="center" label="#" type="index"></el-table-column>
        <el-table-column align="center" label="手机号" prop=""></el-table-column>
        <el-table-column align="center" label="用户名" prop=""></el-table-column>
        <el-table-column align="center" label="用户ID" prop=""></el-table-column>
        <el-table-column align="center" label="微信号" prop=""></el-table-column>
        <el-table-column align="center" label="头像" prop=""></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <!-- 修改或删除用户的操作按钮 -->
            <el-tooltip effect="dark" content="修改信息" placement="top">
              <el-button icon="el-icon-edit" size="mini" type="primary" @click="handleEditUser(row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button icon="el-icon-delete" size="mini" type="danger" @click="handledeleteUser(row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页器 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :hide-on-single-page="SorH" background :current-page="pageNum" :page-sizes="[15, 20, 25, 30]" :page-size="pageSize"
        layout="->, total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </el-main>
</template>
<script>
export default {
  name: "secondhand",
  data() {
    return {
      navData: ["房源信息", "二手房源"],
      housename: "", // 要查询的房子名称关键词
      houseData: [], // 房子信息列表
    };
  },
  methods: {
    // 清除文本框回调
    clearInput() {},
    // 搜索房源信息的回调
    handleSearch() {},
  },
};
</script>
<style lang="less" scoped>
</style>