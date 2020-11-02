<template>
  <div id="app">
    <Index />
  </div>
</template>

<style>
.el-table__body tr > td {
  font-size: 13px;
  color: #0e0e0e;
}
.el-table__body tr:hover > td {
  background-color: #ef1d5e !important;
  color: #ffffff;
}

html,
body {
  background: rgb(255, 255, 255);
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  flex-direction: column;
  position: relative;
  -webkit-user-select: none;
  overflow-x: hidden;
  overflow-y: hidden;
}

button {
  -webkit-app-region: no-drag;
}

#app {
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  height: 12px;
  width: 12px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  border: 2px solid transparent;
  background-color: #463e403f;
  background-clip: content-box;
  transition: background-color 0.3s;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #ef1d5fda;
}
</style>

<script>
// @ is an alias to /src
import Index from "@/renderer/views/Index.vue";

export default {
  name: "App",
  components: {
    Index,
  },
};
</script>
