<template>
  <div id="app">
    <Index />
  </div>
</template>

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
