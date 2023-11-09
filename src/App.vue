<template>
  <div class="app">
    <!-- 视频作为背景 -->
    <div class="background-video">
      <video id="backgroundVideo" class="video" autoplay muted loop>
        <source :src="videoSource" type="video/mp4" />
      </video>
    </div>
    <!-- router-view 用来渲染当前路由的组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoSource: 'src/assets/video.mp4' // 你的视频文件路径
    }
  }
  // 可能有其他的逻辑或生命周期钩子等
}
</script>

<style>
.app {
  position: relative;
}

.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; /* 放在最底层 */
}

.video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
</style>
