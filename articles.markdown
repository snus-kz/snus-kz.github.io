---
title: articles
date: 2018-12-12 16:53:00 Z
---

{% include head.html %}
<body>

	<div class="content">

		{% include header.html %}

		{% include top-line.html %}


		<div class="container">
			<main class="margin-top-2rem">

				<h1>Информация о снюсе</h1>
				
				{% assign sorted_articles = site.articles | sort:"position" %}
				{% for article in sorted_articles %}
				<article {% if forloop.last == true %}
				class="mb-5"
				{% endif %}>
					<div class="row">
						<div class="col-md-7">
							<a href="{{ article.url }}">
								<img class="img-fluid rounded mb-3 mb-md-0" src="{{ article.img }}" alt="{{ article.title-seo }}">
							</a>
						</div>
						<div class="col-md-5">
							<h2>{{ article.title-seo | truncate: 35 }}</h2>
							<p>{{ article.descr | truncate: 250 }}</p>
							<a class="btn btn-primary" href="{{ article.url }}">Читать полностью</a>
						</div>
					</div>
				</article>

				{% if forloop.last == false %}
				<hr class="mt-4 mb-4">
				{% endif %}
				{% endfor %}

			</main>
		</div>
	</div>

	{% include modal-cart.html %}

	{% include modal-contact.html %}

	{% include arrow-to-top.html %}

	{% include footer.html %}

	{% include foot-scripts.html %}