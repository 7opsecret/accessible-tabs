// Component(s):
import TabControl from '~/src/components/TabControl'
import TabPanel from '~/src/components/TabPanel'

export const tabControlsAndPanelsFixtures = (totalPairs) => [...new Array(totalPairs)].map((_, i) => {
  const tabPanelElement = document.createElement('div')
  const tabControlElement = document.createElement('a')
  const tabPanelId = `tab-panel-${i}`
  const tabControlId = `tab-control-${i}`
  const tabPanelOptions = {
    id: tabPanelId,
    associateId: tabControlId,
    defaultSelected: i === 0
  }
  const tabControlOptions = {
    id: tabControlId,
    associateId: tabPanelId,
    defaultSelected: i === 0,
    title: `Tab CTA ${i}`
  }
  return {
    tabPanel: new TabPanel(tabPanelElement, tabPanelOptions),
    tabControl: new TabControl(tabControlElement, tabControlOptions)
  }
})
