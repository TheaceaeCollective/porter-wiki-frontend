<script setup>
import { reactive, ref } from 'vue';
import { PhCheckFat } from '@phosphor-icons/vue';

import Events from '@/utils/Events';
import ActiveComponents from '@/utils/ActiveComponents';
import Button from '@/components/Button.vue';

const props = defineProps({
    event: {
        type: String,
        required: true
    }
});

const sidebarContent = ref();

const sidebarReact = reactive({
    open: false,
});

Events.Register('notificationoverlay', () => {
    sidebarReact.open = true;
    document.body.classList.add("overflow-hidden");
    ActiveComponents.open('notificationoverlay');
});

Events.Register('notificationoverlay-close', () => {
    ClosePopup(true);
    Events.Emit('notificationoverlay-closeComplete');
});

function ClosePopup(fromEmitted, event) {
    if (!fromEmitted && event) {
        if (!event.target.classList.contains("backdrop-blur-sm")) return;
    };
    if (fromEmitted != true) return ActiveComponents.close();
    sidebarReact.open = false;
    document.body.classList.remove("overflow-hidden");
}
</script>

<template>
    <Transition name="fade">
        <div class="z-50 flex fixed inset-0 justify-end items-center min-w-screen min-h-screen top-0 py-24 bg-opacity-25 backdrop-blur-sm overflow-y-scroll"
            v-if="sidebarReact.open" @click="e => ClosePopup(null, e)">
            <div class="z-0 min-w-sm h-screen bg-background-1/90 backdrop-blur-sm theShadow rounded-xl flex flex-col p-5 gap-1"
                ref="sidebarContent">
                test
            </div>
        </div>
    </Transition>
</template>

<style>
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 150ms, transform 300ms;

    >div {
        transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
}

.overlay-leave-to,
.overlay-enter-from {
    opacity: 0;

    >div {
        transform: scale(.95);
    }
}

.theShadow {
    box-shadow: 0 32px 40px 0 rgba(0, 0, 0, 0.24), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1);
}
</style>
