import { Produto } from './../interfaces/produto';
import { ProdutoService } from './../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

import { Subscription } from 'rxjs';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {


public produto : Produto = {};
private loading: any;
private produtoSubscription: Subscription;
private produtoId : string = null;
  constructor
  (
    private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadinCtrl: LoadingController,
    private authService: AuthService,
    public camera : Camera,
    private toastCtrl: ToastController,
    private actionSheetController:ActionSheetController
  ) { 
      this.produtoId = this.activatedRoute.snapshot.params['idUser'];

      if(this.produtoId) this.loadProduto();
  }



  slideOpts ={
    initialSlide: 1,
    slidesPerView: 4,
    speed:400
  }





  ngOnInit() {
  }

  loadProduto(){
    this.produtoSubscription = this.produtoService.listaProdutos(this.produtoId).subscribe(data =>{
      this.produto = data;
    })
  }

async save(){
  await this.presentLoading();

  this.produto.IdUser = this.authService.getAuth().currentUser.uid;

  if(this.produtoId){

  }else{
    this.produto.createdAt = new Date().getTime();

    try{
      await this.produtoService.addProdutos(this.produto);
      await this.loading.dismiss();

      this.navCtrl.navigateBack('/tabs/home');
    }catch(error){
      this.presentToast('Erro ao tentar salvar');
      this.loading.dismiss();
    }
  }

}

async presentLoading(){
  this.loading = await this.loadinCtrl.create({
    message: "Aguarde..."
  });
}


async presentToast(message: string){
  const toast = await this.toastCtrl.create({
    message, duration: 2000
  });
  toast.present();
}

tirarFoto(){
  const opcao: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(opcao).then((imageData)=>{
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    if( this.produto.fotosProduto == null){
      this.produto.fotosProduto = [];
    }
    this.produto.fotosProduto.push(base64Image);
   
  }, (err)=>{
    console.log(err);
  });
}

escolherFoto(){
  const options: CameraOptions ={
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData)=>{
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    if( this.produto.fotosProduto == null){
      this.produto.fotosProduto = [];
    }
    this.produto.fotosProduto.push(base64Image);
    
  },(err)=>{
    console.log(err);
  })
}


async youPhoto(){
  const actionSheet = await this.actionSheetController.create({
    header: 'Escolha',
    buttons: [
      {
        text: 'Camera',
        icon: 'camera',
        handler: () =>{
          this.tirarFoto()
        }
      },
      {
        text: 'Galeria',
        icon: 'photo',
        handler: ()=>{
          this.escolherFoto()
        }
      },
      {
        text: 'Cancelar',
        icon:'close',
        role:'cancel',
        handler: ()=>{
          console.log('Cancelado');
        }
      }
]
  });
  await actionSheet.present();
}


async removePhoto(index){
  const alert = await this.toastCtrl.create({
    header: 'Confirmar!!',
    message: 'APAGAR ' + (index + 1 ) + 'foto?',
    buttons: [
      {
        text: 'Sim',
        handler: () =>{
          this.produto.fotosProduto.splice(index, 1)

          if(this.produto.fotosProduto[0] == null)
            this.produto.fotosProduto = null
        }
        
      },
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'Secondary',
        }
    ]
    
  })
  await alert.present();
}




}
