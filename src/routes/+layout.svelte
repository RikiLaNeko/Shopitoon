<script lang="ts">
	import '../app.css';
	import Header from '../components/header.svelte';
	import Footer from '../components/footer.svelte';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>
