import { Component }  from '@angular/core';
import { Router }     from '@angular/router';

import { AuthService } from 'ng2-ui-auth';

@Component({
  moduleId: module.id,
  selector: 'introduction',
  templateUrl: 'introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  log() {
    this.auth.removeToken();
    this.router.navigate(['/dashboard/bottles']);
  }

  loginWithFacebook() {
    this.auth.authenticate('facebook')
        .subscribe({
          error: (err: any) => console.log(err),
          complete: () => this.router.navigateByUrl('/dashboard/bottles')
        });
  }

  logGodMode() {
    this.router.navigate(['/dashboard/bottles/admin']);
  }
}
