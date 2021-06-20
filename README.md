# accessible-tabs

# Prerequisite

- Node v14.17.1
- NPM 6.14.13

## Install

You can install using the command below in your terminal.

```shell
  $ npm install
```

## Test

You can run unit test using the command below in your terminal.

For watching:

```shell
  $ npm run test:watch
```

For full run:

```shell
  $ npm test
```

## Development

You can start local development using the command below in your terminal and paste `http://localhost:1234` into your browser when it's ready.

```shell
  $ npm start
```

## User Guide

HTML:

- a wrapper container with id (highly recommend)
- Each panel with class js-tab-panel
- Each panel with ID (highly recommend)
- data-tab-title for tab title
- make sure all ID are unique
- container "data-tablist-label" for to describe purpose of tabs

```html
<div id="tabs-1" data-tablist-label="">
    <div id="some-tab-name" class="js-tab-panel" data-tab-title="Accessible Tab">
        <p>Tab 1-1 Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
    <div id="another-tab-name" class="js-tab-panel" data-tab-title="Horizontal Tabs">
        <p>Tab 1-2 Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
    <div id="good-tab-name" class="js-tab-panel" data-tab-title="Keyboard Navigation">
        <p>Tab 1-3 Lorem ipsum <a href="https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel">dolor</a> sit amet.</p>
    </div>
</div>
```

JavaScript:

`new Tabs(document.getElementById('tab-id'))`


TODO:
- Installation Guide
- Test Guide
- Testing accessibility using browser axe plugin for development
- Look into automate accessibility audit (e.g. Jest / Cypress) at the end in case running out of time