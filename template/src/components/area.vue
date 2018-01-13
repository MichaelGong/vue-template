<style lang="scss" scoped>
@import "../../assets/css/mix.scss";
.area {
    $time: 0.5s;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 300;
    transition: all $time ease-in-out;
    &-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
        transition: all $time ease-in-out;
    }
    &-content {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        transition: all $time ease-in-out;
        &-header {
            width: 100%;
            height: px2rem2(45);
            line-height: px2rem2(45);
            text-align: center;
            font-weight: 500;
            background: $colorBg;
            color: $colorGray;
            font-size: $fontsizeMiddle;
        }
        &-close {
            width: px2rem2(45);
            height: px2rem2(45);
            position: absolute;
            top: 0;
            right: 0;
            background: url(../../assets/img/close.png) no-repeat;
            background-position: center;
            background-size: px2rem2(12);
        }
        &-section {
            background: #fff;
            width: 100%;
            height: px2rem2(50);
            line-height: px2rem2(50);
            position: relative;
            font-size: $fontsizeMiddleLarge;
            color: $colorGrayMiddle;
            padding: 0 $padding;
            white-space: nowrap;
            overflow-x: auto;
            @include one-bottom();
        }
        &-district {
            padding: 0 px2rem2(10);
            display: inline-block;
            position: relative;
            // margin-left: px2rem2(5);
            font-size: $fontsizeMiddle;
            &.active {
                color: $colorGray;
                &:after {
                    content: " ";
                    position: absolute;
                    left: 0;
                    bottom: 2px;
                    right: 0;
                    height: 2px;
                    background: $colorGray;
                    z-index: 100;
                }
            }
        }
        &-list {
            width: 100%;
            height: px2rem2(300);
            overflow-y: auto;
        }
        &-item {
            width: 100%;
            height: px2rem2(40);
            line-height: px2rem2(40);
            font-size: $fontsizeMiddle;
            color: $colorGray;
            padding: 0 $padding;
            position: relative;
            &.active {
                color: $colorRed;
                background: url("../../assets/img/mark.png") no-repeat;
                background-size: px2rem2(14);
                background-position: 96% center;
            }
        }
    }
}
.area-ani-enter {
    .area-content {
        // opacity: 0;
        transform: translateY(100%);
    }
    .area-bg {
        opacity: 0;
    }
}
.area-ani-leave-active {
    .area-content {
        // opacity: 0;
        transform: translateY(100%);
    }
    .area-bg {
        opacity: 0;
    }
}
</style>
<style lang="scss">
.areaLoading {
    .loading-inner {
        top: 70% !important;
    }
}
</style>
<template>
<transition name="area-ani">
<section class="area" v-show="currentValue">
    <div class="area-bg" @click="close"></div>
    <div class="area-content">
        <div class="area-content-header">所在地区</div>
        <div class="area-content-close" @click="close"></div>
        <div class="area-content-section">
            <div class="area-content-district"
                v-for="(item, index) in choosenList"
                :key="item.id"
                :class="{active: activeIndex == index}"
                @click="chooseType(item.leveltype, index)"
            >{{item.name}}</div>
            <div class="area-content-district"
                v-if="chooseIsShow"
                :class="{active: activeIndex == -1}"
            >请选择</div>
        </div>
        <div class="area-content-list">
            <div class="area-content-item"
                v-for="item in levelObj[nowLevel]"
                :key="item.id"
                @click="chooseItem(item)"
                :class="{active: item.isActive}"
            >{{item.name}}</div>
        </div>
    </div>
</section>
</transition>
</template>
<script>
import apis from '../../util/api';

// 该组件像外触发事件：arealist，
// <AreaSection v-model="areaIsShow" @arealist="getAreaList"></AreaSection>
export default {
    name: 'areaSec',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        onlyProvince: { // 是否只能选择省份
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentValue: false,
            choosenList: [], // 被选中的列表
            activeIndex: -1, // 当前地址级别的索引
            chooseIsShow: true, // 是否显示请选择选项
            levelObj: { // 根据级别存放的数据
                0: [],
                1: [],
                2: [],
                3: [],
            },
            nowLevel: 0, // 当前的级别
            MAX_LEVEL: 4, // 地址最大层数
        };
    },
    methods: {
        close() {
            this.currentValue = false;
        },
        chooseItem(item) {
            // 设置之前选中的状态为空
            this.levelObj[this.nowLevel].forEach((subitem) => {
                subitem.isActive = false;
            });
            // 设置当前的item为选中状态
            item.isActive = true;
            // 如果当前选中item不是之前选中的item中的，就移除这之后的被选中的item
            if (this.choosenList[this.nowLevel] &&
                (item.id !== this.choosenList[this.nowLevel].id)) { // 返回来重新选
                this.choosenList.splice(this.nowLevel, this.choosenList.length - this.nowLevel);
                for (let i = 1; i < (4 - this.nowLevel); i++) {
                    this.levelObj[this.nowLevel + i] = [];
                }
            }
            // 如果当前选中的item是之前选中的item中一部分，就不再需要请求接口
            // if (this.choosenList[this.nowLevel] &&
            //     (this.choosenList[this.nowLevel].id === item.id)) {
            //     if ((this.nowLevel + 1) >= this.MAX_LEVEL) {
            //         this.chooseIsShow = false;
            //         this.currentValue = false;
            //         this.emitInfo();
            //         this.activeIndex = this.choosenList.length - 1;
            //         return;
            //     }
            //     this.nowLevel++;
            //     if (this.nowLevel < this.choosenList.length) {
            //         this.activeIndex = this.nowLevel;
            //     } else {
            //         this.activeIndex = -1;
            //     }
            //     return;
            // }
            // 如果当前被选中的列表的长度等于nowLevel的值就展示“请选择”tab，否则隐藏
            if (this.choosenList.length === this.nowLevel) {
                this.chooseIsShow = true;
            } else {
                this.chooseIsShow = false;
            }
            // 将当前item添加到被选中的列表中
            this.$set(this.choosenList, this.nowLevel, {
                ...item,
                leveltype: this.nowLevel,
            });
            // 如果nowLevel + 1的值大于MAX_LEVEL 就隐藏 请选择
            if (((this.nowLevel + 1) >= this.MAX_LEVEL) || this.onlyProvince) {
                this.chooseIsShow = false;
                this.currentValue = false;
                this.emitInfo();
                return;
            }
            this.$loading.show('areaLoading');
            apis.getSubAddress({
                parentId: +item.id,
                level: +item.level,
            }).then((data) => {
                this.$loading.close();
                if (data.yaoSubAddressList && data.yaoSubAddressList.length > 0) {
                    this.nowLevel++;
                    if (this.nowLevel < this.choosenList.length) {
                        this.activeIndex = this.nowLevel;
                    } else {
                        this.activeIndex = -1;
                    }
                    this.levelObj[this.nowLevel] = data.yaoSubAddressList;
                } else {
                    this.emitInfo();
                    this.chooseIsShow = false;
                    this.currentValue = false;
                    this.activeIndex = this.choosenList.length - 1;
                }
            }).catch((errData) => {
                this.$loading.close();
                this.$toast(errData.msg);
            });
        },
        // 选择上方item
        chooseType(leveltype, index) {
            this.nowLevel = leveltype;
            this.activeIndex = index;
        },
        // 向上广播信息
        emitInfo() {
            this.$emit('arealist', this.choosenList);
        },
    },
    watch: {
        value(newValue) {
            this.currentValue = newValue;
        },
        currentValue(val) {
            this.$emit('input', val);
        },
    },
    created() {
        apis.getAllProvincesAddress().then((data) => {
            this.nowLevel = 0;
            this.levelObj[this.nowLevel] = data.allProvincesList || [];
            this.$loading.close();
        });
    },
};
</script>

