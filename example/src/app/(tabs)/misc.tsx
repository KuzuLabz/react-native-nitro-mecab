import { Mecab } from '@kuzulabz/react-native-nitro-mecab';
import { Button, View } from 'react-native';

const MiscPage = () => {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title='Log Is Initialized' onPress={() => console.log(Mecab.getIsInitialized())} />
        <Button title='Log Version' onPress={() => console.log(Mecab.getVersion())} />
        <Button title='Log Dictionary Info' onPress={() => console.log(Mecab.getDictionaryInfo())} />
        <Button title='Log Dictionary Format' onPress={() => console.log(Mecab.dictFormat)} />
    </View>;
};

export default MiscPage;