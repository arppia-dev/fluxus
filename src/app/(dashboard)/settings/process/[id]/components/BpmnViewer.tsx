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
import { useEffect, useState } from 'react'
import styles from './BpmnViewer.module.css'

interface BpmnViewerProps {
  xml: string
}

var events = [
  'element.hover',
  'element.out',
  'element.click',
  'element.dblclick',
  'element.mousedown',
  'element.mouseup',
]

export default function BpmnViewer({ xml }: BpmnViewerProps) {
  const [event, setEvent] = useState('')

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
    const eventBus: any = viewer.get('eventBus')

    viewer
      .importXML(xml)
      .then(({ warnings }) => {
        if (warnings) {
          console.warn('Warnings:', warnings)
        }
        console.log('rendered')
      })
      .catch((err) => {
        console.error('Error importing diagram:', err)
      })

    eventBus.on('element.click', function (e: any) {
      console.log(event, 'on', e.element.id)
      setEvent(e)
    })

    return () => {
      viewer.destroy()
    }
  }, [])

  return (
    <>
      <pre style={{ height: '400px', maxHeight: '400px', overflow: 'scroll' }}>
        {JSON.stringify(event, null, 2)}
      </pre>
      <div style={{ height: '100%' }}>
        <div id="bpmn-container" style={{ height: '100%' }}></div>
        <div id="properties" className={styles.properties}></div>
      </div>
    </>
  )
}
