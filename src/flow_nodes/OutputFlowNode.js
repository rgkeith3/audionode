import React from 'react';
import { Handle } from 'react-flow-renderer';

const OutputFlowNode = () => {
  return (
    <div>
      Output
      <Handle type="target" position="left" style={{top: 10}}/>
    </div>
  )
}

export default OutputFlowNode