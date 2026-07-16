import { Component } from '@angular/core';
import { LogoDark } from '../../shared/components/logo-dark/logo-dark';


@Component({
  selector: 'app-header',
  imports: [LogoDark],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
