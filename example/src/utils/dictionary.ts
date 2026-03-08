/* eslint-disable @typescript-eslint/no-require-imports */
import { Asset } from 'expo-asset';
import { Directory, File, Paths } from 'expo-file-system';
import { fetch } from 'expo/fetch';
import {unzip} from 'react-native-zip-archive';

const unzipDict = async (targetUri: string) => {
    const asset = await Asset.loadAsync(require('../../assets/ipadic.zip'));
    if (asset[0].localUri) {
        await unzip(asset[0].localUri, targetUri);
    }
};

export const processDictionary = async () => {
    const dictDir = new Directory(Paths.document, 'dict');
    dictDir.create({idempotent: true});

    if (dictDir.list().length > 0) {
        console.log(dictDir.list().map((item) => item.name));
        return dictDir.uri;
    }

    await unzipDict(dictDir.uri);

    return dictDir.uri;
};