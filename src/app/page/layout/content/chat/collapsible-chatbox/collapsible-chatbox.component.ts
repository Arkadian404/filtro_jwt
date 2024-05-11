import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-collapsible-chatbox',
  templateUrl: './collapsible-chatbox.component.html',
  styleUrls: ['./collapsible-chatbox.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('rotated', style({ transform: 'rotate(0deg)' })),
      state('default', style({ transform: 'rotate(-360deg)' })),
      transition('default => rotated', animate('500ms ease-out')),
      transition('rotated => default', animate('500ms ease-out')),
    ]),
    trigger('fadeAnimation', [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 1})
        )
      ]),
      transition(":leave", [
        style({ opacity: 1}),
        animate(
          "150ms ease-in-out",
          style({ opacity: 0,})
        )
      ])
    ]),
  ]
})
export class CollapsibleChatboxComponent {
  private readonly botIconPath = "assets/images/bot.png";
  private readonly chatIconPath = 'assets/images/chat.png';

  public isOpen = false;
  public iconSrc = this.botIconPath;
  public iconState = 'default';

  public onChangeChatState(): void {
    this.isOpen = !this.isOpen;
    this.iconState = (this.iconState === 'default' ? 'rotated' : 'default');

    if (this.isOpen) this.iconSrc = this.chatIconPath;
    else this.iconSrc = this.botIconPath;
  }
}
