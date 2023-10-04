import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdownHover]'
})
export class DropdownHoverDirective {
  private dropdownMenu: HTMLElement | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.dropdownMenu = null;
  }

  @HostListener('mouseenter') onMouseEnter() {
    // Lấy thẻ dropdown-menu dựa trên class hoặc cấu trúc DOM của bạn
    this.dropdownMenu = this.el.nativeElement.querySelector('.dropdown-menu');
    if (this.dropdownMenu) {
      // Hiển thị dropdown-menu
      this.renderer.addClass(this.dropdownMenu, 'show');
      this.renderer.addClass(this.dropdownMenu, 'd-flex');
      // this.renderer.addClass(this.dropdownMenu, 'align-items-stretch')
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.dropdownMenu) {
      // Ẩn dropdown-menu
      this.renderer.removeClass(this.dropdownMenu, 'show');
      this.renderer.removeClass(this.dropdownMenu, 'd-flex');
      // this.renderer.addClass(this.dropdownMenu, 'align-items-stretch');
    }
  }

}
