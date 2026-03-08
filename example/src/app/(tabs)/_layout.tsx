import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Main</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{selected: 'house.fill', default: 'house'}} md='home' />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="nodes">
        <NativeTabs.Trigger.Icon sf={{selected:"cube.box.fill", default: "cube.box"}} md="box" />
        <NativeTabs.Trigger.Label>Nodes</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="lattice">
        <NativeTabs.Trigger.Icon sf={'chart.xyaxis.line'} md='graph_1' />
        <NativeTabs.Trigger.Label>Lattice</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="misc">
        <NativeTabs.Trigger.Icon sf={'gear'} md='more_horiz' />
        <NativeTabs.Trigger.Label>Misc</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
