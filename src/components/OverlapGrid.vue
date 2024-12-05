<template>
    <div class="overlap-grid">
        <slot></slot>
    </div>
</template>

<style>
.overlap-grid {
    display: grid;
    overflow: hidden;

    > * {
        width: 100%;
        height: inherit;
        grid-area: 1 / 1;
        z-index: 1;
    }
}
</style>