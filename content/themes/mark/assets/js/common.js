/**
 * jquery插件初始化，页面事件绑定
 *
 */

var mySite = {};
$(function () {
    // 初始化fancybox
    mySite.initFancyBox();

    // 初始化相册
    mySite.initGallery();

    // go2top
    mySite.initGo2Top();

    if($('pre code').length) {
        mySite.initCodeStyle();
    }

    var $waterfall = $('#waterfall');
    if($waterfall && $waterfall.length) {
        mySite.initScrollLoad($waterfall);
    }

    mySite.initSubtitles(scrollSpy);

    if($('body').hasClass('post-template')) {
        mySite.initDuoShuo();
    }

});

// 初始化fancybox
mySite.initFancyBox = function initFancyBox() {
    $('.article-content').each(function (i) {
        $(this).find('img')
            .each(function () {
                var $this = $(this);
                if ($this.parent().hasClass('fancybox')) {
                    return;
                }

                var alt = this.alt;
                if (alt) {
                    $this.after('<span class="img-caption">' + alt + '</span>');
                }

                $this.wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox" rel="gallery' + i + '" />');
            });
    });
    if ($.fancybox) {
        $('.fancybox').fancybox();
    }
}

// 初始化相册
mySite.initGallery = function initGallery() {
    // Gallery
    function play(parent, item, callback) {
        var width = parent.width();

        item.imagesLoaded(function () {
            var _this = this[0];
            var nWidth = _this.naturalWidth;
            var nHeight = _this.naturalHeight;

            callback();
            this.animate({opacity: 1}, 500);
            parent.animate({height: width * nHeight / nWidth}, 500);
        });
    }

    $('.article-gallery').each(function () {
        var $this = $(this);
        var current = 0;
        var photoset = $this.children('.article-gallery-photos').children();
        var photoCount = photoset.length;
        var loading = true;

        play($this, photoset.eq(0), function () {
            loading = false;
        });

        $this.on('click', '.prev', function () {
                if (!loading) {
                    var next = (current - 1) % photoCount;
                    loading = true;

                    play($this, photoset.eq(next), function () {
                        photoset.eq(current).animate({opacity: 0}, 500);
                        loading = false;
                        current = next;
                    });
                }
            })
            .on('click', '.next', function () {
                if (!loading) {
                    var next = (current + 1) % photoCount;
                    loading = true;

                    play($this, photoset.eq(next), function () {
                        photoset.eq(current).animate({opacity: 0}, 500);
                        loading = false;
                        current = next;
                    });
                }
            });
    });

}

mySite.initGo2Top = function initGo2Top() {
    function onScroll() {
        $('#go2top')[$(window).scrollTop() > 100 ? 'fadeIn' : 'fadeOut'](400);
    }

    $('#go2top').click(function () {
        $('html,body').animate({
            scrollTop: 0
        });
    });

    $(window).scroll(onScroll);
}

mySite.initCodeStyle = function initCodeStyle() {
    hljs.initHighlightingOnLoad();
    $('pre code').each(function(){
        var lines = $(this).text().split('\n').length - 1;
        var $numbering = $('<ul/>').addClass('pre-numbering');
        $(this)
            .addClass('has-numbering')
            .parent()
            .append($numbering);
        for(i=1;i<=lines;i++){
            $numbering.append($('<li/>').text(i));
        }
    });
}

mySite.initScrollLoad = function initScrollLoad($waterfall) {
    $('#waterfall').infinitescroll({
        navSelector: "nav[role='navigation']", // 页面分页元素(成功后会被隐藏)
        nextSelector: "a.older-posts", // 需要点击的下一页链接，和2的html要对应
        itemSelector: "article.list", // ajax回来之后，每一项的selecter,
        animate: false,
        extraScrollPx: 50, //向下滚动的像素，必须开启动态效果
        debug     : true,      //调试的时候，可以打开
        bufferPx: 5, //提示语展现的时长，数字越大，展现时间越短
        loading: {
            finishedMsg: '没有更多内容了', //当加载失败，或者加载不出内容之后的提示语
            // img: '', //自定义loadding的动画图
            msgText: '正在加载中', //加载时的提示语
        }
    });

}

mySite.initSubtitles = function initSubtitle(scrollSpy) {
    var TOC_WRAP = '#topic-wrap',
        CLASS_PROGRESS = '.toc-progress',
        CLASS_TOC = '.toc',
        $toc = $(TOC_WRAP);


    if($('.main-content').hasClass('post-page')) {
        var subtitles = $('.article-content h2'),
            tmpl = '',
            $toc = $('#topic-wrap .toc');
        subtitles.each(function(index, subtitle) {
            subtitle = $(subtitle);
            tmpl += '<li class="toc-item toc-level-2"><a class="toc-link" href="#'+subtitle.attr('id')+'"><span class="toc-number">'+index+'. </span><span class="toc-text">'+subtitle.text()+'</span></a></li>';
            subtitle.prepend('<a href="#'+subtitle.attr('id')+'" class="headerlink" title="'+subtitle.text()+'"></a>')
        });
        $(tmpl).appendTo($toc);

        $('#topic-wrap').sticky({  //指定的侧边栏目
            topSpacing: 58, //距离页面顶部的距离，可自行设置
        });

        var $progress = $(CLASS_PROGRESS),
            nativeSpy = scrollSpy($(CLASS_TOC)),
            wHeight;

        function getHeight() {
            wHeight = $(document.body).height() - $(window).height();
        }

        function setProgress() {
            var percent = Math.max(0, Math.min(1, $(window).scrollTop() / wHeight));
            $progress.css('width', percent * 100 + '%');
        }

        $(function () {
            getHeight();
            setProgress();

            $(window).scroll(setProgress);
            $(window).scroll(getHeight);
        });
    }
};

mySite.initDuoShuo = function initDuoShuo() {
    setTimeout(function() {
        // 延迟2秒
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0]
        || document.getElementsByTagName('body')[0]).appendChild(ds);
    }, 0);
}
