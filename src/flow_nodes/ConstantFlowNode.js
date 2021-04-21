import React, {useState} from 'react';
import { Handle } from 'react-flow-renderer';

const ConstantFlowNode = ({data}) => {
  const [value, setValue] = useState(data.audioNode.offset.value);
  
  const onChange = ({ target: { value }}) => {
    data.audioNode.offset.setValueAtTime(value, data.audioNode.context.currentTime);
    setValue(value);
  }

  // can update params.data.audioNode
  return(
    <div>
      {value}
      <input className="nodrag" type="range" min="1" max="20000" value={value} onChange={onChange}/>
      <Handle type="source" position="right"/>
    </div>
  )
}

export default ConstantFlowNode