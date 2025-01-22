import { useEffect } from 'react'
import Modeler from 'bpmn-js/lib/Modeler'
/*import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel'*/

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
        //BpmnPropertiesPanelModule,
        //BpmnPropertiesProviderModule,
      ],
    })

    viewer
      .importXML(xml)
      .then(({ warnings }) => {
        console.log('rendered')
      })
      .catch((err) => {
        console.log('error rendering', err)
      })
  }, [xml])

  return (
    <div style={{ height: '100%' }}>
      <div id="bpmn-container" style={{ height: '100%' }}></div>
      <div id="properties"></div>
    </div>
  )
}
