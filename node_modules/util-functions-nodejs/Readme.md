Util Functions

util functions provides you functions that helps you to do functionality in your project

correct format of using the package, you cannot destructure the functions

### Correct Format

![Correct Format](https://res.cloudinary.com/dyh7c1wtm/image/upload/v1723738938/crct_ad6khn.png)

### Incorrect Format

![Incorrect Format](https://res.cloudinary.com/dyh7c1wtm/image/upload/v1723738938/notCrct_xvmfwe.png)

functions are :

1. numTokandM

   This method have a single parameter which recieves numbers or string includes number and return back the value for ex:

   if you pass "1500" then it will returns "1.5k", so 1500 -> 1.5k
   if it is "15,000" then 15k, so 15000 -> 15k
   this "1000000" to 1m so, 1000000 -> 1M

2. getTimeDifference

   This method also have a single parameter which recieve a string and you must pass a future date so
   it will print how much years, month, days,hours and minute is passed for ex:

   if you pass "2025-05-14" then "10 months 329 days 18 hours 11 minutes" will be the output

   note: pass the string in this format year-month-days

3. getDate

   This method have 1-2 parameter first parameter includes a number or string which is the number of days and if you does'nt give 2nd parameter then it will add the days with current date if the first parameter is negative value then it will substract. The second parameter receives a date and if it is included then it will add the days to the given date for ex:

   if the current date is "2024-06-18 then first parameter is 365 then return "2025-06-18"
   if the current date is "2024-06-18 then first parameter is -365 then return "2023-06-19"

   if you give like getDate(-5,"2024-01-10") then returns "2024-01-05"
   if you give like getDate(5,"2024-01-10") then returns "2024-01-10"

4. getLastMonths

   This method also have one parameter which recives number or string includes only numbers and return the last N months from current month as an array for ex:

   if the input is 12 then it will return last 12 months
   getLastMonths(12) -> returns

   [ 'July', 'August', 'September', 'October', 'November', 'December',
   'January', 'February', 'March', 'April', 'May', 'June' ]

   you cannot give a negtive value if it does then return []

5. getDatesOfCurrentYear

   As the name provides it recieves a array of strings and return the dates if the date is in current year. it may be not be that much necessary but there must be scenarios we use this for ex:

   if input array is ["2025-04-08", "2024-04-10","2025-12-12", "2024-04-08","2024-08-08"]
   then it returns [ '2024-04-10', '2024-04-08', '2024-08-08' ]

   the return array only includes the dates in the current year

6. generateOtp

   This functions generates otp based on you give the digits . it always unique it can be used for generating otp it need one argument to call the function it return number of digits that's it
   for ex:

   generateOtp(4) return 1260
   generateOtp(6) return 252000

7. xKeyGenerator

   This functions generates key of length we given and return. It includes Alphabetic characters and special chars except (Double quote), (Single quote), (Opening parenthesis), (Closing parenthesis), (Asterisk), (Comma),(Period),(Slash),(Colon),(Semicolon),(Less than),(Greater than),
   (Opening square bracket),(Backslash), (Closing square bracket),(Caret), (Backtick),(Tilde)

8. isEndCentury

   This function one parameter as string or number and return if the year is end of century. The string must only contains numbers for ex:

   isEndCentury(2000) return true
   isEndCentury(1905) return false

9. isLeapYear

   As the name of the function it also find the input year is leap or not as we know 2024 was a leap year if you pass isLeapYear(2024) then it returns true and if it is isLeapYear(1900) then returns false if any NaN things send like isLeapYear("YEAR") then it will throw "Invalid digits" as we cant calculate that

10. dayDifference

   This function meant for finding the difference of days between two dates like when you pass dayDifference("08-31-2005","08-16-2005") returns 15 it will only return absolute value like when we subtracting each days then if it is -15 it returns 15

   note: date must in format MM-DD-YYYY

11. getDay

   This functions returns day of the date like if the date is 30 6 2024 then it is sunday pass the argument as MM-DD-YYYY

12. daysOfYear

   This function returns how much days of the year is completed now if it is leap year then the february

13. retryPromise

   This function helps you to retry promises if needed so you can pass a async function and other optional arguments one is count of retry default it will be three and the time needed to retry in milliseconds

   for ex: retryPromise(fn: any, retry: number = 3, delay: number = 1000)  

   it will call the function 3 times and return your result if you not pass the number of retry in every second

14. validateEmail

   As the name of the function it is to validate the email in web development validations are very important so some commmon validations are added in the package for the form all the validations are each functions like validate email, password ,phone number and name etc you need to pass your email in the function and it will return true if it is valid otherwise false

15. validatePassword

   To validate password 1 argument and boolean return

16. validatePhone

   To validate phone number 1 argument and boolean return

17. validateName

   To validate name 1 argument and boolean return

18. validateFullName

   To validate full name 1 argument and boolean return

19. other validations

   validateURL, validateCreditCard, validateIPV4, validateDate, validateHexColor, validateMACAddress, validateIPv6, validateUUID, validateCreditCardCVV, validateLatitude, validateLongitude, validateHTMLTag, validateCountryCode, validatePassportNumber, validateBinary, validateYouTubeURL, validateMongoObjectId

20. formatDate

   send your date here and it will update the string and return back

21. getRelativeTime

22. camelToSnake and snakeToCamel

   This functions convert the text to both camel case and snake case we all know that in JS camel case is the standard way of coding and in python we mostly use snake case in both function we can convert from one style to another


package name is util-functions and the functions that i created from the problems that i have faced it will have updates in future and if you have any suggetions or error occurs then contact me in this email
"alannixon2520@gmail.com" if you have any problems then share it with me. i will try to add the functions in my package

