export type NodeStatus = 'normal' | 'unknown' | 'bos' | 'eos' | 'eon';

export interface Node {
  id: number;
  /** character type */
  charType: string;
  /** best accumulative cost from bos node to this node. */
  cost: number;
  wordCost: number;
  feature: string;
  /** is best node? */
  isBest: boolean;
  /** right attribute id */
  rcAttr: number;
  /** left attribute id */
  lcAttr: number;
  /** length of the surface form. */
  length: number;
  /** length of the surface form including white space before the morph. */
  rLength: number;
  /** unique part of speech id. */
  posId: number;
  surface: string;
  /** status of this node */
  status: NodeStatus;
};

export interface Conjugation {
    type: string;
    form: string;
};

export interface Token {
    surface: string;
    baseForm: string;
    reading: string;
    pronunciation: string;
    conjugation: Conjugation;
    /** Parts of speech levels 1-4*/
    pos: [string, string, string, string];
};

export type NodeToken = Omit<Node, 'feature'> & {feature: Token};