import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilProdutoPageRoutingModule } from './perfil-produto-routing.module';

import { PerfilProdutoPage } from './perfil-produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilProdutoPageRoutingModule
  ],
  declarations: [PerfilProdutoPage]
})
export class PerfilProdutoPageModule {}
