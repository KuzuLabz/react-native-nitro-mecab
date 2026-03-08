// Based on ChaSen https://www.unixuser.org/~euske/doc/postag/

const pos1 = {
    "連体詞": "pre-noun adjectival",
    "接頭詞": "prefix",
    "名詞": "noun",
    "動詞": "verb",
    "形容詞": "adjective",
    "副詞": "adverb",
    "接続詞": "conjunction",
    "助詞": "particle",
    "助動詞": "auxiliary verb",
    "感動詞": "interjection",
    "記号": "symbol",
    "フィラー": "filler",
    "その他": "others", 
    "未知語": "unknown"
};

const pos2 = {
    // 接頭詞
    "形容詞接続": "adjective conjunction",
    "数接続": "number conjunction",
    "動詞接続": "verb conjunction",
    "名詞接続": "noun conjunction",
    // 名詞
    "引用文字列": "quoted string",
    "サ変接続": "s-stem irregular verb",
    "ナイ形容詞語幹": "nai-adjective stem",
    "形容動詞語幹": "na-adjective stem",
    "動詞非自立的": "verbal (dependent)",
    "副詞可能": "adverb-possible",
    "一般": "general",
    "数": "number",
    "接続詞的": "conjunctive (nominal)", // "conjunction-like"
    "固有名詞": "proper noun",
    "接尾": "suffix",
    "代名詞": "pronoun",
    "非自立": "dependent",
    "特殊": "special",
    "自立": "independent",
    "助詞類接続": "particle-connectable",
    "格助詞": "case-marking particle",
    "係助詞": "binding particle",
    "終助詞": "sentence-ending particle",
    "接続助詞": "conjunction particle",
    "副詞化": "Adverb-forming particle",
    "副助詞": "adverbial particle",
    "並立助詞": "parallel marker",
    "連体化": "nominalizer",
    "句点": "period",
    "読点": "comma",
    "空白": "space",
    "アルファベット": "alphabet",
    "括弧開": "open bracket",
    "括弧閉": "closed bracket",
    "間投": "interjection"
};

const pos3 = {
    "人名": "person's name",
    "組織": "organization",
    "地域": "area",
    "サ変接続": "sahen-connectable",
    "助数詞": "counter",
    "助動詞語幹": "auxiliary verb stem",
    "縮約": "contraction", // abbreviation
    "引用": "quotation",
    "連語": "compound"
};

const pos4 = {
    "姓": "last name",
    "名": "first name",
    "国": "country"
};

export const EngTags = {
    ...pos1,
    ...pos2,
    ...pos3,
    ...pos4,
};

/**
 * Translates the POS tag to english.
 * @param tag The POS tag.
 * @returns An english translation. Fallbacks to the input tag if none is available.
 * 
 * @example
 * ```ts
 * const tokens = Mecab.tokenize(text);
 * const engPos = translatePos(tokens[0].pos.pos1);
 * ```
 */
export const translatePos = (tag: string) => {
    return EngTags[tag as keyof typeof EngTags] ?? tag;
};