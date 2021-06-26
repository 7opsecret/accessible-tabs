export const tabsHtmlFixture = ({
  id = 'tab',
  heading = 'Accessible Tab',
  tabListLabel = 'aria label on tab list',
  panels = [{ id: 'panel-1', dataTabTitle: 'Tab 1' }, { id: 'panel-2', dataTabTitle: 'Tab 2' }, { id: 'panel-3', dataTabTitle: 'Tab 3' }]
} = {}) => {
  const panelsHtml = panels
    .map((
      { id: _id, dataTabTitle }
    ) => {
      return `<div id="${_id}" class="js-tab-panel" data-tab-title="${dataTabTitle}">
                <p>${dataTabTitle} Lorem ipsum <a href="https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>`
    })
    .join('')

  return `
        <h2>${heading}</h2>
        <div id="${id}" data-tablist-label="${tabListLabel}">
            ${panelsHtml}
        </div>
    `
}
