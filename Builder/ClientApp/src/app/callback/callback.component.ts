import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent {

  code: string;
  clientId: string;
  constructor(private route: ActivatedRoute, http: HttpClient) {

    this.route.queryParams.subscribe(params => {

      this.clientId = environment.clientId;
      this.code = params['code'];


      var tokenUrl = "https://www.bungie.net/Platform/App/OAuth/Token/";

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };

      var body = "client_id=" + this.clientId + "&grant_type=authorization_code&code=" + this.code;
      http.post(tokenUrl, body, httpOptions).subscribe(response => {
        console.log(response);
      })

    });
  }
}
