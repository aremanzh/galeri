export default function dateFormat(date) {
    // Parse the input date string and convert it to the Asia/Singapore timezone
    const inputDate = new Date(date);
    const singaporeTimezone = 'Asia/Singapore';
  
    const singaporeDate = new Intl.DateTimeFormat('en-SG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: singaporeTimezone,
    }).format(inputDate);
  
    return singaporeDate;
  }