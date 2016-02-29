seajs.config({
    base: '/',
    paths: {
        'lib': '/js/lib',
        // 'monitor': '/js/monitor'
    },
    alias: {
        'sticky': '/assets/js/sticky',
        'scrollSpy': '/assets/js/scrollSpy',
        'infinitescroll': '/assets/js/lib/jquery-infinitescroll.min',
        'highlight': '/assets/js/lib/highlight.min.js',
    },
    charset: 'utf-8'
});

seajs.use([
    '/assets/js/common',
    '/assets/js/toc'
]);
