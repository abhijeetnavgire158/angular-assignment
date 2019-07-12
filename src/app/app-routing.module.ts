import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';

import { AuthGuard } from './shared/auth.guard';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'users', canActivate: [AuthGuard], component: UserComponent },
    { path: 'users/edit-profile', canActivate: [AuthGuard], component: EditProfileComponent },
];


@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule { }