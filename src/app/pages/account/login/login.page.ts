import { UserModel } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

import { DataService } from './../../../data.service';
import { SecurityUtil } from 'src/app/utils/security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public hide = true;
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private navController: NavController,
              private dataService: DataService) {
                this.form = this.fb.group({
                  username: ['', Validators.compose([
                    Validators.required
                  ])],
                  password: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20)
                  ])],
                });
              }

  ngOnInit() {
  }

  public toggleHide(): void {
    this.hide = !this.hide;
  }

  public async submit() {
    if (this.form.invalid) {
      return;
    }

    const loading = await this.loadingController.create({message: 'Autenticando'});
    loading.present();

    this.dataService.authenticate(this.form.value)
      .subscribe(
        (res: UserModel) => {
          SecurityUtil.set(res);
          loading.dismiss();
          this.navController.navigateForward('/');
        },
        (err) => {
          console.log(err);
          loading.dismiss();
          this.showError('Usuário ou senha incorretos!');
        },
        () => {
          loading.dismiss();
        }
      );
  }

  async resetPassword() {
    if (this.form.controls.username.invalid) {
      this.showError('Usuário inválido');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Restaurando sua senha...' });
    loading.present();
  }

  public async showError(message) {
    const error = await this.toastController.create({ message, keyboardClose: true});
    error.present();
  }

}
