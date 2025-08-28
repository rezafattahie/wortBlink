import { TemplateRef } from "@angular/core";

export interface IModal {
  visible: boolean;
  title: string;
  data: {
    template: TemplateRef<any>;
    context: any;
  };
}
