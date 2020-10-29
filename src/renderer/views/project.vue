<template>
  <div class="flexContainer">
    <header>
      <div class="contentTitle">项目</div>
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
            prop="proejctName"
            label="项目名称"
            min-width="100px"
          ></el-table-column>
          <el-table-column prop="proejctVersion" label="编辑器版本" width="150">
          </el-table-column>
          <el-table-column prop="projectMTime" label="最后打开" width="140">
            <template slot-scope="scope">
              <span>{{ utils.getDateStr(scope.row.projectMTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="menu" label="" scoped-slot width="60">
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
          新建
        </el-button>
        <el-button class="contentBottomBtn" type="info" round>导入</el-button>
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
  name: "project",
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
    updateProject() {
      this.tableData = window.projects;
    },
  },
  mounted() {
    this.handleIndex = 3;
    this.data_listence.projectDataChange.push(this.updateProject);
  },
  data() {
    return {
      tableData: window.projects,
    };
  },
};
</script>
