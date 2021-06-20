export const tabsHtmlFixture = ({
    id = 'tab',
    heading = 'Accessible Tab',
    tabListLabel = 'aria label on tab list',
    panels = [ { title: 'Tab 1' }, { title: 'Tab 2' }, { title: 'Tab 3' } ]
} = {}) => {
    const panelsHtml = panels
        .map((
            { title }
        ) => {
            return `<div class="js-tab-panel" data-tab-title="${title}">
                <p>${title} Lorem ipsum <a href="https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>`
        })
        .join('');

    return `
        <h2>${heading}</h2>
        <div id="${id}" data-tablist-label="${tabListLabel}">
            ${panelsHtml}
        </div>
    `;
}