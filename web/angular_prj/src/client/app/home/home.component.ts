import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { WordListService, UserService } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    userName: string;
    stepsCount: number;
    userPoints: number;
    errorsCount: number;
    newName: string;
    words: any[];
    choices: any[];
    tryFlag: boolean;
    endTestFlag: boolean;
    startTestFlag: boolean;

    /**
     * Creates an instance of the HomeComponent with the injected WordListService and UserService.
     *
     * @param {UserService} userService - The injected userService.
     * @param {WordListService} wordListService - The injected wordListService.
     */
    constructor(public wordListService: WordListService, public userService: UserService) {
        this.userPoints = 0;
        this.errorsCount = 0;
        this.endTestFlag = false;
        this.startTestFlag = false;
        this.erorrsArray = [];
    }

    /**
     * Get the words OnInit
     */
    ngOnInit() {
        this.userService.resetUserData()
            .subscribe(response => {

            });
    }

    setUserName() {
        this.userName = this.newName;
        this.nextStep();
    }

    nextStep() {
        this.getWords();
    }

    /**
     * Handles select of choice
     */
    selectChoice(e) {
        if(!e.target.disabled) {
            if(e.target.value == this.words.rightChoice) {
                this.userPoints++;
                e.target.className = 'btn btn-success';
                e.target.disabled = 'disabled';
                this.tryFlag = false;

                this.nextStep();
            } else {
                this.errorsCount++;
                e.target.className = 'btn btn-danger';
                e.target.disabled = 'disabled';
                this.tryFlag = true;

                this.addErrorWord({'wordId': this.words.rightChoice, 'errorId': e.target.value});

                if(this.errorsCount >= 3) {
                    this.endTest();
                }
            }
        }

    }

    /**
     * End test
     */
    endTest() {
        this.words = [];
        this.startTestFlag = false;
        this.endTestFlag = true;
        this.sendUserStats({'username': this.userName, 'points': this.userPoints});
    }

    /**
     * Handle the wordListService observable
     */
    getWords() {
        this.wordListService.get()
            .subscribe(
                words => {
                    if(words.status) {
                        if(words.data == 'end') {
                            this.endTest();
                        } else {
                            this.words = words.data;
                            this.stepsCount = this.words.length;
                            this.choices = this.words.choices;
                            this.startTestFlag = true;
                        }
                    }

                }
            );
    }

    /**
     * Push new error
     */
    addErrorWord (error) {
        if (!error) {
            return;
        }
        this.wordListService.sendError(error )
            .subscribe(response => {

            });
    }

    /**
     * Push new error
     */
    sendUserStats (data) {
        if (!data) {
            return;
        }
        this.userService.sendUserStat(data)
            .subscribe(response => {

            });
    }


}
