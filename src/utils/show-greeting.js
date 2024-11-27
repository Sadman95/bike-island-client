const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: userTimeZone });
const hour = parseInt(currentTime.split(':')[0]);

/* 
============== Showing greeting according to hour ==============
*/
export const showGreeting = () => {
    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour + 12 >= 12 && hour + 1 < 14) {
        greeting = 'Good Noon';
    } else if (hour + 12 >= 14 && hour + 12 < 17) {
        greeting = 'Good Afternoon';
    } else if (hour + 12 >= 17 && hour + 12 < 20) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Night';
    }

    return greeting;
};
