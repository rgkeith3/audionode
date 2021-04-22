import { AudioNodeFlowInterface } from "./AudioNodeFlowInterface";

const AudioNodeLibrary:{ [index: string] : (ctx: AudioContext) => AudioNodeFlowInterface} = {
  oscillator: (ctx: AudioContext): AudioNodeFlowInterface => {
    const node = ctx.createOscillator();
    node.start();
    return new AudioNodeFlowInterface({ 
      audioNode: node, 
      label: "Oscillator", 
      params: ["frequency"], 
      constants: [
        {
          name: "type", 
          options: ["sine", "square", "sawtooth", "triangle"]
        }
      ]
    });
  },
  output: (ctx: AudioContext): AudioNodeFlowInterface => {
    return new AudioNodeFlowInterface({
      audioNode: ctx.destination,
      label: "Output"
    });
  },
  gain: (ctx: AudioContext): AudioNodeFlowInterface => {
    const node = ctx.createGain();
    return new AudioNodeFlowInterface({
      audioNode: node,
      label: "Gain",
      params: ["gain"]
    });
  },
  constant: (ctx: AudioContext): AudioNodeFlowInterface => {
    const node = ctx.createConstantSource();
    node.start();
    return new AudioNodeFlowInterface({
      audioNode: node,
      label: "Constant",
      params: ["offset"]
    })
  }
}

export default AudioNodeLibrary