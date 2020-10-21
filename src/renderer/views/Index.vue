<template>
  <div id="index">
    <el-container>
      <el-header class="titlebar" style="height: 40px">
        <span class="titleSpan">Cute Launcher</span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col>
            <el-menu
              default-active="0"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="0">
                <i class="el-icon-menu"></i>
                <span slot="title">项目</span>
              </el-menu-item>
              <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                <span slot="title">编辑器</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.titleSpan {
  color: rgb(239, 29, 94);
  font-size: 20px;
}
.titlebar {
  -webkit-app-region: drag;
}
.el-header,
.el-footer {
  background-color: #ffffff;
  text-align: center;
  line-height: 40px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>