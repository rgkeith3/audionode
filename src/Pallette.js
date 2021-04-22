import React from 'react';
import AudioNodeLibrary from './AudioNodeLibrary';

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Pallette = () => {
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <ul>
        {Object.keys(AudioNodeLibrary).map(key =>
          <div key={key} className="dndnode" onDragStart={(event) => onDragStart(event, key)} draggable>
            {key}
          </div>
        )}
      </ul>
    </aside>
  );
};

export default Pallette;
