import { Usuario } from './../interfaces/usuario';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Produto } from '../interfaces/produto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioColecao: AngularFirestoreCollection<Usuario>;


  constructor
    (
    private afs: AngularFirestore,
    // public Afauth:AngularFireAuth
    private afa: AngularFireAuth,
  ) {
    this.usuarioColecao = this.afs.collection<Usuario>("Users");
  }



  getUsuario() {
    return this.usuarioColecao.snapshotChanges()
      .pipe(
        map(dados => {
          return dados.map(d => ({ idUser: d.payload.doc.id, ...d.payload.doc.data() }))
        })
      )
  }


  get(id) {
    return this.usuarioColecao.doc(id).valueChanges();
  }

  async register(userRegister) {

    //await this.presentLoading();

    try {

      const newUser = await this.afa.auth.createUserWithEmailAndPassword(userRegister.email,userRegister.password);
      const newUserObject = Object.assign({}, userRegister);

      delete newUserObject.email;
      delete newUserObject.password;
      await this.afs.collection("Users").doc(newUser.user.uid).set(newUserObject);
      // this.navCtrl.navigateBack('/login');
    } catch (error) {
      //this.presentToast(error);
    } finally {
      //this.loading.dismiss();
    }

  }
}
