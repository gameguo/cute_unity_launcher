<template>
  <div class="flexContainer">
    <header>
      <div class="contentTitle">创建项目</div>
    </header>
    <div class="contentContent">
      <div class="createRowItem">
        <div class="createRowItemTitle">编辑器版本 :</div>
        <el-select
          size="small"
          v-model="projectVersionValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in projectVersionOptions"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="createRowItem">
        <div class="createRowItemTitle">模板 :</div>
        <el-radio-group v-model="projectTemplateValue" size="small">
          <el-radio-button label="2D"></el-radio-button>
          <el-radio-button label="3D"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="createRowItem">
        <div class="createRowItemTitle">项目名称 :</div>
        <el-input
          class="createRowItemContent"
          placeholder=""
          v-model="projectNameInput"
          type="text"
          spellcheck="false"
        >
        </el-input>
      </div>
      <div class="createRowItem">
        <div class="createRowItemTitle">位置 :</div>
        <el-input
          class="createRowItemContent"
          placeholder=""
          v-model="projectPathInput"
          type="text"
          spellcheck="false"
        >
          <el-button
            type="text"
            slot="suffix"
            class="el-input__icon el-icon-more"
            @click="selectProjectFolder"
          ></el-button>
        </el-input>
      </div>
    </div>
    <footer>
      <div class="contentBottom">
        <el-button
          class="contentBottomBtn"
          type="primary"
          round
          @click="createProjectClick"
        >
          创建
        </el-button>
        <el-button class="contentBottomBtn" type="info" round @click="backClick"
          >返回</el-button
        >
      </div>
    </footer>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.createRowItemContent {
  flex: 1;
}
.createRowItemTitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  font-size: 15px;
  padding-right: 10px;
  width: 90px;
}
.createRowItem {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}
.flexContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
}
.contentTitle {
  margin: 0;
  /* margin: 10px 10px 0px 10px; */
  height: 40px;
  background-color: white;
  padding: 2px 20px;
  text-align: left;
  line-height: 40px;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.contentContent {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
}
.contentBottom {
  display: flex;
  flex-direction: row-reverse;
  align-items: center; /* 垂直居中 */
  margin: 10px;
  height: 40px;
  padding-right: 20px;
  background-color: white;
}
.contentBottomBtn {
  height: 35px;
  width: 100px;
  margin-right: 10px;
  text-align: center;
}
</style>

<script>
export default {
  name: "project",
  methods: {
    backClick() {
      this.$router.replace("/project");
    },
    createProjectClick() {
      if (!this.projectVersionValue) {
        this.common_event.openMessageBoxWarning("提示", "请选择编辑器版本");
        return;
      }
      this.project.requestCreateProject({
        projectName: this.projectNameInput,
        projectPath: this.projectPathInput,
        projectVersion: this.projectVersionValue,
        template: this.projectTemplateValue,
      });
    },
    selectProjectFolder() {
      let that = this;
      this.common_event.selectFolder(that.projectPathInput, (path) => {
        that.projectPathInput = path;
        if (that.projectPathInput) {
          window.store.set("create_project_path", that.projectPathInput);
        }
      });
    },
  },
  mounted() {
    var defaultPath = window.store.get("create_project_path");
    if (defaultPath) {
      this.projectPathInput = defaultPath;
    }
  },
  data() {
    return {
      projectNameInput: "NewProject",
      projectPathInput: window.documentsPath,
      projectVersionOptions: [],
      projectVersionValue: "",
      projectTemplateValue: "2D",
    };
  },
};
</script>
