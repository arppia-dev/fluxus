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
import { useEffect, useRef, useState } from 'react'
import styles from './BpmnModeler.module.css'
import { BpmnModelerProps } from './BpmnModeler.types'

var events = [
  'element.hover',
  'element.out',
  'element.click',
  'element.dblclick',
  'element.mousedown',
  'element.mouseup',
]

export default function BpmnModeler({ xml }: BpmnModelerProps) {
  const containerRef = useRef(null)
  const propertiesPanelRef = useRef(null)
  const [event, setEvent] = useState('')

  useEffect(() => {
    const viewer = new Modeler({
      container: containerRef.current!,
      propertiesPanel: {
        parent: propertiesPanelRef.current,
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
    <div style={{ height: '100%' }}>
      <div ref={containerRef} style={{ height: '100%' }}></div>
      <div ref={propertiesPanelRef} className={styles.properties}></div>
    </div>
  )
}
