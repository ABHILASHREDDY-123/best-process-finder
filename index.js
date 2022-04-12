
for(var i=0;i<5;i++){
    document.getElementsByClassName("output")[i].style.display = "none";
}

document.getElementsByClassName("show_btn")[0].style.display = "none";

function solve(event) {
    var objx=[];

    for(var i=0;i<5;i++){
        document.getElementsByClassName("output")[i].style.display = "block";
    }
    // document.getElementById("ans").style.display = "block";

    var a = document.getElementById('at').value.trim();
    var b = document.getElementById('bt').value.trim();

    if(a=="" || b==""){
        alert("Enter a valid input..");
        location.reload();
    }
    var atime = a.split(' ');
    var btime = b.split(' ');

    if (atime.length != btime.length || atime.length==0 || btime.length ==0) {
        alert("Input is wrong..");
        location.reload();
    }

    var obj = [];
    var n = atime.length;
    
    for(var i=0;i<n;i++){
        obj.push({at: parseInt (atime[i]), bt: parseInt (btime[i]), pid:i });
        obj[i].bt1 = obj[i].bt;
    }
//    console.log(obj);
    
    (function fcfs() {

        obj.sort(function comp(a, b){
            if(a.at <  b.at) return -1;
            return 1;
        });
        
        var wt =[];
        var tat = [];
        var ct = [];
        var avg_wt_time = 0;
        var avg_tat_time = 0;
        var time = 0;

        for(var i=0;i<n;i++){
            if(time<=obj[i].at){
                wt[i] = 0;
                time = obj[i].at + obj[i].bt;
                ct[i] = time;
            }
            else{
                wt[i] = time - obj[i].at;
                time += obj[i].bt;
                ct[i] = time;
            }
            tat[i] = ct[i] - obj[i].at;
        }

        for(var i=0;i<n;i++){
            avg_wt_time += wt[i];
            avg_tat_time += tat[i];
        }

        avg_tat_time /= n;
        avg_wt_time /= n;
          objx.push({method:"fcfs",time:avg_wt_time});
        document.getElementById("fcfs_out").innerHTML = "Average Waiting time according to First Come First Serve: " + avg_wt_time; 

    })();


    (function sjf() {
        function comp(a,b){
            if(a.at<b.at){return -1;}
            return 1;
        }
        function comp1(a,b){
            if(a.bt < b.bt){return -1;}
            return 1;
        }
        var curtime=0;
        obj.sort(comp);
        var vis = [];
        for(var i=0;i<n;i++){
            vis.push(0);
        }
        var wt= [];
        var tat = [];
        var ct = [];

        for(var i=0;i<n;i++){
            wt.push(0);
            tat.push(0);
            ct.push(0);
        }

        curtime = obj[0].at;

        for(var i=0;i<n;i++){
            var temp = [];
            for(var j=0;j<n;j++){
                if(vis[j]==0){
                    if(curtime>=obj[j].at){
                       temp.push(obj[j]);
                    }
                }
            }
            var mini=100000;
            var idx=-1;
            var fx=100000;
            var id;
            if(temp.length==0){
                for(var j=0;j<n;j++){
                    if(vis[j]==0){
                        if(mini>obj[j].at){mini = obj[j].at;idx=obj[j].pid;}
                        else if(mini==obj[i].at){
                            if(fx>obj[i].bt){idx = obj[i].pid;}
                        }
                    }
                }
                id = idx;
                curtime = obj[idx].at + obj[idx].bt;
            }
           if(temp.length>0){temp.sort(comp1);
             id = temp[0].pid ;
            curtime+=obj[id].bt;
            }

            vis[id]=1;
            ct[id]=curtime;
            tat[id] = ct[id]-obj[id].at;
            wt[id] = tat[id]-obj[id].bt;
            
        }
        var avg_tat_time=0;
        var avg_wt_time=0;
        for(var i=0;i<n;i++){
            avg_tat_time+=tat[i];
            avg_wt_time+=wt[i];
        }
      avg_tat_time /=n;
      avg_wt_time /=n;
      objx.push({method:"sfj_out",time:avg_wt_time});
       document.getElementById("sjf_out").innerHTML = "Average Waiting time according to Shortest Job First: " + avg_wt_time;
    })();
  

    (function ljf() {
        function comp(a,b){
            if(a.at<b.at){return -1;}
            return 1;
        }
        function comp1(a,b){
            if(a.bt  > b.bt){return -1;}
            return 1;
        }
        var curtime=0;
        obj.sort(comp);
        var vis = [];
        for(var i=0;i<n;i++){
            vis.push(0);
        }
        var wt= [];
        var tat = [];
        var ct = [];

        for(var i=0;i<n;i++){
            wt.push(0);
            tat.push(0);
            ct.push(0);
        }

        curtime = obj[0].at;

        for(var i=0;i<n;i++){
            var temp = [];
            for(var j=0;j<n;j++){
                if(vis[j]==0){
                    if(curtime>=obj[j].at){
                       temp.push(obj[j]);
                    }
                }
            }
            var mini=100000;
            var idx=-1;
            var fx=0;
            var id;
            if(temp.length==0){
                for(var j=0;j<n;j++){
                    if(vis[j]==0){
                        if(mini>obj[j].at){mini = obj[j].at;idx=obj[j].pid;}
                        else if(mini==obj[i].at){
                            if(fx<obj[i].bt){idx = obj[i].pid;}
                        }
                    }
                }
                id = idx;
                curtime = obj[idx].at + obj[idx].bt;
            }
           if(temp.length>0){temp.sort(comp1);
             id = temp[0].pid ;
            curtime+=obj[id].bt;
            }

            vis[id]=1;
            ct[id]=curtime;
            tat[id] = ct[id]-obj[id].at;
            wt[id] = tat[id]-obj[id].bt;
            
        }
        var avg_tat_time=0;
        var avg_wt_time=0;
        for(var i=0;i<n;i++){
            avg_tat_time+=tat[i];
            avg_wt_time+=wt[i];
        }
      avg_tat_time /=n;
      avg_wt_time /=n;
     objx.push({method:"ljf_out",time:avg_wt_time});
       document.getElementById("ljf_out").innerHTML = "Average Waiting time according to Longest Job First: " + avg_wt_time;
    })();
    
    (function rr() {
         var tq=2;
         var p=0;
         var time=0;
         function comp(a,b){
             if(a.at < b.at){return -1;}
             return 1;
         }
         obj.sort(comp);
        // console.log(obj);
         var ct = [];
         var tat = [];
         var wt = [];
         
         var obj1 = [];
         var vis =[];
         time = obj[0].at;
        

         for(var i=0;i<n;i++){
            vis[i]=0;
            tat[i]=0;
            wt[i]=0;
        }
         
         var m=0;
         while(p<n){
             
            // var mini=100000;
             
             for(var i=0;i<n;i++){
                 if(vis[i]==0 && obj[i].at<=time){
                     obj1.push(obj[i]);m++;
                     vis[i]=1;
                     
                 }
             }
             if(obj1.length==0){
                 var kx=100000;
                 for(var i=0;i<n;i++){
                     if(vis[i]==0){
                      if(kx>obj[i].at){kx = obj[i].at;}
                     }
                 }
                 time = kx;
                 continue;


             }
             var id = obj1[0].pid;
             if(tq>=obj1[0].bt1){
                
                
                 time+=obj1[0].bt1;
                 obj[id].bt1=0;
                // console.log(time);
               p++;
               ct[id]=time;
               obj[id].ct = time;
                 
             }
             else{
           time+=tq;
           obj[id].bt1 -=tq;
           var x = obj[id];
           obj1.push(x);
           m++;


             }
         obj1.shift();              
        m--;
        // console.log(obj1);

         }
         var avg_tat_time=0;
         var avg_wt_time=0;
           for(var i=0;i<n;i++){
               tat[obj[i].pid] = ct[obj[i].pid] - obj[i].at;
               wt[obj[i].pid] = tat[obj[i].pid] - obj[i].bt;
               obj[i].wt = wt[obj[i].pid];
               obj[i].tat = tat[obj[i].pid];
               avg_tat_time+=(tat[obj[i].pid]);
               avg_wt_time+=(wt[obj[i].pid]);

           }
         avg_tat_time /=n;
         avg_wt_time /=n;

         // console.log(avg_tat_time, avg_wt_time);
        objx.push({method:"rr_out",time:avg_wt_time});
        document.getElementById("rr_out").innerHTML = "Average Waiting time according to Round Robbin: " + avg_wt_time;
    })();

     console.log(objx);
     var kx = objx.length;
     var methodx="";
      var mx_time = 1000000;
     for(var i=0;i<kx;i++){
        if(mx_time>objx[i].time){
            mx_time = objx[i].time;
            methodx = objx[i].method;
        }
     }
     var Mx="";
     console.log(methodx);
     if(methodx=="fcfs"){
            Mx = "First Come First Serve";
     }
     else if(methodx=="sjf_out"){
         Mx = "Shortest Job First";
     }
     else if(methodx=="ljf_out"){
         Mx = "Longest Job First";
     }
     else if(methodx=="rr_out"){
         Mx = "Round Robin";
     }
     document.getElementById("ans").innerHTML="  " + Mx + " is optimal algorithm for given data set.....";

     for(var i=1;i<5;i++){
        document.getElementsByClassName("output")[i].style.display = "none";
    }
    document.getElementsByClassName("show_btn")[0].style.display = "block";
}


function show(){
    for(var i=1;i<5;i++){
        document.getElementsByClassName("output")[i].style.display = "block";
    }
    document.getElementsByClassName("show_btn")[0].style.display = "none";
}