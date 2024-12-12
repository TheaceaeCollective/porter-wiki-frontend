<script setup>
const props = defineProps({
    size: {
        type: String,
        default: 'big'
    }
});
</script>

<template>
    <div :class="'wiki-logo size-' + size">
        <img src="@/assets/images/icon.png" alt="Porter Robinson Wiki Icon" />
        <h1 class="font-['Batang']">potaro • wiki</h1>
    </div>
</template>

<style lang="scss">
.wiki-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    user-select: none;
    -webkit-user-select: none;

    &.size-small {
        img {
            width: 34px;
            height: 34px;
        }

        h1 {
            font-size: 27px;
        }
    }

    &.size-big {
        img {
            width: 54px;
            height: 54px;
        }

        h1 {
            font-size: 50px;
        }
    }
}
</style>