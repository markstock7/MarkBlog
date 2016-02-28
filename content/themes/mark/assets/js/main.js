//
// var mySite = {};
// mySite.initTagsCloud = function initTagsCloud() {
//     var tagsWrap = $('.tagcloud .widget-content'),
//         tagMap = {},
//         alltags = $('.tag'),
//         times = alltags.length,
//         weight,
//         sizeInterval = 10,
//         minSize = 13,
//         tmpl = '';
//     alltags.each(function() {
//         var $this = $(this);
//         // 找到所有id相同的
//         if(tagMap[$this.data('name')]) {
//             tagMap[$this.data('name')].value++;
//         } else {
//             tagMap[$this.data('name')] = {
//                 value : 1,
//                 url: $this.data('url')
//             }
//         }
//     });
//     tagsWrap.empty();
//     $.each(tagMap, function(tag, v) {
//         weight = parseInt(v.value) / times * sizeInterval + minSize + 'px';
//         tmpl += '<a href="' + v.url + '" style="font-size: ' + weight + '">' + tag + '</a>'
//     });
//     $(tmpl).appendTo(tagsWrap);
//
// };


// mySite.initMasonry = function initMasonry() {
//     var masonry = $('#masonry');
//     if(masonry.length) {
//         new Masonry(masonry, {
//             itemSelector: 'article.cell',
//             percentPosition: true,
//             gutter: 10
//         });
//     }
// }



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
