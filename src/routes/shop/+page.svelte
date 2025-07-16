<script lang="ts">
	export let data;
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	let showMessage = false;
	let message = '';
	let messageType: 'success' | 'error' = 'success';
</script>

<svelte:head>
	<title>Shopitoon - Boutique</title>
	<meta
		name="description"
		content="Découvrez la boutique Shopitoon : échangez vos points contre des récompenses et articles exclusifs."
	/>
	<meta name="robots" content="index, follow" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Store",
			"name": "Shopitoon Boutique",
			"url": "https://shopitoon.dedsecm.xyz/shop"
		}
	</script>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-fuchsia-50 to-indigo-100 px-4 py-12"
>
	<div class="w-full max-w-2xl rounded-2xl bg-white/90 p-8 shadow-2xl">
		<h1 class="mb-8 text-center text-4xl font-extrabold text-blue-700 drop-shadow">Boutique</h1>

		{#if data.user}
			<div class="mb-6 text-center">
				<p class="text-lg font-semibold text-indigo-700">
					Points disponibles : <span class="font-bold">{data.user.nombreOfPoints ?? 0}</span>
				</p>
			</div>
		{/if}

		<div class="mb-6 flex justify-end">
			<a
				href="/shop/add"
				class="rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 px-5 py-2 font-semibold text-white shadow transition hover:scale-105"
			>
				Ajouter un article
			</a>
		</div>

		{#if showMessage}
			<div
				class="fixed top-6 left-1/2 z-50 -translate-x-1/2 {messageType === 'success'
					? 'bg-green-500'
					: 'bg-red-500'} animate-bounce rounded-lg px-6 py-3 text-white shadow-lg"
			>
				{message}
			</div>
		{/if}

		<ul class="space-y-4">
			{#each data.shop as item (item.id)}
				<li
					class="flex items-center justify-between rounded-xl border-l-4 border-indigo-400 bg-white p-5 shadow"
				>
					<div>
						<div class="text-lg font-bold text-indigo-700">{item.name}</div>
						<div class="text-sm text-gray-500">{item.description}</div>
					</div>
					<div class="flex items-center gap-3">
						<span class="text-xl font-bold text-fuchsia-600">{item.price} pts</span>
						<div class="flex gap-2">
							{#if data.user}
								<form
									method="post"
									action="?/buy"
									use:enhance={() => {
										return async ({ result }) => {
											if (result.type === 'success') {
												message = result.data?.message || 'Achat réussi !';
												messageType = 'success';
												// Invalider les données pour rafraîchir les points utilisateur
												await invalidate('data:shop');
											} else {
												message = result.data?.message || "Échec de l'achat";
												messageType = 'error';
											}
											showMessage = true;
											setTimeout(() => (showMessage = false), 2500);
										};
									}}
								>
									<input type="hidden" name="id" value={item.id} />
									<button
										class="rounded bg-green-500 px-3 py-1 text-white transition hover:bg-green-600"
										title="Acheter"
									>
										🛒
									</button>
								</form>
							{/if}
							<a
								href={`/shop/edit/${item.id}`}
								class="rounded bg-yellow-400 px-3 py-1 text-white transition hover:bg-yellow-500"
								title="Modifier"
							>
								✎
							</a>
							<form
								method="post"
								action="?/delete"
								use:enhance={() => {
									return async ({ result }) => {
										if (result.type === 'success') {
											message = 'Article supprimé avec succès';
											messageType = 'success';
											// Invalider les données au lieu de recharger la page
											await invalidate('data:shop');
										} else {
											message = result.data?.message || 'Échec de la suppression';
											messageType = 'error';
										}
										showMessage = true;
										setTimeout(() => (showMessage = false), 2500);
									};
								}}
							>
								<input type="hidden" name="id" value={item.id} />
								<button
									class="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
									title="Supprimer"
								>
									🗑
								</button>
							</form>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
