// Simple JS feature detection
var className, html;
html = document.documentElement;
className = html.className.replace('no-js', 'js');
html.className = className;
