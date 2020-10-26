<template>
  <div class="flexContainer">
    <div class="contentTitle">项目</div>
    <el-table :data="tableData" :height="tableHeight" id="projectTable" border>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flexContainer {
  width: 100%;
  height: 100%;
}
.contentTitle {
  height: 40px;
  background-color: white;
  padding-left: 20px;
  text-align: left;
  line-height: 40px;
  font-size: 20px;
}
#projectTable {
  padding-right: 20px;
  margin: 20px;
}
</style>

<script>
export default {
  name: "project",
  methods: {
    getHeight: function () {
      return document.body.clientHeight - 120 + "px";
    },
    setHeight: function () {
      this.tableHeight = this.getHeight();
    },
    getTableData: function () {
      return [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ];
    },
  },
  mounted() {
    this.setHeight();
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        this.setHeight();
      })();
    };
  },
  data() {
    return {
      tableHeight: this.getHeight(),
      tableData: this.getTableData(),
    };
  },
};
</script>
