import React, {useState, useContext} from 'react';
import { Handle } from 'react-flow-renderer';
import AudioContextContext from '../AudioContextContext';

const ConstantFlowNode = ({data}) => {
  const [value, setValue] = useState(data.audioNode.offset.value);
  const audioCtx = useContext(AudioContextContext);
  
  const onChange = ({ target: { value }}) => {
    data.audioNode.offset.setValueAtTime(value, audioCtx.currentTime);
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