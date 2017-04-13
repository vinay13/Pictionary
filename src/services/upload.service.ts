import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Configuration } from './app.constant';



@Injectable()
export class UploadImageService {

    public headers;
    public options;
    constructor(private http : Http){
        
    }

public UploadImage(body){
    this.headers = new Headers({
		  'Content-Type' : 'multipart/form-data',
		//  'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
    });
        this.options = new RequestOptions({
            headers : this.headers
        })
		return this.http.post('https://yugma-testing.appspot.com/upload-file',body,this.options)
			  .map(this.extractData)
              .catch(this.handleError);
	}


    private extractData(res: Response) {
    	if (res.status === 204) { return res; }
    	let body = res.json();
     	return body || { };
  	}

    private handleError(error: Response | any) {
    	let errMsg: string;
    	if (error instanceof Response) {
      	const body = error.json() || '';
      	const err = body.error || JSON.stringify(body);
      	errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      	if (error.status === 0) {
        	errMsg = `${error.status} - "Something is wrong.."`;
      	}
    	} else {
    	  errMsg = error.message ? error.message : error.toString();
    	}
    	return Observable.throw(errMsg);
  	}


}