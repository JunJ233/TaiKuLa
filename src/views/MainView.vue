<!-- eslint-disable quotes -->
<template>
   <!-- <div class="background-video" >
    <video id="backgroundVideo" class="video" autoplay muted loop>
      <source :src="videoSource" type="video/mp4" />
      Your browser does not support the video tag.
    </video> -->
  <div class="main">
    <div class="inner">
      <div class="innerL">
        <div class="welcome">
          <p>WELCOME TO NPM &nbsp;分析包</p>
        </div>
      </div>
      <div class="innerR">
        <el-divider
          class=npmsousuo
          content-position="center"
        >N P M 包 搜 索</el-divider>
        <el-row>
          <el-col>
            <!-- 搜索框 -->
            <el-input
             class="search"
              v-model.trim="input"
              size="large"
              placeholder="find package"
              clearable
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="12"
            :offset="5"
            style="padding-top: 8%"
          >
            <el-button
              size="large"
              type="primary"
              class="button"
              @click="handleSearch"
              round
              style="font-size: 25px; width: 100%;height: 100%"
            >搜 索</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="12"
            :offset="5"
            style="padding-top: 8%"
          >
            <el-button
              size="large"
              type="primary"
              class="button"
              @click="handleShowAll"
              round
              style="font-size: 25px; width: 100%; height: 100%"
            >展示全部依赖</el-button>
          </el-col>
        </el-row>
        <el-divider
          class="taikula"
          content-position="center"
        >泰酷辣</el-divider>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
// eslint-disable-next-line quotes, semi
// import { ref, onMounted } from "vue";
import { ref } from 'vue'
// eslint-disable-next-line quotes, semi
import { useRouter } from "vue-router";
// import upLoad from "./src/components/upLoad"
// import { UploadFilled } from "@element-plus/icons-vue";
// eslint-disable-next-line quotes
const input = ref("")
const router = useRouter()

// const videoSource = ref('../assets/video.mp4')
// onMounted(() => {
//   const video = document.getElementById('backgroundVideo')
//   if (video) {
//     video.play()
//   }
// })

const handleSearch = () => {
  router.push({
    // eslint-disable-next-line quotes
    path: "/DataDisplay",
    query: {
      name: input.value
      // eslint-disable-next-line comma-dangle
    },
    // eslint-disable-next-line semi
  });
}

const handleShowAll = () => {
  router.push({
    // eslint-disable-next-line quotes
    path: "/DataDisplay"
    // eslint-disable-next-line semi
  });
}

</script>

<style scoped>
.main {
  background-image: linear-gradient(to right, rgb(53, 152, 193) 50%, rgb(18, 42, 66) 50%);
  width: 98vw;
  height: 100wh;
  display: flex;
  opacity: 0.55; /* 设置透明度为 60% */
  margin: auto;
}
.inner {
  margin: auto;
  width: 60vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.4); /* 调整子元素的背景色透明度为 40% */
  position: relative;
  border-radius: 22px;
}

.innerL {
  position: absolute;
  width: 33vw;
  height: 85vh;
  margin-left: calc(-20%);
  margin-top: calc(5%);
  background-color: rgba(19, 54, 92, 0.6); /* 调整背景色透明度为 60% */
  border-radius: 22px;
}
.welcome {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #f9eeee;
  font-size: 48px;
  font-family: "华文琥珀";

}
.innerR {
  width: 50vw;
  height: 100vh;
  margin-left: calc(30%);
  padding: 5%;
}
.button {
  margin-left: 18px;

}
.taikula {
  margin-top: 390px;
}
.npmsousuo {
  margin-bottom: 200px;
}
/* .div.el-row{
  width: 100vw;
} */
</style>
