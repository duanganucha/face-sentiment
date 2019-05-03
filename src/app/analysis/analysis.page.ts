import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { interval } from 'rxjs';
import { DataService } from '../data.service';

import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { async } from 'q';







@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.page.html',
    styleUrls: ['./analysis.page.scss'],

})
export class AnalysisPage {

    image = "/assets/icon/camera.png";
    imagePath = "";
    gaugeType = 'semi';
    gaugeThick = 5;
    gaugevalue = 0;
    gaugeAppendText = " % ";
    gaugethresholds = {
        '0': { color: 'red' },
        '25': { color: 'orangeRed' },
        '50': { color: 'orange' },
        '75': { color: 'green' }
    };

    gaugemax = 100;
    size = 100;

    isUploading = false;
    progressValue = 0;

    captureDataUrl: string;


    motions = [
        { name: 'anger', value: 0 },
        { name: 'contempt', value: 0 },
        { name: 'contempt', value: 0 },
        { name: 'disgust', value: 0 },
        { name: 'fear', value: 0 },
        { name: 'happiness', value: 0 },
        { name: 'neutral', value: 0 },
        { name: 'sadness', value: 0 },
        { name: 'surprise', value: 0 }
    ]

    imageUrl: string = "";
    personFace: number;

    constructor(private camera: Camera, private dataService: DataService, private alertCtrl: AlertController) {
        if (this.imageUrl != "") {
            this.image = this.imageUrl;
        } else {
            this.image = this.image
        }
    }

    /** upload form url */
    onChangeUrl(imageUrl: string) {
        this.image = imageUrl
    }


    onCamera() {
        const options: CameraOptions = {

            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,

        }
        this.camera.getPicture(options)
            .then((imageData) => {

                console.log(imageData)
                this.image = 'data:image/jpeg;base64,' + imageData;
                this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;

                this.isUploading = false
                // this.image = imageData

            }, (_error) => {
                alert('Error ' + (_error.message || _error));
            })
    }

    onUploadPhoto() {

        if (this.captureDataUrl == undefined) return

        this.isUploading = true

        console.log('on uploading....')
        let storageRef = firebase.storage().ref();
        // Create a timestamp as filename

        const filename = Math.floor(Date.now() / 1000);

        var uploadTask = storageRef.child(`images/${filename}.jpg`).putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL);

        uploadTask.on('state_changed',
            
            snapshot => {

                this.progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + this.progressValue + '% done');

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, (error) => {
                // Handle unsuccessful uploads
            }, async () => {

                const urlDownload = await uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    return downloadURL
                });

                this.isUploading = false
                console.log('File available at', urlDownload);
                this.getPersonApi(urlDownload)
            });


    }

    isAnalysis = false
    getPersonApi(imageUrl) {

        this.isAnalysis = true
        console.log('getPersonApi = ' + imageUrl)
        this.dataService.getPersonAzure(imageUrl)
            .subscribe(data => {
                this.personFace = data[0].faceAttributes.emotion
                console.log(this.personFace)
                this.onAnalysisPreview();
            })
    }

    public details = [];
    onAnalysisPreview() {

         this.details = [];
        // for (let index = 0; index < this.motions.length; index++) {
        //     this.gaugevalue = Math.floor((Math.random() * 100) + 1);
        //     this.motions[index].value = this.gaugevalue;
        // // }
        Object.keys(this.personFace).forEach(key => {

            this.details.push({ "name": key, "value": this.personFace[key] })
            this.motions = this.details
            this.isAnalysis = false
        });
        
    }


    onProgress() {
        let subscription = interval(100)
            .subscribe(i => {
                if (this.progressValue < 100) {
                    this.isUploading = true
                    this.progressValue++
                } else {
                    subscription.unsubscribe()
                    this.isUploading = false
                }
            })
    }




    



    showSuccesfulUploadAlert() {
        let alert = this.alertCtrl.create(<AlertOptions>{
            subTitle: '10% of battery remaining',
            title: 'Title',
            buttons: ['Dismiss']
        });
    }

}


