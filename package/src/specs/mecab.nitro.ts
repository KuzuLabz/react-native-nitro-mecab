import { type HybridObject } from 'react-native-nitro-modules'
import type { DictionaryInfo } from '../types/model';
import type { Node } from '../types/tagger';

export interface NitroMecab extends HybridObject<{
  ios: 'c++'
  android: 'c++'
}> {
  // Setup
  getIsInitialized(): boolean;
  initialize(dictUri: string, userDictUris?: string[]): Promise<void>;
  deinitialize(): void;

  // Utils
  getDictionaryInfo(): DictionaryInfo[];
  getVersion(): string;

  // Main
  tokenize(text: string): string;
  wakati(text: string): string[];
  parseToNode(text: string): Node[];

  // Lattice / Graph
  getLattice(text: string, nBest: number): Promise<string>;
}
