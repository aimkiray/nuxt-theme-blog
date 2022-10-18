<template>
	<div>
		<div class="copyright">
			<p>
				© 2014-2333
				<router-link to="/">meowoo.com</router-link>
			</p>
			<p>
				<span>
                    Built with ♫ &
                    <a href="https://v3.nuxtjs.org/" target="_blank">
                        Nuxt.js</a>.
                </span>
				<span class="designed-by">
                    Designed by
					<a href="https://github.com/aimkiray/vuepress-theme-palette" target="_blank">
                        aimkiray</a>.
                </span>
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.copyright {
    @apply text-sm md:text-base;
	color: #fc8181;
	text-align: center;

    margin: 2rem;
	display: block;

    .designed-by {
        @apply block sm:inline;
	}

	p {
		margin: 0;
		font-family: $fonts-sans-serif;
		font-weight: 400;
	}

	a {
		font-family: $fonts-sans-serif;
		font-weight: 600;
	}

	span {
		font-family: $fonts-sans-serif;
		font-weight: 400;
	}
}
</style>