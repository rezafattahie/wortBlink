export interface ITranslate {
  vocab: Vocab;
}

export interface Vocab {
  data: Data;
  meta: string;
  title: string;
}

export interface Data {
  definitions: Definition[];
  title: string;
  plural: any;
  has_conjugate: boolean;
  has_deklination: boolean;
  type: string;
  genetive: any;
  id: string;
}

export interface Definition {
  title: string;
  details: string;
  examples: example_phrase[];
  phrases: example_phrase[];
}

export interface example_phrase {
  de: string;
  fa: string;
  id: string;
}
