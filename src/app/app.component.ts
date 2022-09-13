import { Component } from '@angular/core';
import { TURN_LEGEND } from './commons/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly _USER_SYMBOL = 'X';
  private readonly _AI_SYMBOL = 'O';
  public isUserTurn = true;
  public positions = ['', '', '', '', '', '', '', '', ''];
  private _usrSelect: Array<number> = [];
  private _AISelect: Array<number> = [];

  public get legendTurn(): string {
    return `${TURN_LEGEND} ${this.isUserTurn ? 'User' : 'Computer'}`;
  }

  public selected(index: number): void {
    const position = index + 1;
    if (this._isNumberSelected(position)) return;
    if (this.isUserTurn) {
      this.positions[index] = this._USER_SYMBOL;
      this._usrSelect.push(position);
      this._varifyWinner();
    } else {
      this.positions[index] = this._AI_SYMBOL;
      this._AISelect.push(position);
      this._varifyWinner();
    }

    this.isUserTurn = !this.isUserTurn;
    if (!this.isUserTurn) this._AITurn();
  }

  public start(): void {
    console.log('start');
  }

  public reset(): void {
    console.log('reset');
  }

  private _isNumberSelected(value: number): boolean {
    return this._usrSelect.includes(value) || this._AISelect.includes(value);
  }

  private _AITurn(): void {
    const availablePositions = this.positions.flatMap((position, index) => {
      if (position === '') return index;
      else return [];
    });
    const randomPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    setTimeout(() => {
      this.selected(randomPosition);
    }, 1000);
  }

  private _varifyWinner(): void {}
}
