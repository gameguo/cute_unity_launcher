<template>
  <div class="flexContainer">
    <header>
      <div class="contentTitle">设置</div>
    </header>
    <div class="contentContent">content</div>
  </div>
</template>

<script>
export default {
  name: "setting",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
