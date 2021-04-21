export default (context) => {
  const node = context.createOscillator();
  node.start();
  return node;
};