import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ChatbotService} from "../../../../../service/chatbot.service";
import {UserService} from "../../../../../service/user/user.service";
import {TokenService} from "../../../../../service/token.service";
import {switchMap} from "rxjs";
import {randomUUID} from "crypto";

class Message {
  text?: string;
  type: MessageType;
}

enum MessageType {
  Bot = 'bot',
  User = 'user',
  Loading = 'loading'
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer: ElementRef;
  @Input() public display: string;

  public form: FormGroup;
  public messages: Array<Message> = [];
  public canSendMessage = true;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private tokenService: TokenService,
              private chatbotService: ChatbotService){}

  ngOnInit(): void {
    this.getUser();
    this.form = this.formBuilder.group({
      message: ['']
    });
    this.getBotMessage();
  }

  getUser(){
    return this.userService.currentUser();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public onClickSendMessageLogin(): void {
    const message = this.form.get('message').value;

    if (message && this.canSendMessage) {
      this.getUser().pipe(
        switchMap(user => {
          const result = this.invokeChatbot(user.id.toString(), this.form.value);
          this.form.disable();
          return result;
        })
      ).subscribe(data=>{
        const userMessage: Message = {text: message, type: MessageType.User};
        this.messages.push(userMessage);
        this.form.get('message').setValue('');
        this.form.updateValueAndValidity();
        this.getBotMessage(data);
      })
    }
  }

  public sendMessageNoLogin(uid: string){
    const message = this.form.get('message').value;
    if(message && this.canSendMessage){
      this.invokeChatbot(uid, this.form.value).subscribe(data=> {
        const userMessage: Message = {text: message, type: MessageType.User};
        this.messages.push(userMessage);
        this.form.get('message').setValue('');
        this.form.updateValueAndValidity();
        this.getBotMessage(data);
      });
    }
  }

  public onClickSendMessage(){
    const username = this.tokenService.getUsername();
    if(!username){
      const uuid = randomUUID();
      localStorage.setItem("chatId", uuid);
      if(localStorage.getItem("chatId"))
        this.sendMessageNoLogin(uuid);
    }else{
      this.onClickSendMessageLogin()
    }
  }

  private getBotMessage(responseMessage ?:string): void {
    this.canSendMessage = false;
    const waitMessage: Message = {type: MessageType.Loading};
    this.messages.push(waitMessage);

    setTimeout(() => {
      this.messages.pop();
      const botMessage: Message = {text: responseMessage !=null ? responseMessage : 'Xin chào bạn!!!' , type: MessageType.Bot};
      this.messages.push(botMessage);
      this.canSendMessage = true;
      this.form.enable();
    }, 1000);
  }

  public onClickEnter(event: Event): void {
    event.preventDefault();
    this.onClickSendMessage();
  }

  private scrollToBottom(): void {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  public invokeChatbot(user_id:string, message:string){
    return this.chatbotService.agent_invoke(user_id, message);

  }

}
