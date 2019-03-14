<?php

return [
  // Routes & redirects go here

  [
    // Simple xml sitemap, see https://getkirby.com/docs/cookbook/seo/xmlsitemap
    'pattern' => 'sitemap.xml',
    'action'  => function() {
        $pages = site()->pages()->index();

        // fetch the pages to ignore from the config settings,
        // if nothing is set, we ignore the error page
        $ignore = kirby()->option('sitemap.ignore', 'error');

        $content = snippet('sitemap', compact('pages', 'ignore'), true);

        // return response with correct header type
        return new Kirby\Cms\Response($content, 'application/xml');
    }
  ],
  [
    'pattern' => 'sitemap',
    'action'  => function() {
      return go('sitemap.xml', 301);
    }
  ],
];
