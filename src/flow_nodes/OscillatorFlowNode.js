import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';

const OscillatorFlowNode = ({data}) => {
  const [frequency, setFrequency] = useState(data.audioNode.frequency.value);

  const onChange = ({ target: { value }}) => {
    data.audioNode.frequency.setValueAtTime(value, data.audioNode.context.currentTime);
    setFrequency(value);
  }

  return (
    <div>
      <Handle type="target" position="left" id="frequency" />
      Oscillator
      <input className="nodrag" type="range" min="0" max="20000" value={frequency} onChange={onChange} />
      <Handle type="source" position="right" />
    </div>
  )
}

export default OscillatorFlowNode
