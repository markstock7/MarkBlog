seajs.config({
    alias: {
        'scrollSpy': '/assets/js/scrollSpy',
        'infinitescroll': '/assets/js/lib/jquery-infinitescroll.min',
        'highlight': '/assets/js/lib/highlight.min.js',
    }
});

seajs.use([
    '/assets/js/common',
]);
