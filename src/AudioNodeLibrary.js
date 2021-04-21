const AudioNodeLibrary = {
  oscillator: (ctx) => {
    const node = ctx.createOscillator();
    node.start();
    return {
      connect: (targetNode, targetHandle) => {
        node.connect(targetHandle ? targetNode[targetHandle] : targetNode)
      },
      label: "Oscillator",
      audioNode: node,
      params: [
        "frequency",
        "detune"
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
  }
}

export default AudioNodeLibrary