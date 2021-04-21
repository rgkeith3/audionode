const AudioNodeLibrary = {
  oscillator: (ctx) => {
    const node = ctx.createOscillator();
    node.start();
    return {
      connect: (targetNode, targetHandle) => {
        node.connect(targetHandle ? targetNode[targetHandle] : targetNode)
      },
      disconnect: (targetNode, targetHandle) => {
        node.disconnect(targetHandle ? targetNode[targetHandle] : targetNode)
      },
      label: "Oscillator",
      audioNode: node,
      params: [
        "frequency"      
      ],
      constants: [
        {name: "type", options: ["sine", "square", "sawtooth", "triangle"]}
      ],
      outputs: 1
    }
  },
  output: (ctx) => {
    return {
      label: "Output",
      audioNode: ctx.destination,
      inputs: 1
    }
  },
  gain: (ctx) => {
    const node = ctx.createGain();
    return {
      label: "Gain",
      connect: (targetNode, targetHandle) => {
        node.connect(targetHandle ? targetNode[targetHandle] : targetNode)
      },
      disconnect: (targetNode, targetHandle) => {
        node.disconnect(targetHandle ? targetNode[targetHandle] : targetNode)
      },
      audioNode: node,
      params: ["gain"],
      inputs: 1,
      outputs: 1
    }
  }
}

export default AudioNodeLibrary