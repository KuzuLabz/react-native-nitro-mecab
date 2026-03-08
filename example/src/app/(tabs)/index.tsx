import { Button, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Mecab, Token, translatePos } from '@kuzulabz/react-native-nitro-mecab';
import { bench } from "src/utils/bench";
import { ReactNode, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRandomColor } from "src/utils/color";
import { SentenceSelector } from "src/components/sentence";
import { Container } from "src/components/container";

export default function Index() {
    // すもももももももものうち
    // 蝉せみの不規則な鳴き声からくる錯覚かもしれない。
    const [text, setText] = useState('他方、成績評価の甘い授業が高く評価されたり、人気取りに走る教師が出たりし、成績の安売りや大学教師のレベルダウンという弊害をもたらす恐れがある、などの反省意見もある.');
    const [tokens, setTokens] = useState<Token[]>([]);
    const [tokenColors, setTokenColors] = useState<string[]>([]);
    const [selectedIdx, setSelectedIdx] = useState(0);

    const onTokenize = async () => {
        const result = bench('tokenize', () => Mecab.tokenize(text));
        setSelectedIdx(0);
        setTokenColors(getRandomColor(result.length, 1));
        setTokens(result);
    };

    const onWakati = async () => {
        const result = bench('wakati', () => Mecab.wakati(text));
        console.log('Wakati:', result);
    };

  return (
    <SafeAreaView >
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
            <TextInput value={text} onChangeText={setText} multiline style={{width: '90%', borderRadius: 6, borderWidth: 1, padding: 8, fontSize: 16}} onSubmitEditing={onTokenize} />
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                <Button title="Tokenize" onPress={onTokenize} />
                <Button title="Wakati" onPress={onWakati} />
            </View>
            <SentenceSelector surfaces={tokens?.map((token) => token.surface)} colors={tokenColors} currentIdx={selectedIdx} onPress={(idx) => setSelectedIdx(idx)} />
            {tokens.length > 0 && <View style={{ width: '100%', alignItems: 'center', gap: 8}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 36}}>{tokens[selectedIdx].surface}</Text>
                    <Text style={{fontSize: 16}}>{`【${tokens[selectedIdx].reading}】`}</Text>
                </View>
                <View style={{ width: '100%', paddingTop: 12, gap: 12}}>
                    <Container title="General">
                        <Text>Base Form: {translatePos(tokens[selectedIdx].baseForm)}</Text>
                        <Text>pronunciation: {translatePos(tokens[selectedIdx].pronunciation)}</Text>
                    </Container>
                    <Container title="Part of Speech">
                        {tokens[selectedIdx].pos.map((pos,  idx) => (
                            <Text key={idx}>{idx + 1}: {pos} {pos !== '*' && `(${translatePos(pos)})`}</Text>
                        ))}
                    </Container>
                    <Container title="Conjugation">
                        <Text>Type: {translatePos(tokens[selectedIdx].conjugation.type)}</Text>
                        <Text onPress={() => console.log(tokens[selectedIdx].conjugation)}>Form: {translatePos(tokens[selectedIdx].conjugation.form)}</Text>
                    </Container>
                </View>
            </View>}
        </ScrollView>
    </SafeAreaView>
  );
}
