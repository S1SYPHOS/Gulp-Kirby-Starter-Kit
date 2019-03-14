<?= '<?xml version="1.0" encoding="utf-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <?php foreach ($pages as $page) : ?>
    <?php if (in_array($page->uri(), $ignore)) continue ?>
    <url>
      <loc><?= html($page->url()) ?></loc>
      <lastmod><?= $page->modified('c') ?></lastmod>
      <priority><?= ($page->isHomePage()) ? 1 : number_format(0.5 / $page->depth(), 1) ?></priority>
    </url>
  <?php endforeach ?>
</urlset>
