import React, { useContext, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import AudioContextContext from '../AudioContextContext';

const OscillatorFlowNode = ({data}) => {
  const [frequency, setFrequency] = useState(data.audioNode.frequency.value);
  const audioCtx = useContext(AudioContextContext);

  const onChange = ({ target: { value }}) => {
    data.audioNode.frequency.setValueAtTime(value, audioCtx.currentTime);
    setFrequency(value);
  }

  return (
    <div>
      <Handle type="target" position="left" id="frequency" />
      Oscillator
      <input className="nodrag" type="range" min="0" max="20000" value={frequency} onChange={onChange} />
      <Handle type="source" position="right" id="out" />
    </div>
  )
}

export default OscillatorFlowNode
