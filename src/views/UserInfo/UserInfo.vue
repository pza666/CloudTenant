<template>
  <el-main>
    <!-- 顶部面包屑 -->
    <bread-crumb :navData="navData"></bread-crumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 顶部搜索用户模块 -->
      <el-row :gutter="36">
        <el-col :span="10">
          <el-input placeholder="请输入要查询的用户名" @clear="clearInput" clearable v-model="username">
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
          <template slot-scope="{row}">
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

    <!-- 修改用户信息模块 -->
    <el-dialog title="修改信息" :visible.sync="editUserDialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="userInfoForm" ref="userInfoRef" :rules="userInfoRules" label-width="80px">
        <el-form-item required disabled label="手机号" prop="phone">
          <el-input type="number" v-model="userInfoForm.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="nickname">
          <el-input type="text" v-model="userInfoForm.nickname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleDetermine">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>
<script>
import { userInfo, searchUser, deleteUser, editUser } from "@/axios/userApi.js";
import _ from "lodash";
export default {
  name: "UserInfo",
  data() {
    return {
      navData: ["用户管理", "用户列表"],
      username: "", // 要查询的用户名
      userData: [], // 表格数据对象
      total: 10, // 数据总条目
      pageNum: 1, // 当前页码值
      pageSize: 15, // 当前页面显示的数据条数
      userInfoForm: {}, // 当前修改的用户的对应信息
      editNickname: "", // 待修改的nickname
      userInfoRules: {
        nickname: [
          { required: true, message: "请输入您的用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      }, // 修改用户信息的校验规则
      editUserDialogVisible: false, // 控制修改用户弹出框的显示与隐藏
    };
  },
  computed: {
    // 计算页面数据如果不足一页以上的时候隐藏分页器
    SorH() {
      return this.pageSize >= this.total ? true : false;
    },
  },
  watch: {
    username() {
      if (!this.username.replaceAll(" ", "")) {
        this.getUserInfo(this.pageNum, this.pageSize);
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 封装了初次渲染和查询数据时的弹出框
    getInfo(data, msg, getOrQuery) {
      let { data: userData, status, total } = data;
      if (status !== 200) {
        return this.$message({
          type: "error",
          message: msg,
        });
      }
      this.userData = userData;
      this.total = total;
      this.$message({
        type: "success",
        message: `${getOrQuery}用户信息成功，共有${total}条数据！`,
      });
    },
    // 获取用户数据的回调
    async getUserInfo(pageNum = 1, pageSize = 15) {
      // 在删除功能的时候，已经计算好了最新的页码值，所以这里将最新值赋予形参即可
      pageNum = this.pageNum;
      pageSize = this.pageSize;
      console.log(pageNum);
      const { data } = await userInfo(pageNum, pageSize);
      this.getInfo(data, "获取用户信息数据失败!", "获取");
    },
    // 查询用户名的回调
    handleSearch: _.throttle(async function (
      event,
      pageNum = 1,
      pageSize = 15
    ) {
      if (!this.username.replaceAll(" ", "")) {
        this.$message("请输入用户名再点击查询!");
        return;
      }
      this.pageNum = pageNum;
      this.pageSize = pageSize;
      let { data } = await searchUser(
        this.username,
        this.pageNum,
        this.pageSize
      );
      this.getInfo(data, "查询用户信息数据失败!", "查询");
    },
    500),
    // 清除文本框的回调
    clearInput() {
      this.getUserInfo();
    },
    // 页码值发生改变调用该回调
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      if (!this.username.replaceAll(" ", "")) {
        this.getUserInfo(pageNum, this.pageSize);
      } else {
        this.handleSearch("", pageNum, this.pageSize);
      }
    },
    // 页面显示条目个数发生改变调用该回调
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (!this.username.replaceAll(" ", "")) {
        this.getUserInfo((this.pageNum = 1), pageSize);
      } else {
        this.handleSearch("", (this.pageNum = 1), pageSize);
      }
    },
    // 修改用户信息的回调handledeleteUser
    handleEditUser(userInfo) {
      // 直接赋值是浅拷贝数据会随着一起改动，这里只有一层用扩展也是深拷贝，并且能防止数据回显
      this.userInfoForm = { ...userInfo };
      this.editNickname = userInfo.nickname;
      this.editUserDialogVisible = true;
    },
    // 确认修改用户信息的回调
    handleDetermine() {
      // 在点击确定的时候对表单进行验证，如果不通过直接返回出去，不发送请求
      this.$refs.userInfoRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 1、先结构出需要用来修改的数据
        let { phone, nickname } = this.userInfoForm;
        // 2、判断是否有修改过元素，如果和原来的用户名一样不发请求
        if (this.editNickname !== nickname.replaceAll(" ", "")) {
          // 进来了就说明修改了，发请求更新
          let { data } = await editUser(phone, nickname);
          let { row, status } = data;
          // 更新完成功后提示用户
          if (status === 200) {
            this.$message({
              type: "success",
              message: `您当前成功修改了${row}条数据!`,
            });
            // 3、到这里表示可能是搜索的用户修改的用户名，做判断
            if (!this.username.replaceAll(" ", "")) {
              // 如果搜索框为空的话，说明没有搜索，发请求获取信息，并停留在原来的页码
              this.getUserInfo();
            } else {
              // 反之通过关键字定位到原来搜索的数据位置
              this.handleSearch();
            }
          }
        }
        this.editUserDialogVisible = false;
      });
    },
    // 删除用户信息的回调
    handledeleteUser(userInfo) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { phone } = userInfo;
          let { data } = await deleteUser(phone);
          this.$message({
            type: "success",
            message: `删除成功!共删除${data.row}条数据`,
          });
          // 如果不重新声明的话每次回退的时候，切换页码的函数会监听到，监听到后就会赋一个原来的值，导致修改无效
          const pageNum =
            this.userData.length === 1
              ? this.pageNum === 1
                ? 1
                : this.pageNum--
              : this.pageNum;
          this.getUserInfo(pageNum);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 关闭修改用户信息弹出框的回调
    handleClose() {
      this.$refs.userInfoRef.validate((valid) => {
        if (!valid) {
          this.$message({
            type: "error",
            message: "请输入对应格式的用户信息!",
          });
        } else {
          this.$refs.userInfoRef.resetFields();
          this.userInfoForm = {};
          this.editUserDialogVisible = false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped></style>