export interface ITranslate {
  pageProps: PageProps;
  __N_SSP: boolean;
}

export interface PageProps {
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
  examples: example[];
  phrases: example[];
}

export interface example {
  de: string
  fa: string
  id: string
}

