// this file is created to handle any request we don't want to use loading spinner

import { HttpContextToken } from '@angular/common/http';

export const NO_LOADER = new HttpContextToken<boolean>(() => false);
