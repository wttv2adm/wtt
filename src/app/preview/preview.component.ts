import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users/users.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() userID: number;
  name: string;
  project: string;
  emailTo: string;
  date = new FormControl(new Date());
  template: string;
  workItems: string = '';
  meetings: string = '';
  workItemsDB: any;
  meetingsDB: any;
  myContent: any;

  meetingRowTemplate: string = "<tr>"
    + "<td style='text-align:center; border: 1px solid #ddd;'></td>"
    + "<td style='text-align:center; border: 1px solid #ddd;'>{MeetingName}</td>"
    + "<td style='text-align:center; border: 1px solid #ddd;'>{HoursSpent}</td>"
    + "</tr>";

  workItemsRowTemplate: string = "<tr>"
    + "<td style='text-align:center; border: 1px solid #ddd; padding:5px'>{US}</td>"
    + "<td style='text-align:center; border: 1px solid #ddd; padding:5px'>{ETA}</td>"
    + "<td style='text-align:center; border: 1px solid #ddd; padding:5px'>{Task}</td>"
    + "<td style='text-align:center; border: 1px solid #ddd; padding:5px'>{Comments}</td>"
    + "<td style='text-align:center; border: 1px solid #ddd; padding:5px'>{HoursSpent}</td>"
    + "<td style='text-align:center; border: 1px solid #ddd; padding:5px'>{Progress}</td>"
    + "<td style='text-align:center; border: 1px solid #ddd;'>{Status}</td>"
    + "</tr>";

  totalMeetingRowTemplate: string = "<tr>"
    + "<td style='text-align:right; border: 1px solid #ddd;padding-right:5px' colspan='2'>Total Meeting Hours</td>"
    + "<td style='text-align:center; border: 1px solid #ddd;'>{TotalHoursSpent}</td>"
    + "</tr>";

  totalWorkItemRowTemplate: string = "<tr>"
    + "<td style='text-align:right; border: 1px solid #ddd; padding-right:5px' colspan='4'>Total Hours</td>"
    + "<td style='text-align:center; border: 1px solid #ddd;'>{TotalHoursSpent}</td>"
    + "</tr>";

  constructor(private usersService: UsersService) {
  }

  ngOnChanges() {    
    var totalMeetingsHours = 0;
    var totalItemsHours = 0;

    if (this.userID) {
      this.usersService.getInfo(this.userID).subscribe(doc => {
        var json = doc.data();
        this.name = json.name;
        this.project = json.project;
        this.emailTo = json.emailTo;
        this.template = json.template;
      });

      var US = '';
      var task = '';
      var progress = '';
      var status = '';
      var ETA = '';
      var comments = '';
      this.usersService.getTasks(this.userID).subscribe(data => {
        this.workItemsDB = data.map(e => {
          return {
            data: e.payload.doc.data()
          };
        })
        this.meetings = "";
        this.workItems = "";
        totalMeetingsHours = 0;
        totalItemsHours = 0;
        this.workItemsDB.forEach(element => {

          if (element.data.description.indexOf('meeting') >= 0) {
            this.meetings += this.meetingRowTemplate
              .replace("{MeetingName}", element.data.description)
              .replace("{HoursSpent}", element.data.duration);
            totalMeetingsHours += Number(element.data.duration);
            return;
          }

          progress = "100%";
          status = "Done";
          ETA = this.date.value.toLocaleDateString();
          US = '';
          if (element.data.description.indexOf('@') == 0) {
            comments = element.data.description.substring(element.data.description.indexOf(' '));
            US = element.data.description.substring(0, element.data.description.indexOf(' '));
          } else {
            comments = element.data.description;
          }

          totalItemsHours += Number(element.data.duration);
          this.workItems += this.workItemsRowTemplate
            .replace("{US}", US)
            .replace("{ETA}", ETA)
            .replace("{Task}", task)
            .replace("{Comments}", comments)
            .replace("{HoursSpent}", element.data.duration)
            .replace("{Progress}", progress)
            .replace("{Status}", status);
        });

        this.meetings += this.totalMeetingRowTemplate.replace("{TotalHoursSpent}", totalMeetingsHours.toString());
        this.workItems += this.totalWorkItemRowTemplate.replace("{TotalHoursSpent}", totalItemsHours.toString());
      });
    }
  }

  ngOnInit() {
  }

  test(){
    console.log(this.myContent);
  }
}
