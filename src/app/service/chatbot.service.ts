import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


const API_URL = `${environment.fastapi_url}`;

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http:HttpClient) { }

  agent_invoke(user_id:string, message:string){
    return this.http.get<string>(`${API_URL}/chatbot/invoke/${user_id}?user_query=${message}`);
  }

}
