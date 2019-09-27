<template>
  <div id="app">
    <Header />
    <ShopBody/>
   

    
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import ShopBody from "./components/ShopBody.vue";
export default {
  name: "app",
  components: {
    Header,
    ShopBody
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
