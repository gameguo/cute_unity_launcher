<template>
  <div id="index">
    <el-container>
      <el-header height="40px">
        <img
          src="@/renderer/assets/logo.png"
          draggable="false"
          align="absmiddle"
        />
        <span class="headTitle">Cute Launcher</span>
        <el-button class="headClick" type="text" @click="githubClick()"
          >github</el-button
        >
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-col>
            <!-- @select="handleSelect" -->
            <el-menu
              default-active="/project"
              class="el-menu-vertical-demo"
              router
            >
              <el-menu-item index="/project">
                <i class="el-icon-folder"></i>
                <span slot="title">项目</span>
              </el-menu-item>
              <el-menu-item index="/editor">
                <i class="el-icon-menu"></i>
                <span slot="title">编辑器</span>
              </el-menu-item>
              <el-menu-item index="/setting">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-container>
          <el-main><router-view /></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    githubClick() {
      window.remote.shell.openExternal(
        "https://github.com/gameguo/cute_unity_launcher"
      );
    },
  },
};
</script>

<style>
.el-header .headClick {
  float: right;
  height: 30px;
  color: #000000;
}
.el-header .headTitle {
  text-align: center;
  font-weight: 500;
  color: #000000;
  line-height: 30px;
}
.el-header img {
  height: 90%;
}
.el-header {
  /* border-radius: 30px; */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-app-region: drag;
  background-color: #ffffff;
  /* -webkit-app-region: drag; */
  z-index: 10;
}

.el-aside {
  background-color: #ffffff;
  text-align: left;
  box-shadow: 0 2px 12px rgba(224, 224, 224, 0.12),
    0 0 6px rgba(56, 56, 56, 0.1);
  z-index: 5;
}
.el-menu-item [class^="el-icon-"] {
  margin-left: 10px;
}

.el-main {
  background-color: #f2f3f4;
  text-align: center;
}

#index,
.el-container {
  width: 100%;
  height: 100%;
}
</style>