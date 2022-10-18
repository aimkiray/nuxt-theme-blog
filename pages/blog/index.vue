<script setup>
definePageMeta({
    key: (route) => route.fullPath,
});

// get tag query
const {
    query: { tags },
} = useRoute();

const filter = ref(tags?.split(","));

// set meta for page
useHead({
    title: "All articles",
    meta: [{ name: "description", content: "404040404" }],
});

// helper function to flatten tags array
const flatten = (tags, key) => {

    let _tags = tags
        .map((tag) => {
            let _tag = tag;
            if (tag[key]) {
                let flattened = flatten(tag[key]);
                _tag = flattened;
            }
            return _tag;
        })
        .flat(1);

    return _tags;
};

// get only tags data from `/blog`
const { data } = await useAsyncData("tags", () => queryContent("blog").only(["tags"]).sort({ date: -1 }).find());

// generate array without duplicates from flattened array
const articleTags = [...new Set(flatten(data.value, "tags"))];

const dateFormat = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const _date = new Date(date);

    return _date.toLocaleDateString("en-US", options);
}
</script>

<template>
    <main>
        <!-- <header class="page-heading">
            <div class="wrapper">
                <h1 class="text-3xl font-extrabold text-center">All articles</h1>
            </div>
        </header> -->
        <Face :tags="articleTags" title="articles --all" />
        <div class="nyaa-wrapper">
            <NuxtLink class="nyaa" to="/blog"></NuxtLink>
            <NuxtLink class="nyaa nyaa-right" to="/blog"></NuxtLink>
        </div>
        <section class="page-section">

            <!-- Render list of all articles in ./content/blog using `path` -->
            <!-- Provide only defined fieldsin the `:query` prop -->
            <ContentList path="/blog" :query="{
              only: ['title', 'description', 'tags', 'date', '_path'],
              where: {
                tags: {
                  $contains: filter,
                },
              },
              sort: { date: -1 },
              $sensitivity: 'base',
            }">
                <!-- Default list slot -->
                <template v-slot="{ list }">
                    <ul class="article-list">
                        <li v-for="article in list" :key="article._path" class="article-item">

                            <div class="article-wrapper">
                                <NuxtLink :to="article._path">
                                    <div class="article-title">
                                        <h1 class="">{{ article.title }}</h1>
                                    </div>
                                    <p>{{ article.description }}</p>
                                </NuxtLink>
                                <div class="article-tags">
                                    {{ dateFormat(article.date) }}
                                    <NuxtLink class="tag" v-for="(tag, n) in article.tags" :key="n"
                                        :to="`/blog/tags/${tag}`">{{ tag }}</NuxtLink>
                                </div>
                            </div>

                        </li>
                    </ul>
                </template>

                <!-- Not found slot to display message when no content us is found -->
                <template #not-found>
                    <p>No articles found.</p>
                </template>
            </ContentList>
        </section>
    </main>
</template>
