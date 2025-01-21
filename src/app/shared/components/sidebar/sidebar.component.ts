import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: false,
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){ }

  get tagsHistory(): string[] {
    return [...this.gifsService.tagsHistory];
  }

  searchGifHistory(tag: string): void {
    this.gifsService.searchTag(tag);
  }
 }
