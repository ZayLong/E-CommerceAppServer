module.exports = function(db2){
var cronJob = require('cron').CronJob;
console.log("STARTING CRONJOB");
var job = new cronJob('0 */15 * * * *', function() {
  /* runs once at the specified date. */
  var theDate = formatDate(new Date());
  theDate = theDate.replace(/-/g,"");
  theDate = parseInt(theDate);
  //here we should grab all the records that are equal or lower than theInputDate
  console.log("ATTEMPTING TO DELETE OLD NEWS CARDS WITH DATES LOWER THAN " + theDate);
  db2.news.remove({
    endDate:{$lt:theDate}
  });

  }, function () {
    /* This function is executed when the job stops. We can probably just use this as confirmation that the job is complete*/
  },
  true, /* Start the job right now */
  'America/Detroit' /* Time zone of this job. */
);

function formatDate(dateIn) {
   var yyyy = dateIn.getFullYear();
   var mm = dateIn.getMonth()+1; // getMonth() is zero-based
   var dd  = dateIn.getDate();
   return String(10000*yyyy + 100*mm +  dd); // Leading zeros for mm and dd
}
};