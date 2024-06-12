import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Register } from 'src/app/services/user/models/Register';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    hide: boolean = true;
    hideRepass: boolean = true;
    emailRegex = RegExp(/^\S+@\S+\.\S+$/);

    registerForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        email: new FormControl("", [Validators.email, Validators.required]),
        firstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        lastName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
        repassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    });

    constructor (private service: UserService, private router: Router, private _snackBar: MatSnackBar) { }

    register() {
        const username = this.registerForm.get('username');
        const email = this.registerForm.get('email');
        const firstName = this.registerForm.get('firstName');
        const lastName = this.registerForm.get('lastName');
        const password = this.registerForm.get('password');
        const repassword = this.registerForm.get('repassword');

        if (this.registerForm.invalid) {
            this.openSnackBar("Липващи или невалидни данни!", "Затвори");
            return;
        }

        if (password?.value !== repassword?.value) {
            this.openSnackBar("Паролите не съвпадат!", "Затвори");
            return;
        }

        const register: Register = new Register({
            username: username!.value!.trim(),
            email: email!.value!.trim(),
            firstName: firstName!.value!.trim(),
            lastName: lastName!.value!.trim(),
            password: password!.value!.trim()
        });

        this.service.register(register).subscribe({
            next: (res) => {
                this.openSnackBar("Успешна регистрация!", "Затвори");
                this.router.navigate(["/"]);
            },
            error: (err) => {
                this.openSnackBar("Cъществува потребител с този имейл или потребителско име!", "Затвори");
            }
        });
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000,
        });
    }
}
