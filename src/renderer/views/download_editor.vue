<template>
  <div class="flexContainer">
    <header>
      <div class="contentTitle">下载编辑器</div>
    </header>
    <div class="contentContent"></div>
    <footer>
      <div class="contentBottom">
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
  name: "download_editor",
  methods: {
    backClick() {
      this.$router.replace("/editor");
    },
  },
  mounted() {},
  data() {
    return {};
  },
};
</script>
