import { Component } from '@angular/core';

@Component({
  selector: 'app-last-few-transactions',
  templateUrl: './last-few-transactions.component.html',
  styleUrls: ['./last-few-transactions.component.scss']
})
export class LastFewTransactionsComponent {
  transactions = [
    {
      id: 1,
      title:'Transaction 1',
      amount: 100,
      price: 10,
      status: 'delivered',
      location: 'Arizona',
      image: 'https://via.placeholder.com/150'
    },{
      id: 2,
      title:'Transaction 2',
      amount: 200,
      price: 20,
      status: 'pending',
      location: 'Texas',
      image: 'https://via.placeholder.com/150'
    },{
      id: 3,
      title:'Transaction 3',
      amount: 300,
      price: 30,
      status: 'shipped',
      location: 'Nevada',
      image: 'https://via.placeholder.com/150'
    },{
      id: 4,
      title:'Transaction 4',
      amount: 400,
      price: 40,
      status: 'delivered',
      location: 'New Mexico',
      image: 'https://via.placeholder.com/150'
    }
  ]
}
