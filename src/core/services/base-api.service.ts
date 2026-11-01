import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAppConfig } from '../interfaces/IAppConfig';
import { APP_CONFIG } from '../tokens/app-config.token';

type QueryParamValue = string | number | null | undefined;
type QueryParam = [string, QueryParamValue];

@Injectable()
export abstract class BaseApiService {

  protected http: HttpClient = inject(HttpClient);
  private appConfig: IAppConfig = inject(APP_CONFIG);
  abstract readonly key: string;

  protected getUrl(url: string): string {
    return `${ this.appConfig.apiUrl }/${ this.key }${ url }`;
  }

  protected getParams(params: QueryParam[]): string {
    return params
      .map(([name, value]: QueryParam) => this.getParam(name, value))
      .filter((param: string) => param.length > 0)
      .join('&');
  }

  private getParam(name: string, value: QueryParamValue): string {
    if (value) {
      return `${ name }=${ value }`;
    }

    return '';
  }

}
