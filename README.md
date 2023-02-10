# Genshin Quest

Similar to how a checklist works, Genshin Quest is made with the purpose of allowing users to keep track of their in-game quests and be motivated to complete them in times. In addition to the checklist, users can earn experience points and coins through completing quests, and spend coins on buying new characters to customize how they want their own character to be.
 
## Design Process

[Wireframe](/id-assignment-2/wireframe/assg%202%20laptop%20view%20(2).xd)

This website is catered for the users of Genshin Impact - especially those who are busy with other commitments such as school or work. By using this website, these users will be motivated to complete all their quests in time and also be able to keep track of all their ongoing quests. In addition, users can play around with extra features on the website to make the user experience more interesting. This includes a character select page where users can select a character that they own and a shop page where users can buy new characters.

Genshin Impact itself can get repetitive at times due to updates taking a long time to come out, therefore Genshin Quest will serve as an extra source of entertainment for those who play Genshin Impact on a regular basis.

### User Stories

- As a low commitment Genshin Impact player, I would want some sort of motivation to complete my quests in addition to the rewards in earn in-game, so that I can feel a bigger sense of accomplishment.
- As a Genshin Impact player who has not logged onto the game in a long time, I would want a way to keep track of all my quests, so that I know which quest I should complete first before proceeding onto the next one.
- As a regular user on Genshin Quest, I want something that makes Genshin Quest different from other checklists, so that I would stick with Genshin Quest instead of using a regular checklist like Microsoft To-do.

## Features
 
### Existing Features
- Introduction/Landing Page: Brief explanation of what Genshin Quest has to offer to users.
- Sign-up: Users can sign up using their email and desired password as well as input their own username in order to save their quests later on
- Log-in: Users can login and continue from where they left off on their previous session in Genshin Quest
- Quest List: Users can create a quest that they want to complete, and it can be put into categories marked by the different regions in Genshin Impact.
    - Mark as completed: Users will gain experience points and coins for completing their quests. This will save into RESTdb so that player stats can be tracked.
    - Edit quest: Quests can be edited in case users have a change of mind. This will change the current quest that is stored in RESTdb.
    - Delete quest: Quests can be deleted in case users want to delete them. This will delete the current quest stored in RESTdb.
- Shop: Users can spend their coins earned through completing quests on new characters. These characters are from Genshin Impact.
- Navigation Bar: Implemented to allow user to jump to different sections on the website for faster and more efficient navigation. 
- Icons representing the different social media sites: All are linked to Genshin Impacts's Official social media accounts.
- Character select page: Allows users to look thorugh the characters they own and select a character as their account icon.

### Features Left to Implement
- User Character Icon (on main page): Display user's chosen character from character select page as their user icon beside user stats.
- Boss Fight - User can use at most 4 of their unlocked characters to fight bosses from Genshin Impact. Doing so will grant them rewards like coins and experience points, as well as special characters only obtainable through beating bosses
- Spend money on coins - Users can use a payment method to buy bundles of coins to use inside of Genshin Quest.

## Technologies Used

HTML - https://code.visualstudio.com/, used for the bulk of the website
CSS - https://code.visualstudio.com/, used to help style the website
Javascript - https://code.visualstudio.com/, used to create interactive content
[JQuery] - https://jquery.com/, used **JQuery** to simplify DOM manipulation.
RESTdb - https://restdb.io/, used to store data and web backend (user information, characteer information, etc.)
Lottie Animations - https://lottiefiles.com/, used to make the webite more aesthetic


## Testing

1. Navigation Tab:
- Navigation tab can succesfully jump to different sections of the website without overlapping other text.
- When cursor is hovered over the differect section names, section names will change colour.
- Navigation tab will turn into a hamburger menu when screen size is small. 
- Notes: Hamburger to represent menu sometimes does not appear while testing for responsiveness.

2. Social media icons:
- Icon become bigger when cursor is hovered over, when clicked, icons will lead user to the desired social media site on a new tab.

3. Start button: 
- Brings users to log in/sign up page.
- When hovered over, button changes colour.

4. Log In/Sign Up page:
- Log In: Allows users to successfully enter their account information to retrieve their progress on the website. 
- Sign Up: Allows users to successfully sign up and create a new username and password for the website.
- Try to submit the empty form and an error message about the required fields appears
- Try to submit the form with an invalid email address and an error message appears
- Try to submit the form with all inputs valid and verify that a success message appears
- Added a hide password function for privacy and users can click on the eye icon at the password input box to see the hidden password.
- Alerts added to inform users if password/email has been entered wrongly or when users have successfully signed up to Genshin Quest.
- Log In/Sign Up button changes colour when cursor is hovered ovver.
- Notes: issues with RESTdb as it kept going on cooldown. Issue fixed by creating new databases.

5. Quest page:
- displays user's username and current game status (level, experience points, coins)
- input box allows users to key in their tasks and radio buttons allows them to choose the region at which the tasks are located in. (regions are all colour coded)
- after selecting the relavant information and clicking the add quest button, the added quest will show up under the quest list and quests will be added to the user's own database.
- If users do not fill up the create a quest input box but select a region and tries to add quest, request will be ignored and quest will not be added to quest list.
- If users fill up the create a quest input box but does not select a region and tries to add quest, Mondstat will become the default region.
- Quests can be edited by clicking the edit button and the quest will be replaced by the edited one on the RESTdb database and also show up on the quest list.
- When users press delete the button from a quest, 20 coins and 10xp will be earned. Information will be reflected on user's game status.
- After users gain 100xp, they will level up and gain an extra 50 coins. Information will be reflected on user's game status.
- Tested the responiveness of this section on different browers and screen sizes and features are all able to go side by side or adjust to fit a whole row size.
- Lottie animation added when website is loading.

6. Shop page:
- Tested the responiveness of this section on different browers and screen sizes and features are all able to go side by side or adjust to fit a whole row size.
- When users hover over a character listing, listing picture will become bigger and a "Buy" button will appear.
- If users attempt to buy a character with insuffiefient coins, request will be ignored.
- When users buy a character, a lottie animation will be played while the page takes time to refresh. Animation  is similar to a how a "wish" looks when players gacha for characters.
- If user had already bought a character, that character's "Buy" button will be disabled and will instead display "Owned" to signify that users already have that character.
- Tested the responiveness of this section on different browers and screen sizes and character cards are all able to go side by side or adjust to fit a whole row size.
- Notes: Character ownership is not tracked, therefore page will still allow users to buy the same character if they refresh the page or come back to the page another time. However, in a single session it will still prevent users from buying the same character more than once by disabling the "Buy" button.
- Notes: background picture does not adjust to fit diffrent screen sizes.

7. Character page:
- Users will only be shown characters that they own. This is found from the RESTdb database where characters owned are stored in a collection that can be retrieved.
- When users hover over a character card, the image of the character will become bigger, and a 'Choose' button will appear.
- Notes: After pressing the 'Choose' button on a character card, nothing happens on the page. It is supposed to allow users to place that character into a team which can be used to fight bosses in a separate feature not included as of now.


## Credits
- Character Cards inspired by WebDev Pills on YouTube (https://www.youtube.com/watch?v=UYI959DTPBE&ab_channel=WebDevPills)

### Content & Media
- Character images for characters shown in the 'Shop' and 'Character' pages were found from the Genshin Impact Fandom Wiki (https://genshin-impact.fandom.com/wiki/)
- Character description for characters shown in the 'Character' page was found from the Genshin Impact Fandom Wiki (https://genshin-impact.fandom.com/wiki/)

### Acknowledgements

- I received inspiration for this project from Habitica, a RPG-gamified task-list app found on Android & iOS devices.