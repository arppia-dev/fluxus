import '@bpmn-io/properties-panel/assets/properties-panel.css'
import '@bpmn-io/properties-panel/dist/assets/properties-panel.css'
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import Modeler from 'bpmn-js/lib/Modeler'
import { useEffect } from 'react'

interface BpmnViewerProps {
  xml: string
}

export default function BpmnViewer({ xml }: BpmnViewerProps) {
  useEffect(() => {
    const viewer = new Modeler({
      container: '#bpmn-container',
      propertiesPanel: {
        parent: '#properties',
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
      ],
    })

    viewer.importXML(xml).catch((err) => {
      console.error('Error importing diagram:', err)
    })
  }, [xml])

  return (
    <div style={{ height: '100%' }}>
      <div id="bpmn-container" style={{ height: '100%' }}></div>
      <div id="properties"></div>
    </div>
  )
}
