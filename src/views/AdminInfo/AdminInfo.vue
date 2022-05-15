<template>
  <el-main>
    <!-- 面包屑区域 -->
    <bread-crumb :navData="navData"></bread-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 顶部搜索与添加管理员模块 -->
      <el-row :gutter="36">
        <el-col :span="10">
          <el-input placeholder="请输入要查询的管理人员" clearable v-model="adminname">
            <el-button type="primary" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </el-col>
        <el-button type="primary" @click="addOrEdit('添加管理员')">添加管理员</el-button>
      </el-row>
      <!-- 中间表格数据 -->
      <el-table border :data="adminData">
        <el-table-column align="center" label="#" type="index"></el-table-column>
        <el-table-column align="center" label="姓名" prop="name"></el-table-column>
        <el-table-column align="center" label="邮箱地址" prop="email"></el-table-column>
        <el-table-column align="center" label="手机号码" prop="phone"></el-table-column>
        <el-table-column align="center" label="职位权限" prop="postition"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scoped">
            <el-switch v-model="scoped.row.status>1" @change="handlestatusChange(scoped.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scoped">
            <el-tooltip effect="dark" content="修改信息" placement="top">
              <el-button icon="el-icon-edit" size="mini" type="primary" @click="addOrEdit('修改管理员',scoped.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="修改密码" placement="top">
              <el-button icon="el-icon-setting" size="mini" type="warning" @click="addOrEdit('修改密码',scoped.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button icon="el-icon-delete" size="mini" type="danger" @click="deleteAdmin(scoped.row)">
              </el-button>>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页器 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :hide-on-single-page="SorH" :page-sizes="[2, 10, 15, 20]" :page-size="pageSize"
        layout="->, total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加或更新管理员模块，给每一个表单项设置宽度就会在一行否则是两行显示，也可在 form 添加 inline 成表单内联 -->
    <el-dialog @close="resetForm" :title="title" :visible.sync="dialogFormVisible" width="50%">
      <el-form ref="adminInfoRef" :rules="adminInfoRules" :model="adminInfo" label-width="80px">
        <el-form-item label="手机号码" prop="phone">
          <el-input :disabled="title=='修改管理员'" v-model="adminInfo.phone" placeholder="请输入您的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="adminInfo.name" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="adminInfo.email" placeholder="请输入您的邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="职位权限" prop="postition">
          <el-input v-model="adminInfo.postition" placeholder="请输入您的权限职务"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="handleForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码模块 -->
    <el-dialog @close="resetForm" :title="title" :visible.sync="dialogPasswordFormVisible" width="50%">
      <el-form ref="passwordInfoRef" :rules="passwordInfoRules" :model="passwordInfo" label-width="80px">
        <el-form-item label="手机号码" prop="phone">
          <el-input disabled v-model="passwordInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPasswd">
          <el-input v-model="passwordInfo.oldPasswd" placeholder="请输入您的旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPasswd">
          <el-input v-model="passwordInfo.newPasswd" placeholder="请输入您的新密码"></el-input>
        </el-form-item>
        <el-form-item label="再次输入" prop="new1Password">
          <el-input v-model="passwordInfo.new1Password" placeholder="请再输入一次"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="handleEditPasswordForm">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>
<script>
export default {
  name: "AdminInfo",
  data() {
    // 合并写法
    var check = (rule, value, cb) => {
      if (rule.field == "phone") {
        // 验证手机号的正则表达式
        const regMobile =
          /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (regMobile.test(value)) {
          return cb();
        }
        cb(new Error("请输入合法的手机号"));
      } else {
        // 验证邮箱的正则表达式
        const regEmail =
          /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (regEmail.test(value)) {
          return cb();
        }
        cb(new Error("请输入合法的邮箱"));
      }
    };
    // // 验证邮箱的规则
    // var checkEmail = (rule, value, cb) => {
    //     // 验证邮箱的正则表达式
    //     const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    //     if (regEmail.test(value)) {
    //         return cb()
    //     }
    //     cb(new Error('请输入合法的邮箱'))
    // }
    // // 验证手机号的规则
    // var checkphone = (rule, value, cb) => {
    //     console.log(rule);
    //     // 验证手机号的正则表达式
    //     const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    //     if (regMobile.test(value)) {
    //         return cb()
    //     }
    //     cb(new Error('请输入合法的手机号'))
    // }
    return {
      navData: ["后台管理", "管理员"], // 面包屑文字数据
      title: "",
      total: 0, // 页面数据总条目数
      pageSize: 10, // 每一页显示多少条数据
      pageSize: 2, // 控制每一页显示的条目数
      pageNum: 1, // 当前页码值，默认为1
      adminname: "", // 搜索的管理员名
      adminData: [], // 表格数据
      dialogFormVisible: false, // 控制添加管理员弹出框的显示与隐藏
      adminInfo: {
        name: "",
        email: "",
        phone: "",
        postition: "",
      }, // 添加的管理管理员信息
      adminInfoRules: {
        // 第一个对象校验的是否输入了值，第二个对象是校验输入的值是否合法
        name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入您的邮箱地址", trigger: "blur" },
          { validator: check, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入您的手机号码", trigger: "blur" },
          { validator: check, trigger: "blur" },
        ],
        postition: [
          { required: true, message: "请输入您的权限职务", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
      }, // 添加管理管理员信息时的表单校验
      dialogPasswordFormVisible: false, // 控制修改密码弹出框的显示与隐藏
      passwordInfo: {
        phone: "",
        oldPasswd: "",
        newPasswd: "",
      }, // 重置密码的表单信息
      passwordInfoRules: {
        oldPasswd: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        newPasswd: [
          { required: true, message: "请输入您的新密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        new1Password: [
          { required: true, message: "请输入您的新密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    // 计算页面数据如果不足一页以上的时候隐藏分页器
    SorH() {
      return this.pageSize >= this.total ? true : false;
    },
  },
  mounted() {
    this.getadminInfoList();
  },
  methods: {
    // 获取管理管理员列表信息，默认是第一页并且取5条数据
    async getadminInfoList(pageNum = 1, pageSize = 5) {
      // 切换页码和切换条目数时，重新设置页码数和每页取多少条数据
      pageNum = this.pageNum;
      pageSize = this.pageSize;
      // 1、解构获取到的数据
      const { data } = await this.$request(
        `admin/index?currentPage=${pageNum}&sizePage=${pageSize}`
      );
      const { data: dataList, code } = data;
      const { records, total } = dataList;

      // 2、判断状态码是否为200，不是的话返回一个错误信息
      if (code !== 200) {
        return this.$message({
          type: "error",
          message: "获取管理管理员数据失败！",
        });
      }
      // 3、是的话提示管理员后赋值给对应的变量
      this.$message({
        type: "success",
        message: "获取管理管理员数据成功！",
      });
      this.adminData = records;
      this.total = total;
    },
    // 处理查询管理员操作
    handleSearch() {
      // console.log(this.adminname)
      console.log(this.adminInfo);
    },
    // 处理状态按钮改变的回调
    async handlestatusChange(adminInfo) {
      let { status, phone } = adminInfo;
      status = status == 1 ? 2 : 1;
      const { data } = await this.$request.post(
        `admin/upStatus?phone=${phone}&status=${status}`
      );
      if (data.code === 200) {
        this.$message({
          type: "success",
          message: "修改管理用户权限成功!",
        });
        this.getadminInfoList();
      } else {
        this.$message({
          type: "error",
          message: "修改失败，请稍后再试!",
        });
      }
    },
    // 提交表单数据发请求
    handleForm() {
      this.$refs.adminInfoRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        await this.$request.post("admin/saveOrUp", this.adminInfo);
        this.getadminInfoList();
        this.dialogFormVisible = false;
      });
    },
    // 重置表单校验结果以及清除数据
    resetForm() {
      // 如果是修改密码的话重置表单并返回退出该函数
      if (this.title === "修改密码") {
        this.dialogPasswordFormVisible = false;
        this.passwordInfo = {
          phone: "",
          oldPasswd: "",
          newPasswd: "",
        };
        this.$refs.passwordInfoRef.resetFields();
        return;
      }
      // 如果不是修改密码模块的话，判断是否为添加管理员模块，是的话清空，不是的话直接关闭
      this.dialogFormVisible = false;
      // 因为做多了一层浅拷贝，所以原对象和传入的对象已不是同一个，移除数据和校验结果并不会有数据出错的问题
      this.$refs.adminInfoRef.resetFields();
    },
    // 页面显示条目个数发生改变调用该回调
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getadminInfoList(pageSize);
    },
    // 页码切换获取最新页码并且赋值重新发请求
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getadminInfoList(pageNum);
    },
    // 添加管理员、修改管理员、修改密码的回调处理
    addOrEdit(title, adminInfo = null) {
      this.title = title;
      // 如果不在添加管理员中清空对应的数据的话，先点击修改管理员后会将数据赋值到管理员信息对象，
      // 再点击添加管理员会有回显，所以每次进入时都要清空一下
      if (title === "添加管理员") {
        this.adminInfo = {
          name: "",
          email: "",
          phone: "",
          postition: "",
        };
        this.dialogFormVisible = true;
      } else if (title === "修改管理员") {
        // 因为只有一层对象，所以要做扩展运算为浅拷贝，否则数据会有误
        this.adminInfo = { ...adminInfo };
        this.dialogFormVisible = true;
        return;
      } else if (title === "修改密码") {
        this.passwordInfo.phone = adminInfo.phone;
        this.dialogPasswordFormVisible = true;
      }
    },
    // 修改管理员密码的确定按钮回调
    handleEditPasswordForm() {
      this.$refs.passwordInfoRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          const { oldPasswd, newPasswd, new1Password } = this.passwordInfo;
          if (oldPasswd !== this.adminData[0].password) {
            this.$message({
              type: "error",
              message: "旧密码输入有误，请重新输入!",
            });
          } else if (newPasswd !== new1Password) {
            this.$message({
              type: "error",
              message: "新密码不一致，请重新输入!",
            });
          } else if (this.adminData[0].password === newPasswd) {
            this.$message({
              type: "error",
              message: "新密码不能与旧密码重复，请重新输入!",
            });
          } else {
            const { data } = await this.$request.post(
              "admin/editPasswd",
              this.passwordInfo
            );
            this.$message({
              type: "success",
              message: "密码修改成功!",
            });
            this.getadminInfoList();
            this.dialogPasswordFormVisible = false;
          }
        }
      });
    },
    // 删除管理员账号的回调
    deleteAdmin(adminInfo) {
      this.$confirm("此操作将删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async (res) => {
          const { data } = await this.$request.post(
            `admin/delete?phone=${adminInfo.phone}`
          );
          if (res === "confirm") {
            console.log();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getadminInfoList(
              this.adminData.length == 1
                ? this.pageNum <= 1
                  ? 1
                  : this.pageNum--
                : this.pageNum
            );
          } else {
            this.$message({
              type: "info",
              message: "取消删除!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败!",
          });
        });
    },
  },
};
</script>
<style lang="less" scoped></style>