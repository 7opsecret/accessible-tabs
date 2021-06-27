# Accessible Tabs

This component are fully compliant with w3.org. For more details please refer this [link](https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html). The design pattern choosen for this implementation was [Automatic Activation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html).

## Build and tested with following specs

- node v14.17.1 (npm v6.14.13)
- macOS Catalina 10.15.7

| Browser         | Version       |
| :-------------- | :------------ |
| Google Chrome   | 91.0.4472.114 |
| Safari          | 14.0          |
| Mozilla Firefox | 89.0.1        |
| Microsoft Edge  | 91.0.864.59.  |

## Installation

You can install using the command below in your terminal.

```shell
$ npm install
```

## Development

You can start local development using the command below (after completed the installation steps mentioned above) in your terminal and paste `http://localhost:1234` into your browser when it's ready.

```shell
$ npm start
```

## Test

### For Unit Tests:

You can run unit test using the command below in your terminal.

```shell
$ npm run test:unit
```

For watching:

```shell
$ npm run test:unit:watch
```

### For Integration tests:

> Note: You'll need to make sure have local development server `$ npm start` running before using the command below in your terminal:

```shell
$ npm run test:cypress
```

To open the Cypress Test Runner GUI:

```shell
$ npm run test:cypress:open
```

## Lint

You can run lint using the command below in your terminal.

```shell
$ npm run lint
```

## Usage

### HTML

```html
<!-- Ref: Container Element -->
<div id="tabs" data-tablist-label="describe the purpose of this tab group">
  <!-- Ref: Panel Elements -->
  <div id="tabs-item-1" class="js-tab-panel" data-tab-title="Horizontal Tab">
    ...content
  </div>
  <div id="tabs-item-2" class="js-tab-panel" data-tab-title="Vertical Tabs">
    ...content
  </div>
</div>
```
#### Ref: Container Element

Element that serves as a container for a set of tabs.

| Attributes           | Required or Optional       | Description                                                              |
| :------------------- | :------------------------- | :----------------------------------------------------------------------- |
| `id`                 | optional (but recommended) | For browser history management and direct link tabs activation purposes. |
| `data-tablist-label` | optional (but recommended) | To provides a label that describes the purpose of the set of tabs.       |

#### Ref: Panel Elements

Elements that serves as tabs.

| Attributes             | Required or Optional       | Description                                                                                             |
| :--------------------- | :------------------------- | :------------------------------------------------------------------------------------------------------ |
| `class`                | required - `js-tab-panel`  | Class name `js-tab-panel` is compulsory to be recognize as a valid **Tab** to be processed by JS.       |
| `id`                   | optional (but recommended) | For browser history management and direct link tabs activation purposes.                                |
| `data-tab-title`       | optional (but recommended) | This will be display as Tab Control's (button) label. If non provided It'll fallback to "No title tab". |
### JavaScript

```
import Tabs from '~/src/components/Tabs';

const element = document.getElementById('tabs');

new Tabs(element);
```

#### element

Type: `HTMLElement`

Example:

```
import Tabs from '~/src/components/Tabs';

const element = document.getElementById('tabs');

new Tabs(element);
```

#### options.orientation [optional]

Type: `'horizontal'` | `'vertical'`

Default: `'horizontal'`

Example:

```
import Tabs from '~/src/components/Tabs';

const element = document.getElementById('vertical-tabs');
const options = {
  orientation: 'vertical'
};

new Tabs(element, options);
```

## Features

- Multiple Tab Groups supported per page.
- State retained and can be navigate with browser Back / Forward / Refresh.
- Shared link / url that include Tabs (pre-activated and anchored to last selected tab group container element) on page load. For example (please note the following link does not work, it an example of multiple activated tabs and anchor to last activated tabs section) - `http://your-project.com/?tabs-1=tab-control-itemid-1&v-tabs-1=tab-control-itemid-2#v-tabs-1`

## Keyboard Interaction

When Tab Control (button) is focused:

| Key  | Function                                                        |
| :--- | :-------------------------------------------------------------- |
| Tab  | Moving focus between active Tab Control (button) and Tab Panel. |
| Home | Activate first Tab.                                             |
| End  | Activate last Tab.                                              |

#### When orientation is `horizontal`:

> Note: For more information how to change orientation please check "Usage" section above.

| Key         | Function                                                                                                          |
| :---------- | :---------------------------------------------------------------------------------------------------------------- |
| Left Arrow  | Set focus and activate previous Tab. When focused was the first element, last Tab will be set focus and activate. |
| Right Arrow | Set focus and activate next Tab. When focused was the last element, first Tab will be set focus and activate.     |


#### When orientation is `vertical`:

> Note: For more information how to change orientation please check "Usage" section above.

| Key        | Function                                                                                                          |
| :--------- | :---------------------------------------------------------------------------------------------------------------- |
| Up Arrow   | Set focus and activate previous Tab. When focused was the first element, last Tab will be set focus and activate. |
| Down Arrow | Set focus and activate next Tab. When focused was the last element, first Tab will be set focus and activate.     |
