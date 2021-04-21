import React, { useState} from 'react';
import {Handle} from 'react-flow-renderer';

const GainFlowNode = ({data}) => {
  const [gain, setGain] = useState(data.audioNode.gain.value);

  const onChange = ({target: { value}}) => {
    data.audioNode.gain.setValueAtTime(value, data.audioNode.context.currentTime);
    setGain(value);
  }

  return (
    <div>
      <Handle type="target" position="left" />
      Gain
      <input className="nodrag" type="range" min="0" max="20000" value={gain} onChange={onChange} />
      <Handle type="source" position="right" />
    </div>
  )
}

export default GainFlowNode;