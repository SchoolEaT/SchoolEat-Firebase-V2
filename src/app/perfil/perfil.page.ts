import { Produto } from './../interfaces/produto';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../services/produto.service';
import { Component, OnInit } from '@angular/core';
// import { Produto } from '../interfaces/produto';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


public produtos :  Produto;
private id: string;

  constructor
  (
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
