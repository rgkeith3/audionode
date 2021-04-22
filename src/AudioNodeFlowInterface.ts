export type Param = string
export type Constant = {
  name: string,
  options: string[]
}

export type AudioNodeFlowInterfaceOptions = {
  audioNode: AudioNode
  label: string
  params?: Param[]
  constants?: Constant[]
}

export class AudioNodeFlowInterface {
  constructor(options: AudioNodeFlowInterfaceOptions) {
    const { audioNode, label, params, constants } = options;
    this.audioNode = audioNode;
    this.label = label;
    this.params = params || [];
    this.constants = constants || [];
    this.outputs = audioNode.numberOfOutputs;
    this.inputs = audioNode.numberOfInputs;
  }
  connectNode (targetNode: any, targetHandle: string) {
    this.audioNode.connect(targetHandle ? targetNode[targetHandle] : targetNode)
  };
  disconnectNode (targetNode: any, targetHandle: string) {
    this.audioNode.disconnect(targetHandle ? targetNode[targetHandle] : targetNode)
  };
  label: string;
  audioNode: any;
  params: Param[];
  constants: Constant[];
  outputs: number;
  inputs: number;
}
