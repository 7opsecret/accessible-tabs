/* eslint-disable no-new */
import Tabs from './components/Tabs'
import './demo.css'

new Tabs(
  document.getElementById('horizontal-tabs-1')
)

new Tabs(
  document.getElementById('horizontal-tabs-2')
)

new Tabs(
  document.getElementById('vertical-tabs-1'),
  { orientation: 'vertical' }
)

new Tabs(
  document.querySelector('.no-id'),
  { orientation: 'vertical' }
)
