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
          :cell-class-name="getCellIndex"
        >
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="项目名称"
          ></el-table-column>
          <el-table-column prop="version" label="编辑器版本" width="150">
          </el-table-column>
          <el-table-column prop="mtime" label="最后打开" width="140">
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
      <div class="contentBottom"></div>
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
  position: relative;
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
    rowStyle({ row, column, rowIndex, columnIndex }) {
      var style = "";
      if (columnIndex < this.handleIndex) {
        return style + "cursor:pointer";
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
    this.handleIndex = 3;
  },
  data() {
    return {
      tableData: [
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
        {
          name: "testProjectName",
          version: "2019.4.10f1",
          mtime: "1天前",
        },
      ],
    };
  },
};
</script>
