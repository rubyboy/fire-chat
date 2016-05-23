import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
    selector: "my-app",
    styles: [`
        ul {
            transform: rotate(180deg);
        }
        ul > li {
            transform: rotate(-180deg);
        }
    `],
    template: `
        <div><label>You name:</label><input #usernameField type="text" [ngModel]="username" (ngModelChange)="saveUsername(usernameField.value)"></div>
        <hr/>
        <div>
            <input #inputText type="text" (keyup.enter)="addMessage(username,inputText.value);inputText.value=''">
            <button (click)="addMessage(username,inputText.value);inputText.value=''">Add Message</button>
        </div>
        <hr/>
        <ul>
            <li *ngFor="let message of messages | async">
                {{ message.username }}: {{ message.text }}
            </li>
        </ul>
    `,
})
export class AppComponent {
    username:string=(<any>localStorage).username;
    messages:FirebaseListObservable<any[]>;
    constructor(af: AngularFire) {
        this.messages = af.database.list('/messages');
    }
    addMessage(username:string,text:string) {
        this.messages.push({username,text});
    }
    saveUsername(username:string) {
        localStorage.setItem("username", username);
    }
}
