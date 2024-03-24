import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private localStorageService : LocalStorageService) { }

  private key: string = 'favoritos';


  addFav(idImdb: string): void {
    let favoritos = this.getFav();
    if (!favoritos.includes(idImdb)) {
      favoritos.push(idImdb);
      this.localStorageService.setItem(this.key, favoritos);
    }
  }

  rmFav(idImdb: string): void {
    let favoritos = this.getFav();
    const index = favoritos.indexOf(idImdb);
    if (index !== -1) {
      favoritos.splice(index, 1);
      this.localStorageService.setItem(this.key, favoritos);
    }
  }

  getFav(): string[] {
    return this.localStorageService.getItem(this.key) || [];
  }

  isFav(idImdb: string): boolean {
    const favoritos = this.getFav();
    return favoritos.includes(idImdb);
  }

  toggleFav(idImdb: string): void {
    let favoritos = this.getFav(); 
    const index = favoritos.indexOf(idImdb);
  
    if (index === -1) {
      favoritos.push(idImdb);
    } else {
      favoritos.splice(index, 1);
    }
    this.localStorageService.setItem(this.key, favoritos);
  }
  
}
