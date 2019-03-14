<?php

namespace Bnomei;

use \Kirby\Cms;
use \Kirby\Toolkit;

class Fingerprint
{
    public static function css($url, $attrs = [])
    {
        if ($url === '@auto') {
            if ($assetUrl = \Kirby\Cms\Url::toTemplateAsset('css/templates', 'css')) {
                $url = $assetUrl;
            }
        }
        $fingerprint = static::process($url);
        $sri = \Kirby\Toolkit\A::get($attrs, 'integrity', false);
        if ($sri === true) {
            $sri = $fingerprint['integrity'];
        }
        if ($sri && strlen($sri) > 0) {
            $attrs['integrity'] = $sri;
            $attrs['crossorigin'] = \Kirby\Toolkit\A::get($attrs, 'crossorigin', 'anonymous');
        } elseif (\Kirby\Toolkit\A::get($attrs, 'integrity')) {
            unset($attrs[array_search('integrity', $attrs)]);
        }

        return static::ssl(\css($fingerprint['hash'], $attrs));
    }

    public static function js($url, $attrs = [])
    {
        if ($url === '@auto') {
            if ($assetUrl = \Kirby\Cms\Url::toTemplateAsset('js/templates', 'js')) {
                $url = $assetUrl;
            }
        }
        $fingerprint = static::process($url);
        $sri = \Kirby\Toolkit\A::get($attrs, 'integrity', false);
        if ($sri === true) {
            $sri = $fingerprint['integrity'];
        }
        if ($sri && strlen($sri) > 0) {
            $attrs['integrity'] = $sri;
            $attrs['crossorigin'] = \Kirby\Toolkit\A::get($attrs, 'crossorigin', 'anonymous');
        } elseif (\Kirby\Toolkit\A::get($attrs, 'integrity')) {
            unset($attrs[array_search('integrity', $attrs)]);
        }

        return static::ssl(\js($fingerprint['hash'], $attrs));
    }

    public static function process($file)
    {
        $needsPush = false;
        $key = null;
        $root = null;
        $mod = null;
        $sri = null;
        $url = null;

        if (option('debug') && option('bnomei.fingerprint.debugforce')) {
            kirby()->cache('bnomei.fingerprint')->flush();
        }

        $cacheWithVersion = 'lookup' . str_replace('.', '', kirby()->plugin('bnomei/fingerprint')->version()) . '-' . md5(site()->url());
        $lookup = kirby()->cache('bnomei.fingerprint')->get($cacheWithVersion);
        if (!$lookup) {
            $lookup = [];
            $needsPush = true;
        }
        if (is_a($file, 'Kirby\CMS\File') || is_a($file, 'Kirby\CMS\FileVersion')) {
            $key = (string)$file->id();
            $root = (string)$file->root();
            $mod = \filemtime($root);
            $url = static::ssl((string)$file->url());
        } elseif (!\Kirby\Toolkit\V::url($file)) {
            $key = ltrim($file, '/');
            $root = kirby()->roots()->index() . DIRECTORY_SEPARATOR . $key;
            if (\Kirby\Toolkit\F::exists($root)) {
                $mod = \filemtime($root);
                $url = static::ssl(\url($key));
            }
        } else {
            $key = $file;
        }

        if (\array_key_exists($key, $lookup)) {
            if ($mod && $lookup[$key]['modified'] < $mod) {
                $needsPush = true;
            }
        } else {
            $needsPush = true;
        }

        if ($needsPush) {
            $lookup[$key] = [
                'modified' => $mod,
                'root' => $root,
                'integrity' => null,
                'hash' => $url,
            ];

            $lookup[$key]['integrity'] = static::sriFile($file);
            $lookup[$key]['hash'] = static::hashFile($file);
            
            kirby()->cache('bnomei.fingerprint')->set($cacheWithVersion, $lookup);
        }

        return \Kirby\Toolkit\A::get($lookup, $key);
    }

    private static function hashFile($file)
    {
        $callback = option('bnomei.fingerprint.hash', null);

        if ($callback && is_callable($callback)) {
            return call_user_func_array($callback, [$file]);
        }
        return null;
    }

    private static function sriFile($file)
    {
        $callback = option('bnomei.fingerprint.integrity', null);

        if ($callback && is_callable($callback)) {
            return call_user_func_array($callback, [$file]);
        }
        return null;
    }

    private static function ssl($url)
    {
        $callback = option('bnomei.fingerprint.ssl', null);
        if ($callback && is_callable($callback)) {
            $callback = $callback();
        }
        if ($callback) {
            $url = str_replace('http://', 'https://', $url);
        }
        return $url;
    }
}
