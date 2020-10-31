<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Bnomei\Fingerprint;
use Bnomei\FingerprintFile;
use PHPUnit\Framework\TestCase;

final class FingerprintTest extends TestCase
{
    /*
     * @var Kirby\Cms\File|Kirby\Cms\FileVersion
     */
    private $testFile;

    /*
     * @var string
     */
    private $assetPath;

    /*
     * @var string
     */
    private $invalidPath;

    public function setUp(): void
    {
        kirby()->cache('bnomei.fingerprint')->flush();

        $this->testFile = page('home')->file('test.png');
        $this->assetPath = 'assets/asset.png';
        $this->invalidPath = 'invalid/file.jpg';
    }

    public function testConstruct()
    {
        $fipr = new Fingerprint();
        $this->assertInstanceOf(Fingerprint::class, $fipr);
    }

    public function testOptions()
    {
        $fipr = new Fingerprint([
            'https' => false,
            'debug' => function() { return false; },
        ]);
        $this->assertFalse($fipr->option('https'));
        $this->assertFalse($fipr->option('debug'));
        $this->assertIsArray($fipr->option());
    }

    public function testApply()
    {
        $fipr = new Fingerprint();
        $this->assertNull($fipr->apply('invalid-apply-call', $this->testFile));
        $this->assertRegExp(
            '/^.*\/test.png\?v=\d{10}$/',
            $fipr->apply('hash', $this->testFile)
        );
    }

    public function testHttps()
    {
        $fipr = new Fingerprint();
        $this->assertRegExp('/^https:/', $fipr->https('http://example.com'));

        $fipr = new Fingerprint([
            'https' => false,
        ]);
        $this->assertNotRegExp('/^https:/', $fipr->https('http://example.com'));
    }

    public function testProcess()
    {
        $fipr = new Fingerprint();
        $lookup = $fipr->process($this->testFile);
        $this->assertIsArray($lookup);
        $lookup = $fipr->process($this->assetPath);
        $this->assertIsArray($lookup);
        $this->assertArrayHasKey('modified', $lookup);
        $this->assertArrayHasKey('root', $lookup);
        $this->assertArrayHasKey('integrity', $lookup);
        $this->assertArrayHasKey('hash', $lookup);

        $root = (new FingerprintFile($this->assetPath))->fileRoot();
        $this->assertTrue(F::exists($root));
        $this->assertTrue(touch($root, time()-24*60*7));
        clearstatcache(); // https://stackoverflow.com/a/17380654
        $lookupTouched = $fipr->process($this->assetPath);
        $this->assertTrue($lookup['modified'] !== $lookupTouched['modified']);
        $this->assertTrue($lookup['hash'] !== $lookupTouched['hash']);
    }

    public function testCache()
    {
        $fipr = new Fingerprint();
        $lookup = $fipr->process($this->testFile);
        $this->assertIsArray($lookup);
        // again to trigger cache lookup
        $lookup = $fipr->process($this->testFile);
        $this->assertIsArray($fipr->read($this->testFile));
        $this->assertIsArray($lookup);

        $fipr = new Fingerprint([
            'debug' => true,
        ]);
        $this->assertNull($fipr->read($this->testFile));
        $lookup = $fipr->process($this->testFile);
        $this->assertNull($fipr->read($this->testFile));

        $this->assertRegExp(
            '/\/assets\/css\/main\.css\?v=\d{10}/',
            $fipr->process('/assets/css/main.css')['hash']
        );

        $this->assertRegExp(
            '/\/assets\/js\/main\.js\?v=\d{10}/',
            $fipr->process('/assets/js/main.js')['hash']
        );
    }

    public function testAttrs()
    {

        $fipr = new Fingerprint();
        $lookup = $fipr->process($this->testFile);

        $attrs = [];
        $attrs = $fipr->attrs($attrs, $lookup);
        $this->assertCount(0, $attrs);

        $attrs = [
            'integrity' => true,
        ];
        $attrs = $fipr->attrs($attrs, $lookup);
        $this->assertCount(2, $attrs);
        $this->assertArrayHasKey('integrity', $attrs);
        $this->assertArrayHasKey('crossorigin', $attrs);

        $attrs = [
            'integrity' => 'custom-sri',
        ];
        $attrs = $fipr->attrs($attrs, $lookup);
        $this->assertCount(2, $attrs);
        $this->assertArrayHasKey('integrity', $attrs);
        $this->assertEquals('custom-sri', $attrs['integrity']);

        $attrs = [
            'integrity' => false,
            'crossorigin' => 'anonymous',
        ];
        $attrs = $fipr->attrs($attrs, $lookup);
        $this->assertCount(0, $attrs);
    }

    public function testHelper()
    {
        $fipr = new Fingerprint();
        $this->assertNull($fipr->helper('nope', '@auto'));
    }

    public function testStaticUrl()
    {
        $this->assertRegExp(
            '/\/assets\/css\/main\.css\?v=\d{10}$/',
            Fingerprint::url('assets/css/main.css')
        );
    }

    public function testStaticCss()
    {
        $this->assertEquals(
            '<link href="/assets/test.css" rel="stylesheet">',
            Fingerprint::css('assets/test.css')
        );

        $this->assertRegExp(
            '/\/assets\/css\/main\.css\?v=\d{10}/',
            Fingerprint::css('assets/css/main.css')
        );

        $this->assertRegExp(
            '/\/assets\/css\/main\.css\?v=\d{10}/',
            Fingerprint::css('/assets/css/main.css')
        );

        $this->assertRegExp(
            '/\/assets\/css\/templates\/default\.css\?v=\d{10}/',
            Fingerprint::css('@auto')
        );
    }

    public function testStaticJs()
    {
        $this->assertEquals(
            '<script src="/assets/test.js"></script>',
            Fingerprint::js('assets/test.js')
        );

        $this->assertRegExp(
            '/\/assets\/js\/main\.js\?v=\d{10}/',
            Fingerprint::js('assets/js/main.js')
        );

        $this->assertRegExp(
            '/\/assets\/js\/main\.js\?v=\d{10}/',
            Fingerprint::js('/assets/js/main.js')
        );

        $this->assertRegExp(
            '/\/assets\/js\/templates\/default\.js\?v=\d{10}/',
            Fingerprint::js('@auto')
        );
    }

    public function testRedirectRulesInsteadOfQuery()
    {
        $fipr = new Fingerprint([
            'query' => false,
        ]);

        $this->assertRegExp(
            '/\/assets\/css\/main\.[a-z0-9]{32}\.css/',
            $fipr->process('/assets/css/main.css')['hash']
        );

        $this->assertRegExp(
            '/\/assets\/js\/main\.[a-z0-9]{32}\.js/',
            $fipr->process('/assets/js/main.js')['hash']
        );
    }

    public function testManifestInsteadOfQuery()
    {
        $fipr = new Fingerprint([
            'query' => function() {
                return __DIR__ . '/manifest.json';
            },
        ]);

        $this->assertRegExp(
            '/\/assets\/css\/main\.1234567890\.css/',
            $fipr->process('/assets/css/main.css')['hash']
        );
    }
}
