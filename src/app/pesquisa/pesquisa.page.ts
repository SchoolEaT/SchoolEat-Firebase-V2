import { UsuarioService } from './../services/usuario.service';
import { Usuario } from './../interfaces/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../interfaces/produto';
import { Subscription } from 'rxjs';
import { ProdutoService } from '../services/produto.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage implements OnInit {

  // public produtos = new Array<Produto>();
  private produtosSubscription: Subscription;
  public produtos: Produto[];
  public usuarios:Usuario[];
  private usuariosSubscription:Subscription;
  constructor
  (
    public afs: AngularFirestore,
    private produtoService: ProdutoService,
    public authService: AuthService,
    private usuarioService: UsuarioService
  ) 
  {
    // this.produtosSubscription = this.produtoService
    // .getProdutos()
    // .subscribe(data =>{
    //   this.produtos = data;
    // });
   }

   ngOnDestroy() {
    this.produtosSubscription.unsubscribe();
    this.usuariosSubscription.unsubscribe();
  }


  ngOnInit() {
      this.produtoService.getProdutos().subscribe(
        res => {
          this.produtos = res;
          console.log(res);
        }
      )
      // this.usu
   
  }

search(event){}

}
