class TabControl {
    constructor(element, options) {
        // # element
        // 1. Check element is HTMLElement, if not throw an error

        // # options
        // 1. defaultSelected - on init selected state assign to internal active state
        // 2. associate id - id for aria-controls
        // 3. element id - id for button
        // 4. onClick callback attach to element
        // 5. keypress callback attach to element

        // Setup element attributes with initial state:
        // - aria-selected - set from initial active / selected state
        // - aria-controls - options.associateId
        // - role
    }

    get selected() {
        // Get local active / selected state
    }

    set selected(isSelected) {
        // 1. Update local active / selected state
        // 2. Update element's accessibility attributes
    }
}