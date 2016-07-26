"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../shared/index');
var HomeComponent = (function () {
    function HomeComponent(wordListService, userService) {
        this.wordListService = wordListService;
        this.userService = userService;
        this.userPoints = 0;
        this.errorsCount = 0;
        this.endTestFlag = false;
        this.startTestFlag = false;
        this.erorrsArray = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.userService.resetUserData()
            .subscribe(function (response) {
        });
    };
    HomeComponent.prototype.setUserName = function () {
        this.userName = this.newName;
        this.nextStep();
    };
    HomeComponent.prototype.nextStep = function () {
        this.getWords();
    };
    HomeComponent.prototype.selectChoice = function (e) {
        if (!e.target.disabled) {
            if (e.target.value == this.words.rightChoice) {
                this.userPoints++;
                e.target.className = 'btn btn-success';
                e.target.disabled = 'disabled';
                this.tryFlag = false;
                this.nextStep();
            }
            else {
                this.errorsCount++;
                e.target.className = 'btn btn-danger';
                e.target.disabled = 'disabled';
                this.tryFlag = true;
                this.addErrorWord({ 'wordId': this.words.rightChoice, 'errorId': e.target.value });
                if (this.errorsCount >= 3) {
                    this.endTest();
                }
            }
        }
    };
    HomeComponent.prototype.endTest = function () {
        this.words = [];
        this.startTestFlag = false;
        this.endTestFlag = true;
        this.sendUserStats({ 'username': this.userName, 'points': this.userPoints });
    };
    HomeComponent.prototype.getWords = function () {
        var _this = this;
        this.wordListService.get()
            .subscribe(function (words) {
            if (words.status) {
                if (words.data == 'end') {
                    _this.endTest();
                }
                else {
                    _this.words = words.data;
                    _this.stepsCount = _this.words.length;
                    _this.choices = _this.words.choices;
                    _this.startTestFlag = true;
                }
            }
        });
    };
    HomeComponent.prototype.addErrorWord = function (error) {
        if (!error) {
            return;
        }
        this.wordListService.sendError(error)
            .subscribe(function (response) {
        });
    };
    HomeComponent.prototype.sendUserStats = function (data) {
        if (!data) {
            return;
        }
        this.userService.sendUserStat(data)
            .subscribe(function (response) {
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'],
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [index_1.WordListService, index_1.UserService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFDbEQsc0JBQXlDLGdCQUFnQixDQUFDLENBQUE7QUFFMUQsc0JBQTZDLGlCQUFpQixDQUFDLENBQUE7QUFZL0Q7SUFrQkksdUJBQW1CLGVBQWdDLEVBQVMsV0FBd0I7UUFBakUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDaEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUtELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTthQUMzQixTQUFTLENBQUMsVUFBQSxRQUFRO1FBRW5CLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFLRCxvQ0FBWSxHQUFaLFVBQWEsQ0FBQztRQUNWLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMs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O0lBeElMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUscUJBQXFCO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSxDQUFDLGdDQUF3QixDQUFDO1NBQ3pDLENBQUM7O3FCQUFBO0lBcUlGLG9CQUFDO0FBQUQsQ0FwSUEsQUFvSUMsSUFBQTtBQXBJWSxxQkFBYSxnQkFvSXpCLENBQUEiLCJmaWxlIjoiYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBXb3JkTGlzdFNlcnZpY2UsIFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2luZGV4JztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIGxhenkgbG9hZGVkIEhvbWVDb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzZC1ob21lJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydob21lLmNvbXBvbmVudC5jc3MnXSxcbiAgICBkaXJlY3RpdmVzOiBbUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICB1c2VyTmFtZTogc3RyaW5nO1xuICAgIHN0ZXBzQ291bnQ6IG51bWJlcjtcbiAgICB1c2VyUG9pbnRzOiBudW1iZXI7XG4gICAgZXJyb3JzQ291bnQ6IG51bWJlcjtcbiAgICBuZXdOYW1lOiBzdHJpbmc7XG4gICAgd29yZHM6IGFueVtdO1xuICAgIGNob2ljZXM6IGFueVtdO1xuICAgIHRyeUZsYWc6IGJvb2xlYW47XG4gICAgZW5kVGVzdEZsYWc6IGJvb2xlYW47XG4gICAgc3RhcnRUZXN0RmxhZzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIEhvbWVDb21wb25lbnQgd2l0aCB0aGUgaW5qZWN0ZWQgV29yZExpc3RTZXJ2aWNlIGFuZCBVc2VyU2VydmljZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VXNlclNlcnZpY2V9IHVzZXJTZXJ2aWNlIC0gVGhlIGluamVjdGVkIHVzZXJTZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7V29yZExpc3RTZXJ2aWNlfSB3b3JkTGlzdFNlcnZpY2UgLSBUaGUgaW5qZWN0ZWQgd29yZExpc3RTZXJ2aWNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB3b3JkTGlzdFNlcnZpY2U6IFdvcmRMaXN0U2VydmljZSwgcHVibGljIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLnVzZXJQb2ludHMgPSAwO1xuICAgICAgICB0aGlzLmVycm9yc0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5lbmRUZXN0RmxhZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXJ0VGVzdEZsYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lcm9ycnNBcnJheSA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgd29yZHMgT25Jbml0XG4gICAgICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UucmVzZXRVc2VyRGF0YSgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0VXNlck5hbWUoKSB7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSB0aGlzLm5ld05hbWU7XG4gICAgICAgIHRoaXMubmV4dFN0ZXAoKTtcbiAgICB9XG5cbiAgICBuZXh0U3RlcCgpIHtcbiAgICAgICAgdGhpcy5nZXRXb3JkcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgc2VsZWN0IG9mIGNob2ljZVxuICAgICAqL1xuICAgIHNlbGVjdENob2ljZShlKSB7XG4gICAgICAgIGlmKCFlLnRhcmdldC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQudmFsdWUgPT0gdGhpcy53b3Jkcy5yaWdodENob2ljZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlclBvaW50cysrO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9ICdidG4gYnRuLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmRpc2FibGVkID0gJ2Rpc2FibGVkJztcbiAgICAgICAgICAgICAgICB0aGlzLnRyeUZsYWcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMubmV4dFN0ZXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcnNDb3VudCsrO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9ICdidG4gYnRuLWRhbmdlcic7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZGlzYWJsZWQgPSAnZGlzYWJsZWQnO1xuICAgICAgICAgICAgICAgIHRoaXMudHJ5RmxhZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yV29yZCh7J3dvcmRJZCc6IHRoaXMud29yZHMucmlnaHRDaG9pY2UsICdlcnJvcklkJzogZS50YXJnZXQudmFsdWV9KTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZXJyb3JzQ291bnQgPj0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFRlc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuZCB0ZXN0XG4gICAgICovXG4gICAgZW5kVGVzdCgpIHtcbiAgICAgICAgdGhpcy53b3JkcyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXJ0VGVzdEZsYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmRUZXN0RmxhZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VuZFVzZXJTdGF0cyh7J3VzZXJuYW1lJzogdGhpcy51c2VyTmFtZSwgJ3BvaW50cyc6IHRoaXMudXNlclBvaW50c30pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgd29yZExpc3RTZXJ2aWNlIG9ic2VydmFibGVcbiAgICAgKi9cbiAgICBnZXRXb3JkcygpIHtcbiAgICAgICAgdGhpcy53b3JkTGlzdFNlcnZpY2UuZ2V0KClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgd29yZHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZih3b3Jkcy5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdvcmRzLmRhdGEgPT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFRlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JkcyA9IHdvcmRzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwc0NvdW50ID0gdGhpcy53b3Jkcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9pY2VzID0gdGhpcy53b3Jkcy5jaG9pY2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUZXN0RmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVzaCBuZXcgZXJyb3JcbiAgICAgKi9cbiAgICBhZGRFcnJvcldvcmQgKGVycm9yKSB7XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndvcmRMaXN0U2VydmljZS5zZW5kRXJyb3IoZXJyb3IgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1c2ggbmV3IGVycm9yXG4gICAgICovXG4gICAgc2VuZFVzZXJTdGF0cyAoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnNlbmRVc2VyU3RhdChkYXRhKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG59XG4iXX0=
