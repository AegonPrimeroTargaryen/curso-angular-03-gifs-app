import { Gif } from './../interfaces/gifs.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiGiphy: string = 'https://api.giphy.com/v1/gifs';

  private apiKeyGiphy: string = '75HRGWJNq6WFoytVSK8p6Fq7bg2cO3YA';


  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if(tag.length <= 0) return;
    this.organizeHistory(tag);

    // fetch('https://api.giphy.com/v1/gifs/trending?api_key=75HRGWJNq6WFoytVSK8p6Fq7bg2cO3YA&q=Valorant&limit=10')
    //   .then(resp => resp.json())
    //   .then(data => console.log(data));

    const params: HttpParams = new HttpParams()
      .set('api_key', this.apiKeyGiphy)
      .set('limit', '12')
      .set('q', tag);


    this.http.get<SearchGifsResponse>(`${this.apiGiphy}/search`, {params})
      .subscribe(resp => {
        this.gifList = resp.data;
      });
  }

  private organizeHistory(tag: string): void{
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
}
