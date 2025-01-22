'use client'

import { fetcherToken } from '@/utils/fetcher'
import { Tabs, TabsProps, Typography } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import BpmnViewer from './components/BpmnViewer'

export default function ProcessPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const { data: processes } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/api/processes`, session?.user?.token],
    ([url, token]) => fetcherToken(url, token as string),
  )

  const onChange = (key: string) => {
    console.log(key)
  }

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0opyr9j" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.1.1">
      <bpmn:process id="Process_1uqu9xa">
        <bpmn:startEvent id="Event_1osjwk3">
          <bpmn:outgoing>Flow_0pyvusv</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:task id="Activity_13kz8h3" name="Test">
          <bpmn:incoming>Flow_0pyvusv</bpmn:incoming>
          <bpmn:outgoing>Flow_1fm6vip</bpmn:outgoing>
        </bpmn:task>
        <bpmn:sequenceFlow id="Flow_0pyvusv" sourceRef="Event_1osjwk3" targetRef="Activity_13kz8h3" />
        <bpmn:endEvent id="Event_1t5vhlo">
          <bpmn:incoming>Flow_1fm6vip</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_1fm6vip" sourceRef="Activity_13kz8h3" targetRef="Event_1t5vhlo" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1uqu9xa">
          <bpmndi:BPMNShape id="Event_1osjwk3_di" bpmnElement="Event_1osjwk3">
            <dc:Bounds x="162" y="102" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_13kz8h3_di" bpmnElement="Activity_13kz8h3">
            <dc:Bounds x="250" y="80" width="100" height="80" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_1t5vhlo_di" bpmnElement="Event_1t5vhlo">
            <dc:Bounds x="402" y="102" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Flow_0pyvusv_di" bpmnElement="Flow_0pyvusv">
            <di:waypoint x="198" y="120" />
            <di:waypoint x="250" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1fm6vip_di" bpmnElement="Flow_1fm6vip">
            <di:waypoint x="350" y="120" />
            <di:waypoint x="402" y="120" />
          </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>
  `

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Formulario',
      style: { height: '800px' },
      children: (
        <>
          <BpmnViewer xml={xml} />
        </>
      ),
    },
    {
      key: '2',
      label: 'Editor',
      style: { height: '100%' },
      children: <div>editor</div>,
    },
  ]

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{ width: '100%', height: '100%' }}
      />
    </>
  )
}
