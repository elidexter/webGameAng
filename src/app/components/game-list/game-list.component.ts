import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';
import {Game} from '../../models/games';
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  @HostBinding('class') classes='row';
  games:any=[];
  constructor(private gameServices:GamesService) 
  {
    this.getGames()
  }
  getGames()
  {
    this.gameServices.getGames().subscribe(
      res=>
        {
          this.games=res;
        },
      err=>
        {
          console.log(err);
        }
      );
  }

  ngOnInit() {
  }
  deleteGame(id:string){
    this.gameServices.deleteGame(id).subscribe(
      resp=>{
        console.log(resp);
        this.getGames();
      },
      err=>{

      }
    );
  }  
}