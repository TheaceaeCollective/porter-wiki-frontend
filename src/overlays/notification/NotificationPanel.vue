<script setup>
import { reactive, ref } from 'vue';
import { PhCheckFat } from '@phosphor-icons/vue';

import Events from '@/utils/Events';
import ActiveComponents from '@/utils/ActiveComponents';
import Notification from './Notification.vue';

const props = defineProps({
    event: {
        type: String,
        required: true
    }
});

const panelContent = ref();

const panelReact = reactive({
    open: false,
});

Events.Register('notificationoverlay', () => {
    panelReact.open = true;
    document.body.classList.add("overflow-hidden");
    ActiveComponents.open('notificationoverlay');
});

Events.Register('notificationoverlay-close', () => {
    ClosePanel(true);
    Events.Emit('notificationoverlay-closeComplete');
});

function ClosePanel(fromEmitted, event) {
    if (!fromEmitted && event) {
        if (!event.target.classList.contains("backdrop-blur-sm")) return;
    };
    if (fromEmitted != true) return ActiveComponents.close();
    panelReact.open = false;
    document.body.classList.remove("overflow-hidden");
}
</script>

<template>
    <Transition name="slide-right">
        <div class="z-50 flex fixed inset-0 justify-end items-center min-w-screen min-h-screen top-0 py-24 bg-opacity-25 backdrop-blur-sm overflow-y-scroll"
            v-if="panelReact.open" @click="e => ClosePanel(null, e)">
            <!-- temporary stuff such as notification component, click stop? yeah! - john -->
            <div class="sidebar-panel z-0 min-w-sm h-screen bg-background-1/90 backdrop-blur-sm theShadow rounded-l-xl border-r-0 flex flex-col p-5 gap-2"
                ref="sidebarContent" @click.stop>
                <!-- announcements should only display when theres actual announcements - john -->
                <div class="flex flex-row justify-between w-full">
                    <p class="text-2xl font-semibold">Announcements</p>
                    <p class="text-base">CLEAR ALL</p>
                </div>
                <Notification />
                <div class="flex flex-row justify-between w-full">
                    <p class="text-2xl font-semibold">Notifications</p>
                    <p class="text-base">CLEAR ALL</p>
                </div>
                <Notification />
                <Notification />
                <Notification />
            </div>
        </div>
    </Transition>
</template>

<style lang="scss">
/* one day need to figure out how to seperate opacity and slide transition animation */
/* duration is the same as the old wiki */
.slide-right-enter-active,
.slide-right-leave-active {
    transition: opacity 0.15s ease-in-out;
    transition-duration: 400ms;
}

.slide-right-enter-from,
.slide-right-leave-to {
    opacity: 0;
}

/* Slide panel */
.slide-right-enter-active .sidebar-panel,
.slide-right-leave-active .sidebar-panel {
    transition: transform 0.4s;
}

.slide-right-enter-from .sidebar-panel,
.slide-right-leave-to .sidebar-panel {
    transform: translateX(100%);
}

.sidebar-panel {
    transform: translateX(0);
}

.theShadow {
    box-shadow: 0 32px 40px 0 rgba(0, 0, 0, 0.24),
        inset 0 1px 1px 0 rgba(255, 255, 255, 0.25),
        inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1);
}
</style>
