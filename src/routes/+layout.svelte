<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Shopitoon - Gestion de tâches et boutique</title>
	<meta name="description" content="Shopitoon : gérez vos tâches, votre calendrier et votre boutique en ligne facilement. Application responsive, rapide et sécurisée." />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://shopitoon.dedsecm.xyz/" />
	<!-- Données structurées JSON-LD exemple pour la boutique -->
	<script type="application/ld+json">{
	  "@context": "https://schema.org",
	  "@type": "WebSite",
	  "name": "Shopitoon",
	  "url": "https://shopitoon.dedsecm.xyz/"
	}</script>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>
