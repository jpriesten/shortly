import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ShortCodeService } from 'src/app/services/short-code.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  public loadingData = false;

  public formSubmitted = false;
  public shortUrlCopied = false;
  public currentUrlIndex = 0;
  public urlData: any = [];
  public shortlyFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private shortCodeService: ShortCodeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.urlData = this.shortenedUrls;
    console.log('Form control: ', this.shortlyFormGroup);
  }

  initForm() {
    this.shortlyFormGroup = this.fb.group({
      url: ['', Validators.required],
    });
  }

  get shortenedUrls() {
    let urls = localStorage.getItem('urls');
    return urls !== null ? JSON.parse(urls) : [];
  }

  formSubmit() {
    this.formSubmitted = true;
    console.log('Form control: ', this.shortlyFormGroup);
    this.shortenUrl(this.shortlyFormGroup.value.url);
  }

  async shortenUrl(url: string) {
    try {
      this.loadingData = true;
      this.urlData = this.shortenedUrls;
      let shortened: any = await this.shortCodeService.shortenUrl(url);
      this.urlData.push(shortened);
      localStorage.setItem('urls', JSON.stringify(this.urlData));
      this.showSuccess('Link shortened!');
      console.log('Shortened url: ', shortened);
      this.loadingData = false;
    } catch (error: any) {
      this.loadingData = false;
      this.showError(error.error ?? error);
      console.error('Failed shortening url: ', error);
    }
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: any) {
    this.toastr.error(message);
  }

  copyShotCode(shortUrl: string, index: number) {
    var textArea = document.createElement('textarea');
    textArea.value = shortUrl;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    textArea.blur();
    document.execCommand('copy');
    textArea.remove();
    this.shortUrlCopied = true;
    this.currentUrlIndex = index;
  }
}
