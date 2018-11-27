import { Component, OnInit, DoCheck } from '@angular/core';
import { PackageService } from '../services/package.service';
import { element } from 'protractor';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

@Component({
  selector: 'app-packages-menu',
  templateUrl: './packages-menu.component.html',
  styleUrls: ['./packages-menu.component.css']
})
export class PackagesMenuComponent implements OnInit {

  
  CounterId : any;

  public PackagesList : any[] = [];;

  public Times : Array<any> = [];

  constructor(private ps : PackageService) { }

  ngOnInit() {
    var aDay = 24*60*60*1000

    console.log(new Date());
    console.log(this.timeSince(new Date(Date.now()-aDay)));

    this.ps.GetPackages().subscribe(response =>
      {
        let content = response as any;

        this.PackagesList = content.Data;
        this.PackagesList.forEach(element =>{
        let ago = this.timeAgo(new Date(element.CreationTime));
        console.log(ago);
        this.Times.push(ago);
        });


        this.CounterId = setInterval(() =>
        {
          this.Times.forEach( (CurrentTime , index)=> {
            let newVal = this.timeAgo(new Date(this.PackagesList[index].CreationTime));

            this.Times[index] = newVal;

          })
        } , 1000)

      });


  }

  ngOnDestroy() {
    if (this.CounterId) {
      clearInterval(this.CounterId);
    }
  }

  public timeSince(date : Date) {

    var seconds = Math.floor(((new Date() as any) - (date as any)) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  
  
  
  public getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();
  
    if (minutes < 10) {
      // Adding leading zero to minutes
      minutes = `0${ minutes }`;
    }
  
    if (prefomattedDate) {
      // Today at 10:20
      // Yesterday at 10:20
      return `${ prefomattedDate } at ${ hours }:${ minutes }`;
    }
  
    if (hideYear) {
      // 10. January at 10:20
      return `${ day }. ${ month } at ${ hours }:${ minutes }`;
    }
  
    // 10. January 2017. at 10:20
    return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
  }
  
  
  // --- Main function
  public timeAgo(dateParam) {
    if (!dateParam) {
      return null;
    }
  
    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date((today as any) - DAY_IN_MS);
    const seconds = Math.round(((today as any) - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();
  
  
    if (seconds < 5) {
      return 'now';
    } else if (seconds < 60) {
      return `${ seconds } seconds ago`;
    } else if (seconds < 90) {
      return 'about a minute ago';
    } else if (minutes < 60) {
      return `${ minutes } minutes ago`;
    } else if (isToday) {
      return this.getFormattedDate(date, 'Today' as any); // Today at 10:20
    } else if (isYesterday) {
      return this.getFormattedDate(date, 'Yesterday' as any); // Yesterday at 10:20
    } else if (isThisYear) {
      return this.getFormattedDate(date, false, true); // 10. January at 10:20
    }
  
    return this.getFormattedDate(date); // 10. January 2017. at 10:20
  }

}
