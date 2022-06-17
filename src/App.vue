<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import '/src/assets/icon/iconfont'
	export default {
		name: 'app',
		components: {

		}
	}
</script>

<style>
	body,
	html {
		padding: 0;
		margin: 0;
		height: 100%;
		overflow: hidden;
	}

	#app {
		height: 100%;
	}

	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
	img{
		width: 100%;
	}
</style>
