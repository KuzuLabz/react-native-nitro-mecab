export type DictionaryInfoType = 'userdic' | 'sysdic'| 'unknown';

export interface DictionaryInfo {
    /** character set of the dictionary. */
    charset: string;
    /** filename of dictionary */
    filename: string;
    /** left attributes size */
    lSize: number;
    /** right attributes size */
    rSize: number;
    /** How many words are registered in this dictionary. */
    size: number;
    /** dictionary type */
    type: DictionaryInfoType;
    /** version of this dictionary */
    version: number;
};

/**
 * The dictionary format.
 */
export type DictFormat = 'ipadic' | 'unidic' | 'unknown' | 'none';