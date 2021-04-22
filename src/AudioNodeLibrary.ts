import { AudioNodeFlowInterface } from "./AudioNodeFlowInterface";

const AudioNodeLibrary:{ [index: string] : (ctx: AudioContext) => AudioNodeFlowInterface} = {
  oscillator: (ctx: AudioContext): AudioNodeFlowInterface => {
    const audioNode = ctx.createOscillator();
    audioNode.start();
    return new AudioNodeFlowInterface({ 
      audioNode, 
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
    const audioNode = ctx.createGain();
    return new AudioNodeFlowInterface({
      audioNode,
      label: "Gain",
      params: ["gain"]
    });
  },
  constant: (ctx: AudioContext): AudioNodeFlowInterface => {
    const audioNode = ctx.createConstantSource();
    audioNode.start();
    return new AudioNodeFlowInterface({
      audioNode,
      label: "Constant",
      params: ["offset"]
    })
  },
  filter: (ctx: AudioContext): AudioNodeFlowInterface => {
    const audioNode = ctx.createBiquadFilter();
    return new AudioNodeFlowInterface({
      audioNode,
      label: "Filter",
      params: ["frequency", "Q", "gain"],
      constants: [
        {
          name: "type",
          options: ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"]
        }
      ]
    });
  },
  delay: (ctx: AudioContext): AudioNodeFlowInterface => {
    const audioNode = ctx.createDelay();
    return new AudioNodeFlowInterface({
      audioNode,
      label: "Delay",
      params: ["delayTime"]
    })
  },
  pan: (ctx: AudioContext): AudioNodeFlowInterface => {
    const audioNode = ctx.createStereoPanner();
    return new AudioNodeFlowInterface({
      audioNode,
      label: "Stereo Panner",
      params: ["pan"]
    })
  }
}

export default AudioNodeLibrary