class TabPanel {
    constructor(element, options) {
        // # element
        // 1. Check element is HTMLElement, if not throw an error

        // # options
        // 1. defaultSelected - on init selected state assign to internal active state
        // 2. associate id - id for aria-controls
        // 3. element id - id for button

        // Setup element attributes with initial state:
        // - role "tabpanel"
        // - id
        // - tabindex
        // - aria-labelledby - options.associateId
        // - hidden
    }

    get selected() {
        // Get local active / selected state
    }

    set selected(isSelected) {
        // 1. Update local active / selected state
        // 2. Update element's accessibility attributes
    }
}