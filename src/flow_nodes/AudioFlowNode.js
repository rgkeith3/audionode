import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';

const AudioFlowNode = ({data: { label, params, constants, outputs, inputs, audioNode }}) => {
  // and dynamically create input / output handles for ins and outs as well as for parameters
  // handle constants
  // probably want to try to do special handling for frequency sliders (exponential)
  const initialState = {}
  params.forEach(param => {
    initialState[param] = audioNode[param].value;
  });
  const [state, setState] = useState(initialState);

  return(
    <div>
      {label}
      {params.map(param => 
        <input 
          className="nodrag" 
          type="range" 
          min={audioNode[param].minValue} 
          max={audioNode[param].maxValue}
          value={state[param]}
          onChange={({target: {value}}) => {
            audioNode[param].setValueAtTime(value, audioNode.context.currentTime);
            setState({...state, [param]: value});
          }}
        />)}
      <Handle type="source" position="right" />
    </div>
  )
}

export default AudioFlowNode;