<template>
  <div class="top">
    <el-button class="content-container" @click="handleBack">回到搜索页←</el-button>
  </div>
  <div class="page-container">

  </div>
  <div>
    <Chart></Chart>
  </div>
</template>
<script setup>
// eslint-disable-next-line quotes
import { useRouter } from "vue-router"
// eslint-disable-next-line quotes
import Chart from "../components/Chart.vue"

const router = useRouter()

const handleBack = () => {
  router.push('/')
}
</script>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}
.content-container {
  margin-top: -50px; /* Remove default margin */
}
.top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
}
</style>
