window.inspector = {
    arrContainer: [],
    arrFinalContainer: [],
    oContainer: null,
    init: function() {
        
    },  
    run: function(){
        $("body").find("*").contents().each(function() {             
            var $this = $(this);
            if (this.nodeType === 3 && this.textContent.trim().length) {
                $this.parent().css({border: "3px green solid"});
            }
            else if (this.nodeType === 1) {
                if (this.tagName === "IMG") {
                    $this.css({border: "3px yellow solid"});
                }
            }
        });    
    },
    run3: function() {
        var me = this;
        
        me.winWidth = $(window).width() - 50;
        
        var arr = $("div");
        $.each(arr, function(i, obj){
            //me.goUptoFullWidth(arr.eq(i));
            if (arr[i].nodeType === 1) {
                var $find = me.goUptoFullWidth(arr.eq(i));        
                $find && $find.css({border: "3px green solid"});
            }
        });
        
        /*
        var $find = me.goUptoFullWidth($("#a"));        
        $find && $find.css({border: "3px green solid"});
        */
    },
    goUptoFullWidth: function($ele) {
        var me = this;
        
        if ($ele[0].tagName === "BODY") {
            return undefined;
        }
        if ($ele.attr("done") === "1") {
            return undefined;
        }
        else if ($ele.outerWidth() >= me.winWidth) {
            $ele.attr("done", "1");
            return $ele;
        }
        else {
            $ele.attr("done", "1");
            return me.goUptoFullWidth($ele.parent());
        }
    },
    run2: function() {
        var me = this;
        
        //me.oContainer = new Container($("body"));
        var arr = $("body").children();
        $.each(arr, function(i, obj) {
            var $find = me.findContainer(arr.eq(i));
            if ($find.outerHeight() > 0 && $find[0].nodeType === 1) {
                //$find.addClass("i_b");
                me.arrContainer.push({"$topEle": arr.eq(i), "$containerEle": $find, type: "undefined"});    
            }            
        });

        var iWinHeight = $(window).outerHeight() + 50;        
        // break container to smaller if it's taller than window height
        $.each(me.arrContainer, function(i, obj) {            
            if (obj.$topEle.outerHeight() > iWinHeight) {
                me.breakDownContainer(obj.$containerEle.children());                
            }
            else {
                me.arrFinalContainer.push(obj);
            }
        });                    
                
        $.each(me.arrFinalContainer, function(i, obj) {
            obj.$topEle.css({border: "3px green solid"});
            //me.indentifierContainer(obj);
        });
    },
    findContainer: function($ele) { 
        var me = this, arrChild = $ele.children();
        if ($ele.children().length == 0) {
            return $ele;
        }
        else if ($ele.children().length == 1) {
            return me.findContainer($ele.children().eq(0))
        }
        else {
            return $ele;
        }
        
        
    },
    breakDownContainer: function(arr) {
        var me = this, iWinHeight = $(window).outerHeight() + 50;        
        // break container to smaller if it's taller than window height
        $.each(arr, function(i, obj) {
            var $ele = $(obj);
            if ($ele.outerHeight() > iWinHeight) {
                me.breakDownContainer($ele.children());
            }
            else {
                me.arrFinalContainer.push({"$topEle": $ele, "$containerEle": $ele, type: "undefined"});    
            }
        });
    },
    indentifierContainer: function(oContainer) {
        for (var func in window.identifier) {
             if (window.identifier[func](oContainer)) {
                 break;
             }
            
        }
    }
}

window.identifier = {
    isHeader: function(oContainer) {
        var score = 0, bReturn = false;
        
        if (oContainer.$topEle[0].tagName === "NAV" || oContainer.$topEle.find("nav").length) {
            score++;
        }
        
        if (oContainer.$topEle.find("a").length > 2) {
            score++;
        }
        
        // if header postion is at the top
        
        if (score > 1) {
            bReturn = true;
            oContainer.type = "header";
            console.log("header found!");
            window.util.addOverlay("header", {
                "backgroundColor": "red",
                "top": oContainer.$topEle[0].getBoundingClientRect().top,
                "height": oContainer.$topEle.outerHeight()
            });
        }
        
        return bReturn;
    },
    isFooter: function(oContainer) {
        var score = 0, bReturn = false;
        
        if (oContainer.$topEle[0].tagName === "footer" || oContainer.$topEle.find("footer").length) {
            score++;
        }
        
        /*
        if (oContainer.$topEle.find("a").length > 2) {
            score++;
        }
        */
        
        if (oContainer.$topEle.find('a[href^="mailto:"]').length) {            
            score++;
        }
        
        // if position is at the bottom of the page
        
        if (score > 0) {
            bReturn = true;
            oContainer.type = "footer";
            console.log("footer found!");

            window.util.addOverlay("footer", {
                "backgroundColor": "green",
                "top": oContainer.$topEle[0].getBoundingClientRect().top + "px",
                "height": oContainer.$topEle.outerHeight()
            });
        }
        
        return bReturn;
    },
    isHeadline: function(oContainer) {
        var score = 0, bReturn = false;
        
        if (oContainer.$containerEle.find("h1").length) {
            score++;
        }
        
        if (oContainer.$containerEle.find("strong").length) {
            score++;
        }
        
        if (oContainer.$containerEle.find("p").length) {
            score++;
        }
        
        if (oContainer.$containerEle.find("a").length > 0) {
            score++;
        }
                    
        // if position is the first container of the page
        
        if (score > 2) {
            bReturn = true;
            oContainer.type = "headline";
            console.log("headliner found!");

            window.util.addOverlay("headline", {
                "backgroundColor": "blue",
                "top": oContainer.$topEle[0].getBoundingClientRect().top + "px",
                "height": oContainer.$topEle.outerHeight()
            });
        }
        
        return bReturn;
    },
    isGallery: function(oContainer) {
        var score = 0, bReturn = false;
        
        var $img = oContainer.$containerEle.find("img");
        if ($img.length) {
            score++;
        }

        if (util.isSlbling($img)){
            score++;
        }
        
        if (score > 1) {
            bReturn = true;
            oContainer.type = "gallery";
            console.log("Gallery found!");

            window.util.addOverlay("gallery", {
                "backgroundColor": "purple",
                "top": oContainer.$topEle[0].getBoundingClientRect().top + "px",
                "height": oContainer.$topEle.outerHeight()
            });
        }
        
        return bReturn;
    }
}

window.util = {
    addOverlay: function(sTitle, oCss){
        $overlay = $("<div class='overlay'>" + sTitle + "</div>").css(oCss);
        $("body").append($overlay);
    },
    isSlbling: function($arrEle) {        
        var iLen = $arrEle.length, iCntSameParentType = 0, iCntSameClass = 0, iCntSameDimension = 0, iScore = 0;
        
        if ($arrEle.length) {            
            var $compareWith = $arrEle.eq(0);
            $arrEle.each(function(i, oObj){
                var $this = $(this);
                if ($this.parent()[0].tagName === $compareWith.parent()[0].tagName) {
                    iCntSameParentType++;
                }
                if ($this[0].className === $compareWith[0].className) {
                    iCntSameClass++;
                }
                if ($this.width() === $compareWith.width() && $this.height() === $compareWith.height()) {
                    iCntSameDimension++;
                }
            });
            
            if (iLen === iCntSameParentType) {
                iScore++;    
            }
            if (iLen === iCntSameClass) {
                iScore++;    
            }
            if (iLen === iCntSameDimension) {
                iScore++;    
            }
        }
        
        return iScore > 1;
    }
}

function Container($obj) {
    this.$ele = $obj;
    this.arrChild = [];
}