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
          @row-contextmenu="rowContextmenu"
          height="100%"
          style="width: 100%"
          :cell-style="rowStyle"
          :header-cell-style="rowHeaderStyle"
          :cell-class-name="getCellIndex"
        >
          <el-table-column
            show-overflow-tooltip
            prop="projectName"
            label="项目名称"
            min-width="100px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.projectName }}</span>
              <br />
              <span class="rowLink">{{ scope.row.projectPath }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="projectVersion" label="编辑器版本" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.projectVersion }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="projectMTime" label="最后修改" width="120">
            <template slot-scope="scope">
              <span>{{ utils.getDateStr(scope.row.projectMTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="menu" label="" scoped-slot width="60">
            <template slot-scope="scope">
              <div style="text-overflow: clip">
                <el-button
                  size="mini"
                  icon="el-icon-more"
                  round
                  @click="clickMenuBtn(scope.row)"
                ></el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="empty" label="" scoped-slot width="30">
            <template> </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <footer>
      <div class="contentBottom">
        <el-button
          class="contentBottomBtn"
          type="primary"
          round
          @click="createProjectClick"
          style="margin-left: 10px; margin-right: 10px"
        >
          新建
        </el-button>
        <el-button
          class="contentBottomBtn"
          type="info"
          round
          @click="importProjectClick"
          >导入</el-button
        >
        <el-button
          class="contentBottomBtn"
          type="info"
          round
          @click="refreshProjectClick"
          >刷新</el-button
        >
      </div>
    </footer>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-table__body tr:hover > td .rowLink {
  color: #ffffff;
}
.el-table__body tr .rowLink {
  color: #555555;
  font-size: 12px;
}
</style>

<script>
export default {
  name: "project",
  methods: {
    rowStyle({ row, column, rowIndex, columnIndex }) {
      var style =
        "border-bottom-style:solid;border-width:1px;border-color:#999999;";
      if (rowIndex == 0) {
        style += "border-top-style:solid;";
      }
      if (columnIndex == 0) {
        style += "padding-left:10px;";
      }
      if (columnIndex != this.handleIndex) {
        style += "cursor:pointer;";
      }
      return style;
    },
    rowHeaderStyle({ row, column, rowIndex, columnIndex }) {
      var style = "";
      if (columnIndex == 0) {
        return style + "padding-left:10px";
      }
      return style;
    },
    getCellIndex({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
    rowClick(row, column, cell, event) {
      if (column.index == this.handleIndex) return;
      this.project.requestStartProject(row);
    },
    openContextMenu(row) {
      var that = this;
      this.context_menu.openProjectMenu(
        function () {
          // window.remote.shell.openExternal(row.projectPath);
          var path = row.projectPath;
          console.log(path);
          window.remote.shell.showItemInFolder(path);
        },
        function () {
          that.project.requestDeleteProject(row);
        },
        function () {
          that.project.requestSelectVersionOpenProject(row);
        }
      );
    },
    rowContextmenu(row, column, event) {
      // 阻止右键默认行为
      event.preventDefault();
      this.$nextTick(() => {
        this.openContextMenu(row);
      });
    },
    clickMenuBtn(row) {
      this.$nextTick(() => {
        this.openContextMenu(row);
      });
    },
    refreshProjectClick() {
      this.project.requestProject();
    },
    importProjectClick() {
      this.project.requestImportProject();
    },
    createProjectClick() {
      this.$router.replace("/create_project");
    },
  },
  watch: {
    listProjectData(val) {
      this.tableData = this.$store.state.projects;
    },
  },
  computed: {
    listProjectData() {
      return this.$store.state.projects;
    },
  },
  mounted() {
    this.handleIndex = 3;
  },
  data() {
    return {
      tableData: this.$store.state.projects,
    };
  },
};
</script>
