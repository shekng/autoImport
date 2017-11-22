window.inspector = {
    arrContainer: [],
    arrFinalContainer: [],
    oContainer: null,
    init: function() {
        
    },  
    run: function(){
        /*
        $("body").find("*").not("iframe").contents().each(function() {             
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
        */
        
        var arr = [], arrY = []; arrXLineCnt = [], arrYLineCnt = [];
        this.goDown(arr, 0, 3, $("body"));
        arr.shift(); // remove body;
        
        var oRect = arr[0].get(0).getBoundingClientRect();
        //var iBlockS = oRect.top, iBlockE = oRect.bottom;
        var iBlockS = 0, iBlockE = 0;
        //iW = this.findContainerWidth(arr);
        $.each(arr, function(i,v){
            //console.log(v[0]);
            oRect = v[0].getBoundingClientRect();
            
            // within
            if (iBlockS <= oRect.top && iBlockE >= oRect.bottom) {
                v.css({border: "3px orange dashed"});
            }
            
            if (oRect.top >= iBlockE) {
                v.css({border: "3px green dashed"});
                //$("<div></div>").css({position: "absolute", "z-index": 9999, "pointer-events": "none", top: oRect.top, left: "0px", width: "100%", height: oRect.height-5, border: "3px green dashed"}).appendTo("body");                    
                iBlockS = oRect.top;
                iBlockE = oRect.bottom;
            }
                            
            //$("<div></div>").css({opacity:.5, position: "absolute", "z-index": 9999, "pointer-events": "none", top: oRect.top, left: "0px", width: "100%", height: "1px", border: "1px orange solid"}).appendTo("body");
            //$("<div></div>").css({opacity:.5, position: "absolute", "z-index": 9999, "pointer-events": "none", top: oRect.bottom, left: "0px", width: "100%", height: "1px", border: "1px red dashed"}).appendTo("body");
            //$("<div></div>").css({position: "absolute", top: oRect.top, left: oRect.left, width: "1px", height: oRect.height, border: "1px red solid"}).appendTo("body");
            //$("<div></div>").css({position: "absolute", top: oRect.top, left: oRect.right, width: "1px", height: oRect.height, border: "1px red dashed"}).appendTo("body");
            //$("<div></div>").css({position: "absolute", top: 0, left: oRect.left, width: "1px", height: iBodyH, border: "1px red solid"}).appendTo("body");
            //$("<div></div>").css({position: "absolute", top: 0, left: oRect.right, width: "1px", height: iBodyH, border: "1px red dashed"}).appendTo("body");                        
        }); 
        
        /*
        $.each(arr, function(i,v){
            //console.log(v[0]);
            oRect = v[0].getBoundingClientRect();
            var iX = Math.round(oRect.x);
            var iY = Math.round(oRect.y);
            var iBodyH = $(document).height();
            
            if (iBlockS 
            //$("<div></div>").css({position: "absolute", top: iY, left: "0px", width: "100%", height: "1px", border: "1px green solid"}).appendTo("body");
            //$("<div></div>").css({position: "absolute", top: oRect.bottom, left: "0px", width: "100%", height: "1px", border: "1px green dashed"}).appendTo("body");
            $("<div></div>").css({position: "absolute", top: oRect.top, left: oRect.left, width: "1px", height: oRect.height, border: "1px red solid"}).appendTo("body");
            $("<div></div>").css({position: "absolute", top: oRect.top, left: oRect.right, width: "1px", height: oRect.height, border: "1px red dashed"}).appendTo("body");
            //$("<div></div>").css({position: "absolute", top: 0, left: oRect.left, width: "1px", height: iBodyH, border: "1px red solid"}).appendTo("body");
            //$("<div></div>").css({position: "absolute", top: 0, left: oRect.right, width: "1px", height: iBodyH, border: "1px red dashed"}).appendTo("body");                        
        }); 
        */
    },
    goDown: function(arr, iLev, iMax, $ele) {
        var me = this, arrChildren = $ele.children();  

        // only one child and height is greater than half of the document        
        if (arrChildren.length === 1 && arrChildren[0].getBoundingClientRect().height > $(document).height()/2) {
            me.goDown(arr, iLev, iMax, arrChildren.eq(0));
        }
        
        if ($ele[0].nodeType === 1 && $ele[0].tagName !== "SCRIPT") {            
            //$ele.attr({"lev":iLev, "mark": arr.length});           
            if ($ele[0].getBoundingClientRect().height < $(document).height()/2) {
                arr.push($ele);        
            }
            
            if (arrChildren.length && iLev < iMax) {            
                $.each(arrChildren, function(iIdx, domEle) {
                    me.goDown(arr, iLev+1, iMax, arrChildren.eq(iIdx));
                });
            }
        }
    },
    findContainerWidth: function(arr) {
        obj = {};
        $.each(arr, function() {
            var iW = this.outerWidth();            
            if (obj["w"+iW]) {
                obj["w"+iW]++;
            }
            else {
                obj["w"+iW] = 1;
            }
        });
        
        iMax = 0, sMaxWidth = ""
        $.each(obj, function(i,v) {            
            if (v > iMax) {
                iMax = v;
                sMaxWidth = i;
            }
        });
                
        return (sMaxWidth.length) ? parseInt(sMaxWidth.substr(1)) : 0;
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