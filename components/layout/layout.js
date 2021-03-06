/* Layout component.
 * Global layout component.                                                     */

function LayoutCPN(ctn) {
    var c = new Component(ctn, "build/layout.xml");
    
    c.registerMethod(LayoutCPN.prototype.init, "init", false);
    c.registerMethod(LayoutCPN.prototype.followLink, "followLink", false);
    c.registerMethod(LayoutCPN.prototype.defineBodyHeight, "defineBodyHeight", false);
    c.registerMethod(LayoutCPN.prototype.buildFooter, "buildFooter", false);
    c.registerMethod(LayoutCPN.prototype.buildNavigation, "buildNavigation", false);
    c.registerMethod(LayoutCPN.prototype.startNavigation, "startNavigation", false);
    c.registerMethod(LayoutCPN.prototype.lockNavigation, "lockNavigation", false);
    
    c.registerSource("navigation", "data/content/navigation.xml", "Minimal", [
        {method: "buildNavigation"}
    ]);
    
    c.saveInterface(LoadableITF);
    c.qc("addTarget@Loadable", "background");
    c.qc("setState@Loadable", "Minimal");
    
    c.saveInterface(EnhanceableITF);
    c.qc("addForMixedOverflow@Enhanceable", "background");
    
    c.saveInterface(ColumnableITF);
    c.qc("addStatic@Columnable", "bodyNavigation");
    c.qc("addStatic@Columnable", "footerInner", {
        lastexcept: "borderR1px"
    }, [7, 1, 1, 1], false);
    
    return c;
}

LayoutCPN.prototype.init = function() {
    /* Translator configuration */
    var t = new TranslatorPI(this.qs("virtuals", "div.translator"));
    t.start();
    t.qc("load", "fr", "bundle_fr");
    t.qc("load", "en", "bundle_en");
    t.qc("switch", "fr");
    t.qc("qb", this);
    Register.identify(t, "translator");
    
    /* Palette configuration */
    var p = new PalettePI(this.qs("virtuals", "div.palette"));
    p.start();
    p.qc("switch", "blue", true);
    Register.identify(p, "palette");
    
    /* Subcomponents */
    this.register("page", new PageCPN(this.qs("bodyCore")));
};

/* Redirection */
LayoutCPN.prototype.followLink = function() {
    if (this.qs("$TRIGGERED").is("a")) {
        this.page.qc("to", this.qs("$TRIGGERED").attr("href"));
    } else {
        this.page.qc("to", this.qs("$TRIGGERED").parents("a:first()").attr("href"));
    }
};

/* Display */
LayoutCPN.prototype.defineBodyHeight = function() {
    var h = this.qs("$BODY").height() - 
            this.qs("header").outerHeight(true) - 
            this.qs("footer").outerHeight(true);
    this.register("body_height", h < 480 ? "480px" : h + "px", true);
};
LayoutCPN.prototype.buildNavigation = function() {
    var ctx = this;
    $(this.getSourceData("navigation", "s.link")).each(function(i) {
        var n = this;
        setTimeout(function() {
            new NavigationCPN(ctx.qs("bodyNavigationLinks").eq(i), $(n)).start();
        }, 150 * i);
    });
};
LayoutCPN.prototype.startNavigation = function() {
    var ctx = this;
    this.qs("bodyNavigationLinks").each(function(i) {
        var n = this;
        setTimeout(function() {
            try {
                Register.getFrom(n).qc("go", "Close");
            } catch (e) {
                ErrorManager.process(e);
            }
        }, 150 * i);
    });
};
LayoutCPN.prototype.lockNavigation = function() {
    var ctx = this;
    this.qs("bodyNavigationLinks").each(function(i) {
        var n = this;
        setTimeout(function() {
            try {
                Register.getFrom(n).qc("go", "Locked");
            } catch (e) {
                ErrorManager.process(e);
            }
        }, 150 * i);
    });
};
LayoutCPN.prototype.buildFooter = function() {
    new FootLinkCPN(this.qs("footerInnerLinks").eq(0), {
        link: "x",
        label: "bundle-sample_lorem_short",
        description: "bundle-sample_lorem_short"
    }).start();
    
    new FootLinkCPN(this.qs("footerInnerLinks").eq(1), {
        link: "x",
        label: "bundle-sample_lorem_short",
        description: "bundle-sample_lorem_short"
    }).start();
    
    new FootLinkCPN(this.qs("footerInnerLinks").eq(2), {
        link: "x",
        label: "bundle-sample_lorem_short",
        description: "bundle-sample_lorem_short"
    }).start();
};