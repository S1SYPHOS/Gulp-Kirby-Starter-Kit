<?php

declare(strict_types=1);

namespace Bnomei;

use Kirby\Exception\InvalidArgumentException;
use Kirby\Toolkit\A;
use Kirby\Toolkit\F;
use function dirname;
use function filemtime;
use function url;

final class FingerprintFile
{
    /*
     * @var Kirby\Cms\File|Kirby\Cms\FileVersion
     */
    private $file;

    /*
     * @var bool
     */
    private $isKirbyFile;

    /**
     * FingerprintFile constructor.
     *
     * @param $file
     * @throws InvalidArgumentException
     */
    public function __construct($file)
    {
        $this->file = $file;
        $this->isKirbyFile = is_a($file, 'Kirby\Cms\File') || is_a($file, 'Kirby\Cms\FileVersion');
        if (!$this->isKirbyFile) {
            $this->file = url($this->file);
        }
    }

    /**
     * @return string
     */
    public function id(): string
    {
        if ($this->isKirbyFile) {
            return $this->file->root();
        }

        return ltrim($this->file, '/');
    }

    /**
     * @return int|null
     */
    public function modified(): ?int
    {
        $root = $this->fileRoot();
        if (! F::exists($root)) {
            return null;
        }

        $modified = null;
        if ($this->isKirbyFile && function_exists('modified') && $this->file->autoid()->isNotEmpty()) {
            // @codeCoverageIgnoreStart
            $modified = modified($this->file->autoid()->value());
            if (!$modified) {
                $modified = $this->file->modified();
            }
            // @codeCoverageIgnoreEnd
        } else {
            $modified = F::modified($root);
        }

        return $modified;
    }

    /**
     * @param $query
     * @return string
     */
    public function hash($query = true): string
    {
        $root = $this->fileRoot();

        if (! F::exists($root)) {
            return url($this->file);
        }

        $filename = null;
        if (is_string($query) && F::exists($query)) {
            $manifest = json_decode(F::read($query), true);
            if (is_array($manifest)) {
                $url = '';
                if (kirby()->language()) {
                    $url = preg_replace('/\/'. kirby()->language()->code() .'$/', '', kirby()->site()->url());
                }
                $url = str_replace($url, '', $this->id());
                $filename = basename(A::get(
                    $manifest,
                    $url,
                    $root
                ));
            }
        } elseif (is_bool($query)) {
            $filename = implode('.', [
                F::name($root),
                $query ? F::extension($root) . '?v=' . filemtime($root) : md5_file($root) . '.' . F::extension($root)
            ]);
        }

        $url = null;
        if ($this->isKirbyFile) {
            $url = str_replace($this->file->filename(), $filename, $this->file->url());
        } else {
            $dirname = str_replace(kirby()->roots()->index(), '', dirname($root));
            $url = ($dirname === '.') ? $filename : ($dirname . '/' . $filename);
        }

        return url($url);
    }

    /**
     * @param bool $openssl
     * @return string|null
     */
    public function integrity(bool $openssl = true): ?string
    {
        $root = $this->fileRoot();

        if (! F::exists($root)) {
            return null;
        }

        try {
            if ($openssl && extension_loaded('openssl')) {
                // https://www.srihash.org/
                exec('openssl dgst -sha384 -binary ' . $root . ' | openssl base64 -A', $output, $return);
                if (is_array($output) && count($output) >= 1) {
                    return 'sha384-' . $output[0];
                }
            }

            exec('shasum -b -a 384 ' . $root . ' | xxd -r -p | base64', $output, $return);
            if (is_array($output) && count($output) >= 1) {
                return 'sha384-' . $output[0];
            }
        } catch (\Exception $ex) {}

        return null; // @codeCoverageIgnore
    }

    /**
     * @return string
     */
    public function fileRoot(): string
    {
        if ($this->isKirbyFile) {
            return $this->file->root();
        }
        $url = kirby()->site()->url();
        if (kirby()->language()) {
            $url = preg_replace('/\/'. kirby()->language()->code() .'$/', '', $url);
        }
        $path = ltrim($url, DIRECTORY_SEPARATOR);
        $uri = ltrim(str_replace($path, '', $this->file), DIRECTORY_SEPARATOR);
        return kirby()->roots()->index() . DIRECTORY_SEPARATOR . $uri;
    }

    /**
     * @return mixed
     */
    public function file()
    {
        return $this->file;
    }
}
