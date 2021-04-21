import React, { useState } from 'react';
import ReactFlow, { addEdge, ReactFlowProvider, removeElements, Controls, isEdge } from 'react-flow-renderer'
import OscillatorFlowNode from "./flow_nodes/OscillatorFlowNode"
import OutputFlowNode from "./flow_nodes/OutputFlowNode"
import ConstantFlowNode from "./flow_nodes/ConstantFlowNode"
import GainFlowNode from "./flow_nodes/GainFlowNode"
import OscillatorAudioNode from "./audio_nodes/OscillatorAudioNode"
import OutputAudioNode from "./audio_nodes/OutputAudioNode"
import ConstantAudioNode from "./audio_nodes/ConstantAudioNode"
import './App.css'
import Pallette from './Pallette';
import GainAudioNode from './audio_nodes/GainAudioNode';
import AudioNodeLibrary from './AudioNodeLibrary';
import AudioFlowNode from './flow_nodes/AudioFlowNode';

const nodeTypes = {
  output: OutputFlowNode,
  oscillator: AudioFlowNode
};

const audioCtx = new AudioContext();

let id = 0;
const getId = () => `${id++}`;

const App = () => {
  const [audioCtxState, setAudioCtxState] = useState(audioCtx.state);
  const [patchInstance, setPatchInstance] = useState(null);
  const [elements, setElements] = useState([]);

  const toggleAudioCtxState = () => {
    if (audioCtxState === "running") {
      audioCtx.suspend().then(() => setAudioCtxState(audioCtx.state));
    } else {
      audioCtx.resume().then(() => setAudioCtxState(audioCtx.state));
    }
  }

  const onConnect = (params) => {
    const { source, target, targetHandle } = params;
    const elements = patchInstance.getElements();

    const sourceNode = elements.find(el => el.id === source).data.audioNode;
    const targetNode = elements.find(el => el.id === target).data.audioNode;
    sourceNode.connect(targetHandle ? targetNode[targetHandle] : targetNode);

    setElements((els) => addEdge(params, els))
  }

  const onElementsRemove = (elementsToRemove) => {
    const elements = patchInstance.getElements();
    const edges = elementsToRemove.filter(el => isEdge(el));
    edges.forEach((params) => {
      const { source, target, targetHandle } = params;
      const sourceNode = elements.find(el => el.id === source).data.audioNode;
      const targetNode = elements.find(el => el.id === target).data.audioNode;
      sourceNode.disconnect(targetHandle ? targetNode[targetHandle] : targetNode);
    });

    setElements((els) => removeElements(elementsToRemove, els));
  }

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    const position = patchInstance.project({ x: event.clientX, y: event.clientY });
    const newNode = {
      id: getId(),
      type,
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
                onLoad={setPatchInstance}
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
