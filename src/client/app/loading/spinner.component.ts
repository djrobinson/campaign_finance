'use strict';

import {Component, Input, OnDestroy} from 'angular2/core';

@Component({
    selector: 'spinner',
    template: `
        <div [hidden]="!isDelayedRunning" class="spinner">
            <div class="sk-chasing-dots">
                <div class="sk-child sk-dot1"></div>
                <div class="sk-child sk-dot2"></div>
            </div>
        </div>
    `
    styles: [`
        .spinner {
          width: 100px;
          height: 100px;

          position: relative;
          margin: 100px auto;
        }

        .sk-chasing-dots {
          margin: 0px auto;
          width: 100px;
          height: 100px;
          position: relative;
          text-align: center;
          -webkit-animation: sk-chasingDotsRotate 2s infinite linear;
                  animation: sk-chasingDotsRotate 2s infinite linear; }
          .sk-chasing-dots .sk-child {
            width: 60%;
            height: 60%;
            display: inline-block;
            position: absolute;
            top: 0;
            background-color: #333;
            border-radius: 100%;
            -webkit-animation: sk-chasingDotsBounce 2s infinite ease-in-out;
                    animation: sk-chasingDotsBounce 2s infinite ease-in-out; }
          .sk-chasing-dots .sk-dot2 {
            top: auto;
            bottom: 0;
            -webkit-animation-delay: -1s;
                    animation-delay: -1s; }

        @-webkit-keyframes sk-chasingDotsRotate {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg); } }

        @keyframes sk-chasingDotsRotate {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg); } }

        @-webkit-keyframes sk-chasingDotsBounce {
          0%, 100% {
            -webkit-transform: scale(0);
                    transform: scale(0); }
          50% {
            -webkit-transform: scale(1);
                    transform: scale(1); } }

        @keyframes sk-chasingDotsBounce {
          0%, 100% {
            -webkit-transform: scale(0);
                    transform: scale(0); }
          50% {
            -webkit-transform: scale(1);
                    transform: scale(1); } }
    `]
})
export class SpinnerComponent implements OnDestroy {
    private currentTimeout: number;
    private isDelayedRunning: boolean = false;

    @Input()
    public delay: number = 300;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            return this.isDelayedRunning = false;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}