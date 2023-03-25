import React, { useRef, useEffect } from 'react'
import Modeler from 'bpmn-js/lib/Modeler'
import TokenSimulationModule from 'bpmn-js-token-simulation'

import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css'

const BpmnViewer = () => {
  const containerRef = useRef<HTMLInputElement>(null)
  let viewer: any = null

  useEffect(() => {
    viewer = new Modeler({
      container: containerRef.current,
      keyboard: {
        bindTo: document,
      },
      additionalModules: [TokenSimulationModule],
    })

    viewer.importXML(
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="Definitions_1">\n' +
        '  <bpmn:process id="Process_1" isExecutable="false">\n' +
        '    <bpmn:startEvent id="StartEvent_1"/>\n' +
        '  </bpmn:process>\n' +
        '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
        '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
        '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
        '        <dc:Bounds x="173" y="102" width="36" height="36"/>\n' +
        '      </bpmndi:BPMNShape>\n' +
        '    </bpmndi:BPMNPlane>\n' +
        '  </bpmndi:BPMNDiagram>\n' +
        '</bpmn:definitions>',
      (err: any) => {
        if (err) {
          console.error('Error rendering BPMN diagram.', err)
        } else {
          console.log('BPMN diagram rendered.')
        }
      }
    )

    return () => {
      viewer.destroy()
    }
  }, [])

  return (
    <>
      <div ref={containerRef} style={{ height: '100vh' }} />
    </>
  )
}

export default BpmnViewer
