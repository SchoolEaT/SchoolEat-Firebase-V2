import { Component, OnInit } from '@angular/core';
import { Produto } from '../../interfaces/produto';
import { ProdutoService } from '../../services/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-produto',
  templateUrl: './perfil-produto.page.html',
  styleUrls: ['./perfil-produto.page.scss'],
})
export class PerfilProdutoPage implements OnInit {

  public produtos :  Produto;
  private id: string;
  
  constructor(
    private produtoService: ProdutoService,
    private activeRoute: ActivatedRoute
  ) { }

  
    ngOnInit() {
      this.id= this.activeRoute.snapshot.paramMap.get("id")
      this.produtoService.getProduto(this.id).subscribe(
        res =>{
          this.produtos = res
        }
      )
    }

}
