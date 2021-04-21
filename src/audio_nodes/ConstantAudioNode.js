export default (context) => {
  const node = context.createConstantSource();
  node.start();
  return node;
}