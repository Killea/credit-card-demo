<template>
  <div class="shopbody">
    <el-row>
      <el-col :span="4" style="height:1px"></el-col>
      <el-col :span="16">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">📃 Customer Info</el-menu-item>
          <el-menu-item index="2">🚢 Shipping Info</el-menu-item>
          <el-menu-item index="3">💳 Payment</el-menu-item>
        </el-menu>
        <!-- using v-if to show the other components here -->
        <Payment v-if="activeIndex=='3'" />
        <div v-if="activeIndex=='2'">Shipping info</div>
        <div v-if="activeIndex=='1'">Customer info</div>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>
<script>
import Payment from "./ShopBodyPayment.vue";
export default {
  components: {
    Payment
  },
  data() {
    return {
      activeIndex: "3"
    };
  },
  methods: {
    // change pages
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      console.log(key, keyPath, this.activeIndex);
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>