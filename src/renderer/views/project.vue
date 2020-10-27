<template>
  <div class="flexContainer">
    <header>
      <div class="contentTitle">项目</div>
    </header>
    <div class="contentContent">
      <header>
        <div class="row">
          <div class="name">项目名称</div>
          <div class="version">编辑器版本</div>
          <div class="mtime">最后打开</div>
          <div class="operation"></div>
        </div>
      </header>
    </div>
    <footer>
      <div class="contentBottom"></div>
    </footer>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contentContent .row {
  padding: 0 10px;
  white-space: nowrap;
  margin: 10px;
  display: flex;
  line-height: 40px;
  z-index: 100;
  background-color: blueviolet;
  height: 40px;
  cursor: pointer;
}
.contentContent .name {
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
.contentContent .version {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 160px;
}
.contentContent .mtime {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 160px;
}
.contentContent .operation {
  width: 50px;
}

.flexContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.contentTitle {
  margin: 10px 10px 0px 10px;
  height: 40px;
  background-color: white;
  padding-left: 20px;
  text-align: left;
  line-height: 40px;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.contentContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 10px 10px 0px 10px;
  background-color: aqua;
  overflow: hidden;
}
.contentBottom {
  margin: 10px;
  height: 40px;
  background-color: bisque;
}
</style>

<script>
export default {
  name: "project",
  methods: {
    getWidth: function () {
      return document.body.clientWidth - 180 + "px";
    },
    getHeight: function () {
      return document.body.clientHeight - 120 + "px";
    },
    setHeight: function () {
      this.tableHeight = this.getHeight();
      this.tableWidth = this.getWidth();
    },
  },
  mounted() {
    this.setHeight();
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        window.screenWidth = document.body.clientWidth;
        this.setHeight();
        this.getWidth();
      })();
    };
  },
  data() {
    return {
      tableWidth: this.getWidth(),
      tableHeight: this.getHeight(),
    };
  },
};
</script>
