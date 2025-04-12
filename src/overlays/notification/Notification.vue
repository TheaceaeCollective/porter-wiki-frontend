<template>
    <a href="" target="_blank"
        class="bottom-0 bg-cover bg-center bg-no-repeat w-full bg-red flex items-center justify-center overflow-hidden z-10">
        <div id="dim"
            class="relative w-full py-2 inset-0 flex justify-center items-center transition-background duration-400 bg-black/20">
            <p class="font-bold text-center text-white text-">
                test notification
            </p>
        </div>
    </a>
</template>

<style lang="scss">
#dim {
    transition: background 400ms;

    &:hover {
        transition: background 200ms;
        background: rgba(0, 0, 0, 0);
    }
}
</style>