class Tabs {
    constructor(
        element,
        options
    ) {
        // # element
        // 1. Check element is HTMLElement, if not throw an error

        // # options

        // # internal state
        // 1. tabPanel instances
        // 2. tabControl instances

        // Setup Panels and Controls
    }

    setupPanelsAndControls() {
        // 1. on HTML have a main wrapper, passing element into class as root. add 'tabs' class
        // 2. within wrapper, render each panels with:
        //    - class "js-tab-panel"
        //    - Tab control title will be presented by data atrribute "data-tab-title"
        // 3. find all panel elements and create tab control and panel instances with handler attached
        //    along with uid for both so that they'are associated to each other
        // 4. setup tablist container and append all tab controls element to tablist container
        // 5. prepend tablist container (with tab controls) to wrapper
    }

    handleTabControlClick(e) {
        // update tab panel and control state and attributes
        // update browser history with tabs component's active tab
    }

    handleTabControlKeyPressed(e) {
        // update tab panel and control state and attributes
        // update browser history with tabs component's active tab
    }
}