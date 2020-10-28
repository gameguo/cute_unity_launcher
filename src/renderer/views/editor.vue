<template>
  <div class="flexContainer">
    <header>
      <div class="contentTitle">编辑器</div>
    </header>
    <div class="contentContent">
      <div class="row-item">
        <el-table
          :data="tableData"
          @cell-click="rowClick"
          height="100%"
          style="width: 100%"
          :cell-style="rowStyle"
          :header-cell-style="rowHeaderStyle"
          :cell-class-name="getCellIndex"
        >
          <el-table-column
            show-overflow-tooltip
            prop="version"
            label="编辑器版本"
            min-width="100px"
            width="180px"
          ></el-table-column>
          <el-table-column
            prop="path"
            label="安装路径"
            min-width="100px"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="menu"
            label=""
            scoped-slot
            width="60"
            min-width="60px"
            show-overflow-tooltip
          >
            <template>
              <div style="text-overflow: clip">
                <el-button size="mini" icon="el-icon-more" round></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <footer>
      <div class="contentBottom">
        <el-button class="contentBottomBtn" type="primary" round>
          下载
        </el-button>
        <el-button class="contentBottomBtn" type="info" round>添加</el-button>
      </div>
    </footer>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contentContent .row-item {
  position: absolute;
  width: 100%;
  height: calc(100%);
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
  name: "editor",
  methods: {
    rowStyle({ row, column, rowIndex, columnIndex }) {
      var style = "";
      if (columnIndex < this.handleIndex) {
        return style + "padding-left:10px;cursor:pointer;";
      } else {
        return style;
      }
    },
    rowHeaderStyle({ row, column, rowIndex, columnIndex }) {
      var style = "";
      if (columnIndex < this.handleIndex) {
        return style + "padding-left:10px;";
      } else {
        return style;
      }
    },
    getCellIndex({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
    rowClick(row, column, cell, event) {
      if (column.index >= this.handleIndex) return;
      console.log(row);
      // console.log(row.name, row);
    },
  },
  mounted() {
    this.handleIndex = 2;
  },
  data() {
    return {
      tableData: [
        {
          version: "Unity - 2018.4.27f1",
          path: "E:\\Development\\Soft\\Unitys\\2018.4.27f1\\Unity\\Editor",
        },
      ],
    };
  },
};
</script>
