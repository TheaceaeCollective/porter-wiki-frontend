<script setup>
import GradientLine from '@/components/GradientLine.vue';

const props = defineProps({
    stats: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="home-stats min-w-64 w-64 h-40 bg-background-1 rounded-lg">
        <div class="flex flex-col h-full p-5 gap-1">
            <h3 class="text-xl font-semibold leading-5">Wiki Statistics</h3>
            <GradientLine />
            <div class="flex flex-col h-full leading-5">
                <div class="stat">
                    <h2>Articles</h2>
                    <h3>{{ stats.articles }}</h3>
                </div>
                <div class="stat">
                    <h2>Comments</h2>
                    <h3>{{ stats.comments }}</h3>
                </div>
                <div class="stat">
                    <h2>Unique Visits</h2>
                    <h3>{{ stats.visits }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.home-stats {
    .stat {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;

        h3 {
            font-weight: var(--font-weight-semibold);
        }
    }
}
</style>