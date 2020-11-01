<template>
  <div class="flexContainer">
    <header>
      <div class="contentTitle">创建项目</div>
    </header>
    <div class="contentContent">
      <div>编辑器版本</div>
      <div>模板</div>
      <div class="createInput">
        <div class="createInputTitle">项目名称 :</div>
        <el-input
          class="createInputInput"
          placeholder=""
          v-model="projectNameInput"
          type="text"
          spellcheck="false"
        >
        </el-input>
      </div>
      <div class="createInput">
        <div class="createInputTitle">位置 :</div>
        <el-input
          class="createInputInput"
          placeholder=""
          v-model="projectPathInput"
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
.createInputInput {
  flex: 1;
}
.createInputTitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  padding-right: 10px;
  width: 80px;
}
.createInput {
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
      console.log("TODO create");
    },
    selectProjectFolder() {
      let that = this;
      this.common_event.selectFolder(that.projectPathInput, (path) => {
        that.projectPathInput = path;
        console.log(path);
      });
    },
  },
  mounted() {},
  data() {
    return {
      projectNameInput: "NewProject",
      projectPathInput: "C:\\",
    };
  },
};
</script>
