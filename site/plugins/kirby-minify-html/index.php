<?php

@include_once __DIR__ . '/vendor/autoload.php';

use Kirby\Toolkit\Tpl;
use Kirby\Cms\Template;
use Kirby\Cms\App as Kirby;
use voku\helper\HtmlMin;

class MinifyHTML extends Template
{
    public function render(array $data = []): string
    {
        $html = Tpl::load($this->file(), $data);

        if (option('afbora.kirby-minify-html.enabled') === true) {
            $htmlMin = new HtmlMin();

            $options = option('afbora.kirby-minify-html.options', []);

            foreach ($options as $option => $status) {
                if (method_exists($htmlMin, $option)) {
                    $htmlMin->{$option}((bool)$status);
                }
            }

            return $htmlMin->minify($html);
        }

        return $html;
    }
}

Kirby::plugin('afbora/kirby-minify-html', [
    'options' => [
        'enabled' => true,
        'options' => []
    ],
    'components' => [
        'template' => function (Kirby $kirby, string $name, string $contentType = null) {
            return new MinifyHTML($name, $contentType);
        }
    ]
]);
