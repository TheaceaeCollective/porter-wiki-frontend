<script setup>
const props = defineProps({
    size: {
        type: String,
        default: 'big'
    }
});
</script>

<template>
    <div :class="'wiki-logo size-' + size ">
        <img src="@/assets/images/icon.png" alt="Camellia Wiki Icon" />
        <h1 class="font-light">Camellia • Wiki</h1>
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
            width: 32px;
            height: 32px;
        }

        h1 {
            font-size: 24px;
        }
    }

    &.size-big {
        img {
            width: 52px;
            height: 52px;
        }

        h1 {
            font-size: 48px;
        }
    }
}
</style>