<template>
  <div class="flexContainer">
    <div class="contentTitle">项目</div>
    <div class="contentContent" ref="tablewrap">
      <el-table
        :data="tableData"
        :height="tableHeight"
        id="projectTable"
        border
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flexContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.contentTitle {
  height: 40px;
  background-color: white;
  padding-left: 20px;
  text-align: left;
  line-height: 40px;
  font-size: 20px;
}
.contentContent {
  flex: 1;
  background-color: coral;
  margin: 10px;
}
</style>

<script>
export default {
  name: "project",
  mounted() {
    this.tableHeight = window.getComputedStyle(this.$refs.tablewrap).height;
    console.log(
      window.getComputedStyle(this.$refs.tablewrap).height +
        " " +
        this.tableHeight
    );
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.screenHeight = window.screenHeight;
      })();
    };
  },
  watch: {
    screenHeight(val, oldVal) {
      this.tableHeight = window.getComputedStyle(this.$refs.tablewrap).height;
      console.log(
        window.getComputedStyle(this.$refs.tablewrap).height +
          " " +
          this.tableHeight
      );
    },
  },
  data() {
    return {
      screenHeight: document.body.clientHeight,
      tableHeight: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
};
</script>
