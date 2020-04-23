import { Component, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';
export interface Track {
  name: string,
  path: string,
  img: string,
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

playlist: Track[] = [

  {
    name: 'Boi Ben - Não Vou Dar Pra Trás',
    path: './assets/Musicas/boi.mp3',
    img: './assets/Imagens/ben.jpeg'
  },

  {
    name: 'C&C - Red Alert 3 ',
    path: './assets/Musicas/redalert.mp3',
    img: './assets/Imagens/redalert.jpeg'
  },

  {
    name: 'Guilherme Cabral - Me escuta',
    path: './assets/Musicas/me.mp3',
    img: './assets/Imagens/me.jpeg'
  },

  {
    name: ' Joji - Test Drive',
    path: './assets/Musicas/joji.mp3',
    img: './assets/Imagens/joji.jpeg'
  },

  {
    name: ' Le Festin - Camille',
    path: './assets/Musicas/le.mp3',
    img: './assets/Imagens/le.jpeg'
  },

  {
    name: 'Panic! At The Disco: This Is Gospel',
    path: './assets/Musicas/pa.mp3',
    img: './assets/Imagens/pa.jpeg'
  },
  
  {
    name: 'Projota, Vitão - Sei Lá',
    path: './assets/Musicas/yu.mp3',
    img: './assets/Imagens/yu.png'
  },
  
  {
    name: 'Roddy Ricch - The Box',
    path: './assets/Musicas/ro.mp3',
    img: './assets/Imagens/ro.jpeg'
  },
  {
    name: 'SAINt JHN - Roses',
    path: './assets/Musicas/saint.mp3',
    img: './assets/Imagens/saint.jpeg'
  },

  {
    name: 'The Weeknd - Call Out My Name',
    path: './assets/Musicas/th.mp3',
    img: './assets/Imagens/th.jpeg'
  },

  {
    name: 'Tones And I - Dance Monkey',
    path: './assets/Musicas/to.mp3',
    img: './assets/Imagens/to.jpeg'
  }

];

activeTrack: Track = null;
player: Howl = null;
isPlaying = false;
progress = 0;

@ViewChild('range',{ static: false } ) range: IonRange;

  constructor() {}

 
  start(track: Track){
    if(this.player){
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        console.log("Iniciado");
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        console.log("Acabou");
      }
    });
    this.player.play();
  }

  togglePlayer(pause){
    this.isPlaying = !pause;
    if(pause){
      this.player.pause();
    }else{
      this.player.play();
    }
  }
  
  next(){

    let index = this.playlist.indexOf(this.activeTrack);
    if(index != this.playlist.length - 1){
      this.start(this.playlist[index + 1]);
    }else{
      this.start(this.playlist[0]);
    }

  }

  prev(){
    let index = this.playlist.indexOf(this.activeTrack);
    if(index > 0){
      this.start(this.playlist[index-1]);
    }else{
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  seek(){
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100))
  }

  updateProgress(){
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() =>{
      this.updateProgress();
    }, 1000)
  }
}
