<script setup>
const props = defineProps({
  tags: Array,
  title: String
})
</script>
<template>
    <div class="face-terminal">
        <div class="face-mask">
            <p>root@aimkiray:~$ tags</p>
            <NuxtLink class="tag" v-for="(tag, n) in tags" :key="n" :to="`/blog/tags/${tag}`">
                {{ tag }}
            </NuxtLink>
            <NuxtLink class="tag" to="/blog">all</NuxtLink>
            <p>root@aimkiray:~$ ^C</p>
            <p>root@aimkiray:~$ {{ title }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.face-terminal {
    @apply md:rounded;
    max-width: 46rem;
    margin: 0 auto;
    background-color: $text-bg-color;
    background-image: radial-gradient(lighten($text-bg-color, 1), lighten($text-bg-color, 15));
    color: white;
    font-size: 1rem;
    font-family: $fonts-monospace;
    text-shadow: 0 0 5px #C8C8C8;

    .face-mask {
        border-radius: 0.25rem;
        padding: 2rem;
        background: repeating-linear-gradient(0deg,
                rgba($accent-color, 0.15),
                rgba($accent-color, 0.15) 1px,
                transparent 1px,
                transparent 2px);
    }

    .tag {
        display: inline-block;
        padding-right: 1rem;
    }
}

/* ... */
.tag-list {
    @apply flex items-center gap-2 p-2 border border-transparent rounded-lg;
}

.tag-list.active {
    @apply border-slate-200;
}

.article-tags {
    @apply transition-all max-w-0 overflow-scroll;
}

.article-tags.expanded {
    @apply max-w-full;
}
</style>
