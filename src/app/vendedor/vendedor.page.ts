import { Usuario } from './../interfaces/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.page.html',
  styleUrls: ['./vendedor.page.scss'],
})
export class VendedorPage implements OnInit {

  public usuarios :  Usuario;
  
  private id: string;

  // private id: string;
  constructor
  (
    private usuarioService: UsuarioService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) 
  {

   }

   ngOnInit() {
    this.id = this.activeRouter.snapshot.paramMap.get("idUser")
    this.usuarioService.get(this.id).subscribe(
      res => {
        this.usuarios = res
        console.log(res);
      }
    )
  }

  // ionViewWillEnter(){
  //   let login = this.usuarioService.Afauth.auth.currentUser;
  //   if(login){
  //     this.usuarioService.getUsuario().subscribe(
  //       res => {
  //         if(res == null){
  //           this.usuarios
  //           if(login.displayName != null){
  //             this.usuarios.nome = login.displayName
  //           }
  //         }else{
  //           this.usuarios = res
  //         }
  //         this.usuarios.email = login.email 
  //         console.log(this.usuarios);
  //       },
  //       erro =>{
  //       console.log(erro)
  //       this.
  //       }
  //     )
  //   }
  // }

}
