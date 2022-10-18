<script>
export default {
	data() {
		return {
			borderRadius: "49% 0"
		};
	},
	methods: {
		setCat() {
			if (!this.timer) {
				this.timer = true;
				let that = this;

				setTimeout(function () {
					that.catRadius();
					that.timer = false;
				}, 200);
			}
		},
		catRadius() {
			const screenWidth = document.body.clientWidth;
			const radiusInfo =
				"49% " +
				parseInt(((screenWidth - 485) * 215 + 16660) / screenWidth) +
				"px";
            this.borderRadius = radiusInfo;
		},
	},
	mounted() {
		this.catRadius();
		window.addEventListener("resize", this.setCat);
	},
};
</script>
<template>
    <div class="main-container">
        <PageHeader />
        <div class="cat-ear">
            <span class="a-ear mr-14 md:mr-20">▲</span>
            <span class="a-ear">▲</span>
        </div>
        
        <div class="page-content" :style="{ borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }">
            <NuxtPage />
        </div>
        <PageFooter />
    </div>
</template>

<style lang="scss" scoped>
.cat-ear {
    @apply bottom-12 md:bottom-14;
	font-family: monospace;
	text-transform: uppercase;
	text-align: center;
	position: relative;
	height: 0;
	text-shadow: rgba(0, 0, 0, 0.01) 0 -0.1rem 0.1rem, rgba(0, 0, 0, 0.04) 0 -0.5rem 0.5rem;
}

// @-moz-document url-prefix() {
// 	.cat-ear {
// 		bottom: 2rem;
// 	}
// }

.a-ear {
    @apply text-pro md:text-plus;
	color: $bg-color;
	line-height: 0;
}
</style>