import dynamic from 'next/dynamic'

const BpmnViewer = dynamic(() => import('./../../components/BpmnViewer'), {
  ssr: false,
})

const ProcessEditor = () => {
  return (
    <>
      <h1>Editor</h1>
      <BpmnViewer />
    </>
  )
}

export default ProcessEditor
