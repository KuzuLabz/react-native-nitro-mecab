import { Mecab, Node, NodeToken } from '@kuzulabz/react-native-nitro-mecab';
import { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from 'src/components/container';
import { SentenceSelector } from 'src/components/sentence';
import { bench } from 'src/utils/bench';
import { getRandomColor } from 'src/utils/color';

const NodesPage = () => {
    const [text, setText] = useState('すもももももももものうち');
    const [nodes, setNodes] = useState<Node[]>([]);

    const [nodeColors, setNodeColors] = useState<string[]>([]);
    const [selectedIdx, setSelectedIdx] = useState(0);

    const {top} = useSafeAreaInsets();

    const onParse = async () => {
        const result = bench('parseToNode', () => Mecab.parseToNodes(text));
        setSelectedIdx(0);
        setNodeColors(getRandomColor(result.length, 1));
        setNodes(result);
    };

    return(
        <View style={{paddingTop: top}}>
            <ScrollView
            contentContainerStyle={{
                paddingTop: 42,
                paddingHorizontal: 12,
                alignItems: 'center',
                gap: 12
            }}
            style={{
                width: '100%',
                height: '100%',
            }}
            >
                <TextInput value={text} onChangeText={setText} multiline style={{width: '90%', borderRadius: 6, borderWidth: 1, padding: 8, fontSize: 16}} onSubmitEditing={onParse} />
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                    <Button title="Parse" onPress={onParse} />
                </View>
                <SentenceSelector surfaces={nodes?.map((node) => node.surface)} colors={nodeColors} currentIdx={selectedIdx} onPress={(idx) => setSelectedIdx(idx)} />
                {nodes.length > 0 && <View style={{ width: '100%', alignItems: 'center', gap: 8}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 36}}>{nodes[selectedIdx].status === 'bos' || nodes[selectedIdx].status === 'eos' ? nodes[selectedIdx].status : nodes[selectedIdx].surface}</Text>
                    </View>
                    <View style={{ width: '100%', paddingTop: 12, gap: 12}}>
                        <Container title="General">
                            <Text>ID: {nodes[selectedIdx].id}</Text>
                            <Text>Pos ID: {nodes[selectedIdx].posId}</Text>
                            <Text onPress={() => console.log(nodes[selectedIdx].feature)}>Feature: {nodes[selectedIdx].feature}</Text>
                            <Text>Status: {nodes[selectedIdx].status}</Text>
                            <Text>Best: {nodes[selectedIdx].isBest ? "true" : "false"}</Text>
                        </Container>
                        <Container title="Cost">
                            <Text>Cost: {nodes[selectedIdx].cost.toLocaleString()}</Text>
                            <Text>Word Cost: {nodes[selectedIdx].wordCost.toLocaleString()}</Text>
                        </Container>
                        <Container title="Attribute">
                            <Text>Right ID: {nodes[selectedIdx].rcAttr}</Text>
                            <Text>Left ID: {nodes[selectedIdx].lcAttr}</Text>
                        </Container>
                        <Container title="Length">
                            <Text>Surface Form: {nodes[selectedIdx].length}</Text>
                            <Text>Surface Form + white space: {nodes[selectedIdx].rLength}</Text>
                        </Container>
                    </View>
                </View>}
            </ScrollView>
        </View>
    );
};

export default NodesPage;