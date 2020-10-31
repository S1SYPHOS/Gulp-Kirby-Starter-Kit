# Kirby Minify HTML

Enable minify HTML output for Kirby 3

## Installation

### Installation with composer

```ssh
composer require afbora/kirby-minify-html
```

### Add as git submodule

```ssh
git submodule add https://github.com/afbora/kirby-minify-html.git site/plugins/kirby-minify-html
```

## Options

The default values of the package are:

| Option | Default | Values | Description |
|:--|:--|:--|:--|
| afbora.kirby-minify-html.enabled | true | boolean | Enable/disable minify |
| afbora.kirby-minify-html.options | [] | array | Minify options * |

### Available Minify Options

| Option | Description |
|:---|:---|
| doOptimizeViaHtmlDomParser | optimize html via "HtmlDomParser()" |
| doRemoveComments | remove default HTML comments (depends on "doOptimizeViaHtmlDomParser(true)") |
| doSumUpWhitespace | sum-up extra whitespace from the Dom (depends on "doOptimizeViaHtmlDomParser(true)") |
| doRemoveWhitespaceAroundTags | remove whitespace around tags (depends on "doOptimizeViaHtmlDomParser(true)") |
| doOptimizeAttributes | optimize html attributes (depends on "doOptimizeViaHtmlDomParser(true)") |
| doRemoveHttpPrefixFromAttributes | remove optional "http:"-prefix from attributes (depends on "doOptimizeAttributes(true)") |
| doRemoveDefaultAttributes | remove defaults (depends on "doOptimizeAttributes(true)" | disabled by default) |
| doRemoveDeprecatedAnchorName | remove deprecated anchor-jump (depends on "doOptimizeAttributes(true)") |
| doRemoveDeprecatedScriptCharsetAttribute | remove deprecated charset-attribute - the browser will use the charset from the HTTP-Header, anyway (depends on "doOptimizeAttributes(true)") |
| doRemoveDeprecatedTypeFromScriptTag | remove deprecated script-mime-types (depends on "doOptimizeAttributes(true)") |
| doRemoveDeprecatedTypeFromStylesheetLink | remove "type=text/css" for css links (depends on "doOptimizeAttributes(true)") |
| doRemoveEmptyAttributes | remove some empty attributes (depends on "doOptimizeAttributes(true)") |
| doRemoveValueFromEmptyInput | remove 'value=""' from empty <input> (depends on "doOptimizeAttributes(true)") |
| doSortCssClassNames | sort css-class-names, for better gzip results (depends on "doOptimizeAttributes(true)") |
| doSortHtmlAttributes | sort html-attributes, for better gzip results (depends on "doOptimizeAttributes(true)") |
| doRemoveSpacesBetweenTags | remove more (aggressive) spaces in the dom (disabled by default) |
| doRemoveOmittedQuotes | remove quotes e.g. class="lall" => class=lall |
| doRemoveOmittedHtmlTags | remove ommitted html tags e.g. \<p\>lall\<\/p\> => \<p\>lall |

All the values can be updated in the `config.php` file.

You can get detailed information from `HtmlMin` library:
https://github.com/voku/HtmlMin#options

##### Protected HTML

*Inline css, inline js, conditional comments are still protected, no matter what settings you use.*

## Usage

````php
return [
    'afbora.kirby-minify-html.enabled' => true,
    'afbora.kirby-minify-html.options' => [
        'doOptimizeViaHtmlDomParser' => true, // set true/false or remove line to default
        'doRemoveSpacesBetweenTags'  => false // set true/false or remove line to default
    ],
];
````
