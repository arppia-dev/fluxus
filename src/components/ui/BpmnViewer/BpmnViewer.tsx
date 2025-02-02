import '@bpmn-io/properties-panel/assets/properties-panel.css'
import '@bpmn-io/properties-panel/dist/assets/properties-panel.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import Viewer from 'bpmn-js/lib/Viewer'
import { useEffect } from 'react'
import { BpmnViewerProps } from './BpmnViewer.types'

export default function BpmnViewer({ xml, index }: BpmnViewerProps) {
  useEffect(() => {
    const viewer = new Viewer({
      container: `#bpmn-container${index}`,
    })

    viewer
      .importXML(xml)
      .then(() => {
        viewer.get('canvas').zoom('fit-viewport')
        console.log('rendered')
      })
      .catch((err) => {
        console.error('Error importing diagram:', err)
      })

    return () => {
      viewer.destroy()
    }
  }, [xml])

  return (
    <div style={{ height: '100%' }}>
      <div
        id={`bpmn-container${index}`}
        style={{ height: '100%', width: '100%', backgroundColor: '#f0f0f0' }}
      ></div>
    </div>
  )
}
