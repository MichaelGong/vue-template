<style lang="scss" scoped>
@import "../../../assets/css/mix.scss";
$width: px2rem2(45);
.header {
    width: 100%;
    height: $headerHeight;
    background: $colorRed;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    line-height: $headerHeight;
    &-back {
        width: $width;
        height: 100%;
        background: url("../../../assets/img/back.png") no-repeat;
        background-size: px2rem2(12.5);
        background-position: center center;
        position: absolute;
        left: 0;
        top: 0;
    }
    &-title {
        height: 100%;
        font-size: px2rem2(17);
        color: #fff;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
        padding: 0 px2rem2(60);
        display: block;
    }
    &-right {
        position: absolute;
        right: 0;
        top: 0;
        min-width: $width;
        height: 100%;
    }
}
</style>
<template>
<header class="header">
    <div class="header-back" @click="goBack"></div>
    <div class="header-title">{{title}}</div>
    <div class="header-right">
        <slot></slot>
    </div>
</header>
</template>
<script>
import bridge from '../../../util/bridge';

export default {
    name: 'vheader',
    props: {
        title: { // 标题
            type: String,
        },
    },
    methods: {
        goBack() {
            try {
                bridge.goBack();
            } catch (error) {
                this.$router.go(-1);
            }
        },
        rightClick() {
            if (this.rightCb) {
                this.rightCb();
            }
        },
    },
};
</script>
