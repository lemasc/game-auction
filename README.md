# Game Auction


## Running

Install nodejs, git clone, pnpm install, pnpm dev

## Screenshots

### Authentication

Username and password based authentication. Default user is admin - admin.

![login](/screenshots/login.png)
![register](/screenshots/register.png)

After logging in, navbar changes to account menu.

![account menu](/screenshots/account-menu.png)

### Seller Games

Manages a shared list of games (CRUD)

> ในระบบจริงต้องมีตัวกลางดูแลรายการเกม แต่เพือความง่าย ทุกคนสามารถแก้ไขรายการเกมได้

![seller-games](/screenshots/seller-games.png)

![seller-games-add](/screenshots/seller-games-add.png)
![seller-games-edit](/screenshots/seller-games-edit.png)
![seller-games-delete](/screenshots/seller-games-delete.png)

### Seller Auctions

Manages a list of seller's auctions (CRUD) One auction per one game only.

![seller-auctions](/screenshots/seller-auctions.png)
![seller-auctions-create](/screenshots/seller-auctions-create.png)
![seller-auctions-duplicate](/screenshots/seller-auctions-duplicate.png)
![seller-auctions-delete](/screenshots/seller-auctions-delete.png)


### Buyer Game List

![games-list](/screenshots/games-list.png)
![games-view](/screenshots/games-view.png)



## Improvements
- Proper authentication check
- List all auctions, not just the minimum
- Should spend more time studying Bootstrap and Express cuz I forgot everything :(
- Data store in memory?? Allow MySQL or SQLITE?? ORM??
