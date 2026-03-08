import type { DictFormat } from "./types/model";
import type { Token } from "./types/tagger";

const checkString = (str: string | undefined) => {
    return str ?? "*";
};

export const parseFeatureString = (feature: string, dictType: DictFormat): Token => {
    const splitSurfFeat = feature.trim().split('\t');
    const surface = splitSurfFeat.length > 1 && splitSurfFeat[0] ? splitSurfFeat[0] : "";
    const items = (splitSurfFeat.length > 1 && splitSurfFeat[1] ? splitSurfFeat[1] : feature).split(',') as string[];

    const exclTkn: Omit<Token, 'surface' | 'pos' | 'conjugation'> = {
        baseForm: "*", 
        pronunciation: "*", 
        reading: "*"
    };

    switch (dictType) {
        case "ipadic":
            exclTkn['baseForm'] = checkString(items[6]);
            exclTkn['reading'] = checkString(items[7]);
            exclTkn['pronunciation'] = checkString(items[8]);
            break;
        case 'unidic':
            exclTkn['baseForm'] = checkString(items[7]);
            exclTkn['reading'] = checkString(items[6]);
            exclTkn['pronunciation'] = checkString(items[9]);
            break;
        default:
            break;
    }

    return {
        surface: surface,
        pos: [checkString(items[0]), checkString(items[1]), checkString(items[2]), checkString(items[3])],
        conjugation: {
            type: checkString(items[4]),
            form: checkString(items[5]),
        },
        ...exclTkn,
    };
};

export const parseTokensString = (rawString: string, dictType: DictFormat): Token[] => {
    const results = rawString.trim().split('\n');
    return results.map((r) => r !== 'EOS' ? parseFeatureString(r, dictType) : null).filter((r) => r !== null);
};

export const parseNBestString = (rawString: string, dictType: DictFormat): Token[][] => {
    const rawResults = rawString.trim().split('\nEOS\n').filter((r) => r.length > 0);
    const results = rawResults.map((r) => {
        return r.split('\n').map((t) => {
            if (t === 'EOS') {
                return null;
            }
            return parseFeatureString(t.trim(), dictType);
        }).filter((t) => t !== null);
    });
    return results;
};