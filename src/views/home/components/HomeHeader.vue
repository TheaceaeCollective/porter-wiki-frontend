<script setup>
import WikiLogo from '@/components/WikiLogo.vue';
</script>

<template>
    <div class="home-header">
        <WikiLogo />
        <h4 class="text-center">Where most of Camellia’s work is documented. Including the fandom.</h4>
    </div>
</template>

<style lang="scss">
.home-header {
    width: 100%;
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    
    background-color: var(--background-3);
    background: url('/src/assets/images/home-header.png') no-repeat center center / cover;
    border-radius: 10px;
    overflow: hidden;

    h4 {
        font-size: 20px;
    }
}
</style>