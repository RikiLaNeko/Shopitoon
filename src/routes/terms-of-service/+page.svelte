<script lang="ts">
	import { page } from '$app/stores';

	// Utilisation de $derived pour la réactivité avec les runes
	const user = $derived($page.data.user);
</script>

<main class="animate-fade-in min-h-screen bg-gradient-to-br from-fuchsia-400 via-indigo-300 to-blue-400 pb-16">
	<div class="mx-auto max-w-4xl px-4 py-12">
		<div class="mb-8 text-center">
			<h1 class="text-4xl font-bold text-white drop-shadow-md">Conditions d'Utilisation</h1>
			<p class="mt-2 text-lg text-white/90">Merci d'utiliser Shopitoon</p>
		</div>

		<div class="rounded-xl bg-white/80 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl">
			<p class="text-sm text-gray-500">Dernière mise à jour : 19 juin 2025</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">1. Acceptation des Conditions</h2>
			<p class="mt-2 text-gray-600">
				En accédant à et en utilisant Shopitoon, vous acceptez d'être lié par ces Conditions d'Utilisation,
				toutes les lois et réglementations applicables, et vous acceptez que vous êtes responsable du respect
				de toutes les lois locales applicables. Si vous n'êtes pas d'accord avec l'une de ces conditions,
				vous êtes interdit d'utiliser ce service.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">2. Description du Service</h2>
			<p class="mt-2 text-gray-600">
				Shopitoon est une application de gestion de tâches et de récompenses permettant aux utilisateurs de
				créer et suivre leurs tâches, gagner des points et les échanger contre des récompenses virtuelles.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">3. Comptes Utilisateurs</h2>
			<p class="mt-2 text-gray-600">
				Pour utiliser certaines fonctionnalités de Shopitoon, vous devez créer un compte. Vous êtes
				responsable de :
			</p>
			<ul class="mt-2 list-disc pl-6 text-gray-600">
				<li>Maintenir la confidentialité de vos informations de connexion</li>
				<li>Toutes les activités qui se produisent sous votre compte</li>
				<li>Nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
			</ul>
			<p class="mt-2 text-gray-600">
				Nous nous réservons le droit de suspendre ou de résilier votre compte si ces conditions ne sont
				pas respectées.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">4. Contenu Utilisateur</h2>
			<p class="mt-2 text-gray-600">
				En utilisant Shopitoon, vous pouvez créer du contenu (tâches, descriptions, etc.). Vous conservez
				tous les droits sur ce contenu, mais vous nous accordez une licence mondiale, non exclusive pour
				utiliser, stocker et afficher ce contenu uniquement dans le but de vous fournir le service.
			</p>
			<p class="mt-2 text-gray-600">
				Vous acceptez de ne pas publier de contenu qui :
			</p>
			<ul class="mt-2 list-disc pl-6 text-gray-600">
				<li>Est illégal, menaçant, abusif, diffamatoire ou autrement répréhensible</li>
				<li>Enfreint les droits de propriété intellectuelle d'autrui</li>
				<li>Contient des logiciels malveillants ou des codes informatiques destinés à endommager notre système</li>
			</ul>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">5. Propriété Intellectuelle</h2>
			<p class="mt-2 text-gray-600">
				Le service Shopitoon et son contenu original, fonctionnalités et fonctionnalités sont et
				resteront la propriété exclusive de Shopitoon et de ses concédants. Le service est protégé par
				les lois sur le droit d'auteur et les marques en France et à l'étranger.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">6. Limitation de Responsabilité</h2>
			<p class="mt-2 text-gray-600">
				Shopitoon est fourni "tel quel" sans garantie d'aucune sorte. Nous ne garantissons pas que le
				service sera ininterrompu, sécurisé ou sans erreur.
			</p>
			<p class="mt-2 text-gray-600">
				En aucun cas, Shopitoon ou ses développeurs ne pourront être tenus responsables de tout dommage
				direct, indirect, accessoire, spécial ou consécutif résultant de l'utilisation ou de l'incapacité
				à utiliser ce service.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">7. Résiliation</h2>
			<p class="mt-2 text-gray-600">
				Nous nous réservons le droit de mettre fin à votre accès à tout ou partie du service, sans préavis,
				pour tout comportement qui viole ces Conditions d'Utilisation.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">8. Modifications des Conditions</h2>
			<p class="mt-2 text-gray-600">
				Nous nous réservons le droit de réviser ces conditions à tout moment. En continuant à utiliser ce
				service après la publication de modifications, vous acceptez d'être lié par les conditions modifiées.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">9. Loi Applicable</h2>
			<p class="mt-2 text-gray-600">
				Ces conditions sont régies et interprétées conformément aux lois françaises, sans égard aux
				conflits de principes légaux.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">10. Contact</h2>
			<p class="mt-2 text-gray-600">
				Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter via :
			</p>
			<ul class="mt-2 list-disc pl-6 text-gray-600">
				<li>
					<span class="font-medium">Email:</span>
					<a
						href="mailto:chloe.mortreux@proton.me"
						class="text-indigo-600 transition hover:text-fuchsia-600 hover:underline"
					>chloe.mortreux@proton.me</a>
				</li>
				<li>
					<span class="font-medium">GitHub:</span>
					<a
						href="https://github.com/RikiLaNeko/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-indigo-600 transition hover:text-fuchsia-600 hover:underline"
					>https://github.com/RikiLaNeko/</a>
				</li>
			</ul>

			<div class="mt-10 flex justify-center">
				<a
					href="/"
					class="rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg"
				>
					Retour à l'accueil
				</a>
			</div>
		</div>
	</div>
</main>
