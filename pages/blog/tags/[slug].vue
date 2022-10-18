<script setup>

// get current route
const {
    params: { slug },
} = useRoute();

const filter = slug.split(",");

// set meta for page
useHead({
    title: `All articles with ${slug}`,
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

const title = "articles --with " + slug
</script>
<template>
    <main>
        <Face :tags="articleTags" :title="title" />
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
              $sensitivity: 'base',
            }">
                <!-- Default list slot -->
                <template v-slot="{ list }">
                    <ul class="article-list">
                        <li v-for="article in list" :key="article._path" class="article-item">
                            <NuxtLink :to="article._path">
                                <div class="wrapper">
                                    <header>
                                        <h1 class="text-2xl font-semibold">{{ article.title }}</h1>
                                        <p>{{ article.description }}</p>
                                        <ul class="article-tags">
                                            <li class="tag" v-for="(tag, n) in article.tags" :key="n">
                                                <NuxtLink :to="`/blog/tags/${tag}`" class="underline"> {{ tag }}
                                                </NuxtLink>
                                            </li>
                                        </ul>
                                    </header>
                                </div>
                            </NuxtLink>
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
