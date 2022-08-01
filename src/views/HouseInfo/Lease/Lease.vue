<template>
  <el-main>
    <!-- 顶部面包屑 -->
    <bread-crumb :navData="navData"></bread-crumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 顶部搜索用户模块 -->
      <el-row :gutter="36">
        <el-col :span="10">
          <el-input placeholder="请输入想查询的租赁房源" clearable v-model="housename" @clear="clearInput">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 中间表格数据，row-click 处理点击表格行时的回调 -->
      <el-table :data="houseData" border style="width: 100%">
        <el-table-column align="center" label="#" type="index" width="60"></el-table-column>
        <el-table-column align="center" label="发布人" prop="houseNickname"></el-table-column>
        <el-table-column align="center" label="房屋类型" prop="houseTitle"></el-table-column>
        <el-table-column align="center" label="房屋配置" prop="doorModel"></el-table-column>
        <el-table-column align="center" label="房屋坐标" prop="houseAddress"></el-table-column>
        <el-table-column align="center" label="发布时间" prop="houseTime">
          <template slot-scope="{row}">
            {{row.houseTime|dayForMat}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="房屋状态" prop="houseStatus">
          <template slot-scope="{row}">
            <el-switch v-model="row.houseStatus===2" @change="statusHandler(row)"></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页器 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :hide-on-single-page="SorH" background :current-page="pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"
        layout="->, total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </el-main>
</template>
<script>
import { houseInfo, removeHouse } from "@/axios/leaseApi.js";
import dayjs from "dayjs";
export default {
  name: "secondhand",
  data() {
    return {
      navData: ["房源信息", "租赁房源"],
      housename: "", // 要查询的房子名称关键词
      houseData: [], // 房子信息列表
      total: 0,
      pageNum: 1,
      pageSize: 5,
    };
  },
  // 局部过滤器，格式化时间
  filters: {
    dayForMat(value) {
      if (!value) return "";
      // dayjs中传格式化的值，format格式化的日期格式
      return dayjs(value).format("YYYY-MM-DD mm:hh:ss");
    },
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
      console.log(records);
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
      this.$confirm("是否下架该房源？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const {
            data: { code },
          } = await removeHouse(id);
          if (code === 200) {
            this.$message.success("下架成功");
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