<template>
    <a href="https://discord.gg/nUeRyRtDYC" target="_blank"
        class="static bottom-0 ml-28 bg-cover bg-center bg-no-repeat w-[400px] bg-red rounded-lg flex items-center justify-center overflow-hidden">
        <div id="dim"
            class="relative w-full inset-0 flex justify-center items-center transition-background duration-400 bg-black/20">
            <p class="font-bold text-center text-white text-">The site is still in alpha. If you
                wish
                to give
                feedback or help,
                contact me @papertek or join the Discord.</p>
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