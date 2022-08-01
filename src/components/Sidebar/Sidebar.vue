<template>
  <!-- 侧边栏主体区域 -->
  <el-container>
    <!-- 左侧侧边栏 -->
    <el-aside>
      <div class="toggle-button" @click="isCollapse = !isCollapse">|||</div>
      <el-menu router :default-active="$route.path.replace('/','')" unique-opened class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#2295ff" text-color="#fff" active-text-color="#fdbd09">
        <!-- 每一个侧边栏的大项 -->
        <el-submenu v-for="item in sidebarList" :key="item.id" :index="item.id">
          <template slot="title">
            <i class="icon1 iconfont" :class="item.iconName"></i>
            <span>{{item.name}}</span>
          </template>
          <!-- 外边大项循环完，循环内部的侧边栏项，每一个小项是为一组，将图标和名字绑在一起 -->
          <el-menu-item v-for="item1 in item.children" :key="item1.routeName" :index="item1.routeName">
            <i class="icon2 iconfont" :class="item1.iconName1"></i>
            <span>{{item1.childrenName}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <!-- 右侧主页如果是 home 路由时显示的内容： -->
    <el-main v-show="$route.path=='/home'">
      <h1 class="title">欢迎来到云租客的后台管理系统</h1>
      <el-row>
        <el-col :span="12">
          <el-card shadow="hover">
            <header class="headerInfo">
              <img class="imgLogo" title="631全都对" alt="631全都对" src="@/assets/logo.png">
              <div class="hInfo">
                <h1>云租客</h1>
                <p>云租客后台管理系统，包含：后台权限、用户信息、房源信息、房源审核</p>
              </div>
            </header>
            <article class="articlerInfo">
              <div class="aInfo">
                <p>上次登录时间：</p>
                <!-- 登录的时候直接读取上次设置好的最新时间 -->
                <p>{{loginTime}}</p>
              </div>
              <div class="aInfo">
                <p>上次登录地点：</p>
                <p>广东省 广州市</p>
              </div>
            </article>
            <footer class="footerInfo">
              <p><span class="fTitle">团队成员：</span>彭梓岸</p>
              <p><span class="fTitle">联系方式：</span>187********</p>
              <p><span class="fTitle">电子邮箱：</span>122*******@qq.com</p>
              <p><span class="fTitle">产品理念：</span>云租客是一家垂直具有单一性的房地产网络平台；是一个以技术为驱动，以用户为核心，注重房源真实和经纪人信誉的专业的房屋租售平台。</p>
            </footer>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div ref="mainEchart" style="width: 600px;height:480px;"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <!-- 右侧其他路由页面：路由占位符 -->
    <router-view></router-view>
  </el-container>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      isCollapse: false, // 控制
      sidebarList: [
        {
          id: "1",
          iconName: "icon-background-management",
          name: "后台权限",
          children: [
            {
              routeName: "admininfo",
              iconName1: "icon-admin",
              childrenName: "管理员",
            },
          ],
        },
        {
          id: "2",
          iconName: "icon-users",
          name: "用户管理",
          children: [
            {
              routeName: "userinfo",
              iconName1: "icon-user-info",
              childrenName: "用户信息",
            },
          ],
        },
        {
          id: "3",
          iconName: "icon-house",
          name: "房源信息",
          children: [
            {
              routeName: "lease",
              iconName1: "icon-rent-house",
              childrenName: "租赁房源",
            },
            {
              routeName: "secondhand",
              iconName1: "icon-secondary",
              childrenName: "二手房源",
            },
          ],
        },
        {
          id: "4",
          iconName: "icon-audit",
          name: "房源审核",
          children: [
            {
              routeName: "issue",
              iconName1: "icon-near-info",
              childrenName: "房源发布",
            },
          ],
        },
      ], // 侧边栏数据
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(this.$refs.mainEchart);
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: "周浏览量",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["小程序", "视频广告", "直接访问", "搜索引擎"],
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          // dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["bar", "stack", "tiled"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      // 可成计算视图
      // calculable: true,
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "小程序",
          type: "line",
          stack: "总量",
          data: [20, 32, 10, 13, 9, 23, 50],
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          data: [30, 22, 21, 15, 19, 33, 52],
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          data: [32, 32, 31, 66, 39, 33, 32],
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          data: [10, 21, 16, 9, 13, 16, 8],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  computed: {
    loginTime() {
      return localStorage.getItem("loginTime")
        ? localStorage.getItem("loginTime")
        : "欢迎第一次来到这个界面！";
    },
  },
};
</script>

<style lang="less" scoped>
// 侧边栏图标
/deep/ .el-submenu__title {
  padding-left: 13px !important;
}
.el-container {
  height: 100vh;
}
/* 首页主题内容区域样式 */
.el-main {
  background-color: #eaedf1;
  // 欢迎标题的样式
  .title {
    margin-left: 20px;
    font-size: 30px;
  }
  // 团队上面内容信息
  .headerInfo {
    display: flex;
    align-items: center;
    // 用padding才能把底部的线给挤下去，margin在外，border在margin内
    padding-bottom: 26px;
    border-bottom: 2px solid #eee;

    // 团队上面内容中图片logo的样式
    .imgLogo {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 30px;
      background-color: #2295ff;
    }
    // 团队上半部分中的信息样式
    .hInfo h1:first-child {
      font-size: 28px;
      text-align: center;
    }
    .hInfo p:last-child {
      font-size: 20px;
      text-indent: 2em;
      margin-top: 12px;
    }
  }
  // 团队中间内容信息
  .articlerInfo {
    // 用padding才能把底部的线给挤下去，margin在外，border在margin内
    padding-bottom: 26px;
    border-bottom: 2px solid #eee;
    // 控制前半部分
    .aInfo {
      display: flex;
      margin-top: 26px;
      // 控制后半部分
      p:first-child {
        margin-right: 70px;
        font-weight: 800;
      }
    }
  }
  // 团队下面内容信息
  .footerInfo {
    margin-top: 26px;
    p {
      padding: 6px 0;
      .fTitle {
        font-weight: 800;
      }
    }
  }
}

/* 侧边栏样式 */
.el-aside {
  width: auto !important;
  height: 100%;
  background: rgba(#2295ff, 0.6);

  /* 需要重置菜单列表突出来的 .0625rem 右边框像素值就不会有突兀了 */
  .el-menu {
    border-right: none;

    /* 大项图标颜色 */
    .icon1 {
      color: #eee;
      font-size: 26px;
      margin: 0 16px 0 5px;
      text-align: center;
    }
  }
}

/* 三条竖的样式 ||| */
.toggle-button {
  height: 50px;
  background-color: #2273ff;
  font-size: 20px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  /* 设置 字符 间的间距： */
  letter-spacing: 0.2em;
  cursor: pointer;
}

/* 小项图标颜色 */
.icon2 {
  color: #eee;
  font-size: 18px;
  margin-right: 10px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

/* 利用样式穿透来将图标修改成指定颜色 */
/deep/ .el-icon-arrow-down:before {
  content: "\e6df";
  color: #eee;
}
</style>