async function main() {
  const context = webvis.getContext();
  const nodeId = context.add("urn:x-i3d:shape:cube");
  
  await context.setProperty(nodeId, "enabled", true);
}
main();