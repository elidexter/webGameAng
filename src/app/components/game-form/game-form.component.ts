import { Component, OnInit,HostBinding } from '@angular/core';
import { Game } from 'src/app/models/games';
import {Router,ActivatedRoute} from '@angular/router';

import {GamesService} from '../../services/games.service'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  @HostBinding('class') classes='row';
  edit:Boolean=false;
  game:Game={
    id:0,
    title:"",
    description:'',
    image:'',
    create_at:new Date()
  };
  constructor(private gameService:GamesService,private route:Router,private activatedRoute:ActivatedRoute) {

   }

  ngOnInit() {
    const params=this.activatedRoute.snapshot.params;  
    if (params.id)
    {
      this.gameService.getGame(params.id).subscribe(
        resp=>{
          this.game=resp as Game;
          this.edit=true;
        },
        error=>{

        }
      );
    }
  }
  saveNewGame(){
    delete this.game.create_at;
    delete this.game.id;
    this.gameService.saveGame(this.game).subscribe(
      res=>{
        this.route.navigate(['/games']);
      },
      err=>{

      }
    );
  }
  updateGame(){
    delete this.game.create_at;  
    this.gameService.updateGame(this.game.id.toString(),this.game).subscribe(
      res=>{
        this.route.navigate(['/games']);
      },
      err=>{
        console.log(err);
      }
    );
  }
}
