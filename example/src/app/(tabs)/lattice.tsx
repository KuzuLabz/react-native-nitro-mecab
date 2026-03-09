import { Mecab, Token } from '@kuzulabz/react-native-nitro-mecab';
import { useMemo, useState } from 'react';
import { Button, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from 'src/components/container';
import { bench } from 'src/utils/bench';

const LatticePage = () => {
    const { width } = useWindowDimensions();
    const [text, setText] = useState('私は鰻');
    const [lattice, setLattice] = useState<Token[][]>();

    const {top} = useSafeAreaInsets();

    const renderLattice = () => {
        return lattice?.map((group, idx) => 
            <Container key={idx} title={`Result ${idx + 1}`}>
                {group.map((token, index) => (
                    <View key={index + 1000}>
                        <Text style={{fontSize: 16}}>{`Surface: ${token.surface}`}</Text>
                        <Text>{`Reading: ${token.reading}`}</Text>
                        <Text style={{fontSize: 16}}>{`Pronunciation: ${token.pronunciation}`}</Text>
                        <Text style={{fontSize: 16}}>{`POS: ${token.pos.join(', ')}`}</Text>
                    </View>
                ))}
                
            </Container>
        );
    };

    const getLattice = async () => {
        const result = await bench('lattice:', async () => Mecab.getLattice(text, 3));
        setLattice(result);
    };

    return <View style={{flex: 1,  paddingHorizontal: 12, paddingTop: top + 42}}>
        <TextInput value={text} onChangeText={setText} multiline style={{width: '90%', alignSelf: 'center', borderRadius: 6, borderWidth: 1, padding: 8, fontSize: 16}} onSubmitEditing={getLattice} />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
            <Button title="Parse" onPress={getLattice} />
        </View>
        <ScrollView>
        {lattice && <View style={{gap: 12}}>
            {renderLattice()}
        </View>}
        </ScrollView>
    </View>;
};

export default LatticePage;