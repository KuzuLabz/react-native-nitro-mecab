import { NitroModules } from 'react-native-nitro-modules'
import type { NitroMecab as NitroMecabSpec } from './specs/mecab.nitro'
import type { DictFormat } from './types/model';
import type { Node, NodeToken, Token } from './types/tagger';
import { parseFeatureString, parseNBestString, parseTokensString } from './process';

const MecabNitro =
  NitroModules.createHybridObject<NitroMecabSpec>('NitroMecab');


export class MecabClass {
    public dictFormat: DictFormat;

    constructor() {
        this.dictFormat = 'none';
    }

    /**
     * Initialize Mecab.
     * 
     * **Only IPADIC and UNIDIC are supported!**
     * 
     * @param dictUri The local uri of the dictionary directory ("file://...").
     * @param dictFormat The {@linkcode DictFormat} of dictionary.
     * @param userDictUris An array of user dictionary directory uri's.  
     * 
     * `Unsupported Dictionaries` - Set dictType to 'unknown'. Tokens may be incorrect. The parseToNode() with a custom feature parser is recommended for unsupported formats.
     * 
     */
    async initialize(dictUri: string, dictFormat: DictFormat, userDictUris?: string[]) {
        await MecabNitro.initialize(dictUri, userDictUris);
        this.dictFormat = dictFormat;
    };

    /**
     * Unloads the dictionary and destroys the tagger.
     * 
     * *Useful for switching dictionaries and or adding user dicts.*
     */
    deinitialize() {
        MecabNitro.deinitialize();
        this.dictFormat = 'none';
    };

    /**
     * Check if Mecab is ready.
     */
    getIsInitialized() {
        return MecabNitro.getIsInitialized();
    };

    /**
     * Get information about the loaded dictionary.
     */
    getDictionaryInfo() {
        return MecabNitro.getDictionaryInfo();
    };

    /**
     * Gets the Mecab version.
     */
    getVersion() {
        return MecabNitro.getVersion();
    };

    /**
     * Tokenize a japanese sentence.
     * 
     * @param text A japanese sentence.
     * 
     * @returns An array of {@linkcode Token}.
     */
    tokenize(text: string): Token[] {
        const raw = MecabNitro.tokenize(text);
        return parseTokensString(raw, this.dictFormat);
    };

    /**
     * Segments/splits the japanese text by word.
     * 
     * @param text A japanese sentence.
     * 
     * @returns An array of words.
     * 
     * @example
     * ```ts
     * const result = Mecab.wakati("すもももももももものうち");
     * // ["すもも", "も", "もも", "も", "もも", "の", "うち"]
     * ```
     */
    wakati(text: string) {
        return MecabNitro.wakati(text);
    };

    /**
     * Parses the japanese text into Mecab Nodes. 
     * 
     * Mecab nodes contain additional data, along with a raw feature string instead of a token.
     * 
     * @param text The japanese text to parse.
     * @param tokenize Feature field returns a {@linkcode Token}, otherwise a raw string. Default is false.
     * @param skipBosEos Filters out the BOS and EOS nodes. Default is true.
     * 
     * @returns An array of {@linkcode NodeToken} or {@linkcode Node}
     */
    parseToNodes(text: string, tokenize?: boolean, skipBosEos?: boolean): Node[] | NodeToken[]; 
    parseToNodes(text: string, tokenize?: false, skipBosEos?: boolean): Node[];
    parseToNodes(text: string, tokenize?: true, skipBosEos?: boolean): NodeToken[];
    parseToNodes(text: string, tokenize: boolean = false, skipBosEos: boolean = true) {
        const result = MecabNitro.parseToNode(text).filter((n) => skipBosEos ? n.status !== 'bos' && n.status !== 'eos' : true);
        if (tokenize) {
            return result.map((n) => ({...n, feature: {...parseFeatureString(n.feature, this.dictFormat), surface: n.surface}}));
        }
        return result
    };

    /**
     * Parses the sentence into tokens with nbest results.
     * @param text A japanese sentence.
     * @param nBest The x amount of best results
     * @returns An array of {@linkcode Token} groupings.
     * 
     * @example 
     * ```ts
     * const result: Token[][] = await Mecab.getLattice(text, 2);
     * const group1: Token[] = result[0]; // <-- contains the best token grouping.
     * ```
     */
    async getLattice(text: string, nBest: number = 2) {
        const lString = await MecabNitro.getLattice(text, nBest);
        return parseNBestString(lString, this.dictFormat);
    };
};

export const Mecab = new MecabClass();

export { EngTags, translatePos } from './trans';

export type { DictionaryInfo, DictFormat } from './types/model';
export type { Node, NodeToken, NodeStatus, Token } from './types/tagger';
// export type { LatticeGraph, LatticeEdge } from './types/lattice';