/**
 @Name : 齐霄冲 v1.1.0 

 */

;
(function(global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("Page requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    function xh_Page(options) {
        this.el = options.el;
        this.nums = options.nums; //数据总条数
        this.counts = options.counts || 10; //每页数据条数
        this.parent = document.querySelector(this.el);
        this.parent.classList.add('xh-page-elem-field-root');
        this.parentNode = document.createElement('div');
        this.parent.appendChild(this.parentNode);
        this.defaultPage = Number(options.defaultPage) || 1;
        this.last = this.nums % this.counts;
        this.pages = parseInt(this.nums / this.counts);
        this.jumpToOrder = !!options.jumpToOrder; // 是否显示跳转到指定页
        this.showNowAndAll = !!options.showNowAndAll; // 显示当前第几页，共几页
        this.showHeadFoot = !!options.showHeadFoot;
        //this.head = options.head || '首页';
        //this.foot = options.foot || '尾页';

        this.prev = '<i class="fa fa-angle-left"></i>';
        this.next = '<i class="fa fa-angle-right"></i>';

        this.headfoot = [];
        if (this.last != 0) {
            this.pages++;
        }
        this.div = options.div || 'div';
        this.domList = [];
        this.showDomList = [];
        var that = this;

        function noop() {
            if (options.clickEvent && typeof options.clickEvent == 'function') {
                options.clickEvent(that.currect);
            }
        }
        this.clickEvent = noop;
        this.init();
    }

    xh_Page.prototype = {
        init: function() {
            this.createDom();
            this.showDom();
            // 监听当前页的数字变化
            this.watcherCurrect();
            this.addDom();
            this.reanderHeadFoot();
            this.jumpToOrderPage();
            this.showNowAndAllPage();
        },
        showNowAndAllPage: function() {
            if (this.showNowAndAll) {
                var pagesbox = document.createElement('div');
                var allPages = document.createElement('div');
                //var currectPage = document.createElement('div');
                var line = document.createElement('div');
                pagesbox.classList.add('xh-pagesbox');
                allPages.classList.add('xh-allPages');
                //currectPage.classList.add('xh-currectPage');
                //line.classList.add('xh-line');
                //currectPage.innerText = this.currect;
                allPages.innerHTML = '<span class="xh-total">共 ' + this.pages + ' 页</span>';
                //line.innerText = '/';
                //pagesbox.appendChild(currectPage);
                pagesbox.appendChild(line);
                pagesbox.appendChild(allPages);
                this.parent.appendChild(pagesbox);
                this.showNowAndAllPageDom = {
                    pagesbox: pagesbox,
                    allPages: allPages,
                    // currectPage: currectPage,
                    line: line
                };
            }
        },
        jumpToOrderPage: function() {
            if (this.jumpToOrder) {
                var toPage = document.createElement('div');
                var inputBox = document.createElement('div');
                var input = document.createElement('input');
                // var showInputVal = document.createElement('div');
                toPage.classList.add('xh-toPage');
                inputBox.classList.add('xh-inputBox');
                input.classList.add('xh-inputborder');
                input.type = 'text';
                input.value = this.currect;
                // showInputVal.innerText = this.currect;
                // showInputVal.classList.add('show-val');
                this.addEventForInput(input);
                inputBox.appendChild(input);
                // inputBox.appendChild(showInputVal);
                toPage.appendChild(inputBox);
                this.parent.appendChild(toPage);
                this.jumpToOrderPageDom = {
                    toPage: toPage,
                    input: input,
                    inputBox: inputBox
                };
            }
        },
        addEventForInput: function(input, showInputVal) {
            var that = this;
            // input.addEventListener('input', function(e) {
            // 	var value = e.target.value;
            // 	showInputVal.innerText = value;

            // })
            input.addEventListener('change', function(e) {
                var value = e.target.value;
                if (value > that.pages) {
                    value = that.pages;
                } else if (value < 1) {
                    value = 1;
                }
                that.currect = value;
                this.value = value;
                // showInputVal.innerText = value;
            })
        },
        updateCurrectAndOrderBox: function(val) {
            if (this.jumpToOrder) {
                this.jumpToOrderPageDom.input.value = val;
            }
            if (this.showNowAndAll) {
                //this.showNowAndAllPageDom.currectPage.innerText = val;
            }
        },
        reanderHeadFoot: function() {
            if (!this.showHeadFoot) {
                return;
            }
            var div = this.div;
            //var head = document.createElement(div);
            //var foot = document.createElement(div);
            //head.innerHTML = this.head;
            //head.classList.add('xh-item');
            //head.classList.add('xh-head');
            //foot.innerHTML = this.foot;
            //foot.classList.add('xh-item');
            //foot.classList.add('xh-foot');
            //this.headfoot.push(head);
            //this.headfoot.push(foot);
            //this.parentNode.insertBefore(head, this.parentNode.firstChild);
            //this.parentNode.appendChild(foot);
            //this.addEventHeadFoot();
            //this.headFootDisable();
        },
        headFootDisable: function() {
            if (this.currect === 1) {
                this.headfoot[0].classList.add('xh-item-disable');
            } else if (this.currect === this.pages) {
                this.headfoot[1].classList.add('xh-item-disable');
            }
        },
        addEventHeadFoot: function() {
            var that = this;
            this.headfoot[0].addEventListener('click', function() {
                if (that.currect != 1) {
                    that.currect = 1;
                }
            });
            this.headfoot[1].addEventListener('click', function() {
                if (that.currect != that.pages) {
                    that.currect = that.pages;
                }
            });
        },
        createDom: function() {
            var div = this.div;
            var domList = this.domList;
            var prev = document.createElement(div);
            var next = document.createElement(div);
            prev.innerHTML = this.prev;
            prev.classList.add('xh-item');
            next.innerHTML = this.next;
            next.classList.add('xh-item');
            domList[0] = prev;
            var pages = this.pages;
            for (var i = 0; i < pages; i++) {
                var item = document.createElement(div);
                item.classList.add('xh-item');
                item.innerHTML = i + 1;
                domList[i + 1] = item;
            }
            domList.push(next);
            return domList;
        },
        showDom: function() {
            var domList = this.domList;
            var len = domList.length;
            var list = this.showDomList;
            var defaultPage = this.defaultPage;
            if (len <= 12) {
                for (var i = 0; i < len; i++) {
                    list[i] = domList[i];
                }
            } else {
                var offset = defaultPage - 6 < 0 ? 0 : defaultPage - 6;
                var cha = this.pages - defaultPage;
                if (cha < 5) {
                    offset = this.pages - 10;
                }
                list[0] = domList[0];
                for (var i = 1; i < 8; i++) {
                    list[i] = domList[i + offset];
                }
                list[i] = domList[len - 1];
            }
            return list;
        },
        addDom: function() {
            this.parentNode.classList.add('xh-page-elem-field');
            this.addAndRemoveClass();
            this.addEvent();
            var fgDom = document.createDocumentFragment();
            var showDomList = this.showDomList;
            var len = showDomList.length;
            for (var i = 0; i < len; i++) {
                fgDom.appendChild(showDomList[i]);
            }
            this.parentNode.appendChild(fgDom);
        },
        addEvent: function() {
            var domList = this.domList;
            var len = domList.length;
            for (var i = 0; i < len; i++) {
                domList[i].addEventListener('click', this.jump.bind(domList[i], this));
            }
        },
        jump: function jump(p) {
            var thispage = this.innerHTML;
            if ((thispage == p.prev && p.currect == 1) ||
                (thispage == p.next && p.currect == p.pages) ||
                (thispage == p.currect)) {
                return;
            }
            if (thispage == p.prev && p.currect > 1) {
                p.currect--;
            } else if (thispage == p.next && p.currect < p.pages) {
                p.currect++;
            } else if (thispage != p.prev && thispage != p.next) {
                p.currect = Number(thispage);
            }
        },
        addAndRemoveClass: function() {
            var domList = this.domList;
            if (this.currect === 1) {
                domList[0].classList.add('xh-item-disable');
            } else if (this.currect === this.pages) {
                domList[domList.length - 1].classList.add('xh-item-disable');
            }
            domList[this.currect].classList.add('xh-active');
        },
        activeCurrectItem: function(val) {
            var domList = this.domList;
            domList[val].classList.add('xh-active');
            domList[0].classList.remove('xh-item-disable');
            domList[domList.length - 1].classList.remove('xh-item-disable');
            /*if (this.showHeadFoot) {
                this.headfoot[0].classList.remove('xh-item-disable');
                this.headfoot[1].classList.remove('xh-item-disable');
            }*/
            if (val == 1) {
                // 第一页就显示禁止的图标
                domList[0].classList.add('xh-item-disable');
                if (this.showHeadFoot) {
                    this.headfoot[0].classList.add('xh-item-disable');
                }
            } else if (val == this.pages) {
                // 最后一页就显示禁止的图标
                domList[domList.length - 1].classList.add('xh-item-disable');
                /*if (this.showHeadFoot) {
                    this.headfoot[1].classList.add('xh-item-disable');
                }*/
            }
        },
        moveDom: function(val, oneDomNumber) {
            var domList = this.domList;
            var showDomList = this.showDomList;
            var cha = val - oneDomNumber;
            var moves = 0;
            if (cha > 5) {
                moves = cha - 5; //首部移除几个
                // 最后一个元素后面还有几个元素
                var showlastnum = Number(showDomList[showDomList.length - 2].innerHTML);
                var afters = this.pages - showlastnum;
                // console.log(afters, moves)
                if (afters > 0 && moves > 0) {
                    // 需要移动的dom数量，并且是存在这么多数量
                    var howmany = Math.min(afters, moves);
                    for (var i = 0; i < howmany; i++) {
                        showDomList.splice(showDomList.length - 1, 0, domList[showlastnum + i + 1]);
                        this.parentNode.insertBefore(domList[showlastnum + i + 1], showDomList[showDomList.length - 1]);
                        this.parentNode.removeChild(showDomList[i + 1]);
                    }
                    showDomList.splice(1, howmany);
                }
            }
            if (cha <= 5 && oneDomNumber != 1) {
                if (val <= 5) {
                    moves = oneDomNumber - 1;
                } else {
                    moves = 5 - cha;
                }
                // 移动几个dom
                var howmany = moves;
                for (var i = 0; i < howmany; i++) {
                    this.parentNode.insertBefore(domList[oneDomNumber - i - 1], showDomList[1]);
                    this.parentNode.removeChild(showDomList[showDomList.length - 2 - i]);
                    showDomList.splice(1, 0, domList[oneDomNumber - i - 1]);
                }
                showDomList.splice(showDomList.length - 1 - howmany, howmany);
                // console.log('往前移动' + moves);
            }
            oneDomNumber = Number(showDomList[1].innerHTML);
            return oneDomNumber;
        },
        watcherCurrect: function() {
            var val = this.defaultPage;
            var domList = this.domList;
            var showDomList = this.showDomList;
            var oneDomNumber = Number(showDomList[1].innerHTML);
            Object.defineProperty(this, 'currect', {
                enumerable: true,
                configrable: false,
                set: function(v) {
                    domList[val].classList.remove('xh-active');
                    val = v;
                    // 更新输入框中的值，当前第几页的值
                    this.updateCurrectAndOrderBox(val);
                    // 更新pages的dom，不变的保留，改变的添加和删除，没有直接更新覆盖，重用了相同的dom
                    oneDomNumber = this.moveDom(val, oneDomNumber);
                    // 当前选择页激活
                    this.activeCurrectItem(val);
                    // 执行用户自定义事件
                    this.clickEvent(val);
                },
                get: function() {
                    return val;
                }
            })
        }
    }
    xh_Page.prototype.constructor = xh_Page;
    if (typeof noGlobal === "undefined") {
        window.xh_Page = xh_Page;
    }
    return xh_Page;
})



;
(function($) {
    //$.xh_setCookie('xh', '测试123', 1, '/xhdemo');
    //alert($.xh_getCookie('xh'));
    $.extend({
        xh_setCookie: function(name, value, time, path) {
            var cdata = name + "=" + value;
            if (time) {
                var d = new Date();
                d.setHours(d.getHours() + time);
                cdata += "; expires=" + d.toGMTString();
            }
            cdata += path ? ("; path=" + path) : "";
            document.cookie = cdata;
        },
        xh_getCookie: function(name) {
            var cname = name + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(cname) == 0) {
                    return c.substring(cname.length, c.length);
                }
            }
            return "";
        }
    })

    $.fn.extend({
        xh_alert: function(isshow) {
            $(this).click(function() {
                if (isshow == 'show') {
                    $(this).show(200);
                } else if (isshow == 'hide') {
                    $(this).hide(200);
                }
            });
        },
        xh_prompt: function(prompt, text, time) {
            $('.xh_prompt').remove();
            var h = '<div class="xh_prompt"><div class="xh_prompt_box">';
            if (prompt == 'success') {
                if (text == '' || text == null || text == undefined) {
                    console.log('提示信息不能为空');
                    return;
                } else {
                    h += text + '</div></div>';
                    $('body').prepend(h);
                    $('.xh_prompt').find('.xh_prompt_box').addClass('xh-prompt-success');
                    $('.xh_prompt').show(200);
                    if (time != '' && time != null && time != undefined) {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, time);
                    } else {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, 1500);
                    }
                }
            } else if (prompt == 'warm') {
                if (text == '' || text == null || text == undefined) {
                    console.log('提示信息不能为空');
                    return;
                } else {
                    h += text + '</div></div>';
                    $('body').prepend(h);
                    $('.xh_prompt').find('.xh_prompt_box').addClass('xh-prompt-warm');
                    $('.xh_prompt').show(200);
                    if (time != '' && time != null && time != undefined) {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, time);
                    } else {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, 1500);
                    }
                }
            } else if (prompt == 'danger') {
                if (text == '' || text == null || text == undefined) {
                    console.log('提示信息不能为空');
                    return;
                } else {
                    h += text + '</div></div>';
                    $('body').prepend(h);
                    $('.xh_prompt').find('.xh_prompt_box').addClass('xh-prompt-danger');
                    $('.xh_prompt').show(200);
                    if (time != '' && time != null && time != undefined) {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, time);
                    } else {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, 1500);
                    }
                }
            }
        },
        xh_bload: function(text, isload = true) {
            if (text != '') {
                if (isload == true) {
                    $(this).xh_disabled(isload);
                    var h = text;
                    if ($(this).attr('xh-bload') == 'true') {
                        h += ' <i class="fa fa-circle-o-notch fa-spin"></i>';
                    }
                    $(this).html(h);
                } else {
                    $(this).xh_disabled(isload);
                    var h = text;
                    $(this).html(h);
                }
            } else {
                console.log('请填写提示信息');
            }
        },
        xh_disabled: function(isdis) {
            if (isdis == true) {
                $(this).attr("disabled", "true");
                $(this).addClass('xh-disabled');
            } else {
                $(this).removeAttr("disabled");
                $(this).removeClass('xh-disabled');
            }
        },
        xh_modal: function(isshow) {
            var thismodal = $(this);
            if (isshow == 'show') {
                $(this).show(200);
                var dragging = false;
                var iX, iY;
                thismodal.find(".xh-modal-title").bind("mousedown", function() {
                    thismodal.find(".xh-modal-content").mousedown(function(e) {
                        dragging = true;
                        iX = e.clientX - this.offsetLeft;
                        iY = e.clientY - this.offsetTop;
                        this.setCapture && this.setCapture();
                        return false;
                    })

                });

                thismodal.find(".xh-modal-content").bind("mousemove", function(e) {
                    if (dragging) {
                        var e = e || window.event;
                        var oX = e.clientX - iX;
                        var oY = e.clientY - iY;
                        var max_width = thismodal.width();
                        var max_height = thismodal.height();
                        var box_width = thismodal.find('.xh-modal-content').width();
                        var box_height = thismodal.find('.xh-modal-content').height();
                        oX = oX < 0 ? 0 : oX;
                        oX = oX > max_width - box_width ? max_width - box_width : oX;
                        oY = oY < 0 ? 0 : oY;
                        oY = oY > max_height - box_height ? max_height - box_height : oY;
                        thismodal.find(".xh-modal-content").css({
                            "margin": "0",
                            "left": oX + "px",
                            "top": oY + "px"
                        });
                        return false;
                    }
                })

                thismodal.find(".xh-modal-content").bind("mouseup", function(e) {
                    dragging = false;
                    //thismodal.find(".xh-motent")[0].releaseCapture();
                    e.cancelBubble = true;
                    $(this).unbind("mousedown"); // 清除事件
                })
            } else if (isshow == 'hide') {
                thismodal.hide(200);
            }

            thismodal.find('.xh-close').click(function() {
                var attr = $(this).attr('xh-modal');
                if (attr == 'close') {
                    thismodal.hide(200);
                }
            });
        },
        xh_setprogress: function(perce, color) {
            var id = $(this).attr('xh-setprogress');
            $(id).find('.xh-progress-bar').animate({ width: perce }, 400);
            color != null && color != undefined && color != '' ? $(id).find('.xh-progress-bar').addClass(color) : '';
            $(id).find('.xh-progress-text').text(perce);
        },
        xh_get_selected: function(type) {
            var t = '';
            switch (type) {
                case 'text':
                    var ismultiple = $(this).attr('multiple');
                    if (ismultiple == 'multiple') {
                        $(this).find('option').each(function() {
                            var isselected = $(this).attr('selected');
                            if (isselected == 'selected') {
                                t += $(this).text() + ',';
                            }
                        })
                        t = xh_remove_lastcomma(t);
                    } else {
                        $(this).find('option').each(function() {
                            var isselected = $(this).attr('selected');
                            if (isselected == 'selected') {
                                t = $(this).text();
                            }
                        })
                    }
                    break;
                case 'val':
                    var ismultiple = $(this).attr('multiple');
                    if (ismultiple == 'multiple') {
                        $(this).find('option').each(function() {
                            var isselected = $(this).attr('selected');
                            if (isselected == 'selected') {
                                t += $(this).val() + ',';
                            }
                        })
                        t = xh_remove_lastcomma(t);
                    } else {
                        $(this).find('option').each(function() {
                            var isselected = $(this).attr('selected');
                            if (isselected == 'selected') {
                                t = $(this).val();
                            }
                        })
                    }
                    break;
            }
            return t;
        },
        xh_show_info: function(option) {
            this.title = option.title;
            this.type = option.type;
            this.content = option.content;
            var self = this;

            var sjid = xh_randomWord(false, 30);
            var sjcid = xh_randomWord(false, 30);
            var sjtid = xh_randomWord(false, 30);

            if (this.content != '' && this.content != undefined) {
                var t = this.content;
            } else {
                if (this.type == 'text') {
                    var t = $(this).text();
                } else if (this.type == 'html') {
                    var t = $(this).html();
                }
            }

            $('.xh-show-modal').remove();
            var h = '<div id="' + sjid + '" class="xh-modal xh-show-modal">';
            h += '<div class="xh-modal-content" id="' + sjcid + '">';
            h += '<div class="xh-modal-title">' + self.title + '<i class="fa fa-window-maximize" id="' + sjtid + '"></i><i class="fa fa-close xh-close" xh-modal="close"></i></div>';
            h += '<div class="xh-modal-text">' + t + '<div class="xh-clearfix"></div></div>';
            h += '<div class="xh-modal-foot"><button class="xh-btn xh-close" xh-modal="close">关闭</button></div>';
            h += '</div></div>';
            $('body').append(h);
            $('#' + sjid).xh_modal('show');
            var w = new xh_winchang({
                el: '#' + sjcid,
                clickel: '#' + sjtid
            })

        }

    });
})(jQuery);



function xh_alert_load(start, text) {
    $('.xh-alert-load').remove();
    text = text == undefined || text == null ? '' : text;
    var h = '<div class="xh-alert-load"><div class="xh-alert-box">';
    h += '<i class="fa fa-spinner fa-spin"></i> ' + text + '</div></div>';
    $('body').prepend(h);
    if (start == 'show') {
        $('.xh-alert-load').show(200);
    } else if (start == 'hide') {
        $('.xh-alert-load').hide(200);
    } else {
        return;
    }
}

$(function() {

    xh_iframe(); // 页面高度初始化
    $('.xh-nav-child-down').parent('li').addClass("xh-nav-down-parent");
    $('.xh-nav-child-tdown').parent('li').addClass("xh-nav-down-parent");

    xh_uplist(); // 菜单栏初始化

    xh_select(); // 下拉菜单初始化

    xh_init_file(); // 上传按钮初始化

    xh_preview_file(); // 预览文件插件初始化


    $("body").on("mouseenter", ".xh-nav", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        $(xh_nav_id).addClass('xh-nav-manu');
        $(xh_nav_id).slideDown(200);
    });

    $("body").on("mouseleave", ".xh-nav", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        $(xh_nav_id).addClass('xh-nav-manu');
        $(xh_nav_id).stop().slideUp(200);
    });

    $("body").on("click", ".xh-nav", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        $(xh_nav_id).addClass('xh-nav-manu');
        $(xh_nav_id).show(200);
    });

    $("body").on("click", ".xh-nav-down", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        var display = $(xh_nav_id).parent('li').css('display');
        $('.xh-nav-child-down').parent('li').slideUp(200);
        $('.xh-nav-child-tdown').parent('li').slideUp(200);
        if (display == 'none') {
            $(xh_nav_id).parent('li').slideDown(200);
        }
    });

    $("body").on("click", ".xh-nav-tdown", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        var display = $(xh_nav_id).parent('li').css('display');
        $('.xh-nav-child-tdown').parent('li').slideUp(200);
        if (display == 'none') {
            $(xh_nav_id).parent('li').slideDown(200);
        }
    });

    $('#xh-isopen').click(function() {
        var d = $(this).data('isopen');
        if (d == 1 || d == undefined) {
            $(".xh-menu").animate({ width: '0px' });
            $(".xh-menu").animate({ border: '0px' });
            $('.xh-context').animate({ left: '0px' });
            $('.xh-menu ul li').animate({ padding: '0' });
            $('.xh-menu').addClass('xh-ellipsis');
            $('.xh-menu-all').animate({ padding: '0' });
            $(this).data("isopen", "2");
        } else {
            $('.xh-menu').animate({ width: '235px' });
            $('.xh-context').animate({ left: '235px' });
            $('.xh-menu ul li').animate({ padding: '10px 10px 10px 20px' });
            $('.xh-menu').removeClass('xh-ellipsis');
            $('.xh-menu-all').animate({ padding: '10px 10px 10px 20px' });
            $(this).data("isopen", "1");
        }
    });

    $("body").on("click", ".xh-menu-all", function() {
        $('.xh-menu').attr('style', 'width:240px');
        $('.xh-context').attr('style', 'left:240px');
        $('.xh-menu ul li').attr('style', 'padding:10px 10px 10px 20px');
        $('.xh-menu').removeClass('xh-ellipsis');
        $('#xh-isopen').data("isopen", "1");
        //$('#xh-isopen').addClass('xh-p-events');
        var s = $('.xh-menu-all').attr('xh-show-id');
        $(s).show(400);
    });

    $("body").on("click", "#xh-back", function() {
        $('.xh-menu').attr('style', 'width:240px');
        $('.xh-context').attr('style', 'left:240px');
        $('.xh-menu ul li').attr('style', 'padding:10px 10px 10px 20px');
        $('.xh-menu').removeClass('xh-ellipsis');
        $('#xh-isopen').data("isopen", "1");
        //$('#xh-isopen').removeClass('xh-p-events');
        var s = $('.xh-menu-all').attr('xh-show-id');
        $(s).hide(400);
    });

    $('.xh-menu li').click(function() {
        var xh_href = $(this).attr('xh-href');
        if (xh_href != '' && xh_href != undefined) {
            $('.xh-text').find('iframe').css('display', 'none');
            $('#xh-menubar').find('li').removeClass("xh-tactive");
            var t_name = $(this).text();
            var bhegit = $(window).height();
            var text_hegit = bhegit * 1 - 120;
            var h = '<li xh-id="' + xh_href + '" >' + t_name + '<b class="fa fa-close"></b></li>';
            var ir = '<iframe src="' + xh_href + '" class="xh-iframe" style="height: ' + text_hegit + 'px"></iframe>';
            var a;
            $('.xh-iframe').each(function() {
                var d = $(this).attr('src');
                if (d == xh_href) {
                    a = 1;
                    $(this).css('display', 'block');
                }
            });
            if (a != 1) {
                $('.xh-text').append(ir);
                $('#xh-menubar').append(h);
            }
            $('#xh-menubar li').each(function() {
                var td = $(this).attr('xh-id');
                if (td == xh_href) {
                    $(this).addClass('xh-tactive');
                }
            });
            xh_uplist();
        }

    });

    $("body").on("click", "#xh-menubar li", function() {
        var t = $(this).attr('xh-id');
        $('#xh-menubar li').each(function() {
            var td = $(this).attr('xh-id');
            if (td == t) {
                $('#xh-menubar').find('li').removeClass("xh-tactive");
                $(this).addClass('xh-tactive');
            }
        });
        $('.xh-iframe').each(function() {
            var d = $(this).attr('src');
            if (d == t) {
                $('.xh-iframe').css('display', 'none');
                $(this).show();
            }
        });
        xh_uplist();
    });

    $("body").on("click", "#xh-menubar li .fa-close", function() {
        var obj = this;
        var t = $(this).parent('li').attr('xh-id');
        $('.xh-iframe').each(function() {
            var d = $(this).attr('src');
            if (d == t) {
                $(obj).parent('li').remove();
                $(this).remove();
                $('.xh-iframe').css('display', 'none');
                $('.xh-iframe:last').css('display', 'block')
            }
        });
        $('#xh-menubar').find('li').removeClass("xh-tactive");
        $('#xh-menubar li:last').addClass('xh-tactive');
        xh_uplist();
    });

    $("body").on("click", ".xh-alert-close", function() {
        $(this).parent('.xh-alert').hide(200);
    });

    $('#xh-refresh').click(function() {
        $(this).addClass('fa-spin');
        var obj = this;
        $('.xh-iframe').each(function() {
            if (!$(this).is(":hidden")) {
                var self = this;
                setTimeout(function() {
                    $(self).attr('src', $(self).attr('src'));
                    $(obj).removeClass('fa-spin');
                }, 400);
            }
        });
    });

    $("body").on("click", "#xh-menulist", function() {
        $('#xh-menu-list').slideToggle(200);
    });
    $("body").on("click", "#xh-menu-list li .fa-close", function() {
        var obj = this;
        var t = $(this).parent('li').attr('xh-href');
        $('.xh-iframe').each(function() {
            var d = $(this).attr('src');
            if (d == t) {
                $(obj).parent('li').remove();
                $(this).remove();
                $('.xh-iframe').css('display', 'none');
                $('.xh-iframe:last').css('display', 'block')
            }
        });
        $('#xh-menubar li').each(function() {
            var td = $(this).attr('xh-id');
            if (td == t) {
                $(this).remove();
            }
        });
        $('#xh-menubar').find('li').removeClass("xh-tactive");
        $('#xh-menubar li:last').addClass('xh-tactive');
        xh_uplist();
    });

    $("body").on("click", "#xh-menu-list li", function() {
        var obj = this;
        var t = $(this).attr('xh-href');
        $('#xh-menubar li').each(function() {
            var td = $(this).attr('xh-id');
            if (td == t) {
                $('#xh-menubar').find('li').removeClass("xh-tactive");
                $(this).addClass('xh-tactive');
            }
        });
        $('.xh-iframe').each(function() {
            var d = $(this).attr('src');
            if (d == t) {
                $('.xh-iframe').css('display', 'none');
                $(this).show();
            }
        });
        xh_uplist();
    });

    $(document).bind("click", function(e) {　　　　　　
        var target = $(e.target);　　　　　　
        if (target.closest(".xh-select").length == 0) {　
            $(".xh-selext-text").slideUp(200);　　　　　　
        }　　　　　　　　　　
    })

    $('body').on('click', '.xh-dropdown-toggle', function() {
        var isdisabled = $(this).parent('.xh-select').siblings('.xh-selectpicker').attr('disabled');
        if (isdisabled != 'disabled') {
            var display = $(this).siblings('.xh-selext-text').css('display');
            if (display == 'none') {
                $(this).siblings('.xh-selext-text').slideDown(200);
            } else {
                $(this).siblings('.xh-selext-text').slideUp(200);
            }
        }
    })

    $('body').on('click', '#xh-fullscreen', function() {

        if ($(this).hasClass('fa-expand')) {
            $(this).addClass('fa-compress');
            $(this).removeClass('fa-expand');
            xh_fullscreen();
        } else {
            $(this).addClass('fa-expand');
            $(this).removeClass('fa-compress');
            xh_exitFullscreen();
        }

    })

})

function xh_fullscreen() {
    elem = document.body;
    if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.requestFullScreen) {
        elem.requestFullscreen();
    } else {
        //浏览器不支持全屏API或已被禁用
        alert('您的浏览器不支持全屏API或已被禁用');
    }
}

function xh_exitFullscreen() {
    var elem = document;
    if (elem.webkitCancelFullScreen) {
        elem.webkitCancelFullScreen();
    } else if (elem.mozCancelFullScreen) {
        elem.mozCancelFullScreen();
    } else if (elem.cancelFullScreen) {
        elem.cancelFullScreen();
    } else if (elem.exitFullscreen) {
        elem.exitFullscreen();
    } else {
        //浏览器不支持全屏API或已被禁用
        alert('您的浏览器不支持全屏API或已被禁用');
    }
}

function xh_uplist() {
    var lh = '<ul id="xh-menu-list">';
    var i = 1;
    $('#xh-menubar li').each(function() {
        var d = $(this).attr('xh-id');
        var szclass = $(this).hasClass('xh-tactive') ? "xh-lactive" : '';
        if (i == 1) {
            var h = $(this).html();
            lh += '<li class="xh-href ' + szclass + '" xh-href="' + d + '">' + h + '</li>';
        } else {
            var name = $(this).text();
            lh += '<li class="xh-href ' + szclass + '" xh-href="' + d + '">' + name + ' <b class="fa fa-close"></b></li>';
        }
        i++;
    });
    lh += '</ul>';
    $('#xh-menulist').html(lh);
}


function xh_iframe() {
    var bhegit = $(window).height();
    var text_hegit = bhegit * 1 - 50;
    $('.xh-menu').attr('style', 'height:' + text_hegit + "px");
    $('.xh-context').attr('style', 'height:' + text_hegit + "px");
    $('.xh-context').find('iframe').attr('style', 'height:' + (text_hegit * 1 - 70) + "px");
    $('.xh-text').attr('style', 'height:' + (text_hegit * 1 - 40) + "px");
}

function xh_winchang(option) {
    var obj = this;
    this.el = option.el;
    this.clickel = option.clickel;

    $("body").off("click").on("click", obj.clickel, function() {
        // isfd 1 放大 2 缩小
        var isfd = $(this).data('isfd');
        if (isfd == 2) {
            $(obj.el).removeClass("xh-wchang-fd");
            $(obj.clickel).addClass('fa-window-maximize');
            $(obj.clickel).removeClass('fa-window-restore');
            var style = $(this).data('style');
            $(obj.el).attr('style', '');
            style != undefined ? $(obj.el).attr('style', style) : '';
            $(this).data('isfd', 1);
        } else {
            $(obj.el).addClass("xh-wchang-fd");
            var style = $(obj.el).attr('style');
            $(this).data('style', style);
            $(obj.el).attr('style', '');
            $(obj.el).css({ 'width': '100%', 'margin': '0px' });
            $(obj.clickel).removeClass('fa-window-maximize');
            $(obj.clickel).addClass('fa-window-restore');
            $(this).data('isfd', 2);
        }

    })
}

function xh_slider(option) {
    var slider = false;
    var isyz = false;
    this.el = option.el;
    var startX;
    var box = '<div class="xh-slider-box"><div class="xh-slider-bar"></div>'
    box += '<div class="xh-slider-move"><i class="fa fa-angle-double-right"></i></div>';
    box += '<div class="xh-silder-text">拖动滑块验证</div></div>';
    box += '</div>';
    $(this.el).append(box);

    $("body").on("mousedown", ".xh-slider-move", function(e) {
        slider = true;
        iX = e.clientX - this.offsetLeft;
    });

    $("body").on("mousemove", ".xh-slider-move", function(e) {
        if (slider) {
            var oX = e.clientX - iX;
            var max_width = $(this).parent('.xh-slider-box').width();
            var slider_width = $(this).width();
            oX = oX < 0 ? 0 : oX;
            oX = oX > max_width - slider_width ? max_width - slider_width : oX;
            $(this).css({ 'left': oX + 'px' });
            $(this).siblings('.xh-slider-bar').css('width', oX + 'px');
            if (oX >= (max_width - slider_width)) {
                var i = '<i class="fa fa-check"></i>';
                $(this).addClass("xh-slider-success");
                $(this).html(i);
                $(this).siblings('.xh-silder-text').text('验证成功');
                isyz = true;
                xh_slider_unbind(this);
                option.success('success');
            }
        }

    })

    $("body").on("mouseup", ".xh-slider-move", function() {
        if (isyz) {
            xh_slider_unbind(this);
        } else {
            var i = '<i class="fa fa-angle-double-right"></i>';
            $(this).html(i);
            $(this).removeClass("xh-slider-success");
            $(this).css({ 'left': '0px' });
            $(this).siblings('.xh-slider-bar').css('width', '0px');
        }
        slider = false;
        $(this).off("mousedown"); // 清除事件

    });

    $("body").on("mouseleave", ".xh-slider-move", function() {
        if (isyz) {
            xh_slider_unbind(this);
        } else {
            var i = '<i class="fa fa-angle-double-right"></i>';
            $(this).html(i);
            $(this).removeClass("xh-slider-success");
            $(this).css({ 'left': '0px' });
            $(this).siblings('.xh-slider-bar').css('width', '0px');
        }
        slider = false;
        $(this).off("mousedown"); // 清除事件

    });

    $("body").on("touchstart", ".xh-slider-move", function(e) {
        slider = true;
        startX = e.originalEvent.changedTouches[0].pageX;
    });

    $("body").on("touchmove", ".xh-slider-move", function(e) {
        if (slider) {
            var oX = e.originalEvent.changedTouches[0].pageX - startX;
            var max_width = $(this).parent('.xh-slider-box').width();
            var slider_width = $(this).width();
            oX = oX < 0 ? 0 : oX;
            oX = oX > max_width - slider_width ? max_width - slider_width : oX;
            $(this).css({ 'left': oX + 'px' });
            $(this).siblings('.xh-slider-bar').css('width', oX + 'px');
            if (oX >= (max_width - slider_width)) {
                var i = '<i class="fa fa-check"></i>';
                $(this).addClass("xh-slider-success");
                $(this).html(i);
                $(this).siblings('.xh-silder-text').text('验证成功');
                isyz = true;
                xh_slider_unbind(this);
                option.success('success');
            }
        }

    })

    $("body").on("touchend", ".xh-slider-move", function() {
        if (isyz) {
            xh_slider_unbind(this);
        } else {
            var i = '<i class="fa fa-angle-double-right"></i>';
            $(this).html(i);
            $(this).removeClass("xh-slider-success");
            $(this).css({ 'left': '0px' });
            $(this).siblings('.xh-slider-bar').css('width', '0px');
        }
        slider = false;
        $(this).off("touchend"); // 清除事件
    });


}

function xh_slider_unbind(obj) {
    $("body").unbind("mousemove");
    $("body").unbind("mouseup");
    $("body").unbind("mousedown");
    $("body").unbind("touchstart");
    $("body").unbind("touchmove");
    $("body").unbind("touchend");
}

function xh_select() {
    $('.xh-selectpicker').each(function() {
        $(this).hide();
        var classname = $(this).attr('class');
        if (classname != undefined) {
            classname = classname.replace('xh-selectpicker', '');
            var width = $(this).attr('xh-select-width');
            width = width != undefined && width != '' && width != 'null' ? width : '';
            var title = $(this).attr('xh-title');
            var isdisabled = $(this).attr('disabled');
            var hdis = isdisabled != 'disabled' ? '' : 'xh-disabled';
            var style = $(this).attr('xh-select-style');
            //console.log(style);
            var classys = '';
            if (style == 'info') {
                classys = 'xh-select-info';
            } else if (style == 'warm') {
                classys = 'xh-select-warm';
            } else if (style == 'success') {
                classys = 'xh-select-success';
            } else if (style == 'danger') {
                classys = 'xh-select-danger';
            }
            //console.log(classys);
            var xh_size = $(this).attr('xh-size');
            var max_height = xh_size * 39;
            var h = '<div class="' + classname + ' xh-select ' + hdis + ' ' + classys + '" style="width:' + width + ';">';
            var bt = '<div class="xh-selext-text" style="height:' + max_height + 'px">';
            var isreal = $(this).attr('xh-real-search');
            bt += isreal == 'true' ? '<div class="xh-boxsearch xh-from-box"><input type="text" class="xh-input"></div>' : '';
            bt += '<ul><li>' + title + '<i class="fa fa-check xh-fright xh-displaynone-im"></i></li>';
            $(this).find('option').each(function() {
                var t = $(this).text();
                if (title == undefined || title == '' || title == 'null') {
                    title = t;
                }
                bt += '<li>' + t + '<i class="fa fa-check xh-fright xh-displaynone-im"></i></li>';
            })
            bt += '</ul></div>';
            h += '<button class="xh-btn xh-dropdown-toggle ' + hdis + '"><span class="xh-fleft xh-dropdown-title">' + title + '</span><span class="xh-caret"><i class="fa fa-caret-down xh-dropdown-ico"></i><span></button>';
            h += bt;
            h += '</div>';
            $(this).before(h);
        }
    })

    $("body").on("input propertychange", ".xh-boxsearch input", function() {
        var t = $(this).val();
        $(this).parent('.xh-boxsearch').siblings('ul').find('li').addClass('xh-displaynone-im');
        if (t != '') {
            $(this).parent('.xh-boxsearch').siblings('ul').find('li').each(function() {
                var opset = $(this).text();
                if (opset.indexOf(t) != -1) {
                    $(this).removeClass('xh-displaynone-im');
                }
            });
        } else {
            $(this).parent('.xh-boxsearch').siblings('ul').find('li').removeClass('xh-displaynone-im');
        }


    })

    $('body').on('click', '.xh-selext-text li', function() {
        var isdisabled = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').attr('disabled');
        var title = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').attr('xh-title');
        if (isdisabled != 'disabled') {
            var isMultiple = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').attr("multiple");
            var xzz = $(this).text();
            var ytitle = $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text();
            var maxnum = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').attr('xh-max-number');
            var yi = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').data('i');
            if ($(this).find('.fa-check').hasClass('xh-displaynone-im')) {
                var obj = this;
                if (isMultiple == 'multiple') {
                    var newxzz = '';
                    if (maxnum != undefined && !isNaN(parseInt(maxnum)) && maxnum != '' && maxnum != null) {
                        var i = yi == undefined || yi == '' || yi == 'null' ? 0 : yi;
                        $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find('option').each(function() {
                            if (i < parseInt(maxnum)) {
                                $(obj).find('.fa-check').removeClass('xh-displaynone-im');
                                $(obj).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').addClass('xh-xzselect');
                                $(obj).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", true);
                                if ($(this).attr('selected') == 'selected') {
                                    newxzz += $(this).text() + ',';
                                }
                            }
                        })
                        newxzz = xh_remove_lastcomma(newxzz);
                        newxzz = newxzz == '' ? ytitle : newxzz;
                        if (i < maxnum) {
                            i++;
                            $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').data('i', i);
                        }
                        $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(newxzz);
                    } else {
                        $(this).find('.fa-check').removeClass('xh-displaynone-im');
                        $(this).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').addClass('xh-xzselect');
                        $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", true);
                        $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings(".xh-selectpicker").find('option:selected').each(function() {
                            newxzz += $(this).text() + ',';
                        })
                        newxzz = xh_remove_lastcomma(newxzz);
                        $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(newxzz);
                    }
                } else {
                    $(this).parent('ul').find('.fa-check').addClass('xh-displaynone-im');
                    $(this).find('.fa-check').removeClass('xh-displaynone-im');
                    $(this).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').addClass('xh-xzselect');
                    $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find('option').attr("selected", false);
                    $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", true);
                    $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(xzz);
                }
            } else {
                $(this).find('.fa-check').addClass('xh-displaynone-im');
                if (isMultiple == 'multiple') {
                    var yt = $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text();
                    if (maxnum != undefined && !isNaN(parseInt(maxnum)) && maxnum != '' && maxnum != null) {
                        var j = yi != undefined ? yi - 1 : 0;
                        console.log(j);
                        $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').data('i', j);
                    }
                    if (yt != '') {
                        yt = yt + ',';
                        var arrt = yt.split(',');
                        var newt = '';
                        for (var i = 0; i < arrt.length - 1; i++) {
                            if (arrt[i] != xzz) {
                                newt += arrt[i] + ',';
                            }
                        }
                        newt = xh_remove_lastcomma(newt);
                        if (newt == '') {
                            newt = title;
                            $(this).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').removeClass('xh-xzselect');
                        }
                    }
                    $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", false);
                    $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(newt);
                } else {
                    $(this).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').removeClass('xh-xzselect');
                    $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", false);
                    $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(title);
                }
            }
            isMultiple == 'multiple' ? '' : $(this).parent('ul').parent('.xh-selext-text').slideUp(200);
            //alert($(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').html());
        }
    })

}

function xh_remove_lastcomma(str) {
    var reg = /,$/gi;
    str = str.replace(reg, "");
    return str;
}

function xh_file(option) {

}

function xh_init_file() {
    var ismultiple;
    $('.xh-file').each(function() {
        ismultiple = $(this).attr('multiple');
        var title = $(this).attr('xh-title');
        var yh = $(this).prop("outerHTML");
        var id = $(this).attr('id');
        var self = this;

        if (ismultiple == 'multiple') {
            var h = '<div class="xh-initfile-multiple-box"><div class="xh-mu-box">' + yh + '<div class="xh-mu-img addmufile"><img src="./public/image/image.png"></div></div><div class="xh-clearfix"></div></div>';
        } else {
            title = title != '' && title != undefined && title != 'null' ? title : '上传文件';
            var h = '<div class="xh-initfile-box xh-input-group"><input type="text" class="xh-input xh-disabled" disabled><span class="xh_xz_filestyle xh-group-btn-input"><label for="' + id + '">' + yh + '<button class="xh-btn"><i class="fa fa-file"></i> ' + title + '</button></label></span></div>';
        }
        $(this).before(h);
        $(this).remove();


    });

    $('body').on('change', '.xh-file', function() {
        ismultiple = $(this).attr('multiple');
        var id = $(this).attr('id');
        var file = this.files;
        var fileinfo = "";
        if (ismultiple == 'multiple') {
            for (var i = 0; i < file.length; i++) {
                var name = file[i]['name'];
                var size = gettoDecimal(file[i]['size'] / 1024 / 1024);
                var type = xh_get_suffix(name);
                fileinfo += '<div class="xh-mu-img">';
                if (type == 'png' || type == 'jpg' || type == 'jpeg' || type == 'gif') {
                    var url = getObjectURL(file[i]);
                    fileinfo += '<img src="' + url + '"><div class="fileinfo">' + name + ' | ' + size + 'MB</div><div class="fileoperation"><i class="fa fa-trash-o removefile"></i><i class="fa fa-search-plus"></i></div>';
                }
                fileinfo += '</div>';
                $('#' + id).parent('.xh-mu-box').append(fileinfo);
            }
        } else {
            for (var i = 0; i < file.length; i++) {
                var name = file[i]['name'];
                var size = gettoDecimal(file[i]['size'] / 1024 / 1024);
                fileinfo += '文件名称：' + name + ' | 文件大小：' + size + 'MB,';
            }
            fileinfo = xh_remove_lastcomma(fileinfo);
            $(this).parent('label').parent('.xh_xz_filestyle').siblings('input[type=text]').val(fileinfo);
        }
    });

    $('body').on('click', '.removefile', function() {

    })

    // 单个文件点击上传
    $('body').on('click', '.xh-initfile-box button', function() {
        $(this).siblings('input[type=file]').click();
    })

    /*
    $('body').on('change', '.xh-initfile-box input[type=file]', function() {
        var file = this.files;
        var fileinfo = "";
        for (var i = 0; i < file.length; i++) {
            var name = file[i]['name'];
            var size = gettoDecimal(file[i]['size'] / 1024);
            fileinfo += '文件名称：' + name + ' | 文件大小：' + size + 'kb,';
        }
        fileinfo = xh_remove_lastcomma(fileinfo);
        $(this).parent('label').parent('.xh_xz_filestyle').siblings('input[type=text]').val(fileinfo);
    })*/

    // 多个文件点击上传
    $('body').on('click', '.addmufile', function() {
        $(this).siblings('input[type=file]').click();
    });
}

function xh_preview_file() {
    $('.xh-preview-file').each(function() {
        $('#xh-preview-modal').remove();
        var src = $(this).attr('xh-pre-src');
        var type = xh_get_suffix(src);
        var bhegit = $(window).height();
        var groud = $(this).attr('xh-preview-groud');

        $(this).click(function() {
            var ismufile = $(this).attr('xh-mufile');
            var h = '<div id="xh-preview-modal" class="xh-preview-modal"><div class="xh-preview-menu"><sn class="fa fa-close xh-preview-close"></span></div>';
            h += ismufile == 'true' ? '<div class="xh-preview-move"></div><input type="hidden" id="groud" value="' + groud + '" xh-url="' + src + '"><div class="xh-preview-left"><i class="fa fa-chevron-left"></i></div><div class="xh-preview-right"><i class="fa fa-chevron-right"></i></div>' : '';
            h += '<div class="xh-preview-content">';
            var v_h = bhegit - 90;
            if (xh_isimg(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><img src="' + src + '"></div>';
                var a = 1;
            } else if (xh_isvideo(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><video controls autoplay><source src="' + src + '" type="video/mp4"><source src="' + src + '" type="video/ogg">XH框架提醒：您的浏览器不支持 video 属性。</video></div>';
                var a = 1;
            } else if (xh_isword(type) || xh_isexcel(type) || xh_isppt(type)) {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="https://view.officeapps.live.com/op/view.aspx?src=' + src + '"></iframe></div>';
                var a = 1;
            } else {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="' + src + '"></iframe></div>';
                var a = 1;
            }

            h += '</div></div>';
            if (a == 1) {
                $('body').prepend(h);
                $('#xh-preview-modal').show();
            }
        });
    });

    $('body').on('click', '.xh-preview-close', function() {
        $('#xh-preview-modal').hide(200);
        $('#xh-preview-modal').remove();
    })

    $('body').on('click', '.xh-preview-left', function() {
        var groud = $('#groud').val();
        var url = $('#groud').attr('xh-url');
        var arr = [];
        var i = 0;
        var sort = '';
        var bhegit = $(window).height();
        $('.xh-preview-file').each(function() {
            var gsroud = $(this).attr('xh-preview-groud');
            var src = $(this).attr('xh-pre-src');
            if (groud == gsroud) {
                arr.push(src);
                sort = url == src ? i : sort;
                i++;
            }
        });
        //console.log(arr);
        //console.log(sort);
        //console.log(arr[sort]);
        sort = sort == 0 ? i : sort;
        var h = '';
        if (sort > 0) {
            var newsrc = arr[sort - 1];
            var type = xh_get_suffix(arr[sort - 1]);
            var v_h = bhegit - 90;
            if (xh_isimg(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><img src="' + newsrc + '"></div>';
                var b = 1;
            } else if (xh_isvideo(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><video controls autoplay><source src="' + newsrc + '" type="video/mp4"><source src="' + newsrc + '" type="video/ogg">XH框架提醒：您的浏览器不支持 video 属性。</video></div>';
                var b = 1;
            } else if (xh_isword(type) || xh_isexcel(type) || xh_isppt(type)) {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="https://view.officeapps.live.com/op/view.aspx?src=' + newsrc + '"></iframe></div>';
                var b = 1;
            } else {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="' + newsrc + '"></iframe></div>';
                var b = 1;
            }
            if (b == 1) {
                $('#groud').val(groud);
                $('#groud').attr('xh-url', newsrc);
                $('#xh-preview-modal').find('.xh-preview-content').html(h);
            }
        }
    })

    $('body').on('click', '.xh-preview-right', function() {
        var groud = $('#groud').val();
        var url = $('#groud').attr('xh-url');
        var arr = [];
        var i = 0;
        var sort = 0;
        var bhegit = $(window).height();
        $('.xh-preview-file').each(function() {
            var gsroud = $(this).attr('xh-preview-groud');
            var src = $(this).attr('xh-pre-src');
            if (groud == gsroud) {
                arr.push(src);
                sort = url == src ? i : sort;
                i++;
            }
        });
        //console.log(arr);
        //console.log(sort);
        //console.log(arr[sort]);
        var h = '';
        sort = sort == i - 1 ? -1 : sort;
        if (sort < i) {
            var newsrc = arr[sort * 1 + 1];
            var type = xh_get_suffix(newsrc);
            var v_h = bhegit - 90;
            if (xh_isimg(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><img src="' + newsrc + '"></div>';
                var b = 1;
            } else if (xh_isvideo(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><video controls autoplay><source src="' + newsrc + '" type="video/mp4"><source src="' + newsrc + '" type="video/ogg">XH框架提醒：您的浏览器不支持 video 属性。</video></div>';
                var b = 1;
            } else if (xh_isword(type) || xh_isexcel(type) || xh_isppt(type)) {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="https://view.officeapps.live.com/op/view.aspx?src=' + newsrc + '"></iframe></div>';
                var b = 1;
            } else {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="' + newsrc + '"></iframe></div>';
                var b = 1;
            }
            if (b == 1) {
                $('#groud').val(groud);
                $('#groud').attr('xh-url', newsrc);
                $('#xh-preview-modal').find('.xh-preview-content').html(h);
            }
        }
    });

    // 移动端手指滑动屏幕
    var pre_slider = false;
    var pdfx;
    var pre_startX = 0;
    var pre_oX = 0;
    $("body").on("touchstart", function(e) {
        e.preventDefault();
        pre_slider = true;
        pre_startX = e.originalEvent.changedTouches[0].pageX;
    });

    $("body").on("touchmove", function(e) {
        if (pre_slider) {
            e.preventDefault();
            pre_oX = e.originalEvent.changedTouches[0].pageX - pre_startX;
            var max_width = $(window).width();
            //console.log(oX + '--' + max_width);
            if (pre_oX > 0 && Math.abs(pre_oX) > Math.floor(max_width / 6)) { // 向左
                //alert('向左');
                //console.log('向左');
                $('.xh-preview-left').click();
                pre_slider = false;
            } else if (pre_oX < 0 && Math.abs(pre_oX) > Math.floor(max_width / 6)) { // 向右
                //alert('向右');
                //console.log('向右');
                $('.xh-preview-right').click();
                pre_slider = false;
            }
            //console.log(pre_oX + '--' + Math.floor(max_width / 6));
        }
    })

    $(".xh-preview-move").on("touchend", function() {
        pre_slider = false;
        if (pdfx == 1) {
            $('.xh-preview-left').click();
        } else if (pdfx == 2) {
            $('.xh-preview-right').click();
        }
        $(this).off("touchend"); // 清除事件
    });

}

function xh_confirm(option) {
    this.title = option.title || '操作提示';
    this.content = option.content;
    this.becomes = option.becomes || false;
    var self = this;

    var sjid = xh_randomWord(false, 30);
    var sjmainid = xh_randomWord(false, 30);
    var consjid = xh_randomWord(false, 30);
    var confirmsjid = xh_randomWord(false, 30);
    var wh = '';
    this.becomes ? wh += '<i class="fa fa-window-maximize" id="' + sjid + '"></i>' : '';

    var h = '<div class="xh-modal" id="' + sjmainid + '">';
    h += '<div class="xh-modal-content xh-modal-xs" id="' + consjid + '">';
    h += '<div class="xh-modal-title">' + this.title + wh + '<i class="fa fa-close xh-close" xh-modal="close"></i></div>';
    h += '<div class="xh-modal-text">' + this.content + '<div class="xh-clearfix"></div></div>';
    h += '<div class="xh-modal-foot"><button class="xh-btn xh-close" xh-modal="close">取消</button><button class="xh-btn xh-btn-primary" id="' + confirmsjid + '">确定</button></div>';

    $('body').append(h);
    $('#' + sjmainid).xh_modal('show');
    if (self.becomes) {
        var w = new xh_winchang({
            el: '#' + consjid,
            clickel: '#' + sjid
        })
    }

    $('#' + confirmsjid).click(function() {
        option.confirm_success();
        $('#' + sjmainid).xh_modal('hide');
    });

}


function xh_video_init(option) {

    this.el = option.el;
    this.xh_video_url = option.xh_video_url;
    this.xh_video_id = option.xh_video_id;
    this.xh_video_volume = option.xh_video_volume || 0.5; // 不设置音量，默认一半(0.5)音量 音量范围0.1~1
    var self = this;

    var h = '<div class="xh-video-box"><div class="xh-video-circle-play"><i class="fa fa-play-circle-o"></i></div>';
    h += '<video id="' + this.xh_video_id + '" style="object-fit:fill;" playsinline webkit-playsinline x-webkit-airplay="allow" airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portrait"><source src="' + this.xh_video_url + '" type="video/mp4"><source src="' + this.xh_video_url + '" type="video/ogg"><source src="' + this.xh_video_url + '" type="video/webm">您的浏览器不支持该播放器。</video>';
    h += '<div><div class="xh-video-foot"><div class="xh-video-bar"><div class="xh-video-run-bar"><i class="xh-video-barjd"></i></div></div><div class="xh-clearfix"></div><div class="xh-video-menu"><i class="fa fa-play xh-fleft xh-play-puser"></i><span class="xh-video-time xh-fleft"></span><i class="fa fa-expand xh-fright xh-video-isfull"></i><div class="xh-video-volume xh-fright"><i class="fa fa-volume-up xh-vo"></i><div class="xh-v-vobox"><div class="xh-volume-bar"><span class="xh-volume-ssbar"><i></i></span></span></div></div></div></div></div></div></div></div></div>';
    $(this.el).html(h);
    var videoElement = document.getElementById(self.xh_video_id);
    videoElement.volume = this.xh_video_volume;
    
    if(videoElement.volume > 0.7){
        $(self.el).find('.xh-vo').removeClass('fa-volume-off');
        $(self.el).find('.xh-vo').removeClass('fa-volume-down');
        $(self.el).find('.xh-vo').addClass('fa-volume-up');
    }else if(videoElement.volume > 0 && videoElement.volume <=0.5){
        $(self.el).find('.xh-vo').removeClass('fa-volume-up');
        $(self.el).find('.xh-vo').removeClass('fa-volume-off');
        $(self.el).find('.xh-vo').addClass('fa-volume-down');
    }else if(videoElement.volume == 0){
        $(self.el).find('.xh-vo').removeClass('fa-volume-up');
        $(self.el).find('.xh-vo').removeClass('fa-volume-down');
        $(self.el).find('.xh-vo').addClass('fa-volume-off');
    }

    $(this.el).find('.xh-volume-ssbar').css('height', videoElement.volume * 100 + '%');
    $(self.el).find('.xh-video-menu').find('.xh-video-time').html('00:00:00' + '<b>/' + xh_formatSeconds(videoElement.duration) + '</b>');

    // 播放/暂停
    $('body').on('click', '.xh-video-circle-play', function() {
        var videoElement = document.getElementById(self.xh_video_id);
        var xh_video = $(this).siblings('video').get(0);
        var obj = this;
        if (xh_video.paused) {
            videoElement.currentTime == videoElement.duration ? videoElement.currentTime = 0 : '';
            xh_video.play();
            $(this).find('i').show();
            $(this).find('i').removeClass('fa-play-circle-o');
            $(this).find('i').addClass('fa-pause');
            $(this).parent('.xh-video-box').find('.xh-video-menu').find('.xh-play-puser').removeClass('fa-play');
            $(this).parent('.xh-video-box').find('.xh-video-menu').find('.xh-play-puser').addClass('fa-pause');
            $(this).find('i').hide(1000);
            setTimeout(function() {
                $(obj).parent('.xh-video-box').find('.xh-video-foot').hide(600);
            }, 1500);
        } else {
            xh_video.pause();
            $(this).find('i').show();
            $(this).find('i').removeClass('fa-pause');
            $(this).find('i').addClass('fa-play-circle-o');
            $(this).parent('.xh-video-box').find('.xh-video-menu').find('.xh-play-puser').addClass('fa-play');
            $(this).parent('.xh-video-box').find('.xh-video-menu').find('.xh-play-puser').removeClass('fa-pause');
            $(this).parent('.xh-video-box').find('.xh-video-foot').show(400);
        }
    })

    $('body').on('click', '.xh-play-puser', function() {
        var videoElement = document.getElementById(self.xh_video_id);
        var xh_video = $(this).parents('.xh-video-box').find('video').get(0);
        if (xh_video.paused) {
            videoElement.currentTime == videoElement.duration ? videoElement.currentTime = 0 : '';
            xh_video.play();
            $(this).parents('.xh-video-box').find('.xh-video-circle-play').find('i').show();
            $(this).removeClass('fa-play');
            $(this).addClass('fa-pause');
            $(this).parents('.xh-video-box').find('.xh-video-circle-play').find('i').removeClass('fa-play-circle-o');
            $(this).parents('.xh-video-box').find('.xh-video-circle-play').find('i').addClass('fa-pause');
            $(this).parents('.xh-video-box').find('.xh-video-circle-play').find('i').hide(1000);

        } else {
            xh_video.pause();
            $(this).parents('.xh-video-box').find('.xh-video-circle-play').find('i').show();
            $(this).addClass('fa-play');
            $(this).removeClass('fa-pause');
            $(this).parents('.xh-video-box').find('.xh-video-circle-play').find('i').addClass('fa-play-circle-o');
            $(this).parents('.xh-video-box').find('.xh-video-circle-play').find('i').removeClass('fa-pause');
        }
    });

    $("body").on("mouseenter", ".xh-video-box", function() {
        $(this).find('.xh-video-foot').show(400);
    });

    $("body").on("mouseleave", ".xh-video-box", function() {
        $(this).find('.xh-video-foot').hide(600);
    });

    // 音量
    $('body').on('click', '.xh-vo', function() {
        if ($(this).siblings('.xh-v-vobox').css('display') == 'none') {
            $(this).siblings('.xh-v-vobox').show(400);
        } else {
            $(this).siblings('.xh-v-vobox').hide(400);
        }
    })

    $(document).click(function(e) {
        e = window.event || e; // 兼容IE7
        obj = $(e.srcElement || e.target);
        if ($(obj).is(".xh-video-volume,.xh-video-volume *")) {
            return false;
        } else {
            $(self.el).find('.xh-v-vobox').hide(400);
        }
    });

    // pc端拖动进度条
    var xh_pc_slider = false;
    var xh_pc_iX;

    $("body").on("mousedown", self.el + " .xh-video-barjd", function(e) {
        xh_pc_slider = true;
        xh_pc_iX = e.clientX - this.offsetLeft;
    });

    $("body").on("mousemove", self.el + " .xh-video-barjd", function(e) {
        if (xh_pc_slider) {
            var oX = e.clientX - xh_pc_iX;
            var max_width = $('.xh-video-bar').width();
            oX = oX < 0 ? 0 : oX;
            oX = oX > max_width ? max_width : oX;

            var percent = oX / max_width;
            var movejd = percent * max_width;
            var xh_video_duration = videoElement.duration;
            var currentTime = (oX / max_width) * xh_video_duration;
            $(this).parent('.xh-video-run-bar').css('width', oX + 'px');
            //videoElement.currentTime = (movejd / max_width) * xh_video_duration;
            videoElement.currentTime = currentTime;
        }

    })

    $("body").on("mouseup", self.el + " .xh-video-foot", function() {
        xh_pc_slider = false;
        $(self.el).find('.xh-video-barjd').off("mousedown"); // 清除事件

    });

    $("body").on("mouseleave", self.el + " .xh-video-foot", function() {
        xh_pc_slider = false;
        $(self.el).find('.xh-video-barjd').off("mousedown"); // 清除事件
    });

    // 移动端拖动进度条
    var xh_mo_slider = false;
    var xh_mo_startX;

    $("body").on("touchstart", self.el + " .xh-video-barjd", function(e) {
        xh_mo_slider = true;
        xh_mo_startX = e.originalEvent.changedTouches[0].pageX - $(this).offset().left;
    });

    $("body").on("touchmove", self.el + " .xh-video-barjd", function(e) {
        if (xh_mo_slider) {
            var oX = e.originalEvent.changedTouches[0].pageX - xh_mo_startX;
            var max_width = $('.xh-video-bar').width();
            oX = oX < 0 ? 0 : oX;
            oX = oX > max_width ? max_width : oX;
            oX = oX - 30;

            var percent = oX / max_width;
            var movejl = percent * max_width;
            var toatal_t = videoElement.duration;
            var currentTime = (oX / max_width) * toatal_t;
            $(this).parent('.xh-video-run-bar').css('width', oX + 'px');
            // videoElement.currentTime = (movejl / max_width) * toatal_t;
            videoElement.currentTime = currentTime;
        }

    })


    // 点击进度条跳转进度
    $('body').on('click', self.el + ' .xh-video-bar', function(e) {
        var xh_jd_width = $(this).width();
        var length = e.pageX;
        var percent = length / xh_jd_width;
        var movejd = percent * xh_jd_width - 30;
        var xh_video_duration = videoElement.duration;
        videoElement.currentTime = (movejd / xh_jd_width) * xh_video_duration;

    })


    // 拖动音量条
    var xh_pc_vslider = false;
    var xh_pc_viY;

    $("body").on("mousedown", self.el + " .xh-volume-ssbar i", function(e) {
        console.log(this);
        xh_pc_vslider = true;
        xh_pc_viY = e.clientY - this.offsetHeight;
        console.log(xh_pc_viY+'---');
    });

    $("body").on("mousemove", self.el + " .xh-volume-ssbar i", function(e) {
        if (xh_pc_vslider) {
            var oY = e.clientY- xh_pc_viY;
            var max_height = $(self.el).find('.xh-volume-bar').height();
            oY = oY < 0 ? 0 : oY;
            oY = oY > max_height ? max_height : oY;
            console.log(oY);

            $(self.el).find('.xh-volume-ssbar').animate({height: oY+'px'});
            $(self.el).find('.xh-volume-ssbar').find('i').animate({top: (-oY)+'px'});

        }
    })

    $("body").on("mouseup", self.el + " .xh-volume-bar", function() {
        xh_pc_vslider = false;
        $(self.el).find('.xh-volume-ssbar i').off("mousedown"); // 清除事件

    });

    $("body").on("mouseleave", self.el + " .xh-volume-bar", function() {
        xh_pc_vslider = false;
        $(self.el).find('.xh-volume-ssbar i').off("mousedown"); // 清除事件
    });


    // 全屏/非全屏
    $('body').on('click', '.xh-video-isfull', function() {
        if ($(this).hasClass('fa-expand')) {
            $(this).parents('.xh-video').attr('style', 'position: fixed;top:0;bottom:0;left:0;right:0;height: auto;');
            $(this).removeClass('fa-expand');
            $(this).addClass('fa-compress');
        } else {
            $(this).parents('.xh-video').attr('style', '');
            $(this).addClass('fa-expand');
            $(this).removeClass('fa-compress');
        }

    })

    setInterval(function() {
        var videoElement = document.getElementById(self.xh_video_id);
        var h = xh_formatSeconds(videoElement.currentTime) + '<b>/' + xh_formatSeconds(videoElement.duration) + '</b>';
        if (videoElement.currentTime == videoElement.duration) {
            $(self.el).find('.xh-video-circle-play').find('i').removeClass('fa-pause');
            $(self.el).find('.xh-video-circle-play').find('i').addClass('fa-play-circle-o');
            $(self.el).find('.xh-video-circle-play').find('i').show();
            $(self.el).find('.xh-video-menu').find('.xh-play-puser').addClass('fa-play');
            $(self.el).find('.xh-video-menu').find('.xh-play-puser').removeClass('fa-pause');
            $(self.el).find('.xh-video-run-bar').find('i').attr('style', 'left:auto;right:-5px;');
        } else {
            var p = videoElement.currentTime / videoElement.duration;
            $(self.el).find('.xh-video-run-bar').find('i').attr('style', 'left:auto;');
            $(self.el).find('.xh-video-run-bar').css({ width: p * ($(self.el).find('.xh-video-bar').width()) });
        }
        $(self.el).find('.xh-video-menu').find('.xh-video-time').html(h);
        // 判断音量是否发生改变
        if(videoElement.volume > 0.7){
            $(self.el).find('.xh-vo').removeClass('fa-volume-off');
            $(self.el).find('.xh-vo').removeClass('fa-volume-down');
            $(self.el).find('.xh-vo').addClass('fa-volume-up');
        }else if(videoElement.volume > 0 && videoElement.volume <=0.5){
            $(self.el).find('.xh-vo').removeClass('fa-volume-up');
            $(self.el).find('.xh-vo').removeClass('fa-volume-off');
            $(self.el).find('.xh-vo').addClass('fa-volume-down');
        }else if(videoElement.volume == 0){
            $(self.el).find('.xh-vo').removeClass('fa-volume-up');
            $(self.el).find('.xh-vo').removeClass('fa-volume-down');
            $(self.el).find('.xh-vo').addClass('fa-volume-off');
        }
    }, 1000)

}

function xh_edito(option) {
    this.el = option.el;

    var self = this;

    var h = '<div class="xh_edito_main">';
    var htop = '<div class="xh_edito_top_box"><div class="xh_edito_top_m"><ul>';
    htop += '<li><i class="fa fa-bold fa-fw" title="加粗" id="bold"></i></li>';
    htop += '<li><i class="fa fa-italic fa-fw" title="斜体"></i></li>';
    htop += '<li><i class="fa fa-underline fa-fw" title="下划线"></i></li>';
    htop += '<li><i class="fa fa-strikethrough fa-fw" title="删除线"></i></li>';
    htop += '<li><i class="fa fa-superscript fa-fw" title="上标"></i></li>';
    htop += '<li><i class="fa fa-subscript fa-fw" title="下标"></i></li>';
    htop += '<li><div class="xh_edito_font_box"><div class="xh_edito_font"><span>14px</span> <i class="fa fa-caret-down fa-fw"></i></div><div class="xh_edito_font_content"><ul><li style="font-size:10px;">10px</li><li style="font-size:11px;">11px</li><li style="font-size:12px;">12px</li><li style="font-size:14px;">14px</li><li style="font-size:16px;">16px</li><li style="font-size:18px;">18px</li><li style="font-size:20px;">20px</li><li style="font-size:24px;">24px</li><li style="font-size:36px;">36px</li></ul></div></div></li>';
    htop += '<li><i class="fa fa-align-center fa-fw" title="居中对齐"></i></li>';
    htop += '<li><i class="fa fa-align-justify fa-fw" title="左右对齐"></i></li>';
    htop += '<li><i class="fa fa-align-justify fa-fw" title="左对齐"></i></li>';
    htop += '<li><i class="fa fa-align-justify fa-fw" title="右对齐"></i></li>';
    htop += '<li><i class="fa fa-photo fa-fw" title="上传图片"></i></li>';
    htop += '<li><i class="fa fa-video-camera fa-fw" title="上传视频"></i></li>';
    htop += '<li><i class="fa fa-table fa-fw" title="表格"></i></li>';
    htop += '<li><i class="fa fa-copy fa-fw" title="复制"></i></li>';
    htop += '<li><i class="fa fa-cut fa-fw" title="剪切"></i></li>';
    htop += '<li><i class="fa fa-paste fa-fw" title="粘贴"></i></li>';
    htop += '<li><i class="fa fa-rotate-left fa-fw" title="撤销"></i></li>';
    htop += '<li><i class="fa fa-rotate-right fa-fw" title="重做"></i></li>';
    htop += '<li><i class="fa fa-expand fa-fw" title="全屏"></i></li>';
    htop += '</ul></div></div>';
    h += htop;
    h += '<div class="xh-clearfix"></div>';

    var sjconid = "xhtxt_" + xh_randomWord(false, 30);
    var tcon = '<div contenteditable="true" id="' + sjconid + '" class="xh_edito_content"></div>';
    h += tcon;

    h += '</div>';
    $(self.el).html(h);

    /* --- */

    var content_arr = [];
    var history_content_arr = [];

    var max_wifth = $('.xh_edito_main').width() - 22;
    var max_height = $(self.el).height();
    var top_height = $(self.el).find('.xh_edito_top_box').height() * 1 + 10;
    var con_height = max_height - top_height - 24;
    $('.xh_edito_top_box').css('width', max_wifth + 'px');
    $('#' + sjconid).css('max-height', con_height + 'px');


    $('body').on('click', self.el + ' .xh_edito_font_content li', function() {
        var t = $(this).text();
        $(self.el + ' .xh_edito_font').html('<span>' + t + '</span> <i class="fa fa-caret-down"></i>');
    });

    $('body').on('click', self.el + ' .xh_edito_font_box', function() {
        $(this).find('.xh_edito_font_content').slideToggle(200);
        var obj = this;
        $(document).one('click', function() {
            $(obj).find('.xh_edito_font_content').slideUp(200);
        })

        event.stopPropagation();
    });

    $('body').bind('DOMCharacterDataModified', sjconid, function(e) {
        var t = $(this).html();
        console.log(e);
        console.log(e.target.innerHTML);
        content_arr.push(e.target.innerHTML);
    })

    // 加粗
    $('#bold').click(function() {
        if ($(this).hasClass('xh_edito_selected')) {
            $(this).removeClass('xh_edito_selected');
            $('#' + sjconid).css('font-weight', 'normal');
        } else {
            $(this).addClass('xh_edito_selected');
            $('#' + sjconid).css('font-weight', 'bold');
        }

    });

}


function xh_table(option) {
    this.el = option.el;
    this.align = option.align || 'center';
    this.border = option.border || false;
    this.print = option.print || false;
    this.print_style = option.print_style;
    var self = this;

    $(this.el).addClass('xh-table-' + this.align);

    if (this.border) {
        $(this.el).addClass('xh-table-border');
    }

    if (this.print) {
        $(self.el).siblings('.xh-print-table').find('.xh-print-botton').click(function() {
            console.log(123);
            var need_print = $(self.el).prop("outerHTML");
            var style = 'table {border-spacing: 0;border-collapse: collapse;} table th {background-color: #889AA8;} table tbody tr:nth-child(2n+1) td {background-color: #ddd;} .xh-table {width: 100%;max-width: 100%;margin-bottom: 20px;} .xh-table th {color: #fff;} .xh-table td {color: #53727d;} ';
            style = style + this.print_style;
            var p = new xh_print({
                content: need_print,
                style: '<style>' + style + '</style>'
            });
        });
    }

}

function xh_print(option) {
    this.content = option.content;
    this.style = option.style || '';
    var body = $('body').html();
    console.log(body);

    window.document.body.innerHTML = '<style>' + this.style + '</style>' + this.content;
    window.print();
    $('body').html(body);
}

// 四舍五入保留两位小数
function gettoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        return false;
    }
    result = Math.round(num * 100) / 100;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

// 去掉最后的逗号
function xh_remove_lastcomma(str) {
    var reg = /,$/gi;
    str = str.replace(reg, "");
    return str;
}

// 获取文件后缀名
function xh_get_suffix(file) {
    return file.substr(file.lastIndexOf(".") + 1);
}

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function xh_isimg(type) {
    if (type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'pjpeg' || type == 'gif' || type == 'bmp' || type == 'x-png') {
        return true;
    }
    return false;
}

function xh_isvideo(type) {
    if (type == 'mp4' || type == 'ogg') {
        return true;
    }
    return false;
}

function xh_isword(type) {
    if (type == 'doc' || type == 'docx') {
        return true;
    }
    return false;
}

function xh_isexcel(type) {
    if (type == 'xls' || type == 'xlsx') {
        return true;
    }
    return false;
}

function xh_isppt(type) {
    if (type == 'ppt' || type == 'pptx') {
        return true;
    }
    return false;
}

function xh_formatSeconds(value) {
    var theTime = parseInt(value); // 秒
    var theTime1 = 0; // 分
    var theTime2 = 0; // 小时
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = "" + parseInt(theTime);
    if (result < 10) {
        result = '0' + result;
    }
    if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + ":" + result;
        if (theTime1 < 10) {
            result = '0' + result;
        }
    } else {
        result = '00:' + result;
    }
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + ":" + result;
        if (theTime2 < 10) {
            result = '0' + result;
        }
    } else {
        result = '00:' + result;
    }
    return result;
}

function xh_randomWord(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}