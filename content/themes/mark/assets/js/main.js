seajs.config({
    base: '/',
    paths: {
        // 'lib': '/js/lib',
    },
    alias: {
        'scrollSpy': '/assets/js/scrollSpy',
        'infinitescroll': '/assets/js/lib/jquery-infinitescroll.min',
        'highlight': '/assets/js/lib/highlight.min.js',
    },
    charset: 'utf-8'
});

seajs.use([
    '/assets/js/common',
]);
