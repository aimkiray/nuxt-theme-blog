<script setup>
const { path } = useRoute();
const { data } = await useAsyncData(`content-${path}`, async () => {
    // fetch document where the document path matches with the cuurent route
    let article = queryContent().where({ _path: path }).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = queryContent().only(["_path", "title", "description", "date"]).sort({ date: -1 }).findSurround(path);

    return {
        article: await article,
        surround: await surround,
    };
});

// destrucure `prev` and `next` value from data
const [prev, next] = data.value.surround;

// set the meta
useHead({
    title: data.value.article.title,
    meta: [
        { name: "description", content: data.value.article.description },
    ],
});

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const _date = new Date(data.value.article.date);

const date = _date.toLocaleDateString("en-US", options);
</script>

<template>
    <main id="main" class="article-main">
        <header v-if="data.article" class="article-header">
            
            <h1 class="heading">{{ data.article.title }}</h1>
            <div class="post-meta">
                Last modified @ {{ date }}
            </div>
            <div class="article-tags">
                <NuxtLink class="tag" v-for="(tag, n) in data.article.tags" :key="n" :to="`/blog/tags/${tag}`">{{ tag }}
                </NuxtLink>
            </div>
        </header>
        <hr />
        <section class="article-section">
            <aside class="aside">
                <!-- Toc Component -->
                <Toc :links="data.article.body.toc.links" />
            </aside>
            <article class="article">
                <!-- render document coming from query -->
                <ContentRenderer :value="data.article">
                    <!-- render rich text from document -->
                    <ContentRendererMarkdown :value="data.article" />

                    <!-- display if document content is empty -->
                    <template #empty>
                        <p>No content found.</p>
                    </template>
                </ContentRenderer>
            </article>
        </section>

        <!-- PrevNext Component -->
        <Switch :prev="prev" :next="next" />
    </main>
</template>

<style lang="scss" scoped>
.article-main {
    @apply mt-0 md:mt-8 p-4 max-w-5xl m-auto;
}

.article-header {
    @apply p-4 pb-12;
}

.article-header .heading {
    @apply font-extrabold text-3xl;
    color: $text-color;
}

.article-header .supporting {
    @apply font-medium text-lg;
}

.article-section {
    @apply grid grid-cols-8;
}

.aside {
    @apply col-span-full md:col-span-2 row-start-1 w-full pt-8;
}

.aside .toc {
    @apply sticky top-4;
}

.article {
    @apply col-span-full md:col-span-6 md:col-start-1 md:row-start-1 w-full p-4 max-w-3xl m-auto prose prose-pre:bg-red-100;
}

.post-meta {
    color: $gray-text-color;
    padding-left: 0.125rem;
}
</style>
