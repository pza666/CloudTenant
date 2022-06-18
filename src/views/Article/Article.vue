<template>
  <el-main>
    <!-- 顶部面包屑 -->
    <bread-crumb :navData="navData"></bread-crumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 顶部搜索用户模块 -->
      <el-row :gutter="36">
        <el-col :span="10">
          <el-input placeholder="请输入想查询的房源关键词" clearable v-model="housename" @clear="clearInput">
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
  name: "article",
  data() {
    return {
      navData: ["房源审核", "房源发布"],
      housename: "", // 要查询的房子名称关键词
      houseData: [], // 房子信息列表
      total: 0,
      pageNum: 1,
      pageSize: 15,
    };
  },
  computed: {
    // 计算页面数据如果不足一页以上的时候隐藏分页器
    SorH() {
      return this.pageSize >= this.total ? true : false;
    },
  },
  created() {
    this.getHouseInfo();
  },
  methods: {
    // 获取初始化租房信息
    async getHouseInfo() {
      const {
        data: {
          code,
          data: { records, total },
        },
      } = await houseInfo(this.pageNum, this.pageSize, "0", "2");
      if (code === 200) {
        this.$message.success(`获取数据成功，一共有${total}条数据`);
        this.houseData = records;
        this.total = total;
      }
    },
    // 改变页面显示条目数回调
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getHouseInfo();
    },
    // 改变当前页码回调
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getHouseInfo();
    },
    // 处理状态的回调
    statusHandler({ id }) {
      this.$confirm("确定下架该房源吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const {
            data: { code },
          } = await removeHouse(id);
          if (code === 200) {
            this.$message.success("删除成功");
            this.getHouseInfo();
          }
        })
        .catch(() => this.$message.info("取消下架"));
    },
    // 清除文本框回调
    clearInput() {},
    // 搜索房源信息的回调
    handleSearch() {},
  },
};
</script>
<style lang="less" scoped>
</style>