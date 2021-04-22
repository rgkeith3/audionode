import React, { useState } from 'react';
import ReactFlow, { addEdge, ReactFlowProvider, removeElements, Controls, isEdge, Connection, OnLoadParams, Elements, Edge } from 'react-flow-renderer'
import './App.css'
import Pallette from './Pallette';
import AudioNodeLibrary from './AudioNodeLibrary';
import AudioFlowNode from './flow_nodes/AudioFlowNode';

const nodeTypes = {
  custom: AudioFlowNode
};

const audioCtx = new AudioContext();

let id = 0;
const getId = () => `${id++}`;

const App = () => {
  const [audioCtxState, setAudioCtxState] = useState(audioCtx.state);
  const [patchInstance, setPatchInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>([]);

  const toggleAudioCtxState = () => {
    if (audioCtxState === "running") {
      audioCtx.suspend().then(() => setAudioCtxState(audioCtx.state));
    } else {
      audioCtx.resume().then(() => setAudioCtxState(audioCtx.state));
    }
  }

  const onLoad = (reactFlowInstance: OnLoadParams) => setPatchInstance(reactFlowInstance);

  const onConnect = (params: Connection | Edge) => {
    const { source, target, targetHandle } = params;
    const elements = patchInstance!.getElements();

    const sourceNode = elements.find(el => el.id === source);
    const targetNode = elements.find(el => el.id === target);
    if (sourceNode && targetNode) {
      sourceNode.data.connectNode(targetNode.data, targetHandle);
    }

    setElements((els) => addEdge(params, els));
  }

  const onElementsRemove = (elementsToRemove: Elements) => {
    const elements = patchInstance!.getElements();
    elementsToRemove.forEach((element) => {
      if (isEdge(element)) {
        const { source, target, targetHandle } = element;
        const sourceNode = elements.find(el => el.id === source);
        const targetNode = elements.find(el => el.id === target);
        if (sourceNode && targetNode) {
          sourceNode.data.disconnectNode(targetNode.data, targetHandle);
        }
      }
    });

    setElements((els) => removeElements(elementsToRemove, els));
  }

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer!.getData('application/reactflow');
    const position = patchInstance!.project({ x: event.clientX, y: event.clientY });
    const newNode = {
      id: getId(),
      type: "custom",
      position,
      data: AudioNodeLibrary[type](audioCtx),
    };

    setElements((es) => es.concat(newNode));
  };

  return (
      <div className="App" >
        <ReactFlowProvider>
            <div className="reactflow-wrapper" style={{height: 300}}>
              <ReactFlow 
                nodeTypes={nodeTypes} 
                elements={elements} 
                onConnect={onConnect}
                onElementsRemove={onElementsRemove}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onLoad={onLoad}
                >
                <Controls />
              </ReactFlow>
            </div>
            <button onClick={toggleAudioCtxState}>{audioCtxState === "running" ? "Stop" : "Start"}</button>
            <Pallette />
        </ReactFlowProvider>
      </div>
  );
}

export default App;
