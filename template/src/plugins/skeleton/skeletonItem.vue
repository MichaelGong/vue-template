<template>
  <div class="skeletonItem"
    :style="{width: width, height: h, backgroundColor: bgColor, marginBottom: mb}"
  ></div>
</template>
<script>
export default {
  name: 'skeletonItem',
  props: {
    w: { // 宽度，可以是任意css的长度格式，也可以传入random，会产生10%-100%之间的数
      type: String,
      default: '100%',
    },
    h: { // 高度，可以是任意css的长度格式
      type: String,
      default: '15px',
    },
    bgColor: { // 背景颜色，可以是任意css颜色值
      type: String,
      default: '#f6f6f6',
    },
    mb: { // margin-bottom, 距离底部的距离，需自带单位
      type: String,
      default: '8px',
    },
  },
  computed: {
    width() {
      if (this.w === 'random') {
        return Math.floor((Math.random() * 90) + 10) + '%';
      }
      return this.w;
    },
  },
};
</script>
<style lang="scss" scoped>
.skeletonItem {
  position: relative;
}
</style>

