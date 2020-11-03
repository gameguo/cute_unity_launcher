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
            label="编辑器版本"
            width="140px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.version }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="projectVersion"
            label="安装路径"
            min-width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.path }}</span>
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
          @click="dowmloadEditorClick"
          style="margin-left: 10px; margin-right: 10px"
        >
          下载
        </el-button>
        <el-button
          class="contentBottomBtn"
          type="info"
          round
          @click="addEditorClick"
          >添加</el-button
        >
      </div>
    </footer>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
export default {
  name: "editor",
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
      var path = row.path;
      console.log(path);
      window.remote.shell.showItemInFolder(path);
    },
    openContextMenu(row) {
      var that = this;
      this.context_menu.openEditorMenu(
        function () {
          // window.remote.shell.openExternal(row.projectPath);
          var path = row.path;
          console.log(path);
          window.remote.shell.showItemInFolder(path);
        },
        function () {
          that.editor.requestUninstallEditor(row.path);
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
    addEditorClick() {
      this.common_event.selectFolder(null, (path) => {
        if (path) {
          this.editor.requestImportEditor(path);
        }
      });
    },
    dowmloadEditorClick() {
      this.$router.replace("/download_editor");
    },
  },
  watch: {
    listEditorData(val) {
      this.tableData = this.$store.state.editors;
    },
  },
  computed: {
    listEditorData() {
      return this.$store.state.editors;
    },
  },
  mounted() {
    this.handleIndex = 2;
  },
  data() {
    return {
      tableData: this.$store.state.editors,
    };
  },
};
</script>
